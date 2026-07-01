
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  RESPONSE_FLOWS, 
  SCENARIOS, 
  APPLY_IT_CASES,
  CHALLENGES,
  Scenario,
  ResponseFlow,
  Challenge
} from '../data/conversationBuilderData';
import { 
  Layout, 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  RefreshCw, 
  Eye, 
  CheckCircle2, 
  AlertTriangle,
  Volume2
} from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';
import SpeakingRecorder from './SpeakingRecorder';

export default function ConversationBuilderLab() {
  const [activeTab, setActiveTab] = useState<'builder' | 'challenge' | 'rehearse' | 'guide' | 'comparison'>('builder');
  const [mode, setMode] = useState<'marketing' | 'family' | 'ielts'>('marketing');
  const [scenarioId, setScenarioId] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<Record<string, string>>({});
  const [showRef, setShowRef] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [draftTranscript, setDraftTranscript] = useState('');

  const { speak } = useSpeech();

  React.useEffect(() => {
    let interval: any;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  React.useEffect(() => {
    setTimer(0);
    setIsTimerRunning(false);
  }, [activeTab, scenarioId]);

  const scenario = SCENARIOS.find(s => s.id === scenarioId);
  const flow = RESPONSE_FLOWS.find(f => f.id === scenario?.flowType);

  const handleBlockChange = (label: string, value: string) => {
    setBlocks(prev => ({ ...prev, [label]: value }));
  };

  const insertPhrase = (label: string, phrase: string) => {
    setBlocks(prev => ({ ...prev, [label]: (prev[label] || '') + phrase + ' ' }));
  };

  const reset = () => {
    setBlocks({});
    setShowRef(false);
    setDraftTranscript('');
    setTimer(0);
    setIsTimerRunning(false);
  };

  const ChallengeView = () => (
    <div className="space-y-6">
      <select value={mode} onChange={(e) => {setMode(e.target.value as any); setScenarioId(null);}} className="p-2 border rounded-lg">
        <option value="marketing">Marketing & Work</option>
        <option value="family">Family Life</option>
        <option value="ielts">IELTS Speaking</option>
      </select>
      <select value={scenarioId || ''} onChange={(e) => setScenarioId(e.target.value)} className="p-2 border rounded-lg">
        <option value="">Select Scenario</option>
        {SCENARIOS.filter(s => s.mode === mode).map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
      </select>
      {scenario && CHALLENGES.find(c => c.scenarioId === scenarioId) && (
        <div className="p-4 border rounded-xl space-y-4">
          <h3 className="font-bold">{scenario.title}</h3>
          <p className="text-sm">{CHALLENGES.find(c => c.scenarioId === scenarioId)?.brief}</p>
          <div className="text-xs bg-slate-50 p-2 rounded italic">{CHALLENGES.find(c => c.scenarioId === scenarioId)?.instructionsVi}</div>
        </div>
      )}
    </div>
  );

  const SpeakAndReflectView = () => (
    <div className="space-y-6">
      {scenario ? (
        <>
          <div className="p-4 bg-slate-50 border rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">Listen & Prepare</h3>
              <button 
                onClick={() => speak(scenario.referenceResponse, 'english')} 
                className="flex items-center gap-2 p-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-colors"
              >
                <Volume2 className="h-4 w-4" /> Listen to Reference
              </button>
            </div>
            <div className="bg-white p-3 rounded text-sm italic border">
              {scenario.referenceResponse}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-bold text-sm">Prepare Notes</h4>
              <div className="text-xs space-y-2">
                {scenario.blockLabels.map(l => (
                  <div key={l} className="p-2 bg-slate-100 rounded">
                    <span className="font-bold">{l}</span>: {blocks[l] || '...'}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-xl border">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">Rehearsal Timer</span>
                  <div className="flex gap-2">
                    <button onClick={() => setTimer(30)} className="p-1 px-2 bg-slate-200 text-xs rounded">30s</button>
                    <button onClick={() => setTimer(60)} className="p-1 px-2 bg-slate-200 text-xs rounded">60s</button>
                    <button onClick={() => setTimer(120)} className="p-1 px-2 bg-slate-200 text-xs rounded">120s</button>
                  </div>
                </div>
                <div className="text-3xl font-bold text-center my-2 text-slate-700">{timer}s</div>
                <div className="flex justify-center gap-2">
                  <button onClick={() => setIsTimerRunning(!isTimerRunning)} className="px-4 py-2 bg-blue-500 text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors">
                    {isTimerRunning ? 'Pause' : 'Start'}
                  </button>
                  <button onClick={() => { setTimer(0); setIsTimerRunning(false); }} className="px-4 py-2 bg-slate-200 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-300 transition-colors">
                    Reset
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold text-sm">Speak</h4>
              <SpeakingRecorder 
                lessonId={`rehearse_${scenario.id}`}
                savedTranscript={draftTranscript}
                onSave={(audioId, transcript) => setDraftTranscript(transcript)}
              />
            </div>
          </div>

          <div className="p-4 border rounded-xl space-y-3">
            <h4 className="font-bold text-sm">Reflect</h4>
            <div className="space-y-2">
              {CHALLENGES.find(c => c.scenarioId === scenario.id)?.selfReflection.map(l => (
                <label key={l} className="flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
                  <input type="checkbox" className="mt-1" /> {l}
                </label>
              ))}
            </div>
          </div>
          
          <div className="text-xs bg-slate-100 p-3 rounded-lg text-slate-500 space-y-1">
            <p>“This practice area supports rehearsal and self-reflection. It does not evaluate pronunciation, fluency, grammar quality, speaking quality, or IELTS level.”</p>
            <p>“Khu vực này hỗ trợ luyện tập và tự phản chiếu. Công cụ không đánh giá phát âm, độ trôi chảy, chất lượng ngữ pháp, kỹ năng nói hoặc trình độ IELTS.”</p>
          </div>
        </>
      ) : (
        <div className="text-center p-8 bg-slate-50 text-slate-500 rounded-xl">
          Please select a scenario in the Guided Challenge tab first.
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex gap-2 bg-slate-100 p-1 rounded-xl overflow-x-auto">
        {(['builder', 'challenge', 'rehearse', 'guide', 'comparison'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === tab ? 'bg-white shadow' : 'text-slate-500'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'builder' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select value={mode} onChange={(e) => {setMode(e.target.value as any); setScenarioId(null);}} className="p-2 border rounded-lg">
              <option value="marketing">Marketing & Work</option>
              <option value="family">Family Life</option>
              <option value="ielts">IELTS Speaking</option>
            </select>
            <select value={scenarioId || ''} onChange={(e) => setScenarioId(e.target.value)} className="p-2 border rounded-lg">
              <option value="">Select Scenario</option>
              {SCENARIOS.filter(s => s.mode === mode).map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
            </select>
          </div>

          {scenario && flow && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl space-y-2">
                  <h3 className="font-bold">{scenario.title}</h3>
                  <p className="text-sm">{scenario.prompt}</p>
                  <p className="text-sm font-medium">Intent: {scenario.intent}</p>
                </div>
                
                {scenario.blockLabels.map(label => (
                  <div key={label} className="space-y-2">
                    <label className="text-sm font-bold">{label}</label>
                    <div className="flex flex-wrap gap-2">
                      {scenario.phraseBank[label]?.map(p => (
                        <button key={p} onClick={() => insertPhrase(label, p)} className="text-xs p-1 bg-blue-50 hover:bg-blue-100 rounded text-blue-700">{p}</button>
                      ))}
                    </div>
                    <textarea value={blocks[label] || ''} onChange={(e) => handleBlockChange(label, e.target.value)} className="w-full p-2 border rounded-lg h-20" placeholder={`Enter ${label}...`} />
                  </div>
                ))}
                
                <div className="flex gap-2">
                  <button onClick={() => setShowRef(!showRef)} className="flex items-center gap-2 p-2 bg-slate-200 rounded-lg text-sm font-semibold">
                    <Eye className="h-4 w-4" /> {showRef ? 'Hide Reference' : 'Reveal Reference'}
                  </button>
                  <button onClick={reset} className="flex items-center gap-2 p-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold">
                    <RefreshCw className="h-4 w-4" /> Reset
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 border rounded-xl bg-white shadow-sm space-y-2">
                  <h4 className="font-bold text-sm">Response Preview</h4>
                  {scenario.blockLabels.map(l => <p key={l} className="text-sm">{blocks[l]}</p>)}
                </div>
                {showRef && (
                  <div className="p-4 border rounded-xl bg-green-50 space-y-2">
                    <p className="text-sm font-bold">Reference example — adapt it to your own context.</p>
                    <p className="text-sm">{scenario.referenceResponse}</p>
                    <p className="text-sm italic">{scenario.referenceTranslationVi}</p>
                  </div>
                )}
                <div className="p-4 bg-slate-100 rounded-lg text-xs space-y-1">
                  <p><strong>Self-check / Tự kiểm tra:</strong></p>
                  <p>{scenario.blockLabels.every(l => blocks[l]?.length > 0) ? '✅ All blocks completed.' : '⏳ Complete all blocks.'}</p>
                  <p className="mt-2 text-[10px]">“This builder helps organize a response. It does not evaluate grammar quality, speaking quality, naturalness, or IELTS level.”</p>
                  <p className="text-[10px]">“Công cụ này hỗ trợ sắp xếp cấu trúc phản hồi. Công cụ không đánh giá chất lượng ngữ pháp, kỹ năng nói, độ tự nhiên hoặc trình độ IELTS.”</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'challenge' && <ChallengeView />}
      {activeTab === 'rehearse' && <SpeakAndReflectView />}
      {activeTab === 'guide' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESPONSE_FLOWS.map(f => (
            <div key={f.id} className="p-6 border rounded-xl space-y-3">
              <h3 className="font-bold text-lg">{f.title}</h3>
              <p className="text-sm">{f.explanationVi}</p>
              <div className="text-xs bg-slate-100 p-2 rounded">{f.structure.join(' → ')}</div>
              <p className="text-sm italic">{f.exampleEn}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'comparison' && (
        <div className="space-y-6">
          {APPLY_IT_CASES.map(c => (
            <div key={c.id} className="p-6 border rounded-xl space-y-4">
              <h3 className="font-bold text-lg">{c.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {c.comparisons.map(comp => (
                  <div key={comp.context} className="p-4 bg-slate-50 rounded-lg space-y-2">
                    <h4 className="font-bold text-sm">{comp.context}</h4>
                    <p className="text-xs">{comp.exampleEn}</p>
                    <p className="text-xs text-slate-500 italic">{comp.exampleVi}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
