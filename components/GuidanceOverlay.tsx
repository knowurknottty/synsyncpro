
import React, { useState, useEffect, useRef } from 'react';
import { SocraticStep, GeometryLesson, SessionGuidance, MantraProfile } from '../types';
import { Brain, Wind, MessageSquare, Box, ArrowRight, Check, Hexagon, Mic2 } from 'lucide-react';
import { SOCRATIC_STEPS, GEOMETRY_LESSONS } from '../constants';

interface GuidanceOverlayProps {
    mode: SessionGuidance;
    breathRatio?: [number, number, number, number]; // Inhale, Hold, Exhale, Hold
    mantra?: MantraProfile;
    elapsedTime: number;
}

export const GuidanceOverlay: React.FC<GuidanceOverlayProps> = ({ mode, breathRatio = [4,4,4,4], mantra, elapsedTime }) => {
    // --- BREATHWORK ---
    const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
    const [breathScale, setBreathScale] = useState(1);
    const [phaseTimeLeft, setPhaseTimeLeft] = useState(0);
    
    // --- SOCRATIC ---
    const [socraticIdx, setSocraticIdx] = useState(0);
    const [socraticInput, setSocraticInput] = useState('');
    const [history, setHistory] = useState<{step: string, val: string}[]>([]);

    // --- GEOMETRY ---
    const [geoIdx, setGeoIdx] = useState(0);

    // Breathing Loop
    useEffect(() => {
        if (mode !== 'breathwork' && mode !== 'mantra') return;
        
        const [inDur, hold1, exDur, hold2] = breathRatio;
        const totalCycle = inDur + hold1 + exDur + hold2;
        
        let start = Date.now();
        const animate = () => {
            const now = Date.now();
            const elapsed = (now - start) / 1000;
            const cycleTime = elapsed % totalCycle;
            
            let currentPhase: 'Inhale' | 'Hold' | 'Exhale' = 'Inhale';
            let timeLeft = 0;

            if (cycleTime < inDur) {
                currentPhase = 'Inhale';
                timeLeft = inDur - cycleTime;
                setBreathScale(0.5 + 0.5 * (cycleTime / inDur));
            } else if (cycleTime < inDur + hold1) {
                currentPhase = 'Hold';
                timeLeft = (inDur + hold1) - cycleTime;
                setBreathScale(1.0);
            } else if (cycleTime < inDur + hold1 + exDur) {
                currentPhase = 'Exhale';
                timeLeft = (inDur + hold1 + exDur) - cycleTime;
                const exTime = cycleTime - (inDur + hold1);
                setBreathScale(1.0 - 0.5 * (exTime / exDur));
            } else {
                currentPhase = 'Hold';
                timeLeft = totalCycle - cycleTime;
                setBreathScale(0.5);
            }
            
            setBreathPhase(currentPhase);
            setPhaseTimeLeft(Math.ceil(timeLeft));
            requestAnimationFrame(animate);
        };
        const handle = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(handle);
    }, [mode, breathRatio]);

    // Geometry Lesson Loop (Change every 30s)
    useEffect(() => {
        if (mode !== 'geometry') return;
        const interval = setInterval(() => {
            setGeoIdx(i => (i + 1) % GEOMETRY_LESSONS.length);
        }, 30000);
        return () => clearInterval(interval);
    }, [mode]);

    if (mode === 'audio_only') return null;

    // RENDER SOCRATIC
    if (mode === 'socratic') {
        const step = SOCRATIC_STEPS[socraticIdx];
        return (
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-8 pointer-events-auto bg-black/60 backdrop-blur-sm">
                <div className="max-w-2xl w-full bg-neuro-900 border border-neuro-500/30 p-8 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300">
                    <div className="flex items-center gap-3 mb-6 text-neuro-400">
                        <Brain className="w-8 h-8" />
                        <h2 className="text-2xl font-bold">Socratic Reprogramming</h2>
                    </div>
                    
                    <div className="mb-8">
                        <div className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-2">Step {socraticIdx + 1}: {step.id}</div>
                        <p className="text-xl text-white leading-relaxed">{step.question}</p>
                    </div>

                    <textarea 
                        className="w-full bg-black/30 border border-neuro-700 rounded-xl p-4 text-lg text-white focus:border-neuro-500 focus:ring-1 focus:ring-neuro-500 outline-none mb-6 h-32 resize-none"
                        placeholder={step.placeholder}
                        value={socraticInput}
                        onChange={(e) => setSocraticInput(e.target.value)}
                    />

                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            {SOCRATIC_STEPS.map((_, i) => (
                                <div key={i} className={`w-2 h-2 rounded-full ${i === socraticIdx ? 'bg-neuro-500' : i < socraticIdx ? 'bg-neuro-800' : 'bg-gray-800'}`} />
                            ))}
                        </div>
                        <button 
                            onClick={() => {
                                setHistory([...history, {step: step.id, val: socraticInput}]);
                                setSocraticInput('');
                                if (socraticIdx < SOCRATIC_STEPS.length - 1) setSocraticIdx(socraticIdx + 1);
                                else setSocraticIdx(0); // Reset or Finish
                            }}
                            disabled={!socraticInput}
                            className="flex items-center gap-2 bg-neuro-500 text-neuro-900 px-6 py-3 rounded-lg font-bold hover:bg-neuro-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {step.nextLabel} <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // RENDER GEOMETRY
    if (mode === 'geometry') {
        const lesson = GEOMETRY_LESSONS[geoIdx];
        return (
            <div className="absolute bottom-8 left-8 z-40 max-w-md animate-in slide-in-from-bottom-4">
                <div className="bg-black/70 border border-neuro-500/30 backdrop-blur-md p-6 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-3 mb-2 text-neuro-400">
                        <Hexagon className="w-5 h-5" />
                        <span className="text-sm font-bold uppercase tracking-widest">Sacred Geometry Lesson</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{lesson.shape}</h3>
                    <div className="text-xs font-mono text-neuro-300 mb-3">Element: {lesson.element}</div>
                    <p className="text-gray-300 leading-relaxed">{lesson.description}</p>
                </div>
            </div>
        );
    }

    // RENDER BREATHWORK / MANTRA
    return (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
            {/* Breathing Circle */}
            <div 
                className="w-64 h-64 rounded-full border-4 border-neuro-400/30 flex items-center justify-center transition-all duration-75 shadow-[0_0_50px_rgba(31,184,205,0.2)] relative"
                style={{ transform: `scale(${breathScale})` }}
            >
                <div className="w-full h-full bg-neuro-500/10 rounded-full backdrop-blur-sm flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white tracking-widest uppercase drop-shadow-md mb-1">
                        {breathPhase}
                    </span>
                    <span className="text-4xl font-mono font-bold text-neuro-300 drop-shadow-sm">
                        {phaseTimeLeft}
                    </span>
                </div>
            </div>

            {/* Mantra Text */}
            {mode === 'mantra' && breathPhase === 'Exhale' && mantra && (
                <div className="mt-12 max-w-md w-full bg-black/40 backdrop-blur-md border border-neuro-500/20 p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center text-center shadow-2xl">
                    <div className="flex items-center gap-2 text-neuro-500 text-xs uppercase font-bold mb-3 tracking-widest">
                        <Mic2 className="w-4 h-4" /> Vocalization Guide
                    </div>
                    
                    <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neuro-200 to-neuro-400 mb-2">
                        {mantra.phonetic}
                    </h2>
                    
                    <div className="w-full h-px bg-neuro-800 my-3" />
                    
                    <div className="grid grid-cols-2 gap-4 w-full text-left">
                        <div className="bg-neuro-900/50 p-3 rounded-lg">
                            <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Pronunciation</div>
                            <div className="text-sm text-neuro-300 font-mono">{mantra.pronunciation || mantra.phonetic}</div>
                        </div>
                        <div className="bg-neuro-900/50 p-3 rounded-lg">
                            <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Tonality</div>
                            <div className="text-sm text-neuro-300 italic">{mantra.tonality || "Natural Voice"}</div>
                        </div>
                    </div>
                    
                    <p className="text-sm text-gray-400 mt-4 italic">"{mantra.meaning}"</p>
                </div>
            )}
        </div>
    );
};
