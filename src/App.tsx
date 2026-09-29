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
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { RegistrationRecord, RegistrationPathway } from './types';

// Pre-seeded authentic demo registrations for Abuja players across divisions
const INITIAL_DEMO_RECORDS: RegistrationRecord[] = [
  {
    regId: 'ESA/YTH/2026/1042',
    type: 'minor',
    fullName: 'Chidubem David Okoye',
    dateOfBirth: '2011-04-18',
    age: 15,
    gender: 'Male',
    categoryOrStatus: 'Under-15 Junior League',
    phone: '+234 911 800 6169',
    email: 'okoye.family@example.com',
    primaryPosition: 'Attacking Midfield (AM)',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    submittedAt: '12/03/2026, 09:24:10',
    verificationHash: 'ESA-OKO9214-FCT26',
    data: {
      regId: 'ESA/YTH/2026/1042',
      fullName: 'Chidubem David Okoye',
      dateOfBirth: '2011-04-18',
      age: 15,
      gender: 'Male',
      ageCategory: 'Under-15',
      nationality: 'Nigerian',
      stateOfOrigin: 'Anambra',
      lgaOfOrigin: 'Aguata',
      currentSchool: 'Government Secondary School, Garki',
      currentClass: 'SS 1',
      ninOrBirthCert: 'NIN-7782-9901-01',
      residentialAddress: 'Plot 414, Gwarinpa Estate, Abuja',
      primaryPosition: 'Attacking Midfield (AM)',
      secondaryPosition: 'Right Winger (RW)',
      preferredFoot: 'Right',
      preferredHand: 'Right',
      heightCm: '168',
      weightKg: '58',
      previousTeamName: 'Gwarinpa United Academy',
      previousTeamYears: '2023 - 2025',
      previousCoachContact: '+234 802 334 1122',
      medicalConditions: [],
      medicalNotes: 'No chronic allergies or previous concussions',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      guardianFullName: 'Engr. Kenneth Okoye',
      guardianRelationship: 'Father',
      guardianPrimaryPhone: '+234 803 445 6789',
      guardianAltPhone: '+234 812 556 7890',
      guardianEmail: 'kenneth.okoye@example.com',
      guardianOccupation: 'Civil Engineer',
      guardianAddress: 'Plot 414, Gwarinpa Estate, Abuja',
      acceptedClauses: [true, true, true, true, true, true, true, true, true],
      guardianAttestationAccepted: true,
      medicalConsentAccepted: true,
      minorTypedSignature: 'Chidubem Okoye',
      minorCanvasSignature: '',
      guardianTypedSignature: 'Kenneth Okoye',
      guardianCanvasSignature: '',
      submissionDate: '12/03/2026',
    },
  },
  {
    regId: 'ESA/SNR/2026/8931',
    type: 'senior',
    fullName: 'Ibrahim Musa Mohammed',
    dateOfBirth: '2004-09-12',
    age: 21,
    gender: 'Male',
    categoryOrStatus: 'Senior Squad (Free Agent)',
    phone: '+234 706 702 6825',
    email: 'musa.ibrahim99@example.com',
    primaryPosition: 'Centre Forward (CF)',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    submittedAt: '24/03/2026, 14:15:32',
    verificationHash: 'ESA-MUS7731-FCT26',
    data: {
      regId: 'ESA/SNR/2026/8931',
      fullName: 'Ibrahim Musa Mohammed',
      dateOfBirth: '2004-09-12',
      age: 21,
      gender: 'Male',
      nationality: 'Nigerian',
      stateOfOrigin: 'Kano',
      lgaOfOrigin: 'Nassarawa',
      nin: 'NIN-8891-2345-09',
      passportNumber: 'A10984521',
      phoneNumber: '+234 706 702 6825',
      emailAddress: 'musa.ibrahim99@example.com',
      residentialAddress: 'Suite 18, Mabushi Village, Abuja',
      clubStatus: 'Free Agent',
      primaryPosition: 'Centre Forward (CF)',
      secondaryPosition: 'Left Winger (LW)',
      preferredFoot: 'Both',
      preferredHand: 'Right',
      heightCm: '183',
      weightKg: '76',
      previousClubName: 'Kano Pillars Youth Team',
      previousClubPeriod: '2022 - 2024',
      previousCoachContact: '+234 809 112 3344',
      pastCompetitions: 'FCT FA Cup, Ramat Cup Finalist',
      preExistingInjuries: 'None',
      surgicalHistory: 'None',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      emergencyContactName: 'Alhaji Musa Garba',
      emergencyContactRelationship: 'Uncle',
      emergencyContactPhone: '+234 802 998 7766',
      nextOfKinName: 'Amina Mohammed',
      nextOfKinRelationship: 'Sister',
      nextOfKinPhone: '+234 803 111 2233',
      acceptedClauses: [true, true, true, true, true, true, true, true, true],
      legalAttestationAccepted: true,
      fifaVerificationAuthorized: true,
      playerTypedSignature: 'Ibrahim Musa',
      playerCanvasSignature: '',
      submissionDate: '24/03/2026',
    },
  },
  {
    regId: 'ESA/YTH/2026/0419',
    type: 'minor',
    fullName: 'Zainab Fatima Bello',
    dateOfBirth: '2013-11-05',
    age: 12,
    gender: 'Female',
    categoryOrStatus: 'Under-13 Development Squad',
    phone: '+234 803 219 8841',
    email: 'bello.academy@example.com',
    primaryPosition: 'Defensive Midfield (DM)',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    submittedAt: '18/03/2026, 11:05:44',
    verificationHash: 'ESA-BEL4419-FCT26',
    data: {
      regId: 'ESA/YTH/2026/0419',
      fullName: 'Zainab Fatima Bello',
      dateOfBirth: '2013-11-05',
      age: 12,
      gender: 'Female',
      ageCategory: 'Under-13',
      nationality: 'Nigerian',
      stateOfOrigin: 'Kaduna',
      lgaOfOrigin: 'Zaria',
      currentSchool: 'Federal Government Girls College, Bwari',
      currentClass: 'JSS 2',
      ninOrBirthCert: 'NIN-6621-0043-98',
      residentialAddress: 'Bwari Central, Abuja, FCT',
      primaryPosition: 'Defensive Midfield (DM)',
      secondaryPosition: 'Central Midfield (CM)',
      preferredFoot: 'Right',
      preferredHand: 'Right',
      heightCm: '154',
      weightKg: '45',
      previousTeamName: 'Bwari Queens Grassroots',
      previousTeamYears: '2024 - 2025',
      previousCoachContact: '+234 805 119 2233',
      medicalConditions: [],
      medicalNotes: 'None',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      guardianFullName: 'Dr. (Mrs) Hadiza Bello',
      guardianRelationship: 'Mother',
      guardianPrimaryPhone: '+234 803 219 8841',
      guardianAltPhone: '+234 802 887 6655',
      guardianEmail: 'hadiza.bello@example.com',
      guardianOccupation: 'Medical Doctor',
      guardianAddress: 'Bwari Central, Abuja, FCT',
      acceptedClauses: [true, true, true, true, true, true, true, true, true],
      guardianAttestationAccepted: true,
      medicalConsentAccepted: true,
      minorTypedSignature: 'Zainab Bello',
      minorCanvasSignature: '',
      guardianTypedSignature: 'Hadiza Bello',
      guardianCanvasSignature: '',
      submissionDate: '18/03/2026',
    },
  },
  {
    regId: 'ESA/YTH/2026/0088',
    type: 'minor',
    fullName: 'Emeka Divine Chukwuma',
    dateOfBirth: '2016-08-14',
    age: 9,
    gender: 'Male',
    categoryOrStatus: 'Under-10 Foundation Academy',
    phone: '+234 818 902 4411',
    email: 'chukwuma.fam@example.com',
    primaryPosition: 'Goalkeeper (GK)',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    submittedAt: '05/03/2026, 16:30:19',
    verificationHash: 'ESA-CHU0088-FCT26',
    data: {
      regId: 'ESA/YTH/2026/0088',
      fullName: 'Emeka Divine Chukwuma',
      dateOfBirth: '2016-08-14',
      age: 9,
      gender: 'Male',
      ageCategory: 'Under-10',
      nationality: 'Nigerian',
      stateOfOrigin: 'Enugu',
      lgaOfOrigin: 'Udi',
      currentSchool: 'Funtaj International School, Apo',
      currentClass: 'Primary 5',
      ninOrBirthCert: 'BC-2016-09812-EN',
      residentialAddress: 'Apo Resettlement Zone E, Abuja',
      primaryPosition: 'Goalkeeper (GK)',
      secondaryPosition: 'Centre Back (CB)',
      preferredFoot: 'Right',
      preferredHand: 'Right',
      heightCm: '142',
      weightKg: '38',
      previousTeamName: 'Apo Young Stars',
      previousTeamYears: '2024 - 2025',
      previousCoachContact: '+234 809 445 2211',
      medicalConditions: [],
      medicalNotes: 'None',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      guardianFullName: 'Pastor Barnabas Chukwuma',
      guardianRelationship: 'Father',
      guardianPrimaryPhone: '+234 818 902 4411',
      guardianAltPhone: '',
      guardianEmail: 'barnabas.chukwuma@example.com',
      guardianOccupation: 'Clergy / Administrator',
      guardianAddress: 'Apo Resettlement Zone E, Abuja',
      acceptedClauses: [true, true, true, true, true, true, true, true, true],
      guardianAttestationAccepted: true,
      medicalConsentAccepted: true,
      minorTypedSignature: 'Emeka Chukwuma',
      minorCanvasSignature: '',
      guardianTypedSignature: 'Barnabas Chukwuma',
      guardianCanvasSignature: '',
      submissionDate: '05/03/2026',
    },
  },
  {
    regId: 'ESA/SNR/2026/7102',
    type: 'senior',
    fullName: 'Kelvin Osahon Igbinoba',
    dateOfBirth: '2005-02-28',
    age: 21,
    gender: 'Male',
    categoryOrStatus: 'Senior Squad (Academy Trainee)',
    phone: '+234 814 559 3301',
    email: 'kelvin.igbinoba@example.com',
    primaryPosition: 'Centre Back (CB)',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    submittedAt: '27/03/2026, 08:45:12',
    verificationHash: 'ESA-IGB7102-FCT26',
    data: {
      regId: 'ESA/SNR/2026/7102',
      fullName: 'Kelvin Osahon Igbinoba',
      dateOfBirth: '2005-02-28',
      age: 21,
      gender: 'Male',
      nationality: 'Nigerian',
      stateOfOrigin: 'Edo',
      lgaOfOrigin: 'Oredo',
      nin: 'NIN-9912-4456-12',
      passportNumber: 'A11904512',
      phoneNumber: '+234 814 559 3301',
      emailAddress: 'kelvin.igbinoba@example.com',
      residentialAddress: 'Zone 4, Wuse, Abuja',
      clubStatus: 'Academy Trainee',
      primaryPosition: 'Centre Back (CB)',
      secondaryPosition: 'Right Back (RB)',
      preferredFoot: 'Right',
      preferredHand: 'Right',
      heightCm: '189',
      weightKg: '82',
      previousClubName: 'Bendel Insurance Feeders',
      previousClubPeriod: '2023 - 2024',
      previousCoachContact: '+234 803 776 5544',
      pastCompetitions: 'NLO Division 1, FCT FA Pre-Season Cup',
      preExistingInjuries: 'None',
      surgicalHistory: 'None',
      photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
      emergencyContactName: 'Mrs. Osariemen Igbinoba',
      emergencyContactRelationship: 'Mother',
      emergencyContactPhone: '+234 802 331 4455',
      nextOfKinName: 'Mrs. Osariemen Igbinoba',
      nextOfKinRelationship: 'Mother',
      nextOfKinPhone: '+234 802 331 4455',
      acceptedClauses: [true, true, true, true, true, true, true, true, true],
      legalAttestationAccepted: true,
      fifaVerificationAuthorized: true,
      playerTypedSignature: 'Kelvin Igbinoba',
      playerCanvasSignature: '',
      submissionDate: '27/03/2026',
    },
  },
];

export default function App() {
  const [selectedPathway, setSelectedPathway] = useState<RegistrationPathway>('minor');
  const [activeReceipt, setActiveReceipt] = useState<RegistrationRecord | null>(null);
  const [lookupOpen, setLookupOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const [records, setRecords] = useState<RegistrationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('edoh_academy_registrations');
      if (saved) {
        const parsed: RegistrationRecord[] = JSON.parse(saved);
        // Deduplicate against demo records
        const savedIds = new Set(parsed.map((r) => r.regId));
        const nonDuplicateDemos = INITIAL_DEMO_RECORDS.filter((d) => !savedIds.has(d.regId));
        return [...parsed, ...nonDuplicateDemos];
      }
    } catch (e) {
      // Ignore fallback
    }
    return INITIAL_DEMO_RECORDS;
  });

  const handleRegistrationSuccess = (newRecord: RegistrationRecord) => {
    setRecords((prev) => {
      const updated = [newRecord, ...prev.filter((r) => r.regId !== newRecord.regId)];
      try {
        localStorage.setItem('edoh_academy_registrations', JSON.stringify(updated.slice(0, 30)));
      } catch (e) {
        // storage quota fallback
      }
      return updated;
    });
    setActiveReceipt(newRecord);
  };

  const handleDeleteRecord = (regId: string) => {
    setRecords((prev) => {
      const updated = prev.filter((r) => r.regId !== regId);
      try {
        localStorage.setItem('edoh_academy_registrations', JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const handleSelectPathway = (pathway: RegistrationPathway) => {
    setSelectedPathway(pathway);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E2E8F0] selection:bg-[#FFD000] selection:text-black">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenLookup={() => setLookupOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
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
      <Footer onOpenAdmin={() => setAdminOpen(true)} />

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

      {/* Secure Password-Protected Admin Dashboard */}
      <AdminDashboardModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        records={records}
        onDeleteRecord={handleDeleteRecord}
        onViewRecordSlip={(rec) => {
          setActiveReceipt(rec);
          setAdminOpen(false);
        }}
      />
    </div>
  );
}
