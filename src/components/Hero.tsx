import React from 'react';
import { ArrowUpRight, ShieldCheck, Trophy, Compass, Sparkles } from 'lucide-react';
import { CrestLogo } from './CrestLogo';

interface HeroProps {
  onSelectPathway: (pathway: 'minor' | 'senior') => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectPathway }) => {
  const handleScrollToPortal = (pathway: 'minor' | 'senior') => {
    onSelectPathway(pathway);
    const element = document.getElementById('registration-portal');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#3A331A]/60">
      {/* Background Stadium Grid & Subtle Warm Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial Gold Flare at top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-gradient-to-b from-[#FFD000]/15 via-[#FFC72C]/5 to-transparent blur-3xl opacity-60" />
        {/* Football Pitch Tactical Grid Lines */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at center, #FFD000 1px, transparent 1px), linear-gradient(to right, #3A331A 1px, transparent 1px)`,
            backgroundSize: '48px 48px, 96px 96px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Clean unboxed metadata kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#FFD000]">
              <span className="w-2 h-2 rounded-full bg-[#FFD000] animate-pulse" />
              <span>Abuja, FCT, Nigeria</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Official Player Intake 2026</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>FIFA Connect & TMS Aligned</span>
            </div>

            {/* Bold Motto Headline */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.08] break-words" style={{ textWrap: 'balance' }}>
              Discover. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD000] via-[#FFE27A] to-[#FFC72C]">
                Develop.
              </span> <br />
              Promote.
            </h1>

            {/* Clear, concrete sub-headline */}
            <p className="max-w-2xl text-base sm:text-lg text-neutral-300 leading-relaxed mx-auto lg:mx-0">
              Edoh Sport Academy is Abuja’s premier football institution engineered to identify raw talent, forge elite tactical discipline, and secure verified domestic and international scouting pathways in full compliance with FCT FA, NFF, and FIFA Connect standards.
            </p>

            {/* Dual CTAs for Minor and Senior */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center lg:justify-start">
              <button
                onClick={() => handleScrollToPortal('minor')}
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-black bg-[#FFD000] hover:bg-[#E6BC00] rounded-xl shadow-[0_0_24px_rgba(255,208,0,0.3)] hover:shadow-[0_0_32px_rgba(255,208,0,0.45)] transition-all flex items-center justify-center gap-2 group whitespace-nowrap"
              >
                <span>Enroll as Youth (Under 18)</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={() => handleScrollToPortal('senior')}
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-white hover:text-[#FFD000] bg-[#161616] hover:bg-[#1E1E1E] border border-[#3A331A] hover:border-[#FFD000]/60 rounded-xl transition-all flex items-center justify-center gap-2 group whitespace-nowrap"
              >
                <span>Join Senior Squad (18+)</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Statutory Trust Bar (No Pills, clean hairline layout) */}
            <div className="pt-6 border-t border-[#3A331A]/40 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FFD000]" />
                <span>FCT FA Sanctioned</span>
              </div>
              <span aria-hidden="true" className="text-neutral-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-[#FFD000]" />
                <span>NFF Player Registry</span>
              </div>
              <span aria-hidden="true" className="text-neutral-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#FFD000]" />
                <span>FIFA TMS International Passport</span>
              </div>
            </div>

          </div>

          {/* Right Column: Marquee Visual Shield & Tactical Pitch Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Golden Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#FFD000]/30 via-transparent to-[#FFD000]/10 rounded-3xl blur-xl" />

              {/* Main Athletic Showcase Card */}
              <div className="relative rounded-2xl bg-[#141414] border border-[#3A331A] p-4 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl overflow-hidden">
                
                {/* Crest Lockup */}
                <div className="flex items-center justify-between border-b border-[#2A2413] pb-5">
                  <div className="flex items-center gap-3">
                    <CrestLogo size="lg" showText={false} />
                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest text-[#FFD000]">
                        Official Crest
                      </div>
                      <div className="font-display font-bold text-white text-lg">
                        Edoh Sport Academy
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] font-mono text-neutral-500">HEADQUARTERS</div>
                    <div className="text-xs font-semibold text-neutral-300">Abuja, Nigeria</div>
                  </div>
                </div>

                {/* Tactical Pitch Illustration */}
                <div className="relative rounded-xl bg-[#0A0A0A] border border-[#2A2413] p-4 overflow-hidden">
                  <div className="absolute inset-0 opacity-15">
                    {/* SVG Pitch Markings */}
                    <svg className="w-full h-full" viewBox="0 0 300 200" fill="none" stroke="#FFD000" strokeWidth="1.2">
                      <rect x="15" y="10" width="270" height="180" rx="4" />
                      <line x1="150" y1="10" x2="150" y2="190" />
                      <circle cx="150" cy="100" r="35" />
                      <rect x="15" y="55" width="45" height="90" />
                      <rect x="240" y="55" width="45" height="90" />
                      <circle cx="150" cy="100" r="3" fill="#FFD000" />
                    </svg>
                  </div>

                  <div className="relative space-y-3 z-10 py-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400 font-mono">FORMATION PATHWAY</span>
                      <span className="text-[#FFD000] font-semibold">4-3-3 Modern Tactical</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-[#181818] p-2.5 rounded-lg border border-[#2D2817]">
                        <div className="text-neutral-400 text-[10px] uppercase font-mono">Youth Intake</div>
                        <div className="font-bold text-white">U10, U13, U15, U17</div>
                        <div className="text-[11px] text-[#FFD000] mt-0.5">Foundational Mastery</div>
                      </div>
                      <div className="bg-[#181818] p-2.5 rounded-lg border border-[#2D2817]">
                        <div className="text-neutral-400 text-[10px] uppercase font-mono">Senior Squad</div>
                        <div className="font-bold text-white">Age 18+ First Team</div>
                        <div className="text-[11px] text-[#FFD000] mt-0.5">Scouting & Pro Contracts</div>
                      </div>
                    </div>

                    <div className="text-[11px] text-neutral-400 leading-snug">
                      Professional UEFA/CAF licensed technical training, athletic conditioning, video analysis, and FIFA Connect registration.
                    </div>
                  </div>
                </div>

                {/* Facilities & Address Teaser */}
                <div className="bg-[#181818]/90 rounded-xl p-3.5 border border-[#2C2715] flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-neutral-400">Academy Training Base</div>
                    <div className="font-semibold text-neutral-200">Mabushi & Jahi District, Abuja</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-emerald-400 font-semibold">IN SESSION</div>
                    <div className="text-[11px] text-neutral-400">Season 2026</div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
