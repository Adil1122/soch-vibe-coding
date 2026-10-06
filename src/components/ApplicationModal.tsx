import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Sparkles, Send, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Haripur',
    status: 'University Student',
    institution: 'University of Haripur',
    experienceLevel: 'Basic Coding Knowledge',
    reasonForJoining: '',
    agreedToCommit: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone / WhatsApp number is required';
    }
    if (!formData.reasonForJoining.trim()) {
      newErrors.reasonForJoining = 'Please briefly share why you want to join Cohort 02';
    }
    if (!formData.agreedToCommit) {
      newErrors.agreedToCommit = 'Please confirm your commitment to attend sessions';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API registration delay
    setTimeout(() => {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      setReferenceId(`SOCH-C02-${randomCode}`);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      city: 'Haripur',
      status: 'University Student',
      institution: 'University of Haripur',
      experienceLevel: 'Basic Coding Knowledge',
      reasonForJoining: '',
      agreedToCommit: false
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-[#1E2A4F]/70 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-8 animate-scale-up">
        {/* Modal Top Header */}
        <div className="bg-[#1E2A4F] text-white px-6 py-5 flex items-center justify-between border-b border-[#2A6EB4]/30">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F38A32] text-white mb-1 uppercase tracking-wider">
              Cohort 02 Admissions Active
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-poppins text-white">
              Application for SOCH – Vibe Coding
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Backed by University of Haripur Business Incubation Center (BIC)
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            aria-label="Close modal"
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-[#458543]/15 text-[#458543] rounded-full flex items-center justify-center mx-auto ring-8 ring-[#458543]/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold font-poppins text-[#1E2A4F]">
                  Application Received!
                </h3>
                <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                  Thank you, <strong className="text-[#1E2A4F]">{formData.fullName}</strong>. Your application for <span className="font-semibold text-[#F38A32]">Cohort 02</span> has been registered.
                </p>
              </div>

              <div className="bg-[#F4F6F9] border border-slate-200 rounded-xl p-4 max-w-sm mx-auto text-left space-y-1">
                <div className="text-xs text-slate-500 font-medium">Application Reference ID:</div>
                <div className="text-lg font-mono font-bold text-[#2A6EB4]">{referenceId}</div>
                <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
                  Confirmation sent to: <span className="text-slate-800 font-medium">{formData.email}</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 max-w-md mx-auto space-y-1 pt-2">
                <p><strong>Next Steps:</strong> The admissions committee at UOH BIC will review your profile. Shortlisted candidates will be invited for a brief technical mindset orientation.</p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 bg-[#1E2A4F] hover:bg-[#2A6EB4] text-white rounded-xl text-sm font-semibold transition shadow-md"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="bg-[#F4F6F9] border border-slate-200 rounded-xl p-4 text-xs text-slate-600 flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-[#2A6EB4] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1E2A4F] block mb-0.5">Cohort 02 Information:</strong>
                  Hands-on, AI-accelerated software engineering with practical production deliverables. Limited seats available at the University of Haripur BIC campus.
                </div>
              </div>

              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1E2A4F] mb-1">
                    Full Name <span className="text-[#F38A32]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Muhammad Zeeshan"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1E2A4F] bg-white focus:outline-none transition ${
                      errors.fullName ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-300 focus:border-[#2A6EB4]'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2A4F] mb-1">
                    Email Address <span className="text-[#F38A32]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1E2A4F] bg-white focus:outline-none transition ${
                      errors.email ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-300 focus:border-[#2A6EB4]'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Phone & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1E2A4F] mb-1">
                    WhatsApp / Phone Number <span className="text-[#F38A32]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+92 3XX XXXXXXX"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1E2A4F] bg-white focus:outline-none transition ${
                      errors.phone ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-300 focus:border-[#2A6EB4]'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2A4F] mb-1">
                    City / Location <span className="text-[#F38A32]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Haripur, Abbottabad, Islamabad"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#1E2A4F] bg-white focus:outline-none focus:border-[#2A6EB4]"
                  />
                </div>
              </div>

              {/* Status & Institution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1E2A4F] mb-1">
                    Current Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#1E2A4F] bg-white focus:outline-none focus:border-[#2A6EB4]"
                  >
                    <option value="University Student">University Student</option>
                    <option value="Recent Graduate">Recent Graduate</option>
                    <option value="Working Professional">Working Professional</option>
                    <option value="Freelancer / Builder">Freelancer / Builder</option>
                    <option value="High School / College">College Student</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E2A4F] mb-1">
                    University / Institution
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="e.g. University of Haripur (UOH)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#1E2A4F] bg-white focus:outline-none focus:border-[#2A6EB4]"
                  />
                </div>
              </div>

              {/* Coding Experience Level */}
              <div>
                <label className="block text-xs font-semibold text-[#1E2A4F] mb-1">
                  Current Coding Background
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  {[
                    { label: 'Beginner', desc: 'Curious about software & AI' },
                    { label: 'Intermediate', desc: 'Knows basics of Python/JS/C++' },
                    { label: 'Advanced', desc: 'Built projects, wants 5x velocity' }
                  ].map((lvl) => (
                    <button
                      type="button"
                      key={lvl.label}
                      onClick={() => setFormData({ ...formData, experienceLevel: lvl.label })}
                      className={`p-3 rounded-xl border text-left transition ${
                        formData.experienceLevel === lvl.label
                          ? 'border-[#2A6EB4] bg-[#2A6EB4]/10 text-[#1E2A4F] font-semibold ring-1 ring-[#2A6EB4]'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="font-bold">{lvl.label}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{lvl.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Why join Cohort 02 */}
              <div>
                <label className="block text-xs font-semibold text-[#1E2A4F] mb-1">
                  Why do you want to join Cohort 02? <span className="text-[#F38A32]">*</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.reasonForJoining}
                  onChange={(e) => setFormData({ ...formData, reasonForJoining: e.target.value })}
                  placeholder="Share your goals: What do you want to build? How will AI-accelerated engineering impact your future?"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1E2A4F] bg-white focus:outline-none transition ${
                    errors.reasonForJoining ? 'border-rose-500 focus:ring-1 focus:ring-rose-500' : 'border-slate-300 focus:border-[#2A6EB4]'
                  }`}
                />
                {errors.reasonForJoining && <p className="text-[11px] text-rose-500 mt-1">{errors.reasonForJoining}</p>}
              </div>

              {/* Commitment Checkbox */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.agreedToCommit}
                    onChange={(e) => setFormData({ ...formData, agreedToCommit: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 text-[#F38A32] focus:ring-0"
                  />
                  <span>
                    I commit to active participation in workshops, practical coding assignments, and final capstone project development at UOH BIC.
                  </span>
                </label>
                {errors.agreedToCommit && <p className="text-[11px] text-rose-500 mt-1">{errors.agreedToCommit}</p>}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#F38A32] hover:bg-[#e07b27] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application for Cohort 02</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
