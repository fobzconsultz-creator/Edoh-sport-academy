import React from 'react';
import { ShieldCheck, Heart, Lock, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { CrestLogo } from './CrestLogo';

interface FooterProps {
  onOpenAdmin?: () => void;
}

const SOCIAL_CHANNELS = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/edohsportacademy',
    icon: Instagram,
    ariaLabel: 'Follow Edoh Sport Academy on Instagram',
  },
  {
    name: 'Twitter / X',
    url: 'https://x.com/edohsportacademy',
    icon: Twitter,
    ariaLabel: 'Follow Edoh Sport Academy on Twitter/X',
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/edohsportacademy',
    icon: Facebook,
    ariaLabel: 'Connect with Edoh Sport Academy on Facebook',
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@edohsportacademy',
    icon: Youtube,
    ariaLabel: 'Subscribe to Edoh Sport Academy on YouTube',
  },
];

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
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

            {/* Official Social Media Channels */}
            <div className="pt-2 space-y-2">
              <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider font-semibold">
                Official Academy Media
              </div>
              <div className="flex items-center gap-2.5">
                {SOCIAL_CHANNELS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-[#141414] hover:bg-[#1E190A] border border-[#2F2716] hover:border-[#FFD000] text-neutral-400 hover:text-[#FFD000] flex items-center justify-center transition-all shadow-sm group"
                      aria-label={item.ariaLabel}
                      title={item.name}
                    >
                      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    </a>
                  );
                })}
              </div>
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

          <div className="flex items-center gap-4">
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="hover:text-[#FFD000] text-neutral-500 transition-colors flex items-center gap-1.5"
              >
                <Lock className="w-3 h-3 text-[#FFD000]" />
                <span>Board Secretariat</span>
              </button>
            )}
            <span>·</span>
            <span>&copy; {new Date().getFullYear()} Edoh Sport Academy. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
