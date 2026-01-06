import React, { useState, useMemo } from 'react';
import { Protocol } from '../types';
import { Brain, ChevronDown, ChevronRight, Folder, Layers, Zap, Shield, Activity, Monitor, Coffee, Eye, Sparkles, Wind, Heart, Globe, Lock, Pill, FlaskConical, Target, Battery, Moon, Thermometer, Radio, Droplets, FlaskRound, Flame, Microscope, Smile } from 'lucide-react';

interface ProtocolListProps {
    protocols: Protocol[];
    selectedId: string | null;
    onSelect: (p: Protocol) => void;
    mode: 'scientific' | 'speculative';
}

const LEVEL_ORDER: Record<string, number> = {
    'I': 1, 'II': 2, 'III': 3, 'III-IV': 3.5, 'IV': 4, 'IV-V': 4.5, 'V': 5, 'Custom': 6
};

// --- CORE TAXONOMY CONFIGURATION ---
const SECTIONS_CONFIG: Record<string, { label: string, icon: React.ElementType, color: string }> = {
    'Calibration': { label: '1. Calibration & Setup', icon: Folder, color: 'text-gray-500' },
    'Suffering Reduction': { label: '2. Suffering Reduction', icon: Activity, color: 'text-blue-400' },
    'Performance Focus': { label: '3. Performance Focus', icon: Target, color: 'text-yellow-400' },
    'Recovery & Addiction': { label: '4. Recovery & Addiction', icon: Shield, color: 'text-teal-400' },
    'Flow State': { label: '5. Flow State Continuum', icon: Layers, color: 'text-amber-400' },
    'Athletic Performance': { label: '6. Athletic Performance', icon: Battery, color: 'text-orange-400' },
    'Emotional Mastery': { label: '7. Emotional Mastery', icon: Heart, color: 'text-pink-400' },
    'Relationship & Social': { label: '8. Relationship & Social', icon: Globe, color: 'text-cyan-400' },
    'Creative Expression': { label: '9. Creative Expression', icon: Wind, color: 'text-green-400' },
    'Spiritual Integration': { label: '10. Spiritual Integration', icon: Brain, color: 'text-purple-400' },
    'Advanced Research': { label: '11. Advanced Research', icon: Microscope, color: 'text-indigo-400' },
    'Biohacking & Longevity': { label: '12. Biohacking & Longevity', icon: FlaskConical, color: 'text-emerald-400' },
    'Cannabis Mimicry': { label: 'Mimic: Cannabis', icon: Wind, color: 'text-green-500' },
    'MDMA Mimicry': { label: 'Mimic: MDMA', icon: Heart, color: 'text-pink-500' },
    'Stimulant Mimicry': { label: 'Mimic: Stimulants', icon: Zap, color: 'text-orange-500' },
    'Psychedelic Mimicry': { label: 'Mimic: Psychedelics', icon: Sparkles, color: 'text-indigo-500' }
};

export const ProtocolList: React.FC<ProtocolListProps> = ({ protocols, selectedId, onSelect, mode }) => {
    // Default: all categories collapsed (so the archive never loads with expanded sections).
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

    const toggleSection = (section: string) => {
        setOpenSections(prev => ({...prev, [section]: !prev[section]}));
    };

    const groupedProtocols = useMemo(() => {
        const groups: Record<string, Protocol[]> = {};
        
        protocols.forEach(p => {
            if (mode === 'scientific' && (p.category === 'speculative' || p.evidenceLevel === 'V' || p.evidenceLevel === 'IV')) return;
            
            const section = p.section || 'Calibration';
            if (!groups[section]) groups[section] = [];
            groups[section].push(p);
        });

        Object.keys(groups).forEach(key => {
            groups[key].sort((a, b) => {
                const weightA = LEVEL_ORDER[a.evidenceLevel] || 99;
                const weightB = LEVEL_ORDER[b.evidenceLevel] || 99;
                if (weightA !== weightB) return weightA - weightB;
                return a.title.localeCompare(b.title);
            });
        });

        return groups;
    }, [protocols, mode]);

    const sortedSections = [
        'Calibration',
        'Suffering Reduction',
        'Performance Focus',
        'Recovery & Addiction',
        'Flow State', 
        'Athletic Performance',
        'Emotional Mastery',
        'Relationship & Social',
        'Creative Expression',
        'Spiritual Integration',
        'Advanced Research',
        'Biohacking & Longevity',
        'Cannabis Mimicry',
        'MDMA Mimicry',
        'Stimulant Mimicry',
        'Psychedelic Mimicry'
    ].filter(section => groupedProtocols[section]);

    return (
        <div className="space-y-3">
            {sortedSections.map(section => {
                const config = SECTIONS_CONFIG[section] || { label: section, icon: Folder, color: 'text-gray-400' };
                const Icon = config.icon;
                const isOpen = !!openSections[section];
                const count = groupedProtocols[section].length;

                return (
                    <div key={section} className={`rounded-xl overflow-hidden transition-all duration-300 border ${isOpen ? 'bg-neuro-900/40 border-neuro-700 shadow-lg' : 'bg-transparent border-transparent hover:bg-white/5'}`}>
                        <button 
                            onClick={() => toggleSection(section)}
                            className={`w-full flex items-center justify-between p-4 transition-colors ${isOpen ? 'bg-neuro-800/60' : 'bg-neuro-800/30 hover:bg-neuro-800/50'}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-black/20 ${config.color}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <div className={`font-bold text-sm tracking-wide ${isOpen ? 'text-white' : 'text-gray-400'}`}>
                                        {config.label}
                                    </div>
                                    {!isOpen && (
                                        <div className="text-[10px] text-gray-600 font-mono mt-0.5 uppercase">
                                            {count} NODES
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {isOpen && <span className="text-[10px] font-mono text-neuro-500 bg-neuro-500/10 px-2 py-1 rounded border border-neuro-500/20">{count}</span>}
                                {isOpen ? <ChevronDown className="w-4 h-4 text-neuro-500" /> : <ChevronRight className="w-4 h-4 text-gray-600" />}
                            </div>
                        </button>
                        
                        {isOpen && (
                            <div className="p-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                                {groupedProtocols[section].map(p => (
                                    <div 
                                        key={p.id}
                                        onClick={() => onSelect(p)}
                                        className={`p-3 rounded-lg border-l-2 cursor-pointer transition-all duration-200 group relative overflow-hidden ${
                                            selectedId === p.id 
                                            ? 'bg-neuro-500/10 border-neuro-500 shadow-inner shadow-neuro-500/5' 
                                            : 'bg-transparent border-transparent hover:bg-white/5 hover:border-neuro-700 ml-4'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-1 relative z-10">
                                            <h4 className={`font-medium text-xs tracking-tight ${selectedId === p.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                                {p.title}
                                            </h4>
                                            <span className={`text-[8px] px-1.5 py-0.5 rounded border font-bold tracking-wide ${
                                                p.evidenceLevel.includes('I') || p.evidenceLevel.includes('II')
                                                ? 'border-neuro-500/30 text-neuro-400'
                                                : 'border-neuro-accent/30 text-neuro-accent'
                                            }`}>
                                                L{p.evidenceLevel}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[9px] text-gray-600 group-hover:text-gray-500 transition-colors relative z-10 font-mono">
                                            <span className="flex items-center gap-1">
                                                <Target className="w-3 h-3" /> {Math.floor(p.duration / 60)}m
                                            </span>
                                            <span>•</span>
                                            <span className="truncate max-w-[180px]">{p.description}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
