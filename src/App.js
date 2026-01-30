import React, { useState, useEffect } from 'react';
import { questionBank } from './Questions';
import { glossary, glossaryTerms } from './Glossary';

// ============================================
// SUPABASE CONFIG - Replace with your credentials
// ============================================
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY =process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

/*
SETUP: Run in Supabase SQL Editor - see supabase_schema.sql file
*/

// ============================================
// GLOSSARY TERM RENDERER COMPONENT
// ============================================
const GlossaryTermRenderer = ({ text, onTermClick }) => {
  const renderText = () => {
    if (!text) return null;
    
    // Build a map of term positions for efficient rendering
    let termMatches = [];
    glossaryTerms.forEach(term => {
      const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        termMatches.push({
          term: term,
          start: match.index,
          end: match.index + match[0].length,
          displayTerm: match[0]
        });
      }
    });
    
    // Sort and remove overlapping matches (keep first match only)
    termMatches.sort((a, b) => a.start - b.start);
    const uniqueMatches = [];
    let lastEnd = 0;
    termMatches.forEach(match => {
      if (match.start >= lastEnd) {
        uniqueMatches.push(match);
        lastEnd = match.end;
      }
    });
    
    // Build JSX with links
    if (uniqueMatches.length === 0) {
      return text;
    }
    
    const elements = [];
    let lastIndex = 0;
    
    uniqueMatches.forEach((match, i) => {
      // Add text before the match
      if (match.start > lastIndex) {
        elements.push(
          <span key={`text-${i}`}>{text.substring(lastIndex, match.start)}</span>
        );
      }
      // Add the linked term
      elements.push(
        <button
          key={`term-${i}`}
          onClick={() => onTermClick(match.term)}
          className="text-cyan-400 hover:text-cyan-300 underline decoration-dashed cursor-pointer font-medium transition-colors"
          type="button"
        >
          {match.displayTerm}
        </button>
      );
      lastIndex = match.end;
    });
    
    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(
        <span key="text-end">{text.substring(lastIndex)}</span>
      );
    }
    
    return elements;
  };
  
  return <>{renderText()}</>;
};

// ============================================
// GLOSSARY INLINE EXPLANATION
// ============================================
const GlossaryExplanation = ({ term, onClose }) => {
  const def = glossary[term];
  
  if (!def) return null;
  
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(def.term + " definition")}`;
  const slug = term.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div id={`glossary-expl-${slug}`} tabIndex={-1} className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-4 animate-in fade-in">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-bold text-sm">💡 {def.term}</span>
          <span className="inline-block px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[10px] font-semibold">
            {def.category}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-400 text-sm flex-shrink-0"
          type="button"
        >
          ✕
        </button>
      </div>
      <p className="text-slate-300 text-xs leading-relaxed mb-3">
        {def.explanation}
      </p>
      <a
        href={googleSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs font-medium underline transition-colors"
      >
        Read more on Google →
      </a>
    </div>
  );
};

const saveToSupabase = async (data) => {
  if (!SUPABASE_URL || SUPABASE_URL === 'YOUR_SUPABASE_URL') {
    console.log('📊 Lead (Supabase not configured):', data);
    return { success: true };
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/assessment_leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, 'Prefer': 'return=representation' },
      body: JSON.stringify({
        name: data.form.name, email: data.form.email, company: data.form.company,
        role: data.form.role || null, phone: data.form.phone || null,
        score: data.score, max_score: data.maxScore,
        percentage: Math.round((data.score / data.maxScore) * 100),
        category: data.category, perfect_first_half: data.perfectFirstHalf,
        perfect_score: data.score === data.maxScore,
        completion_time_seconds: data.completionTime,
        user_agent: navigator.userAgent, referrer: document.referrer || null
      })
    });
    const [lead] = await res.json();
    await fetch(`${SUPABASE_URL}/rest/v1/assessment_answers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` },
      body: JSON.stringify(data.answers.map(a => ({ lead_id: lead.id, question_id: a.qId, domain: a.domain, points_earned: a.points, is_correct: a.points === 10 })))
    });
    console.log('✅ Saved to Supabase:', lead.id);
    return { success: true };
  } catch (e) { console.error('❌ Supabase error:', e); return { success: false }; }
};


const domains = { PF: { name: 'Problem Framing', icon: '🎯', color: '#6366F1' }, DS: { name: 'Data Strategy', icon: '🗄️', color: '#8B5CF6' }, GEO: { name: 'Geospatial AI', icon: '🌍', color: '#F59E0B' }, GEN: { name: 'GenAI', icon: '🤖', color: '#10B981' }, VAI: { name: 'Voice AI', icon: '🎙️', color: '#3B82F6' }, ROI: { name: 'AI Economics', icon: '📊', color: '#EF4444' }, GOV: { name: 'Governance', icon: '⚖️', color: '#EC4899' }, ORG: { name: 'Organization', icon: '🏢', color: '#14B8A6' }, STR: { name: 'Strategy', icon: '🧭', color: '#F97316' } };

const selectQuestions = () => {
  const sel = [], used = new Set();
  const req = { GEO: 2, GEN: 1, DS: 1, ROI: 1, GOV: 1 };
  Object.entries(req).forEach(([d, n]) => { questionBank.filter(q => q.domainCode === d && !used.has(q.id)).sort(() => Math.random() - 0.5).slice(0, n).forEach(q => { sel.push(q); used.add(q.id); }); });
  questionBank.filter(q => !used.has(q.id)).sort(() => Math.random() - 0.5).slice(0, 10 - sel.length).forEach(q => { sel.push(q); used.add(q.id); });
  return sel.sort(() => Math.random() - 0.5);
};

const getCategory = (s, m) => { const p = (s / m) * 100; if (p >= 90) return { level: "AI Visionary", color: "#059669", bg: "rgba(5,150,105,0.15)", emoji: "🏆" }; if (p >= 75) return { level: "AI-Ready Executive", color: "#0891B2", bg: "rgba(8,145,178,0.15)", emoji: "🎯" }; if (p >= 60) return { level: "Emerging Leader", color: "#7C3AED", bg: "rgba(124,58,237,0.15)", emoji: "📈" }; if (p >= 45) return { level: "Foundation Builder", color: "#D97706", bg: "rgba(217,119,6,0.15)", emoji: "🔧" }; return { level: "Getting Started", color: "#DC2626", bg: "rgba(220,38,38,0.15)", emoji: "🚀" }; };

const getMidMsg = (c) => { if (c === 5) return { emoji: "🔥", title: "PERFECT STREAK!", sub: "5/5 correct", msg: "Top 5% of leaders. Exceptional judgment.", cta: "Keep the momentum!", type: "perfect" }; if (c >= 4) return { emoji: "⚡", title: "IMPRESSIVE!", sub: `${c}/5 correct`, msg: "Strong instincts. Minor gaps.", cta: "5 more to prove yourself", type: "great" }; if (c >= 3) return { emoji: "💪", title: "SOLID START", sub: `${c}/5 correct`, msg: "Good awareness, some gaps.", cta: "Next 5 will challenge you", type: "good" }; return { emoji: "🎯", title: "CHALLENGE MODE", sub: `${c}/5 correct`, msg: "Real blind spots exposed. That's the point.", cta: "Ready to level up?", type: "challenge" }; };

const getFinalMsg = (s, m) => { const p = (s / m) * 100; if (p >= 90) return { emoji: "🏆", title: "TOP 1% PERFORMER", sub: "Exceptional AI Leadership", msg: "You outperformed 99% of executives.", hl: true }; if (p >= 75) return { emoji: "🎯", title: "STRONG PERFORMER", sub: "Top 10%", msg: "Solid judgment with minor gaps.", hl: false }; if (p >= 60) return { emoji: "📈", title: "EMERGING LEADER", sub: "Above Average", msg: "Good instincts, noticeable gaps.", hl: false }; return { emoji: "🚀", title: "GROWTH OPPORTUNITY", sub: "Foundation Building", msg: "Important blind spots revealed.", hl: false }; };

export default function App() {
  const [stage, setStage] = useState('welcome');
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showIns, setShowIns] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', role: '', phone: '' });
  const [start, setStart] = useState(null);
  const [midStats, setMidStats] = useState({ correct: 0 });
  const [selectedTerm, setSelectedTerm] = useState(null);

  // Handle a term click: set the selected term and scroll to the explanation
  const handleTermClick = (term) => {
    setSelectedTerm(term);
    // Wait a tick for the explanation to render, then scroll into view
    setTimeout(() => {
      const id = `glossary-expl-${term.toLowerCase().replace(/\s+/g, '-')}`;
      const el = document.getElementById(id);
      if (el) {
        try {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.focus && el.focus();
        } catch (e) {
          // ignore
        }
      }
    }, 60);
  };

  useEffect(() => { if (stage === 'quiz' && !questions.length) { setQuestions(selectQuestions()); setStart(Date.now()); } }, [stage, questions.length]);

  useEffect(() => {
    if (stage === 'quiz' || stage === 'review') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [idx, stage]);

  useEffect(() => {
    if (stage === 'quiz' && showIns) {
      setTimeout(() => {
        const insightsSection = document.querySelector('.reality-check-section');
        if (insightsSection) {
          insightsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  }, [showIns, stage]);

  const q = questions[idx];
  const max = questions.length * 10;
  const cat = getCategory(score, max);

  const handleSubmit = () => { if (!sel) return; setScore(s => s + sel.points); const newAns = [...answers, { qId: q.id, domain: q.domainCode, points: sel.points }]; setAnswers(newAns); setShowIns(true); if (newAns.length === 5) setMidStats({ correct: newAns.filter(a => a.points === 10).length }); };
  const handleNext = () => { if (idx === 4 && showIns) { setStage('midway'); return; } if (idx < questions.length - 1) { setIdx(i => i + 1); setSel(null); setShowIns(false); setSelectedTerm(null); } else setStage('form'); };
  const handleMidContinue = () => { setIdx(5); setSel(null); setShowIns(false); setStage('quiz'); };
  const handleFormSubmit = async (e) => { e.preventDefault(); await saveToSupabase({ form, score, maxScore: max, category: cat.level, perfectFirstHalf: midStats.correct === 5, answers, completionTime: Math.round((Date.now() - start) / 1000) }); setStage('results'); };
  const reset = () => { setStage('welcome'); setQuestions([]); setIdx(0); setSel(null); setAnswers([]); setScore(0); setShowIns(false); setForm({ name: '', email: '', company: '', role: '', phone: '' }); };

  // REVIEW SCREEN
  if (stage === 'review') {
    const currentQuestion = questions[idx];
    const currentAnswer = answers[idx];
    const d = domains[currentQuestion?.domainCode] || { name: currentQuestion?.domainCode, icon: '📌', color: '#666' };
    
    const handleReviewNext = () => {
      if (idx < questions.length - 1) {
        setIdx(idx + 1);
        setSelectedTerm(null);
      } else {
        setStage('results');
      }
    };
    
    const handleReviewBack = () => {
      if (idx > 0) {
        setIdx(idx - 1);
        setSelectedTerm(null);
      }
    };
    
    return (
      <div className="min-h-screen bg-slate-950 text-white p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setStage('results')} className="text-sm font-mono text-slate-500 hover:text-slate-400">← Back to Results</button>
            <div className="text-sm font-mono text-slate-500">{String(idx + 1).padStart(2, '0')}/{questions.length}</div>
            <div className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${d.color}20`, color: d.color }}><span>{d.icon}</span><span className="hidden sm:inline">{d.name}</span></div>
          </div>
          <div className="h-1 bg-slate-800 rounded-full mb-6 overflow-hidden"><div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500" style={{ width: `${((idx + 1) / questions.length) * 100}%` }} /></div>
          {selectedTerm && <GlossaryExplanation term={selectedTerm} onClose={() => setSelectedTerm(null)} />}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-5">
              <p className="text-slate-200 whitespace-pre-line text-sm leading-relaxed">
                <GlossaryTermRenderer 
                  text={currentQuestion?.scenario} 
                  onTermClick={handleTermClick}
                />
              </p>
            </div>
            <div className="px-5 pb-5 space-y-2">
              {currentQuestion?.options.map((o) => {
                const isSelected = o.points === currentAnswer?.points;
                const isCorrect = o.points === 10;
                let border = 'border-slate-800', bg = 'bg-slate-900/30';
                
                if (isCorrect) {
                  border = 'border-emerald-500';
                  bg = 'bg-emerald-500/10';
                } else if (isSelected && !isCorrect) {
                  const isGood = o.points >= 5;
                  border = isGood ? 'border-amber-500' : 'border-red-500';
                  bg = isGood ? 'bg-amber-500/10' : 'bg-red-500/10';
                }
                
                return (
                  <button key={o.id} disabled className={`w-full text-left p-4 rounded-xl border transition-all ${border} ${bg} cursor-default`}>
                    <div className="flex items-start gap-3">
                      <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${isCorrect ? 'bg-emerald-500 text-white' : isSelected ? (o.points >= 5 ? 'bg-amber-500' : 'bg-red-500') + ' text-white' : 'bg-slate-800 text-slate-400'}`}>
                        {isCorrect ? '✓' : isSelected ? '✗' : o.id}
                      </span>
                      <div className="flex-1">
                        <span className="text-slate-300 text-sm"><GlossaryTermRenderer text={o.text} onTermClick={handleTermClick} /></span>
                        <div className={`mt-1.5 text-xs font-medium ${isCorrect ? 'text-emerald-400' : isSelected ? (o.points >= 5 ? 'text-amber-400' : 'text-red-400') : 'text-slate-500'}`}>
                          {isCorrect ? '✓ Correct' : isSelected ? `Your answer (${o.points}/10 pts)` : `+${o.points} pts`}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="border-t border-slate-800 bg-slate-900/80 p-5">
              <div className="flex items-center gap-2 mb-3"><span className="text-amber-400">💡</span><span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Reality Check</span></div>
              <p className="text-slate-300 text-sm mb-3"><span className="text-amber-400 font-semibold">{currentQuestion?.insight.company}:</span> <GlossaryTermRenderer text={currentQuestion?.insight.story} onTermClick={handleTermClick} /></p>
              <div className="bg-slate-800/50 rounded-lg p-3 mb-5"><div className="text-[10px] text-slate-500 uppercase mb-1">Key Takeaway</div><div className="text-cyan-400 text-sm"><GlossaryTermRenderer text={currentQuestion?.insight.keyTakeaway} onTermClick={handleTermClick} /></div></div>
              <div className="flex gap-3">
                <button onClick={handleReviewBack} disabled={idx === 0} className="flex-1 py-3.5 bg-slate-800 text-slate-400 font-semibold rounded-xl hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed">← Previous</button>
                <button onClick={handleReviewNext} className="flex-1 py-3.5 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-400 transition-all">{idx === questions.length - 1 ? 'Done' : 'Next →'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // WELCOME SCREEN
  if (stage === 'welcome') return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-full mb-6"><span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>EXECUTIVE ASSESSMENT</div>
          <h1 className="text-3xl font-bold mb-2">AI Leadership</h1>
          <h2 className="text-xl text-slate-400">Readiness Diagnostic</h2>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-8">{[{ v: '10', l: 'Questions' }, { v: '100', l: 'Max Score' }, { v: '~8', l: 'Minutes' }].map((s, i) => (<div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center"><div className="text-2xl font-bold text-cyan-400">{s.v}</div><div className="text-[10px] text-slate-500 uppercase mt-1">{s.l}</div></div>))}</div>
        <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-4 mb-8">
          <div className="text-xs text-slate-500 uppercase mb-3 font-semibold">AI Domains Covered</div>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mb-4">
            <div className="flex items-center gap-1.5">🎯 Problem Framing</div>
            <div className="flex items-center gap-1.5">🗄️ Data Strategy</div>
            <div className="flex items-center gap-1.5">🌍 Geospatial AI</div>
            <div className="flex items-center gap-1.5">🤖 GenAI</div>
            <div className="flex items-center gap-1.5">🎙️ Voice AI</div>
            <div className="flex items-center gap-1.5">📊 AI Economics</div>
            <div className="flex items-center gap-1.5">⚖️ Governance</div>
            <div className="flex items-center gap-1.5">🏢 Organization</div>
            <div className="flex items-center gap-1.5">🧭 Strategy</div>
          </div>
          <div className="space-y-2 text-sm border-t border-slate-700 pt-4">
            {['Real Enterprise decisioning scenarios', 'Instant insights per question', 'See how you rank with peers'].map((f, i) => (<div key={i} className="flex items-center gap-2 text-slate-400"><span className="text-emerald-500 text-xs">✓</span>{f}</div>))}
          </div>
        </div>
        <button onClick={() => setStage('quiz')} className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold rounded-xl text-lg hover:from-cyan-400 hover:to-blue-500 transition-all">Start Assessment</button>
      </div>
    </div>
  );

  // MIDWAY MOTIVATION SCREEN
  if (stage === 'midway') {
    const m = getMidMsg(midStats.correct);
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className={`text-7xl mb-6 ${m.type === 'perfect' ? 'animate-bounce' : ''}`}>{m.emoji}</div>
          <h1 className={`text-2xl font-bold mb-2 ${m.type === 'perfect' ? 'text-emerald-400' : m.type === 'great' ? 'text-cyan-400' : m.type === 'good' ? 'text-amber-400' : 'text-slate-200'}`}>{m.title}</h1>
          <p className="text-slate-400 mb-6">{m.sub}</p>
          <div className="flex justify-center gap-2 mb-6">{[...Array(5)].map((_, i) => (<div key={i} className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${i < midStats.correct ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>{i < midStats.correct ? '✓' : '–'}</div>))}</div>
          <p className="text-slate-300 mb-8">{m.msg}</p>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 mb-8"><div className="text-sm text-slate-500 mb-1">Current Score</div><div className="text-3xl font-bold"><span className="text-white">{score}</span><span className="text-slate-600 text-xl"> / 50</span></div></div>
          <button onClick={handleMidContinue} className={`w-full py-4 font-semibold rounded-xl text-lg transition-all ${m.type === 'perfect' ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400' : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500'} text-white`}>{m.type === 'perfect' ? "Let's Go Perfect 10! 🎯" : m.cta}</button>
        </div>
      </div>
    );
  }

  // QUIZ SCREEN
  if (stage === 'quiz' && q) {
    const d = domains[q.domainCode] || { name: q.domainCode, icon: '📌', color: '#666' };
    const handleBack = () => {
      if (idx > 0) {
        setIdx(idx - 1);
        setSel(null);
        setShowIns(false);
        setSelectedTerm(null);
        // Remove the last answer if going back
        setAnswers(answers.slice(0, -1));
        // Recalculate score
        const newScore = answers.slice(0, -1).reduce((sum, a) => sum + a.points, 0);
        setScore(newScore);
      }
    };
    return (
      <div className="min-h-screen bg-slate-950 text-white p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3"><button onClick={handleBack} disabled={idx === 0} className="text-sm font-mono text-slate-500 hover:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed">← Back</button><div className="text-sm font-mono text-slate-500">{String(idx + 1).padStart(2, '0')}/10</div><div className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${d.color}20`, color: d.color }}><span>{d.icon}</span><span className="hidden sm:inline">{d.name}</span></div></div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full"><span className="text-amber-400 text-sm">●</span><span className="font-mono font-bold">{score}</span><span className="text-slate-600 text-sm">pts</span></div>
          </div>
          <div className="h-1 bg-slate-800 rounded-full mb-6 overflow-hidden"><div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500" style={{ width: `${((idx + (showIns ? 1 : 0)) / 10) * 100}%` }} /></div>
          {selectedTerm && <GlossaryExplanation term={selectedTerm} onClose={() => setSelectedTerm(null)} />}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-5"><p className="text-slate-200 whitespace-pre-line text-sm leading-relaxed"><GlossaryTermRenderer text={q.scenario} onTermClick={handleTermClick} /></p></div>
            <div className="px-5 pb-5 space-y-2">{q.options.map((o) => { const isSel = sel?.id === o.id; const isOpt = o.points === 10; const isGood = o.points >= 5 && o.points < 10; let border = 'border-slate-800', bg = 'bg-slate-900/30'; if (isSel && !showIns) { border = 'border-cyan-500'; bg = 'bg-cyan-500/10'; } if (showIns) { if (isOpt) { border = 'border-emerald-500'; bg = 'bg-emerald-500/10'; } else if (isSel) { border = isGood ? 'border-amber-500' : 'border-red-500'; bg = isGood ? 'bg-amber-500/10' : 'bg-red-500/10'; } } return (<button key={o.id} onClick={() => !showIns && setSel(o)} disabled={showIns} className={`w-full text-left p-4 rounded-xl border transition-all ${border} ${bg} ${!showIns ? 'hover:border-slate-700' : ''}`}><div className="flex items-start gap-3"><span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${showIns && isOpt ? 'bg-emerald-500 text-white' : showIns && isSel && !isOpt ? (isGood ? 'bg-amber-500' : 'bg-red-500') + ' text-white' : isSel ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'}`}>{showIns && isOpt ? '✓' : o.id}</span><div className="flex-1"><span className="text-slate-300 text-sm"><GlossaryTermRenderer text={o.text} onTermClick={handleTermClick} /></span>{showIns && <div className={`mt-1.5 text-xs font-medium ${o.points === 10 ? 'text-emerald-400' : o.points >= 5 ? 'text-amber-400' : 'text-red-400'}`}>+{o.points} pts</div>}</div></div></button>); })}</div>
            {!showIns && <div className="px-5 pb-5"><button onClick={handleSubmit} disabled={!sel} className={`w-full py-3.5 rounded-xl font-medium transition-all ${sel ? 'bg-cyan-500 text-white hover:bg-cyan-400' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>Confirm</button></div>}
            {showIns && <div className="reality-check-section border-t border-slate-800 bg-slate-900/80 p-5"><div className="flex items-center gap-2 mb-3"><span className="text-amber-400">💡</span><span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Reality Check</span></div><p className="text-slate-300 text-sm mb-3"><span className="text-amber-400 font-semibold">{q.insight.company}:</span> <GlossaryTermRenderer text={q.insight.story} onTermClick={handleTermClick} /></p><div className="bg-slate-800/50 rounded-lg p-3 mb-5"><div className="text-[10px] text-slate-500 uppercase mb-1">Key Takeaway</div><div className="text-cyan-400 text-sm"><GlossaryTermRenderer text={q.insight.keyTakeaway} onTermClick={handleTermClick} /></div></div><button onClick={handleNext} className="w-full py-3.5 bg-amber-500 text-slate-900 font-semibold rounded-xl hover:bg-amber-400 transition-all">{idx === 4 ? 'Continue →' : idx < 9 ? 'Next →' : 'View Results →'}</button></div>}
          </div>
        </div>
      </div>
    );
  }

  // FORM SCREEN
  if (stage === 'form') {
    const fm = getFinalMsg(score, max);
    const isPerfect = score === max;
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {isPerfect && <div className="text-center mb-6"><div className="text-6xl mb-3 animate-bounce">🏆</div><div className="text-emerald-400 font-bold text-xl mb-1">PERFECT SCORE!</div><div className="text-slate-400 text-sm">Top 1% of all participants</div></div>}
          {!isPerfect && <div className="text-center mb-6"><div className="text-5xl mb-3">{fm.emoji}</div><div className="font-bold text-xl mb-1" style={{ color: cat.color }}>{fm.title}</div><div className="text-slate-400 text-sm">{fm.sub}</div></div>}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 mb-6 text-center"><div className="text-4xl font-bold"><span className="text-white">{score}</span><span className="text-slate-600 text-2xl">/{max}</span></div></div>
          <p className="text-center text-slate-400 text-sm mb-6">Enter details for personalized insights</p>
          <form onSubmit={handleFormSubmit} className="space-y-3">
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name *" className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm" />
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Work Email *" className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm" />
            <input type="text" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company *" className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm" />
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-500 text-sm"><option value="">Select Role</option><option value="CXO">CXO / C-Level</option><option value="VP">VP / SVP</option><option value="Director">Director</option><option value="Head">Department Head</option><option value="Manager">Senior Manager</option><option value="Founder">Founder</option></select>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone (Optional)" className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm" />
            <button type="submit" className="w-full py-3.5 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-400 transition-all mt-2">Get Full Results</button>
          </form>
          <button onClick={() => setStage('results')} className="w-full mt-3 py-2 text-slate-500 hover:text-slate-400 text-sm">Skip →</button>
        </div>
      </div>
    );
  }

  // RESULTS SCREEN
  if (stage === 'results') {
    const domainScores = {};
    answers.forEach(a => { if (!domainScores[a.domain]) domainScores[a.domain] = { earned: 0, max: 0 }; domainScores[a.domain].earned += a.points; domainScores[a.domain].max += 10; });
    const fm = getFinalMsg(score, max);
    const isPerfect = score === max;
    const weak = Object.entries(domainScores).filter(([_, v]) => (v.earned / v.max) < 0.7).map(([k]) => domains[k]);
    return (
      <div className="min-h-screen bg-slate-950 text-white p-4">
        <div className="max-w-2xl mx-auto">
          {isPerfect && <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-2xl p-6 mb-6 text-center"><div className="text-5xl mb-3">🏆</div><div className="text-emerald-400 font-bold text-2xl mb-2">TOP 1% PERFORMER</div><p className="text-slate-300">Perfect score! Exceptional AI leadership judgment.</p></div>}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center mb-6">{!isPerfect && <div className="text-5xl mb-3">{fm.emoji}</div>}<div className="flex items-baseline justify-center gap-1 mb-2"><span className="text-5xl font-bold">{score}</span><span className="text-xl text-slate-500">/ {max}</span></div><div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-3" style={{ backgroundColor: cat.bg, color: cat.color }}>{cat.level}</div>{!isPerfect && <p className="text-slate-400 text-sm">{fm.msg}</p>}</div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 mb-6"><div className="text-xs text-slate-500 uppercase mb-4">Performance by Domain</div><div className="space-y-3">{Object.entries(domainScores).map(([code, data]) => { const d = domains[code] || { name: code, icon: '📌' }; const pct = (data.earned / data.max) * 100; return (<div key={code}><div className="flex items-center justify-between text-sm mb-1.5"><div className="flex items-center gap-2"><span>{d.icon}</span><span className="text-slate-300">{d.name}</span></div><span className={pct >= 70 ? 'text-emerald-400' : pct >= 50 ? 'text-amber-400' : 'text-red-400'}>{data.earned}/{data.max}</span></div><div className="h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className={`h-full transition-all ${pct >= 70 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${pct}%` }} /></div></div>); })}</div></div>
          {weak.length > 0 && !isPerfect && <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6"><div className="text-xs text-amber-400 uppercase mb-2">Development Areas</div><div className="flex flex-wrap gap-2">{weak.map((d, i) => (<span key={i} className="inline-flex items-center gap-1 text-sm text-slate-300 bg-slate-800/50 px-2.5 py-1 rounded-lg">{d?.icon} {d?.name}</span>))}</div></div>}
          <button onClick={() => { setIdx(0); setStage('review'); }} className="w-full py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-all mb-4">📋 Review Your Answers</button>
          
          <div className="bg-gradient-to-br from-cyan-500/15 to-blue-500/15 border border-cyan-500/40 rounded-2xl p-6 mb-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-cyan-400 mb-3">Ready to Level Up? </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">If you found this exercise beneficial, don't wait to get AI-ready — become a power leader in your industry. <span className="text-cyan-400 font-semibold">Be the agent of change.</span></p>
              
              <div className="bg-slate-900/50 rounded-xl p-4 mb-4 text-left">
                <div className="text-sm text-slate-300 space-y-2 mb-4">
                  <div className="flex gap-2">
                    <span className="text-cyan-400 flex-shrink-0">✓</span>
                    <span><span className="text-cyan-400 font-semibold">Tailored for Executives</span> — Designed specifically for C-suite and senior leaders</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-cyan-400 flex-shrink-0">✓</span>
                    <span><span className="text-cyan-400 font-semibold">Case Study Based</span> — Foundation building to AI expertise through real-world scenarios</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-cyan-400 flex-shrink-0">✓</span>
                    <span><span className="text-cyan-400 font-semibold">Industry Practitioners as Instructors</span> — Learn from data scientists with real-world expertise</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-cyan-400 flex-shrink-0">✓</span>
                    <span><span className="text-cyan-400 font-semibold">Not Your Typical Coursera</span> — No generic classroom courses; hands-on, experiential learning</span>
                  </div>
                </div>
              </div>
              
              <div className="text-2xl font-bold text-amber-400 mb-4">+91 7501378225</div>
              <div className="flex justify-center gap-3">
                <a href="tel:+917501378225" className="px-5 py-2.5 bg-white text-slate-900 font-medium rounded-lg text-sm hover:bg-slate-100 transition-all">📞 Call</a>
                <a href={`https://wa.me/917501378225?text=${encodeURIComponent(`Hi, I scored ${score}/${max} on the AI Leadership Assessment. I'm interested in the Executive AI Course.`)}`} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-emerald-500 text-white font-medium rounded-lg text-sm hover:bg-emerald-400 transition-all">💬 WhatsApp</a>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6"><button onClick={reset} className="text-slate-500 hover:text-slate-400 text-sm">↺ Take Again</button></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {selectedTerm && <GlossaryExplanation term={selectedTerm} onClose={() => setSelectedTerm(null)} />}
    </>
  );
}