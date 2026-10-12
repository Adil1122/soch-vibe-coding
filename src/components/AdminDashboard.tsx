import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  CheckCircle,
  Clock,
  Search,
  RefreshCw,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Eye,
  X,
  Download,
  AlertCircle,
  Phone,
  Mail,
  GraduationCap,
  Code,
  DollarSign,
  ArrowUpDown,
  Lock,
  ChevronRight,
  Database,
  Edit2,
  Trash2,
  Plus,
  Video,
  Newspaper,
  UploadCloud,
  Copy,
  Check,
  Play,
  Sparkles,
  HelpCircle,
  Layers,
  Award,
  Film,
  Image as ImageIcon
} from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { uploadMediaFile, uploadThumbnailFile } from '../utils/blobUpload';

export interface InquiryRecord {
  id: number;
  first_name: string;
  last_name: string;
  cnic: string;
  email: string;
  active_whatsapp_number: string;
  phone?: string;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  academic_status: string | null;
  programming_background: string | null;
  referral_code: string | null;
  message: string | null;
  payment_status: 'Paid' | 'Unpaid';
  created_at: string;
  updated_at: string | null;
}

export interface SuccessStoryRecord {
  id: number;
  student_name: string;
  role: string;
  project_description: string;
  student_details: string;
  video_url: string;
  thumbnail_url: string;
  video_duration: string;
  achievement: string;
  display_order: number;
  created_at: string;
  updated_at: string | null;
}

export interface BlogRecord {
  id: number;
  blog_heading: string;
  blog_details: string;
  blog_image: string;
  read_time: string;
  published_date: string;
  author: string;
  display_order: number;
  created_at: string;
  updated_at: string | null;
}

type AdminTab = 'inquiries' | 'stories' | 'blogs' | 'setup';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('soch_admin_token'));
  const [activeTab, setActiveTab] = useState<AdminTab>('inquiries');

  // ===================== Inquiries State =====================
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Paid' | 'Unpaid'>('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [editingInquiry, setEditingInquiry] = useState<InquiryRecord | null>(null);
  const [deletingInquiry, setDeletingInquiry] = useState<InquiryRecord | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<number | null>(null);

  // ===================== Success Stories State =====================
  const [successStories, setSuccessStories] = useState<SuccessStoryRecord[]>([]);
  const [isLoadingStories, setIsLoadingStories] = useState(false);
  const [editingStory, setEditingStory] = useState<Partial<SuccessStoryRecord> | null>(null);
  const [deletingStory, setDeletingStory] = useState<SuccessStoryRecord | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);

  // ===================== Blogs State =====================
  const [blogs, setBlogs] = useState<BlogRecord[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Partial<BlogRecord> | null>(null);
  const [deletingBlog, setDeletingBlog] = useState<BlogRecord | null>(null);
  const [isUploadingBlogImage, setIsUploadingBlogImage] = useState(false);
  const [blogImageUploadProgress, setBlogImageUploadProgress] = useState(0);

  // ===================== Common UI & Health =====================
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [dbHealth, setDbHealth] = useState<'UP' | 'DOWN' | 'CHECKING'>('CHECKING');
  const [isSaving, setIsSaving] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  // Check DB health
  const checkHealth = async () => {
    try {
      const res = await fetch('/api/inquiries/health');
      const data = await res.json();
      setDbHealth(data?.status === 'UP' ? 'UP' : 'DOWN');
    } catch {
      try {
        const liveRes = await fetch('https://vibeacademy.info/api/inquiries/health');
        const liveData = await liveRes.json();
        setDbHealth(liveData?.status === 'UP' ? 'UP' : 'DOWN');
      } catch {
        setDbHealth('DOWN');
      }
    }
  };

  // ===================== Fetch Inquiries =====================
  const fetchInquiries = async () => {
    setIsLoadingInquiries(true);
    setErrorMsg(null);
    try {
      let records: InquiryRecord[] = [];
      try {
        const res = await fetch(`/api/inquiries?_t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          }
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            records = json.data;
          }
        }
      } catch (err) {
        console.warn('Relative fetch warning:', err);
      }

      if (records.length === 0) {
        try {
          const fallbackRes = await fetch(`https://vibeacademy.info/api/inquiries?_t=${Date.now()}`, {
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
          });
          if (fallbackRes.ok) {
            const fallbackJson = await fallbackRes.json();
            if (fallbackJson.success && Array.isArray(fallbackJson.data) && fallbackJson.data.length > 0) {
              records = fallbackJson.data;
            }
          }
        } catch (err) {
          console.warn('Fallback fetch warning:', err);
        }
      }

      setInquiries(records);
    } catch (err: any) {
      console.error('Fetch inquiries fatal error:', err);
      setErrorMsg('Failed to fetch inquiries from database.');
    } finally {
      setIsLoadingInquiries(false);
    }
  };

  // ===================== Fetch Success Stories =====================
  const fetchSuccessStories = async () => {
    setIsLoadingStories(true);
    try {
      const res = await fetch(`/api/success-stories?_t=${Date.now()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setSuccessStories(json.data);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch success stories:', err);
    } finally {
      setIsLoadingStories(false);
    }
  };

  // ===================== Fetch Blogs =====================
  const fetchBlogs = async () => {
    setIsLoadingBlogs(true);
    try {
      const res = await fetch(`/api/blogs?_t=${Date.now()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setBlogs(json.data);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch blogs:', err);
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  useEffect(() => {
    checkHealth();
    fetchInquiries();
    fetchSuccessStories();
    fetchBlogs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('soch_admin_token');
    setToken(null);
    navigate('/login', { replace: true });
  };

  // ===================== Inquiry Actions (Edit & Delete) =====================
  const handleTogglePaymentStatus = async (inquiry: InquiryRecord, newStatus: 'Paid' | 'Unpaid') => {
    setIsUpdatingStatus(inquiry.id);
    try {
      let updateOk = false;
      try {
        const res = await fetch(`/api/inquiries/${inquiry.id}/payment-status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ payment_status: newStatus })
        });
        if (res.ok) updateOk = true;
      } catch (e) {
        console.warn('Relative update failed, falling back to live endpoint:', e);
      }

      if (!updateOk) {
        const liveRes = await fetch(`https://vibeacademy.info/api/inquiries/${inquiry.id}/payment-status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ payment_status: newStatus })
        });
        if (!liveRes.ok) throw new Error('Failed to update status in database');
      }

      setInquiries((prev) =>
        prev.map((item) =>
          item.id === inquiry.id
            ? { ...item, payment_status: newStatus, updated_at: new Date().toISOString() }
            : item
        )
      );

      if (selectedInquiry && selectedInquiry.id === inquiry.id) {
        setSelectedInquiry({
          ...selectedInquiry,
          payment_status: newStatus,
          updated_at: new Date().toISOString()
        });
      }

      showToast(`Payment status for ${inquiry.first_name} ${inquiry.last_name} set to ${newStatus}`);
    } catch (err: any) {
      alert(`Error updating payment status: ${err.message}`);
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const handleSaveInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInquiry) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/inquiries/${editingInquiry.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(editingInquiry)
      });

      if (!res.ok) {
        throw new Error('Failed to update inquiry record');
      }

      const json = await res.json();
      const updated = json.data || editingInquiry;

      setInquiries((prev) =>
        prev.map((item) => (item.id === editingInquiry.id ? { ...item, ...updated } : item))
      );

      if (selectedInquiry && selectedInquiry.id === editingInquiry.id) {
        setSelectedInquiry({ ...selectedInquiry, ...updated });
      }

      showToast(`Applicant #${editingInquiry.id} (${editingInquiry.first_name} ${editingInquiry.last_name}) updated successfully.`);
      setEditingInquiry(null);
    } catch (err: any) {
      alert(`Error updating inquiry: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteInquiry = async () => {
    if (!deletingInquiry) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/inquiries/${deletingInquiry.id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      if (!res.ok) {
        throw new Error('Failed to delete inquiry');
      }

      setInquiries((prev) => prev.filter((item) => item.id !== deletingInquiry.id));
      if (selectedInquiry && selectedInquiry.id === deletingInquiry.id) {
        setSelectedInquiry(null);
      }

      showToast(`Inquiry #${deletingInquiry.id} (${deletingInquiry.first_name}) permanently deleted.`);
      setDeletingInquiry(null);
    } catch (err: any) {
      alert(`Error deleting inquiry: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // ===================== Success Stories Actions =====================
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingVideo(true);
    setUploadProgress(10);
    try {
      const result = await uploadMediaFile(file, (pct) => setUploadProgress(pct));
      setEditingStory((prev) => ({
        ...prev,
        video_url: result.url
      }));
      setVideoPreviewUrl(result.url);
      showToast('Video uploaded to Vercel Blob successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to upload video');
    } finally {
      setIsUploadingVideo(false);
      setUploadProgress(0);
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingThumbnail(true);
    setThumbnailUploadProgress(15);
    try {
      const result = await uploadThumbnailFile(file, (pct) => setThumbnailUploadProgress(pct));
      setEditingStory((prev) => ({
        ...prev,
        thumbnail_url: result.url
      }));
      setThumbnailPreviewUrl(result.url);
      showToast('Thumbnail image uploaded to cloud storage successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to upload thumbnail image');
    } finally {
      setIsUploadingThumbnail(false);
      setThumbnailUploadProgress(0);
    }
  };

  const handleBlogImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingBlogImage(true);
    setBlogImageUploadProgress(15);
    try {
      const result = await uploadThumbnailFile(file, (pct) => setBlogImageUploadProgress(pct));
      setEditingBlog((prev) => ({
        ...prev,
        blog_image: result.url
      }));
      showToast('Blog image uploaded successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to upload blog image');
    } finally {
      setIsUploadingBlogImage(false);
      setBlogImageUploadProgress(0);
    }
  };

  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStory) return;
    setIsSaving(true);
    try {
      const isNew = !editingStory.id;
      const url = isNew ? '/api/success-stories' : `/api/success-stories/${editingStory.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(editingStory)
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        throw new Error(errorJson.message || 'Failed to save success story');
      }

      const json = await res.json();
      const savedStory = json.data;

      if (isNew) {
        setSuccessStories((prev) => [savedStory, ...prev]);
        showToast(`Success story for ${savedStory.student_name} added to Cohort 01 stories!`);
      } else {
        setSuccessStories((prev) =>
          prev.map((s) => (s.id === editingStory.id ? { ...s, ...savedStory } : s))
        );
        showToast(`Success story #${editingStory.id} updated successfully.`);
      }

      setEditingStory(null);
    } catch (err: any) {
      alert(`Error saving story: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteStory = async () => {
    if (!deletingStory) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/success-stories/${deletingStory.id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      if (!res.ok) throw new Error('Failed to delete story');

      setSuccessStories((prev) => prev.filter((s) => s.id !== deletingStory.id));
      showToast(`Success story for ${deletingStory.student_name} deleted.`);
      setDeletingStory(null);
    } catch (err: any) {
      alert(`Error deleting story: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // ===================== Blog Actions =====================
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    setIsSaving(true);
    try {
      const isNew = !editingBlog.id;
      const url = isNew ? '/api/blogs' : `/api/blogs/${editingBlog.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(editingBlog)
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        throw new Error(errorJson.message || 'Failed to save blog');
      }

      const json = await res.json();
      const savedBlog = json.data;

      if (isNew) {
        setBlogs((prev) => [savedBlog, ...prev]);
        showToast(`Blog article "${savedBlog.blog_heading}" added to The Vibe Shift!`);
      } else {
        setBlogs((prev) =>
          prev.map((b) => (b.id === editingBlog.id ? { ...b, ...savedBlog } : b))
        );
        showToast(`Blog article #${editingBlog.id} updated.`);
      }

      setEditingBlog(null);
    } catch (err: any) {
      alert(`Error saving blog: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBlog = async () => {
    if (!deletingBlog) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/blogs/${deletingBlog.id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });

      if (!res.ok) throw new Error('Failed to delete blog');

      setBlogs((prev) => prev.filter((b) => b.id !== deletingBlog.id));
      showToast(`Blog "${deletingBlog.blog_heading}" deleted.`);
      setDeletingBlog(null);
    } catch (err: any) {
      alert(`Error deleting blog: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // CSV Export for Inquiries
  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = [
      'ID',
      'First Name',
      'Last Name',
      'CNIC',
      'Email',
      'WhatsApp Number',
      'Emergency Contact Name',
      'Emergency Contact Phone',
      'Academic Status',
      'Programming Background',
      'Referral Code',
      'Message',
      'Payment Status',
      'Applied Date'
    ];

    const rows = inquiries.map((i) => [
      i.id,
      `"${i.first_name}"`,
      `"${i.last_name}"`,
      `"${i.cnic}"`,
      `"${i.email}"`,
      `"${i.active_whatsapp_number || i.phone || ''}"`,
      `"${i.emergency_contact_name || ''}"`,
      `"${i.emergency_contact_phone || ''}"`,
      `"${i.academic_status || ''}"`,
      `"${i.programming_background || ''}"`,
      `"${i.referral_code || ''}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`,
      `"${i.payment_status}"`,
      `"${new Date(i.created_at).toLocaleString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `soch_cohort02_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported inquiries to CSV successfully');
  };

  // Copy Schema SQL
  const handleCopySql = () => {
    const sqlText = `-- Create success_stories table
CREATE TABLE IF NOT EXISTS public.success_stories (
  id BIGSERIAL PRIMARY KEY,
  student_name TEXT NOT NULL,
  role TEXT DEFAULT 'Cohort 01 Graduate',
  project_description TEXT NOT NULL,
  student_details TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  video_duration TEXT DEFAULT '3:00',
  achievement TEXT DEFAULT '100% Shipped Live Code',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);
ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on success_stories" ON public.success_stories FOR SELECT USING (true);
CREATE POLICY "Allow full access on success_stories" ON public.success_stories FOR ALL USING (true) WITH CHECK (true);

-- Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id BIGSERIAL PRIMARY KEY,
  blog_heading TEXT NOT NULL,
  blog_details TEXT NOT NULL,
  blog_image TEXT NOT NULL,
  read_time TEXT DEFAULT '5 min read',
  published_date TEXT DEFAULT 'May 2026',
  author TEXT DEFAULT 'SOCH Editorial Board',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Allow full access on blogs" ON public.blogs FOR ALL USING (true) WITH CHECK (true);`;

    navigator.clipboard.writeText(sqlText);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
    showToast('SQL Schema copied to clipboard!');
  };

  // Inquiry Filter & Sort
  const filteredInquiries = useMemo(() => {
    return inquiries
      .filter((i) => {
        if (statusFilter !== 'ALL' && i.payment_status !== statusFilter) return false;
        if (!searchTerm) return true;
        const q = searchTerm.toLowerCase();
        return (
          (i.first_name || '').toLowerCase().includes(q) ||
          (i.last_name || '').toLowerCase().includes(q) ||
          (i.email || '').toLowerCase().includes(q) ||
          (i.cnic || '').toLowerCase().includes(q) ||
          (i.active_whatsapp_number || '').toLowerCase().includes(q) ||
          (i.referral_code || '').toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const timeA = new Date(a.created_at).getTime() || 0;
        const timeB = new Date(b.created_at).getTime() || 0;
        return sortBy === 'newest' ? timeB - timeA : timeA - timeB;
      });
  }, [inquiries, searchTerm, statusFilter, sortBy]);

  const stats = useMemo(() => {
    const total = inquiries.length;
    const paid = inquiries.filter((i) => i.payment_status === 'Paid').length;
    const unpaid = total - paid;
    const paidPercentage = total > 0 ? Math.round((paid / total) * 100) : 0;
    return { total, paid, unpaid, paidPercentage };
  }, [inquiries]);

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col font-sans selection:bg-[#c9459c] selection:text-white">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 shadow-2xl backdrop-blur-md text-sm animate-in fade-in slide-in-from-top-3">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="border-b border-white/10 bg-[#090d16]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-lg transition-transform group-hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #4467b0, #6b388d, #78daeb, #c9459c)'
                }}
              >
                S
              </div>
              <div>
                <span className="font-extrabold tracking-tight text-white text-base font-sans block leading-none">
                  SOCH
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-white/50 block">
                  Admin Console
                </span>
              </div>
            </Link>

            {/* DB Health Pill */}
            <div className="hidden sm:flex items-center gap-1.5 ml-4 px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/5 border border-white/10">
              <span
                className={`w-2 h-2 rounded-full ${dbHealth === 'UP'
                  ? 'bg-emerald-400 animate-pulse'
                  : dbHealth === 'CHECKING'
                    ? 'bg-amber-400'
                    : 'bg-red-400'
                  }`}
              />
              <span className="text-white/60">DB:</span>
              <span className={dbHealth === 'UP' ? 'text-emerald-400' : 'text-red-400'}>
                {dbHealth === 'UP' ? 'Connected' : dbHealth === 'CHECKING' ? 'Checking' : 'Offline'}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                checkHealth();
                fetchInquiries();
                fetchSuccessStories();
                fetchBlogs();
                showToast('Refreshed data from database');
              }}
              title="Refresh all data"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <Link
              to="/"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Landing</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-semibold text-red-300 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${activeTab === 'inquiries'
              ? 'bg-gradient-to-r from-[#4467b0] to-[#c9459c] text-white shadow-lg shadow-[#c9459c]/20'
              : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
          >
            <Users className="w-4 h-4" />
            <span>Applications (Inquiries)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white">
              {inquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('stories')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${activeTab === 'stories'
              ? 'bg-gradient-to-r from-[#4467b0] to-[#c9459c] text-white shadow-lg shadow-[#c9459c]/20'
              : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
          >
            <Film className="w-4 h-4" />
            <span>Cohort 01 Video Success Stories</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white">
              {successStories.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${activeTab === 'blogs'
              ? 'bg-gradient-to-r from-[#4467b0] to-[#c9459c] text-white shadow-lg shadow-[#c9459c]/20'
              : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>The Vibe Shift (Blogs)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 text-white">
              {blogs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('setup')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${activeTab === 'setup'
              ? 'bg-white/20 text-white'
              : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
          >
            <Database className="w-4 h-4" />
            <span>Vercel & DB Setup Guide</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ======================================================== */}
        {/* TAB 1: INQUIRIES LIST (WITH EDIT & DELETE)               */}
        {/* ======================================================== */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#0e0e12]/80 border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between text-white/50 text-xs font-medium">
                  <span>Total Applications</span>
                  <Users className="w-4 h-4 text-[#78daeb]" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                  {stats.total}
                </div>
                <div className="text-[11px] text-white/40 mt-1">Cohort 02 Candidates</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0e0e12]/80 border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between text-white/50 text-xs font-medium">
                  <span>Confirmed Paid</span>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-2">
                  {stats.paid}
                </div>
                <div className="text-[11px] text-emerald-400/60 mt-1">
                  {stats.paidPercentage}% of applicants
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0e0e12]/80 border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between text-white/50 text-xs font-medium">
                  <span>Pending / Unpaid</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 mt-2">
                  {stats.unpaid}
                </div>
                <div className="text-[11px] text-amber-300/60 mt-1">Follow up via WhatsApp</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0e0e12]/80 border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between text-white/50 text-xs font-medium">
                  <span>Admissions Target</span>
                  <DollarSign className="w-4 h-4 text-[#c9459c]" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#c9459c] mt-2">
                  PKR {(stats.paid * 15000).toLocaleString()}
                </div>
                <div className="text-[11px] text-[#c9459c]/60 mt-1">Batch 02 Net Revenue</div>
              </div>
            </div>

            {/* Filter and Action Bar */}
            <div className="p-4 rounded-2xl bg-[#0e0e12]/80 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search applicant name, CNIC, email, phone, referral..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#78daeb] transition-colors"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Status Filter & CSV */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center bg-black/60 p-1 rounded-xl border border-white/15">
                  <button
                    onClick={() => setStatusFilter('ALL')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${statusFilter === 'ALL'
                      ? 'bg-white/20 text-white'
                      : 'text-white/60 hover:text-white'
                      }`}
                  >
                    All ({stats.total})
                  </button>
                  <button
                    onClick={() => setStatusFilter('Unpaid')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${statusFilter === 'Unpaid'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-white/60 hover:text-white'
                      }`}
                  >
                    Unpaid ({stats.unpaid})
                  </button>
                  <button
                    onClick={() => setStatusFilter('Paid')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${statusFilter === 'Paid'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-white/60 hover:text-white'
                      }`}
                  >
                    Paid ({stats.paid})
                  </button>
                </div>

                <button
                  onClick={() => setSortBy((prev) => (prev === 'newest' ? 'oldest' : 'newest'))}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/60 hover:bg-white/10 border border-white/15 text-xs text-white/80 cursor-pointer"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <span className="capitalize">{sortBy}</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  disabled={inquiries.length === 0}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#4467b0]/20 to-[#c9459c]/20 hover:from-[#4467b0]/30 hover:to-[#c9459c]/30 border border-white/20 text-xs font-semibold text-white cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Inquiries Table Card */}
            <div className="rounded-2xl border border-white/10 bg-[#0e0e12]/80 backdrop-blur-md overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold text-white/60 uppercase tracking-wider">
                      <th className="py-3.5 px-4 sm:px-6">Applicant</th>
                      <th className="py-3.5 px-4">CNIC / B-Form</th>
                      <th className="py-3.5 px-4">Contact Info</th>
                      <th className="py-3.5 px-4">Academic & Background</th>
                      <th className="py-3.5 px-4 text-center">Payment Status</th>
                      <th className="py-3.5 px-4">Applied Date</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {isLoadingInquiries && inquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-16 text-center text-white/50">
                          <div className="flex flex-col items-center gap-2">
                            <RefreshCw className="w-6 h-6 animate-spin text-[#78daeb]" />
                            <span className="text-sm">Fetching applications from database...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-16 text-center text-white/50">
                          <div className="max-w-md mx-auto space-y-3">
                            <Users className="w-10 h-10 text-white/20 mx-auto" />
                            <p className="text-base font-semibold text-white/80">No applications match</p>
                            <p className="text-xs text-white/50">
                              {searchTerm || statusFilter !== 'ALL'
                                ? 'No applications match your active search or filter.'
                                : 'No inquiry records found in database.'}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inquiry) => {
                        const isPaid = inquiry.payment_status === 'Paid';
                        const isUpdating = isUpdatingStatus === inquiry.id;

                        return (
                          <tr key={inquiry.id} className="hover:bg-white/[0.02] transition-colors group">
                            {/* 1. Applicant */}
                            <td className="py-4 px-4 sm:px-6">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs uppercase shrink-0"
                                  style={{
                                    background: isPaid
                                      ? 'linear-gradient(135deg, #10b981, #059669)'
                                      : 'linear-gradient(135deg, #6b388d, #c9459c)'
                                  }}
                                >
                                  {(inquiry.first_name?.[0] || 'A').toUpperCase()}
                                  {(inquiry.last_name?.[0] || 'P').toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-semibold text-white">
                                    {inquiry.first_name} {inquiry.last_name}
                                  </div>
                                  <div className="text-[11px] font-mono text-[#78daeb]">
                                    Ref: VB-02-{String(inquiry.id).padStart(6, '0')}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* 2. CNIC */}
                            <td className="py-4 px-4 font-mono text-xs text-white/80 whitespace-nowrap">
                              {inquiry.cnic || '—'}
                            </td>

                            {/* 3. Contact Info */}
                            <td className="py-4 px-4">
                              <div className="space-y-1">
                                {(() => {
                                  const phoneNum = inquiry.active_whatsapp_number || inquiry.phone || '';
                                  const cleanDigits = phoneNum.replace(/[^0-9]/g, '');
                                  return (
                                    <a
                                      href={cleanDigits ? `https://wa.me/${cleanDigits}` : '#'}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-mono"
                                      title="Message on WhatsApp"
                                    >
                                      <Phone className="w-3.5 h-3.5" />
                                      <span>{phoneNum || 'N/A'}</span>
                                    </a>
                                  );
                                })()}
                                <div className="flex items-center gap-1.5 text-xs text-white/60">
                                  <Mail className="w-3.5 h-3.5 text-white/40" />
                                  <span className="truncate max-w-[180px]">{inquiry.email || '—'}</span>
                                </div>
                              </div>
                            </td>

                            {/* 4. Academic & Background */}
                            <td className="py-4 px-4">
                              <div className="space-y-1 max-w-[220px]">
                                <div className="text-xs text-white/90 truncate font-medium">
                                  {inquiry.academic_status || '—'}
                                </div>
                                <div className="text-[11px] text-white/50 truncate">
                                  {inquiry.programming_background || '—'}
                                </div>
                              </div>
                            </td>

                            {/* 5. Payment Status */}
                            <td className="py-4 px-4 text-center">
                              <div className="inline-flex flex-col items-center gap-1.5">
                                <span
                                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${isPaid
                                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                                    : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                    }`}
                                >
                                  {isPaid ? (
                                    <>
                                      <CheckCircle className="w-3.5 h-3.5" />
                                      <span>Paid</span>
                                    </>
                                  ) : (
                                    <>
                                      <Clock className="w-3.5 h-3.5" />
                                      <span>Unpaid</span>
                                    </>
                                  )}
                                </span>

                                <button
                                  disabled={isUpdating}
                                  onClick={() => handleTogglePaymentStatus(inquiry, isPaid ? 'Unpaid' : 'Paid')}
                                  className={`text-[11px] underline font-medium cursor-pointer transition-colors disabled:opacity-50 ${isPaid
                                    ? 'text-amber-400 hover:text-amber-300'
                                    : 'text-emerald-400 hover:text-emerald-300'
                                    }`}
                                >
                                  {isUpdating ? 'Updating...' : isPaid ? 'Mark Unpaid' : 'Mark Paid'}
                                </button>
                              </div>
                            </td>

                            {/* 6. Applied Date */}
                            <td className="py-4 px-4 whitespace-nowrap text-xs text-white/60">
                              <div>{new Date(inquiry.created_at).toLocaleDateString()}</div>
                              <div className="text-[10px] text-white/40">
                                {new Date(inquiry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </td>

                            {/* 7. ACTIONS: DETAILS, EDIT, DELETE */}
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {/* Details */}
                                <button
                                  onClick={() => setSelectedInquiry(inquiry)}
                                  title="View Full Details"
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                {/* Edit */}
                                <button
                                  onClick={() => setEditingInquiry({ ...inquiry })}
                                  title="Edit Application"
                                  className="p-1.5 rounded-lg bg-[#78daeb]/10 hover:bg-[#78daeb]/25 border border-[#78daeb]/30 text-[#78daeb] transition-colors cursor-pointer"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>

                                {/* Delete */}
                                <button
                                  onClick={() => setDeletingInquiry(inquiry)}
                                  title="Delete Application"
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 border border-red-500/30 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Indicator */}
              <div className="px-6 py-3 border-t border-white/5 bg-white/[0.01] flex items-center justify-between text-xs text-white/50">
                <span>Showing {filteredInquiries.length} of {inquiries.length} inquiries</span>
                <span>Database: Supabase (`inquiries`)</span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: COHORT 01 VIDEO SUCCESS STORIES                   */}
        {/* ======================================================== */}
        {activeTab === 'stories' && (
          <div className="space-y-6">
            {/* Header with Add Story button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0e0e12]/80 border border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Film className="w-5 h-5 text-[#2A6EB4]" />
                  <span>Cohort 01 Video Success Stories</span>
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  Manage student video testimonials shown in "Why Choose Us" and on the homepage. Backed by database table <code className="text-[#78daeb]">success_stories</code>.
                </p>
              </div>

              <button
                onClick={() => {
                  const defaultThumb = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                  const defaultVid = 'https://vibeacademy.info/wp-content/uploads/2026/05/WhatsApp-Video-2026-05-21-at-7.16.02-PM.mp4';
                  setEditingStory({
                    student_name: '',
                    role: 'Batch 01 Graduate • Full-Stack AI Builder',
                    project_description: '',
                    student_details: '',
                    video_url: defaultVid,
                    thumbnail_url: defaultThumb,
                    video_duration: '3:20',
                    achievement: '100% Shipped Live Code',
                    display_order: successStories.length + 1
                  });
                  setThumbnailPreviewUrl(defaultThumb);
                  setVideoPreviewUrl(defaultVid);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4467b0] to-[#c9459c] hover:opacity-95 text-white font-semibold text-xs shadow-lg shadow-[#c9459c]/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Success Story</span>
              </button>
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingStories && successStories.length === 0 ? (
                <div className="col-span-3 py-16 text-center text-white/50">
                  <RefreshCw className="w-6 h-6 animate-spin text-[#78daeb] mx-auto mb-2" />
                  <span>Loading success stories...</span>
                </div>
              ) : successStories.length === 0 ? (
                <div className="col-span-3 py-16 text-center text-white/50">
                  <p className="text-base font-semibold text-white/80">No success stories yet</p>
                  <p className="text-xs text-white/40 mt-1">Click "Add New Success Story" to create the first record.</p>
                </div>
              ) : (
                successStories.map((story) => (
                  <div
                    key={story.id}
                    className="rounded-2xl border border-white/10 bg-[#0e0e12]/80 overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all shadow-xl"
                  >
                    <div>
                      {/* Thumbnail & Video Preview */}
                      <div className="relative aspect-video bg-black overflow-hidden">
                        <img
                          src={story.thumbnail_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                          alt={story.student_name}
                          className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                          <a
                            href={story.video_url}
                            target="_blank"
                            rel="noreferrer"
                            className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                            title="Play Video"
                          >
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                          </a>
                        </div>
                        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono font-bold text-white">
                          {story.video_duration || '3:00'}
                        </div>
                        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/80 text-[10px] font-semibold text-[#78daeb] border border-white/10">
                          Cohort 01
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <div>
                          <h4 className="font-bold text-white text-base">
                            {story.student_name}
                          </h4>
                          <p className="text-xs text-[#78daeb] font-medium">
                            {story.role}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white/80">
                          <strong className="text-white block text-[11px] uppercase tracking-wider mb-0.5 text-white/60">
                            Project Built:
                          </strong>
                          {story.project_description}
                        </div>

                        <p className="text-xs text-white/70 italic line-clamp-3 border-l-2 border-[#c9459c] pl-2.5">
                          "{story.student_details}"
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="p-4 pt-3 border-t border-white/10 flex items-center justify-between bg-black/30">
                      <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[150px]">{story.achievement}</span>
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingStory({ ...story });
                            setThumbnailPreviewUrl(story.thumbnail_url || null);
                            setVideoPreviewUrl(story.video_url || null);
                          }}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 text-xs flex items-center gap-1 cursor-pointer"
                          title="Edit Story"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#78daeb]" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setDeletingStory(story)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 text-xs flex items-center gap-1 cursor-pointer"
                          title="Delete Story"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: THE VIBE SHIFT (BLOGS)                            */}
        {/* ======================================================== */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            {/* Header with Add Blog button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0e0e12]/80 border border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-[#c9459c]" />
                  <span>The Vibe Shift (Blogs)</span>
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  Manage blog articles shown in "The Vibe Shift" carousel section. Backed by database table <code className="text-[#78daeb]">blogs</code>.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingBlog({
                    blog_heading: '',
                    blog_details: '',
                    blog_image: 'https://vibeacademy.info/wp-content/uploads/2026/05/How-Local-Developers-are-Shaping-the-Future.png',
                    read_time: '5 min read',
                    published_date: 'May 2026',
                    author: 'SOCH Editorial Board',
                    display_order: blogs.length + 1
                  });
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#4467b0] to-[#c9459c] hover:opacity-95 text-white font-semibold text-xs shadow-lg shadow-[#c9459c]/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Blog Article</span>
              </button>
            </div>

            {/* Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingBlogs && blogs.length === 0 ? (
                <div className="col-span-3 py-16 text-center text-white/50">
                  <RefreshCw className="w-6 h-6 animate-spin text-[#78daeb] mx-auto mb-2" />
                  <span>Loading blogs...</span>
                </div>
              ) : blogs.length === 0 ? (
                <div className="col-span-3 py-16 text-center text-white/50">
                  <p className="text-base font-semibold text-white/80">No blog articles yet</p>
                  <p className="text-xs text-white/40 mt-1">Click "Add New Blog Article" to create your first article.</p>
                </div>
              ) : (
                blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="rounded-2xl border border-white/10 bg-[#0e0e12]/80 overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all shadow-xl"
                  >
                    <div>
                      {/* Blog Image */}
                      <div className="aspect-video bg-[#090d16] overflow-hidden relative">
                        <img
                          src={blog.blog_image || 'https://vibeacademy.info/wp-content/uploads/2026/05/How-Local-Developers-are-Shaping-the-Future.png'}
                          alt={blog.blog_heading}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white/80">
                          {blog.read_time || '5 min read'}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <div className="text-[11px] text-white/40 flex items-center justify-between">
                          <span>{blog.published_date || 'May 2026'}</span>
                          <span className="text-[#c9459c] font-semibold">{blog.author || 'SOCH'}</span>
                        </div>

                        <h4 className="font-bold text-white text-base leading-snug line-clamp-2">
                          {blog.blog_heading}
                        </h4>

                        <p className="text-xs text-white/70 line-clamp-4 leading-relaxed">
                          {blog.blog_details}
                        </p>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 pt-3 border-t border-white/10 flex items-center justify-between bg-black/30">
                      <span className="text-xs text-[#78daeb] font-mono">ID: #{blog.id}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingBlog({ ...blog })}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 text-xs flex items-center gap-1 cursor-pointer"
                          title="Edit Blog"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#78daeb]" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setDeletingBlog(blog)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 text-xs flex items-center gap-1 cursor-pointer"
                          title="Delete Blog"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: SETUP GUIDE & VERCEL BUCKET                       */}
        {/* ======================================================== */}
        {activeTab === 'setup' && (
          <div className="space-y-6">
            {/* Guide Header */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#4467b0]/20 via-[#6b388d]/20 to-[#c9459c]/20 border border-white/15 backdrop-blur-md space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#78daeb]/15 text-[#78daeb] border border-[#78daeb]/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Architecture & Storage Integration</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                How Vercel Bucket (Vercel Blob) & Database Tables Work
              </h2>
              <p className="text-sm text-white/70 max-w-3xl leading-relaxed">
                Learn how large video files (100MB+) bypass serverless limits using Vercel Blob client uploads, and execute the SQL migration to create tables for Success Stories and Blogs in Supabase.
              </p>
            </div>

            {/* 2 Column Guides */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Part 1: Vercel Bucket / Blob Guide */}
              <div className="p-6 rounded-2xl bg-[#0e0e12]/80 border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <UploadCloud className="w-5 h-5 text-[#78daeb]" />
                  <span>1. How Vercel Bucket Upload Works</span>
                </div>

                <div className="space-y-3 text-xs text-white/70 leading-relaxed">
                  <p>
                    Vercel's official cloud storage for files is <strong className="text-white">Vercel Blob</strong> (referred to as Vercel Bucket).
                  </p>

                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
                    <strong className="block font-semibold mb-1">Critical Serverless Limit:</strong>
                    Vercel Serverless Functions have a strict <strong className="text-white">4.5 MB body size limit</strong>. Video files are typically 20MB to 200MB!
                  </div>

                  <p>
                    To solve this, we implemented <strong className="text-white">Direct Client-to-Blob Uploads</strong> using <code className="text-[#78daeb]">@vercel/blob/client</code>:
                  </p>

                  <ol className="list-decimal pl-5 space-y-1.5 text-white/80">
                    <li>
                      <strong>User selects MP4 video:</strong> Browser initiates upload via <code className="text-[#78daeb]">uploadMediaFile()</code>.
                    </li>
                    <li>
                      <strong>Secure Token Exchange:</strong> Browser calls <code className="text-[#78daeb]">/api/upload</code>, which generates a temporary authorized client token using your secret <code className="text-[#78daeb]">BLOB_READ_WRITE_TOKEN</code>.
                    </li>
                    <li>
                      <strong>Direct CDN Streaming:</strong> The browser streams the video directly to Vercel's Edge CDN without touching serverless limits.
                    </li>
                    <li>
                      <strong>Database Persistence:</strong> Once the upload finishes, the returned public CDN URL (e.g. <code className="text-[#78daeb]">https://public.blob.vercel-storage.com/...mp4</code>) is saved in Supabase table <code className="text-[#78daeb]">success_stories</code>!
                    </li>
                  </ol>

                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <strong className="text-white block text-sm">How to enable in Vercel in 2 minutes:</strong>
                    <ol className="list-decimal pl-5 space-y-1 text-white/70">
                      <li>Open your project at <strong>vercel.com</strong></li>
                      <li>Navigate to the <strong>Storage</strong> tab</li>
                      <li>Click <strong>Create Database</strong> → Select <strong>Blob</strong></li>
                      <li>Name the store (e.g. <code>soch-media</code>) and click <strong>Create</strong></li>
                      <li>Vercel automatically injects <code>BLOB_READ_WRITE_TOKEN</code> into your environment variables!</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Part 2: Supabase SQL Setup */}
              <div className="p-6 rounded-2xl bg-[#0e0e12]/80 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-bold text-base">
                    <Database className="w-5 h-5 text-[#c9459c]" />
                    <span>2. Supabase SQL Migration Script</span>
                  </div>
                  <button
                    onClick={handleCopySql}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-semibold cursor-pointer transition-colors"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
                  </button>
                </div>

                <p className="text-xs text-white/70">
                  Run this query once in your Supabase Dashboard (<span className="text-white">SQL Editor → New Query → Run</span>) to create tables <code className="text-[#78daeb]">success_stories</code> and <code className="text-[#78daeb]">blogs</code> with Row Level Security (RLS) policies.
                </p>

                <div className="p-3.5 rounded-xl bg-black border border-white/15 overflow-x-auto text-[11px] font-mono text-white/80 max-h-[340px] overflow-y-auto space-y-2">
                  <pre>{`-- Table: success_stories (Cohort 01 Videos)
CREATE TABLE IF NOT EXISTS public.success_stories (
  id BIGSERIAL PRIMARY KEY,
  student_name TEXT NOT NULL,
  role TEXT DEFAULT 'Cohort 01 Graduate',
  project_description TEXT NOT NULL,
  student_details TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  video_duration TEXT DEFAULT '3:00',
  achievement TEXT DEFAULT '100% Shipped Live Code',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on success_stories"
  ON public.success_stories FOR SELECT USING (true);
CREATE POLICY "Allow full access on success_stories"
  ON public.success_stories FOR ALL USING (true) WITH CHECK (true);

-- Table: blogs (The Vibe Shift)
CREATE TABLE IF NOT EXISTS public.blogs (
  id BIGSERIAL PRIMARY KEY,
  blog_heading TEXT NOT NULL,
  blog_details TEXT NOT NULL,
  blog_image TEXT NOT NULL,
  read_time TEXT DEFAULT '5 min read',
  published_date TEXT DEFAULT 'May 2026',
  author TEXT DEFAULT 'SOCH Editorial Board',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on blogs"
  ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Allow full access on blogs"
  ON public.blogs FOR ALL USING (true) WITH CHECK (true);`}</pre>
                </div>

                <div className="text-xs text-white/50 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Also saved locally in your repository at <code className="text-white">supabase_schema.sql</code>.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* MODAL: VIEW INQUIRY DETAILS                             */}
      {/* ======================================================== */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0f111a] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <div className="text-xs font-mono text-[#78daeb]">
                  Reference ID: VB-02-{String(selectedInquiry.id).padStart(6, '0')}
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedInquiry.first_name} {selectedInquiry.last_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
                <span className="text-white/40 block">CNIC / B-Form</span>
                <span className="text-white font-mono font-medium">{selectedInquiry.cnic || '—'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
                <span className="text-white/40 block">Email Address</span>
                <span className="text-white font-medium">{selectedInquiry.email || '—'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
                <span className="text-white/40 block">WhatsApp / Phone</span>
                <span className="text-emerald-400 font-mono font-medium">{selectedInquiry.active_whatsapp_number || '—'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
                <span className="text-white/40 block">Payment Status</span>
                <span className={selectedInquiry.payment_status === 'Paid' ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                  {selectedInquiry.payment_status}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
                <span className="text-white/40 block">Academic Status</span>
                <span className="text-white font-medium">{selectedInquiry.academic_status || '—'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
                <span className="text-white/40 block">Programming Background</span>
                <span className="text-white font-medium">{selectedInquiry.programming_background || '—'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
                <span className="text-white/40 block">Emergency Contact</span>
                <span className="text-white font-medium">
                  {selectedInquiry.emergency_contact_name || '—'} ({selectedInquiry.emergency_contact_phone || 'N/A'})
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 space-y-1">
                <span className="text-white/40 block">Referral Code</span>
                <span className="text-[#78daeb] font-mono">{selectedInquiry.referral_code || 'None'}</span>
              </div>
            </div>

            {selectedInquiry.message && (
              <div className="p-4 rounded-xl bg-white/5 space-y-1 text-xs">
                <span className="text-white/40 block">Applicant Message / Motivation</span>
                <p className="text-white/90 leading-relaxed">{selectedInquiry.message}</p>
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-white/40">
                Applied: {new Date(selectedInquiry.created_at).toLocaleString()}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const toEdit = { ...selectedInquiry };
                    setSelectedInquiry(null);
                    setEditingInquiry(toEdit);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#78daeb]/20 hover:bg-[#78daeb]/30 border border-[#78daeb]/40 text-[#78daeb] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Application</span>
                </button>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: EDIT INQUIRY (REQUIREMENT 1)                      */}
      {/* ======================================================== */}
      {editingInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <form
            onSubmit={handleSaveInquiry}
            className="relative w-full max-w-2xl bg-[#0f111a] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#78daeb]/15 text-[#78daeb]">
                  <Edit2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Edit Inquiry Record #{editingInquiry.id}</h3>
                  <p className="text-xs text-white/50">Update applicant details stored in database</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingInquiry(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-white/70 mb-1 font-semibold">First Name *</label>
                <input
                  type="text"
                  required
                  value={editingInquiry.first_name}
                  onChange={(e) => setEditingInquiry({ ...editingInquiry, first_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold">Last Name *</label>
                <input
                  type="text"
                  required
                  value={editingInquiry.last_name}
                  onChange={(e) => setEditingInquiry({ ...editingInquiry, last_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold">CNIC / B-Form</label>
                <input
                  type="text"
                  value={editingInquiry.cnic}
                  onChange={(e) => setEditingInquiry({ ...editingInquiry, cnic: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold">Email *</label>
                <input
                  type="email"
                  required
                  value={editingInquiry.email}
                  onChange={(e) => setEditingInquiry({ ...editingInquiry, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold">WhatsApp Number</label>
                <input
                  type="text"
                  value={editingInquiry.active_whatsapp_number}
                  onChange={(e) => setEditingInquiry({ ...editingInquiry, active_whatsapp_number: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold">Payment Status</label>
                <select
                  value={editingInquiry.payment_status}
                  onChange={(e) => setEditingInquiry({ ...editingInquiry, payment_status: e.target.value as 'Paid' | 'Unpaid' })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                >
                  <option value="Unpaid">Unpaid</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold">Academic Status</label>
                <input
                  type="text"
                  value={editingInquiry.academic_status || ''}
                  onChange={(e) => setEditingInquiry({ ...editingInquiry, academic_status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold">Programming Background</label>
                <input
                  type="text"
                  value={editingInquiry.programming_background || ''}
                  onChange={(e) => setEditingInquiry({ ...editingInquiry, programming_background: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold">Emergency Contact Name</label>
                <input
                  type="text"
                  value={editingInquiry.emergency_contact_name || ''}
                  onChange={(e) => setEditingInquiry({ ...editingInquiry, emergency_contact_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold">Emergency Contact Phone</label>
                <input
                  type="text"
                  value={editingInquiry.emergency_contact_phone || ''}
                  onChange={(e) => setEditingInquiry({ ...editingInquiry, emergency_contact_phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-white/70 mb-1 font-semibold">Referral Code</label>
                <input
                  type="text"
                  value={editingInquiry.referral_code || ''}
                  onChange={(e) => setEditingInquiry({ ...editingInquiry, referral_code: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-white/70 mb-1 font-semibold">Message / Notes</label>
                <textarea
                  rows={3}
                  value={editingInquiry.message || ''}
                  onChange={(e) => setEditingInquiry({ ...editingInquiry, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingInquiry(null)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#4467b0] to-[#c9459c] text-white text-xs font-semibold cursor-pointer shadow-lg disabled:opacity-50"
              >
                {isSaving ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: DELETE INQUIRY CONFIRMATION (REQUIREMENT 1)        */}
      {/* ======================================================== */}
      {deletingInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#0f111a] border border-red-500/30 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 text-red-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-white">Delete Inquiry Application?</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Are you sure you want to permanently delete the application for{' '}
                <strong className="text-white">
                  {deletingInquiry.first_name} {deletingInquiry.last_name}
                </strong>{' '}
                (Ref: VB-02-{String(deletingInquiry.id).padStart(6, '0')})? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingInquiry(null)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteInquiry}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer shadow-lg shadow-red-600/30 disabled:opacity-50"
              >
                {isSaving ? 'Deleting...' : 'Yes, Delete Record'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT SUCCESS STORY (REQUIREMENT 2)          */}
      {/* ======================================================== */}
      {editingStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <form
            onSubmit={handleSaveStory}
            className="relative w-full max-w-2xl bg-[#0f111a] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#2A6EB4]/15 text-[#78daeb]">
                  <Film className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {editingStory.id ? `Edit Success Story #${editingStory.id}` : 'Add Cohort 01 Video Success Story'}
                  </h3>
                  <p className="text-xs text-white/50">Upload student video & enter project accomplishments</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingStory(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 mb-1 font-semibold">Student Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Daniyal"
                    value={editingStory.student_name || ''}
                    onChange={(e) => setEditingStory({ ...editingStory, student_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1 font-semibold">Student Role / Batch Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Batch 01 Graduate • Lead Full-Stack Engineer"
                    value={editingStory.role || ''}
                    onChange={(e) => setEditingStory({ ...editingStory, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold">Project Description *</label>
                <textarea
                  rows={2}
                  required
                  placeholder='e.g. Built "TaskFlow AI" — real-time project collaboration & automated sprint task breakdown tool.'
                  value={editingStory.project_description || ''}
                  onChange={(e) => setEditingStory({ ...editingStory, project_description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold">Details Told by Student (Quote & Experience) *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Before SOCH, I spent hours debugging boilerplate. The Vibe Coding methodology taught me to architect systems with clarity..."
                  value={editingStory.student_details || ''}
                  onChange={(e) => setEditingStory({ ...editingStory, student_details: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                />
              </div>

              {/* Video Upload & URL */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-white/80 font-bold flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-[#78daeb]" />
                    <span>Student Video (Vercel Bucket / URL) *</span>
                  </label>
                  <span className="text-[10px] text-white/40">MP4, WebM, MOV</span>
                </div>

                {/* Upload to Vercel Bucket */}
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#78daeb]/15 hover:bg-[#78daeb]/25 border border-[#78daeb]/30 text-[#78daeb] font-semibold cursor-pointer transition-colors text-xs">
                    <UploadCloud className="w-4 h-4" />
                    <span>{isUploadingVideo ? `Uploading (${uploadProgress}%)...` : 'Upload Video to Vercel Bucket'}</span>
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime"
                      disabled={isUploadingVideo}
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-white/40 text-[11px]">or paste video link below</span>
                </div>

                {isUploadingVideo && (
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#78daeb] h-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}

                <input
                  type="url"
                  required
                  placeholder="https://...mp4 or Vercel Blob URL"
                  value={editingStory.video_url || ''}
                  onChange={(e) => setEditingStory({ ...editingStory, video_url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb] font-mono text-[11px]"
                />
              </div>

              {/* Thumbnail Image Upload & URL */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-white/80 font-bold flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#c9459c]" />
                    <span>Thumbnail Image for Video (Upload File or URL) *</span>
                  </label>
                  <span className="text-[10px] text-white/40">PNG, JPG, WebP, GIF (Max 15MB)</span>
                </div>

                {/* Thumbnail Preview Card */}
                {(thumbnailPreviewUrl || editingStory.thumbnail_url) && (
                  <div className="flex items-start gap-3 p-2.5 rounded-xl bg-black/40 border border-white/10">
                    <div className="relative aspect-video w-36 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-white/10">
                      <img
                        src={thumbnailPreviewUrl || editingStory.thumbnail_url}
                        alt="Thumbnail Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-semibold text-emerald-400">
                        Active
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 space-y-1 text-[11px]">
                      <p className="text-white font-medium truncate">Selected Thumbnail</p>
                      <p className="text-white/40 truncate text-[10px] font-mono">{editingStory.thumbnail_url}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setThumbnailPreviewUrl(null);
                          setEditingStory((prev) => ({ ...prev, thumbnail_url: '' }));
                        }}
                        className="text-red-400 hover:text-red-300 font-semibold text-[10px] cursor-pointer mt-1"
                      >
                        Clear Thumbnail
                      </button>
                    </div>
                  </div>
                )}

                {/* Upload Action Button */}
                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#4467b0] to-[#c9459c] hover:opacity-95 text-white font-semibold cursor-pointer transition-all text-xs shadow-md">
                    <UploadCloud className="w-4 h-4" />
                    <span>{isUploadingThumbnail ? `Uploading (${thumbnailUploadProgress}%)...` : 'Upload Thumbnail Image'}</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                      disabled={isUploadingThumbnail}
                      onChange={handleThumbnailUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-white/40 text-[11px]">or edit/paste direct image URL below</span>
                </div>

                {/* Progress bar */}
                {isUploadingThumbnail && (
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#c9459c] h-full transition-all duration-300"
                      style={{ width: `${thumbnailUploadProgress}%` }}
                    />
                  </div>
                )}

                <input
                  type="url"
                  placeholder="https://...jpg or uploaded thumbnail URL"
                  value={editingStory.thumbnail_url || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditingStory({ ...editingStory, thumbnail_url: val });
                    setThumbnailPreviewUrl(val || null);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb] font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1 font-semibold">Video Duration</label>
                  <input
                    type="text"
                    placeholder="3:45"
                    value={editingStory.video_duration || ''}
                    onChange={(e) => setEditingStory({ ...editingStory, video_duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1 font-semibold">Achievement Badge</label>
                  <input
                    type="text"
                    placeholder="Landed $2.5k/mo Remote Retainer"
                    value={editingStory.achievement || ''}
                    onChange={(e) => setEditingStory({ ...editingStory, achievement: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingStory(null)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving || isUploadingVideo}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#4467b0] to-[#c9459c] text-white text-xs font-semibold cursor-pointer shadow-lg disabled:opacity-50"
              >
                {isSaving ? 'Saving Story...' : 'Save Success Story'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: DELETE SUCCESS STORY CONFIRMATION                 */}
      {/* ======================================================== */}
      {deletingStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#0f111a] border border-red-500/30 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 text-red-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-white">Delete Success Story?</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Are you sure you want to delete the success story for{' '}
                <strong className="text-white">{deletingStory.student_name}</strong>?
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingStory(null)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteStory}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer shadow-lg shadow-red-600/30 disabled:opacity-50"
              >
                {isSaving ? 'Deleting...' : 'Yes, Delete Story'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT BLOG (REQUIREMENT 3)                   */}
      {/* ======================================================== */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <form
            onSubmit={handleSaveBlog}
            className="relative w-full max-w-2xl bg-[#0f111a] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#c9459c]/15 text-[#c9459c]">
                  <Newspaper className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {editingBlog.id ? `Edit Blog Article #${editingBlog.id}` : 'Add Blog Article to The Vibe Shift'}
                  </h3>
                  <p className="text-xs text-white/50">Manage blog heading, image, and details stored in database</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingBlog(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-white/70 mb-1 font-semibold">Blog Heading *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How Local Developers are Shaping the Future"
                  value={editingBlog.blog_heading || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, blog_heading: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                />
              </div>

              {/* Blog Image Upload & URL */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-white/80 font-bold flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#c9459c]" />
                    <span>Blog Cover Image (Upload File or URL) *</span>
                  </label>
                  <span className="text-[10px] text-white/40">PNG, JPG, WebP</span>
                </div>

                {editingBlog.blog_image && (
                  <div className="flex items-start gap-3 p-2 rounded-xl bg-black/40 border border-white/10">
                    <div className="relative aspect-video w-32 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-white/10">
                      <img
                        src={editingBlog.blog_image}
                        alt="Blog Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1 text-[11px]">
                      <p className="text-white font-medium truncate">Selected Cover</p>
                      <p className="text-white/40 truncate text-[10px] font-mono">{editingBlog.blog_image}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#4467b0] to-[#c9459c] hover:opacity-95 text-white font-semibold cursor-pointer transition-all text-xs shadow-md">
                    <UploadCloud className="w-4 h-4" />
                    <span>{isUploadingBlogImage ? `Uploading (${blogImageUploadProgress}%)...` : 'Upload Blog Image'}</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      disabled={isUploadingBlogImage}
                      onChange={handleBlogImageUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-white/40 text-[11px]">or paste direct image URL below</span>
                </div>

                {isUploadingBlogImage && (
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#c9459c] h-full transition-all duration-300"
                      style={{ width: `${blogImageUploadProgress}%` }}
                    />
                  </div>
                )}

                <input
                  type="url"
                  required
                  placeholder="https://...png or uploaded image URL"
                  value={editingBlog.blog_image || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, blog_image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb] font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold">Blog Details / Content *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Write the full details and body of the blog article..."
                  value={editingBlog.blog_details || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, blog_details: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb] leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-white/70 mb-1 font-semibold">Read Time</label>
                  <input
                    type="text"
                    placeholder="5 min read"
                    value={editingBlog.read_time || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, read_time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1 font-semibold">Published Date</label>
                  <input
                    type="text"
                    placeholder="May 2026"
                    value={editingBlog.published_date || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, published_date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1 font-semibold">Author</label>
                  <input
                    type="text"
                    placeholder="SOCH Editorial Board"
                    value={editingBlog.author || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-[#78daeb]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingBlog(null)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#4467b0] to-[#c9459c] text-white text-xs font-semibold cursor-pointer shadow-lg disabled:opacity-50"
              >
                {isSaving ? 'Saving Article...' : 'Save Blog Article'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: DELETE BLOG CONFIRMATION                         */}
      {/* ======================================================== */}
      {deletingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#0f111a] border border-red-500/30 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 text-red-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-white">Delete Blog Article?</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Are you sure you want to delete the blog article{' '}
                <strong className="text-white">"{deletingBlog.blog_heading}"</strong>?
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingBlog(null)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteBlog}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer shadow-lg shadow-red-600/30 disabled:opacity-50"
              >
                {isSaving ? 'Deleting...' : 'Yes, Delete Blog'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
