import React, { useState } from 'react';
import { MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';

interface ContactProps {
  onOpenApply?: () => void;
}

export const Contact: React.FC<ContactProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'University of Haripur Student',
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
        status: 'University of Haripur Student',
        message: ''
      });
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 bg-black border-t border-white/10 text-white overflow-hidden">
      {/* Background Video with #0000007A overlay (matching reference 100%) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover filter brightness-75 contrast-110"
          src="https://vibeacademy.info/wp-content/uploads/2026/05/123.mp4"
        />
        <div className="absolute inset-0 bg-[#000000]/50 pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Form Card with authentic frosted glass & inset glow (matching reference elementor-element-43d3694d) */}
        <div
          className="w-full max-w-[42.5rem] mx-auto p-6 sm:p-10 md:p-12 text-center space-y-6"
          style={{
            backgroundImage: 'linear-gradient(#00000066, #ffffff66)',
            boxShadow: 'inset 0 0 40px #ffffff, inset 0 0 4px #ffffffcc',
            borderRadius: '50px',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}
        >
          {/* Section Tag */}
          <div>
            <span className="section-tag-light bg-black/60 text-white border-white/20">
              08. Contact
            </span>
          </div>

          {/* Vibe Academy Logo centered */}
          <div className="flex justify-center pt-1">
            <img
              src="https://vibeacademy.info/wp-content/uploads/2024/11/Vibe-.png"
              alt="Vibe Academy Logo"
              className="w-20 sm:w-24 h-auto object-contain"
            />
          </div>

          {/* Heading (smaller and not bolder, matching reference site 28px-30px font-semibold) */}
          <h2 className="text-xl sm:text-2xl md:text-[30px] font-semibold text-white tracking-tight leading-snug font-sans">
            Your Competitors Are Automating. <br />
            Are you?
          </h2>

          {/* Subtitle description */}
          <p className="text-sm sm:text-[15px] text-white/90 max-w-lg mx-auto font-normal leading-relaxed">
            Stop wasting hours on manual syntax. Start building at terminal velocity. Apply for an exclusive seat in the next cohort.
          </p>

          {isSubmitted ? (
            <div className="py-10 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#78daeb] mx-auto animate-bounce" />
              <h3 className="text-xl font-semibold text-white">Application Received!</h3>
              <p className="text-white/80 text-sm max-w-sm mx-auto">
                Thank you for applying. The Vibe Academy admissions team will review your application and reach out shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2 text-left">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-[20px] bg-[#80807F] text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm font-sans border-0"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-[20px] bg-[#80807F] text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm font-sans border-0"
                />
              </div>

              <div>
                <input
                  type="tel"
                  required
                  placeholder="Active Whatsap Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-[20px] bg-[#80807F] text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm font-sans border-0"
                />
              </div>

              <div>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-[20px] bg-[#80807F] text-white focus:outline-none focus:ring-2 focus:ring-white/40 text-sm font-sans border-0 cursor-pointer"
                >
                  <option value="University of Haripur Student" className="bg-[#444444] text-white">University of Haripur Student</option>
                  <option value="Non-University Student" className="bg-[#444444] text-white">Non-University Student</option>
                  <option value="Working Professional / Freelancer" className="bg-[#444444] text-white">Working Professional / Freelancer</option>
                </select>
              </div>

              <div>
                <textarea
                  rows={3}
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-[20px] bg-[#80807F] text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm font-sans border-0 resize-none"
                />
              </div>

              {/* Submit Pill Button matching reference .custom-btn */}
              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  className="custom-btn cursor-pointer text-sm font-semibold uppercase tracking-wider inline-flex items-center gap-2"
                >
                  <span>Send You Request</span>
                  <Send className="w-4 h-4 ml-1" />
                </button>
              </div>
            </form>
          )}

          {/* Contact Details Footnote */}
          <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between text-xs text-white/80 gap-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#78daeb] shrink-0" />
              <span>Office 330 second floor admin block university of haripur</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#c9459c] shrink-0" />
              <span>+92 371 9330600 / 03301584825</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
