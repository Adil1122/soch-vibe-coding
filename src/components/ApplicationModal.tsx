import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, GraduationCap } from 'lucide-react';

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
    if (!formData.agreedToCommit) {
      newErrors.agreedToCommit = 'You must confirm commitment to participate';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const randomRef = 'VB-' + Math.floor(100000 + Math.random() * 900000);
      setReferenceId(randomRef);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative bg-[#121212] text-white w-full max-w-2xl rounded-3xl shadow-2xl border border-white/15 overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="px-6 py-5 bg-[#181818] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#78daeb]" />
            <h3 className="text-lg font-bold text-white">
              Apply for Vibe Academy — Cohort 02
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-[#78daeb] mx-auto animate-bounce" />
              <h4 className="text-2xl font-bold text-white">Application Submitted!</h4>
              <p className="text-sm text-white/70 max-w-md mx-auto">
                Your application for Cohort 02 has been registered. Reference ID:{' '}
                <span className="font-mono font-bold text-[#c9459c]">{referenceId}</span>.
                We will contact you via WhatsApp / Email shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white shadow-xl cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #4467b0, #6b388d, #78daeb, #c9459c)'
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Asad Ullah"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#78daeb] text-sm"
                />
                {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#78daeb] text-sm"
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#78daeb] text-sm"
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none focus:border-[#78daeb] text-sm"
                  >
                    <option value="UOH IT Student" className="bg-[#121212] text-white">UOH IT Student</option>
                    <option value="UOH Non-IT Student" className="bg-[#121212] text-white">UOH Non-IT Student</option>
                    <option value="External Candidate" className="bg-[#121212] text-white">External Candidate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Experience Level
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none focus:border-[#78daeb] text-sm"
                  >
                    <option value="Complete Beginner" className="bg-[#121212] text-white">Complete Beginner</option>
                    <option value="Basic Coding Knowledge" className="bg-[#121212] text-white">Basic Coding Knowledge</option>
                    <option value="Intermediate Developer" className="bg-[#121212] text-white">Intermediate Developer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Why do you want to join? (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Share your goals with AI-driven Vibe Coding..."
                  value={formData.reasonForJoining}
                  onChange={(e) => setFormData({ ...formData, reasonForJoining: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#78daeb] text-sm"
                />
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="commit"
                  checked={formData.agreedToCommit}
                  onChange={(e) => setFormData({ ...formData, agreedToCommit: e.target.checked })}
                  className="mt-1 accent-[#78daeb]"
                />
                <label htmlFor="commit" className="text-xs text-white/70">
                  I agree to commit 10-15 hours/week for live project building &amp; lab sessions at Haripur BIC.
                </label>
              </div>
              {errors.agreedToCommit && (
                <p className="text-xs text-red-400">{errors.agreedToCommit}</p>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full text-sm font-bold uppercase tracking-wider text-white shadow-xl cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, #4467b0, #6b388d, #78daeb, #c9459c)'
                  }}
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Cohort 02 Application'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
