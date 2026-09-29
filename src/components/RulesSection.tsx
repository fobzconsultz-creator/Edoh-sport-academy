import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Scale, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { YOUTH_STATUTORY_CLAUSES, SENIOR_STATUTORY_CLAUSES } from '../data/statutoryClauses';

export const RulesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'minor' | 'senior'>('minor');
  const [expandedClauseId, setExpandedClauseId] = useState<number | null>(1);

  const clauses = activeTab === 'minor' ? YOUTH_STATUTORY_CLAUSES : SENIOR_STATUTORY_CLAUSES;

  const toggleClause = (id: number) => {
    setExpandedClauseId(expandedClauseId === id ? null : id);
  };

  return (
    <section id="statutory-rules" className="py-20 md:py-28 border-b border-[#3A331A]/60 bg-[#0E0E0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-[#FFD000]">
            Regulatory Constitution & Statutes
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Official Academy Regulations
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            Edoh Sport Academy operates under 9 codified statutory covenants designed to safeguard player welfare, preserve athletic integrity, and align all trainee contracts with NFF and FIFA Connect jurisprudence.
          </p>
        </div>

        {/* Tab Switcher: Minor vs Senior Rules */}
        <div className="flex items-center gap-2 p-1.5 bg-[#161616] border border-[#3A331A] rounded-xl max-w-md">
          <button
            onClick={() => {
              setActiveTab('minor');
              setExpandedClauseId(1);
            }}
            className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'minor'
                ? 'bg-[#FFD000] text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Minor & Guardian Code (9 Clauses)
          </button>
          <button
            onClick={() => {
              setActiveTab('senior');
              setExpandedClauseId(1);
            }}
            className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'senior'
                ? 'bg-[#FFD000] text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Senior Athlete Covenant (9 Clauses)
          </button>
        </div>

        {/* Clauses Accordion */}
        <div className="grid grid-cols-1 gap-4">
          {clauses.map((clause) => {
            const isExpanded = expandedClauseId === clause.id;
            return (
              <div
                key={clause.id}
                className={`rounded-xl border transition-all ${
                  isExpanded
                    ? 'bg-[#161616] border-[#FFD000]/60 shadow-[0_0_20px_rgba(255,208,0,0.08)]'
                    : 'bg-[#121212] border-[#2A2413] hover:border-[#3A331A]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleClause(clause.id)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 focus:outline-none"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-white text-base sm:text-lg">
                        {clause.title}
                      </span>
                      {isExpanded && (
                        <span className="text-[10px] font-mono uppercase bg-[#28210F] text-[#FFD000] px-2 py-0.5 rounded border border-[#443812]">
                          Active Clause
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-400 font-medium">
                      {clause.summary}
                    </p>
                  </div>

                  <div className="p-2 rounded-lg bg-[#1C1C1C] text-neutral-300 shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-[#FFD000]" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-[#242014] space-y-3">
                    <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-[#0D0D0D] p-4 rounded-lg border border-[#262111]">
                      {clause.fullLegalText}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD000]" />
                      <span>Standard statutory covenant incorporated into 2026 intake contracts</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Statutory Safeguarding Notice */}
        <div className="p-5 rounded-xl bg-[#1A1810] border border-[#443812] flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-[#FFD000] shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-bold text-white block">
              Safeguarding & Fair Play Priority
            </span>
            <span className="text-neutral-300 block leading-relaxed">
              Edoh Sport Academy maintains an open-door safeguarding policy in collaboration with the FCT Football Association Safeguarding Officer. All trainees, guardians, and coaching personnel are bound by strict non-discrimination, anti-harassment, and child protection regulations.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
