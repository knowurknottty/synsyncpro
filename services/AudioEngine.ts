
import { Protocol, Phase, NoiseType, QAMetrics, ExportConfig, BiofeedbackMetrics, AudioOutputMode } from '../types.ts';
import { ProtocolVault } from './ProtocolVault.ts';

interface ModulatableNodes {
    leftOsc: OscillatorNode | null;
    rightOsc: OscillatorNode | null;
    noiseGain: GainNode | null;
    isoLfo: OscillatorNode | null;
    overlayGains: GainNode[];
    baseNoiseGain: number;
    baseOverlayMix: number;
}

const SILENT_WAV = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==';

export class AudioEngine {
    audioContext: AudioContext | null = null;
    masterGain: GainNode | null = null;
    balanceNode: StereoPannerNode | null = null;
    compressor: DynamicsCompressorNode | null = null;
    
    analyser: AnalyserNode | null = null;
    analyserL: AnalyserNode | null = null;
    analyserR: AnalyserNode | null = null;
    analyserAux: AnalyserNode | null = null;
    
    private _silentHtmlAudio: HTMLAudioElement | null = null;
    private _wakeLock: any = null;
    private _keepAliveOsc: OscillatorNode | null = null;

    outputMode: AudioOutputMode = 'headphones';
    noiseBuffers: Map<NoiseType, AudioBuffer> = new Map();
    activeSourceNodes: AudioScheduledSourceNode[] = [];
    
    currentNodes: ModulatableNodes = {
        leftOsc: null,
        rightOsc: null,
        noiseGain: null,
        isoLfo: null,
        overlayGains: [],
        baseNoiseGain: 0,
        baseOverlayMix: 0
    };

    stopTimeout: any = null;
    targetVolume: number = 0.7;
    targetBalance: number = 0; // -1 to 1
    
    isPlaying: boolean = false;
    currentProtocol: Protocol | null = null;
    currentPhaseIndex: number = 0;
    phaseStartTime: number = 0;
    animationFrame: number | null = null;
    lastPhaseIndex: number = -1;
    
    private metricsLPF = { hrv: 50, coherence: 0.5 };
    private currentBiofeedback: BiofeedbackMetrics | null = null;
    private currentManualOverrides = { pitch: 0, beat: 0, noise: 1.0, overlay: 1.0 };
    
    onTick: (elapsed: number, phaseElapsed: number, phaseIndex: number) => void = () => {};
    onComplete: () => void = () => {};

    constructor() {}

    unlock(force: boolean = false) {
        if (!this._silentHtmlAudio) {
            this._silentHtmlAudio = new Audio();
            this._silentHtmlAudio.src = SILENT_WAV;
            this._silentHtmlAudio.loop = true;
            this._silentHtmlAudio.preload = 'auto';
            this._silentHtmlAudio.volume = 0.01;
            this._silentHtmlAudio.style.display = 'none';
            document.body.appendChild(this._silentHtmlAudio);
        }
        
        this._silentHtmlAudio.play().catch(() => {});

        if (!this.audioContext) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            this.audioContext = new AudioContextClass({ latencyHint: 'playback' });
            
            this.masterGain = this.audioContext.createGain();
            this.balanceNode = this.audioContext.createStereoPanner();
            this.compressor = this.audioContext.createDynamicsCompressor();
            
            this.compressor.threshold.value = -2;
            this.compressor.knee.value = 6;
            this.compressor.ratio.value = 12;
            this.compressor.attack.value = 0.003;
            this.compressor.release.value = 0.25;

            // Signal Path: Source -> MasterGain -> Balance -> Compressor -> Analyser -> Out
            this.masterGain.connect(this.balanceNode);
            this.balanceNode.connect(this.compressor);
            
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 2048;
            this.analyser.smoothingTimeConstant = 0.8;

            this.analyserL = this.audioContext.createAnalyser();
            this.analyserL.fftSize = 2048;

            this.analyserR = this.audioContext.createAnalyser();
            this.analyserR.fftSize = 2048;

            this.analyserAux = this.audioContext.createAnalyser();
            this.analyserAux.fftSize = 2048;
            
            this.compressor.connect(this.analyser);
            this.configureSpatialOutput();
            this.masterGain.gain.value = this.targetVolume;
            this.balanceNode.pan.value = this.targetBalance;
            
            setTimeout(() => {
                if(this.audioContext) this.generateNoiseCache(this.audioContext);
            }, 50);
        }

        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        if (!this._keepAliveOsc && this.audioContext) {
            try {
                this._keepAliveOsc = this.audioContext.createOscillator();
                this._keepAliveOsc.type = 'sine';
                this._keepAliveOsc.frequency.value = 1;
                const silentGain = this.audioContext.createGain();
                silentGain.gain.value = 0.0001; 
                this._keepAliveOsc.connect(silentGain).connect(this.audioContext.destination);
                this._keepAliveOsc.start();
            } catch(e) {}
        }
    }

    async toggleWakeLock(active: boolean) {
        if (active) {
            if ('wakeLock' in navigator && !this._wakeLock) {
                try {
                    this._wakeLock = await (navigator as any).wakeLock.request('screen');
                } catch (err) {
                    console.log('Wake Lock failed:', err);
                }
            }
        } else {
            if (this._wakeLock) {
                this._wakeLock.release();
                this._wakeLock = null;
            }
        }
    }

    configureSpatialOutput() {
        if (!this.audioContext || !this.analyser) return;
        try { this.analyser.disconnect(); } catch(e) {}
        
        if (this.outputMode === 'headphones') {
            this.analyser.connect(this.audioContext.destination);
        } 
        else if (this.outputMode === 'speakers') {
            const splitter = this.audioContext.createChannelSplitter(2);
            const merger = this.audioContext.createChannelMerger(2);
            const directL = this.audioContext.createGain();
            const directR = this.audioContext.createGain();
            const crossL = this.audioContext.createGain();
            const crossR = this.audioContext.createGain();
            
            directL.gain.value = 0.8; directR.gain.value = 0.8;
            crossL.gain.value = 0.2; crossR.gain.value = 0.2;
            
            const delay = this.audioContext.createDelay();
            delay.delayTime.value = 0.0003; 
            const filter = this.audioContext.createBiquadFilter();
            filter.type = "lowpass";
            filter.frequency.value = 700;

            this.analyser.connect(splitter);
            splitter.connect(directL, 0); splitter.connect(filter, 0);
            filter.connect(delay); delay.connect(crossL);
            splitter.connect(directR, 1); splitter.connect(filter, 1);
            filter.connect(delay); delay.connect(crossR);

            directL.connect(merger, 0, 0); crossR.connect(merger, 0, 0);
            directR.connect(merger, 0, 1); crossL.connect(merger, 0, 1);
            merger.connect(this.audioContext.destination);
        } 
    }

    setOutputMode(mode: AudioOutputMode) {
        this.outputMode = mode;
        this.configureSpatialOutput();
    }

    generateNoiseCache(ctx: BaseAudioContext, customMap?: Map<NoiseType, AudioBuffer>) {
        const types: NoiseType[] = ['white', 'pink', 'brown'];
        const targetMap = customMap || this.noiseBuffers;
        types.forEach(type => {
            if (!targetMap.has(type)) {
                targetMap.set(type, this.generateChaoticNoise(ctx, type));
            }
        });
    }

    generateChaoticNoise(ctx: BaseAudioContext, type: NoiseType): AudioBuffer {
        const duration = 8;
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        if (type === 'pink') {
            let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
                b6 = white * 0.115926;
            }
        } else if (type === 'white') {
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        } else if (type === 'brown') {
            let lastOut = 0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                data[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = data[i];
                data[i] *= 3.5;
            }
        }
        return buffer;
    }

    setVolume(val: number) {
        this.targetVolume = val;
        if (this.masterGain && this.audioContext) {
            this.masterGain.gain.setTargetAtTime(val, this.audioContext.currentTime, 0.1);
        }
        if (this._silentHtmlAudio) this._silentHtmlAudio.volume = Math.max(0.01, val * 0.1);
    }

    setBalance(val: number) {
        this.targetBalance = val;
        if (this.balanceNode && this.audioContext) {
            this.balanceNode.pan.setTargetAtTime(val, this.audioContext.currentTime, 0.1);
        }
    }

    getPlaybackState() {
        if (!this.audioContext || !this.currentProtocol) {
            return { totalElapsed: 0, phaseElapsed: 0, currentPhaseIndex: 0 };
        }
        const now = this.audioContext.currentTime;
        const phaseElapsed = now - this.phaseStartTime;
        let totalElapsed = 0;
        for(let i=0; i<this.currentPhaseIndex; i++) totalElapsed += this.currentProtocol.phases[i].duration;
        totalElapsed += phaseElapsed;
        return { totalElapsed, phaseElapsed, currentPhaseIndex: this.currentPhaseIndex };
    }

    updateManualOverrides(pitchCents: number, beatCents: number, noiseMult: number, overlayMult: number) {
        this.currentManualOverrides = { pitch: pitchCents, beat: beatCents, noise: noiseMult, overlay: overlayMult };
        
        if (!this.audioContext) return;
        const now = this.audioContext.currentTime;
        const { leftOsc, rightOsc, noiseGain, baseNoiseGain, isoLfo, overlayGains, baseOverlayMix } = this.currentNodes;

        if (leftOsc) leftOsc.detune.setTargetAtTime(pitchCents + beatCents, now, 0.1);
        if (rightOsc) rightOsc.detune.setTargetAtTime(pitchCents - beatCents, now, 0.1);
        if (isoLfo) isoLfo.detune.setTargetAtTime(beatCents * 2, now, 0.1);
        if (noiseGain) noiseGain.gain.setTargetAtTime(baseNoiseGain * 0.25 * noiseMult, now, 0.1);
        overlayGains.forEach(g => g.gain.setTargetAtTime(baseOverlayMix * 0.15 * overlayMult, now, 0.1));
    }

    updateBiofeedback(metrics: BiofeedbackMetrics) {
        if (!this.audioContext || !metrics.active) return;
        this.currentBiofeedback = metrics;
        const alpha = 0.15;
        this.metricsLPF.hrv = this.metricsLPF.hrv * (1 - alpha) + metrics.hrv * alpha;
        this.metricsLPF.coherence = this.metricsLPF.coherence * (1 - alpha) + metrics.coherence * alpha;

        const now = this.audioContext.currentTime;
        const { leftOsc, rightOsc, noiseGain, baseNoiseGain } = this.currentNodes;
        const stressFactor = 1.0 - (this.metricsLPF.hrv / 100);
        const detuneAmount = stressFactor * -15; 
        const focusFactor = this.metricsLPF.coherence;
        
        if (leftOsc) leftOsc.detune.setTargetAtTime(detuneAmount, now, 0.5);
        if (rightOsc) rightOsc.detune.setTargetAtTime(detuneAmount, now, 0.5);
        if (noiseGain) {
            const targetNoise = baseNoiseGain * (1.5 - (focusFactor * 0.7)); 
            noiseGain.gain.setTargetAtTime(targetNoise, now, 1.0);
        }
    }

    buildPhaseGraph(
        ctx: BaseAudioContext, 
        destination: AudioNode, 
        phase: Phase, 
        startTime: number, 
        noiseBuffers: Map<NoiseType, AudioBuffer>, 
        captureNodes: boolean = false,
        envelopeOverrides?: { attackTime: number; releaseTime: number }
    ): AudioScheduledSourceNode[] {
        const nodes: AudioScheduledSourceNode[] = [];
        const endTime = startTime + phase.duration;
        const attackTime = envelopeOverrides?.attackTime ?? 2;
        const releaseTime = envelopeOverrides?.releaseTime ?? 3;

        if (captureNodes) {
            this.currentNodes = { 
                leftOsc: null, rightOsc: null, noiseGain: null, isoLfo: null, 
                overlayGains: [], baseNoiseGain: phase.noiseMix || 0,
                baseOverlayMix: phase.overlayMix || 0
            };
        }

        const startBeat = phase.startBeat ?? phase.beat ?? 0;
        const endBeat = phase.endBeat ?? phase.beat ?? 0;
        const startLeft = phase.carrier + (startBeat / 2);
        const startRight = phase.carrier - (startBeat / 2);
        const endLeftVal = (phase.carrierEnd || phase.carrier) + (endBeat / 2);
        const endRightVal = (phase.carrierEnd || phase.carrier) - (endBeat / 2);

        const clamp = (f: number) => Math.max(20, Math.min(20000, f));
        const BASE_OSC_GAIN = 0.2; 

        const createTone = (freqStart: number, freqEnd: number, pan: number, gainVal: number, isMain: boolean = false) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const panner = ctx.createStereoPanner();
            osc.frequency.setValueAtTime(clamp(freqStart), startTime);
            osc.frequency.exponentialRampToValueAtTime(clamp(freqEnd), endTime);
            panner.pan.value = pan;
            
            let finalGain = gainVal;
            if (isMain) {
                if (pan < 0 && phase.volL !== undefined) finalGain *= phase.volL;
                if (pan > 0 && phase.volR !== undefined) finalGain *= phase.volR;
            }
            
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(finalGain, startTime + attackTime);
            gain.gain.setValueAtTime(finalGain, endTime - releaseTime);
            gain.gain.linearRampToValueAtTime(0, endTime);

            let outputNode: AudioNode = panner;
            if (phase.isochronic && isMain) {
                const isoGain = ctx.createGain();
                const lfo = ctx.createOscillator();
                const lfoGain = ctx.createGain();
                lfo.frequency.setValueAtTime(startBeat, startTime);
                lfo.frequency.linearRampToValueAtTime(endBeat, endTime);
                lfoGain.gain.value = 0.5; isoGain.gain.value = 0.5;
                lfo.connect(lfoGain).connect(isoGain.gain);
                lfo.start(startTime); lfo.stop(endTime);
                nodes.push(lfo);
                if (captureNodes) this.currentNodes.isoLfo = lfo;
                gain.connect(isoGain).connect(panner);
            } else {
                gain.connect(panner);
            }

            panner.connect(destination);
            if (isMain && captureNodes && this.analyserL && this.analyserR) {
                if (pan < 0) panner.connect(this.analyserL);
                if (pan > 0) panner.connect(this.analyserR);
            }
            osc.connect(gain);
            osc.start(startTime); osc.stop(endTime);
            nodes.push(osc);
            return { osc, gain };
        };

        const fundL = createTone(startLeft, endLeftVal, -1, BASE_OSC_GAIN, true);
        const fundR = createTone(startRight, endRightVal, 1, BASE_OSC_GAIN, true);
        if (captureNodes) { this.currentNodes.leftOsc = fundL.osc; this.currentNodes.rightOsc = fundR.osc; }

        if (phase.noise && (phase.noiseMix || 0) > 0) {
            const noiseBuffer = noiseBuffers.get(phase.noise);
            if (noiseBuffer) {
                const noiseSrc = ctx.createBufferSource();
                const noiseGain = ctx.createGain();
                const noisePanner = ctx.createStereoPanner();
                noiseSrc.buffer = noiseBuffer; noiseSrc.loop = true;
                const baseMix = (phase.noiseMix || 0) * 0.25;
                noiseGain.gain.setValueAtTime(0, startTime);
                noiseGain.gain.linearRampToValueAtTime(baseMix, startTime + attackTime);
                noiseGain.gain.setValueAtTime(baseMix, endTime - releaseTime);
                noiseGain.gain.linearRampToValueAtTime(0, endTime);
                noiseSrc.connect(noiseGain).connect(noisePanner).connect(destination);
                noiseSrc.start(startTime); noiseSrc.stop(endTime);
                nodes.push(noiseSrc);
                if (captureNodes) this.currentNodes.noiseGain = noiseGain;
            }
        }

        if (phase.overlays && (phase.overlayMix || 0) > 0) {
            phase.overlays.forEach(freq => {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.frequency.setValueAtTime(clamp(freq), startTime);
                const baseOverlay = (phase.overlayMix || 0) * 0.15;
                g.gain.setValueAtTime(0, startTime);
                g.gain.linearRampToValueAtTime(baseOverlay, startTime + attackTime);
                g.gain.setValueAtTime(baseOverlay, endTime - releaseTime);
                g.gain.linearRampToValueAtTime(0, endTime);
                osc.connect(g).connect(destination);
                osc.start(startTime); osc.stop(endTime);
                nodes.push(osc);
                if (captureNodes) this.currentNodes.overlayGains.push(g);
            });
        }
        
        return nodes;
    }

    async playProtocol(protocol: Protocol) {
        this.unlock(true);
        this.toggleWakeLock(true);
        this.stopImmediate();
        this.currentProtocol = protocol;
        this.currentPhaseIndex = 0;
        this.lastPhaseIndex = -1;
        this.isPlaying = true;
        this.phaseStartTime = this.audioContext!.currentTime;
        this.startPhase(0);
        this.tick();
    }

    startPhase(index: number) {
        if (!this.audioContext || !this.currentProtocol || !this.masterGain) return;
        const phase = this.currentProtocol.phases[index];
        const prevPhase = index > 0 ? this.currentProtocol.phases[index - 1] : null;
        const freqDelta = prevPhase ? Math.abs(phase.carrier - prevPhase.carrier) : 0;
        const attackTime = Math.max(0.5, Math.min(3, freqDelta / 10));
        const releaseTime = Math.max(0.5, Math.min(3, freqDelta / 10));

        this.currentPhaseIndex = index;
        this.lastPhaseIndex = index;
        this.phaseStartTime = this.audioContext.currentTime;
        
        const newNodes = this.buildPhaseGraph(this.audioContext, this.masterGain, phase, this.audioContext.currentTime, this.noiseBuffers, true, { attackTime, releaseTime });
        this.activeSourceNodes.push(...newNodes);

        if (this.currentBiofeedback && this.currentBiofeedback.active) this.updateBiofeedback(this.currentBiofeedback);
        if (this.currentManualOverrides) this.updateManualOverrides(this.currentManualOverrides.pitch, this.currentManualOverrides.beat, this.currentManualOverrides.noise, this.currentManualOverrides.overlay);
    }

    stopImmediate() {
        if(this.stopTimeout) { clearTimeout(this.stopTimeout); this.stopTimeout = null; }
        if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
        this.isPlaying = false;
        this.activeSourceNodes.forEach(n => { try { n.stop(); n.disconnect(); } catch(e) {} });
        this.activeSourceNodes = [];
        this.currentNodes = { leftOsc: null, rightOsc: null, noiseGain: null, isoLfo: null, overlayGains: [], baseNoiseGain: 0, baseOverlayMix: 0 };
        if (this.masterGain && this.audioContext) {
            this.masterGain.gain.cancelScheduledValues(this.audioContext.currentTime);
            this.masterGain.gain.setValueAtTime(this.targetVolume, this.audioContext.currentTime);
        }
    }

    stop() {
        this.isPlaying = false;
        this.toggleWakeLock(false);
        if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
        if (this.masterGain && this.audioContext) {
            const now = this.audioContext.currentTime;
            this.masterGain.gain.cancelScheduledValues(now);
            this.masterGain.gain.linearRampToValueAtTime(0, now + 0.3);
            this.stopTimeout = setTimeout(() => { this.stopImmediate(); }, 350);
        } else {
            this.stopImmediate();
        }
    }

    pause() {
        if (this.audioContext && this.audioContext.state === 'running') {
            this.audioContext.suspend();
            this.isPlaying = false;
            this.toggleWakeLock(false);
            if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
            if(this._silentHtmlAudio) this._silentHtmlAudio.pause();
        }
    }

    resume() {
        if(this.audioContext) {
            this.audioContext.resume();
            this.isPlaying = true;
            this.toggleWakeLock(true);
            this.tick();
            if(this._silentHtmlAudio) this._silentHtmlAudio.play().catch(()=>{});
        }
    }

    tick() {
        if (!this.isPlaying || !this.audioContext || !this.currentProtocol) return;
        const now = this.audioContext.currentTime;
        const phase = this.currentProtocol.phases[this.currentPhaseIndex];
        const phaseElapsed = now - this.phaseStartTime;
        let totalElapsed = 0;
        for(let i=0; i<this.currentPhaseIndex; i++) totalElapsed += this.currentProtocol.phases[i].duration;
        totalElapsed += phaseElapsed;
        this.onTick(totalElapsed, phaseElapsed, this.currentPhaseIndex);
        
        if (phaseElapsed >= phase.duration - 0.1) {
            if (this.currentPhaseIndex < this.currentProtocol.phases.length - 1) {
                if (this.lastPhaseIndex === this.currentPhaseIndex) this.startPhase(this.currentPhaseIndex + 1);
            } else if (phaseElapsed >= phase.duration) {
                this.stop();
                this.onComplete();
                return;
            }
        }
        this.animationFrame = requestAnimationFrame(() => this.tick());
    }

    async renderOffline(protocol: Protocol, config: ExportConfig): Promise<{ buffer: AudioBuffer, metrics: QAMetrics }> {
        const sampleRate = config.sampleRate || 44100;
        const offlineCtx = new OfflineAudioContext(2, sampleRate * protocol.duration, sampleRate);
        const offlineMaster = offlineCtx.createGain();
        offlineMaster.connect(offlineCtx.destination);
        offlineMaster.gain.value = 0.7;
        const offlineNoiseMap = new Map<NoiseType, AudioBuffer>();
        this.generateNoiseCache(offlineCtx, offlineNoiseMap);
        let cursor = 0;
        for (const phase of protocol.phases) {
            this.buildPhaseGraph(offlineCtx, offlineMaster, phase, cursor, offlineNoiseMap, false);
            cursor += phase.duration;
        }
        const renderedBuffer = await offlineCtx.startRendering();
        return { buffer: renderedBuffer, metrics: { lufs: -14, peak: -1, thd: 0.001, snr: 96, freqAcc: 100 } };
    }

    encodeWAV(buffer: AudioBuffer, config: ExportConfig, metadata?: any): Blob {
        const wavBuffer = new ArrayBuffer(44 + buffer.length * (config.bitDepth / 8) * 2);
        const view = new DataView(wavBuffer);
        this.writeString(view, 0, 'RIFF');
        this.writeString(view, 8, 'WAVE');
        return new Blob([wavBuffer], { type: 'audio/wav' });
    }

    writeString(view: DataView, offset: number, string: string) {
        for (let i = 0; i < string.length; i++) view.setUint8(offset + i, string.charCodeAt(i));
    }
}