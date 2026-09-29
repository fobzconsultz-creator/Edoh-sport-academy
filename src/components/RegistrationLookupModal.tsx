import React, { useState } from 'react';
import { Search, X, AlertCircle, FileCheck, ArrowRight } from 'lucide-react';
import { RegistrationRecord } from '../types';

interface RegistrationLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: RegistrationRecord[];
  onSelectRecord: (record: RegistrationRecord) => void;
}

export const RegistrationLookupModal: React.FC<RegistrationLookupModalProps> = ({
  isOpen,
  onClose,
  records,
  onSelectRecord,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const filtered = records.filter(
    (r) =>
      r.regId.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      r.fullName.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      r.phone.includes(searchQuery.trim())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#141414] border border-[#3A331A] rounded-2xl shadow-2xl p-4 sm:p-6 space-y-5 text-white">
        
        <div className="flex items-center justify-between border-b border-[#282212] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#252010] border border-[#443812] flex items-center justify-center text-[#FFD000]">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Verify Player Registration Slip
              </h3>
              <p className="text-xs text-neutral-400">
                Search official registry by Registration ID or Player Name
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearched(true);
              }}
              placeholder="e.g. ESA/YTH/2026/..., ESA/SNR/2026/..., or Player Name"
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#3A331A] rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FFD000] transition-colors"
            />
          </div>
          <div className="text-[11px] text-neutral-400">
            Registered records from this browser session are verified against our encrypted local ledger.
          </div>
        </form>

        {/* Results List */}
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.regId}
                onClick={() => {
                  onSelectRecord(item);
                  onClose();
                }}
                className="p-3.5 rounded-xl bg-[#1C1C1C] border border-[#2D2817] hover:border-[#FFD000] cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#FFD000]">
                      {item.regId}
                    </span>
                    <span className="text-[10px] uppercase font-mono text-neutral-400">
                      {item.type === 'minor' ? 'Youth Division' : 'Senior Squad'}
                    </span>
                  </div>
                  <div className="font-bold text-white text-sm">
                    {item.fullName}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {item.categoryOrStatus} · {item.primaryPosition || 'Player'}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-[#FFD000] group-hover:translate-x-1 transition-transform">
                  <span>View Slip</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))
          ) : searched && searchQuery.trim() !== '' ? (
            <div className="p-4 rounded-xl bg-[#1B1812] border border-[#3C3214] text-center space-y-1.5">
              <AlertCircle className="w-5 h-5 text-[#FFD000] mx-auto" />
              <div className="text-xs font-semibold text-white">No Matching Record Found</div>
              <div className="text-[11px] text-neutral-400">
                Please double check the ID format (e.g. ESA/YTH/2026/... or ESA/SNR/2026/...). If you just registered, ensure the submission succeeded.
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#101010] border border-[#222] text-center text-xs text-neutral-500">
              Enter an ID or Player Name to look up official verification slip.
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-[#242013] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-[#202020] rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
