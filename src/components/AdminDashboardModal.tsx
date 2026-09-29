import React, { useState, useMemo } from 'react';
import {
  Lock,
  Unlock,
  Shield,
  Search,
  Download,
  Filter,
  Users,
  Eye,
  Trash2,
  X,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  LogOut,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Trophy,
  KeyRound,
  ArrowUpDown,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { RegistrationRecord } from '../types';
import { CrestLogo } from './CrestLogo';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: RegistrationRecord[];
  onDeleteRecord?: (regId: string) => void;
  onViewRecordSlip: (record: RegistrationRecord) => void;
}

// Master Academy Board Access Passcode
const DEFAULT_ADMIN_PASSCODE = 'edoh2026admin';

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  records,
  onDeleteRecord,
  onViewRecordSlip,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('edoh_admin_authenticated') === 'true';
    } catch {
      return false;
    }
  });
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [pathwayFilter, setPathwayFilter] = useState<'all' | 'minor' | 'senior'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [positionFilter, setPositionFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name' | 'age'>('newest');

  // Detailed Player Inspect Drawer
  const [inspectRecord, setInspectRecord] = useState<RegistrationRecord | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === DEFAULT_ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      setAuthError(null);
      try {
        sessionStorage.setItem('edoh_admin_authenticated', 'true');
      } catch {
        // session storage fallback
      }
    } else {
      setAuthError('Incorrect Board Passcode. Access restricted to authorized secretariat.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('');
    try {
      sessionStorage.removeItem('edoh_admin_authenticated');
    } catch {
      // ignore
    }
  };

  // Filtered & Sorted Records
  const filteredRecords = useMemo(() => {
    return records
      .filter((rec) => {
        // Search term
        const query = searchTerm.toLowerCase().trim();
        const matchesQuery =
          !query ||
          rec.fullName.toLowerCase().includes(query) ||
          rec.regId.toLowerCase().includes(query) ||
          rec.phone.toLowerCase().includes(query) ||
          rec.email.toLowerCase().includes(query) ||
          rec.primaryPosition.toLowerCase().includes(query) ||
          rec.categoryOrStatus.toLowerCase().includes(query);

        // Pathway
        const matchesPathway = pathwayFilter === 'all' || rec.type === pathwayFilter;

        // Category
        const matchesCategory =
          categoryFilter === 'all' ||
          rec.categoryOrStatus.toLowerCase().includes(categoryFilter.toLowerCase());

        // Position
        const matchesPosition =
          positionFilter === 'all' ||
          rec.primaryPosition.toLowerCase() === positionFilter.toLowerCase();

        return matchesQuery && matchesPathway && matchesCategory && matchesPosition;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return b.submittedAt.localeCompare(a.submittedAt);
        if (sortBy === 'oldest') return a.submittedAt.localeCompare(b.submittedAt);
        if (sortBy === 'name') return a.fullName.localeCompare(b.fullName);
        if (sortBy === 'age') return a.age - b.age;
        return 0;
      });
  }, [records, searchTerm, pathwayFilter, categoryFilter, positionFilter, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const total = records.length;
    const minors = records.filter((r) => r.type === 'minor').length;
    const seniors = records.filter((r) => r.type === 'senior').length;
    const males = records.filter((r) => r.gender.toLowerCase() === 'male').length;
    const females = records.filter((r) => r.gender.toLowerCase() === 'female').length;

    return { total, minors, seniors, males, females };
  }, [records]);

  // CSV Export Generator
  const handleExportCSV = () => {
    if (filteredRecords.length === 0) {
      setExportNotice('No records matching current filter to export.');
      setTimeout(() => setExportNotice(null), 3000);
      return;
    }

    const headers = [
      'Registration ID',
      'Pathway',
      'Full Name',
      'Date of Birth',
      'Age',
      'Gender',
      'Category / Status',
      'Primary Position',
      'Telephone Number',
      'Email Address',
      'Guardian / Kin Name',
      'Guardian / Kin Phone',
      'Guardian / Kin Relationship',
      'State of Origin',
      'Submission Timestamp',
      'FIFA Verification Hash',
    ];

    const rows = filteredRecords.map((r) => {
      const isMinor = r.type === 'minor';
      const minorData = isMinor ? (r.data as any) : null;
      const seniorData = !isMinor ? (r.data as any) : null;

      const guardianName = isMinor
        ? minorData?.guardianFullName || 'N/A'
        : seniorData?.nextOfKinName || seniorData?.emergencyContactName || 'N/A';

      const guardianPhone = isMinor
        ? minorData?.guardianPrimaryPhone || 'N/A'
        : seniorData?.nextOfKinPhone || seniorData?.emergencyContactPhone || 'N/A';

      const guardianRel = isMinor
        ? minorData?.guardianRelationship || 'Parent/Guardian'
        : seniorData?.nextOfKinRelationship || 'Next of Kin';

      const state = isMinor
        ? minorData?.stateOfOrigin || 'FCT/Nigeria'
        : seniorData?.stateOfOrigin || 'FCT/Nigeria';

      return [
        `"${r.regId}"`,
        `"${isMinor ? 'Minor Youth (U18)' : 'Senior Squad (18+)'}"`,
        `"${r.fullName.replace(/"/g, '""')}"`,
        `"${r.dateOfBirth}"`,
        `"${r.age}"`,
        `"${r.gender}"`,
        `"${r.categoryOrStatus}"`,
        `"${r.primaryPosition}"`,
        `"${r.phone}"`,
        `"${r.email}"`,
        `"${guardianName.replace(/"/g, '""')}"`,
        `"${guardianPhone}"`,
        `"${guardianRel}"`,
        `"${state}"`,
        `"${r.submittedAt}"`,
        `"${r.verificationHash}"`,
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.href = url;
    link.setAttribute('download', `edoh-sport-academy-intake-${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportNotice(`Exported ${filteredRecords.length} player record(s) to CSV!`);
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl my-4 sm:my-8 bg-[#121212] border border-[#FFD000]/60 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden text-neutral-200">
        
        {/* ======================================================== */}
        {/* LOGIN SCREEN (If not authenticated)                      */}
        {/* ======================================================== */}
        {!isAuthenticated ? (
          <div className="p-6 sm:p-12 max-w-md mx-auto space-y-6">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-[#221B0A] border-2 border-[#FFD000] flex items-center justify-center text-[#FFD000] mx-auto shadow-[0_0_20px_rgba(255,208,0,0.25)]">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono tracking-widest text-[#FFD000] uppercase font-bold">
                  Secretariat & Board Room Access
                </span>
                <h3 className="font-display text-2xl font-black text-white">
                  Academy Management Portal
                </h3>
                <p className="text-xs text-neutral-400">
                  Enter master security credentials to view registered player records and export CSV intake lists.
                </p>
              </div>
            </div>

            {authError && (
              <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-800 text-red-200 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
                  <span>Management Passcode</span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[10px] text-[#FFD000] hover:underline"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter board secret key..."
                    className="w-full pl-9 pr-3.5 py-3 bg-[#0A0A0A] border border-[#3A331A] focus:border-[#FFD000] rounded-xl text-sm text-white placeholder-neutral-600 focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                  <span>Demo Master Key:</span>
                  <code className="text-[#FFD000] font-mono bg-[#1A180E] px-1.5 py-0.5 rounded border border-[#3E3414]">
                    edoh2026admin
                  </code>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold text-black bg-[#FFD000] hover:bg-[#E6BC00] rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Authenticate & Access Dashboard</span>
              </button>
            </form>
          </div>
        ) : (
          /* ======================================================== */
          /* AUTHENTICATED MANAGEMENT COMMAND CENTER                  */
          /* ======================================================== */
          <div className="flex flex-col h-[90vh] max-h-[850px]">
            
            {/* Top Command Bar */}
            <div className="p-4 sm:p-6 bg-[#161616] border-b border-[#2B2414] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <CrestLogo size="sm" showText={false} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#FFD000] font-bold uppercase tracking-wider">
                      Secretariat Registry
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-950/80 border border-emerald-700/60 rounded text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Session Secure
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-white text-lg sm:text-xl">
                    Player Intake & Registration Command
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {/* Export CSV Button */}
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-black bg-[#FFD000] hover:bg-[#E6BC00] rounded-xl shadow-md transition-all"
                  title="Export filtered players to a structured CSV spreadsheet"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export to CSV ({filteredRecords.length})</span>
                </button>

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-[#222] hover:bg-neutral-800 border border-[#3A331A] rounded-xl transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Lock Out</span>
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
                  aria-label="Close dashboard"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Notification Banner */}
            {exportNotice && (
              <div className="bg-emerald-950/90 border-b border-emerald-800 px-4 py-2 text-emerald-200 text-xs font-medium flex items-center justify-between shrink-0">
                <span className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  {exportNotice}
                </span>
                <button onClick={() => setExportNotice(null)} className="text-emerald-300 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Metric KPI Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:px-6 bg-[#0E0E0E] border-b border-[#241F10] shrink-0">
              <div className="p-3 rounded-xl bg-[#141414] border border-[#2B2513] space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-neutral-400">Total Enrolled</span>
                <div className="font-display font-black text-xl text-white">{stats.total}</div>
                <div className="text-[10px] text-neutral-500">Official Database Records</div>
              </div>

              <div className="p-3 rounded-xl bg-[#141414] border border-[#2B2513] space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-[#FFD000]">Youth Cadets (U18)</span>
                <div className="font-display font-black text-xl text-[#FFD000]">{stats.minors}</div>
                <div className="text-[10px] text-neutral-500">Parent / Guardian Signed</div>
              </div>

              <div className="p-3 rounded-xl bg-[#141414] border border-[#2B2513] space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-white">Senior Squad (18+)</span>
                <div className="font-display font-black text-xl text-white">{stats.seniors}</div>
                <div className="text-[10px] text-neutral-500">Adult Pro & Free Agents</div>
              </div>

              <div className="p-3 rounded-xl bg-[#141414] border border-[#2B2513] space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-neutral-400">Gender Ratio</span>
                <div className="font-display font-black text-xl text-white">
                  {stats.males}M <span className="text-neutral-600">/</span> {stats.females}F
                </div>
                <div className="text-[10px] text-neutral-500">Athletic Distribution</div>
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="p-4 sm:px-6 bg-[#141414] border-b border-[#2A2413] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shrink-0">
              
              {/* Live Search */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by player name, ID, phone, email, position..."
                  className="w-full pl-9 pr-8 py-2 bg-[#0A0A0A] border border-[#3A331A] focus:border-[#FFD000] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-neutral-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Filter Dropdowns */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Pathway Filter */}
                <select
                  value={pathwayFilter}
                  onChange={(e) => setPathwayFilter(e.target.value as any)}
                  className="px-3 py-2 bg-[#0A0A0A] border border-[#3A331A] rounded-xl text-xs text-neutral-200 focus:border-[#FFD000] focus:outline-none"
                >
                  <option value="all">All Pathways ({records.length})</option>
                  <option value="minor">Youth Only (U18)</option>
                  <option value="senior">Senior Squad (18+)</option>
                </select>

                {/* Division Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 bg-[#0A0A0A] border border-[#3A331A] rounded-xl text-xs text-neutral-200 focus:border-[#FFD000] focus:outline-none"
                >
                  <option value="all">All Age Divisions</option>
                  <option value="under-10">Under-10</option>
                  <option value="under-13">Under-13</option>
                  <option value="under-15">Under-15</option>
                  <option value="under-17">Under-17</option>
                  <option value="senior">Senior Squad</option>
                </select>

                {/* Sort Option */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-[#0A0A0A] border border-[#3A331A] rounded-xl text-xs text-neutral-200 focus:border-[#FFD000] focus:outline-none"
                >
                  <option value="newest">Sort: Newest First</option>
                  <option value="oldest">Sort: Oldest First</option>
                  <option value="name">Sort: Player Name (A-Z)</option>
                  <option value="age">Sort: Age (Ascending)</option>
                </select>
              </div>

            </div>

            {/* Scrollable Records Table / List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
              {filteredRecords.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
                    <Search className="w-6 h-6" />
                  </div>
                  <div className="font-semibold text-white text-base">No player registrations match current criteria</div>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                    Try adjusting your search terms or clearing the pathway / division filters above.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setPathwayFilter('all');
                      setCategoryFilter('all');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-[#FFD000] bg-[#1A180E] hover:bg-[#252010] border border-[#3E3414] rounded-lg"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="border border-[#2A2413] rounded-2xl overflow-hidden bg-[#0F0F0F]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#181818] border-b border-[#2C2615] text-neutral-400 font-mono uppercase text-[10px]">
                          <th className="py-3 px-4">Player Details</th>
                          <th className="py-3 px-4">Reg ID & Status</th>
                          <th className="py-3 px-4">Age / Division</th>
                          <th className="py-3 px-4">Position</th>
                          <th className="py-3 px-4">Contact Lines</th>
                          <th className="py-3 px-4">Timestamp</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#211C11]">
                        {filteredRecords.map((player) => {
                          const isMinor = player.type === 'minor';
                          return (
                            <tr
                              key={player.regId}
                              className="hover:bg-[#161616] transition-colors group"
                            >
                              {/* Player Name & Avatar */}
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-full bg-[#1F1C12] border border-[#FFD000]/40 overflow-hidden shrink-0 flex items-center justify-center text-xs font-bold text-[#FFD000]">
                                    {player.photoUrl ? (
                                      <img
                                        src={player.photoUrl}
                                        alt={player.fullName}
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      player.fullName
                                        .split(' ')
                                        .map((n) => n[0])
                                        .slice(0, 2)
                                        .join('')
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-bold text-white text-sm group-hover:text-[#FFD000] transition-colors">
                                      {player.fullName}
                                    </div>
                                    <div className="text-[11px] text-neutral-400">
                                      {player.gender} · {isMinor ? 'Minor Cadet' : 'Adult Pro'}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Reg ID */}
                              <td className="py-3.5 px-4 font-mono">
                                <span className="text-[#FFD000] font-bold block">{player.regId}</span>
                                <span className="text-[10px] text-neutral-500 block truncate max-w-[120px]">
                                  {player.verificationHash}
                                </span>
                              </td>

                              {/* Age & Division */}
                              <td className="py-3.5 px-4">
                                <span className="font-bold text-white block">{player.age} yrs</span>
                                <span className="text-[10px] font-mono text-neutral-400 block">
                                  {player.categoryOrStatus}
                                </span>
                              </td>

                              {/* Position */}
                              <td className="py-3.5 px-4 font-mono">
                                <span className="px-2 py-0.5 rounded bg-[#1F1A0C] border border-[#3E3414] text-[#FFD000] font-bold text-[11px] inline-block">
                                  {player.primaryPosition}
                                </span>
                              </td>

                              {/* Contacts */}
                              <td className="py-3.5 px-4 text-[11px]">
                                <div className="text-white flex items-center gap-1.5 truncate max-w-[160px]">
                                  <Phone className="w-3 h-3 text-neutral-500 shrink-0" />
                                  <span>{player.phone}</span>
                                </div>
                                <div className="text-neutral-400 flex items-center gap-1.5 truncate max-w-[160px]">
                                  <Mail className="w-3 h-3 text-neutral-500 shrink-0" />
                                  <span>{player.email}</span>
                                </div>
                              </td>

                              {/* Timestamp */}
                              <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-400 whitespace-nowrap">
                                {player.submittedAt}
                              </td>

                              {/* Action Buttons */}
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {/* View Official Slip */}
                                  <button
                                    type="button"
                                    onClick={() => onViewRecordSlip(player)}
                                    className="p-2 rounded-lg bg-[#1A1A1A] hover:bg-[#252525] border border-[#333] hover:border-[#FFD000] text-neutral-300 hover:text-[#FFD000] transition-colors"
                                    title="View Printable Registration Certificate Slip"
                                  >
                                    <FileSpreadsheet className="w-4 h-4" />
                                  </button>

                                  {/* Quick Detail Inspect */}
                                  <button
                                    type="button"
                                    onClick={() => setInspectRecord(player)}
                                    className="p-2 rounded-lg bg-[#1A1A1A] hover:bg-[#252525] border border-[#333] hover:border-[#FFD000] text-neutral-300 hover:text-[#FFD000] transition-colors"
                                    title="Inspect Complete Application Particulars"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>

                                  {/* Delete (if callback available) */}
                                  {onDeleteRecord && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (
                                          window.confirm(
                                            `Are you sure you want to remove ${player.fullName} (${player.regId}) from the intake database?`
                                          )
                                        ) {
                                          onDeleteRecord(player.regId);
                                        }
                                      }}
                                      className="p-2 rounded-lg bg-[#1A1A1A] hover:bg-red-950 border border-[#333] hover:border-red-700 text-neutral-400 hover:text-red-400 transition-colors"
                                      title="Delete application record"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer Info Bar */}
            <div className="p-3 sm:px-6 bg-[#161616] border-t border-[#2A2413] flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#FFD000]" />
                <span>Edoh Sport Academy Secretariat · FCT FA Registration & FIFA TMS Repository</span>
              </div>
              <div className="font-mono">
                Displaying <strong className="text-white">{filteredRecords.length}</strong> of{' '}
                <strong className="text-[#FFD000]">{records.length}</strong> enrolled athletes
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* DETAILED PLAYER INSPECTION MODAL / OVERLAY               */}
      {/* ======================================================== */}
      {inspectRecord && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#141414] border-2 border-[#FFD000] rounded-3xl shadow-2xl p-6 space-y-6 text-white max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#2E2614] pb-4">
              <div className="flex items-center gap-3">
                <CrestLogo size="sm" showText={false} />
                <div>
                  <span className="text-[10px] font-mono text-[#FFD000] uppercase font-bold">
                    Official Application Record
                  </span>
                  <h4 className="font-display font-black text-xl text-white">
                    {inspectRecord.fullName}
                  </h4>
                </div>
              </div>
              <button
                onClick={() => setInspectRecord(null)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#1A1A1A] border border-[#2D2817]">
                <div className="text-neutral-400 text-[10px] font-mono uppercase">Official ID</div>
                <div className="font-bold text-[#FFD000] font-mono mt-0.5">{inspectRecord.regId}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#1A1A1A] border border-[#2D2817]">
                <div className="text-neutral-400 text-[10px] font-mono uppercase">Pathway</div>
                <div className="font-bold text-white mt-0.5">
                  {inspectRecord.type === 'minor' ? 'Youth Cadet (U18)' : 'Senior Squad (18+)'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#1A1A1A] border border-[#2D2817]">
                <div className="text-neutral-400 text-[10px] font-mono uppercase">Age & Gender</div>
                <div className="font-bold text-white mt-0.5">
                  {inspectRecord.age} yrs · {inspectRecord.gender}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#1A1A1A] border border-[#2D2817]">
                <div className="text-neutral-400 text-[10px] font-mono uppercase">Position</div>
                <div className="font-bold text-[#FFD000] font-mono mt-0.5">
                  {inspectRecord.primaryPosition}
                </div>
              </div>
            </div>

            {/* Contact & Particulars */}
            <div className="space-y-3 text-xs">
              <div className="text-[11px] font-mono uppercase text-[#FFD000] font-bold">
                Contact & Verification Specifics
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#0D0D0D] p-4 rounded-xl border border-[#2A2312]">
                <div>
                  <span className="text-neutral-500 block">Telephone Line:</span>
                  <span className="font-semibold text-white">{inspectRecord.phone}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Email Address:</span>
                  <span className="font-semibold text-white">{inspectRecord.email}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Date of Birth:</span>
                  <span className="font-semibold text-white">{inspectRecord.dateOfBirth}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Submission Date:</span>
                  <span className="font-semibold text-white font-mono">{inspectRecord.submittedAt}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-neutral-500 block">FIFA Security Hash:</span>
                  <span className="font-mono text-[#FFD000] text-[11px]">
                    {inspectRecord.verificationHash}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#2A2312]">
              <button
                type="button"
                onClick={() => {
                  setInspectRecord(null);
                  onViewRecordSlip(inspectRecord);
                }}
                className="px-5 py-2.5 text-xs font-bold text-black bg-[#FFD000] hover:bg-[#E6BC00] rounded-xl flex items-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Open Printable Certificate Slip</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
