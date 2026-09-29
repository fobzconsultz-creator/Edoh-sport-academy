export interface StatutoryClause {
  id: number;
  title: string;
  summary: string;
  fullLegalText: string;
  category: 'Minor' | 'Senior';
}

export const YOUTH_STATUTORY_CLAUSES: StatutoryClause[] = [
  {
    id: 1,
    title: "1. Academy Rules & Regulations",
    summary: "Safeguarding, technical drills, and academy standard operating protocols.",
    fullLegalText: "The minor player and parent/legal guardian agree to be fully governed by the Constitution, Safeguarding Code, and Technical Regulations of Edoh Sport Academy. The minor shall adhere to all coaching instructions, technical drills, and training camp guidelines set forth by the Technical Board. The Academy reserves the right to prescribe nutritional, physical, and tactical standards aligned with international best practices in youth football development.",
    category: 'Minor'
  },
  {
    id: 2,
    title: "2. Player Code of Conduct",
    summary: "Zero tolerance for bullying, indiscipline, truancy, or unsporting conduct.",
    fullLegalText: "Edoh Sport Academy maintains zero tolerance for unsportsmanlike behavior, bullying, physical violence, verbal abuse, disrespect to officials, match-fixing insinuations, or any conduct prejudicial to the Academy's reputation. Players must maintain exemplary behavior on and off the pitch, upholding the Academy's motto: Discover, Develop, Promote.",
    category: 'Minor'
  },
  {
    id: 3,
    title: "3. Training Attendance Agreement",
    summary: "Mandatory punctuality, unexcused absence policy, and school priority notice.",
    fullLegalText: "Attendance at scheduled training sessions, theoretical tactical classes, and official fixtures is mandatory. Unexcused absenteeism exceeding three (3) consecutive sessions may result in suspension from matchday squads. Academic education remains paramount; the Academy mandates that school hours must be respected, and satisfactory academic progress reports may be requested periodically.",
    category: 'Minor'
  },
  {
    id: 4,
    title: "4. Disciplinary Policy Acknowledgement",
    summary: "Progressive sanctions: verbal warning, formal reprimand, suspension, and expulsion.",
    fullLegalText: "Violations of academy rules are subject to progressive disciplinary actions: (a) Verbal warning and counseling; (b) Formal written reprimand to parent/guardian; (c) Squad match suspension; and (d) Permanent expulsion for severe misconduct, gross insubordination, or illegal substance possession. Decisions of the Disciplinary Panel shall be binding.",
    category: 'Minor'
  },
  {
    id: 5,
    title: "5. Injury & Risk Acknowledgement",
    summary: "Liability strictly limited to acute field injuries sustained during sanctioned sessions.",
    fullLegalText: "Football is an active contact sport involving inherent physical risks. While the Academy employs certified medical first-aid staff and implements strict pitch-safety protocols, the Academy's institutional liability is strictly confined to acute, direct pitch injuries sustained during supervised, officially sanctioned sessions. Injuries sustained outside Academy auspices or through undisclosed pre-existing conditions are excluded.",
    category: 'Minor'
  },
  {
    id: 6,
    title: "6. Data Privacy Notice & Consent",
    summary: "Lawful processing of player biometric data on FIFA Connect, TMS, and NFF registries.",
    fullLegalText: "In accordance with Nigeria Data Protection Regulation (NDPR) and FIFA Regulations on the Status and Transfer of Players (RSTP), the guardian explicitly consents to the collection, electronic storage, and administrative processing of the minor's biometric data, passport photographs, athletic stats, and personal records for registration with the FCT Football Association, Nigeria Football Federation (NFF), and FIFA Connect / TMS.",
    category: 'Minor'
  },
  {
    id: 7,
    title: "7. Emergency Medical Authorization",
    summary: "Consent for first aid, emergency paramedic intervention, and authorized hospital treatment.",
    fullLegalText: "In the event of an acute medical emergency, severe injury, or trauma during training, transit, or competition where immediate parental contact is unreachable, the parent/guardian hereby authorizes Edoh Sport Academy medical personnel and designated chaperones to administer emergency first aid and transfer the minor to an accredited medical facility for urgent medical evaluation or surgical stabilization.",
    category: 'Minor'
  },
  {
    id: 8,
    title: "8. Media & Photography Consent",
    summary: "Worldwide match footage, photography, and scouting promotion broadcast rights.",
    fullLegalText: "The guardian grants Edoh Sport Academy non-exclusive, royalty-free authorization to capture photographs, high-definition match footage, and training video of the minor for scouting dossiers, technical performance analysis, official academy social media, match broadcasting, and talent marketing to international professional clubs and scouts.",
    category: 'Minor'
  },
  {
    id: 9,
    title: "9. Academy Property & Equipment Agreement",
    summary: "Fiduciary custody, proper maintenance, and return of official kits, balls, and gear.",
    fullLegalText: "All official match kits, travel apparel, training vests, GPS tracking units, and equipment issued remain the proprietary property of Edoh Sport Academy. Players and guardians are responsible for their prudent maintenance, cleanliness, and safeguarding. Damaged or lost gear resulting from negligence must be replaced or reimbursed at prevailing replacement cost.",
    category: 'Minor'
  }
];

export const SENIOR_STATUTORY_CLAUSES: StatutoryClause[] = [
  {
    id: 1,
    title: "1. Academy Rules & Regulations",
    summary: "Strict adherence to Edoh Sport Academy, FCT FA, NFF, and FIFA Statutes.",
    fullLegalText: "The Senior Athlete affirms complete compliance with the Constitution and Regulations of Edoh Sport Academy, the FCT Football Association, the Nigeria Football Federation (NFF), and the Federation Internationale de Football Association (FIFA). The athlete confirms they are under no unexpired disciplinary ban or contractual impediment that would prejudice their registration.",
    category: 'Senior'
  },
  {
    id: 2,
    title: "2. Player Code of Conduct",
    summary: "Anti-betting, anti-doping (WADA), match integrity, and professional discipline.",
    fullLegalText: "The athlete commits to supreme sportsmanship and uncompromised athletic integrity. The player is expressly prohibited from placing bets directly or indirectly on any football competition, engaging in match manipulation, utilizing substances on the WADA Prohibited List, or engaging in acts of violence or discrimination. Any infraction triggers immediate termination and notification to the NFF Integrity Unit.",
    category: 'Senior'
  },
  {
    id: 3,
    title: "3. Training Attendance Agreement",
    summary: "Mandatory 20-minute pre-session arrival, curfew adherence, and allowance surcharges.",
    fullLegalText: "Daily punctuality is an immutable contractual obligation. Senior athletes must report to the dressing room at least twenty (20) minutes before scheduled training and match drills. Unexcused absence or chronic unpunctuality shall incur statutory performance allowance deductions, reserve benching, or disciplinary demotion.",
    category: 'Senior'
  },
  {
    id: 4,
    title: "4. Disciplinary Policy Acknowledgement",
    summary: "Progressive fines, match suspensions, contract termination, and FA notification.",
    fullLegalText: "The Academy enforces a codified disciplinary tariff. Insubordination to coaches, reckless red cards, unauthorized media commentary, or unsanctioned club trials will result in immediate financial surcharges, multi-match suspension, or unilateral cancellation of trainee status. Formal notification may be lodged with the FCT FA and national player registry.",
    category: 'Senior'
  },
  {
    id: 5,
    title: "5. Injury & Risk Acknowledgement",
    summary: "Acute on-pitch athletic injury coverage; external unapproved matches excluded.",
    fullLegalText: "The athlete acknowledges that elite football carries physical injury risks. Edoh Sport Academy provides acute first-line medical response and designated specialist referral for injuries sustained strictly during official academy matches, sanctioned training, or official academy travel. Injuries sustained during unapproved Sunday leagues, kickabouts, or non-academy matches are strictly excluded from institutional support.",
    category: 'Senior'
  },
  {
    id: 6,
    title: "6. Data Privacy Notice & Consent",
    summary: "Electronic recording and transfer processing on FIFA Connect and TMS global portals.",
    fullLegalText: "The athlete grants explicit consent for their personal data, passport biodata, performance tracking metrics, and transfer clearance records to be processed, stored, and transmitted electronically via the FIFA Connect Player Passport, FIFA TMS (Transfer Matching System), and NFF Digital Licensing System in accordance with the NDPR and international football statutes.",
    category: 'Senior'
  },
  {
    id: 7,
    title: "7. Emergency Medical Authorization",
    summary: "Full authorization for emergency medical, diagnostic imaging, and surgical procedures.",
    fullLegalText: "In the event of acute traumatic injury, severe trauma, or urgent medical condition on the pitch or during tour travel, the athlete authorizes the Academy's Chief Medical Officer and hospital emergency surgical teams to administer necessary medical diagnostics, anesthetics, and surgical interventions where delay poses serious harm to life or athletic continuity.",
    category: 'Senior'
  },
  {
    id: 8,
    title: "8. Media & Photography Consent",
    summary: "Global promotional, television broadcast, streaming, and scouting showcase rights.",
    fullLegalText: "The athlete irrevocably grants Edoh Sport Academy the worldwide right to record, broadcast, photograph, and commercialize their athletic persona, match highlights, and tactical data for scout portfolios, agency marketing to international clubs, streaming platforms, and official Academy media channels without supplementary royalty claims.",
    category: 'Senior'
  },
  {
    id: 9,
    title: "9. Academy Property & Equipment Agreement",
    summary: "Fiduciary custody for official kits, GPS heart-rate monitors, and facility assets.",
    fullLegalText: "The athlete accepts personal fiduciary custody for all issued equipment, including match kits, tracksuits, winter jackets, and high-value GPS tracking sensors. All property must be returned in good condition upon request or end of season. Unaccounted equipment will be deducted directly from stipends or invoiced prior to the issuance of international transfer certificates (ITC).",
    category: 'Senior'
  }
];

export const FOOTBALL_POSITIONS = [
  { value: 'GK', label: 'Goalkeeper (GK)' },
  { value: 'CB', label: 'Centre-Back (CB)' },
  { value: 'LB', label: 'Left-Back (LB)' },
  { value: 'RB', label: 'Right-Back (RB)' },
  { value: 'LWB', label: 'Left Wing-Back (LWB)' },
  { value: 'RWB', label: 'Right Wing-Back (RWB)' },
  { value: 'DM', label: 'Defensive Midfielder (DM)' },
  { value: 'CM', label: 'Central Midfielder (CM)' },
  { value: 'AM', label: 'Attacking Midfielder (AM)' },
  { value: 'LM', label: 'Left Midfielder (LM)' },
  { value: 'RM', label: 'Right Midfielder (RM)' },
  { value: 'LW', label: 'Left Winger (LW)' },
  { value: 'RW', label: 'Right Winger (RW)' },
  { value: 'SS', label: 'Second Striker (SS)' },
  { value: 'CF', label: 'Centre-Forward / Striker (CF/ST)' },
];

export const NIGERIAN_STATES = [
  'FCT Abuja', 'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
  'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
  'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'Non-Nigerian'
];

export const FCT_LGAS = [
  'Abuja Municipal (AMAC)', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali', 'Abaji'
];
