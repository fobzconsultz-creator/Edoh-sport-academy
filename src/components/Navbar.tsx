import React, { useState } from 'react';
import { Menu, X, Search, ArrowRight, ChevronDown, Compass, Shield, HelpCircle, Users, Trophy } from 'lucide-react';
import { CrestLogo } from './CrestLogo';

interface NavbarProps {
  onOpenLookup: () => void;
  onSelectPathway?: (pathway: 'minor' | 'senior') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLookup }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegisterClick = () => {
    scrollToSection('registration-portal');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#3A331A]/60 bg-[#0A0A0A]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Zone 1: Single element wordmark with official crest */}
          <a
            href="#"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD000] rounded-lg min-w-0 shrink-0"
          >
            <CrestLogo size="md" />
          </a>

          {/* Zone 2 & 3: Header Menu directly beside Verify Slip & Action */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            
            {/* 1. About Us -> Philosophy & Institutional Charter section */}
            <button
              onClick={() => scrollToSection('about')}
              className="px-3 py-2 text-xs lg:text-sm font-semibold text-neutral-300 hover:text-[#FFD000] hover:bg-[#161616] rounded-lg transition-colors whitespace-nowrap"
              title="Philosophy & Institutional Charter"
            >
              About Us
            </button>

            {/* 2. Pathways -> Divisions & Training Regimes Section */}
            <button
              onClick={() => scrollToSection('programs')}
              className="px-3 py-2 text-xs lg:text-sm font-semibold text-neutral-300 hover:text-[#FFD000] hover:bg-[#161616] rounded-lg transition-colors whitespace-nowrap"
              title="Divisions & Training Regimes"
            >
              Pathways
            </button>

            {/* 3. Regulations -> Regulatory Constitution & Statutes */}
            <button
              onClick={() => scrollToSection('statutory-rules')}
              className="px-3 py-2 text-xs lg:text-sm font-semibold text-neutral-300 hover:text-[#FFD000] hover:bg-[#161616] rounded-lg transition-colors whitespace-nowrap"
              title="Regulatory Constitution & Statutes"
            >
              Regulations
            </button>

            {/* 4. FAQS -> Frequently Asked Questions Section */}
            <button
              onClick={() => scrollToSection('faq')}
              className="px-3 py-2 text-xs lg:text-sm font-semibold text-neutral-300 hover:text-[#FFD000] hover:bg-[#161616] rounded-lg transition-colors whitespace-nowrap"
              title="Frequently Asked Questions"
            >
              FAQS
            </button>

            {/* Vertical hairline divider */}
            <div className="h-5 w-[1px] bg-[#3A331A] mx-1" />

            {/* Verify Slip Button */}
            <button
              onClick={onOpenLookup}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-[#161616] hover:bg-[#222] border border-[#3A331A] hover:border-[#FFD000]/60 rounded-lg transition-colors whitespace-nowrap shadow-sm"
              title="Verify registration certificate or search player status"
            >
              <Search className="w-3.5 h-3.5 text-[#FFD000]" />
              <span>Verify Slip</span>
            </button>

            {/* Primary Action: Register Now */}
            <button
              onClick={handleRegisterClick}
              className="inline-flex items-center gap-2 px-4 lg:px-5 py-2 text-xs font-bold text-black bg-[#FFD000] hover:bg-[#E6BC00] rounded-lg shadow-[0_0_20px_rgba(255,208,0,0.25)] transition-all whitespace-nowrap"
            >
              <span>Register Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Actions: Verify Slip + Mobile Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenLookup}
              aria-label="Verify player slip"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-neutral-300 hover:text-[#FFD000] bg-[#161616] rounded-lg border border-[#3A331A]"
            >
              <Search className="w-3.5 h-3.5 text-[#FFD000]" />
              <span className="text-[11px]">Verify</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#3A331A] bg-[#0E0E0E] px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1.5 text-sm font-medium">
            
            {/* 1. About Us */}
            <button
              onClick={() => scrollToSection('about')}
              className="text-left px-3.5 py-2.5 text-neutral-200 hover:text-[#FFD000] hover:bg-[#161616] rounded-lg transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-white block">About Us</span>
                <span className="text-[11px] text-neutral-400 block">Philosophy & Institutional Charter</span>
              </div>
              <Compass className="w-4 h-4 text-[#FFD000]" />
            </button>

            {/* 2. Pathways */}
            <button
              onClick={() => scrollToSection('programs')}
              className="text-left px-3.5 py-2.5 text-neutral-200 hover:text-[#FFD000] hover:bg-[#161616] rounded-lg transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-white block">Pathways</span>
                <span className="text-[11px] text-neutral-400 block">Divisions & Training Regimes</span>
              </div>
              <Users className="w-4 h-4 text-[#FFD000]" />
            </button>

            {/* Success Stories */}
            <button
              onClick={() => scrollToSection('success-stories')}
              className="text-left px-3.5 py-2.5 text-neutral-200 hover:text-[#FFD000] hover:bg-[#161616] rounded-lg transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-white block">Success Stories</span>
                <span className="text-[11px] text-neutral-400 block">Pro Club & European Transitions</span>
              </div>
              <Trophy className="w-4 h-4 text-[#FFD000]" />
            </button>

            {/* 3. Regulations */}
            <button
              onClick={() => scrollToSection('statutory-rules')}
              className="text-left px-3.5 py-2.5 text-neutral-200 hover:text-[#FFD000] hover:bg-[#161616] rounded-lg transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-white block">Regulations</span>
                <span className="text-[11px] text-neutral-400 block">Regulatory Constitution & Statutes</span>
              </div>
              <Shield className="w-4 h-4 text-[#FFD000]" />
            </button>

            {/* 4. FAQS */}
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left px-3.5 py-2.5 text-neutral-200 hover:text-[#FFD000] hover:bg-[#161616] rounded-lg transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-white block">FAQS</span>
                <span className="text-[11px] text-neutral-400 block">Frequently Asked Questions (Trials & Tuition)</span>
              </div>
              <HelpCircle className="w-4 h-4 text-[#FFD000]" />
            </button>

            {/* Contact */}
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left px-3.5 py-2 text-neutral-400 hover:text-[#FFD000] hover:bg-[#161616] rounded-lg transition-colors text-xs"
            >
              Contact & Location
            </button>
          </div>

          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLookup();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-200 bg-[#1A1A1A] border border-[#3A331A] rounded-lg"
            >
              <Search className="w-3.5 h-3.5 text-[#FFD000]" />
              Verify Registration Slip
            </button>
            <button
              onClick={handleRegisterClick}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-black bg-[#FFD000] rounded-lg"
            >
              <span>Register Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
