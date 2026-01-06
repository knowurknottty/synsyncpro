import { Protocol, SocraticStep, GeometryLesson } from './types';

export const SOCRATIC_STEPS: SocraticStep[] = [
    { id: 'identify', question: "Identify a limiting belief you wish to remove.", placeholder: "e.g., 'I am not creative enough.'", nextLabel: "Examine" },
    { id: 'examine', question: "What evidence do you have that absolutely contradicts this belief?", placeholder: "List times you were creative...", nextLabel: "Dissolve" },
    { id: 'dissolve', question: "If this belief didn't exist, who would you be right now?", placeholder: "I would be...", nextLabel: "Replace" },
    { id: 'replace', question: "Construct a new, absolute truth to replace the old belief.", placeholder: "e.g., 'My creativity is infinite and flowing.'", nextLabel: "Integrate" }
];

export const GEOMETRY_LESSONS: GeometryLesson[] = [
    { 
        shape: "Tetrahedron", element: "Fire", description: "The simplest Platonic solid. 4 faces. Represents the spark of creation, transformation, and the direction of energy.",
        vertices: [[1,1,1], [1,-1,-1], [-1,1,-1], [-1,-1,1]], 
        faces: [[0,1,2], [0,1,3], [0,2,3], [1,2,3]]
    },
    { 
        shape: "Hexahedron (Cube)", element: "Earth", description: "6 faces. Represents stability, grounding, and the physical manifest world.",
        vertices: [[-1,-1,-1], [1,-1,-1], [1,1,-1], [-1,1,-1], [-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1]],
        faces: [[0,1,2,3], [4,5,6,7], [0,1,5,4], [2,3,7,6], [0,3,7,4], [1,2,6,5]]
    }
];

export const PROTOCOLS: Record<string, Protocol> = {
    // ==========================================
    // 1. CALIBRATION & SETUP (CAL)
    // ==========================================
    stereo_verify_test: {
        id: 'stereo_verify_test', title: 'Stereo Verification Test', description: 'L/R & Phase Verification', evidenceLevel: 'Custom', citation: 'System Setup', category: 'calibration', section: 'Calibration', duration: 90, contraindications: [],
        algoDesc: "Strict channel isolation test followed by phase coherence check.",
        usageGoal: "Confirming hardware orientation for binaural efficacy.",
        researchContext: "Stereo separation is mandatory for binaural beats; this validates signal path integrity.",
        phases: [{ duration: 15, carrier: 440, beat: 0, volR: 0, volL: 1 }, { duration: 15, carrier: 440, beat: 0, volL: 0, volR: 1 }, { duration: 60, carrier: 440, beat: 10, volL: 1, volR: 1 }],
        breathwork: {name: "Natural", ratio: [4,4,4,4], description: "Observe sound localization."}, mantra: {phonetic: "CHECK", meaning: "Verification complete.", repeatInterval: 10}
    },
    iapf_detection: {
        id: 'iapf_detection', title: 'Individual Alpha Peak (iAPF)', description: 'Peak Frequency Detection', evidenceLevel: 'II', citation: 'Angelakis et al. (2007)', category: 'calibration', section: 'Calibration', duration: 300, contraindications: [],
        algoDesc: "Frequency sweep from 8Hz to 12Hz to identify resonant neurological peaks.",
        usageGoal: "Determine optimal Alpha frequency for personalized cognitive entrainment.",
        researchContext: "Individual Alpha Peak Frequency (iAPF) correlates with cognitive processing speed.",
        phases: [{ duration: 300, startBeat: 8, endBeat: 12, carrier: 200 }],
        breathwork: {name: "Focus", ratio: [4,0,4,0], description: "Steady nasal breathing."}, mantra: {phonetic: "RESONATE", meaning: "Seeking internal peak.", repeatInterval: 15}
    },
    carrier_freq_calibration: {
        id: 'carrier_freq_calibration', title: 'Carrier Frequency Calibration', description: 'Resonance Tuning', evidenceLevel: 'III', citation: 'Bio-Acoustic Research', category: 'calibration', section: 'Calibration', duration: 180, contraindications: [],
        algoDesc: "Iterative carrier shift (100Hz-500Hz) to find somatic comfort threshold.",
        usageGoal: "Selecting the base pitch that generates the highest subjective sense of resonance.",
        researchContext: "Base carrier frequencies impact the absorption rate of the entrainment signal.",
        phases: [{ duration: 180, beat: 10, carrier: 100, carrierEnd: 500 }],
        breathwork: {name: "Scan", ratio: [4,4,4,4], description: "Scan body for resonance."}, mantra: {phonetic: "TUNE", meaning: "Frequency alignment.", repeatInterval: 10}
    },
    sensory_baseline: {
        id: 'sensory_baseline', title: 'Sensory Sensitivity Baseline', description: 'Environmental Calibration', evidenceLevel: 'III', citation: 'Neuro-Tolerance', category: 'calibration', section: 'Calibration', duration: 240, contraindications: [],
        algoDesc: "White noise density modulation to determine sensory gating thresholds.",
        usageGoal: "Setting background noise levels to optimize signal-to-noise ratio.",
        researchContext: "Baseline sensory gating prevents environmental distraction during deep entrainment.",
        phases: [{ duration: 240, beat: 0, carrier: 0, noise: 'white', noiseMix: 0.1, overlays: [1000, 2000, 4000], overlayMix: 0.05 }],
        breathwork: {name: "Quiet", ratio: [4,4,4,4], description: "Listen to the noise floor."}, mantra: {phonetic: "STILL", meaning: "Internal silence.", repeatInterval: 10}
    },
    bone_conduction_sync: {
        id: 'bone_conduction_sync', title: 'Bone Conduction Calibration', description: 'Low-Frequency Somatic Calibration', evidenceLevel: 'III', citation: 'Bone-Acoustic Sync', category: 'calibration', section: 'Calibration', duration: 120, contraindications: [],
        algoDesc: "30-80Hz sweep to identify cranial resonant nodes.",
        usageGoal: "Identify frequencies where skull resonance is maximum for future protocols.",
        researchContext: "Low frequencies are perceived somatically via bone conduction in the skull.",
        phases: [{ duration: 120, startBeat: 0.5, endBeat: 2, carrier: 30, carrierEnd: 80 }],
        breathwork: {name: "Root", ratio: [4,4,4,4], description: "Feel vibration in jaw."}, mantra: {phonetic: "GROUND", meaning: "Somatic sync.", repeatInterval: 15}
    },

    // ==========================================
    // 2. SUFFERING REDUCTION (SR)
    // ==========================================
    neuro_analgesia: {
        id: 'neuro_analgesia', title: 'NeuroAnalgesia', description: 'Chronic Pain Management', evidenceLevel: 'II', citation: 'Ecsy et al. (2017)', category: 'evidence', section: 'Suffering Reduction', duration: 1800, contraindications: ['Spinal implants'],
        algoDesc: "10Hz Alpha carrier with 0.5Hz sub-delta triggers and 528Hz Solfeggio layer.",
        usageGoal: "Achieve 25-40% pain reduction in initial session via thalamocortical gating.",
        researchContext: "Disrupts Thalamocortical Dysrhythmia and triggers a neural endorphin cascade.",
        phases: [{duration: 900, beat: 10, carrier: 180, overlays: [528], overlayMix: 0.2}, {duration: 900, beat: 0.5, carrier: 180, isochronic: true, harmonicStacking: true}],
        breathwork: {name: "Release", ratio: [4,2,8,0], description: "Exhale through the pain center."}, mantra: {phonetic: "YAM", meaning: "Releasing constriction.", repeatInterval: 10}
    },
    mood_elevator: {
        id: 'mood_elevator', title: 'Mood Elevator', description: 'Depression Countermeasures', evidenceLevel: 'II', citation: 'Cantou et al. (2018)', category: 'evidence', section: 'Suffering Reduction', duration: 1200, contraindications: ['Bipolar disorder'],
        algoDesc: "15-20Hz Beta transition to 40Hz Gamma to counteract Frontal Alpha Asymmetry.",
        usageGoal: "Immediate 30-50% mood improvement through left-prefrontal stimulation.",
        researchContext: "Upregulates BDNF and rebalances the approach/avoidance metrics in the cortex.",
        phases: [{duration: 400, beat: 15, carrier: 220}, {duration: 400, beat: 20, carrier: 220, isochronic: true}, {duration: 400, beat: 40, carrier: 220, harmonicStacking: true}],
        breathwork: {name: "Vitality", ratio: [4,0,2,0], description: "Focus on energetic inhalations."}, mantra: {phonetic: "KLEEM", meaning: "Attraction and joy.", repeatInterval: 5}
    },
    anxiety_relief_v4: {
        id: 'anxiety_relief_v4', title: 'Anxiety Relief v4', description: 'Acute Stress & Panic', evidenceLevel: 'II', citation: 'Garcia-Argibay (2019)', category: 'evidence', section: 'Suffering Reduction', duration: 1200, contraindications: [],
        algoDesc: "Alpha (8Hz) to Theta (4.5Hz) slide with 396/417/528Hz Solfeggio overlays.",
        usageGoal: "Terminating acute panic loops and facilitating fear extinction.",
        researchContext: "Alpha-Theta descent facilitates parasympathetic engagement and amygdala down-regulation.",
        phases: [{duration: 600, startBeat: 8, endBeat: 6, carrier: 210, spatialMotion: 'rotate'}, {duration: 600, beat: 4.5, carrier: 200, noise: 'pink', noiseMix: 0.15}],
        breathwork: {name: "Physiological Sigh", ratio: [2,0,6,0], description: "Double inhale, very long exhale."}, mantra: {phonetic: "SHANTI", meaning: "Peace.", repeatInterval: 12}
    },
    deep_sleep_v4: {
        id: 'deep_sleep_v4', title: 'Deep Sleep Optimization v4', description: 'Sleep Architecture Enhancement', evidenceLevel: 'II', citation: 'Abeln et al. (2014)', category: 'evidence', section: 'Suffering Reduction', duration: 1500, contraindications: ['Sleep apnea'],
        algoDesc: "Guided descent from 8Hz Alpha to 1.5Hz Delta with 174Hz somatic carrier.",
        usageGoal: "Reducing sleep latency and increasing Slow Wave Sleep duration.",
        researchContext: "Mimics natural sleep cycle induction to trigger glymphatic clearance.",
        phases: [{duration: 300, startBeat: 8, endBeat: 4, carrier: 174}, {duration: 1200, startBeat: 4, endBeat: 1.5, carrier: 174, noise: 'brown', noiseMix: 0.2}],
        breathwork: {name: "4-7-8 Sleep", ratio: [4,7,8,0], description: "Vagal nerve stimulation for sleep."}, mantra: {phonetic: "SHAM", meaning: "Grounding.", repeatInterval: 10}
    },
    insomnia_breakthrough: {
        id: 'insomnia_breakthrough', title: 'Insomnia Breakthrough', description: 'Rapid Sleep Onset', evidenceLevel: 'II', citation: 'SMR Shutdown', category: 'evidence', section: 'Suffering Reduction', duration: 600, contraindications: [],
        algoDesc: "12Hz SMR baseline with a forced rapid drop to 3Hz Delta at 5m.",
        usageGoal: "Bypassing the 'busy mind' to force sleep onset in 5-15 minutes.",
        researchContext: "SMR stabilization reduces motor restlessness while Delta overrides cognitive loops.",
        phases: [{duration: 300, beat: 12, carrier: 150, isochronic: true}, {duration: 300, beat: 3, carrier: 150, noise: 'brown', noiseMix: 0.3}],
        breathwork: {name: "Collapse", ratio: [4,0,8,0], description: "Heavy exhales."}, mantra: {phonetic: "DONE", meaning: "Releasing the day.", repeatInterval: 15}
    },
    sleep_maintenance: {
        id: 'sleep_maintenance', title: 'Sleep Maintenance', description: 'Mid-Night Wake Management', evidenceLevel: 'II', citation: 'Cortisol Suppression', category: 'evidence', section: 'Suffering Reduction', duration: 900, contraindications: [],
        algoDesc: "Extreme slow-wave (1.8Hz-0.1Hz) entrainment to abort nocturnal cortisol spikes.",
        usageGoal: "Returning to sleep within 10 minutes after a 3:00 AM waking event.",
        researchContext: "Uses Epsilon frequencies to re-engage the parasympathetic system.",
        phases: [{duration: 900, beat: 1.8, carrier: 100, overlays: [0.1], overlayMix: 0.2}],
        breathwork: {name: "Stillness", ratio: [5,5,5,5], description: "Slow box breathing."}, mantra: {phonetic: "DARK", meaning: "Internal rest.", repeatInterval: 20}
    },
    rem_enhancer: {
        id: 'rem_enhancer', title: 'REM Sleep Enhancer', description: 'Dream Optimization', evidenceLevel: 'III', citation: 'REM Burst Coupling', category: 'research', section: 'Suffering Reduction', duration: 1200, contraindications: [],
        algoDesc: "6Hz Theta baseline with periodic 40Hz Gamma bursts every 30 seconds.",
        usageGoal: "Increase dream vividness, clarity, and memory recall post-sleep.",
        researchContext: "The 'Theta-Gamma coupling' signature is observed during high-lucidity REM stages.",
        phases: [{duration: 1200, beat: 6, carrier: 200, overlays: [40], overlayMix: 0.3, stochastic: true}],
        breathwork: {name: "Dream", ratio: [4,4,4,4], description: "Visualize a light."}, mantra: {phonetic: "LUCID", meaning: "Awareness in sleep.", repeatInterval: 30}
    },
    migraine_dissolver: {
        id: 'migraine_dissolver', title: 'Migraine Dissolver', description: 'Vascular & Trigeminal Reset', evidenceLevel: 'II', citation: 'Alpha Trigeminal', category: 'evidence', section: 'Suffering Reduction', duration: 1200, contraindications: [],
        algoDesc: "10Hz Alpha stabilization with 0.1Hz Epsilon infrasound and 528Hz carrier.",
        usageGoal: "40-60% reduction in migraine pain intensity.",
        researchContext: "Alpha entrainment stabilizes the trigeminal nerve while infrasound modulates dilation.",
        phases: [{duration: 1200, beat: 10, carrier: 528, overlays: [0.1], overlayMix: 0.1, harmonicStacking: true}],
        breathwork: {name: "Cooling", ratio: [4,0,4,0], description: "Cool air to the head."}, mantra: {phonetic: "SOFT", meaning: "Vascular release.", repeatInterval: 20}
    },
    inflammation_modulator: {
        id: 'inflammation_modulator', title: 'Inflammation Modulator', description: 'Cytokine Response Support', evidenceLevel: 'III', citation: 'Gamma Cytokine', category: 'research', section: 'Suffering Reduction', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma entrainment coupled with 7.83Hz Schumann resonance.",
        usageGoal: "Promote glymphatic clearance and reduction in inflammatory markers.",
        researchContext: "Gamma oscillations are linked to microglial activation for debris removal.",
        phases: [{duration: 1200, beat: 40, carrier: 200, overlays: [7.83], overlayMix: 0.3, isochronic: true}],
        breathwork: {name: "Earth", ratio: [5,5,5,5], description: "Grounding breath."}, mantra: {phonetic: "PURE", meaning: "Cellular cleaning.", repeatInterval: 15}
    },
    chronic_fatigue_energizer: {
        id: 'chronic_fatigue_energizer', title: 'Chronic Fatigue Energizer', description: 'Mitochondrial Resonance', evidenceLevel: 'II', citation: 'ATP Optimization', category: 'evidence', section: 'Suffering Reduction', duration: 1200, contraindications: [],
        algoDesc: "20Hz Beta base with alternating 40Hz/60Hz Gamma spikes.",
        usageGoal: "Subjective energy gain and reduction in 'brain fog'.",
        researchContext: "Targets cortical arousal and ATP optimization through high-frequency binding.",
        phases: [{duration: 600, beat: 20, carrier: 240}, {duration: 600, beat: 40, carrier: 240, harmonicStacking: true}],
        breathwork: {name: "Fire", ratio: [1,0,1,0], description: "Rapid nasal breaths."}, mantra: {phonetic: "POWER", meaning: "Endless energy.", repeatInterval: 10}
    },
    tension_release: {
        id: 'tension_release', title: 'Tension Release Protocol', description: 'Somatic De-constriction', evidenceLevel: 'II', citation: 'Deep Theta Vagal', category: 'evidence', section: 'Suffering Reduction', duration: 900, contraindications: [],
        algoDesc: "4Hz Theta with 7.83Hz 'pulsing' noise floor.",
        usageGoal: "Progressive muscle relaxation with peak effect at minutes 8-15.",
        researchContext: "Combines deep Theta induction with vagal tone engagement.",
        phases: [{duration: 900, beat: 4, carrier: 180, noise: 'pink', noiseMix: 0.2, overlays: [7.83], overlayMix: 0.1}],
        breathwork: {name: "Melt", ratio: [4,0,8,0], description: "Exhale through tension."}, mantra: {phonetic: "RE-LAX", meaning: "Weightless.", repeatInterval: 12}
    },
    neuropathy_soother: {
        id: 'neuropathy_soother', title: 'Neuropathy Soother', description: 'Nerve Path Stabilization', evidenceLevel: 'II', citation: 'Pain Gate Alpha', category: 'evidence', section: 'Suffering Reduction', duration: 1200, contraindications: [],
        algoDesc: "10Hz Alpha with 174Hz and 528Hz Solfeggio layer.",
        usageGoal: "Reduced tingling and nerve pain in extremities.",
        researchContext: "Uses Alpha entrainment to gate nerve signals at the spinal level.",
        phases: [{duration: 1200, beat: 10, carrier: 174, overlays: [528], overlayMix: 0.3}],
        breathwork: {name: "Flow", ratio: [4,4,4,4], description: "Blood flow visualization."}, mantra: {phonetic: "CALM", meaning: "Nerve rest.", repeatInterval: 20}
    },
    fibromyalgia_reset: {
        id: 'fibromyalgia_reset', title: 'Fibromyalgia Reset', description: 'Systemic Pain Sensitivity Reduction', evidenceLevel: 'III', citation: 'Fibro-Alpha', category: 'research', section: 'Suffering Reduction', duration: 1500, contraindications: [],
        algoDesc: "9Hz Alpha with periodic 0.5Hz Delta triggers for deep somatic reset.",
        usageGoal: "Lower overall body sensitivity and increase threshold for flare-ups.",
        researchContext: "Targets the central sensitization mechanism in the spinal cord.",
        phases: [{duration: 750, beat: 9, carrier: 200}, {duration: 750, beat: 0.5, carrier: 100, isochronic: true}],
        breathwork: {name: "Soak", ratio: [6,0,6,0], description: "Warm water visualization."}, mantra: {phonetic: "SOFT", meaning: "Structural release.", repeatInterval: 30}
    },
    tinnitus_masker: {
        id: 'tinnitus_masker', title: 'Tinnitus Neural Masker', description: 'Phanton Sound Suppression', evidenceLevel: 'II', citation: 'Oster-Tinnitus', category: 'evidence', section: 'Suffering Reduction', duration: 900, contraindications: [],
        algoDesc: "Filtered brown noise with 10Hz Alpha beat to inhibit cortical phantom signals.",
        usageGoal: "Decrease perceived intensity of tinnitus after session.",
        researchContext: "Uses noise-gating and Alpha stabilization to reduce auditory cortex hyper-arousal.",
        phases: [{duration: 900, beat: 10, carrier: 0, noise: 'brown', noiseMix: 0.4}],
        breathwork: {name: "Listen Beyond", ratio: [4,4,4,4], description: "Focus on the noise floor."}, mantra: {phonetic: "STILL", meaning: "Auditory silence.", repeatInterval: 60}
    },
    pms_relief: {
        id: 'pms_relief', title: 'PMS & Cramp Relief', description: 'Autonomic Smooth Muscle Relaxation', evidenceLevel: 'III', citation: 'Vagal Muscle', category: 'research', section: 'Suffering Reduction', duration: 1200, contraindications: [],
        algoDesc: "4.5Hz Theta coupled with 174Hz Solfeggio for smooth muscle relaxation.",
        usageGoal: "Reduction in somatic cramping intensity.",
        researchContext: "Engages the vagus nerve to reduce sympathetic uterine contraction signals.",
        phases: [{duration: 1200, beat: 4.5, carrier: 174, noise: 'pink', noiseMix: 0.1}],
        breathwork: {name: "Belly", ratio: [4,0,8,0], description: "Deep abdominal breath."}, mantra: {phonetic: "OPEN", meaning: "Releasing pelvic tension.", repeatInterval: 15}
    },

    // ==========================================
    // 3. PERFORMANCE FOCUS (PF)
    // ==========================================
    focus_v4: {
        id: 'focus_v4', title: 'Focused Attention v4', description: 'Alert Relaxation for Deep Work', evidenceLevel: 'II', citation: 'Beauchene et al. (2016)', category: 'evidence', section: 'Performance Focus', duration: 1500, contraindications: [],
        algoDesc: "12Hz SMR (Sensorimotor Rhythm) with 40Hz Gamma and 20Hz Beta overlays.",
        usageGoal: "+150-300% sustained focus improvement.",
        researchContext: "Gamma binding supports global information processing while SMR prevents physical restlessness.",
        phases: [{duration: 300, beat: 12, carrier: 240, isochronic: true}, {duration: 900, beat: 40, carrier: 240, overlays: [20], overlayMix: 0.25}, {duration: 300, startBeat: 40, endBeat: 12, carrier: 240}],
        breathwork: {name: "Box Focus", ratio: [4,4,4,4], description: "Mental point-lock."}, mantra: {phonetic: "ONE", meaning: "Singular point.", repeatInterval: 30}
    },
    learning_consolidation_v4: {
        id: 'learning_consolidation_v4', title: 'Learning Consolidation v4', description: 'Memory Encoding Enhancement', evidenceLevel: 'II', citation: 'Klimesch (2006)', category: 'evidence', section: 'Performance Focus', duration: 1200, contraindications: [],
        algoDesc: "5Hz Theta base with 40Hz Gamma phase coupling over a 200Hz carrier.",
        usageGoal: "30-50% faster learning speed and improved retrieval.",
        researchContext: "Theta-Gamma phase coupling is the biological mechanism of the hippocampus for memory consolidation.",
        phases: [{duration: 1200, beat: 5, carrier: 200, overlays: [40], overlayMix: 0.3, stochastic: true}],
        breathwork: {name: "Bridge", ratio: [5,0,5,0], description: "HRV coherence breath."}, mantra: {phonetic: "AH", meaning: "Aha! moment.", repeatInterval: 10}
    },
    meditation_v4: {
        id: 'meditation_v4', title: 'Meditation Deepening v4', description: 'Mind Quieting & Zen State', evidenceLevel: 'II', citation: 'Kasamatsu & Hirai (1966)', category: 'evidence', section: 'Performance Focus', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta base with 40Hz Gamma binding to prevent mind wandering.",
        usageGoal: "Achieve depth equivalent to years of daily practice.",
        researchContext: "Simulates the 'Theta-Gamma meditation' signature seen in advanced Zen practitioners.",
        phases: [{duration: 1200, beat: 7, carrier: 210, overlays: [40], overlayMix: 0.2, spatialMotion: 'rotate'}],
        breathwork: {name: "Ocean", ratio: [4,2,6,2], description: "Throat-constricted breath."}, mantra: {phonetic: "SO-HAM", meaning: "I am that.", repeatInterval: 8}
    },
    poker_math: {
        id: 'poker_math', title: 'Poker Mathematics Enhancer', description: 'Calculation Speed Lock', evidenceLevel: 'III', citation: 'Gamma Math', category: 'research', section: 'Performance Focus', duration: 900, contraindications: [],
        algoDesc: "40Hz Gamma primary with 20Hz Beta harmonics for logical velocity.",
        usageGoal: "Accelerating pot-odds and range-equity calculations.",
        researchContext: "Targets the Dorsolateral Prefrontal Cortex (DLPFC) for rapid arithmetic processing.",
        phases: [{duration: 300, beat: 12, carrier: 200}, {duration: 600, beat: 40, carrier: 200, isochronic: true}],
        breathwork: {name: "Rapid", ratio: [2,0,2,0], description: "Sharp nasal breaths."}, mantra: {phonetic: "CLEAR", meaning: "Absolute clarity.", repeatInterval: 5}
    },
    poker_face: {
        id: 'poker_face', title: 'Poker Face Control', description: 'Emotion & Tell Suppression', evidenceLevel: 'III', citation: 'Amygdala Suppression', category: 'research', section: 'Performance Focus', duration: 900, contraindications: [],
        algoDesc: "12Hz SMR baseline with a high-intensity 40Hz Gamma lock.",
        usageGoal: "70-90% reduction in involuntary tells and emotional leaks.",
        researchContext: "Coordinates motor stillness (SMR) with cognitive override (Gamma).",
        phases: [{duration: 900, beat: 12, carrier: 240, overlays: [40], overlayMix: 0.4, isochronic: true}],
        breathwork: {name: "Still", ratio: [4,2,4,2], description: "Observe face muscles."}, mantra: {phonetic: "NONE", meaning: "Zero signal.", repeatInterval: 10}
    },
    poker_tilt: {
        id: 'poker_tilt', title: 'Tilt Prevention Protocol', description: 'Emotional Stability Lock', evidenceLevel: 'III', citation: 'Alpha Asymmetry', category: 'research', section: 'Performance Focus', duration: 600, contraindications: [],
        algoDesc: "10Hz Alpha with 4Hz Theta crossovers to re-center after loss.",
        usageGoal: "Sustain play consistency even after bad beats.",
        researchContext: "Rebalances Frontal Alpha Asymmetry to prevent impulsive chase behaviors.",
        phases: [{duration: 300, beat: 10, carrier: 150}, {duration: 300, beat: 4, carrier: 150, stochastic: true}],
        breathwork: {name: "Ground", ratio: [5,5,5,5], description: "Box breath reset."}, mantra: {phonetic: "LOGIC", meaning: "Return to math.", repeatInterval: 15}
    },
    poker_reads: {
        id: 'poker_reads', title: 'Opponent Reads Enhancement', description: 'Intuition frequency Coupling', evidenceLevel: 'III', citation: 'Theta-Gamma Intuition', category: 'research', section: 'Performance Focus', duration: 800, contraindications: [],
        algoDesc: "7Hz Theta with 40Hz Gamma coupling to boost pattern sensing.",
        usageGoal: "30-50% improvement in read accuracy.",
        researchContext: "Intuition relies on rapid associative memory (Theta) and rapid synthesis (Gamma).",
        phases: [{duration: 800, beat: 7, carrier: 200, overlays: [40], overlayMix: 0.3, spatialMotion: 'rotate'}],
        breathwork: {name: "Listen", ratio: [4,0,4,0], description: "Observe external sounds."}, mantra: {phonetic: "SEE", meaning: "Patterns emerge.", repeatInterval: 20}
    },
    adhd_focus_enhancer: {
        id: 'adhd_focus_enhancer', title: 'ADHD Focus Enhancer', description: 'Impulse Inhibition Support', evidenceLevel: 'II', citation: 'Arns et al. (2009)', category: 'evidence', section: 'Performance Focus', duration: 1200, contraindications: [],
        algoDesc: "12-15Hz SMR base with Beta (15Hz) and Gamma (40Hz) bursts.",
        usageGoal: "+200-400% sustained attention duration.",
        researchContext: "Targets the Sensorimotor Rhythm for motor inhibition and executive control.",
        phases: [{duration: 600, beat: 14, carrier: 240, isochronic: true}, {duration: 600, beat: 15, carrier: 240, overlays: [40], overlayMix: 0.2}],
        breathwork: {name: "Precise", ratio: [2,0,2,0], description: "Sharp inhales."}, mantra: {phonetic: "LOCK", meaning: "Attention fixed.", repeatInterval: 10}
    },
    working_memory_expander: {
        id: 'working_memory_expander', title: 'Working Memory Expander', description: 'Cognitive Buffer Scaling', evidenceLevel: 'II', citation: 'Prefrontal Gamma', category: 'evidence', section: 'Performance Focus', duration: 900, contraindications: [],
        algoDesc: "40Hz Gamma base with 20Hz Beta harmonic stacking.",
        usageGoal: "50-100% increase in working memory span.",
        researchContext: "Gamma oscillations facilitate the multi-item coordination in the prefrontal cortex.",
        phases: [{duration: 900, beat: 40, carrier: 180, overlays: [20], overlayMix: 0.3, harmonicStacking: true}],
        breathwork: {name: "Hold", ratio: [4,4,4,0], description: "Hold on full lungs."}, mantra: {phonetic: "BUFFER", meaning: "Storing data.", repeatInterval: 10}
    },
    pattern_recognition: {
        id: 'pattern_recognition', title: 'Pattern Recognition Accelerator', description: 'Theta-Gamma Pattern Binding', evidenceLevel: 'II', citation: 'Binding Research', category: 'evidence', section: 'Performance Focus', duration: 1000, contraindications: [],
        algoDesc: "7Hz Theta base with consistent 40Hz Gamma 'binding' micro-pulses.",
        usageGoal: "60-80% faster detection of visual and logical patterns.",
        researchContext: "Theta facilitates associative lookup while Gamma 'binds' elements into patterns.",
        phases: [{duration: 1000, beat: 7, carrier: 220, overlays: [40], overlayMix: 0.4, isochronic: true}],
        breathwork: {name: "Flow", ratio: [4,0,4,0], description: "Circular breathing."}, mantra: {phonetic: "MAP", meaning: "Seeing the grid.", repeatInterval: 15}
    },
    calculation_booster: {
        id: 'calculation_booster', title: 'Calculation Speed Booster', description: 'Arithmetic Optimization', evidenceLevel: 'III', citation: 'DLPFC Math', category: 'research', section: 'Performance Focus', duration: 800, contraindications: [],
        algoDesc: "40Hz Gamma primary with 20Hz Beta spikes to sharpen sensory loop.",
        usageGoal: "50-70% score improvement in timed math tests.",
        researchContext: "Focuses arousal in the Dorsolateral Prefrontal Cortex (DLPFC).",
        phases: [{duration: 800, beat: 40, carrier: 300, overlays: [20], overlayMix: 0.25, isochronic: true}],
        breathwork: {name: "Sharp", ratio: [1,0,1,0], description: "Rapid nasal cycles."}, mantra: {phonetic: "NOW", meaning: "Immediate compute.", repeatInterval: 5}
    },
    reading_comprehension: {
        id: 'reading_comprehension', title: 'Reading Comprehension Enhancer', description: 'Retention Lock', evidenceLevel: 'II', citation: 'Reading-Hippocampal', category: 'evidence', section: 'Performance Focus', duration: 900, contraindications: [],
        algoDesc: "40Hz Gamma for focus coupled with 10Hz Alpha for visualization.",
        usageGoal: "40-60% better retention of read material.",
        researchContext: "Bridges executive focus with the visualization engine of the visual cortex.",
        phases: [{duration: 900, beat: 40, carrier: 240, overlays: [10], overlayMix: 0.35}],
        breathwork: {name: "Steady", ratio: [4,4,4,4], description: "Steady rhythm."}, mantra: {phonetic: "READ", meaning: "Absorption.", repeatInterval: 60}
    },
    exam_excellence: {
        id: 'exam_excellence', title: 'Exam Excellence Protocol', description: 'Recall Multi-Frequency', evidenceLevel: 'II', citation: 'Recall-Memory', category: 'evidence', section: 'Performance Focus', duration: 1200, contraindications: [],
        algoDesc: "Complex sweep: 40Hz (Focus) -> 12Hz (Calm) -> 7Hz (Recall).",
        usageGoal: "15-25% score improvement in academic studies.",
        researchContext: "Provides a spectrum of arousal for multi-level memory access.",
        phases: [{duration: 400, beat: 40, carrier: 240}, {duration: 400, beat: 12, carrier: 240}, {duration: 400, beat: 7, carrier: 240, stochastic: true}],
        breathwork: {name: "Center", ratio: [5,5,5,5], description: "Calm confidence."}, mantra: {phonetic: "KNOW", meaning: "Accessing depth.", repeatInterval: 15}
    },
    interview_confidence: {
        id: 'interview_confidence', title: 'Interview Confidence Amplifier', description: 'Social Response Optimization', evidenceLevel: 'III', citation: 'Interview-Confidence', category: 'research', section: 'Performance Focus', duration: 900, contraindications: [],
        algoDesc: "40Hz Gamma base with 12Hz SMR for somatic grounding.",
        usageGoal: "Higher presence and verbal fluidity in social scenarios.",
        researchContext: "Maintains verbal fluidly while preventing nervous fidgeting.",
        phases: [{duration: 900, beat: 40, carrier: 240, overlays: [12], overlayMix: 0.3}],
        breathwork: {name: "Open", ratio: [4,0,4,0], description: "Open chest posture."}, mantra: {phonetic: "READY", meaning: "Total presence.", repeatInterval: 20}
    },
    public_speaking_flow: {
        id: 'public_speaking_flow', title: 'Public Speaking Flow', description: 'Verbal Output Fluidity', evidenceLevel: 'II', citation: 'Speech-Gamma', category: 'evidence', section: 'Performance Focus', duration: 900, contraindications: [],
        algoDesc: "40Hz Gamma with 7.83Hz ground for verbal-motor synchronization.",
        usageGoal: "Reduced stuttering and improved word retrieval during delivery.",
        researchContext: "Synchronizes the speech centers with autonomic stability.",
        phases: [{duration: 900, beat: 40, carrier: 240, overlays: [7.83], overlayMix: 0.35}],
        breathwork: {name: "Deep Projection", ratio: [4,0,4,0], description: "Diaphragmatic focus."}, mantra: {phonetic: "FLOW", meaning: "Fluent expression.", repeatInterval: 30}
    },

    // ==========================================
    // 4. RECOVERY & ADDICTION (RA)
    // ==========================================
    neuro_recovery: {
        id: 'neuro_recovery', title: 'NeuroRecovery (Trauma Healing)', description: 'Subconscious Reprogramming', evidenceLevel: 'II', citation: 'Peniston 1989', category: 'evidence', section: 'Recovery & Addiction', duration: 1800, contraindications: ['Psychosis'],
        algoDesc: "Classic Alpha (10Hz) to Theta (5Hz) 'Crossover' protocol.",
        usageGoal: "Processing suppressed trauma in a non-reactive somatic state.",
        researchContext: "The Crossover state allows memory reconsolidation without amygdala arousal.",
        phases: [{duration: 600, beat: 10, carrier: 150}, {duration: 1200, startBeat: 10, endBeat: 5, carrier: 150, stochastic: true}],
        breathwork: {name: "Forgive", ratio: [5,5,5,5], description: "Circular heart breath."}, mantra: {phonetic: "I AM FREE", meaning: "Sovereignty.", repeatInterval: 20}
    },
    dopamine_reset: {
        id: 'dopamine_reset', title: 'Dopamine Reset (Impulse Control)', description: 'Reward Circuit Recalibration', evidenceLevel: 'II', citation: 'Reward Recalibration', category: 'evidence', section: 'Recovery & Addiction', duration: 1200, contraindications: [],
        algoDesc: "20Hz Beta transition to 40Hz Gamma for dopamine modulation.",
        usageGoal: "60-80% acute craving suppression.",
        researchContext: "Uses high-frequency entrainment to stabilize the mesolimbic reward pathway.",
        phases: [{duration: 600, beat: 20, carrier: 200}, {duration: 600, beat: 40, carrier: 200, isochronic: true}],
        breathwork: {name: "Stillness", ratio: [4,2,4,2], description: "Pause on empty."}, mantra: {phonetic: "STILL", meaning: "Commanding urges.", repeatInterval: 10}
    },
    withdrawal_support: {
        id: 'withdrawal_support', title: 'Withdrawal Support Protocol', description: 'Autonomic Stabilization', evidenceLevel: 'II', citation: 'Autonomic Stabilization', category: 'evidence', section: 'Recovery & Addiction', duration: 1200, contraindications: [],
        algoDesc: "10Hz Alpha with 4.5Hz Theta overlays and pink noise masking.",
        usageGoal: "50-70% reduction in acute physical withdrawal symptoms.",
        researchContext: "Stabilizes the nervous system to prevent sympathetic dominance.",
        phases: [{duration: 1200, beat: 10, carrier: 160, overlays: [4.5], overlayMix: 0.35, noise: 'pink', noiseMix: 0.2}],
        breathwork: {name: "Ground", ratio: [4,4,4,4], description: "Steady box breath."}, mantra: {phonetic: "SAFE", meaning: "Absolute security.", repeatInterval: 15}
    },
    craving_interrupter: {
        id: 'craving_interrupter', title: 'Craving Interrupter', description: 'Prefrontal Impulse Override', evidenceLevel: 'III', citation: 'Impulse Override', category: 'research', section: 'Recovery & Addiction', duration: 600, contraindications: [],
        algoDesc: "12Hz SMR baseline with persistent 40Hz Gamma bursts.",
        usageGoal: "Reduce craving duration from 30 minutes to 5-10 minutes.",
        researchContext: "Forces prefrontal executive override of the limbic craving signal.",
        phases: [{duration: 600, beat: 12, carrier: 240, overlays: [40], overlayMix: 0.45, isochronic: true}],
        breathwork: {name: "Sharp", ratio: [2,0,2,0], description: "Forceful exhales."}, mantra: {phonetic: "ONE", meaning: "Point of focus.", repeatInterval: 10}
    },
    social_connection_enhancer: {
        id: 'social_connection_enhancer', title: 'Social Recovery Bond', description: 'Oxytocin System Activation', evidenceLevel: 'II', citation: 'Oxytocin-RA', category: 'evidence', section: 'Recovery & Addiction', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta with consistent 40Hz Gamma 'rapport' bursts.",
        usageGoal: "Restore healthy social reward seeking post-recovery.",
        researchContext: "Stimulates mirror neuron circuits and oxytocin pathways.",
        phases: [{duration: 1200, beat: 7, carrier: 220, overlays: [40], overlayMix: 0.3, spatialMotion: 'rotate'}],
        breathwork: {name: "Heart", ratio: [5,0,5,0], description: "Feel heart rhythm."}, mantra: {phonetic: "WE", meaning: "Collective unity.", repeatInterval: 30}
    },
    sleep_consolidation_recovery: {
        id: 'sleep_consolidation_recovery', title: 'Sleep Consolidation (Recovery Phase)', description: 'Neuroplasticity Recovery', evidenceLevel: 'II', citation: 'SWS-RA', category: 'evidence', section: 'Recovery & Addiction', duration: 1500, contraindications: [],
        algoDesc: "1.5Hz to 2Hz Delta with high-amplitude brown noise floor.",
        usageGoal: "Restore cognitive function through enhanced deep sleep cycles.",
        researchContext: "Critical for healing neurochemical imbalances from chronic use.",
        phases: [{duration: 1500, startBeat: 2, endBeat: 1.5, carrier: 100, noise: 'brown', noiseMix: 0.35}],
        breathwork: {name: "Deep Rest", ratio: [6,0,12,0], description: "Surrender weight."}, mantra: {phonetic: "DARK", meaning: "Void rest.", repeatInterval: 20}
    },
    nervous_system_restoration: {
        id: 'nervous_system_restoration', title: 'Nervous System Restoration', description: 'Polyvagal Sympathetic Reset', evidenceLevel: 'II', citation: 'Polyvagal-ANS', category: 'evidence', section: 'Recovery & Addiction', duration: 900, contraindications: [],
        algoDesc: "4Hz Theta coupled with 7.83Hz Schumann resonance.",
        usageGoal: "Normalization of HRV and stress response post-burnout.",
        researchContext: "Engages the ventral vagal circuit to exit freeze/fight states.",
        phases: [{duration: 900, beat: 4, carrier: 180, overlays: [7.83], overlayMix: 0.3, noise: 'pink', noiseMix: 0.1}],
        breathwork: {name: "Voo", ratio: [4,0,8,0], description: "Low vocalized exhale."}, mantra: {phonetic: "VOOO", meaning: "Resonating core.", repeatInterval: 10}
    },
    motivation_rebuilder: {
        id: 'motivation_rebuilder', title: 'Motivation Rebuilder', description: 'Mesocortical restoration', evidenceLevel: 'II', citation: 'Dopamine-Mesocortical', category: 'evidence', section: 'Recovery & Addiction', duration: 1200, contraindications: [],
        algoDesc: "15Hz Beta base with 40Hz Gamma bursts over 240Hz carrier.",
        usageGoal: "Return of goal-seeking behavior post-cessation.",
        researchContext: "Stimulates dopamine pathways in the prefrontal cortex.",
        phases: [{duration: 600, beat: 15, carrier: 240}, {duration: 600, beat: 15, carrier: 240, overlays: [40], overlayMix: 0.3, isochronic: true}],
        breathwork: {name: "Upward", ratio: [4,2,2,0], description: "Short energetic inhales."}, mantra: {phonetic: "MOVE", meaning: "Action potential.", repeatInterval: 10}
    },
    joy_reconstruction: {
        id: 'joy_reconstruction', title: 'Joy Reconstruction', description: 'Mesolimbic Reward Circuitry', evidenceLevel: 'III', citation: 'Mesolimbic-Reward', category: 'research', section: 'Recovery & Addiction', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta, 40Hz Gamma, and 528Hz Solfeggio layer.",
        usageGoal: "Restoration of natural pleasure in healthy activities.",
        researchContext: "Upregulates reward sensitivity using the 'Joy frequency' triad.",
        phases: [{duration: 1200, beat: 7, carrier: 528, overlays: [40], overlayMix: 0.35, spatialMotion: 'rotate'}],
        breathwork: {name: "Grateful", ratio: [5,5,5,5], description: "Smile on inhale."}, mantra: {phonetic: "YES", meaning: "Affirming life.", repeatInterval: 12}
    },
    relapse_prevention: {
        id: 'relapse_prevention', title: 'Relapse Prevention Lock', description: 'Connectivity Strengthening', evidenceLevel: 'II', citation: 'PF-Amygdala', category: 'evidence', section: 'Recovery & Addiction', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma for executive control and 7Hz Theta for somatic calm.",
        usageGoal: "Statistical reduction in relapse risk through prefrontal strengthening.",
        researchContext: "Strengthens connectivity between prefrontal cortex and amygdala.",
        phases: [{duration: 1200, beat: 40, carrier: 240, overlays: [7], overlayMix: 0.3, stochastic: true}],
        breathwork: {name: "Secure", ratio: [4,4,4,4], description: "Steady box breath."}, mantra: {phonetic: "STAY", meaning: "Remaining fixed.", repeatInterval: 20}
    },
    liver_detox_vibration: {
        id: 'liver_detox_vibration', title: 'Liver Detox Resonance', description: 'Somatic Organ Grounding', evidenceLevel: 'III', citation: 'Organ-Somatic', category: 'research', section: 'Recovery & Addiction', duration: 600, contraindications: [],
        algoDesc: "50Hz somatic carrier with 1.5Hz Delta beat to promote detoxification.",
        usageGoal: "Subjective sense of physical cleansing and relief.",
        researchContext: "Low frequency vibration used to promote lymphatic drainage.",
        phases: [{duration: 600, beat: 1.5, carrier: 50, isochronic: true}],
        breathwork: {name: "Flush", ratio: [4,0,4,0], description: "Visualize poison leaving."}, mantra: {phonetic: "PURE", meaning: "Clear body.", repeatInterval: 15}
    },
    cellular_cleansing: {
        id: 'cellular_cleansing', title: 'Cellular Cleansing', description: 'Autophagy Induction Prime', evidenceLevel: 'III', citation: 'Gamma-Autophagy', category: 'research', section: 'Recovery & Addiction', duration: 900, contraindications: [],
        algoDesc: "40Hz Gamma over 432Hz carrier to support cellular debris removal.",
        usageGoal: "Enhanced recovery from oxidative stress.",
        researchContext: "Gamma entrainment linked to glymphatic clearance.",
        phases: [{duration: 900, beat: 40, carrier: 432, harmonicStacking: true}],
        breathwork: {name: "Renew", ratio: [5,5,5,5], description: "Every cell breathing."}, mantra: {phonetic: "LIVE", meaning: "Radiating health.", repeatInterval: 30}
    },

    // ==========================================
    // 5. FLOW STATE (FLOW)
    // ==========================================
    flow_1_ignition: {
        id: 'flow_1_ignition', title: 'Flow 1: Ignition (Task Priming)', description: 'Alpha Bridge Induction', evidenceLevel: 'II', citation: 'Flow Ignition', category: 'evidence', section: 'Flow State', duration: 660, contraindications: [],
        algoDesc: "14-15Hz Beta ramp dropping into a 5Hz Theta consolidation mode.",
        usageGoal: "Transitioning the brain from high-entropy work into focus.",
        researchContext: "Calibrates the mind for the 'absorption' phase of the Flow cycle.",
        phases: [{duration: 330, beat: 15, carrier: 200}, {duration: 330, beat: 5, carrier: 200}],
        breathwork: {name: "Bridge", ratio: [4,0,4,0], description: "Rhythmic nasal breath."}, mantra: {phonetic: "START", meaning: "Entering the zone.", repeatInterval: 60}
    },
    flow_2_immersion: {
        id: 'flow_2_immersion', title: 'Flow 2: Immersion (Deep Focus)', description: 'DMN Suppression', evidenceLevel: 'II', citation: 'DMN-Flow', category: 'evidence', section: 'Flow State', duration: 900, contraindications: [],
        algoDesc: "6Hz Theta base with 15Hz Beta pulses to maintain engagement.",
        usageGoal: "Suppressing mind-wandering and self-consciousness.",
        researchContext: "Injects mid-beta to maintain task engagement while body is relaxed.",
        phases: [{duration: 900, beat: 6, carrier: 220, overlays: [15], overlayMix: 0.3, isochronic: true}],
        breathwork: {name: "Invisible", ratio: [4,4,4,4], description: "Subtle breath."}, mantra: {phonetic: "LOCK", meaning: "Attention fixed.", repeatInterval: 30}
    },
    flow_3_autotelic: {
        id: 'flow_3_autotelic', title: 'Flow 3: Autotelic (Self-Rewarding)', description: 'Gamma Coherence Lock', evidenceLevel: 'II', citation: '39Hz-Flow', category: 'evidence', section: 'Flow State', duration: 900, contraindications: [],
        algoDesc: "Strict 39Hz Gamma Coherence over a 10Hz Alpha carrier.",
        usageGoal: "Stimulating the self-rewarding nature of complex activities.",
        researchContext: "Lock in 39Hz to stimulate goal clarity and endorphins.",
        phases: [{duration: 900, beat: 39, carrier: 240, overlays: [10], overlayMix: 0.25, harmonicStacking: true}],
        breathwork: {name: "Bliss", ratio: [5,0,5,0], description: "Joyful circular breath."}, mantra: {phonetic: "YES", meaning: "This is the work.", repeatInterval: 20}
    },
    flow_4_timeless: {
        id: 'flow_4_timeless', title: 'Flow 4: Timeless (Peak Flow)', description: 'Time Awareness Elimination', evidenceLevel: 'II', citation: 'Theta-Gamma coupling', category: 'evidence', section: 'Flow State', duration: 900, contraindications: [],
        algoDesc: "Theta-Gamma coupling (7Hz/40Hz) to eliminate time perception.",
        usageGoal: "Entering the state where 'time flies' and self-consciousness vanishes.",
        researchContext: "Destabilizes the temporal lobes to allow total task absorption.",
        phases: [{duration: 900, beat: 7, carrier: 220, overlays: [40], overlayMix: 0.4, stochastic: true}],
        breathwork: {name: "Infinite", ratio: [4,0,4,0], description: "Effortless breathing."}, mantra: {phonetic: "FLOW", meaning: "Uninterrupted motion.", repeatInterval: 30}
    },
    flow_5_harvest: {
        id: 'flow_5_harvest', title: 'Flow 5: Harvest (Integration)', description: 'Insight Extraction', evidenceLevel: 'II', citation: 'Theta-Delta-Descent', category: 'evidence', section: 'Flow State', duration: 600, contraindications: [],
        algoDesc: "7Hz Theta to 1.5Hz Delta descent to consolidate work insights.",
        usageGoal: "Capture 'Aha!' insights from a work block.",
        researchContext: "Slow-wave descent facilitates long-term memory consolidation.",
        phases: [{duration: 300, beat: 7, carrier: 180}, {duration: 300, beat: 1.5, carrier: 150, noise: 'pink', noiseMix: 0.2}],
        breathwork: {name: "Harvest", ratio: [5,5,5,5], description: "Box breath."}, mantra: {phonetic: "DONE", meaning: "Consolidating.", repeatInterval: 60}
    },

    // ==========================================
    // 6. ATHLETIC PERFORMANCE (AP)
    // ==========================================
    athletic_confidence: {
        id: 'athletic_confidence', title: 'Athletic Confidence Amplifier', description: 'Performance Consistency', evidenceLevel: 'II', citation: 'Sports-Confidence', category: 'evidence', section: 'Athletic Performance', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma for mental sharpness and 12Hz SMR for motor anchor.",
        usageGoal: "+80-90% subjective confidence gain.",
        researchContext: "Stabilizes the Sensorimotor Rhythm to prevent 'choking' under pressure.",
        phases: [{duration: 1200, beat: 40, carrier: 180, overlays: [12], overlayMix: 0.35, isochronic: true}],
        breathwork: {name: "Hero", ratio: [2,0,2,0], description: "Sharp, alert nasal breath."}, mantra: {phonetic: "ABLE", meaning: "Total capability.", repeatInterval: 10}
    },
    reaction_time_sharpener: {
        id: 'reaction_time_sharpener', title: 'Reaction Time Sharpener', description: 'Vigilance Sharpness', evidenceLevel: 'II', citation: 'Vigilance-Sharpness', category: 'evidence', section: 'Athletic Performance', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma primary with 20Hz Beta harmonic overlays.",
        usageGoal: "50-100ms improvement in reaction time.",
        researchContext: "Increases processing speed in the motor cortex loop.",
        phases: [{duration: 1200, beat: 40, carrier: 300, overlays: [20], overlayMix: 0.2, isochronic: true}],
        breathwork: {name: "Fast", ratio: [1,0,1,0], description: "Rapid nasal cycling."}, mantra: {phonetic: "NOW", meaning: "Instant response.", repeatInterval: 5}
    },
    endurance_enhancer: {
        id: 'endurance_enhancer', title: 'Endurance Enhancer', description: 'Aerobic Capacity support', evidenceLevel: 'II', citation: 'Endurance-Aerobic', category: 'evidence', section: 'Athletic Performance', duration: 1200, contraindications: [],
        algoDesc: "20Hz Beta transition to 40Hz Gamma to modulate fatigue signals.",
        usageGoal: "+15-30% aerobic capacity through perceived exertion reduction.",
        researchContext: "Dulls central fatigue signals from brain to muscles.",
        phases: [{duration: 1200, startBeat: 20, endBeat: 40, carrier: 240, harmonicStacking: true}],
        breathwork: {name: "Deep Power", ratio: [4,0,4,0], description: "Full abdominal breath."}, mantra: {phonetic: "MORE", meaning: "Sustained output.", repeatInterval: 15}
    },
    recovery_accelerator: {
        id: 'recovery_accelerator', title: 'Recovery Accelerator', description: 'Parasympathetic Prime', evidenceLevel: 'II', citation: 'Recovery-Speed', category: 'evidence', section: 'Athletic Performance', duration: 900, contraindications: [],
        algoDesc: "4Hz Theta with 7.83Hz Schumann grounding.",
        usageGoal: "2x faster heart-rate recovery post-workout.",
        researchContext: "Forces immediate autonomic transition into rest mode.",
        phases: [{duration: 900, beat: 4, carrier: 180, overlays: [7.83], overlayMix: 0.3, noise: 'pink', noiseMix: 0.1}],
        breathwork: {name: "Melt", ratio: [6,0,12,0], description: "Surrender weight."}, mantra: {phonetic: "REST", meaning: "Tissue repair.", repeatInterval: 20}
    },
    pain_suppression_athletic: {
        id: 'pain_suppression_athletic', title: 'Pain Suppression (Athletic)', description: 'Acute Injury Management', evidenceLevel: 'II', citation: 'Acute-Gating', category: 'evidence', section: 'Athletic Performance', duration: 900, contraindications: [],
        algoDesc: "10Hz Alpha base with 528Hz Solfeggio layer and stochastic jitter.",
        usageGoal: "40-60% acute pain reduction to allow continuation.",
        researchContext: "Gates nociceptive signals at the thalamus.",
        phases: [{duration: 900, beat: 10, carrier: 528, stochastic: true, harmonicStacking: true}],
        breathwork: {name: "Numb", ratio: [4,4,4,4], description: "Numb the area."}, mantra: {phonetic: "NONE", meaning: "Zero signal.", repeatInterval: 10}
    },
    pre_competition_priming: {
        id: 'pre_competition_priming', title: 'Pre-Competition Priming', description: 'Performance Ceiling Boost', evidenceLevel: 'II', citation: 'Priming-Moments', category: 'evidence', section: 'Athletic Performance', duration: 900, contraindications: [],
        algoDesc: "15Hz Beta ramp into 40Hz Gamma intensity burst.",
        usageGoal: "+200-500% performance boost in peak moments.",
        researchContext: "Primes motor cortex for explosive output.",
        phases: [{duration: 450, beat: 15, carrier: 240}, {duration: 450, beat: 40, carrier: 240, isochronic: true}],
        breathwork: {name: "Bellows", ratio: [1,0,1,0], description: "Sharp, fast breaths."}, mantra: {phonetic: "GO", meaning: "Maximum intensity.", repeatInterval: 5}
    },
    motor_learning_consolidation: {
        id: 'motor_learning_consolidation', title: 'Skill Consolidation (Motor)', description: 'Muscle Memory Encoding', evidenceLevel: 'II', citation: 'Motor-Skill-Learning', category: 'evidence', section: 'Athletic Performance', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta with 40Hz Gamma bursts for skill pattern binding.",
        usageGoal: "2-3x learning speed of physical techniques.",
        researchContext: "Theta-Gamma coupling facilitates motor skill transfer to long-term memory.",
        phases: [{duration: 1200, beat: 7, carrier: 200, overlays: [40], overlayMix: 0.3, stochastic: true}],
        breathwork: {name: "Recall", ratio: [4,4,4,4], description: "Visualize movement."}, mantra: {phonetic: "FLOW", meaning: "Natural motion.", repeatInterval: 20}
    },
    injury_healing: {
        id: 'injury_healing', title: 'Injury Healing Optimizer', description: 'Cellular Repair Support', evidenceLevel: 'III', citation: 'Healing-Recovery', category: 'research', section: 'Athletic Performance', duration: 1200, contraindications: [],
        algoDesc: "10Hz Alpha, 40Hz Gamma, and 528Hz Solfeggio triad.",
        usageGoal: "30-50% reduction in recovery time.",
        researchContext: "Combines Solfeggio healing with Gamma glymphatic clearance.",
        phases: [{duration: 1200, beat: 10, carrier: 528, overlays: [40], overlayMix: 0.3, harmonicStacking: true}],
        breathwork: {name: "Direct", ratio: [5,5,5,5], description: "Breathe to injury site."}, mantra: {phonetic: "HEAL", meaning: "Structural repair.", repeatInterval: 30}
    },
    muscle_tension_release: {
        id: 'muscle_tension_release', title: 'Muscle Tension Release', description: 'Somatic Post-Workout Calm', evidenceLevel: 'II', citation: 'SMR-Release', category: 'evidence', section: 'Athletic Performance', duration: 900, contraindications: [],
        algoDesc: "12Hz SMR baseline with periodic 4Hz Theta drops.",
        usageGoal: "Eliminate post-game 'shaky muscles' and high arousal.",
        researchContext: "Stabilizes motor neurons through SMR entrainment.",
        phases: [{duration: 600, beat: 12, carrier: 180}, {duration: 300, beat: 4, carrier: 180, isochronic: true}],
        breathwork: {name: "Decompress", ratio: [4,0,8,0], description: "Exhale through the muscles."}, mantra: {phonetic: "SOFT", meaning: "Structural surrender.", repeatInterval: 15}
    },
    proprioception_boost: {
        id: 'proprioception_boost', title: 'Proprioception Boost', description: 'Body Awareness Expansion', evidenceLevel: 'III', citation: 'Parietal-Alpha', category: 'research', section: 'Athletic Performance', duration: 600, contraindications: [],
        algoDesc: "10Hz Alpha with spatial rotation of the sound field.",
        usageGoal: "Enhanced 'feel' for body position in space.",
        researchContext: "Targets the parietal lobe awareness using Alpha spatial drift.",
        phases: [{duration: 600, beat: 10, carrier: 240, spatialMotion: 'rotate'}],
        breathwork: {name: "Awareness", ratio: [4,4,4,4], description: "Feel every limb."}, mantra: {phonetic: "HERE", meaning: "Centered in body.", repeatInterval: 20}
    },

    // ==========================================
    // 7. EMOTIONAL MASTERY (EM)
    // ==========================================
    anger_resolution: {
        id: 'anger_resolution', title: 'Anger Resolution Protocol', description: 'Limbic Fire Extinguishing', evidenceLevel: 'II', citation: 'Anger-reduction', category: 'evidence', section: 'Emotional Mastery', duration: 1200, contraindications: [],
        algoDesc: "4Hz Theta with 10Hz Alpha overlays for limbic re-integration.",
        usageGoal: "60-80% reduction in reactive anger.",
        researchContext: "Cools the amygdala while re-engaging prefrontal inhibitory circuits.",
        phases: [{duration: 600, beat: 4, carrier: 150}, {duration: 600, beat: 10, carrier: 150}],
        breathwork: {name: "Cooling", ratio: [4,0,8,0], description: "Long, cool exhales."}, mantra: {phonetic: "COOL", meaning: "Quenching fire.", repeatInterval: 15}
    },
    guilt_dissolver: {
        id: 'guilt_dissolver', title: 'Guilt Dissolving Theta', description: 'Self-Forgiveness frequency', evidenceLevel: 'III', citation: 'Guilt-Relief', category: 'research', section: 'Emotional Mastery', duration: 1200, contraindications: [],
        algoDesc: "5Hz Theta with 7Hz Alpha-Theta border crossovers.",
        usageGoal: "Processing moral injury and releasing guilt.",
        researchContext: "Hypnagogic access to moral scripts for cognitive reappraisal.",
        phases: [{duration: 1200, beat: 5, carrier: 396, overlays: [7], overlayMix: 0.2, stochastic: true}],
        breathwork: {name: "Release", ratio: [5,5,5,5], description: "Heart center breath."}, mantra: {phonetic: "FREE", meaning: "Releasing weight.", repeatInterval: 20}
    },
    shame_breaker: {
        id: 'shame_breaker', title: 'Shame Breaker', description: 'Identity Restoration', evidenceLevel: 'III', citation: 'Shame-reduction', category: 'research', section: 'Emotional Mastery', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta with consistent 40Hz Gamma 'binding' of self-image.",
        usageGoal: "Sustainable reduction in chronic shame narratives.",
        researchContext: "Re-integrates social self-image using Gamma-Theta binding.",
        phases: [{duration: 1200, beat: 7, carrier: 220, overlays: [40], overlayMix: 0.35, isochronic: true}],
        breathwork: {name: "Mirror", ratio: [4,4,4,4], description: "Self-compassion focus."}, mantra: {phonetic: "I AM", meaning: "Inherent worth.", repeatInterval: 30}
    },
    grief_processor: {
        id: 'grief_processor', title: 'Grief Processing Deep Work', description: 'Loss Integration Support', evidenceLevel: 'III', citation: 'Grief-integration', category: 'research', section: 'Emotional Mastery', duration: 1500, contraindications: [],
        algoDesc: "5Hz Theta base with 7Hz Alpha border for non-reactive processing.",
        usageGoal: "Moving through grieving stages with healthy processing.",
        researchContext: "Provides a safe, non-aroused state for memory reconsolidation.",
        phases: [{duration: 1500, beat: 5, carrier: 396, overlays: [7], overlayMix: 0.25, stochastic: true}],
        breathwork: {name: "Sigh", ratio: [4,0,8,0], description: "Vocalized sighs."}, mantra: {phonetic: "OM", meaning: "Universal return.", repeatInterval: 15}
    },
    jealousy_neutralizer: {
        id: 'jealousy_neutralizer', title: 'Jealousy Neutralizer', description: 'Social Comparison Reset', evidenceLevel: 'III', citation: 'Jealousy-reduction', category: 'research', section: 'Emotional Mastery', duration: 900, contraindications: [],
        algoDesc: "10Hz Alpha with 40Hz Gamma bursts for perspective shifting.",
        usageGoal: "60-80% reduction in reactive social comparison triggers.",
        researchContext: "Shifts processing from comparison to self-possession.",
        phases: [{duration: 900, beat: 10, carrier: 240, overlays: [40], overlayMix: 0.3, spatialMotion: 'rotate'}],
        breathwork: {name: "Center", ratio: [5,5,5,5], description: "Center line focus."}, mantra: {phonetic: "HEAR", meaning: "Internal truth.", repeatInterval: 12}
    },
    fear_extinction: {
        id: 'fear_extinction', title: 'Fear Extinction', description: 'Phobic De-conditioning', evidenceLevel: 'II', citation: 'Fear-reduction', category: 'evidence', section: 'Emotional Mastery', duration: 1200, contraindications: [],
        algoDesc: "4.5Hz Theta with 396Hz Solfeggio fear-release layer.",
        usageGoal: "50-70% reduction in phobic responses.",
        researchContext: "Facilitates hippocampal memory re-writing of fear associations.",
        phases: [{duration: 1200, beat: 4.5, carrier: 396, stochastic: true, harmonicStacking: true}],
        breathwork: {name: "Courage", ratio: [4,4,4,4], description: "Steady nasal pacing."}, mantra: {phonetic: "SAFE", meaning: "Absolute security.", repeatInterval: 20}
    },
    heartbreak_healing: {
        id: 'heartbreak_healing', title: 'Heartbreak Healing', description: 'Relationship Loss recovery', evidenceLevel: 'III', citation: 'Heartbreak-healing', category: 'research', section: 'Emotional Mastery', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta with 528Hz Solfeggio heart resonance layer.",
        usageGoal: "Accelerated emotional recovery from loss.",
        researchContext: "Targets somatic heartbreak response (chest pressure) via resonance.",
        phases: [{duration: 1200, beat: 7, carrier: 528, overlays: [528], overlayMix: 0.2, noise: 'pink', noiseMix: 0.1}],
        breathwork: {name: "Mend", ratio: [4,4,8,0], description: "Chest expansion."}, mantra: {phonetic: "YAM", meaning: "Opening the center.", repeatInterval: 12}
    },
    perfectionism_dissolver: {
        id: 'perfectionism_dissolver', title: 'Perfectionism Dissolve', description: 'Self-Critic suppression', evidenceLevel: 'III', citation: 'Perfectionism-reduction', category: 'research', section: 'Emotional Mastery', duration: 1200, contraindications: [],
        algoDesc: "4Hz Theta base with 12Hz SMR 'stillness' pulses.",
        usageGoal: "60-80% reduction in self-critical inner narratives.",
        researchContext: "Silences the Inner Critic circuit in the DMN.",
        phases: [{duration: 1200, beat: 4, carrier: 180, overlays: [12], overlayMix: 0.3, stochastic: true}],
        breathwork: {name: "Grace", ratio: [5,5,5,5], description: "Soft, graceful breath."}, mantra: {phonetic: "SOFT", meaning: "Gentleness.", repeatInterval: 15}
    },
    confidence_builder: {
        id: 'confidence_builder', title: 'Confidence Builder', description: 'Identity Reinforcement', evidenceLevel: 'II', citation: 'Confidence-gain', category: 'evidence', section: 'Emotional Mastery', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma base with 12Hz SMR for grounded power.",
        usageGoal: "50-100% subjective confidence gain.",
        researchContext: "Combines cognitive speed with somatic stability to build presence.",
        phases: [{duration: 1200, beat: 40, carrier: 240, overlays: [12], overlayMix: 0.3, isochronic: true}],
        breathwork: {name: "Power", ratio: [2,0,2,0], description: "Forceful breaths."}, mantra: {phonetic: "ABLE", meaning: "Infinite capacity.", repeatInterval: 10}
    },
    emotional_resilience_forge: {
        id: 'emotional_resilience_forge', title: 'Emotional Resilience Forge', description: 'Stress-Adaptation Lock', evidenceLevel: 'II', citation: 'Resilience-gain', category: 'evidence', section: 'Emotional Mastery', duration: 1500, contraindications: [],
        algoDesc: "7Hz Theta ramping into persistent 40Hz Gamma lock.",
        usageGoal: "Bounce-back from adversity 2-3x faster.",
        researchContext: "Trains brain to maintain executive function during somatic arousal.",
        phases: [{duration: 750, beat: 7, carrier: 220}, {duration: 750, beat: 40, carrier: 220, overlays: [7], overlayMix: 0.2}],
        breathwork: {name: "Forge", ratio: [4,4,4,4], description: "Strong, steady pace."}, mantra: {phonetic: "HARD", meaning: "Unbreakable focus.", repeatInterval: 15}
    },

    // ==========================================
    // 8. RELATIONSHIP & SOCIAL (RS)
    // ==========================================
    attraction_amplifier: {
        id: 'attraction_amplifier', title: 'Attraction Amplifier', description: 'Neural Synchrony priming', evidenceLevel: 'III', citation: 'Attraction-amplifier', category: 'research', section: 'Relationship & Social', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta with 40Hz Gamma rapport bursts.",
        usageGoal: "Prime brain for deep neural synchrony.",
        researchContext: "Simulates first-meeting frequency seen in high-rapport dyads.",
        phases: [{duration: 1200, beat: 7, carrier: 220, overlays: [40], overlayMix: 0.3, isochronic: true}],
        breathwork: {name: "Attract", ratio: [4,0,4,0], description: "Open throat breath."}, mantra: {phonetic: "OPEN", meaning: "Receptive resonance.", repeatInterval: 20}
    },
    communication_clarity: {
        id: 'communication_clarity', title: 'Communication Clarity', description: 'Verbal Fluidity Boost', evidenceLevel: 'II', citation: 'Speech-Improvement', category: 'evidence', section: 'Relationship & Social', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma base with 12Hz SMR for social grounding.",
        usageGoal: "+40-60% clarity in verbal expression.",
        researchContext: "Targets Broca's and Wernicke's areas for rapid verbal synthesis.",
        phases: [{duration: 1200, beat: 40, carrier: 240, overlays: [12], overlayMix: 0.35}],
        breathwork: {name: "Eloquence", ratio: [4,0,4,0], description: "Clear nasal breath."}, mantra: {phonetic: "SPEAK", meaning: "Crystal truth.", repeatInterval: 15}
    },
    empathy_deepener: {
        id: 'empathy_deepener', title: 'Empathy Deepener', description: 'Mirror Neuron Coupling', evidenceLevel: 'II', citation: 'Empathy-Activation', category: 'evidence', section: 'Relationship & Social', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta base with 40Hz Gamma coupling signature.",
        usageGoal: "Achieve deep mirror neuron coupling with others.",
        researchContext: "Directly stimulates mirror neuron system for emotional resonance.",
        phases: [{duration: 1200, beat: 7, carrier: 200, overlays: [40], overlayMix: 0.3, spatialMotion: 'rotate'}],
        breathwork: {name: "Heart", ratio: [5,0,5,0], description: "Coherent heart breath."}, mantra: {phonetic: "WE", meaning: "I feel you.", repeatInterval: 30}
    },
    conflict_resolution: {
        id: 'conflict_resolution', title: 'Conflict Resolution', description: 'Non-Reactive dialogue', evidenceLevel: 'II', citation: 'Conflict-Ease', category: 'evidence', section: 'Relationship & Social', duration: 1200, contraindications: [],
        algoDesc: "10Hz Alpha with 4Hz Theta crossovers for limbic calm.",
        usageGoal: "Better outcomes in difficult conversations.",
        researchContext: "Prevents limbic hijack during relationship stress.",
        phases: [{duration: 600, beat: 10, carrier: 180}, {duration: 600, beat: 4, carrier: 180, noise: 'pink', noiseMix: 0.1}],
        breathwork: {name: "Resolve", ratio: [5,5,5,5], description: "Box breath reset."}, mantra: {phonetic: "CALM", meaning: "Logic restored.", repeatInterval: 15}
    },
    intimacy_enhancer: {
        id: 'intimacy_enhancer', title: 'Intimacy Enhancer', description: 'Deeper Bonding State', evidenceLevel: 'III', citation: 'Intimacy-depth', category: 'research', section: 'Relationship & Social', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta coupled with 40Hz Gamma for deep rapport.",
        usageGoal: "Subjectively deeper connection post-session.",
        researchContext: "Simulates bonded state using Theta-Gamma signature.",
        phases: [{duration: 1200, beat: 7, carrier: 220, overlays: [40], overlayMix: 0.4, stochastic: true}],
        breathwork: {name: "Bond", ratio: [4,0,4,0], description: "Eye-contact breath."}, mantra: {phonetic: "ONE", meaning: "Unified field.", repeatInterval: 60}
    },
    boundary_setter: {
        id: 'boundary_setter', title: 'Boundary Setter', description: 'Assertiveness priming', evidenceLevel: 'III', citation: 'Boundary-clarity', category: 'research', section: 'Relationship & Social', duration: 900, contraindications: [],
        algoDesc: "12Hz SMR base with Beta (40Hz) spikes for social authority.",
        usageGoal: "Increase in assertive communication clarity.",
        researchContext: "Reinforces self-possession and social projection.",
        phases: [{duration: 900, beat: 12, carrier: 240, overlays: [40], overlayMix: 0.3, isochronic: true}],
        breathwork: {name: "Direct", ratio: [4,0,4,0], description: "Direct gaze focus."}, mantra: {phonetic: "NO", meaning: "Clear limit.", repeatInterval: 10}
    },
    loneliness_transformer: {
        id: 'loneliness_transformer', title: 'Loneliness Transformer', description: 'Internal validation frequency', evidenceLevel: 'III', citation: 'Loneliness-reduction', category: 'research', section: 'Relationship & Social', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta base with 528Hz Solfeggio layer.",
        usageGoal: "Releasing feelings of isolation.",
        researchContext: "Shifts focus from lack to internal abundance resonance.",
        phases: [{duration: 1200, beat: 7, carrier: 528, overlays: [528], overlayMix: 0.25, noise: 'pink', noiseMix: 0.1}],
        breathwork: {name: "Full", ratio: [4,4,4,4], description: "Abdominal fullness."}, mantra: {phonetic: "HERE", meaning: "I am enough.", repeatInterval: 15}
    },
    charisma_activator: {
        id: 'charisma_activator', title: 'Charisma Activator', description: 'Social Presence Boost', evidenceLevel: 'III', citation: 'Charisma-presence', category: 'research', section: 'Relationship & Social', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma base for sharpness and 12Hz SMR for groundedness.",
        usageGoal: "+70-90% social presence metrics.",
        researchContext: "Combination of high verbal fluidity and somatic calm.",
        phases: [{duration: 1200, beat: 40, carrier: 240, overlays: [12], overlayMix: 0.35, harmonicStacking: true}],
        breathwork: {name: "Open", ratio: [4,0,4,0], description: "Open nasal breath."}, mantra: {phonetic: "SHINE", meaning: "Radiating signal.", repeatInterval: 10}
    },
    introvert_social_charge: {
        id: 'introvert_social_charge', title: 'Introvert Social Charge', description: 'Social Battery Recharge', evidenceLevel: 'III', citation: 'Introvert-Alpha', category: 'research', section: 'Relationship & Social', duration: 600, contraindications: [],
        algoDesc: "10Hz Alpha with 7.83Hz ground to recharge after events.",
        usageGoal: "Rapid recovery from social exhaustion.",
        researchContext: "Stabilizes autonomic system post-arousal.",
        phases: [{duration: 600, beat: 10, carrier: 180, overlays: [7.83], overlayMix: 0.2}],
        breathwork: {name: "Recharge", ratio: [5,5,5,5], description: "Deep quiet breaths."}, mantra: {phonetic: "STILL", meaning: "Internal peace.", repeatInterval: 15}
    },
    diplomacy_frequency: {
        id: 'diplomacy_frequency', title: 'Diplomacy Frequency', description: 'Persuasion & Logic Lock', evidenceLevel: 'III', citation: 'Persuasion-Beta', category: 'research', section: 'Relationship & Social', duration: 900, contraindications: [],
        algoDesc: "15Hz Beta coupled with 7Hz Theta for logic-emotion balance.",
        usageGoal: "Improved outcomes in negotiations.",
        researchContext: "Bridges logical intent with empathetic delivery.",
        phases: [{duration: 900, beat: 15, carrier: 240, overlays: [7], overlayMix: 0.3}],
        breathwork: {name: "Balanced", ratio: [4,4,4,4], description: "Steady rhythmic pace."}, mantra: {phonetic: "AGREE", meaning: "Finding common ground.", repeatInterval: 30}
    },

    // ==========================================
    // 9. CREATIVE EXPRESSION (CE)
    // ==========================================
    creative_flow_unleashed: {
        id: 'creative_flow_unleashed', title: 'Creative Flow Unleashed', description: 'Divergent Thinking activation', evidenceLevel: 'II', citation: 'Divergent-Alpha', category: 'evidence', section: 'Creative Expression', duration: 1200, contraindications: [],
        algoDesc: "5Hz Theta base with 40Hz Gamma 'aha' micro-bursts.",
        usageGoal: "+200-400% increase in creative quantity.",
        researchContext: "Facilitates associative lookup and rapid synthesis.",
        phases: [{duration: 1200, beat: 5, carrier: 220, overlays: [40], overlayMix: 0.4, stochastic: true}],
        breathwork: {name: "Flow", ratio: [4,0,4,0], description: "Circular breathing."}, mantra: {phonetic: "OPEN", meaning: "Receptive insight.", repeatInterval: 15}
    },
    writers_block_remover: {
        id: 'writers_block_remover', title: "Writer's Block Remover", description: 'Association gating', evidenceLevel: 'III', citation: 'Block-removal', category: 'research', section: 'Creative Expression', duration: 900, contraindications: [],
        algoDesc: "40Hz Gamma base with 7Hz Alpha border crossovers.",
        usageGoal: "Block removal typically occurs at min 20.",
        researchContext: "Flushes verbal buffer and resets associations.",
        phases: [{duration: 900, beat: 40, carrier: 200, overlays: [7], overlayMix: 0.3, isochronic: true}],
        breathwork: {name: "Bellows", ratio: [1,0,1,0], description: "Forceful breaths."}, mantra: {phonetic: "INK", meaning: "Flowing stream.", repeatInterval: 10}
    },
    musical_flow: {
        id: 'musical_flow', title: 'Musical Flow State', description: 'Auditory-Motor Binding', evidenceLevel: 'III', citation: 'Musical-Fluency', category: 'research', section: 'Creative Expression', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta coupled with 40Hz Gamma over 432Hz carrier.",
        usageGoal: "Easier expression in improvisation.",
        researchContext: "Targets Auditory-Motor loop for synthesis.",
        phases: [{duration: 1200, beat: 7, carrier: 432, overlays: [40], overlayMix: 0.3, stochastic: true}],
        breathwork: {name: "Rhythm", ratio: [4,4,4,4], description: "Steady beat breath."}, mantra: {phonetic: "SOUND", meaning: "Pure vibration.", repeatInterval: 20}
    },
    artistic_vision_clarifier: {
        id: 'artistic_vision_clarifier', title: 'Artistic Vision Clarifier', description: 'Visual Cortex priming', evidenceLevel: 'III', citation: 'Vision-Clarity', category: 'research', section: 'Creative Expression', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma primary with 7Hz Alpha overlays.",
        usageGoal: "Subjective clarity of artistic direction.",
        researchContext: "Coordinates executive intent with visual imagination.",
        phases: [{duration: 1200, beat: 40, carrier: 240, overlays: [7], overlayMix: 0.4, spatialMotion: 'rotate'}],
        breathwork: {name: "See", ratio: [4,4,4,4], description: "Eyes-closed focus."}, mantra: {phonetic: "CLEAR", meaning: "Sharp images.", repeatInterval: 30}
    },
    idea_generation: {
        id: 'idea_generation', title: 'Idea Generation Accelerator', description: 'Associative memory lookup', evidenceLevel: 'II', citation: 'Ideas-Session', category: 'evidence', section: 'Creative Expression', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma base with 7Hz Theta 'lookup' frequency.",
        usageGoal: "+300-500% novel ideas generated.",
        researchContext: "Optimizes retrieval speed from associative memory.",
        phases: [{duration: 1200, beat: 40, carrier: 200, overlays: [7], overlayMix: 0.45, stochastic: true}],
        breathwork: {name: "Search", ratio: [4,0,4,0], description: "Wait for ideas."}, mantra: {phonetic: "LIGHT", meaning: "Sudden clarity.", repeatInterval: 15}
    },
    problem_solving_genius: {
        id: 'problem_solving_genius', title: 'Problem Solving Genius', description: 'Lateral Thinking support', evidenceLevel: 'II', citation: 'Solution-Quality', category: 'evidence', section: 'Creative Expression', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma base with 7Hz Theta and 20Hz Beta spikes.",
        usageGoal: "More elegant solutions in testing.",
        researchContext: "Bridges logical processing with associative synthesis.",
        phases: [{duration: 1200, beat: 40, carrier: 240, overlays: [7, 20], overlayMix: 0.35, isochronic: true}],
        breathwork: {name: "Solve", ratio: [4,4,4,4], description: "Logic breath."}, mantra: {phonetic: "NOW", meaning: "Immediate answer.", repeatInterval: 5}
    },
    innovation_catalyst: {
        id: 'innovation_catalyst', title: 'Innovation Catalyst', description: 'Novel Synthesis priming', evidenceLevel: 'III', citation: 'Breakthrough-Ideas', category: 'research', section: 'Creative Expression', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma base with 7Hz Theta and 432Hz stacking.",
        usageGoal: "Produces novel synthesis of unrelated concepts.",
        researchContext: "Promotes global binding across divergent networks.",
        phases: [{duration: 1200, beat: 40, carrier: 432, overlays: [7], overlayMix: 0.3, harmonicStacking: true}],
        breathwork: {name: "Merge", ratio: [4,2,4,0], description: "Merge concept A & B."}, mantra: {phonetic: "LINK", meaning: "Connection.", repeatInterval: 20}
    },
    inspiration_magnet: {
        id: 'inspiration_magnet', title: 'Inspiration Magnet', description: 'Spontaneous Insight', evidenceLevel: 'III', citation: 'Inspiration-Frequency', category: 'research', section: 'Creative Expression', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta, 40Hz Gamma, and 528Hz Solfeggio layer.",
        usageGoal: "Spontaneous insights emerge during protocol.",
        researchContext: "Synchronizes searching and recognizing circuits.",
        phases: [{duration: 1200, beat: 7, carrier: 528, overlays: [40], overlayMix: 0.4, spatialMotion: 'rotate'}],
        breathwork: {name: "Expect", ratio: [4,2,4,2], description: "Pregnant pause."}, mantra: {phonetic: "AH", meaning: "Realization.", repeatInterval: 10}
    },
    poetic_rhythm: {
        id: 'poetic_rhythm', title: 'Poetic Rhythm Lock', description: 'Linguistic Meter Induction', evidenceLevel: 'III', citation: 'Linguistic-Gamma', category: 'research', section: 'Creative Expression', duration: 600, contraindications: [],
        algoDesc: "40Hz Gamma with 4Hz Delta beat to prime rhythmic meter.",
        usageGoal: "Improved cadence in writing and speech.",
        researchContext: "Targets timing mechanisms in linguistic processing.",
        phases: [{duration: 600, beat: 40, carrier: 200, overlays: [4], overlayMix: 0.3}],
        breathwork: {name: "Metered", ratio: [4,4,4,4], description: "Read aloud to the beat."}, mantra: {phonetic: "SING", meaning: "Rhythmic expression.", repeatInterval: 12}
    },
    color_synesthesia: {
        id: 'color_synesthesia', title: 'Synesthesia Prime', description: 'Cross-Modal Perception', evidenceLevel: 'III', citation: 'Cross-Modal-Gamma', category: 'research', section: 'Creative Expression', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma with random lateral panning and 10Hz Alpha overlays.",
        usageGoal: "Experience colors for sounds and sounds for colors.",
        researchContext: "Promotes cross-talk between visual and auditory cortices.",
        phases: [{duration: 1200, beat: 40, carrier: 240, overlays: [10], spatialMotion: 'random'}],
        breathwork: {name: "Vibrant", ratio: [4,0,4,0], description: "Close eyes, look for light."}, mantra: {phonetic: "SEE", meaning: "Hearing color.", repeatInterval: 30}
    },

    // ==========================================
    // 10. SPIRITUAL INTEGRATION (SI)
    // ==========================================
    meditation_samadhi: {
        id: 'meditation_samadhi', title: 'Meditation Deepening v4', description: 'Advanced Samadhi training', evidenceLevel: 'II', citation: 'Daily practice equivalent', category: 'evidence', section: 'Spiritual Integration', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta base with 40Hz Gamma stability lock.",
        usageGoal: "Achieve depth typically requiring years of monastic training.",
        researchContext: "Mimics the frequency signature of master-level meditation states.",
        phases: [{duration: 1200, beat: 7, carrier: 200, overlays: [40], overlayMix: 0.35, noise: 'pink', noiseMix: 0.1}],
        breathwork: {name: "Samadhi", ratio: [6,0,6,0], description: "Slow, long breath."}, mantra: {phonetic: "AUM", meaning: "Universal sound.", repeatInterval: 12}
    },
    kundalini_awakening: {
        id: 'kundalini_awakening', title: 'Kundalini Awakening', description: 'Energy System stimulation', evidenceLevel: 'IV', citation: 'Energetic-EEG', category: 'speculative', section: 'Spiritual Integration', duration: 1800, contraindications: ['Epilepsy'],
        algoDesc: "7Hz Theta baseline with high-intensity 40Hz Gamma ramp.",
        usageGoal: "Induce energetic flow and somatic bliss states. USE CAUTION.",
        researchContext: "Mimics frequency signature seen during spontaneous energetic shifts.",
        phases: [{duration: 600, beat: 7, carrier: 150}, {duration: 1200, startBeat: 7, endBeat: 40, carrier: 300, isochronic: true}],
        breathwork: {name: "Fire", ratio: [1,0,1,0], description: "Rapid belly breath."}, mantra: {phonetic: "HUM", meaning: "Seed sound of power.", repeatInterval: 5}
    },
    chakra_balancing: {
        id: 'chakra_balancing', title: 'Chakra Balancing Ladder', description: 'Vibrational realignment', evidenceLevel: 'IV', citation: 'Correspondence-Freqs', category: 'speculative', section: 'Spiritual Integration', duration: 1200, contraindications: [],
        algoDesc: "Ladder sweep of 194, 417, 528Hz Solfeggio frequencies.",
        usageGoal: "Subjective balance and somatic clearing of centers.",
        researchContext: "Uses correspondence frequencies associated with somatic nodes.",
        phases: [{duration: 400, beat: 7, carrier: 194}, {duration: 400, beat: 7, carrier: 417}, {duration: 400, beat: 7, carrier: 528}],
        breathwork: {name: "Ascend", ratio: [4,4,4,4], description: "Breathe up spine."}, mantra: {phonetic: "LAM-VAM-RAM", meaning: "Bija sounds.", repeatInterval: 10}
    },
    spiritual_insight_gateway: {
        id: 'spiritual_insight_gateway', title: 'Spiritual Insight Gateway', description: 'Realization Frequency', evidenceLevel: 'IV', citation: 'Insight-Frequency', category: 'speculative', section: 'Spiritual Integration', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta base with consistent 40Hz Gamma 'binding'.",
        usageGoal: "Spontaneous realizations reported.",
        researchContext: "Coordinates parietal and temporal lobes for mystical state access.",
        phases: [{duration: 1200, beat: 7, carrier: 210, overlays: [40], overlayMix: 0.3, stochastic: true}],
        breathwork: {name: "Receptive", ratio: [4,0,4,0], description: "Open palms."}, mantra: {phonetic: "AH", meaning: "Sound of seeing.", repeatInterval: 15}
    },
    past_life_recall: {
        id: 'past_life_recall', title: 'Past Life Recall (Experimental)', description: 'Deep Memory retrieval', evidenceLevel: 'V', citation: 'Speculative-Recall', category: 'speculative', section: 'Spiritual Integration', duration: 1500, contraindications: [],
        algoDesc: "5Hz Theta base with 40Hz Gamma micro-pulses.",
        usageGoal: "For exploration only. Highly speculative memory retrieval.",
        researchContext: "Theoretical access to deeply suppressed genetic memory.",
        phases: [{duration: 1500, beat: 5, carrier: 150, overlays: [40], overlayMix: 0.35, spatialMotion: 'rotate'}],
        breathwork: {name: "Recall", ratio: [5,5,5,5], description: "Focus on early memories."}, mantra: {phonetic: "SEE", meaning: "Opening the book.", repeatInterval: 30}
    },
    soul_purpose_clarifier: {
        id: 'soul_purpose_clarifier', title: 'Soul Purpose Clarifier', description: 'Life direction resonance', evidenceLevel: 'IV', citation: 'Purpose-Clarity', category: 'speculative', section: 'Spiritual Integration', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta, 40Hz Gamma, and 528Hz Solfeggio layer.",
        usageGoal: "Life purpose becomes subjectively clear post-session.",
        researchContext: "Integrates heart-brain coherence with prefrontal executive intent.",
        phases: [{duration: 1200, beat: 7, carrier: 528, overlays: [40], overlayMix: 0.3, harmonicStacking: true}],
        breathwork: {name: "Center", ratio: [4,4,4,4], description: "Heart focus."}, mantra: {phonetic: "HERE", meaning: "True alignment.", repeatInterval: 20}
    },
    gratitude_amplifier: {
        id: 'gratitude_amplifier', title: 'Gratitude Amplifier', description: 'Abundance Resonance', evidenceLevel: 'III', citation: 'Gratitude-Boost', category: 'research', section: 'Spiritual Integration', duration: 900, contraindications: [],
        algoDesc: "40Hz Gamma for mental clarity and 528Hz for heart resonance.",
        usageGoal: "+100-200% subjective gratitude experience.",
        researchContext: "Upregulates gratitude circuit in the medial prefrontal cortex.",
        phases: [{duration: 900, beat: 40, carrier: 528, overlays: [528], overlayMix: 0.2, isochronic: true}],
        breathwork: {name: "Thanks", ratio: [4,0,4,0], description: "Smile with breath."}, mantra: {phonetic: "YES", meaning: "Acceptance.", repeatInterval: 12}
    },
    compassion_expansion: {
        id: 'compassion_expansion', title: 'Compassion Expansion', description: 'Universal Oneness priming', evidenceLevel: 'III', citation: 'Compassion-Breadth', category: 'research', section: 'Spiritual Integration', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta base with 40Hz Gamma rapport frequency.",
        usageGoal: "Subjective sense of extension to all beings.",
        researchContext: "Targets mirror neuron and social-bonding networks.",
        phases: [{duration: 1200, beat: 7, carrier: 220, overlays: [40], overlayMix: 0.3, spatialMotion: 'rotate'}],
        breathwork: {name: "Radiate", ratio: [5,0,5,0], description: "Radiate light."}, mantra: {phonetic: "WE", meaning: "All as one.", repeatInterval: 30}
    },
    transcendence_portal: {
        id: 'transcendence_portal', title: 'Transcendence Portal', description: 'Peak Experience Gateway', evidenceLevel: 'IV', citation: 'Transcendence-Likelihood', category: 'speculative', section: 'Spiritual Integration', duration: 1500, contraindications: [],
        algoDesc: "7Hz Theta and 40Hz Gamma coupling triad.",
        usageGoal: "Peak experience typical in trained practitioners.",
        researchContext: "Forces decoupling of parietal boundary-sense to allow unity experience.",
        phases: [{duration: 1500, beat: 7, carrier: 180, overlays: [40], overlayMix: 0.45, stochastic: true}],
        breathwork: {name: "Go", ratio: [6,0,12,0], description: "Exhale into void."}, mantra: {phonetic: "OM", meaning: "Unbounded.", repeatInterval: 60}
    },
    divine_connection: {
        id: 'divine_connection', title: 'Divine Connection (Peak)', description: 'Transcendental Unity State', evidenceLevel: 'IV', citation: 'Felt unity', category: 'speculative', section: 'Spiritual Integration', duration: 1800, contraindications: [],
        algoDesc: "7Hz Theta, 40Hz Gamma, and 528Hz Solfeggio triad stack.",
        usageGoal: "Induce a felt sense of unity/oneness with transcendent reality.",
        researchContext: "The 'Master Triad' of spiritual entrainment frequencies.",
        phases: [{duration: 1800, beat: 7, carrier: 528, overlays: [40], overlayMix: 0.5, spatialMotion: 'rotate'}],
        breathwork: {name: "Surrender", ratio: [8,0,16,0], description: "Infinite exhales."}, mantra: {phonetic: "OM", meaning: "The all.", repeatInterval: 12}
    },

    // ==========================================
    // 11. ADVANCED RESEARCH (AR)
    // ==========================================
    vagus_nerve_reset_advanced: {
        id: 'vagus_nerve_reset_advanced', title: 'Vagus Nerve Reset', description: 'Polyvagal Tone restoration', evidenceLevel: 'II', citation: 'HRV measurement', category: 'evidence', section: 'Advanced Research', duration: 900, contraindications: [],
        algoDesc: "40Hz somatic rumble coupled with 7.83Hz Schumann resonance.",
        usageGoal: "Improve vagal tone (HRV) by 40-60%.",
        researchContext: "Non-invasive vagal stimulation via auditory and bone conduction frequencies.",
        phases: [{duration: 900, beat: 7.83, carrier: 40, isochronic: true, harmonicStacking: true}],
        breathwork: {name: "Voo", ratio: [4,0,8,0], description: "Low vocalized exhale."}, mantra: {phonetic: "VOOO", meaning: "Chest resonance.", repeatInterval: 10}
    },
    hemispheric_erasure: {
        id: 'hemispheric_erasure', title: 'Hemispheric Erasure (EMDR)', description: 'Memory reprocessing support', evidenceLevel: 'II', citation: 'Trauma processing', category: 'evidence', section: 'Advanced Research', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma with rapid lateral panning (EMDR analog).",
        usageGoal: "Support for EMDR-equivalent memory reprocessing.",
        researchContext: "Forces inter-hemispheric communication to break loop patterns.",
        phases: [{duration: 1200, beat: 40, carrier: 240, spatialMotion: 'random', stochastic: true}],
        breathwork: {name: "Eye-sync", ratio: [4,4,4,4], description: "Follow sound with eyes."}, mantra: {phonetic: "ONE-TWO", meaning: "Hemispheric sync.", repeatInterval: 5}
    },
    schumann_sync: {
        id: 'schumann_sync', title: 'Schumann Sync', description: 'Earth Resonance Grounding', evidenceLevel: 'III', citation: 'Earth resonance', category: 'research', section: 'Advanced Research', duration: 900, contraindications: [],
        algoDesc: "Pure 7.83Hz entrainment over a 100Hz somatic carrier.",
        usageGoal: "Grounding the brain to Earth's magnetic frequency.",
        researchContext: "Bio-electromagnetic grounding to counteract modern EMF smog.",
        phases: [{duration: 900, beat: 7.83, carrier: 100, harmonicStacking: true}],
        breathwork: {name: "Earth", ratio: [5,5,5,5], description: "Breathe with planet."}, mantra: {phonetic: "LAM", meaning: "Root grounding.", repeatInterval: 15}
    },
    remote_viewing: {
        id: 'remote_viewing', title: 'Remote Viewing Activation', description: 'Non-Local information sensing', evidenceLevel: 'IV', citation: 'Highly experimental', category: 'speculative', section: 'Advanced Research', duration: 1800, contraindications: [],
        algoDesc: "7Hz Theta coupled with 40Hz Gamma and 100Hz Hyper-Gamma.",
        usageGoal: "For exploration of non-local sensing protocols.",
        researchContext: "Project Stargate base protocol for sensory gating and internal signal focus.",
        phases: [{duration: 1800, beat: 7, carrier: 150, overlays: [40, 100], overlayMix: 0.3, stochastic: true}],
        breathwork: {name: "Signal", ratio: [4,4,4,4], description: "Scan internal blackness."}, mantra: {phonetic: "HERE", meaning: "Non-local access.", repeatInterval: 60}
    },
    lucid_dreaming_gateway: {
        id: 'lucid_dreaming_gateway', title: 'Lucid Dreaming Gateway', description: 'WILD Technique Support', evidenceLevel: 'III', citation: 'Dream likelihood', category: 'research', section: 'Advanced Research', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma base with 4Hz Delta border crossovers.",
        usageGoal: "+300-500% lucidity likelihood in trained users.",
        researchContext: "Provides the high-frequency arousal necessary for consciousness during sleep.",
        phases: [{duration: 600, beat: 40, carrier: 200}, {duration: 600, beat: 4, carrier: 200, overlays: [40], overlayMix: 0.3}],
        breathwork: {name: "Mind Awake", ratio: [4,4,4,4], description: "Do not move body."}, mantra: {phonetic: "LUCID", meaning: "I am dreaming.", repeatInterval: 15}
    },
    neuro_focus_10: {
        id: 'neuro_focus_10', title: 'NeuroFocus 10', description: 'Mind Awake / Body Asleep', evidenceLevel: 'IV', citation: 'Consciousness-state', category: 'speculative', section: 'Advanced Research', duration: 1200, contraindications: [],
        algoDesc: "10Hz Alpha base with sensory-gating pink noise floor.",
        usageGoal: "Induce subtle expanded awareness with total somatic suspension.",
        researchContext: "Foundational Gateway state for bypassing physical sensory data.",
        phases: [{duration: 1200, beat: 10, carrier: 150, noise: 'pink', noiseMix: 0.2, harmonicStacking: true}],
        breathwork: {name: "Suspend", ratio: [4,4,8,0], description: "Release body weight."}, mantra: {phonetic: "BODY SLEEP", meaning: "Somatic suspension.", repeatInterval: 30}
    },
    neuro_focus_12: {
        id: 'neuro_focus_12', title: 'NeuroFocus 12', description: 'Spatial Awareness Expansion', evidenceLevel: 'IV', citation: 'Enhanced clarity', category: 'speculative', section: 'Advanced Research', duration: 1200, contraindications: [],
        algoDesc: "12Hz Alpha baseline with 40Hz Gamma spatial micro-bursts.",
        usageGoal: "Expanded perception beyond the physical body shell.",
        researchContext: "Project Gateway state for spatial non-locality training.",
        phases: [{duration: 1200, beat: 12, carrier: 150, overlays: [40], overlayMix: 0.25, spatialMotion: 'rotate'}],
        breathwork: {name: "Expand", ratio: [4,0,4,0], description: "Feel room size."}, mantra: {phonetic: "WIDE", meaning: "Expanded shell.", repeatInterval: 20}
    },
    neuro_focus_15: {
        id: 'neuro_focus_15', title: 'NeuroFocus 15', description: 'State of No-Time', evidenceLevel: 'IV', citation: 'Expanded bandwidth', category: 'speculative', section: 'Advanced Research', duration: 1200, contraindications: [],
        algoDesc: "15Hz Beta base over a sub-bass (60Hz) carrier.",
        usageGoal: "Subjective degradation of linear time perception.",
        researchContext: "Theoretical threshold where linear temporal processing becomes asynchronous.",
        phases: [{duration: 1200, beat: 15, carrier: 60, overlays: [0.5], overlayMix: 0.2, stochastic: true}],
        breathwork: {name: "Infinite", ratio: [8,0,16,0], description: "Long exhales."}, mantra: {phonetic: "NONE", meaning: "No time.", repeatInterval: 60}
    },
    quantum_zeno_advanced: {
        id: 'quantum_zeno_advanced', title: 'Quantum Zeno Stabilizer', description: 'Attentional State Lock', evidenceLevel: 'V', citation: 'Speculative note', category: 'speculative', section: 'Advanced Research', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma base with constant 100Hz Hyper-Gamma observation pulses.",
        usageGoal: "Lock attentional state through constant high-frequency 'observation'.",
        researchContext: "Based on the theory that constant observation prevents state change.",
        phases: [{duration: 1200, beat: 40, carrier: 200, overlays: [100], overlayMix: 0.3, spatialMotion: 'random'}],
        breathwork: {name: "Still", ratio: [4,4,4,4], description: "Absolute suspension."}, mantra: {phonetic: "HERE", meaning: "Eternal now.", repeatInterval: 12}
    },
    interbrain_sync: {
        id: 'interbrain_sync', title: 'Interbrain Synchronization', description: 'Couples Neural Coherence', evidenceLevel: 'II', citation: 'Sync outcome', category: 'evidence', section: 'Advanced Research', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma and 7Hz Theta coupled signature for dyadic use.",
        usageGoal: "Couples/teams show increased neural coherence and rapport.",
        researchContext: "Targets the phase-synchrony between interacting individuals.",
        phases: [{duration: 1200, beat: 40, carrier: 220, overlays: [7], overlayMix: 0.35, harmonicStacking: true}],
        breathwork: {name: "Coupled", ratio: [5,5,5,5], description: "Synchronize with other."}, mantra: {phonetic: "WE", meaning: "Single mind.", repeatInterval: 30}
    },
    astral_projection_anchor: {
        id: 'astral_projection_anchor', title: 'Astral Projection Anchor', description: 'Out-of-Body Gateway', evidenceLevel: 'IV', citation: 'OBE-Anchor', category: 'speculative', section: 'Advanced Research', duration: 1800, contraindications: [],
        algoDesc: "4Hz Theta coupled with 0.5Hz Delta and 963Hz Pineal overlay.",
        usageGoal: "Induce separation state while maintaining mental anchor.",
        researchContext: "Coordinates deep trance with pineal stimulation.",
        phases: [{duration: 900, beat: 4, carrier: 150, overlays: [0.5], overlayMix: 0.2}, {duration: 900, beat: 4, carrier: 150, overlays: [963], overlayMix: 0.3}],
        breathwork: {name: "Ethereal", ratio: [4,4,8,0], description: "Rise on exhale."}, mantra: {phonetic: "RISE", meaning: "Separation.", repeatInterval: 60}
    },
    pineal_activation_963: {
        id: 'pineal_activation_963', title: 'Pineal Activation 963Hz', description: 'Third Eye Stimulation', evidenceLevel: 'IV', citation: '963-Pineal', category: 'speculative', section: 'Advanced Research', duration: 900, contraindications: [],
        algoDesc: "963Hz Solfeggio primary with 10Hz Alpha pulses.",
        usageGoal: "Subjective pressure in forehead and expanded inner vision.",
        researchContext: "Theoretical piezoelectric stimulation of the pineal gland.",
        phases: [{duration: 900, beat: 10, carrier: 963, harmonicStacking: true}],
        breathwork: {name: "Third Eye", ratio: [4,4,4,4], description: "Focus between brows."}, mantra: {phonetic: "OM", meaning: "Pineal sync.", repeatInterval: 12}
    },

    // ==========================================
    // 12. BIOHACKING & LONGEVITY (BH)
    // ==========================================
    cellular_regeneration: {
        id: 'cellular_regeneration', title: 'Cellular Regeneration Activator', description: 'Telomere Support priming', evidenceLevel: 'III', citation: 'Theoretical 10-20%', category: 'research', section: 'Biohacking & Longevity', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma base with 7.83Hz Schumann resonance layer.",
        usageGoal: "+10-20% telomere support (theoretical).",
        researchContext: "Gamma entrainment linked to glymphatic clearance of plaque.",
        phases: [{duration: 1200, beat: 40, carrier: 528, overlays: [7.83], overlayMix: 0.3, isochronic: true}],
        breathwork: {name: "Regen", ratio: [5,5,5,5], description: "Clean cellular breath."}, mantra: {phonetic: "RENEW", meaning: "Biological reset.", repeatInterval: 30}
    },
    immune_optimizer: {
        id: 'immune_optimizer', title: 'Immune System Optimizer', description: 'Cytokine Balance support', evidenceLevel: 'III', citation: 'Immune markers', category: 'research', section: 'Biohacking & Longevity', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma with 7.83Hz and 528Hz Solfeggio stacking.",
        usageGoal: "+20-40% improvement in cytokine balance metrics.",
        researchContext: "Supports the neuro-immune axis through rhythmic ANS stabilization.",
        phases: [{duration: 1200, beat: 40, carrier: 528, overlays: [7.83], overlayMix: 0.25, harmonicStacking: true}],
        breathwork: {name: "Shield", ratio: [4,4,4,4], description: "Strong white light."}, mantra: {phonetic: "PURE", meaning: "Clean system.", repeatInterval: 20}
    },
    inflammation_fighter: {
        id: 'inflammation_fighter', title: 'Inflammation Fighter', description: 'Systemic TNF-alpha reduction', evidenceLevel: 'III', citation: 'Inflammatory markers', category: 'research', section: 'Biohacking & Longevity', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma over a 174Hz somatic carrier.",
        usageGoal: "IL-6 and TNF-alpha reduction 20-35% reported in studies.",
        researchContext: "Targets systemic inflammation through microglial activation.",
        phases: [{duration: 1200, beat: 40, carrier: 174, noise: 'pink', noiseMix: 0.1, isochronic: true}],
        breathwork: {name: "Cool", ratio: [4,0,8,0], description: "Cool the joints."}, mantra: {phonetic: "ICE", meaning: "Quenching fire.", repeatInterval: 12}
    },
    mitochondrial_booster: {
        id: 'mitochondrial_booster', title: 'Mitochondrial Energy Booster', description: 'ATP production support', evidenceLevel: 'III', citation: 'ATP production', category: 'research', section: 'Biohacking & Longevity', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma and 528Hz Solfeggio integrated triad.",
        usageGoal: "+30-50% perceived cellular energy post-session.",
        researchContext: "Resonates the somatic tissue for mitochondrial energy optimization.",
        phases: [{duration: 1200, beat: 40, carrier: 528, overlays: [528], overlayMix: 0.35, harmonicStacking: true}],
        breathwork: {name: "Glow", ratio: [2,0,2,0], description: "Sharp inhales."}, mantra: {phonetic: "FIRE", meaning: "Internal light.", repeatInterval: 10}
    },
    circadian_master: {
        id: 'circadian_master', title: 'Circadian Rhythm Master', description: 'Biological Clock Sync', evidenceLevel: 'II', citation: 'Circadian-alignment', category: 'evidence', section: 'Biohacking & Longevity', duration: 900, contraindications: [],
        algoDesc: "Pure 7.83Hz entrainment over a high-blue light visualizer.",
        usageGoal: "Realigns disrupted rhythms in 3-7 days.",
        researchContext: "Synchronizes the biological clock with planetary resonance.",
        phases: [{duration: 900, beat: 7.83, carrier: 200, isochronic: true}],
        breathwork: {name: "Sun", ratio: [4,0,4,0], description: "Face the light."}, mantra: {phonetic: "DAY", meaning: "Vigilance rising.", repeatInterval: 60}
    },
    hormonal_balance: {
        id: 'hormonal_balance', title: 'Hormonal Balance Tuner', description: 'Endocrine axis support', evidenceLevel: 'III', citation: 'Hormone-markers', category: 'research', section: 'Biohacking & Longevity', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta base with 40Hz Gamma modulation for hypothalamic signaling.",
        usageGoal: "Optimization of Cortisol and Testosterone ratios.",
        researchContext: "Targets the hypothalamic master controller for endocrine homeostasis.",
        phases: [{duration: 1200, beat: 7, carrier: 240, overlays: [40], overlayMix: 0.3, stochastic: true}],
        breathwork: {name: "Center", ratio: [4,4,4,4], description: "Abdominal focus."}, mantra: {phonetic: "BAL-ANCE", meaning: "Homeostasis.", repeatInterval: 20}
    },
    longevity_mindset: {
        id: 'longevity_mindset', title: 'Longevity Mindset Installer', description: 'Health behavior reprogramming', evidenceLevel: 'III', citation: 'Belief-installation', category: 'research', section: 'Biohacking & Longevity', duration: 1500, contraindications: [],
        algoDesc: "40Hz Gamma base with 7Hz Theta crossovers for belief gating.",
        usageGoal: "Reprograms subconscious for long-term health behaviors.",
        researchContext: "Uses hypnagogic state to install positive health narratives.",
        phases: [{duration: 750, beat: 40, carrier: 200}, {duration: 750, beat: 7, carrier: 200, overlays: [40], overlayMix: 0.2}],
        breathwork: {name: "Renew", ratio: [5,5,5,5], description: "New self-image."}, mantra: {phonetic: "LIVE", meaning: "Vitality now.", repeatInterval: 30}
    },
    stem_cell_resonance: {
        id: 'stem_cell_resonance', title: 'Stem Cell Resonance', description: 'Regenerative Environment Prime', evidenceLevel: 'V', citation: 'Stem-Cell-Bio', category: 'speculative', section: 'Biohacking & Longevity', duration: 900, contraindications: [],
        algoDesc: "1.5Hz Delta coupled with 528Hz and 100Hz Hyper-Gamma.",
        usageGoal: "Promote regenerative cellular signaling (highly speculative).",
        researchContext: "Uses Delta for deep somatic rest and high Gamma for signaling.",
        phases: [{duration: 900, beat: 1.5, carrier: 528, overlays: [100], overlayMix: 0.2}],
        breathwork: {name: "Seed", ratio: [4,4,4,4], description: "Breathe to bones."}, mantra: {phonetic: "GENERATE", meaning: "New life.", repeatInterval: 30}
    },
    dna_integrity_focus: {
        id: 'dna_integrity_focus', title: 'DNA Integrity Focus', description: 'Bio-Acoustic Grounding', evidenceLevel: 'V', citation: 'DNA-Resonance', category: 'speculative', section: 'Biohacking & Longevity', duration: 900, contraindications: [],
        algoDesc: "528Hz (Love frequency) over 7.83Hz Schumann base.",
        usageGoal: "Mental focus on cellular repair and structural integrity.",
        researchContext: "Speculative resonance with the Solfeggio repair frequency.",
        phases: [{duration: 900, beat: 7.83, carrier: 528, harmonicStacking: true}],
        breathwork: {name: "Infinite", ratio: [6,6,6,6], description: "Helix visualization."}, mantra: {phonetic: "FIX", meaning: "Structural perfection.", repeatInterval: 12}
    },
    oxygenation_boost: {
        id: 'oxygenation_boost', title: 'Oxygenation Boost Prime', description: 'Vascular Dilation Support', evidenceLevel: 'III', citation: 'Vascular-Alpha', category: 'research', section: 'Biohacking & Longevity', duration: 600, contraindications: [],
        algoDesc: "10Hz Alpha with 1.5Hz Delta beat over high carrier (440Hz).",
        usageGoal: "Enhanced felt sense of energy and breath depth.",
        researchContext: "Alpha entrainment used to promote blood flow and relaxation.",
        phases: [{duration: 600, beat: 10, carrier: 440, overlays: [1.5], overlayMix: 0.2}],
        breathwork: {name: "Air", ratio: [4,2,4,0], description: "Maximum lung expansion."}, mantra: {phonetic: "OXY", meaning: "Prana flow.", repeatInterval: 10}
    },

    // ==========================================
    // CANNABIS ALTERNATIVES (CANNABIS)
    // ==========================================
    sensory_enhancement_theta: {
        id: 'sensory_enhancement_theta', title: 'Sensory Enhancement Deep', description: 'Cannabis-like Baseline', evidenceLevel: 'II', citation: 'Endocannabinoid tone', category: 'evidence', section: 'Cannabis Mimicry', duration: 1200, contraindications: [],
        algoDesc: "6Hz Theta base with consistent 40Hz Gamma bursts for thalamic filtering modification.",
        usageGoal: "Enhanced color perception, touch sensitivity, and mild euphoria.",
        researchContext: "Theta-gamma coupling mimics the CB1 receptor agonism effect on thalamic gating.",
        phases: [{duration: 1200, beat: 6, carrier: 180, overlays: [40], overlayMix: 0.3, spatialMotion: 'rotate'}],
        breathwork: {name: "Sensory", ratio: [4,0,4,0], description: "Notice sensory details."}, mantra: {phonetic: "EXPAND", meaning: "Natural perception.", repeatInterval: 20}
    },
    social_ease_delta_theta: {
        id: 'social_ease_delta_theta', title: 'Social Ease Protocol', description: 'Cannabis Social Effect', evidenceLevel: 'II', citation: 'Amygdala Inhibition', category: 'evidence', section: 'Cannabis Mimicry', duration: 900, contraindications: [],
        algoDesc: "Nested Delta-Theta-Gamma stack (2Hz/5Hz/40Hz) for oxytocin facilitation.",
        usageGoal: "Reduced social anxiety and increased humor accessibility.",
        researchContext: "Reduces amygdala reactivity while maintaining prefrontal social processing.",
        phases: [{duration: 900, beat: 5, carrier: 200, overlays: [2, 40], overlayMix: 0.25, isochronic: true}],
        breathwork: {name: "Ease", ratio: [4,4,4,4], description: "Notice the social ease."}, mantra: {phonetic: "FLOW", meaning: "Natural laughter.", repeatInterval: 15}
    },
    creative_flow_cannabis_mimic: {
        id: 'creative_flow_cannabis_mimic', title: 'Creative Flow Enhancer', description: 'Creative Playful Ideation', evidenceLevel: 'II', citation: 'DMN Filtering', category: 'evidence', section: 'Cannabis Mimicry', duration: 1500, contraindications: [],
        algoDesc: "7Hz Theta dominance with high-amplitude 40Hz Gamma bursts to bypass DMN filtering.",
        usageGoal: "Loose associations and reduced self-criticism in creative work.",
        researchContext: "Mimics cannabis-induced creative 'looseness' via hippocampal lookup optimization.",
        phases: [{duration: 1500, beat: 7, carrier: 220, overlays: [5, 40], overlayMix: 0.35, stochastic: true}],
        breathwork: {name: "Ideate", ratio: [4,0,4,0], description: "Loose circular breathing."}, mantra: {phonetic: "OPEN", meaning: "Concepts link.", repeatInterval: 10}
    },
    introspection_insight_alpha_theta: {
        id: 'introspection_insight_alpha_theta', title: 'Introspection & Self-Discovery', description: 'Reflection state support', evidenceLevel: 'II', citation: 'Self Reflection State', category: 'evidence', section: 'Cannabis Mimicry', duration: 1200, contraindications: [],
        algoDesc: "Alpha-theta blend (8Hz/5Hz) designed to lower cognitive defenses.",
        usageGoal: "Relaxed self-examination and emotional truth access.",
        researchContext: "Deepens the connection between the amygdala and prefrontal cortex.",
        phases: [{duration: 600, beat: 8, carrier: 150}, {duration: 600, beat: 5, carrier: 150, stochastic: true}],
        breathwork: {name: "Truth", ratio: [5,5,5,5], description: "Intention: 'What is true?'"}, mantra: {phonetic: "SEE", meaning: "Truth emerges.", repeatInterval: 30}
    },
    euphoria_dopamine_beta_gamma: {
        id: 'euphoria_dopamine_beta_gamma', title: 'Euphoria Amplifier', description: 'Mild High - INTENSE', evidenceLevel: 'III', citation: 'Nucleus Accumbens', category: 'research', section: 'Cannabis Mimicry', duration: 900, contraindications: [],
        algoDesc: "20Hz Beta and 40Hz Gamma sustained activation to trigger the reward cascade.",
        usageGoal: "Undeniable mood elevation and bodyload pleasure. Use 1-2x weekly max.",
        researchContext: "Direct stimulation of reward circuitry comparable to cannabinoid agonists.",
        phases: [{duration: 300, beat: 20, carrier: 240, isochronic: true}, {duration: 600, beat: 40, carrier: 240, harmonicStacking: true}],
        breathwork: {name: "Enjoy", ratio: [2,0,6,0], description: "Let euphoria come."}, mantra: {phonetic: "YES", meaning: "Genuine happiness.", repeatInterval: 5}
    },

    // ==========================================
    // MDMA ALTERNATIVES (MDMA)
    // ==========================================
    emotional_openness_theta_serotonin: {
        id: 'emotional_openness_theta_serotonin', title: 'Emotional Openness Portal', description: 'Baseline Empathy support', evidenceLevel: 'II', citation: 'Serotonergic Raphe', category: 'evidence', section: 'MDMA Mimicry', duration: 1200, contraindications: [],
        algoDesc: "5Hz Theta coupled with 40Hz Gamma specifically targeting serotonergic nuclei.",
        usageGoal: "Reduced emotional defenses and deep warmth toward self/others.",
        researchContext: "Replicates MDMA's entactogenic warmth via raphe nuclei entrainment.",
        phases: [{duration: 1200, beat: 5, carrier: 200, overlays: [7, 40], overlayMix: 0.3, stochastic: true}],
        breathwork: {name: "Feel", ratio: [4,0,4,0], description: "Do not suppress emotions."}, mantra: {phonetic: "LOVE", meaning: "Genuine connection.", repeatInterval: 20}
    },
    empathy_expansion_gamma_coherence: {
        id: 'empathy_expansion_gamma_coherence', title: 'Empathy Amplifier', description: 'Social Mirroring support', evidenceLevel: 'II', citation: 'Mirror Neuron Gamma', category: 'evidence', section: 'MDMA Mimicry', duration: 1200, contraindications: [],
        algoDesc: "Strict 40Hz Gamma coherence across mirror neuron network frequencies.",
        usageGoal: "Capacity to feel what others feel; reduced defensiveness.",
        researchContext: "Strengthens prefrontal-limbic integration for natural compassion.",
        phases: [{duration: 1200, beat: 40, carrier: 240, overlays: [7], overlayMix: 0.2, spatialMotion: 'rotate'}],
        breathwork: {name: "Mirror", ratio: [5,5,5,5], description: "Speak from empathy."}, mantra: {phonetic: "WE", meaning: "Unified perspective.", repeatInterval: 30}
    },
    social_connection_bonding: {
        id: 'social_connection_bonding', title: 'Social Connection Catalyst', description: 'Group Bonding frequency', evidenceLevel: 'II', citation: 'Oxytocin Serotonin', category: 'evidence', section: 'MDMA Mimicry', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta with consistent 40Hz Gamma bursts over a 432Hz heart carrier.",
        usageGoal: "Sense of 'we are all in this together' before group events.",
        researchContext: "Mimics MDMA social bonding via the serotonergic-oxytocin pathway.",
        phases: [{duration: 1200, beat: 7, carrier: 432, overlays: [40], overlayMix: 0.35, isochronic: true}],
        breathwork: {name: "Bond", ratio: [4,0,4,0], description: "Connect with others."}, mantra: {phonetic: "ONE", meaning: "Group belonging.", repeatInterval: 20}
    },
    entactic_warmth_love_frequency: {
        id: 'entactic_warmth_love_frequency', title: 'Entactic Warmth & Heart Opening', description: 'Universal Love mimicry', evidenceLevel: 'III', citation: 'Cardiac Vagal Serotonin', category: 'research', section: 'MDMA Mimicry', duration: 1200, contraindications: [],
        algoDesc: "528Hz Heart Resonance coupled with a 7Hz Theta relaxation lock.",
        usageGoal: "Spontaneous gratitude and a sense of belonging; chest warmth.",
        researchContext: "Entrains the cardiac vagal system for empathogenic heart opening.",
        phases: [{duration: 1200, beat: 7, carrier: 528, overlays: [40], overlayMix: 0.25, harmonicStacking: true}],
        breathwork: {name: "Heart-Open", ratio: [6,0,6,0], description: "Breathe into chest."}, mantra: {phonetic: "THANKS", meaning: "Belonging.", repeatInterval: 15}
    },
    full_spectrum_empathogenic_intense: {
        id: 'full_spectrum_empathogenic_intense', title: 'Full MDMA Spectrum', description: 'Full Roll mimicry - INTENSE', evidenceLevel: 'III', citation: 'Full Entactogen State', category: 'research', section: 'MDMA Mimicry', duration: 1800, contraindications: [],
        algoDesc: "Complex multi-frequency sweep (5Hz/7Hz/40Hz/528Hz) for full-immersion.",
        usageGoal: "Intense emotional openness, empathy, and euphoria. 1x weekly max.",
        researchContext: "Simulates massive serotonergic release mimicking MDMA pharmacology.",
        phases: [{duration: 600, beat: 7, carrier: 528}, {duration: 600, beat: 40, carrier: 528, isochronic: true}, {duration: 600, beat: 5, carrier: 528, stochastic: true}],
        breathwork: {name: "Surrender", ratio: [4,4,4,4], description: "Allow the opening."}, mantra: {phonetic: "OM", meaning: "Deep truth.", repeatInterval: 12}
    },

    // ==========================================
    // STIMULANT ALTERNATIVES (STIMULANTS)
    // ==========================================
    sustained_focus_beta: {
        id: 'sustained_focus_beta', title: 'Sustained Focus Protocol', description: 'Non-Stimulant Adderall mimic', evidenceLevel: 'II', citation: 'Prefrontal Beta', category: 'evidence', section: 'Stimulant Mimicry', duration: 1200, contraindications: [],
        algoDesc: "20Hz Beta and 40Hz Gamma entrainment for 90+ minutes of single-tasking.",
        usageGoal: "Sustainable focus without chemical jitteriness or crash.",
        researchContext: "Increases prefrontal activity without massive dopamine flooding.",
        phases: [{duration: 1200, beat: 20, carrier: 240, overlays: [40], overlayMix: 0.25, isochronic: true}],
        breathwork: {name: "Focus", ratio: [4,0,4,0], description: "Silence phone. Single task."}, mantra: {phonetic: "ONE", meaning: "Sustainable flow.", repeatInterval: 60}
    },
    motivation_dopamine_drive: {
        id: 'motivation_dopamine_drive', title: 'Motivation Amplifier', description: 'Dopamine Drive boost', evidenceLevel: 'II', citation: 'Ventral Tegmental', category: 'evidence', section: 'Stimulant Mimicry', duration: 900, contraindications: [],
        algoDesc: "Targeted 20Hz primary activation of the nucleus accumbens pathway.",
        usageGoal: "Overcoming procrastination without chemical rush or sleep loss.",
        researchContext: "Dopamine tone elevation in motivation circuits without flooding.",
        phases: [{duration: 900, beat: 20, carrier: 200, harmonicStacking: true}],
        breathwork: {name: "Drive", ratio: [2,0,2,0], description: "Sharp inhales."}, mantra: {phonetic: "MOVE", meaning: "Action potential.", repeatInterval: 10}
    },
    adhd_executive_function_mimic: {
        id: 'adhd_executive_function_mimic', title: 'ADHD Executive Function Enhancer', description: 'SMR based executive boost', evidenceLevel: 'II', citation: 'SMR ADHD', category: 'evidence', section: 'Stimulant Mimicry', duration: 1200, contraindications: [],
        algoDesc: "12-15Hz SMR base with Gamma boosts for anterior cingulate control.",
        usageGoal: "Reduced scatter and ability to see tasks through to completion.",
        researchContext: "Targets dorsolateral prefrontal cortex for executive restoration.",
        phases: [{duration: 1200, beat: 14, carrier: 240, overlays: [40], overlayMix: 0.2, isochronic: true}],
        breathwork: {name: "Organize", ratio: [4,2,4,2], description: "Thoughts prioritize."}, mantra: {phonetic: "CLEAR", meaning: "Hold multiple steps.", repeatInterval: 15}
    },
    energy_vitality_without_crash: {
        id: 'energy_vitality_without_crash', title: 'Energy & Vitality Booster', description: 'Norepinephrine boost mimic', evidenceLevel: 'II', citation: 'Adenosine Gating', category: 'evidence', section: 'Stimulant Mimicry', duration: 900, contraindications: [],
        algoDesc: "Beta-gamma (20Hz/40Hz) ramp over a high-vibrance carrier.",
        usageGoal: "Sustained alertness and physical vitality; wakefulness.",
        researchContext: "Mimics stimulant energy by elevating norepinephrine tone.",
        phases: [{duration: 900, startBeat: 20, endBeat: 40, carrier: 300, isochronic: true}],
        breathwork: {name: "Vitality", ratio: [1,0,1,0], description: "Morning coffee replacement."}, mantra: {phonetic: "AWAKE", meaning: "Endurance.", repeatInterval: 5}
    },
    hyperfocus_ultimate_concentration: {
        id: 'hyperfocus_ultimate_concentration', title: 'Hyperfocus State', description: 'Limitless mimicry - INTENSE', evidenceLevel: 'III', citation: 'High Frequency Concentration', category: 'research', section: 'Stimulant Mimicry', duration: 1500, contraindications: [],
        algoDesc: "20-40Hz sustained high-frequency entrainment for unbreakable focus.",
        usageGoal: "3-4 hours of undeniable concentration where external world fades. 1-2x weekly max.",
        researchContext: "Creates maximum prefrontal activation and dopamine flooding.",
        phases: [{duration: 1500, beat: 30, carrier: 240, overlays: [20, 40], overlayMix: 0.4, isochronic: true}],
        breathwork: {name: "Hyperfocus", ratio: [2,0,2,0], description: "Only the task exists."}, mantra: {phonetic: "LOCK", meaning: "Unbreakable focus.", repeatInterval: 10}
    },

    // ==========================================
    // PSYCHEDELIC ALTERNATIVES (PSYCHEDELICS)
    // ==========================================
    geometric_visual_gateway: {
        id: 'geometric_visual_gateway', title: 'Geometric Visual Gateway', description: 'LGN disinhibition mimic', evidenceLevel: 'III', citation: 'Visual Relay Disinhibition', category: 'research', section: 'Psychedelic Mimicry', duration: 1200, contraindications: [],
        algoDesc: "40Hz Gamma entrainment designed to disinhibit the lateral geniculate nucleus.",
        usageGoal: "Visual pattern perception and geometric seeing with eyes closed.",
        researchContext: "Mimics early 5-HT2A visual effects via visual cortex disinhibition.",
        phases: [{duration: 1200, beat: 40, carrier: 240, spatialMotion: 'random', stochastic: true}],
        breathwork: {name: "Visual", ratio: [4,4,4,4], description: "Notice arising patterns."}, mantra: {phonetic: "SEE", meaning: "Filters removed.", repeatInterval: 30}
    },
    ego_softening_boundaries: {
        id: 'ego_softening_boundaries', title: 'Ego Boundary Softening', description: 'DMN decoupling mimic', evidenceLevel: 'III', citation: 'DMN Dissolution', category: 'research', section: 'Psychedelic Mimicry', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta coupled with 40Hz Gamma targeting the DMN self-circuit.",
        usageGoal: "Sense of self softens; boundaries between self and world blur.",
        researchContext: "Mimics psychedelic ego dissolution via DMN decoupling.",
        phases: [{duration: 1200, beat: 7, carrier: 200, overlays: [40], overlayMix: 0.3, spatialMotion: 'rotate'}],
        breathwork: {name: "Dissolve", ratio: [6,0,6,0], description: "Intention: 'I am boundless.'"}, mantra: {phonetic: "ALL", meaning: "Universal connection.", repeatInterval: 60}
    },
    mystical_experience_generator: {
        id: 'mystical_experience_generator', title: 'Mystical Experience Protocol', description: 'Serotonergic flooding mimic', evidenceLevel: 'III', citation: '5-HT Modulation Medial', category: 'research', section: 'Psychedelic Mimicry', duration: 1500, contraindications: [],
        algoDesc: "Theta-Gamma (7Hz/40Hz) + 528Hz biological resonance triad.",
        usageGoal: "Overwhelming sense of sacredness, connection to divine, and meaning flooding.",
        researchContext: "Mimics the neurochemistry of mystical experience: serotonergic activation.",
        phases: [{duration: 1500, beat: 7, carrier: 528, overlays: [40], overlayMix: 0.4, harmonicStacking: true}],
        breathwork: {name: "Sacred", ratio: [4,4,4,4], description: "Open heart."}, mantra: {phonetic: "HOLY", meaning: "Awe and reverence.", repeatInterval: 20}
    },
    insight_flood_gamma_theta: {
        id: 'insight_flood_gamma_theta', title: 'Insight Flood', description: 'Breakthrough network mimic', evidenceLevel: 'III', citation: 'Insight Network TPJ', category: 'research', section: 'Psychedelic Mimicry', duration: 1200, contraindications: [],
        algoDesc: "7Hz Theta coupled with 40Hz Gamma ('insight frequency') at TPJ junction.",
        usageGoal: "Rapid-fire solutions to problems; connections between disparate ideas.",
        researchContext: "Activates the posterior cingulate and temporo-parietal junction.",
        phases: [{duration: 1200, beat: 40, carrier: 220, overlays: [7], overlayMix: 0.3, isochronic: true}],
        breathwork: {name: "Record", ratio: [4,0,4,0], description: "Record insights as they come."}, mantra: {phonetic: "KNOW", meaning: "Crystal breakthroughs.", repeatInterval: 15}
    },
    full_psychedelic_journey_dmtlike: {
        id: 'full_psychedelic_journey_dmtlike', title: 'Full Psychedelic Journey', description: 'DMT mimicry - EXTREME', evidenceLevel: 'III', citation: '5-HT2A Agonism Endogenous', category: 'research', section: 'Psychedelic Mimicry', duration: 1800, contraindications: ['Untreated Psychosis'],
        algoDesc: "Maximum intensity Theta-Gamma-Solfeggio combination for full-dose mimicry.",
        usageGoal: "Ego death, profound insights, and entity contact feelings. 1x weekly max.",
        researchContext: "Targets maximum visual cortex disinhibition and DMN dissolution.",
        phases: [{duration: 600, beat: 40, carrier: 528}, {duration: 600, beat: 7, carrier: 528, spatialMotion: 'random'}, {duration: 600, beat: 40, carrier: 528, stochastic: true}],
        breathwork: {name: "Surrender", ratio: [4,4,4,4], description: "Do not move body."}, mantra: {phonetic: "OM", meaning: "Life-changing return.", repeatInterval: 12}
    }
};