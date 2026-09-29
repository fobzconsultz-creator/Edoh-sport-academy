import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle, MessageSquare, Clock, Loader2, AlertCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiries & Player Trials',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('https://formspree.io/f/mvkgdrej', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          subject: formData.subject,
          message: formData.message,
          academy: 'Edoh Sport Academy, Abuja',
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Inquiries & Player Trials',
          message: '',
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData?.errors?.[0]?.message ||
            'There was an issue sending your message. Please reach us directly via WhatsApp or email.'
        );
      }
    } catch (err) {
      setErrorMessage(
        'Network error encountered. Please check your internet connection or contact us via WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-b border-[#3A331A]/60 bg-[#0E0E0E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-[#FFD000]">
            Academy Secretariat & Inquiries
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Contact Edoh Sport Academy
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
            Visit our administrative headquarters in Mabushi, Abuja or contact our scouting coordinators for academy admissions, partnership inquiries, and scouting showcases.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Particulars & Map Card */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="rounded-2xl bg-[#141414] border border-[#3A331A] p-6 space-y-5 shadow-lg">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#221C0D] border border-[#443812] flex items-center justify-center text-[#FFD000] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#FFD000] uppercase font-bold">Physical Headquarters</div>
                  <div className="font-display font-bold text-white text-base mt-1">
                    Mabushi Ultra Modern Market
                  </div>
                  <p className="text-sm text-neutral-300 mt-1 leading-relaxed">
                    Shop 237, Block B, Mabushi Ultra Modern Market, Jahi, Abuja, FCT, Nigeria
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#252012] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#221C0D] border border-[#443812] flex items-center justify-center text-[#FFD000] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#FFD000] uppercase font-bold">Official Telephone Lines</div>
                  <div className="mt-1 space-y-1">
                    <a
                      href="tel:+2349118006169"
                      className="block text-sm font-semibold text-neutral-200 hover:text-[#FFD000] transition-colors"
                    >
                      +234 911 800 6169
                    </a>
                    <a
                      href="tel:+2347067026825"
                      className="block text-sm font-semibold text-neutral-200 hover:text-[#FFD000] transition-colors"
                    >
                      +234 706 702 6825
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#252012] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#221C0D] border border-[#443812] flex items-center justify-center text-[#FFD000] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#FFD000] uppercase font-bold">Official Email</div>
                  <a
                    href="mailto:edohsportacademy@gmail.com"
                    className="block text-sm font-semibold text-neutral-200 hover:text-[#FFD000] transition-colors mt-1"
                  >
                    edohsportacademy@gmail.com
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-[#252012] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#221C0D] border border-[#443812] flex items-center justify-center text-[#FFD000] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#FFD000] uppercase font-bold">Secretariat Hours</div>
                  <div className="text-xs text-neutral-300 mt-1">
                    Monday – Friday: 08:30 AM – 05:00 PM <br />
                    Saturday: 07:00 AM – 02:00 PM (Matchday & Training)
                  </div>
                </div>
              </div>

            </div>

            {/* Quick WhatsApp Action Banner */}
            <div className="p-4 rounded-xl bg-[#131E15] border border-emerald-900/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">Direct WhatsApp Assistance</div>
                  <div className="text-[11px] text-neutral-300">Instant chat with Academy Secretariat</div>
                </div>
              </div>
              <a
                href="https://wa.me/2349118006169?text=Hello%20Edoh%20Sport%20Academy,%20I%20am%20inquiring%20about%202026%20Player%20Registration"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 text-xs font-bold text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
              >
                Chat Now
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#141414] border border-[#3A331A] p-6 sm:p-8 space-y-6 shadow-xl">
              
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-white">
                  Send a Direct Message to the Board
                </h3>
                <p className="text-xs text-neutral-400">
                  Have inquiries regarding youth admission, player clearances, or friendly fixtures?
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-[#181D14] border border-emerald-800 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                  <div className="text-base font-bold text-white">Inquiry Dispatched Successfully to Secretariat</div>
                  <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Thank you. Your message has been received by Edoh Sport Academy’s admissions and scouting coordinators via our secure Formspree inbox. We will respond within 24 operational hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-black bg-[#FFD000] hover:bg-[#E6BC00] rounded-lg transition-colors"
                  >
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2.5">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-300">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Coach Paul Okon"
                        className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000] disabled:opacity-60"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-300">Your Email Address *</label>
                      <input
                        type="email"
                        required
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. paul@example.com"
                        className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000] disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-300">Telephone / WhatsApp</label>
                      <input
                        type="tel"
                        disabled={isSubmitting}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +234 803 000 0000"
                        className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000] disabled:opacity-60"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-300">Inquiry Classification</label>
                      <select
                        disabled={isSubmitting}
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000] disabled:opacity-60"
                      >
                        <option value="General Inquiries & Player Trials">General Inquiries & Player Trials</option>
                        <option value="Youth Academy Admissions (Under 18)">Youth Academy Admissions (Under 18)</option>
                        <option value="Senior Squad Trial & Scouting">Senior Squad Trial & Scouting</option>
                        <option value="FIFA Connect / TMS Verification">FIFA Connect / TMS Verification</option>
                        <option value="Sponsorship & Partnership">Sponsorship & Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-300">Message / Inquiry Details *</label>
                    <textarea
                      required
                      rows={4}
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify player background, age, or details of your inquiry..."
                      className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-[#3A331A] rounded-lg text-xs text-white focus:outline-none focus:border-[#FFD000] disabled:opacity-60"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-black bg-[#FFD000] hover:bg-[#E6BC00] disabled:opacity-75 disabled:cursor-not-allowed rounded-xl shadow-lg transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending to Secretariat...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Secretariat Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
