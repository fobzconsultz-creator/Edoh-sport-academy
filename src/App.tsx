import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProgramsSection } from './components/ProgramsSection';
import { SuccessStoriesSection } from './components/SuccessStoriesSection';
import { RulesSection } from './components/RulesSection';
import { RegistrationPortal } from './components/RegistrationPortal';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SuccessReceiptModal } from './components/SuccessReceiptModal';
import { RegistrationLookupModal } from './components/RegistrationLookupModal';
import { RegistrationRecord, RegistrationPathway } from './types';

// Pre-seeded authentic demo registrations for Abuja players
const INITIAL_DEMO_RECORDS: RegistrationRecord[] = [
  {
    regId: 'ESA/YTH/2026/1042',
    type: 'minor',
    fullName: 'Chidubem David Okoye',
    dateOfBirth: '2011-04-18',
    age: 15,
    gender: 'Male',
    categoryOrStatus: 'Youth Under-15',
    phone: '+234 911 800 6169',
    email: 'okoye.family@example.com',
    primaryPosition: 'AM',
    photoUrl: '',
    submittedAt: '12/03/2026, 09:24:10',
    verificationHash: 'ESA-OKO9214-FCT26',
    data: {} as any,
  },
  {
    regId: 'ESA/SNR/2026/8931',
    type: 'senior',
    fullName: 'Ibrahim Musa Mohammed',
    dateOfBirth: '2004-09-12',
    age: 21,
    gender: 'Male',
    categoryOrStatus: 'Senior (Free Agent)',
    phone: '+234 706 702 6825',
    email: 'musa.ibrahim99@example.com',
    primaryPosition: 'CF',
    photoUrl: '',
    submittedAt: '24/03/2026, 14:15:32',
    verificationHash: 'ESA-MUS7731-FCT26',
    data: {} as any,
  },
];

export default function App() {
  const [selectedPathway, setSelectedPathway] = useState<RegistrationPathway>('minor');
  const [activeReceipt, setActiveReceipt] = useState<RegistrationRecord | null>(null);
  const [lookupOpen, setLookupOpen] = useState(false);
  const [records, setRecords] = useState<RegistrationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('edoh_academy_registrations');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...INITIAL_DEMO_RECORDS];
      }
    } catch (e) {
      // Ignore fallback
    }
    return INITIAL_DEMO_RECORDS;
  });

  const handleRegistrationSuccess = (newRecord: RegistrationRecord) => {
    setRecords((prev) => {
      const updated = [newRecord, ...prev];
      try {
        localStorage.setItem('edoh_academy_registrations', JSON.stringify(updated.slice(0, 20)));
      } catch (e) {
        // storage quota fallback
      }
      return updated;
    });
    setActiveReceipt(newRecord);
  };

  const handleSelectPathway = (pathway: RegistrationPathway) => {
    setSelectedPathway(pathway);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E2E8F0] selection:bg-[#FFD000] selection:text-black">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenLookup={() => setLookupOpen(true)}
        onSelectPathway={handleSelectPathway}
      />

      <main>
        {/* Hero Section */}
        <Hero onSelectPathway={handleSelectPathway} />

        {/* About & Philosophy */}
        <AboutSection />

        {/* Academy Programs & Divisions */}
        <ProgramsSection onSelectPathway={handleSelectPathway} />

        {/* Graduate Success Stories & Pro Club Transitions Slider */}
        <SuccessStoriesSection />

        {/* 9 Statutory Regulations & Safeguarding */}
        <RulesSection />

        {/* Interactive Player Registration Portal (Pathway A & B) */}
        <RegistrationPortal
          key={selectedPathway}
          initialPathway={selectedPathway}
          onSuccess={handleRegistrationSuccess}
        />

        {/* Frequently Asked Questions: Trials, Tuition, Schedules */}
        <FAQSection />

        {/* Contact & Location Particulars */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Official Success Receipt Modal */}
      <SuccessReceiptModal
        record={activeReceipt}
        onClose={() => setActiveReceipt(null)}
      />

      {/* Registration Lookup / Slip Verification Modal */}
      <RegistrationLookupModal
        isOpen={lookupOpen}
        onClose={() => setLookupOpen(false)}
        records={records}
        onSelectRecord={(rec) => {
          setActiveReceipt(rec);
          setLookupOpen(false);
        }}
      />
    </div>
  );
}
