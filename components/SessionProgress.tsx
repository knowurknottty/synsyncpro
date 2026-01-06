import React, { useEffect, useRef } from 'react';
import { AudioEngine } from '../services/AudioEngine';
import { Activity, Radio, Cpu, Zap, Brain } from 'lucide-react';

interface SessionProgressProps {
    audioEngine: AudioEngine;
}

export const SessionProgress: React.FC<SessionProgressProps> = ({ audioEngine }) => {
    const progressBarRef = useRef<HTMLDivElement>(null);
    const timeTextRef = useRef<HTMLDivElement>(null);
    const phaseTextRef = useRef<HTMLDivElement>(null);
    
    // Telemetry Refs
    const carrierRef = useRef<HTMLDivElement>(null);
    const beatRef = useRef<HTMLDivElement>(null);
    const stateRef = useRef<HTMLDivElement>(null);
    
    const reqRef = useRef<number>(0);

    const getBrainwaveName = (freq: number) => {
        if (freq < 4) return 'DELTA';
        if (freq < 8) return 'THETA';
        if (freq < 14) return 'ALPHA';
        if (freq < 30) return 'BETA';
        return 'GAMMA';
    };

    useEffect(() => {
        const update = () => {
            if (audioEngine.isPlaying && audioEngine.currentProtocol) {
                const state = audioEngine.getPlaybackState();
                const phase = audioEngine.currentProtocol.phases[state.currentPhaseIndex];
                
                // Time & Progress
                if (timeTextRef.current) {
                    timeTextRef.current.innerText = `${formatTime(state.totalElapsed)} / ${formatTime(audioEngine.currentProtocol.duration)}`;
                }
                if (phaseTextRef.current) {
                    phaseTextRef.current.innerText = `PHASE ${state.currentPhaseIndex + 1}/${audioEngine.currentProtocol.phases.length}`;
                }
                if (progressBarRef.current) {
                    const pct = (state.totalElapsed / audioEngine.currentProtocol.duration) * 100;
                    progressBarRef.current.style.width = `${Math.min(pct, 100)}%`;
                }

                // Live Telemetry Calculation
                if (phase) {
                    const phaseProgress = Math.min(1, state.phaseElapsed / phase.duration);
                    
                    // Calculate current Beat
                    const startB = phase.startBeat ?? phase.beat ?? 0;
                    const endB = phase.endBeat ?? phase.beat ?? 0;
                    const currentBeat = startB + (endB - startB) * phaseProgress;
                    
                    // Calculate current Carrier
                    const startC = phase.carrier;
                    const endC = phase.carrierEnd ?? phase.carrier;
                    const currentCarrier = startC + (endC - startC) * phaseProgress;

                    if (beatRef.current) beatRef.current.innerText = `${currentBeat.toFixed(2)} Hz`;
                    if (carrierRef.current) carrierRef.current.innerText = `${currentCarrier.toFixed(1)} Hz`;
                    if (stateRef.current) {
                        const wave = getBrainwaveName(currentBeat);
                        stateRef.current.innerText = wave;
                        stateRef.current.className = `font-bold tracking-widest ${
                            wave === 'GAMMA' ? 'text-red-400' : 
                            wave === 'BETA' ? 'text-yellow-400' : 
                            wave === 'ALPHA' ? 'text-green-400' : 
                            wave === 'THETA' ? 'text-blue-400' : 'text-purple-400'
                        }`;
                    }
                }
            }
            reqRef.current = requestAnimationFrame(update);
        };
        
        reqRef.current = requestAnimationFrame(update);
        return () => {
            if (reqRef.current) cancelAnimationFrame(reqRef.current);
        };
    }, [audioEngine]);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full space-y-4">
            {/* Main Progress */}
            <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-neuro-400 font-mono uppercase tracking-wider">
                    <div ref={phaseTextRef}>PHASE --/--</div>
                    <div ref={timeTextRef}>0:00 / 0:00</div>
                </div>
                <div className="h-1.5 bg-neuro-900 rounded-full overflow-hidden border border-neuro-700/50">
                    <div ref={progressBarRef} className="h-full bg-neuro-500 shadow-[0_0_10px_rgba(255,176,0,0.5)] w-0 transition-all duration-75 ease-linear" />
                </div>
            </div>

            {/* Live Telemetry Grid */}
            <div className="grid grid-cols-3 gap-2">
                <div className="bg-black/40 border border-neuro-700/50 p-2 rounded flex flex-col items-center justify-center">
                    <div className="text-[9px] text-gray-500 uppercase font-mono mb-1 flex items-center gap-1">
                        <Activity className="w-3 h-3" /> Entrainment
                    </div>
                    <div ref={beatRef} className="text-sm font-mono text-white font-bold tracking-tight">-- Hz</div>
                </div>
                <div className="bg-black/40 border border-neuro-700/50 p-2 rounded flex flex-col items-center justify-center">
                    <div className="text-[9px] text-gray-500 uppercase font-mono mb-1 flex items-center gap-1">
                        <Radio className="w-3 h-3" /> Carrier
                    </div>
                    <div ref={carrierRef} className="text-sm font-mono text-neuro-300 font-bold tracking-tight">-- Hz</div>
                </div>
                <div className="bg-black/40 border border-neuro-700/50 p-2 rounded flex flex-col items-center justify-center">
                    <div className="text-[9px] text-gray-500 uppercase font-mono mb-1 flex items-center gap-1">
                        <Brain className="w-3 h-3" /> Target
                    </div>
                    <div ref={stateRef} className="text-sm font-mono text-white font-bold tracking-tight">--</div>
                </div>
            </div>
            
            {/* DSP Status */}
            <div className="flex justify-between items-center bg-neuro-800/30 px-3 py-1.5 rounded border border-neuro-700/30">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[9px] font-mono text-green-400 tracking-widest">DSP ONLINE</span>
                </div>
                <div className="flex items-center gap-2">
                    <Cpu className="w-3 h-3 text-neuro-600" />
                    <span className="text-[9px] font-mono text-gray-500 tracking-wider">HARMONIC STACK ACTIVE</span>
                </div>
            </div>
        </div>
    );
};