import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

interface ContactProps {
  onOpenApply?: () => void;
}

export const Contact: React.FC<ContactProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'UOH IT Student',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        status: 'UOH IT Student',
        message: ''
      });
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-black border-t border-white/10 text-white overflow-hidden">
      {/* Background Video (matching reference 100%) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-25 filter brightness-50 contrast-125"
          src="https://vibeacademy.info/wp-content/uploads/2026/05/123.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
        {/* Section Tag */}
        <div>
          <span className="section-tag">
            08. Contact
          </span>
        </div>

        {/* Narrative Heading */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Your Competitors Are Automating. <br className="hidden sm:inline" />
            Are you?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed font-normal">
            Stop wasting hours on manual syntax. Start building at terminal velocity. Apply for an exclusive seat in the next cohort.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="max-w-2xl mx-auto bg-[#141414]/90 backdrop-blur-xl border border-white/15 rounded-[35px] p-6 sm:p-10 shadow-2xl text-left">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-14 h-14 text-[#78daeb] mx-auto animate-bounce" />
              <h3 className="text-2xl font-bold text-white">Application Received!</h3>
              <p className="text-white/70 text-sm max-w-sm mx-auto">
                Thank you for applying. The Vibe Academy admissions team will review your application and reach out shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#78daeb] transition-colors text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#78daeb] transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 0000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#78daeb] transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/20 text-white focus:outline-none focus:border-[#78daeb] transition-colors text-sm cursor-pointer"
                >
                  <option value="UOH IT Student" className="bg-[#141414] text-white">UOH IT Student</option>
                  <option value="UOH Non-IT Student" className="bg-[#141414] text-white">UOH Non-IT Student</option>
                  <option value="External Candidate" className="bg-[#141414] text-white">External Candidate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your background or aspirations..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#78daeb] transition-colors text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full text-sm font-bold uppercase tracking-wider text-white shadow-2xl transition-all duration-300 hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #4467b0, #6b388d, #78daeb, #c9459c)'
                }}
              >
                <span>Send You Request</span>
                <Send className="w-4 h-4 ml-1" />
              </button>
            </form>
          )}

          {/* Contact Details Footnote */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-white/70">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#78daeb] shrink-0 mt-0.5" />
              <span>Office 330 second floor admin block university of haripur</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#c9459c] shrink-0 mt-0.5" />
              <span>+92 371 9330600 / 03301584825</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
