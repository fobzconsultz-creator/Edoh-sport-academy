import React, { useState, useId } from 'react';
import {
  User,
  Shield,
  FileCheck2,
  Calendar,
  Phone,
  Mail,
  Upload,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Camera,
  Activity,
  Award,
  Sparkles,
  Crop,
} from 'lucide-react';
import {
  MinorFormData,
  SeniorFormData,
  RegistrationPathway,
  RegistrationRecord,
} from '../types';
import {
  YOUTH_STATUTORY_CLAUSES,
  SENIOR_STATUTORY_CLAUSES,
  FOOTBALL_POSITIONS,
  NIGERIAN_STATES,
  FCT_LGAS,
} from '../data/statutoryClauses';
import { SignaturePad } from './SignaturePad';
import { ImageCropperModal } from './ImageCropperModal';

interface RegistrationPortalProps {
  initialPathway?: RegistrationPathway;
  onSuccess: (record: RegistrationRecord) => void;
}

export const RegistrationPortal: React.FC<RegistrationPortalProps> = ({
  initialPathway = 'minor',
  onSuccess,
}) => {
  const [pathway, setPathway] = useState<RegistrationPathway>(initialPathway);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [ageCheckDate, setAgeCheckDate] = useState<string>('');
  const [ageCheckResult, setAgeCheckResult] = useState<string | null>(null);

  // Generate Unique ID on component mount
  const generateRandomSuffix = () => Math.floor(1000 + Math.random() * 9000).toString();

  const [minorData, setMinorData] = useState<MinorFormData>({
    regId: `ESA/YTH/2026/${generateRandomSuffix()}`,
    fullName: '',
    dateOfBirth: '',
    age: '',
    gender: 'Male',
    ageCategory: 'Under-15',
    nationality: 'Nigerian',
    stateOfOrigin: 'FCT Abuja',
    lgaOfOrigin: 'Abuja Municipal (AMAC)',
    currentSchool: '',
    currentClass: '',
    ninOrBirthCert: '',
    residentialAddress: '',
    primaryPosition: 'CM',
    secondaryPosition: 'AM',
    preferredFoot: 'Right',
    preferredHand: 'Right',
    heightCm: '',
    weightKg: '',
    previousTeamName: '',
    previousTeamYears: '',
    previousCoachContact: '',
    medicalConditions: ['No prior injuries'],
    medicalNotes: '',
    photoUrl: '',
    guardianFullName: '',
    guardianRelationship: 'Father',
    guardianPrimaryPhone: '',
    guardianAltPhone: '',
    guardianEmail: '',
    guardianOccupation: '',
    guardianAddress: '',
    acceptedClauses: Array(9).fill(false),
    guardianAttestationAccepted: false,
    medicalConsentAccepted: false,
    minorTypedSignature: '',
    minorCanvasSignature: '',
    guardianTypedSignature: '',
    guardianCanvasSignature: '',
    submissionDate: new Date().toISOString().split('T')[0],
  });

  const [seniorData, setSeniorData] = useState<SeniorFormData>({
    regId: `ESA/SNR/2026/${generateRandomSuffix()}`,
    fullName: '',
    dateOfBirth: '',
    age: '',
    gender: 'Male',
    nationality: 'Nigerian',
    stateOfOrigin: 'FCT Abuja',
    lgaOfOrigin: 'Abuja Municipal (AMAC)',
    nin: '',
    passportNumber: '',
    phoneNumber: '',
    emailAddress: '',
    residentialAddress: '',
    clubStatus: 'Free Agent',
    primaryPosition: 'CF',
    secondaryPosition: 'LW',
    preferredFoot: 'Right',
    preferredHand: 'Right',
    heightCm: '',
    weightKg: '',
    previousClubName: '',
    previousClubPeriod: '',
    previousCoachContact: '',
    pastCompetitions: '',
    preExistingInjuries: '',
    surgicalHistory: '',
    photoUrl: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    nextOfKinName: '',
    nextOfKinRelationship: '',
    nextOfKinPhone: '',
    acceptedClauses: Array(9).fill(false),
    legalAttestationAccepted: false,
    fifaVerificationAuthorized: false,
    playerTypedSignature: '',
    playerCanvasSignature: '',
    submissionDate: new Date().toISOString().split('T')[0],
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [expandedClauses, setExpandedClauses] = useState<{ [key: number]: boolean }>({ 1: true });

  // Real-time Canvas Cropper State
  const [cropperOpen, setCropperOpen] = useState<boolean>(false);
  const [cropperImageSrc, setCropperImageSrc] = useState<string | null>(null);
  const [cropperTarget, setCropperTarget] = useState<'minor' | 'senior'>('minor');

  // Handle Photo File Selection -> Open Real-time Cropper
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'minor' | 'senior') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCropperImageSrc(result);
        setCropperTarget(target);
        setCropperOpen(true);
      };
      reader.readAsDataURL(file);
      // Reset input value so the user can select the same file again if desired
      e.target.value = '';
    }
  };

  // Re-open cropper on existing photo
  const handleReCrop = (target: 'minor' | 'senior') => {
    const currentSrc = target === 'minor' ? minorData.photoUrl : seniorData.photoUrl;
    if (currentSrc) {
      setCropperImageSrc(currentSrc);
      setCropperTarget(target);
      setCropperOpen(true);
    }
  };

  // Handle completed crop from canvas modal
  const handleCropComplete = (croppedDataUrl: string) => {
    if (cropperTarget === 'minor') {
      setMinorData((prev) => ({ ...prev, photoUrl: croppedDataUrl }));
    } else {
      setSeniorData((prev) => ({ ...prev, photoUrl: croppedDataUrl }));
    }
    setCropperOpen(false);
    setCropperImageSrc(null);
  };

  // Live Age Checker Calculator
  const handleAgeCheck = (dobString: string) => {
    setAgeCheckDate(dobString);
    if (!dobString) {
      setAgeCheckResult(null);
      return;
    }

    const birth = new Date(dobString);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      calculatedAge--;
    }

    if (isNaN(calculatedAge) || calculatedAge < 5 || calculatedAge > 40) {
      setAgeCheckResult('Please enter a valid date of birth between 1985 and 2021.');
      return;
    }

    if (calculatedAge < 18) {
      let suggestedCat: 'Under-10' | 'Under-13' | 'Under-15' | 'Under-17' = 'Under-17';
      if (calculatedAge <= 10) suggestedCat = 'Under-10';
      else if (calculatedAge <= 13) suggestedCat = 'Under-13';
      else if (calculatedAge <= 15) suggestedCat = 'Under-15';

      setAgeCheckResult(
        `Age calculated: ${calculatedAge} years. Eligible for Youth Pathway (${suggestedCat}).`
      );
      setPathway('minor');
      setMinorData((prev) => ({
        ...prev,
        dateOfBirth: dobString,
        age: calculatedAge,
        ageCategory: suggestedCat,
      }));
    } else {
      setAgeCheckResult(`Age calculated: ${calculatedAge} years. Eligible for Senior Squad (18+).`);
      setPathway('senior');
      setSeniorData((prev) => ({
        ...prev,
        dateOfBirth: dobString,
        age: calculatedAge,
      }));
    }
  };

  // Clause toggle
  const toggleClauseExpand = (id: number) => {
    setExpandedClauses((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClauseCheck = (index: number, target: 'minor' | 'senior') => {
    if (target === 'minor') {
      const updated = [...minorData.acceptedClauses];
      updated[index] = !updated[index];
      setMinorData({ ...minorData, acceptedClauses: updated });
    } else {
      const updated = [...seniorData.acceptedClauses];
      updated[index] = !updated[index];
      setSeniorData({ ...seniorData, acceptedClauses: updated });
    }
  };

  const handleAcceptAllClauses = (target: 'minor' | 'senior') => {
    if (target === 'minor') {
      setMinorData({ ...minorData, acceptedClauses: Array(9).fill(true) });
    } else {
      setSeniorData({ ...seniorData, acceptedClauses: Array(9).fill(true) });
    }
  };

  // Step Navigation Validation
  const validateStep = (step: number): boolean => {
    setValidationError(null);

    if (pathway === 'minor') {
      if (step === 1) {
        if (!minorData.fullName.trim()) {
          setValidationError('Please enter the Minor Player’s Full Legal Name.');
          return false;
        }
        if (!minorData.dateOfBirth) {
          setValidationError('Please specify Date of Birth.');
          return false;
        }
        if (!minorData.ninOrBirthCert.trim()) {
          setValidationError('Please supply National ID Number (NIN) or Birth Certificate Number.');
          return false;
        }
        if (!minorData.residentialAddress.trim()) {
          setValidationError('Please enter Residential Address in Abuja/FCT or State.');
          return false;
        }
      } else if (step === 2) {
        if (!minorData.guardianFullName.trim()) {
          setValidationError('Please enter the Parent/Legal Guardian Full Name.');
          return false;
        }
        if (!minorData.guardianPrimaryPhone.trim()) {
          setValidationError('Please enter the Guardian’s Primary Contact Telephone.');
          return false;
        }
        if (!minorData.guardianEmail.trim()) {
          setValidationError('Please enter a valid Guardian Email Address.');
          return false;
        }
      } else if (step === 3) {
        const allAccepted = minorData.acceptedClauses.every(Boolean);
        if (!allAccepted) {
          setValidationError('All 9 Statutory Youth Clauses must be reviewed and accepted to continue.');
          return false;
        }
      }
    } else {
      // Senior Pathway
      if (step === 1) {
        if (!seniorData.fullName.trim()) {
          setValidationError('Please enter Player’s Full Legal Name.');
          return false;
        }
        if (!seniorData.dateOfBirth) {
          setValidationError('Please specify Date of Birth.');
          return false;
        }
        if (!seniorData.nin.trim()) {
          setValidationError('Please supply National ID Number (NIN).');
          return false;
        }
        if (!seniorData.phoneNumber.trim()) {
          setValidationError('Please supply Player Phone Number.');
          return false;
        }
        if (!seniorData.emailAddress.trim()) {
          setValidationError('Please supply Player Email Address.');
          return false;
        }
      } else if (step === 2) {
        if (!seniorData.emergencyContactName.trim() || !seniorData.emergencyContactPhone.trim()) {
          setValidationError('Please complete Emergency Contact Name and Phone Number.');
          return false;
        }
        if (!seniorData.nextOfKinName.trim() || !seniorData.nextOfKinPhone.trim()) {
          setValidationError('Please complete Next of Kin Name and Phone Number.');
          return false;
        }
      } else if (step === 3) {
        const allAccepted = seniorData.acceptedClauses.every(Boolean);
        if (!allAccepted) {
          setValidationError('All 9 Statutory Senior Athlete Clauses must be reviewed and accepted.');
          return false;
        }
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: document.getElementById('registration-portal')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setValidationError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Final Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const hash = 'ESA-' + Math.random().toString(36).substring(2, 9).toUpperCase() + '-FCT26';

    if (pathway === 'minor') {
      if (!minorData.guardianAttestationAccepted || !minorData.medicalConsentAccepted) {
        setValidationError('Guardian Attestation and Emergency Medical Consent are mandatory.');
        return;
      }
      if (!minorData.guardianTypedSignature.trim() && !minorData.guardianCanvasSignature) {
        setValidationError('Parent / Legal Guardian must provide a digital signature.');
        return;
      }

      const record: RegistrationRecord = {
        regId: minorData.regId,
        type: 'minor',
        fullName: minorData.fullName,
        dateOfBirth: minorData.dateOfBirth,
        age: Number(minorData.age) || 15,
        gender: minorData.gender,
        categoryOrStatus: `Youth ${minorData.ageCategory}`,
        phone: minorData.guardianPrimaryPhone,
        email: minorData.guardianEmail,
        primaryPosition: minorData.primaryPosition,
        photoUrl: minorData.photoUrl,
        submittedAt: new Date().toLocaleString('en-GB', { timeZone: 'Africa/Lagos' }),
        verificationHash: hash,
        data: minorData,
      };

      onSuccess(record);
    } else {
      if (!seniorData.legalAttestationAccepted || !seniorData.fifaVerificationAuthorized) {
        setValidationError('Statutory Legal Attestation and FIFA Connect Verification authorization are mandatory.');
        return;
      }
      if (!seniorData.playerTypedSignature.trim() && !seniorData.playerCanvasSignature) {
        setValidationError('Senior Athlete must provide a digital signature.');
        return;
      }

      const record: RegistrationRecord = {
        regId: seniorData.regId,
        type: 'senior',
        fullName: seniorData.fullName,
        dateOfBirth: seniorData.dateOfBirth,
        age: Number(seniorData.age) || 20,
        gender: seniorData.gender,
        categoryOrStatus: `Senior (${seniorData.clubStatus})`,
        phone: seniorData.phoneNumber,
        email: seniorData.emailAddress,
        primaryPosition: seniorData.primaryPosition,
        photoUrl: seniorData.photoUrl,
        submittedAt: new Date().toLocaleString('en-GB', { timeZone: 'Africa/Lagos' }),
        verificationHash: hash,
        data: seniorData,
      };

      onSuccess(record);
    }
  };

  const currentClauses = pathway === 'minor' ? YOUTH_STATUTORY_CLAUSES : SENIOR_STATUTORY_CLAUSES;
  const currentAcceptedClauses = pathway === 'minor' ? minorData.acceptedClauses : seniorData.acceptedClauses;

  return (
    <section id="registration-portal" className="py-20 md:py-28 border-b border-[#3A331A]/60 bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-[#FFD000]">
            Official Player Contract & Intake Portal
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Player Registration 2026
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base">
            Select your eligibility pathway below. All records are integrated into Edoh Sport Academy’s statutory registry and verified for FCT FA & FIFA Connect compliance.
          </p>
        </div>

        {/* Live Age Checker Assist Box */}
        <div className="rounded-2xl bg-[#141414] border border-[#3A331A] p-5 sm:p-6 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#FFD000]" />
              <div>
                <span className="font-display font-bold text-white text-sm">
                  Quick Eligibility & Age-Grade Finder
                </span>
                <p className="text-xs text-neutral-400">
                  Enter Date of Birth to automatically determine Youth vs Senior pathway.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={ageCheckDate}
                onChange={(e) => handleAgeCheck(e.target.value)}
                className="px-3 py-2 bg-[#0A0A0A] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
              />
            </div>
          </div>

          {ageCheckResult && (
            <div className="p-3 bg-[#1C1810] border border-[#443812] rounded-xl flex items-center justify-between text-xs text-[#FFD000]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#FFD000]" />
                <span>{ageCheckResult}</span>
              </div>
              <span className="text-[10px] uppercase font-mono text-neutral-400">Auto-Applied</span>
            </div>
          )}
        </div>

        {/* Pathway Selector Segmented Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => {
              setPathway('minor');
              setCurrentStep(1);
            }}
            className={`p-5 rounded-2xl border text-left transition-all ${
              pathway === 'minor'
                ? 'bg-[#181818] border-[#FFD000] shadow-[0_0_25px_rgba(255,208,0,0.15)] ring-1 ring-[#FFD000]'
                : 'bg-[#121212] border-[#2A2413] hover:border-[#3A331A]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#FFD000] uppercase">
                Pathway A (Under 18)
              </span>
              <span className="text-[10px] font-mono text-neutral-400 bg-[#222] px-2 py-0.5 rounded">
                ID: {minorData.regId}
              </span>
            </div>
            <div className="font-display font-bold text-lg text-white">
              Minor Player Enrollment & Guardian Consent
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              For youth athletes ages U-10 to U-17. Requires legal guardian statutory attestation.
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setPathway('senior');
              setCurrentStep(1);
            }}
            className={`p-5 rounded-2xl border text-left transition-all ${
              pathway === 'senior'
                ? 'bg-[#181818] border-[#FFD000] shadow-[0_0_25px_rgba(255,208,0,0.15)] ring-1 ring-[#FFD000]'
                : 'bg-[#121212] border-[#2A2413] hover:border-[#3A331A]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#FFD000] uppercase">
                Pathway B (Age 18+)
              </span>
              <span className="text-[10px] font-mono text-neutral-400 bg-[#222] px-2 py-0.5 rounded">
                ID: {seniorData.regId}
              </span>
            </div>
            <div className="font-display font-bold text-lg text-white">
              Senior / Adult Athlete Registration
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              For adult players, free agents, trainees, and pros. Direct FIFA TMS & NFF covenant.
            </div>
          </button>
        </div>

        {/* 4-Step Progress Indicator */}
        <div className="border border-[#2B2513] rounded-2xl bg-[#121212] p-3 sm:p-6">
          <div className="grid grid-cols-4 gap-1 sm:gap-2 text-center text-xs font-medium">
            <div className={`space-y-1 ${currentStep >= 1 ? 'text-[#FFD000]' : 'text-neutral-500'}`}>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 mx-auto rounded-full flex items-center justify-center font-bold text-xs sm:text-sm ${
                currentStep >= 1 ? 'bg-[#FFD000] text-black font-extrabold' : 'bg-neutral-800 text-neutral-400'
              }`}>
                1
              </div>
              <span className="hidden sm:inline block">Player Particulars</span>
              <span className="sm:hidden block text-[10px] truncate">Particulars</span>
            </div>

            <div className={`space-y-1 ${currentStep >= 2 ? 'text-[#FFD000]' : 'text-neutral-500'}`}>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 mx-auto rounded-full flex items-center justify-center font-bold text-xs sm:text-sm ${
                currentStep >= 2 ? 'bg-[#FFD000] text-black font-extrabold' : 'bg-neutral-800 text-neutral-400'
              }`}>
                2
              </div>
              <span className="hidden sm:inline block">{pathway === 'minor' ? 'Guardian Details' : 'Emergency & Kin'}</span>
              <span className="sm:hidden block text-[10px] truncate">{pathway === 'minor' ? 'Guardian' : 'Kin'}</span>
            </div>

            <div className={`space-y-1 ${currentStep >= 3 ? 'text-[#FFD000]' : 'text-neutral-500'}`}>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 mx-auto rounded-full flex items-center justify-center font-bold text-xs sm:text-sm ${
                currentStep >= 3 ? 'bg-[#FFD000] text-black font-extrabold' : 'bg-neutral-800 text-neutral-400'
              }`}>
                3
              </div>
              <span className="hidden sm:inline block">9 Statutory Covenants</span>
              <span className="sm:hidden block text-[10px] truncate">Covenants</span>
            </div>

            <div className={`space-y-1 ${currentStep >= 4 ? 'text-[#FFD000]' : 'text-neutral-500'}`}>
              <div className={`w-7 h-7 sm:w-8 sm:h-8 mx-auto rounded-full flex items-center justify-center font-bold text-xs sm:text-sm ${
                currentStep >= 4 ? 'bg-[#FFD000] text-black font-extrabold' : 'bg-neutral-800 text-neutral-400'
              }`}>
                4
              </div>
              <span className="hidden sm:inline block">Attestation & Signature</span>
              <span className="sm:hidden block text-[10px] truncate">Signatures</span>
            </div>
          </div>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span className="font-semibold">{validationError}</span>
          </div>
        )}

        {/* The Main Intake Form Container */}
        <form onSubmit={handleSubmit} className="rounded-2xl bg-[#141414] border border-[#3A331A] p-4 sm:p-10 space-y-6 sm:space-y-8 shadow-xl">
          
          {/* ========================================================================= */}
          {/* PATHWAY A: MINOR REGISTRATION (UNDER 18) */}
          {/* ========================================================================= */}
          {pathway === 'minor' && (
            <>
              {/* STEP 1: Minor Particulars */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="border-b border-[#282112] pb-3">
                    <span className="text-xs font-mono text-[#FFD000] uppercase font-bold">
                      Section 1 of 4 • Minor Particulars
                    </span>
                    <h3 className="font-display text-xl font-bold text-white mt-1">
                      Minor Athlete Identification & Athletic Record
                    </h3>
                  </div>

                  {/* Photo Upload Box with Real-time 3:4 Canvas Cropper */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#0D0D0D] border border-[#2B2513] flex flex-col sm:flex-row items-center gap-5">
                    <div className="relative w-28 h-36 rounded-lg border-2 border-[#FFD000]/60 overflow-hidden bg-[#181818] flex items-center justify-center shrink-0 shadow-lg group">
                      {minorData.photoUrl ? (
                        <>
                          <img src={minorData.photoUrl} alt="Passport preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity p-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleReCrop('minor')}
                              className="px-2.5 py-1 text-[10px] font-bold text-black bg-[#FFD000] rounded hover:bg-[#E6BC00] flex items-center gap-1"
                            >
                              <Crop className="w-3 h-3" />
                              Re-align
                            </button>
                          </div>
                          <span className="absolute bottom-1 right-1 text-[8px] font-mono uppercase bg-black/80 text-[#FFD000] px-1 py-0.5 rounded border border-[#3A331A]">
                            3:4 Ratio
                          </span>
                        </>
                      ) : (
                        <div className="text-center p-2 text-neutral-500">
                          <Camera className="w-6 h-6 mx-auto mb-1 opacity-50 text-[#FFD000]" />
                          <span className="text-[9px] uppercase font-mono block text-neutral-400">3:4 Passport</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 text-center sm:text-left flex-1">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <label className="text-xs font-bold text-white block">
                          Recent Passport Photo Upload (3:4 Ratio)
                        </label>
                        <span className="text-[10px] font-mono uppercase bg-[#28210F] text-[#FFD000] px-2 py-0.5 rounded border border-[#443812]">
                          Interactive 3:4 Cropper
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-normal">
                        Upload a photo. Our real-time canvas cropper will automatically open to let you pan, zoom, and frame the head within official 3:4 passport guidelines (red or white background recommended).
                      </p>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-200 bg-[#222] hover:bg-[#2e2e2e] border border-[#3A331A] rounded-lg cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5 text-[#FFD000]" />
                          <span>{minorData.photoUrl ? 'Replace Photo' : 'Select Photo to Crop'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(e, 'minor')}
                            className="hidden"
                          />
                        </label>

                        {minorData.photoUrl && (
                          <button
                            type="button"
                            onClick={() => handleReCrop('minor')}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#FFD000] bg-[#1E190A] hover:bg-[#2B230C] border border-[#FFD000]/40 rounded-lg transition-colors"
                          >
                            <Crop className="w-3.5 h-3.5" />
                            <span>Adjust 3:4 Crop</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Basic Biodata Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-neutral-200">
                        Full Legal Name (as in birth certificate / NIN) <span className="text-[#FFD000]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={minorData.fullName}
                        onChange={(e) => setMinorData({ ...minorData, fullName: e.target.value })}
                        placeholder="e.g. Emmanuel Chukwuemeka Edoh"
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-200">
                        Date of Birth <span className="text-[#FFD000]">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={minorData.dateOfBirth}
                        onChange={(e) => handleAgeCheck(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-200">Gender</label>
                        <select
                          value={minorData.gender}
                          onChange={(e) => setMinorData({ ...minorData, gender: e.target.value as any })}
                          className="w-full px-3 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-200">Age Category</label>
                        <select
                          value={minorData.ageCategory}
                          onChange={(e) => setMinorData({ ...minorData, ageCategory: e.target.value as any })}
                          className="w-full px-3 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                        >
                          <option value="Under-10">Under-10</option>
                          <option value="Under-13">Under-13</option>
                          <option value="Under-15">Under-15</option>
                          <option value="Under-17">Under-17</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-200">
                        State of Origin
                      </label>
                      <select
                        value={minorData.stateOfOrigin}
                        onChange={(e) => setMinorData({ ...minorData, stateOfOrigin: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                      >
                        {NIGERIAN_STATES.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-200">
                        LGA of Origin / Residence
                      </label>
                      <input
                        type="text"
                        value={minorData.lgaOfOrigin}
                        onChange={(e) => setMinorData({ ...minorData, lgaOfOrigin: e.target.value })}
                        placeholder="e.g. Abuja Municipal (AMAC) or Bwari"
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-200">
                        Current School & Class
                      </label>
                      <input
                        type="text"
                        value={minorData.currentSchool}
                        onChange={(e) => setMinorData({ ...minorData, currentSchool: e.target.value })}
                        placeholder="e.g. Federal Government Academy, SS1"
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-200">
                        National ID (NIN) or Birth Certificate No. <span className="text-[#FFD000]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={minorData.ninOrBirthCert}
                        onChange={(e) => setMinorData({ ...minorData, ninOrBirthCert: e.target.value })}
                        placeholder="e.g. NIN 98765432101 or NPC/ABJ/..."
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-neutral-200">
                        Residential Address (Abuja / FCT) <span className="text-[#FFD000]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={minorData.residentialAddress}
                        onChange={(e) => setMinorData({ ...minorData, residentialAddress: e.target.value })}
                        placeholder="e.g. Plot 14, Jahi 1 District, Near Mabushi Market, Abuja"
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>
                  </div>

                  {/* Athletic Attributes */}
                  <div className="pt-4 border-t border-[#242013] space-y-4">
                    <span className="text-xs font-mono text-[#FFD000] uppercase font-bold block">
                      Athletic Profile & Physical Attributes
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-200">Primary Position</label>
                        <select
                          value={minorData.primaryPosition}
                          onChange={(e) => setMinorData({ ...minorData, primaryPosition: e.target.value })}
                          className="w-full px-3 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                        >
                          {FOOTBALL_POSITIONS.map((pos) => (
                            <option key={pos.value} value={pos.value}>{pos.label}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-200">Secondary Position</label>
                        <select
                          value={minorData.secondaryPosition}
                          onChange={(e) => setMinorData({ ...minorData, secondaryPosition: e.target.value })}
                          className="w-full px-3 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                        >
                          {FOOTBALL_POSITIONS.map((pos) => (
                            <option key={pos.value} value={pos.value}>{pos.label}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-200">Preferred Foot</label>
                        <select
                          value={minorData.preferredFoot}
                          onChange={(e) => setMinorData({ ...minorData, preferredFoot: e.target.value as any })}
                          className="w-full px-3 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                        >
                          <option value="Right">Right</option>
                          <option value="Left">Left</option>
                          <option value="Both">Both (Ambidextrous)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-200">Preferred Hand</label>
                        <select
                          value={minorData.preferredHand}
                          onChange={(e) => setMinorData({ ...minorData, preferredHand: e.target.value as any })}
                          className="w-full px-3 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                        >
                          <option value="Right">Right</option>
                          <option value="Left">Left</option>
                          <option value="Both">Both</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-200">Height (cm)</label>
                        <input
                          type="number"
                          value={minorData.heightCm}
                          onChange={(e) => setMinorData({ ...minorData, heightCm: e.target.value })}
                          placeholder="e.g. 165"
                          className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-200">Weight (kg)</label>
                        <input
                          type="number"
                          value={minorData.weightKg}
                          onChange={(e) => setMinorData({ ...minorData, weightKg: e.target.value })}
                          placeholder="e.g. 54"
                          className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Previous Academy & Medical */}
                  <div className="pt-4 border-t border-[#242013] space-y-4">
                    <span className="text-xs font-mono text-[#FFD000] uppercase font-bold block">
                      Previous Academy & Medical Disclosure
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-xs font-semibold text-neutral-200">Previous Academy / School Team</label>
                        <input
                          type="text"
                          value={minorData.previousTeamName}
                          onChange={(e) => setMinorData({ ...minorData, previousTeamName: e.target.value })}
                          placeholder="e.g. Mabushi Grassroots FC, None (Fresh Trainee)"
                          className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-200">Previous Coach Contact</label>
                        <input
                          type="text"
                          value={minorData.previousCoachContact}
                          onChange={(e) => setMinorData({ ...minorData, previousCoachContact: e.target.value })}
                          placeholder="e.g. +234 803 000 0000"
                          className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-neutral-200 block">
                        Medical History Checklist
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        {['No prior injuries', 'Past fractures', 'Asthma', 'Allergies'].map((cond) => (
                          <label
                            key={cond}
                            className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer transition-colors ${
                              minorData.medicalConditions.includes(cond)
                                ? 'bg-[#221C0D] border-[#FFD000] text-white'
                                : 'bg-[#0D0D0D] border-[#2E2818] text-neutral-400'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={minorData.medicalConditions.includes(cond)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setMinorData({
                                    ...minorData,
                                    medicalConditions: [...minorData.medicalConditions, cond],
                                  });
                                } else {
                                  setMinorData({
                                    ...minorData,
                                    medicalConditions: minorData.medicalConditions.filter((c) => c !== cond),
                                  });
                                }
                              }}
                              className="accent-[#FFD000] rounded"
                            />
                            <span>{cond}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Guardian Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="border-b border-[#282112] pb-3">
                    <span className="text-xs font-mono text-[#FFD000] uppercase font-bold">
                      Section 2 of 4 • Parent / Legal Guardian Particulars
                    </span>
                    <h3 className="font-display text-xl font-bold text-white mt-1">
                      Next of Kin & Parental Authority
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-neutral-200">
                        Parent / Guardian Full Legal Name <span className="text-[#FFD000]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={minorData.guardianFullName}
                        onChange={(e) => setMinorData({ ...minorData, guardianFullName: e.target.value })}
                        placeholder="e.g. Barrister Jonathan Edoh"
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-200">Relationship to Minor</label>
                      <select
                        value={minorData.guardianRelationship}
                        onChange={(e) => setMinorData({ ...minorData, guardianRelationship: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                      >
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Legal Guardian">Legal Guardian (Court-Appointed)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-200">Occupation / Employer</label>
                      <input
                        type="text"
                        value={minorData.guardianOccupation}
                        onChange={(e) => setMinorData({ ...minorData, guardianOccupation: e.target.value })}
                        placeholder="e.g. Civil Servant / FCTA"
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-200">
                        Primary Telephone Number <span className="text-[#FFD000]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={minorData.guardianPrimaryPhone}
                        onChange={(e) => setMinorData({ ...minorData, guardianPrimaryPhone: e.target.value })}
                        placeholder="e.g. +234 803 123 4567"
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-200">
                        Alternative Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={minorData.guardianAltPhone}
                        onChange={(e) => setMinorData({ ...minorData, guardianAltPhone: e.target.value })}
                        placeholder="e.g. +234 810 987 6543"
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-neutral-200">
                        Guardian Email Address <span className="text-[#FFD000]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={minorData.guardianEmail}
                        onChange={(e) => setMinorData({ ...minorData, guardianEmail: e.target.value })}
                        placeholder="e.g. guardian@example.com"
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-neutral-200">Guardian Residential Address</label>
                      <input
                        type="text"
                        value={minorData.guardianAddress}
                        onChange={(e) => setMinorData({ ...minorData, guardianAddress: e.target.value })}
                        placeholder="If same as minor, leave blank or specify"
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: 9-Clause Statutory Agreement */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#282112] pb-3">
                    <div>
                      <span className="text-xs font-mono text-[#FFD000] uppercase font-bold">
                        Section 3 of 4 • Statutory Youth Covenant
                      </span>
                      <h3 className="font-display text-xl font-bold text-white mt-1">
                        9-Clause Parent/Guardian Statutory Agreement
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAcceptAllClauses('minor')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-black bg-[#FFD000] hover:bg-[#E6BC00] rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Accept All 9 Clauses</span>
                    </button>
                  </div>

                  <p className="text-xs text-neutral-300">
                    Review each statutory clause below. All 9 legal clauses must be explicitly acknowledged to authorize official registration on the FCT FA & FIFA Connect player database.
                  </p>

                  <div className="space-y-3">
                    {YOUTH_STATUTORY_CLAUSES.map((clause, index) => {
                      const isAccepted = minorData.acceptedClauses[index];
                      const isExpanded = expandedClauses[clause.id];

                      return (
                        <div
                          key={clause.id}
                          className={`rounded-xl border transition-all ${
                            isAccepted ? 'bg-[#181818] border-[#FFD000]/60' : 'bg-[#111111] border-[#2C2616]'
                          }`}
                        >
                          <div className="p-4 flex items-start justify-between gap-3">
                            <label className="flex items-start gap-3 cursor-pointer flex-1">
                              <input
                                type="checkbox"
                                checked={isAccepted}
                                onChange={() => handleClauseCheck(index, 'minor')}
                                className="mt-1 w-4 h-4 accent-[#FFD000] rounded shrink-0 cursor-pointer"
                              />
                              <div>
                                <div className="font-bold text-white text-sm">
                                  {clause.title}
                                </div>
                                <div className="text-xs text-neutral-400 mt-0.5">
                                  {clause.summary}
                                </div>
                              </div>
                            </label>

                            <button
                              type="button"
                              onClick={() => toggleClauseExpand(clause.id)}
                              className="p-1.5 text-neutral-400 hover:text-white rounded bg-[#1C1C1C] shrink-0"
                              aria-label="Expand legal text"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4 text-[#FFD000]" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>

                          {isExpanded && (
                            <div className="px-4 pb-4 pt-1 border-t border-[#231F14] text-xs text-neutral-300 leading-relaxed bg-[#0B0B0B] rounded-b-xl">
                              {clause.fullLegalText}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: Attestation & Digital Signatures */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="border-b border-[#282112] pb-3">
                    <span className="text-xs font-mono text-[#FFD000] uppercase font-bold">
                      Section 4 of 4 • Legal Attestation & Signatures
                    </span>
                    <h3 className="font-display text-xl font-bold text-white mt-1">
                      Guardian Attestation & Dual Digital Signatures
                    </h3>
                  </div>

                  {/* Mandatory Checkboxes */}
                  <div className="space-y-3 p-4 rounded-xl bg-[#0D0D0D] border border-[#2D2716]">
                    <label className="flex items-start gap-3 cursor-pointer text-xs text-neutral-200">
                      <input
                        type="checkbox"
                        required
                        checked={minorData.guardianAttestationAccepted}
                        onChange={(e) => setMinorData({ ...minorData, guardianAttestationAccepted: e.target.checked })}
                        className="mt-0.5 w-4 h-4 accent-[#FFD000] rounded shrink-0"
                      />
                      <span>
                        <strong className="text-white">Guardian Legal Attestation:</strong> I hereby certify that I am the biological parent or legally recognized guardian of the minor player named herein. All particulars stated are true, accurate, and verifiable. I grant full permission for their participation in Edoh Sport Academy activities.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer text-xs text-neutral-200">
                      <input
                        type="checkbox"
                        required
                        checked={minorData.medicalConsentAccepted}
                        onChange={(e) => setMinorData({ ...minorData, medicalConsentAccepted: e.target.checked })}
                        className="mt-0.5 w-4 h-4 accent-[#FFD000] rounded shrink-0"
                      />
                      <span>
                        <strong className="text-white">Emergency Medical & Safeguarding Consent:</strong> In the event of emergency medical need where immediate parental contact cannot be established, I authorize Edoh Sport Academy licensed medical staff to administer emergency first aid and transfer the minor to an authorized hospital.
                      </span>
                    </label>
                  </div>

                  {/* Dual Signature Inputs: Minor Player and Guardian */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    
                    {/* Minor Signature Card */}
                    <div className="p-4 rounded-xl bg-[#111111] border border-[#2E2717] space-y-4">
                      <div className="text-xs font-mono text-[#FFD000] uppercase font-bold">
                        A. Minor Player Signature
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-neutral-300">
                          Typed Name / Initials
                        </label>
                        <input
                          type="text"
                          value={minorData.minorTypedSignature}
                          onChange={(e) => setMinorData({ ...minorData, minorTypedSignature: e.target.value })}
                          placeholder="e.g. Emmanuel C. Edoh"
                          className="w-full px-3 py-2 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                        />
                      </div>

                      <SignaturePad
                        label="Minor Touch/Stylus Signature"
                        sublabel="Sign or draw initials inside box"
                        value={minorData.minorCanvasSignature}
                        onChange={(sig) => setMinorData({ ...minorData, minorCanvasSignature: sig })}
                      />
                    </div>

                    {/* Parent / Guardian Signature Card */}
                    <div className="p-4 rounded-xl bg-[#111111] border border-[#2E2717] space-y-4">
                      <div className="text-xs font-mono text-[#FFD000] uppercase font-bold">
                        B. Parent / Guardian Signature <span className="text-[#FFD000]">*</span>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-neutral-300">
                          Guardian Full Typed Legal Signature <span className="text-[#FFD000]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={minorData.guardianTypedSignature}
                          onChange={(e) => setMinorData({ ...minorData, guardianTypedSignature: e.target.value })}
                          placeholder="e.g. Jonathan O. Edoh, Esq."
                          className="w-full px-3 py-2 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                        />
                      </div>

                      <SignaturePad
                        label="Guardian Digital Signature Pad"
                        sublabel="Sign with finger or mouse"
                        required
                        value={minorData.guardianCanvasSignature}
                        onChange={(sig) => setMinorData({ ...minorData, guardianCanvasSignature: sig })}
                      />
                    </div>

                  </div>

                  {/* Submission Date Stamp */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-mono bg-[#0D0D0D] p-3 rounded-lg border border-[#292314]">
                    <span>REGISTRATION TIMESTAMP:</span>
                    <span className="text-[#FFD000] font-bold">SEASON INTAKE / 2026</span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ========================================================================= */}
          {/* PATHWAY B: SENIOR / ADULT REGISTRATION (AGE 18+) */}
          {/* ========================================================================= */}
          {pathway === 'senior' && (
            <>
              {/* STEP 1: Senior Player Identification & Athletic Record */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="border-b border-[#282112] pb-3">
                    <span className="text-xs font-mono text-[#FFD000] uppercase font-bold">
                      Section 1 of 4 • Senior Player Identification & Athletic Record
                    </span>
                    <h3 className="font-display text-xl font-bold text-white mt-1">
                      Adult Athlete Registration & FIFA TMS Credentials
                    </h3>
                  </div>

                  {/* Photo Upload Box with Real-time 3:4 Canvas Cropper */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#0D0D0D] border border-[#2B2513] flex flex-col sm:flex-row items-center gap-5">
                    <div className="relative w-28 h-36 rounded-lg border-2 border-[#FFD000]/60 overflow-hidden bg-[#181818] flex items-center justify-center shrink-0 shadow-lg group">
                      {seniorData.photoUrl ? (
                        <>
                          <img src={seniorData.photoUrl} alt="Passport preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity p-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleReCrop('senior')}
                              className="px-2.5 py-1 text-[10px] font-bold text-black bg-[#FFD000] rounded hover:bg-[#E6BC00] flex items-center gap-1"
                            >
                              <Crop className="w-3 h-3" />
                              Re-align
                            </button>
                          </div>
                          <span className="absolute bottom-1 right-1 text-[8px] font-mono uppercase bg-black/80 text-[#FFD000] px-1 py-0.5 rounded border border-[#3A331A]">
                            3:4 Ratio
                          </span>
                        </>
                      ) : (
                        <div className="text-center p-2 text-neutral-500">
                          <Camera className="w-6 h-6 mx-auto mb-1 opacity-50 text-[#FFD000]" />
                          <span className="text-[9px] uppercase font-mono block text-neutral-400">3:4 Passport</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 text-center sm:text-left flex-1">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <label className="text-xs font-bold text-white block">
                          Recent Passport Photo Upload (3:4 Ratio)
                        </label>
                        <span className="text-[10px] font-mono uppercase bg-[#28210F] text-[#FFD000] px-2 py-0.5 rounded border border-[#443812]">
                          Interactive 3:4 Cropper
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-normal">
                        Upload an official passport photo with red or white background. The real-time canvas cropper will open to ensure exact 3:4 aspect ratio alignment for FIFA Connect and FCT FA licensing.
                      </p>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-200 bg-[#222] hover:bg-[#2e2e2e] border border-[#3A331A] rounded-lg cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5 text-[#FFD000]" />
                          <span>{seniorData.photoUrl ? 'Replace Photo' : 'Select Photo to Crop'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(e, 'senior')}
                            className="hidden"
                          />
                        </label>

                        {seniorData.photoUrl && (
                          <button
                            type="button"
                            onClick={() => handleReCrop('senior')}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#FFD000] bg-[#1E190A] hover:bg-[#2B230C] border border-[#FFD000]/40 rounded-lg transition-colors"
                          >
                            <Crop className="w-3.5 h-3.5" />
                            <span>Adjust 3:4 Crop</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Biodata & Identification */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-neutral-200">
                        Full Legal Name (as in International Passport / NIN) <span className="text-[#FFD000]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={seniorData.fullName}
                        onChange={(e) => setSeniorData({ ...seniorData, fullName: e.target.value })}
                        placeholder="e.g. Victor Oladipo Edoh"
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-200">
                        Date of Birth <span className="text-[#FFD000]">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={seniorData.dateOfBirth}
                        onChange={(e) => handleAgeCheck(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-200">Gender</label>
                      <select
                        value={seniorData.gender}
                        onChange={(e) => setSeniorData({ ...seniorData, gender: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-200">
                        National ID Number (NIN) <span className="text-[#FFD000]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={seniorData.nin}
                        onChange={(e) => setSeniorData({ ...seniorData, nin: e.target.value })}
                        placeholder="11-digit NIN (e.g. 10293847561)"
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-200">
                        Valid International Passport No. (Optional)
                      </label>
                      <input
                        type="text"
                        value={seniorData.passportNumber}
                        onChange={(e) => setSeniorData({ ...seniorData, passportNumber: e.target.value })}
                        placeholder="e.g. A12345678 (Required for TMS transfer)"
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-200">
                        Direct Telephone Number <span className="text-[#FFD000]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={seniorData.phoneNumber}
                        onChange={(e) => setSeniorData({ ...seniorData, phoneNumber: e.target.value })}
                        placeholder="e.g. +234 802 000 0000"
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-200">
                        Player Email Address <span className="text-[#FFD000]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={seniorData.emailAddress}
                        onChange={(e) => setSeniorData({ ...seniorData, emailAddress: e.target.value })}
                        placeholder="e.g. athlete@example.com"
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-neutral-200">
                        Residential Address (Abuja / FCT or Home State) <span className="text-[#FFD000]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={seniorData.residentialAddress}
                        onChange={(e) => setSeniorData({ ...seniorData, residentialAddress: e.target.value })}
                        placeholder="e.g. Mabushi Ultra Modern Market Axis, Jahi, Abuja"
                        className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>
                  </div>

                  {/* Club Status Radio */}
                  <div className="pt-4 border-t border-[#242013] space-y-2">
                    <label className="text-xs font-mono text-[#FFD000] uppercase font-bold block">
                      Current Athletic & Contractual Status
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                      {(['Free Agent', 'Amateur', 'Academy Trainee', 'Contracted'] as const).map((status) => (
                        <label
                          key={status}
                          className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                            seniorData.clubStatus === status
                              ? 'bg-[#221C0E] border-[#FFD000] text-white shadow-sm ring-1 ring-[#FFD000]'
                              : 'bg-[#0D0D0D] border-[#2C2616] text-neutral-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold">{status}</span>
                            <input
                              type="radio"
                              name="clubStatus"
                              checked={seniorData.clubStatus === status}
                              onChange={() => setSeniorData({ ...seniorData, clubStatus: status })}
                              className="accent-[#FFD000]"
                            />
                          </div>
                          <span className="text-[10px] text-neutral-500 font-mono mt-1">
                            {status === 'Free Agent' ? 'No Contractual Tie' : status === 'Amateur' ? 'Uncompensated' : status === 'Academy Trainee' ? 'Developmental' : 'Active Agreement'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Athletic Positions & Specs */}
                  <div className="pt-4 border-t border-[#242013] space-y-4">
                    <span className="text-xs font-mono text-[#FFD000] uppercase font-bold block">
                      Athletic Positioning & Physical Specs
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-200">Primary Position</label>
                        <select
                          value={seniorData.primaryPosition}
                          onChange={(e) => setSeniorData({ ...seniorData, primaryPosition: e.target.value })}
                          className="w-full px-3 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                        >
                          {FOOTBALL_POSITIONS.map((pos) => (
                            <option key={pos.value} value={pos.value}>{pos.label}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-200">Secondary Position</label>
                        <select
                          value={seniorData.secondaryPosition}
                          onChange={(e) => setSeniorData({ ...seniorData, secondaryPosition: e.target.value })}
                          className="w-full px-3 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                        >
                          {FOOTBALL_POSITIONS.map((pos) => (
                            <option key={pos.value} value={pos.value}>{pos.label}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-200">Preferred Foot</label>
                        <select
                          value={seniorData.preferredFoot}
                          onChange={(e) => setSeniorData({ ...seniorData, preferredFoot: e.target.value as any })}
                          className="w-full px-3 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                        >
                          <option value="Right">Right</option>
                          <option value="Left">Left</option>
                          <option value="Both">Both (Ambidextrous)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-200">Preferred Hand</label>
                        <select
                          value={seniorData.preferredHand}
                          onChange={(e) => setSeniorData({ ...seniorData, preferredHand: e.target.value as any })}
                          className="w-full px-3 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                        >
                          <option value="Right">Right</option>
                          <option value="Left">Left</option>
                          <option value="Both">Both</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-200">Height (cm)</label>
                        <input
                          type="number"
                          value={seniorData.heightCm}
                          onChange={(e) => setSeniorData({ ...seniorData, heightCm: e.target.value })}
                          placeholder="e.g. 182"
                          className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-200">Weight (kg)</label>
                        <input
                          type="number"
                          value={seniorData.weightKg}
                          onChange={(e) => setSeniorData({ ...seniorData, weightKg: e.target.value })}
                          placeholder="e.g. 74"
                          className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Previous Club Record & Surgical History */}
                  <div className="pt-4 border-t border-[#242013] space-y-4">
                    <span className="text-xs font-mono text-[#FFD000] uppercase font-bold block">
                      Previous Club Track Record & Medical History
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-xs font-semibold text-neutral-200">Previous Club / Academy Name</label>
                        <input
                          type="text"
                          value={seniorData.previousClubName}
                          onChange={(e) => setSeniorData({ ...seniorData, previousClubName: e.target.value })}
                          placeholder="e.g. Abuja Stars FC, Plateau United Feeders"
                          className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-200">Period / Years Active</label>
                        <input
                          type="text"
                          value={seniorData.previousClubPeriod}
                          onChange={(e) => setSeniorData({ ...seniorData, previousClubPeriod: e.target.value })}
                          placeholder="e.g. 2023 - 2025"
                          className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-200">Pre-existing Injury History (Disclose all)</label>
                        <input
                          type="text"
                          value={seniorData.preExistingInjuries}
                          onChange={(e) => setSeniorData({ ...seniorData, preExistingInjuries: e.target.value })}
                          placeholder="e.g. None, or Past ACL reconstruction / Hamstring"
                          className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-200">Surgical History Disclosure</label>
                        <input
                          type="text"
                          value={seniorData.surgicalHistory}
                          onChange={(e) => setSeniorData({ ...seniorData, surgicalHistory: e.target.value })}
                          placeholder="e.g. None, or Knee arthroscopy (2024)"
                          className="w-full px-3.5 py-2.5 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD000]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Emergency Contact & Next of Kin */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="border-b border-[#282112] pb-3">
                    <span className="text-xs font-mono text-[#FFD000] uppercase font-bold">
                      Section 2 of 4 • Emergency Contact & Next of Kin
                    </span>
                    <h3 className="font-display text-xl font-bold text-white mt-1">
                      Emergency Contacts & Next of Kin Particulars
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Emergency Contact */}
                    <div className="p-4 rounded-xl bg-[#0E0E0E] border border-[#2B2514] space-y-4">
                      <span className="text-xs font-mono text-[#FFD000] uppercase font-bold block">
                        Primary Emergency Contact <span className="text-[#FFD000]">*</span>
                      </span>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-neutral-300">Emergency Contact Full Name</label>
                        <input
                          type="text"
                          required
                          value={seniorData.emergencyContactName}
                          onChange={(e) => setSeniorData({ ...seniorData, emergencyContactName: e.target.value })}
                          placeholder="e.g. Pastor David Edoh"
                          className="w-full px-3.5 py-2 bg-[#0A0A0A] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-neutral-300">Relationship to Athlete</label>
                        <input
                          type="text"
                          required
                          value={seniorData.emergencyContactRelationship}
                          onChange={(e) => setSeniorData({ ...seniorData, emergencyContactRelationship: e.target.value })}
                          placeholder="e.g. Uncle / Brother"
                          className="w-full px-3.5 py-2 bg-[#0A0A0A] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-neutral-300">Emergency Contact Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={seniorData.emergencyContactPhone}
                          onChange={(e) => setSeniorData({ ...seniorData, emergencyContactPhone: e.target.value })}
                          placeholder="e.g. +234 803 555 1234"
                          className="w-full px-3.5 py-2 bg-[#0A0A0A] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                        />
                      </div>
                    </div>

                    {/* Next of Kin */}
                    <div className="p-4 rounded-xl bg-[#0E0E0E] border border-[#2B2514] space-y-4">
                      <span className="text-xs font-mono text-[#FFD000] uppercase font-bold block">
                        Next of Kin Particulars <span className="text-[#FFD000]">*</span>
                      </span>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-neutral-300">Next of Kin Full Name</label>
                        <input
                          type="text"
                          required
                          value={seniorData.nextOfKinName}
                          onChange={(e) => setSeniorData({ ...seniorData, nextOfKinName: e.target.value })}
                          placeholder="e.g. Mrs. Blessing Edoh"
                          className="w-full px-3.5 py-2 bg-[#0A0A0A] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-neutral-300">Relationship to Athlete</label>
                        <input
                          type="text"
                          required
                          value={seniorData.nextOfKinRelationship}
                          onChange={(e) => setSeniorData({ ...seniorData, nextOfKinRelationship: e.target.value })}
                          placeholder="e.g. Mother / Spouse"
                          className="w-full px-3.5 py-2 bg-[#0A0A0A] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-neutral-300">Next of Kin Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={seniorData.nextOfKinPhone}
                          onChange={(e) => setSeniorData({ ...seniorData, nextOfKinPhone: e.target.value })}
                          placeholder="e.g. +234 809 777 8899"
                          className="w-full px-3.5 py-2 bg-[#0A0A0A] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Senior Athlete Statutory Covenant (9 Clauses) */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#282112] pb-3">
                    <div>
                      <span className="text-xs font-mono text-[#FFD000] uppercase font-bold">
                        Section 3 of 4 • Senior Athlete Statutory Covenant
                      </span>
                      <h3 className="font-display text-xl font-bold text-white mt-1">
                        9-Clause Senior Athlete Regulatory Agreement
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAcceptAllClauses('senior')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-black bg-[#FFD000] hover:bg-[#E6BC00] rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Accept All 9 Clauses</span>
                    </button>
                  </div>

                  <p className="text-xs text-neutral-300">
                    Review each statutory clause below. Senior athletes are bound by the anti-doping (WADA), anti-match manipulation, and FIFA TMS transfer compliance protocols.
                  </p>

                  <div className="space-y-3">
                    {SENIOR_STATUTORY_CLAUSES.map((clause, index) => {
                      const isAccepted = seniorData.acceptedClauses[index];
                      const isExpanded = expandedClauses[clause.id];

                      return (
                        <div
                          key={clause.id}
                          className={`rounded-xl border transition-all ${
                            isAccepted ? 'bg-[#181818] border-[#FFD000]/60' : 'bg-[#111111] border-[#2C2616]'
                          }`}
                        >
                          <div className="p-4 flex items-start justify-between gap-3">
                            <label className="flex items-start gap-3 cursor-pointer flex-1">
                              <input
                                type="checkbox"
                                checked={isAccepted}
                                onChange={() => handleClauseCheck(index, 'senior')}
                                className="mt-1 w-4 h-4 accent-[#FFD000] rounded shrink-0 cursor-pointer"
                              />
                              <div>
                                <div className="font-bold text-white text-sm">
                                  {clause.title}
                                </div>
                                <div className="text-xs text-neutral-400 mt-0.5">
                                  {clause.summary}
                                </div>
                              </div>
                            </label>

                            <button
                              type="button"
                              onClick={() => toggleClauseExpand(clause.id)}
                              className="p-1.5 text-neutral-400 hover:text-white rounded bg-[#1C1C1C] shrink-0"
                              aria-label="Expand legal text"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4 text-[#FFD000]" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>

                          {isExpanded && (
                            <div className="px-4 pb-4 pt-1 border-t border-[#231F14] text-xs text-neutral-300 leading-relaxed bg-[#0B0B0B] rounded-b-xl">
                              {clause.fullLegalText}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: Legal Attestation & Verification Covenant */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="border-b border-[#282112] pb-3">
                    <span className="text-xs font-mono text-[#FFD000] uppercase font-bold">
                      Section 4 of 4 • Legal Attestation & Digital Execution
                    </span>
                    <h3 className="font-display text-xl font-bold text-white mt-1">
                      Athlete Integrity Covenant & Digital Signature
                    </h3>
                  </div>

                  {/* Mandatory Checkboxes */}
                  <div className="space-y-3 p-4 rounded-xl bg-[#0D0D0D] border border-[#2D2716]">
                    <label className="flex items-start gap-3 cursor-pointer text-xs text-neutral-200">
                      <input
                        type="checkbox"
                        required
                        checked={seniorData.legalAttestationAccepted}
                        onChange={(e) => setSeniorData({ ...seniorData, legalAttestationAccepted: e.target.checked })}
                        className="mt-0.5 w-4 h-4 accent-[#FFD000] rounded shrink-0"
                      />
                      <span>
                        <strong className="text-white">Player Legal Attestation & Integrity Covenant:</strong> I declare on my honor that all information provided is accurate and truthful. I am an adult athlete (18+) under no active ban or suspension by the FCT FA, NFF, or FIFA. I agree to abide by the disciplinary rules of Edoh Sport Academy.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer text-xs text-neutral-200">
                      <input
                        type="checkbox"
                        required
                        checked={seniorData.fifaVerificationAuthorized}
                        onChange={(e) => setSeniorData({ ...seniorData, fifaVerificationAuthorized: e.target.checked })}
                        className="mt-0.5 w-4 h-4 accent-[#FFD000] rounded shrink-0"
                      />
                      <span>
                        <strong className="text-white">FIFA Connect & NFF Registry Authorization:</strong> I explicitly authorize Edoh Sport Academy to verify and register my electronic player passport on the FIFA Connect and TMS platforms, and to represent my athletic registration before the FCT Football Association.
                      </span>
                    </label>
                  </div>

                  {/* Signature Box */}
                  <div className="p-4 rounded-xl bg-[#111111] border border-[#2E2717] space-y-4">
                    <div className="text-xs font-mono text-[#FFD000] uppercase font-bold">
                      Senior Athlete Digital Signature <span className="text-[#FFD000]">*</span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-neutral-300">
                        Athlete Full Typed Signature <span className="text-[#FFD000]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={seniorData.playerTypedSignature}
                        onChange={(e) => setSeniorData({ ...seniorData, playerTypedSignature: e.target.value })}
                        placeholder="e.g. Victor O. Edoh"
                        className="w-full px-3 py-2 bg-[#0D0D0D] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000]"
                      />
                    </div>

                    <SignaturePad
                      label="Athlete Canvas Signature"
                      sublabel="Sign with finger, stylus, or cursor"
                      required
                      value={seniorData.playerCanvasSignature}
                      onChange={(sig) => setSeniorData({ ...seniorData, playerCanvasSignature: sig })}
                    />
                  </div>

                  {/* Submission Date Stamp */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-mono bg-[#0D0D0D] p-3 rounded-lg border border-[#292314]">
                    <span>REGISTRATION TIMESTAMP:</span>
                    <span className="text-[#FFD000] font-bold">SEASON INTAKE / 2026</span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Form Navigation Controls */}
          <div className="pt-6 border-t border-[#262012] flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white bg-[#1C1C1C] hover:bg-[#252525] rounded-xl border border-[#3A331A] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-black bg-[#FFD000] hover:bg-[#E6BC00] rounded-xl shadow-lg transition-all"
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3 text-xs sm:text-sm font-extrabold text-black bg-[#FFD000] hover:bg-[#E6BC00] rounded-xl shadow-[0_0_24px_rgba(255,208,0,0.35)] transition-all"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Submit & Generate Official Slip</span>
              </button>
            )}
          </div>

        </form>

        {/* Real-Time Canvas 3:4 Passport Image Cropper Modal */}
        <ImageCropperModal
          isOpen={cropperOpen}
          imageSrc={cropperImageSrc}
          onCropComplete={handleCropComplete}
          onCancel={() => {
            setCropperOpen(false);
            setCropperImageSrc(null);
          }}
          title={
            cropperTarget === 'minor'
              ? 'Align & Crop Minor Passport Photo (3:4 Ratio)'
              : 'Align & Crop Senior Athlete Passport Photo (3:4 Ratio)'
          }
        />

      </div>
    </section>
  );
};
