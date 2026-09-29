import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Award,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Trophy,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

interface GraduateStory {
  id: string;
  name: string;
  position: string;
  academyCohort: string;
  currentClub: string;
  league: string;
  country: string;
  flagEmoji: string;
  transferType: string;
  fifaStatus: string;
  photoUrl: string;
  quote: string;
  stats: { label: string; value: string }[];
  scoutYear: string;
}

const GRADUATE_STORIES: GraduateStory[] = [
  {
    id: 'emmanuel-chukwueze',
    name: 'Emmanuel Chukwueze',
    position: 'Right Winger / Forward',
    academyCohort: 'Edoh Academy U-17 Elite (Class of 2022)',
    currentClub: 'K.A.S. Eupen',
    league: 'Challenger Pro League',
    country: 'Belgium',
    flagEmoji: '🇧🇪',
    transferType: 'Direct FCT FA & FIFA Connect International Transfer',
    fifaStatus: 'TMS Verified & Cleared',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    quote:
      'Edoh Sport Academy didn’t just teach me how to beat fullbacks 1v1; they forged my tactical discipline, mental stamina, and professional work rate. The legal safeguarding and FIFA Connect documentation ensured my transfer to Europe was completely transparent, protected, and swift.',
    stats: [
      { label: 'Pro Appearances', value: '26' },
      { label: 'Goals & Assists', value: '11' },
      { label: 'National Youth', value: 'Nigeria U-20' },
    ],
    scoutYear: '2024 International Window',
  },
  {
    id: 'victor-oladipo',
    name: 'Victor Oladipo',
    position: 'Box-to-Box Midfielder (No. 8)',
    academyCohort: 'Senior Squad Elite Pathway (Class of 2021)',
    currentClub: 'Sporting Clube da Covilhã',
    league: 'Liga Portugal',
    country: 'Portugal',
    flagEmoji: '🇵🇹',
    transferType: 'Abuja International Showcase Scouting Signee',
    fifaStatus: 'European Federation Cleared',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    quote:
      'The high-intensity 4-3-3 tactical pressing drills we ran on the Mabushi pitch gave me an immense competitive advantage. When Portuguese scouts evaluated me in Abuja, I was already conditioned for European game tempo and defensive balance.',
    stats: [
      { label: 'First Team Starts', value: '34' },
      { label: 'Pass Completion', value: '88%' },
      { label: 'Key Tackles/Game', value: '3.4' },
    ],
    scoutYear: '2023 Summer Window',
  },
  {
    id: 'chinedu-aliyu',
    name: 'Chinedu Aliyu',
    position: 'Central Defender',
    academyCohort: 'Edoh Youth Academy U-17 Captain (Class of 2023)',
    currentClub: 'Enyimba International FC',
    league: 'Nigeria Premier Football League (NPFL)',
    country: 'Nigeria',
    flagEmoji: '🇳🇬',
    transferType: 'Domestic NFF Youth Transfer Clearance',
    fifaStatus: 'NFF Domestic Pass Active',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    quote:
      'The statutory protection at Edoh Academy is unlike any grassroots setup in Nigeria. As a minor, my parents had total peace of mind because every clause was formalized legally. That security let me concentrate 100% on defending.',
    stats: [
      { label: 'NPFL Clean Sheets', value: '12' },
      { label: 'CAF Confed Cup', value: 'Debut' },
      { label: 'Aerial Duels Won', value: '79%' },
    ],
    scoutYear: '2023 Domestic Draft',
  },
  {
    id: 'tobi-adeyemi',
    name: 'Tobi Adeyemi',
    position: 'Defensive Midfielder (No. 6)',
    academyCohort: 'Senior First Team Trainee (Class of 2023)',
    currentClub: 'IK Sirius Fotboll',
    league: 'Allsvenskan',
    country: 'Sweden',
    flagEmoji: '🇸🇪',
    transferType: 'Scandinavia Professional Scouting Trial',
    fifaStatus: 'FIFA Connect TMS Cleared',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80',
    quote:
      'From tactical video analysis to physical conditioning and statutory nutrition guidelines, Edoh operates like a European academy in Abuja. Arriving in Sweden for sub-zero pre-season, I felt completely prepared mentally and technically.',
    stats: [
      { label: 'Top-Flight Matches', value: '19' },
      { label: 'Interceptions', value: '64' },
      { label: 'Award', value: 'Young Player Nom.' },
    ],
    scoutYear: '2024 Scandinavian Intake',
  },
  {
    id: 'ibrahim-musa',
    name: 'Ibrahim Musa',
    position: 'Attacking Playmaker (No. 10)',
    academyCohort: 'Edoh Academy U-15 to U-17 Graduate (Class of 2022)',
    currentClub: 'Pyramids FC',
    league: 'Egyptian Premier League',
    country: 'Egypt',
    flagEmoji: '🇪🇬',
    transferType: 'North Africa Scouting Direct Purchase',
    fifaStatus: 'CAF Champions League Registered',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    quote:
      'I enrolled at Edoh Sport Academy at age 14. The technical coaches refined my first touch, half-turn, and line-breaking passes. Today playing in the CAF Champions League, I credit everything to the foundational discipline established in Abuja.',
    stats: [
      { label: 'CAF CL Matches', value: '8' },
      { label: 'Assists in Debut Yr', value: '7' },
      { label: 'Chance Creation', value: '2.8/90' },
    ],
    scoutYear: '2023 Continental Transfer',
  },
];

export const SuccessStoriesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [photoErrors, setPhotoErrors] = useState<{ [key: string]: boolean }>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = GRADUATE_STORIES.length;
  const current = GRADUATE_STORIES[currentIndex];

  // Auto-play carousel transition every 6 seconds unless paused
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % total);
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, total]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleSelect = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section
      id="success-stories"
      className="py-20 md:py-28 border-b border-[#3A331A]/60 bg-[#0B0B0B] relative overflow-hidden"
    >
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FFD000]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFD000]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2A2413] pb-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#FFD000]">
              <Trophy className="w-4 h-4 text-[#FFD000]" />
              <span>Proven Pathway & Professional Transitions</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Academy Success Stories
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Explore the journeys of Edoh Sport Academy graduates who mastered our curriculum in Abuja and transitioned into professional contracts across European leagues, the NPFL, and international tournaments.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-400">
              <strong className="text-[#FFD000] text-sm">{String(currentIndex + 1).padStart(2, '0')}</strong>
              {' / '}
              {String(total).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl bg-[#141414] hover:bg-[#202020] border border-[#3A331A] hover:border-[#FFD000] text-neutral-300 hover:text-[#FFD000] flex items-center justify-center transition-colors shadow-md"
                aria-label="Previous success story"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-[#141414] hover:bg-[#202020] border border-[#3A331A] hover:border-[#FFD000] text-neutral-300 hover:text-[#FFD000] flex items-center justify-center transition-colors shadow-md"
                aria-label="Next success story"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Showcase Card with Sleek Transitions */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-3xl bg-[#131313] border border-[#3A331A] shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          {/* Top Progress Line */}
          <div className="h-1 bg-[#1A1A1A] w-full">
            <div
              className="h-full bg-[#FFD000] transition-all duration-500 ease-out"
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            />
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Graduate Portrait & Official Player Card */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-sm">
                  
                  {/* Subtle Golden Halo */}
                  <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#FFD000]/30 to-[#FFD000]/5 rounded-2xl blur-lg" />
                  
                  <div className="relative rounded-2xl bg-[#0D0D0D] border-2 border-[#FFD000]/50 overflow-hidden shadow-2xl">
                    {/* Athlete Photo with 3:4 Aspect Ratio */}
                    <div className="w-full aspect-[3/4] bg-[#181818] relative overflow-hidden">
                      {!photoErrors[current.id] ? (
                        <img
                          src={current.photoUrl}
                          alt={current.name}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setPhotoErrors((prev) => ({ ...prev, [current.id]: true }))
                          }
                          className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 p-6 text-center">
                          <Trophy className="w-16 h-16 text-[#FFD000] opacity-40 mb-2" />
                          <span className="font-display font-bold text-white text-lg">{current.name}</span>
                          <span className="text-xs text-[#FFD000] mt-1">{current.currentClub}</span>
                        </div>
                      )}

                      {/* Flag Badge & Current League */}
                      <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-700 flex items-center gap-2 text-xs font-mono text-white shadow-lg">
                        <span>{current.flagEmoji}</span>
                        <span className="font-semibold">{current.country}</span>
                      </div>

                      {/* Verified Transfer Status Tag */}
                      <div className="absolute top-3 right-3 bg-[#1C1808]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#FFD000]/60 flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#FFD000] shadow-lg">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD000]" />
                        <span>PRO GRADUATE</span>
                      </div>

                      {/* Bottom Player Overlay Bar */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 text-left">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#FFD000]">
                          {current.position}
                        </div>
                        <div className="font-display font-black text-xl text-white">
                          {current.name}
                        </div>
                        <div className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5 mt-0.5">
                          <span>{current.currentClub}</span>
                          <span className="text-[#FFD000]">·</span>
                          <span className="text-neutral-400">{current.league}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Metadata Band */}
                    <div className="p-3.5 bg-[#141414] border-t border-[#2A2413] flex items-center justify-between text-[11px] font-mono">
                      <span className="text-neutral-400">FIFA STATUS:</span>
                      <span className="text-[#FFD000] font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {current.fifaStatus}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Cohort Tag */}
                <div className="text-center mt-3">
                  <span className="text-xs font-mono text-neutral-400">
                    Pathway: <strong className="text-neutral-200">{current.academyCohort}</strong>
                  </span>
                </div>
              </div>

              {/* Right Column: Quote, Transition Details & Performance Metrics */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Quote Block with Decorative Gold Watermark */}
                <div className="relative bg-[#0E0E0E] border border-[#2D2615] rounded-2xl p-6 sm:p-8 space-y-4">
                  <Quote className="w-8 h-8 text-[#FFD000]/30 absolute top-5 right-5" />
                  
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FFD000] uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Graduation Testimonial</span>
                  </div>

                  <blockquote className="text-base sm:text-lg lg:text-xl text-white font-medium italic leading-relaxed">
                    “{current.quote}”
                  </blockquote>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#221B0F] text-xs">
                    <div>
                      <span className="font-bold text-white block">{current.name}</span>
                      <span className="text-neutral-400 font-mono text-[11px]">
                        {current.position} · {current.currentClub}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#FFD000] bg-[#1E1909] px-2.5 py-1 rounded border border-[#3E3314]">
                      {current.scoutYear}
                    </span>
                  </div>
                </div>

                {/* Performance Metrics Stats Grid */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                    Key Performance & Career Milestones
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {current.stats.map((stat, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-[#171717] border border-[#2C2719] text-center space-y-1"
                      >
                        <div className="font-display font-extrabold text-xl sm:text-2xl text-[#FFD000]">
                          {stat.value}
                        </div>
                        <div className="text-[10px] sm:text-xs font-mono text-neutral-300 uppercase">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Transfer Pathway Banner */}
                <div className="p-4 rounded-xl bg-[#17150E] border border-[#3E3314] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#27200E] border border-[#4F4118] flex items-center justify-center text-[#FFD000] shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-neutral-400 text-[10px] font-mono uppercase">
                        Scouting & Contract Clearance
                      </div>
                      <div className="font-semibold text-white">
                        {current.transferType}
                      </div>
                    </div>
                  </div>

                  <a
                    href="#registration-portal"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD000] hover:text-white transition-colors shrink-0"
                  >
                    <span>Follow This Pathway</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Thumbnail Selector Strip / Quick Jump */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {GRADUATE_STORIES.map((story, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={story.id}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#1C180E] border-[#FFD000] shadow-[0_0_20px_rgba(255,208,0,0.15)] ring-1 ring-[#FFD000]'
                    : 'bg-[#121212] border-[#292212] hover:border-[#3E341B] opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-base">{story.flagEmoji}</span>
                  <span className="text-[10px] font-mono uppercase text-[#FFD000] font-bold truncate">
                    {story.country}
                  </span>
                </div>
                <div className="font-display font-bold text-xs sm:text-sm text-white truncate">
                  {story.name}
                </div>
                <div className="text-[11px] text-neutral-400 truncate">
                  {story.currentClub}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#17140B] via-[#1A180E] to-[#121212] border border-[#3A331A] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-white text-base">
              Are you the next graduate to secure an international trial?
            </h4>
            <p className="text-xs text-neutral-300">
              Registrations are now open for the 2026 intake across Youth (U10–U17) and Senior squads in Abuja.
            </p>
          </div>
          <a
            href="#registration-portal"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-black bg-[#FFD000] hover:bg-[#E6BC00] rounded-xl shadow-lg transition-all shrink-0"
          >
            <span>Begin Player Registration</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
