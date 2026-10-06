import React, { useState } from 'react';
import { PLAYBOOK_RULES, VIBE_QUIZ } from '../data/playbook';
import { BookOpen, CheckCircle, XCircle, Quote, Sparkles, AlertTriangle, ArrowRight, HelpCircle } from 'lucide-react';

export const PlaybookTab: React.FC = () => {
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setSelectedQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const calculateScore = () => {
    let score = 0;
    VIBE_QUIZ.forEach((q) => {
      if (selectedQuizAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Playbook Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl relative">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs font-semibold text-indigo-300 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>THE VIBE CODING CODEX</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            The Philosophy of Soch & Vibe Coding
          </h1>
          <p className="text-slate-400 text-sm mt-2 leading-relaxed">
            In early 2025, Andrej Karpathy coined "Vibe Coding"—the paradigm where engineers talk to AI models to build software at conversational speed. Master the art of directorial steering, error self-healing, and cognitive flow.
          </p>
        </div>
      </div>

      {/* The 5 Core Principles */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span>The 5 Core Laws of High-Velocity Vibe Coding</span>
        </h2>

        <div className="space-y-5">
          {PLAYBOOK_RULES.map((rule) => (
            <div
              key={rule.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600/30 text-indigo-400 font-mono font-bold text-xs flex items-center justify-center border border-indigo-500/30">
                      0{rule.id}
                    </span>
                    <h3 className="font-bold text-slate-100 text-base">{rule.title}</h3>
                  </div>
                  <p className="text-xs text-indigo-300 italic">{rule.subtitle}</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {rule.coreRule}
              </p>

              {rule.karpathyQuote && (
                <div className="bg-slate-950/80 border-l-2 border-indigo-500 p-3 rounded-r-xl flex items-start gap-3">
                  <Quote className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-400 italic">
                    "{rule.karpathyQuote}" <span className="text-slate-500 not-italic">— Andrej Karpathy</span>
                  </p>
                </div>
              )}

              {/* Good vs Bad comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-rose-950/30 border border-rose-900/40 p-3 rounded-xl text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-rose-400">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>The Frustrating Anti-Pattern</span>
                  </div>
                  <p className="text-rose-200/80">{rule.badPractice}</p>
                </div>

                <div className="bg-emerald-950/30 border border-emerald-900/40 p-3 rounded-xl text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>The High-Vibe Pattern</span>
                  </div>
                  <p className="text-emerald-200/80">{rule.goodPractice}</p>
                </div>
              </div>

              {/* Sample steering prompt */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-400">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1 font-sans font-semibold">
                  Sample Steering Prompt
                </span>
                <span className="text-slate-300">{rule.promptSnippet}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Vibe Intuition Quiz */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              <span>Test Your Vibe Coding Intuition</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Verify your directorial mental model with this interactive 3-question diagnostic.
            </p>
          </div>
          {showQuizResults && (
            <div className="px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 rounded-lg text-xs font-bold font-mono">
              Score: {calculateScore()} / {VIBE_QUIZ.length}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {VIBE_QUIZ.map((q) => {
            const selected = selectedQuizAnswers[q.id];
            return (
              <div key={q.id} className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <h4 className="text-sm font-semibold text-slate-200">
                  {q.id}. {q.question}
                </h4>

                <div className="space-y-2">
                  {q.options.map((opt, idx) => {
                    const isSelected = selected === idx;
                    const isCorrect = q.correctIndex === idx;
                    let optionStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850';

                    if (showQuizResults) {
                      if (isCorrect) {
                        optionStyle = 'bg-emerald-950/60 border-emerald-700 text-emerald-200';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-950/60 border-rose-700 text-rose-200';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-indigo-950/80 border-indigo-600 text-white';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(q.id, idx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {showQuizResults && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                        {showQuizResults && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                      </button>
                    );
                  })}
                </div>

                {showQuizResults && (
                  <p className="text-xs text-slate-400 bg-slate-900 p-2.5 rounded-lg border border-slate-800 mt-2">
                    💡 <strong className="text-slate-300">Explanation:</strong> {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => setShowQuizResults(!showQuizResults)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition"
          >
            {showQuizResults ? 'Hide Explanations' : 'Check Answers'}
          </button>
        </div>
      </div>
    </div>
  );
};
