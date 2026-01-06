import React, { useState, useEffect, useCallback } from 'react';
import { AudioEngine } from './services/AudioEngine.ts';
import { ProtocolVault } from './services/ProtocolVault.ts';
import { AudioState, Protocol } from './types.ts';
import { Visualizer } from './components/Visualizer.tsx';
import { ProtocolList } from './components/ProtocolList.tsx';
import { Play, Pause, Volume2, Wind, Sparkles, Cpu, Target, BookOpen, ShieldAlert, HardDrive, Microscope, FileText, Waves, LayoutList, MessageCircle } from 'lucide-react';
import { SessionProgress } from './components/SessionProgress.tsx';
import { SourcesModal } from './components/SourcesModal.tsx';
import { LegalModal } from './components/LegalModal.tsx';
import { DownloadPortal } from './components/DownloadPortal.tsx';
import { ManualTuningPanel } from './components/ManualTuningPanel.tsx';

const audioEngine = new AudioEngine();

const App: React.FC = () => {
    const [activeProtocol, setActiveProtocol] = useState<Protocol | null>(null);
    const [audioState, setAudioState] = useState<AudioState>({
        isPlaying: false, isPaused: false, currentProtocolId: null, currentPhaseIndex: 0, volume: 0.7
    });

    const [appMode, setAppMode] = useState<'scientific' | 'speculative'>('scientific');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [mobileTab, setMobileTab] = useState<'archive' | 'session' | 'tech'>('archive');
    
    const [showSources, setShowSources] = useState(false);
    const [showLegal, setShowLegal] = useState(false);
    const [showDownload, setShowDownload] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        audioEngine.onTick = (totalElapsed, phaseElapsed, i) => {
            setAudioState(s => ({...s, isPlaying: true, isPaused: false, currentPhaseIndex: i}));
        };
        audioEngine.onComplete = () => setAudioState(s => ({...s, isPlaying: false, isPaused: false, currentProtocolId: null}));
    }, []);

    // NOTE: Keep this synchronous (no async/await) so iOS/Safari treats unlock/resume/play as a direct user gesture.
    const handlePlay = useCallback(() => {
        audioEngine.unlock(true);
        if (!activeProtocol) return;

        const isNewSelection = audioState.currentProtocolId !== activeProtocol.id;

        if (!isNewSelection && audioState.isPlaying && !audioState.isPaused) {
            audioEngine.pause();
            setAudioState(s => ({...s, isPaused: true}));
        } else if (!isNewSelection && audioState.isPaused) {
            audioEngine.resume();
            setAudioState(s => ({...s, isPaused: false}));
        } else {
            audioEngine.stopImmediate();
            audioEngine.playProtocol(activeProtocol);
            setAudioState({
                ...audioState,
                isPlaying: true, 
                isPaused: false, 
                currentProtocolId: activeProtocol.id,
                currentPhaseIndex: 0
            });
            if (isMobile) setMobileTab('session');
        }
    }, [activeProtocol, audioState, isMobile]);

    const isPlayingCurrent = audioState.isPlaying && !audioState.isPaused && audioState.currentProtocolId === activeProtocol?.id;

    if (isMobile) {
        return (
            <div className="h-screen w-full bg-neuro-900 text-gray-100 flex flex-col overflow-hidden bg-cyber-grid relative">
                <div className="absolute inset-0 pointer-events-none scanlines z-[100] opacity-10"></div>
                
                <SourcesModal isOpen={showSources} onClose={() => setShowSources(false)} />
                <LegalModal isOpen={showLegal} onClose={() => setShowLegal(false)} />

                <header className="h-16 border-b border-neuro-700/50 flex items-center justify-between px-4 bg-neuro-900/90 backdrop-blur-xl z-50">
                    <h1 className="text-xl font-black text-white font-mono tracking-tighter italic">SYN<span className="text-neuro-500">SYNC</span></h1>
                    <div className="flex items-center gap-4">
                        <Volume2 className="w-4 h-4 text-gray-500" />
                        <input 
                            type="range" min="0" max="1" step="0.05" 
                            value={audioState.volume} 
                            onChange={(e) => {
                                const v = parseFloat(e.target.value);
                                setAudioState(s => ({...s, volume: v}));
                                audioEngine.setVolume(v);
                            }}
                            className="w-20 h-1 bg-neuro-700 rounded-lg appearance-none cursor-pointer accent-neuro-500" 
                        />
                    </div>
                </header>

                <main className="flex-1 overflow-hidden relative pb-20">
                    {mobileTab === 'archive' && (
                        <div className="h-full flex flex-col p-4 animate-in fade-in duration-300 overflow-y-auto custom-scrollbar">
                             <div className="flex gap-2 bg-black/40 p-1 border border-neuro-700/50 mb-4 rounded-lg">
                                <button onClick={() => setAppMode('scientific')} className={`flex-1 py-2 text-[10px] font-bold font-mono rounded ${appMode === 'scientific' ? 'bg-neuro-700 text-white' : 'text-gray-600'}`}>SCIENCE</button>
                                <button onClick={() => setAppMode('speculative')} className={`flex-1 py-2 text-[10px] font-bold font-mono rounded ${appMode === 'speculative' ? 'bg-neuro-accent/20 text-neuro-accent' : 'text-gray-600'}`}>WOO WOO</button>
                            </div>
                            <ProtocolList protocols={ProtocolVault.getAllProtocols()} selectedId={activeProtocol?.id || null} onSelect={setActiveProtocol} mode={appMode} />
                        </div>
                    )}

                    {mobileTab === 'session' && (
                        <div className="h-full flex flex-col p-4 gap-4 animate-in slide-in-from-right-4 duration-300">
                            {activeProtocol ? (
                                <>
                                    <div className="bg-black border border-neuro-700 rounded-2xl overflow-hidden aspect-video relative shadow-2xl">
                                        <Visualizer audioEngine={audioEngine} isPlaying={audioState.isPlaying} mode="oscilloscope" complexity={0.5} background="#000" hdEnabled={true} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    </div>
                                    <div className="bg-neuro-800/40 border border-neuro-700 rounded-2xl p-6 flex flex-col gap-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex-1 pr-4">
                                                <h2 className="text-xl font-bold text-white uppercase font-mono tracking-tight leading-tight">{activeProtocol.title}</h2>
                                                <p className="text-[10px] text-neuro-500 font-bold uppercase mt-1 tracking-widest">Level {activeProtocol.evidenceLevel}</p>
                                            </div>
                                            <button onClick={handlePlay} className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all ${!isPlayingCurrent ? 'bg-neuro-500 text-black shadow-lg shadow-neuro-500/20' : 'bg-neuro-900 border-2 border-neuro-500 text-neuro-500'}`}>
                                                {!isPlayingCurrent ? <Play className="w-6 h-6 ml-0.5 fill-current" /> : <Pause className="w-6 h-6 fill-current" />}
                                            </button>
                                        </div>
                                        <div className="bg-neuro-900/60 p-3 rounded-xl border border-neuro-500/20 mb-2">
                                            <div className="flex items-center gap-2 text-neuro-300 text-[10px] font-bold uppercase tracking-widest mb-1"><Target className="w-3 h-3"/> Session Goal</div>
                                            <p className="text-xs text-white leading-relaxed">{activeProtocol.usageGoal}</p>
                                        </div>
                                        <SessionProgress audioEngine={audioEngine} />
                                    </div>
                                </>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                    <Cpu className="w-16 h-16 text-neuro-700 mb-4" />
                                    <p className="text-xs font-mono uppercase tracking-widest">Load Protocol to Begin</p>
                                </div>
                            )}
                        </div>
                    )}

                    {mobileTab === 'tech' && (
                        <div className="h-full overflow-y-auto p-4 space-y-6 animate-in slide-in-from-right-4 duration-300 custom-scrollbar pb-20">
                            {activeProtocol ? (
                                <>
                                    <ManualTuningPanel audioEngine={audioEngine} />
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-neuro-400 text-[10px] font-bold uppercase tracking-widest px-1"><Microscope className="w-3 h-3"/> DSP Algorithm</div>
                                        <div className="bg-neuro-800/50 border border-neuro-700 p-4 rounded-xl text-xs text-gray-300 font-mono leading-relaxed">{activeProtocol.algoDesc}</div>
                                    </div>
                                    <div className="space-y-3 pb-8">
                                        <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest px-1"><FileText className="w-3 h-3"/> Neuro Context</div>
                                        <div className="bg-neuro-800/30 border border-neuro-700/50 p-4 rounded-xl text-xs text-gray-400 italic leading-relaxed">{activeProtocol.researchContext}</div>
                                    </div>
                                </>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                    <Target className="w-16 h-16 text-neuro-700 mb-4" />
                                    <p className="text-xs font-mono uppercase tracking-widest">Metadata Locked</p>
                                </div>
                            )}
                        </div>
                    )}
                </main>

                <nav className="h-20 bg-neuro-800 border-t border-neuro-700 flex items-center px-2 pb-safe-area-pb z-50">
                    <button onClick={() => setMobileTab('archive')} className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${mobileTab === 'archive' ? 'text-neuro-500' : 'text-gray-500'}`}>
                        <LayoutList className="w-5 h-5" />
                        <span className="text-[9px] font-bold uppercase">Library</span>
                    </button>
                    <button onClick={() => setMobileTab('session')} className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${mobileTab === 'session' ? 'text-neuro-500' : 'text-gray-500'}`}>
                        <Sparkles className="w-5 h-5" />
                        <span className="text-[9px] font-bold uppercase">Session</span>
                    </button>
                    <button onClick={() => setMobileTab('tech')} className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg transition-colors ${mobileTab === 'tech' ? 'text-neuro-500' : 'text-gray-500'}`}>
                        <Cpu className="w-5 h-5" />
                        <span className="text-[9px] font-bold uppercase">Technical</span>
                    </button>
                    <a
                        href="https://discord.gg/U7vfEJ6p"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex flex-col items-center gap-1 py-2 rounded-lg transition-colors text-gray-500"
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-[9px] font-bold uppercase">Discord</span>
                    </a>
                </nav>
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-neuro-900 text-gray-100 grid grid-cols-12 overflow-hidden bg-cyber-grid relative">
            <div className="absolute inset-0 pointer-events-none scanlines z-[100] opacity-20"></div>
            
            <SourcesModal isOpen={showSources} onClose={() => setShowSources(false)} />
            <LegalModal isOpen={showLegal} onClose={() => setShowLegal(false)} />
            <DownloadPortal isOpen={showDownload} onClose={() => setShowDownload(false)} />
            
            <div className="col-span-3 bg-neuro-800/80 border-r border-neuro-700 backdrop-blur-xl flex flex-col h-full z-20">
                <div className="p-6 border-b border-neuro-700/50 bg-neuro-900/50">
                    <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neuro-500 via-white to-neuro-500 mb-4 tracking-tighter font-mono italic uppercase">SYN<span className="text-white">SYNC</span></h1>
                    <div className="flex gap-2 bg-black/40 p-1 border border-neuro-700/50 mb-4 rounded">
                        <button onClick={() => setAppMode('scientific')} className={`flex-1 py-2 text-[10px] font-bold font-mono rounded ${appMode === 'scientific' ? 'bg-neuro-700 text-white' : 'text-gray-600'}`}>SCIENCE</button>
                        <button onClick={() => setAppMode('speculative')} className={`flex-1 py-2 text-[10px] font-bold font-mono rounded ${appMode === 'speculative' ? 'bg-neuro-accent/20 text-neuro-accent' : 'text-gray-600'}`}>WOO WOO</button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    <ProtocolList protocols={ProtocolVault.getAllProtocols()} selectedId={activeProtocol?.id || null} onSelect={setActiveProtocol} mode={appMode} />
                </div>
                <div className="p-4 border-t border-neuro-700/50 flex gap-2">
                    <button onClick={() => setShowSources(true)} className="flex-1 py-2 bg-neuro-700/30 hover:bg-neuro-700/50 rounded text-[9px] font-bold uppercase tracking-widest text-gray-400 border border-neuro-700 flex items-center justify-center gap-2">
                        <BookOpen className="w-3 h-3"/> Library
                    </button>
                    <button onClick={() => setShowLegal(true)} className="flex-1 py-2 bg-neuro-700/30 hover:bg-neuro-700/50 rounded text-[9px] font-bold uppercase tracking-widest text-gray-400 border border-neuro-700 flex items-center justify-center gap-2">
                        <ShieldAlert className="w-3 h-3"/> Legal
                    </button>
                </div>
            </div>

            <div className="col-span-9 flex flex-col h-full bg-transparent relative z-10">
                <div className="h-16 border-b border-neuro-700/50 flex items-center justify-between px-8 bg-neuro-900/80 backdrop-blur-md z-20">
                    <div className="flex gap-4 items-center">
                        <div className={`w-2 h-2 rounded-full ${audioState.isPlaying && !audioState.isPaused ? 'bg-neuro-500 animate-pulse' : 'bg-neuro-800 border border-neuro-600'}`} />
                        <span className="font-mono text-[10px] tracking-[0.2em] text-neuro-400 uppercase">Neural Interface Active</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Master Gain</span>
                            <Volume2 className="w-4 h-4 text-gray-500" />
                            <input 
                                type="range" min="0" max="1" step="0.01" 
                                value={audioState.volume} 
                                onChange={(e) => {
                                    const v = parseFloat(e.target.value);
                                    setAudioState(s => ({...s, volume: v}));
                                    audioEngine.setVolume(v);
                                }}
                                className="w-32 h-1 bg-neuro-700 rounded-lg appearance-none cursor-pointer accent-neuro-500" 
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                    {activeProtocol ? (
                        <div className="grid grid-cols-12 gap-8 h-full">
                            
                            <div className="col-span-7 flex flex-col gap-6">
                                <div className="bg-black border-2 border-neuro-700/50 rounded-2xl overflow-hidden relative aspect-video shadow-2xl">
                                    <Visualizer audioEngine={audioEngine} isPlaying={audioState.isPlaying} mode="oscilloscope" complexity={0.5} background="#000" hdEnabled={true} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <SessionProgress audioEngine={audioEngine} />
                                    </div>
                                </div>

                                <div className="bg-neuro-800/40 border border-neuro-700 backdrop-blur-xl p-8 rounded-2xl flex flex-col gap-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-4xl font-bold text-white tracking-tight uppercase font-mono mb-2">{activeProtocol.title}</h2>
                                            <div className="flex gap-2">
                                                <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-neuro-500/10 border border-neuro-500/30 text-neuro-400">LEVEL {activeProtocol.evidenceLevel}</span>
                                                <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-neuro-accent/10 border border-neuro-accent/30 text-neuro-accent">{activeProtocol.section.toUpperCase()}</span>
                                            </div>
                                        </div>
                                        <button onClick={handlePlay} className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${!isPlayingCurrent ? 'bg-neuro-500 text-black shadow-lg shadow-neuro-500/30 hover:scale-105' : 'bg-neuro-900 border-2 border-neuro-500 text-neuro-500 hover:bg-red-500/10 hover:border-red-500 hover:text-red-500'}`}>
                                            {!isPlayingCurrent ? <Play className="w-8 h-8 ml-1 fill-current" /> : <Pause className="w-8 h-8 fill-current" />}
                                        </button>
                                    </div>
                                    
                                    <div className="mt-2 bg-neuro-900/60 p-5 rounded-xl border border-neuro-500/30 shadow-inner">
                                        <div className="flex items-center gap-2 text-neuro-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">
                                            <Target className="w-4 h-4"/> Tactical Objective
                                        </div>
                                        <p className="text-lg text-white font-medium leading-relaxed">{activeProtocol.usageGoal}</p>
                                    </div>

                                    <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-neuro-700 pl-4 py-1">{activeProtocol.description}</p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-neuro-500 text-xs font-bold uppercase tracking-widest">
                                            <Wind className="w-4 h-4"/> Somatic Guidance
                                        </div>
                                        <div className="bg-neuro-800/30 border border-neuro-700/50 p-4 rounded-xl">
                                            <div className="text-[10px] font-mono text-gray-500 uppercase mb-2">Respiration</div>
                                            <div className="text-xs font-bold text-neuro-400">{activeProtocol.breathwork.name}</div>
                                            <p className="text-[10px] text-gray-400 mt-1">{activeProtocol.breathwork.description}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-transparent text-xs font-bold uppercase tracking-widest select-none"> spacer </div>
                                        <div className="bg-neuro-800/30 border border-neuro-700/50 p-4 rounded-xl">
                                            <div className="text-[10px] font-mono text-gray-500 uppercase mb-2">Vocalization</div>
                                            <div className="text-lg font-bold text-white tracking-widest">{activeProtocol.mantra.phonetic}</div>
                                            <p className="text-[10px] text-gray-500 italic mt-1">"{activeProtocol.mantra.meaning}"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-5 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar pb-10">
                                <ManualTuningPanel audioEngine={audioEngine} />
                                
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-neuro-400 text-xs font-bold uppercase tracking-widest">
                                        <Microscope className="w-4 h-4"/> Technical Metadata (High Verbosity)
                                    </div>
                                    <div className="bg-neuro-800/30 border border-neuro-700/50 p-5 rounded-xl space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-[10px] font-mono text-neuro-500 uppercase">
                                                <Cpu className="w-3 h-3"/> DSP Algorithm
                                            </div>
                                            <p className="text-xs text-gray-300 font-mono leading-relaxed">{activeProtocol.algoDesc}</p>
                                        </div>
                                        
                                        <div className="h-px bg-neuro-700/50 w-full" />
                                        
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase">
                                                <FileText className="w-3 h-3"/> Clinical & Research Context
                                            </div>
                                            <p className="text-xs text-gray-400 italic leading-relaxed">{activeProtocol.researchContext}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-neuro-900/40 border border-neuro-700 p-5 rounded-xl">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase mb-3"><Waves className="w-3 h-3"/> Frequency Matrix</div>
                                    <div className="space-y-2">
                                        {activeProtocol.phases.map((phase, idx) => (
                                            <div key={idx} className="flex justify-between items-center bg-black/20 p-2 rounded text-[10px] font-mono">
                                                <span className="text-gray-500">P{idx+1}</span>
                                                <span className="text-neuro-400">{phase.carrier}Hz</span>
                                                <span className="text-white">Δ {phase.beat || phase.startBeat}Hz</span>
                                                <span className="text-gray-500">{phase.duration}s</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-6 opacity-50 font-mono text-center">
                            <div className="relative">
                                <HardDrive className="w-24 h-24 text-neuro-800 relative z-10" />
                                <div className="absolute inset-0 bg-neuro-500 blur-2xl opacity-10 animate-pulse"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-sm tracking-[0.2em] text-neuro-500 uppercase">Awaiting Protocol Load</div>
                                <div className="text-[10px] text-gray-500 max-w-xs mx-auto">Select a neurological node from the library to begin calibration.</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
