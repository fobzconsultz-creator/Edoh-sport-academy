import React from 'react';
import { Users, Shield, Clock, Calendar, ArrowRight, Check } from 'lucide-react';

interface ProgramsSectionProps {
  onSelectPathway: (pathway: 'minor' | 'senior') => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onSelectPathway }) => {
  const handleEnroll = (pathway: 'minor' | 'senior') => {
    onSelectPathway(pathway);
    const element = document.getElementById('registration-portal');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="programs" className="py-20 md:py-28 border-b border-[#3A331A]/60 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-[#FFD000]">
            Divisions & Training Regimes
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Tailored Development Pathways
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            Structured curriculum calibrated for age-appropriate biological development, athletic mastery, and competitive exposure.
          </p>
        </div>

        {/* Divisions Cards: Youth vs Senior */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Program Card 1: Youth Division */}
          <div className="rounded-2xl bg-[#141414] border border-[#3A331A] p-8 flex flex-col justify-between hover:border-[#FFD000]/60 transition-all shadow-xl group">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-[#2A2413] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#241F10] border border-[#443812] flex items-center justify-center text-[#FFD000]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">Youth Division</h3>
                    <div className="text-xs font-mono text-[#FFD000]">AGES UNDER 18 (U-10 TO U-17)</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-neutral-400">PREFIX:</span>
                  <span className="block text-xs font-mono text-[#FFD000] font-bold">ESA/YTH/2026/..</span>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed">
                Comprehensive grassroots foundation emphasizing technical skill acquisition, physical motor coordination, sportsmanship, and mental resilience. School schedules are strictly prioritized alongside developmental sessions.
              </p>

              {/* Age Sub-Categories */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 bg-[#1B1B1B] rounded-xl border border-[#2D2716] text-center">
                  <div className="text-sm font-bold text-white">Under-10</div>
                  <div className="text-[10px] text-neutral-400 font-mono">Ball Mastery</div>
                </div>
                <div className="p-3 bg-[#1B1B1B] rounded-xl border border-[#2D2716] text-center">
                  <div className="text-sm font-bold text-white">Under-13</div>
                  <div className="text-[10px] text-neutral-400 font-mono">Spatial Play</div>
                </div>
                <div className="p-3 bg-[#1B1B1B] rounded-xl border border-[#2D2716] text-center">
                  <div className="text-sm font-bold text-white">Under-15</div>
                  <div className="text-[10px] text-neutral-400 font-mono">Tactical Systems</div>
                </div>
                <div className="p-3 bg-[#1B1B1B] rounded-xl border border-[#2D2716] text-center">
                  <div className="text-sm font-bold text-white">Under-17</div>
                  <div className="text-[10px] text-neutral-400 font-mono">Competition</div>
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-2.5 pt-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FFD000] shrink-0" />
                  <span>Safeguarding & child protection protocols strictly enforced</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FFD000] shrink-0" />
                  <span>Mandatory parental / legal guardian statutory covenant & consent</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FFD000] shrink-0" />
                  <span>Participation in Abuja Youth League and National Age-Grade Cups</span>
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-[#262112] mt-6">
              <button
                onClick={() => handleEnroll('minor')}
                className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold text-black bg-[#FFD000] hover:bg-[#E6BC00] rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,208,0,0.2)]"
              >
                <span>Complete Youth Registration (Under 18)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Program Card 2: Senior / Adult Division */}
          <div className="rounded-2xl bg-[#141414] border border-[#3A331A] p-8 flex flex-col justify-between hover:border-[#FFD000]/60 transition-all shadow-xl group">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-[#2A2413] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#241F10] border border-[#443812] flex items-center justify-center text-[#FFD000]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">Senior Division</h3>
                    <div className="text-xs font-mono text-[#FFD000]">AGES 18+ (ADULT / PROSPECT SQUAD)</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-neutral-400">PREFIX:</span>
                  <span className="block text-xs font-mono text-[#FFD000] font-bold">ESA/SNR/2026/..</span>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed">
                Elite high-intensity training environment tailored for aspiring professionals, amateur standouts, academy trainees, and free agents seeking competitive matchplay, domestic league trials, and foreign scouting showcases.
              </p>

              {/* Status Classification */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 bg-[#1B1B1B] rounded-xl border border-[#2D2716] text-center">
                  <div className="text-sm font-bold text-white">Free Agent</div>
                  <div className="text-[10px] text-neutral-400 font-mono">Unattached</div>
                </div>
                <div className="p-3 bg-[#1B1B1B] rounded-xl border border-[#2D2716] text-center">
                  <div className="text-sm font-bold text-white">Amateur</div>
                  <div className="text-[10px] text-neutral-400 font-mono">FCT League</div>
                </div>
                <div className="p-3 bg-[#1B1B1B] rounded-xl border border-[#2D2716] text-center">
                  <div className="text-sm font-bold text-white">Trainee</div>
                  <div className="text-[10px] text-neutral-400 font-mono">Reserves</div>
                </div>
                <div className="p-3 bg-[#1B1B1B] rounded-xl border border-[#2D2716] text-center">
                  <div className="text-sm font-bold text-white">Contracted</div>
                  <div className="text-[10px] text-neutral-400 font-mono">First Team</div>
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-2.5 pt-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FFD000] shrink-0" />
                  <span>Full registration on FIFA TMS and NFF National Clearinghouse</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FFD000] shrink-0" />
                  <span>GPS heart-rate athletic biometric load monitoring & match tape</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FFD000] shrink-0" />
                  <span>Scouting showcases with European, Asian & North African scouts</span>
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-[#262112] mt-6">
              <button
                onClick={() => handleEnroll('senior')}
                className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold text-white hover:text-black bg-[#1E1E1E] hover:bg-[#FFD000] border border-[#3A331A] hover:border-[#FFD000] rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Register as Senior Athlete (18+)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Training Facilities & Schedule Overview */}
        <div className="rounded-2xl bg-[#141414] border border-[#3A331A] p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#292313]">
            
            <div className="space-y-2 pt-4 md:pt-0">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Calendar className="w-4 h-4 text-[#FFD000]" />
                <span>Training Days</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Tuesday, Thursday & Saturday mornings. Friday evening tactical classroom sessions and match reviews.
              </p>
            </div>

            <div className="space-y-2 pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Clock className="w-4 h-4 text-[#FFD000]" />
                <span>Morning & Evening Slots</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Youth Sessions: 07:00 – 09:30 AM (Saturdays). Senior Squad: 06:30 – 09:00 AM (Tue/Thu/Sat) & 04:00 PM (Wed).
              </p>
            </div>

            <div className="space-y-2 pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Shield className="w-4 h-4 text-[#FFD000]" />
                <span>Administrative Base</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Shop 237, Block B, Mabushi Ultra Modern Market, Jahi, Abuja, FCT.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
