export type RegistrationPathway = 'minor' | 'senior';

export interface MinorFormData {
  // Section 1: Minor Particulars
  regId: string;
  fullName: string;
  dateOfBirth: string;
  age: number | '';
  gender: 'Male' | 'Female';
  ageCategory: 'Under-10' | 'Under-13' | 'Under-15' | 'Under-17';
  nationality: string;
  stateOfOrigin: string;
  lgaOfOrigin: string;
  currentSchool: string;
  currentClass: string;
  ninOrBirthCert: string;
  residentialAddress: string;
  primaryPosition: string;
  secondaryPosition: string;
  preferredFoot: 'Right' | 'Left' | 'Both';
  preferredHand: 'Right' | 'Left' | 'Both';
  heightCm: string;
  weightKg: string;
  previousTeamName: string;
  previousTeamYears: string;
  previousCoachContact: string;
  medicalConditions: string[];
  medicalNotes: string;
  photoUrl: string;

  // Section 2: Parent / Legal Guardian Details
  guardianFullName: string;
  guardianRelationship: 'Father' | 'Mother' | 'Legal Guardian';
  guardianPrimaryPhone: string;
  guardianAltPhone: string;
  guardianEmail: string;
  guardianOccupation: string;
  guardianAddress: string;

  // Section 3: Statutory Clauses Acknowledgement
  acceptedClauses: boolean[];

  // Section 4: Attestation & Digital Signatures
  guardianAttestationAccepted: boolean;
  medicalConsentAccepted: boolean;
  minorTypedSignature: string;
  minorCanvasSignature: string;
  guardianTypedSignature: string;
  guardianCanvasSignature: string;
  submissionDate: string;
}

export interface SeniorFormData {
  // Section 1: Player Identification & Athletic Record
  regId: string;
  fullName: string;
  dateOfBirth: string;
  age: number | '';
  gender: 'Male' | 'Female';
  nationality: string;
  stateOfOrigin: string;
  lgaOfOrigin: string;
  nin: string;
  passportNumber: string;
  phoneNumber: string;
  emailAddress: string;
  residentialAddress: string;
  clubStatus: 'Free Agent' | 'Amateur' | 'Academy Trainee' | 'Contracted';
  primaryPosition: string;
  secondaryPosition: string;
  preferredFoot: 'Right' | 'Left' | 'Both';
  preferredHand: 'Right' | 'Left' | 'Both';
  heightCm: string;
  weightKg: string;
  previousClubName: string;
  previousClubPeriod: string;
  previousCoachContact: string;
  pastCompetitions: string;
  preExistingInjuries: string;
  surgicalHistory: string;
  photoUrl: string;

  // Section 2: Emergency Contact & Next of Kin
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  nextOfKinName: string;
  nextOfKinRelationship: string;
  nextOfKinPhone: string;

  // Section 3: Senior Athlete Statutory Covenant
  acceptedClauses: boolean[];

  // Section 4: Legal Attestation & Verification Covenant
  legalAttestationAccepted: boolean;
  fifaVerificationAuthorized: boolean;
  playerTypedSignature: string;
  playerCanvasSignature: string;
  submissionDate: string;
}

export interface RegistrationRecord {
  regId: string;
  type: 'minor' | 'senior';
  fullName: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  categoryOrStatus: string;
  phone: string;
  email: string;
  primaryPosition: string;
  photoUrl: string;
  submittedAt: string;
  verificationHash: string;
  data: MinorFormData | SeniorFormData;
}
