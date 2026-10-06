import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowRight, CheckCircle2, Globe } from 'lucide-react';
import { LinkedinIcon, TwitterIcon, GithubIcon } from './SocialIcons';

interface ContactProps {
  onOpenApply: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenApply }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F4F6F9] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Strong CTA Banner Header */}
        <div className="bg-[#1E2A4F] text-white rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-5 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#F38A32] text-white uppercase tracking-wider font-poppins">
            Cohort 02 Applications Active
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins text-white tracking-tight">
            Ready to Build the Future?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Join the next generation of AI-accelerated software engineers. Learn from seasoned mentors at the University of Haripur Business Incubation Center.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenApply}
              className="px-8 py-4 bg-[#F38A32] hover:bg-[#e07b27] text-white rounded-xl text-sm font-bold uppercase tracking-wider font-poppins shadow-xl hover:shadow-2xl transition hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Apply for Cohort 02</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Contact Form & Information Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2A6EB4] font-poppins">
                Direct Communication
              </span>
              <h3 className="text-2xl font-bold font-poppins text-[#1E2A4F]">
                Get in Touch With Admissions
              </h3>
              <p className="text-sm text-slate-600">
                Have questions about the syllabus, prerequisites, or incubation facilities? Reach out directly.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-start gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#2A6EB4]/10 text-[#2A6EB4] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Us</div>
                  <a href="mailto:admissions@sochvibecoding.com" className="text-sm font-bold text-[#1E2A4F] hover:text-[#2A6EB4] transition">
                    admissions@sochvibecoding.com
                  </a>
                  <div className="text-xs text-slate-500">bic@uoh.edu.pk</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-start gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#458543]/10 text-[#458543] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">WhatsApp & Hotline</div>
                  <a href="tel:+923129582101" className="text-sm font-bold text-[#1E2A4F] hover:text-[#458543] transition">
                    +92 312 9582101
                  </a>
                  <div className="text-xs text-slate-500">Mon-Fri, 9:00 AM – 5:00 PM PKT</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-start gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#F38A32]/10 text-[#F38A32] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Campus Location</div>
                  <div className="text-sm font-bold text-[#1E2A4F]">
                    Business Incubation Center (BIC)
                  </div>
                  <div className="text-xs text-slate-600">
                    University of Haripur, Khyber Pakhtunkhwa, Pakistan
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-500 block mb-2">Connect on Social Channels:</span>
              <div className="flex gap-2">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#1E2A4F] hover:text-[#2A6EB4] transition">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#1E2A4F] hover:text-[#2A6EB4] transition">
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#1E2A4F] hover:text-[#2A6EB4] transition">
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg">
            <h3 className="text-xl font-bold font-poppins text-[#1E2A4F] mb-1">
              Send an Inquiry
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill out this form and our academic coordinator will reply within 24 hours.
            </p>

            {isSubmitted ? (
              <div className="bg-[#458543]/10 border border-[#458543]/30 p-6 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#458543] mx-auto" />
                <h4 className="text-base font-bold text-[#1E2A4F]">Inquiry Sent Successfully</h4>
                <p className="text-xs text-slate-600">Thank you! We will get in touch with you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1E2A4F] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Asad Ullah"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#1E2A4F] focus:outline-none focus:border-[#2A6EB4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2A4F] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#1E2A4F] focus:outline-none focus:border-[#2A6EB4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2A4F] mb-1">Message / Question</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ask about class timings, prerequisites, or incubation support..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#1E2A4F] focus:outline-none focus:border-[#2A6EB4]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1E2A4F] hover:bg-[#2A6EB4] text-white rounded-xl text-xs font-bold uppercase tracking-wider font-poppins transition shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
