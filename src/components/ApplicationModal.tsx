import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, GraduationCap } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cnic: '',
    email: '',
    whatsapp: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    academicStatus: '',
    programmingBackground: '',
    referralCode: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.cnic.trim()) newErrors.cnic = 'CNIC / B-Form Number is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.whatsapp.trim()) newErrors.whatsapp = 'Active WhatsApp Number is required';
    if (!formData.emergencyContactName.trim()) {
      newErrors.emergencyContactName = 'Guardian / Emergency Contact Name is required';
    }
    if (!formData.emergencyContactPhone.trim()) {
      newErrors.emergencyContactPhone = 'Guardian / Emergency Phone Line is required';
    }
    if (!formData.academicStatus) {
      newErrors.academicStatus = 'Please select Academic Status';
    }
    if (!formData.programmingBackground) {
      newErrors.programmingBackground = 'Please select Programming Background';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          cnic: formData.cnic,
          email: formData.email,
          active_whatsapp_number: formData.whatsapp,
          emergency_contact_name: formData.emergencyContactName,
          emergency_contact_phone: formData.emergencyContactPhone,
          academic_status: formData.academicStatus,
          programming_background: formData.programmingBackground,
          referral_code: formData.referralCode,
          message: formData.message,
          payment_status: 'Unpaid',
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData?.message || 'Failed to submit application. Please check your inputs.');
      }

      setReferenceId(resData.referenceId || `VB-02-${String(resData.inquiryId).padStart(6, '0')}`);
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Application submit error:', err);
      setSubmitError(err.message || 'Network error connecting to admissions server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative bg-[#121212] text-white w-full max-w-2xl rounded-3xl shadow-2xl border border-white/15 overflow-hidden z-10 my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#181818] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#78daeb]" />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Apply Now — Cohort 02
              </h3>
              <p className="text-[11px] text-white/60">
                Backed by UOH Business Incubation Center (BIC)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-[#78daeb] mx-auto animate-bounce" />
              <h4 className="text-2xl font-bold text-white">Application Submitted!</h4>
              <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{formData.firstName}</strong>. Your Cohort 02 registration has been recorded. Reference ID:{' '}
                <span className="font-mono font-bold text-[#c9459c]">{referenceId}</span>.
                The admissions desk at University of Haripur BIC will contact you shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="vibe-btn-dark !px-8 !py-3 !text-sm font-semibold uppercase tracking-wider"
                >
                  <span>Done</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* 1. First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#78daeb] text-sm"
                  />
                  {errors.firstName && <p className="text-xs text-red-400 mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#78daeb] text-sm"
                  />
                  {errors.lastName && <p className="text-xs text-red-400 mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* 2. CNIC / B-Form Number */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  CNIC / B-Form Number *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 13302-1234567-1"
                  value={formData.cnic}
                  onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#78daeb] text-sm font-mono"
                />
                {errors.cnic && <p className="text-xs text-red-400 mt-1">{errors.cnic}</p>}
              </div>

              {/* 3. Email & Active WhatsApp Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#78daeb] text-sm"
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Active WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="Active WhatsApp Number"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#78daeb] text-sm"
                  />
                  {errors.whatsapp && <p className="text-xs text-red-400 mt-1">{errors.whatsapp}</p>}
                </div>
              </div>

              {/* 4. Guardian / Emergency Contact Name & Phone Line */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Guardian / Emergency Contact Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Guardian / Emergency Contact Name"
                    value={formData.emergencyContactName}
                    onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#78daeb] text-sm"
                  />
                  {errors.emergencyContactName && (
                    <p className="text-xs text-red-400 mt-1">{errors.emergencyContactName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                    Guardian / Emergency Phone Line *
                  </label>
                  <input
                    type="tel"
                    placeholder="Guardian / Emergency Phone Line"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#78daeb] text-sm"
                  />
                  {errors.emergencyContactPhone && (
                    <p className="text-xs text-red-400 mt-1">{errors.emergencyContactPhone}</p>
                  )}
                </div>
              </div>

              {/* 5. Academic Status Category */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Academic Status Category *
                </label>
                <select
                  value={formData.academicStatus}
                  onChange={(e) => setFormData({ ...formData, academicStatus: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none focus:border-[#78daeb] text-sm cursor-pointer"
                >
                  <option value="" className="bg-[#121212] text-white/50">- Select -</option>
                  <option value="IT Department  (Computer Science / SE / IT)" className="bg-[#121212] text-white">
                    IT Department  (Computer Science / SE / IT)
                  </option>
                  <option value="Non-IT Department" className="bg-[#121212] text-white">
                    Non-IT Department
                  </option>
                  <option value="External Candidate" className="bg-[#121212] text-white">
                    External Candidate
                  </option>
                </select>
                {errors.academicStatus && (
                  <p className="text-xs text-red-400 mt-1">{errors.academicStatus}</p>
                )}
              </div>

              {/* 6. Existing Programming Background */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Existing Programming Background *
                </label>
                <select
                  value={formData.programmingBackground}
                  onChange={(e) => setFormData({ ...formData, programmingBackground: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white focus:outline-none focus:border-[#78daeb] text-sm cursor-pointer"
                >
                  <option value="" className="bg-[#121212] text-white/50">- Select -</option>
                  <option value="Absolute Beginner (Zero development experience)" className="bg-[#121212] text-white">
                    Absolute Beginner (Zero development experience)
                  </option>
                  <option value="Intermediate (Knows basic syntax parameters / HTML / CSS)" className="bg-[#121212] text-white">
                    Intermediate (Knows basic syntax parameters / HTML / CSS)
                  </option>
                  <option value="Advanced (Can deploy functional custom application layers)" className="bg-[#121212] text-white">
                    Advanced (Can deploy functional custom application layers)
                  </option>
                </select>
                {errors.programmingBackground && (
                  <p className="text-xs text-red-400 mt-1">{errors.programmingBackground}</p>
                )}
              </div>

              {/* 7. Referral Code */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Referral Code (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Referral Code"
                  value={formData.referralCode}
                  onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#78daeb] text-sm"
                />
              </div>

              {/* 8. Your Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-1.5">
                  Your Message (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-[#78daeb] text-sm resize-none"
                />
              </div>

              {/* Submission Error Banner */}
              {submitError && (
                <div className="p-3 bg-red-500/15 border border-red-500/40 rounded-xl text-red-300 text-xs">
                  {submitError}
                </div>
              )}

              {/* Submit Button - Transparent with gradient border */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full vibe-btn-dark !py-3.5 !text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Saving to Database...' : 'Submit Form'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
