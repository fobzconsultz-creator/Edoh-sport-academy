import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  Calendar,
  CreditCard,
  Clock,
  FileCheck,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'trials' | 'tuition' | 'schedule' | 'eligibility';
  question: string;
  answer: string;
  tag: string;
}

const FAQ_DATA: FAQItem[] = [
  // 1. Academy Trial Dates & Scouting
  {
    id: 'trial-dates',
    category: 'trials',
    tag: 'Trial Dates 2026',
    question: 'When are the 2026 academy trials and scouting open days held?',
    answer:
      'Official intake trials for the 2026 Season are conducted quarterly in Abuja. The upcoming trial windows are:\n\n• First Quarter Open Trials: April 10 – April 14, 2026\n• Mid-Year Elite Invitational Trials: July 22 – July 26, 2026\n• End-of-Season International Scouting Showcase: November 18 – November 22, 2026\n\nAll registered applicants receive an official SMS notification and email confirmation with their assigned reporting day and pitch slot at the Mabushi/Jahi training base.',
  },
  {
    id: 'trial-requirements',
    category: 'trials',
    tag: 'Trial Gear & Protocol',
    question: 'What do players need to bring to the trial screening?',
    answer:
      'Players invited for screening must bring:\n\n1. Printed Edoh Sport Academy Registration Slip (containing your unique ESA/YTH or ESA/SNR code).\n2. Standard football boots (moulded studs or SG depending on pitch conditions) and shin guards.\n3. Plain white socks and black training shorts (bibs are provided on-site).\n4. Original NIN slip or birth certificate, plus a valid student ID card for youth candidates.\n5. Personal hydration and energy snacks for pre- and post-session recovery.',
  },
  {
    id: 'scouting-network',
    category: 'trials',
    tag: 'Scouting Pathways',
    question: 'Are professional scouts and agents present during trials?',
    answer:
      'Yes. Edoh Sport Academy coordinates official trial showcases with accredited FCT FA scouts, NPFL/NNL domestic league technical directors, and licensed FIFA Match Agents from Europe, North Africa, and the Middle East. High-performing players are shortlisted for the Elite Cadet Pool or direct senior squad placements.',
  },

  // 2. Tuition & Fees
  {
    id: 'tuition-fees',
    category: 'tuition',
    tag: 'Tuition & Kit Package',
    question: 'What is the tuition fee structure for the Youth and Senior programs?',
    answer:
      'Edoh Sport Academy maintains transparent, subsidized athletic development tariffs:\n\n• Youth Intake (U-10 to U-17): A one-time annual registration and insurance fee covers the official Academy Training & Match Kit Package (2 jerseys, shorts, stockings, training bibs, and water bottle), alongside FCT FA player registration.\n• Senior Squad (Age 18+): Trainee and Free Agent registrations are evaluated on merit. Athletes selected for the First Team squad receive training compensation, match bonuses, and full institutional coverage without monthly tuition charges.\n\nDetailed breakdown invoices are provided upon physical verification at our Mabushi Secretariat.',
  },
  {
    id: 'scholarships',
    category: 'tuition',
    tag: 'Talent Scholarships',
    question: 'Does the Academy offer scholarships for exceptional grassroots talents?',
    answer:
      'Yes. Through the Edoh Talent Discovery Foundation, we award full athletic tuition waivers and kit grants to exceptional grassroots players from underprivileged backgrounds. Beneficiaries must demonstrate exemplary football acumen, team discipline, and maintain satisfactory academic school grades.',
  },
  {
    id: 'refund-policy',
    category: 'tuition',
    tag: 'Financial Terms',
    question: 'What is the fee payment schedule and refund policy?',
    answer:
      'Tuition fees may be settled per school term or as a discounted annual package via certified bank transfer to the official Academy corporate account. Fees are non-refundable once the official training kit is customized and the player has been biometrically registered onto the FCT FA clearinghouse.',
  },

  // 3. Training Schedules & Facilities
  {
    id: 'training-schedule',
    category: 'schedule',
    tag: 'Session Timetable',
    question: 'What is the weekly training schedule for each age division?',
    answer:
      'Our training sessions are designed so education is never compromised:\n\n• Youth Division (U-10 & U-13): Saturday mornings from 07:30 AM to 09:30 AM.\n• Intermediate Cadets (U-15 & U-17): Tuesday and Thursday afternoons (04:00 PM – 06:00 PM) & Saturday mornings (07:00 AM – 09:30 AM).\n• Senior Squad (18+): Tuesday, Thursday, and Saturday mornings (06:30 AM – 09:00 AM), with tactical video analysis every Wednesday at 04:30 PM.\n\nSunday is an official rest and recovery day for all divisions.',
  },
  {
    id: 'pitch-locations',
    category: 'schedule',
    tag: 'Pitch Locations',
    question: 'Where do training sessions and home matches take place?',
    answer:
      'Administrative coordination is housed at Shop 237, Block B, Mabushi Ultra Modern Market, Jahi, Abuja. Field training takes place at our designated grass and modern turf facilities located within the Mabushi and Jahi sporting axis in Abuja, with floodlit pitches for evening tactical sessions.',
  },
  {
    id: 'school-coordination',
    category: 'schedule',
    tag: 'Academic Priority',
    question: 'How does the Academy ensure youth players balance training with academics?',
    answer:
      'Academic progress is an inviolable requirement of our statutory charter (Clause 3). Training schedules strictly accommodate school hours, exams, and academic study periods. Players who fail to maintain passing grades are provided academic counseling and temporary training adjustments until performance recovers.',
  },

  // 4. Eligibility & Lodging
  {
    id: 'out-of-abuja',
    category: 'eligibility',
    tag: 'Out-of-State Trainees',
    question: 'Can players residing outside Abuja register and attend?',
    answer:
      'Yes. Talents from all 36 Nigerian states and international applicants are welcome. For out-of-Abuja players participating in week-long trial camps or tournament showcases, the Academy coordinates safe, supervised hostel boarding arrangements within the Jahi and Mabushi district upon prior booking.',
  },
  {
    id: 'transfer-clearance',
    category: 'eligibility',
    tag: 'Transfer Clearance',
    question: 'Do players from other academies require clearance letters?',
    answer:
      'Yes. In accordance with NFF and FIFA Regulations on the Status and Transfer of Players (RSTP), any athlete previously registered with another affiliated club or academy must submit an official release letter or clearance certificate to prevent multi-registration conflicts on the FIFA Connect portal.',
  },
];

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openAccordionId, setOpenAccordionId] = useState<string | null>('trial-dates');

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesQuery =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'trials', label: 'Trials & Scouting' },
    { id: 'tuition', label: 'Tuition & Fees' },
    { id: 'schedule', label: 'Training Schedules' },
    { id: 'eligibility', label: 'Eligibility & Travel' },
  ];

  const scrollToRegistration = () => {
    const el = document.getElementById('registration-portal');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="faq" className="py-20 md:py-28 border-b border-[#3A331A]/60 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-[#FFD000]">
            Frequently Asked Questions
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Trial Dates, Tuition & Schedules
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg">
            Essential guidelines for prospective athletes, parents, and guardians regarding 2026 intake screening, fee structures, and pitch timetables in Abuja.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions by keyword (e.g. trial dates, tuition, kit, timetable)..."
              className="w-full pl-12 pr-4 py-3.5 bg-[#141414] border border-[#3A331A] rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFD000] transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#FFD000] text-black shadow-md'
                    : 'bg-[#141414] text-neutral-400 hover:text-white border border-[#2D2817]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* FAQs Accordion */}
        <div className="max-w-4xl mx-auto space-y-3">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item) => {
              const isOpen = openAccordionId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? 'bg-[#161616] border-[#FFD000]/60 shadow-[0_0_20px_rgba(255,208,0,0.08)]'
                      : 'bg-[#121212] border-[#292314] hover:border-[#3A331A]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full p-5 text-left flex items-start justify-between gap-4 focus:outline-none"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase bg-[#241F10] text-[#FFD000] px-2 py-0.5 rounded border border-[#443812]">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-white text-base sm:text-lg pt-1">
                        {item.question}
                      </h3>
                    </div>

                    <div className="p-2 rounded-lg bg-[#1C1C1C] text-neutral-300 shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#FFD000]" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-[#231E12] text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-line bg-[#0E0E0E] rounded-b-2xl">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 rounded-2xl bg-[#141414] border border-[#2B2513] text-center space-y-2">
              <HelpCircle className="w-8 h-8 text-[#FFD000] mx-auto opacity-70" />
              <div className="font-bold text-white text-sm">No matching questions found</div>
              <p className="text-xs text-neutral-400">
                Try searching with different terms or select "All Questions".
              </p>
            </div>
          )}
        </div>

        {/* Secretariat Helpline / Quick CTA Box */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-[#1A1810] via-[#141414] to-[#1A1810] border border-[#3A331A] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="text-xs font-mono font-bold text-[#FFD000] uppercase">
              Need Personal Assistance?
            </div>
            <h4 className="font-display text-xl font-bold text-white">
              Speak With Our Academy Admission Coordinator
            </h4>
            <p className="text-xs text-neutral-300 max-w-lg">
              Our scouting secretariat in Mabushi Market is open Monday through Saturday to answer specific questions regarding age verification, group fees, and trial clearances.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="https://wa.me/2349118006169?text=Hello%20Edoh%20Sport%20Academy,%20I%20have%20questions%20regarding%20Trials,%20Tuition,%20and%20Training%20Schedules"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-black bg-[#FFD000] hover:bg-[#E6BC00] rounded-xl shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Coordinator</span>
            </a>

            <button
              onClick={scrollToRegistration}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-white hover:text-[#FFD000] bg-[#1F1F1F] hover:bg-[#282828] border border-[#3A331A] rounded-xl transition-all"
            >
              <span>Go to Registration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
