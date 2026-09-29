import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { CrestLogo } from './CrestLogo';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070707] border-t border-[#3A331A]/60 pt-16 pb-12 text-neutral-400 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <CrestLogo size="md" />
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Edoh Sport Academy is an accredited football institution located in Abuja, Nigeria. Dedicated to discovering grassroots football genius, developing world-class technical tactical athletes, and promoting players to domestic and global professional leagues.
            </p>
            <div className="text-xs font-mono font-bold text-[#FFD000] tracking-widest uppercase">
              DISCOVER • DEVELOP • PROMOTE
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-white uppercase font-bold tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('home')} className="hover:text-[#FFD000] transition-colors">
                  Academy Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-[#FFD000] transition-colors">
                  About & Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('programs')} className="hover:text-[#FFD000] transition-colors">
                  Youth & Senior Programs
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('success-stories')} className="hover:text-[#FFD000] transition-colors">
                  Success Stories & Alumni
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('statutory-rules')} className="hover:text-[#FFD000] transition-colors">
                  9 Statutory Clauses
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('faq')} className="hover:text-[#FFD000] transition-colors">
                  FAQ & Trial Dates
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('registration-portal')} className="hover:text-[#FFD000] transition-colors">
                  Player Registration
                </button>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-white uppercase font-bold tracking-wider">
              Intake Divisions
            </div>
            <ul className="space-y-2 text-xs">
              <li className="text-neutral-300">Under-10 Foundation Academy</li>
              <li className="text-neutral-300">Under-13 Development Squad</li>
              <li className="text-neutral-300">Under-15 Junior League</li>
              <li className="text-neutral-300">Under-17 Elite Cadets</li>
              <li className="text-[#FFD000] font-semibold">Senior Squad (18+ / First Team)</li>
            </ul>
          </div>

          {/* Institutional Contact */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-white uppercase font-bold tracking-wider">
              Abuja Secretariat
            </div>
            <div className="text-xs space-y-1.5 text-neutral-300">
              <p>Shop 237, Block B, Mabushi Ultra Modern Market, Jahi, Abuja, Nigeria</p>
              <p className="pt-1 text-[#FFD000]">+234 911 800 6169</p>
              <p className="text-[#FFD000]">+234 706 702 6825</p>
              <p className="text-neutral-400">edohsportacademy@gmail.com</p>
            </div>
          </div>

        </div>

        {/* Accreditation Bar */}
        <div className="pt-8 border-t border-[#221C0E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-[#FFD000]" />
              <span>FCT Football Association Affiliated</span>
            </div>
            <span>·</span>
            <span>NFF Domestic League Player Clearinghouse</span>
            <span>·</span>
            <span>FIFA Connect RSTP Standards</span>
          </div>

          <div>
            &copy; {new Date().getFullYear()} Edoh Sport Academy. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
