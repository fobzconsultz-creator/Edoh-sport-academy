import React, { useState } from 'react';
import { CheckCircle, Printer, Copy, Check, X, Shield, Download, Calendar, User, Phone, MapPin } from 'lucide-react';
import { RegistrationRecord } from '../types';
import { CrestLogo } from './CrestLogo';

interface SuccessReceiptModalProps {
  record: RegistrationRecord | null;
  onClose: () => void;
}

export const SuccessReceiptModal: React.FC<SuccessReceiptModalProps> = ({ record, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!record) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(record.regId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const isMinor = record.type === 'minor';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-4 sm:my-8 bg-[#141414] border border-[#FFD000]/60 rounded-2xl shadow-2xl overflow-hidden text-neutral-200">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 bg-[#1B1B1B] border-b border-[#3A331A] no-print">
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-display font-bold text-white text-sm sm:text-base truncate">
              Registration Filed & Timestamped
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Certificate Slip */}
        <div className="p-4 sm:p-8 space-y-5 sm:space-y-6 print-card bg-[#121212] text-white">
          
          {/* Certificate Header with Crest */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-[#FFD000] pb-5">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <CrestLogo size="lg" showText={false} />
              <div>
                <div className="text-[10px] font-mono tracking-widest text-[#FFD000] uppercase font-bold">
                  Federal Capital Territory • Abuja, Nigeria
                </div>
                <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white">
                  Edoh Sport Academy
                </h3>
                <div className="text-xs text-neutral-400">
                  Official Player Registration Slip & Statutory Covenant
                </div>
              </div>
            </div>

            <div className="text-center sm:text-right bg-[#1C1C1C] px-3.5 py-2 rounded-xl border border-[#3A331A]">
              <span className="text-[10px] font-mono text-neutral-400 block uppercase">
                Official Registration ID
              </span>
              <span className="font-mono text-base font-extrabold text-[#FFD000] tracking-wider block">
                {record.regId}
              </span>
            </div>
          </div>

          {/* Player Snapshot Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
            
            {/* Player Photo or Default Silhouette */}
            <div className="sm:col-span-4 flex flex-col items-center">
              <div className="w-32 aspect-[3/4] rounded-xl border-2 border-[#3A331A] bg-[#181818] overflow-hidden flex items-center justify-center relative shadow-inner">
                {record.photoUrl ? (
                  <img
                    src={record.photoUrl}
                    alt={record.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-3 text-neutral-500">
                    <User className="w-12 h-12 mx-auto mb-1 opacity-40 text-[#FFD000]" />
                    <span className="text-[10px] uppercase font-mono block">Passport Photo Attached</span>
                  </div>
                )}
                <div className="absolute bottom-0 inset-x-0 bg-black/75 py-1 text-center text-[9px] font-mono text-[#FFD000]">
                  OFFICIAL PASS
                </div>
              </div>

              <div className="mt-2 text-center">
                <span className="inline-block text-[11px] font-mono font-bold uppercase text-emerald-400">
                  ● ACTIVE SUBMISSION
                </span>
              </div>
            </div>

            {/* Core Particulars */}
            <div className="sm:col-span-8 space-y-3">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Athlete Full Legal Name</span>
                <div className="text-xl font-display font-extrabold text-white">
                  {record.fullName}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-neutral-400 block text-[10px] font-mono uppercase">Category / Division</span>
                  <span className="font-semibold text-[#FFD000]">{record.categoryOrStatus}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] font-mono uppercase">Primary Position</span>
                  <span className="font-semibold text-white">{record.primaryPosition || 'Not Specified'}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] font-mono uppercase">Age & Gender</span>
                  <span className="font-semibold text-white">{record.age} Years · {record.gender}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] font-mono uppercase">Date of Birth</span>
                  <span className="font-semibold text-white">{record.dateOfBirth}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] font-mono uppercase">Contact Telephone</span>
                  <span className="font-semibold text-white">{record.phone}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] font-mono uppercase">Email Address</span>
                  <span className="font-semibold text-white truncate block">{record.email}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#292414] text-xs">
                <span className="text-neutral-400 block text-[10px] font-mono uppercase">Physical Base</span>
                <span className="text-neutral-300 font-medium">
                  Shop 237, Block B, Mabushi Ultra Modern Market, Jahi, Abuja, Nigeria
                </span>
              </div>
            </div>

          </div>

          {/* Statutory Verification Box */}
          <div className="p-4 rounded-xl bg-[#181818] border border-[#2F2917] space-y-2 text-xs">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-neutral-400 uppercase">DIGITAL TIMESTAMP</span>
              <span className="text-white font-semibold">{record.submittedAt}</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-neutral-400 uppercase">STATUTORY REPERTOIRE</span>
              <span className="text-emerald-400 font-semibold">9 Clauses Formally Executed</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-neutral-400 uppercase">FIFA TMS / NFF REGISTRY VERIFICATION HASH</span>
              <span className="text-[#FFD000] font-mono font-bold text-[10px] tracking-wider truncate max-w-[200px]">
                {record.verificationHash}
              </span>
            </div>
          </div>

          {/* Legal Footnote */}
          <div className="text-[10px] text-neutral-400 leading-normal border-t border-[#282212] pt-3">
            This digital registration receipt constitutes formal legal acknowledgement of intake submission to Edoh Sport Academy, FCT Abuja. The player is bound by the Academy Code of Conduct, FCT Football Association regulations, and FIFA Connect RSTP transfer rules. Retain this slip for technical trials, matchday identification, and player card issuance.
          </div>

        </div>

        {/* Action Buttons Bar */}
        <div className="p-5 bg-[#181818] border-t border-[#3A331A] flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
          <button
            onClick={handleCopyId}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-neutral-200 bg-[#242424] hover:bg-[#303030] rounded-xl border border-neutral-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied ID to Clipboard' : 'Copy Registration ID'}</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-black bg-[#FFD000] hover:bg-[#E6BC00] rounded-xl shadow-lg transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Download PDF Summary / Print</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-neutral-400 hover:text-white bg-[#222] rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
