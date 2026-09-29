import React from 'react';
import { Target, Zap, Globe, Award, Shield, CheckCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 border-b border-[#3A331A]/60 bg-[#0E0E0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-[#FFD000]">
            Philosophy & Institutional Charter
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Forging Nigeria’s Next Generation of Elite Football Professionals
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
            Headquartered in Abuja, Edoh Sport Academy was established to bridge the gap between raw grassroots potential and the exacting demands of global football. We operate on a rigorous triumvirate framework: <strong className="text-white">Discover</strong>, <strong className="text-white">Develop</strong>, and <strong className="text-white">Promote</strong>.
          </p>
        </div>

        {/* 3 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 01 */}
          <div className="rounded-2xl bg-[#141414] border border-[#3A331A] p-7 space-y-5 flex flex-col justify-between hover:border-[#FFD000]/40 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#221E10] border border-[#443812] flex items-center justify-center text-[#FFD000]">
                <Target className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-[#FFD000]">01. THE DISCOVERY PHASE</div>
              <h3 className="font-display text-xl font-bold text-white">
                Uncompromising Grassroots Scouting
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                We deploy experienced talent spotters across Abuja, the FCT, and northern and southern talent belts to find athletes with innate physical intelligence, game intuition, and raw technical foundation.
              </p>
            </div>
            <div className="pt-4 border-t border-[#262112] text-xs text-neutral-400 space-y-1.5 font-mono">
              <div className="flex items-center gap-1.5 text-neutral-300">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFD000]" />
                <span>NIN & Age Verification Screening</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-300">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFD000]" />
                <span>Standardized Anthropometric Testing</span>
              </div>
            </div>
          </div>

          {/* Pillar 02 */}
          <div className="rounded-2xl bg-[#141414] border border-[#3A331A] p-7 space-y-5 flex flex-col justify-between hover:border-[#FFD000]/40 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#221E10] border border-[#443812] flex items-center justify-center text-[#FFD000]">
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-[#FFD000]">02. THE DEVELOPMENT PHASE</div>
              <h3 className="font-display text-xl font-bold text-white">
                Elite Technical & Tactical Rigor
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Development follows a periodized syllabus: ball mastery, spatial cognition, high-speed decision making, sports psychology, and competitive match temperament tailored to contemporary European and global standards.
              </p>
            </div>
            <div className="pt-4 border-t border-[#262112] text-xs text-neutral-400 space-y-1.5 font-mono">
              <div className="flex items-center gap-1.5 text-neutral-300">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFD000]" />
                <span>CAF Licensed Coaching Staff</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-300">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFD000]" />
                <span>Video Analysis & GPS Metrics</span>
              </div>
            </div>
          </div>

          {/* Pillar 03 */}
          <div className="rounded-2xl bg-[#141414] border border-[#3A331A] p-7 space-y-5 flex flex-col justify-between hover:border-[#FFD000]/40 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#221E10] border border-[#443812] flex items-center justify-center text-[#FFD000]">
                <Globe className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-[#FFD000]">03. THE PROMOTION PHASE</div>
              <h3 className="font-display text-xl font-bold text-white">
                Direct Professional Pathways
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Through our institutional partnerships with the FCT Football Association, NFF, accredited FIFA licensed match agents, and European scouts, every registered athlete has a clear, legal pathway toward professional club contracts.
              </p>
            </div>
            <div className="pt-4 border-t border-[#262112] text-xs text-neutral-400 space-y-1.5 font-mono">
              <div className="flex items-center gap-1.5 text-neutral-300">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFD000]" />
                <span>FIFA Connect Player Passport</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-300">
                <CheckCircle className="w-3.5 h-3.5 text-[#FFD000]" />
                <span>International Showcase Tournaments</span>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory Governance Banner */}
        <div className="rounded-2xl bg-[#161616] border border-[#3A331A] p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="flex items-center gap-2 text-[#FFD000] text-xs font-mono uppercase">
                <Shield className="w-4 h-4" />
                <span>Regulatory Integrity & Legal Compliance</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                FCT Football Association & FIFA Connect Compliance
              </h4>
              <p className="text-sm text-neutral-300">
                Every player registered with Edoh Sport Academy is enrolled with verifiable biometric documentation into the official FCT FA registry and the NFF Player Database, ensuring that training compensation, solidarity contributions, and professional international transfers are legally secured.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <div className="p-3 bg-[#111] rounded-xl border border-[#2B2513] text-center">
                <div className="text-xs text-neutral-400 font-mono">AFFILIATION STATUS</div>
                <div className="text-sm font-bold text-white mt-0.5">Active FCT FA Member Academy</div>
              </div>
              <div className="p-3 bg-[#111] rounded-xl border border-[#2B2513] text-center">
                <div className="text-xs text-neutral-400 font-mono">REGISTRATION YEAR</div>
                <div className="text-sm font-bold text-[#FFD000] mt-0.5">Official 2026 Intake Portal</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
