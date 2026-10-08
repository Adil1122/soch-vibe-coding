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
  Database
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface InquiryRecord {
  id: number;
  first_name: string;
  last_name: string;
  cnic: string;
  email: string;
  active_whatsapp_number: string;
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

export const AdminDashboard: React.FC = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('soch_admin_token'));
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Inquiries State
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [dbHealth, setDbHealth] = useState<'UP' | 'DOWN' | 'CHECKING'>('CHECKING');

  // Filter & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Paid' | 'Unpaid'>('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Modal Detail View
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<number | null>(null);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  // Check DB health
  const checkHealth = async () => {
    try {
      const res = await fetch('/api/inquiries/health');
      const data = await res.json();
      setDbHealth(data?.status === 'UP' ? 'UP' : 'DOWN');
    } catch {
      setDbHealth('DOWN');
    }
  };

  // Fetch inquiries from NestJS backend
  const fetchInquiries = async () => {
    if (!token) return;
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/inquiries', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        handleLogout();
        setErrorMsg('Session expired. Please log in again.');
        return;
      }

      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setInquiries(json.data);
      } else {
        setInquiries([]);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Failed to connect to backend server. Make sure the NestJS server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  useEffect(() => {
    if (token) {
      fetchInquiries();
    }
  }, [token]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid credentials');
      }

      localStorage.setItem('soch_admin_token', data.token);
      setToken(data.token);
      showToast('Welcome, Administrator!');
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Check backend connection.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('soch_admin_token');
    setToken(null);
    setInquiries([]);
  };

  // Toggle Payment Status (Paid <-> Unpaid)
  const handleTogglePaymentStatus = async (inquiry: InquiryRecord, newStatus: 'Paid' | 'Unpaid') => {
    if (!token) return;
    setIsUpdatingStatus(inquiry.id);

    try {
      const res = await fetch(`/api/inquiries/${inquiry.id}/payment-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ payment_status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to update payment status');
      }

      // Optimistic update local state
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
          updated_at: new Date().toISOString(),
        });
      }

      showToast(`Payment status for ${inquiry.first_name} ${inquiry.last_name} set to ${newStatus}`);
    } catch (err: any) {
      alert(`Error updating payment status: ${err.message}`);
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  // Export to CSV
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
      'Applied Date',
    ];

    const rows = inquiries.map((i) => [
      i.id,
      `"${i.first_name}"`,
      `"${i.last_name}"`,
      `"${i.cnic}"`,
      `"${i.email}"`,
      `"${i.active_whatsapp_number}"`,
      `"${i.emergency_contact_name || ''}"`,
      `"${i.emergency_contact_phone || ''}"`,
      `"${i.academic_status || ''}"`,
      `"${i.programming_background || ''}"`,
      `"${i.referral_code || ''}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`,
      `"${i.payment_status}"`,
      `"${i.created_at}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `soch_cohort02_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered & Sorted Inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries
      .filter((item) => {
        if (statusFilter !== 'ALL' && item.payment_status !== statusFilter) {
          return false;
        }
        if (!searchTerm.trim()) return true;
        const q = searchTerm.toLowerCase();
        return (
          item.first_name.toLowerCase().includes(q) ||
          item.last_name.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.cnic.toLowerCase().includes(q) ||
          item.active_whatsapp_number.toLowerCase().includes(q) ||
          (item.referral_code && item.referral_code.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        return sortBy === 'newest' ? timeB - timeA : timeA - timeB;
      });
  }, [inquiries, searchTerm, statusFilter, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const total = inquiries.length;
    const paid = inquiries.filter((i) => i.payment_status === 'Paid').length;
    const unpaid = total - paid;
    const paidRate = total > 0 ? Math.round((paid / total) * 100) : 0;
    return { total, paid, unpaid, paidRate };
  }, [inquiries]);

  // Render Login Card if not authenticated
  if (!token) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-[#6b388d]/30 via-[#c9459c]/20 to-[#78daeb]/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <img
                src="https://vibeacademy.info/wp-content/uploads/2024/11/Vibe-.png"
                alt="SOCH Vibe Academy"
                className="h-10 w-auto"
              />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
              Admissions Portal
            </h1>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              SOCH — Cohort 02 Inquiry & Payment Management
            </p>
          </div>

          <div
            className="p-8 rounded-3xl border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6"
            style={{
              backgroundImage: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
            }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#78daeb]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white/80">Admin Sign In</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-white/50">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>MySQL Connected</span>
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-500/15 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">Username or Email</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#78daeb] transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-[#78daeb] transition-colors text-sm"
                />
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/60 space-y-1">
                <p className="font-semibold text-white/80">Default Credentials:</p>
                <p>Username: <code className="text-[#78daeb]">admin</code> | Password: <code className="text-[#78daeb]">admin123</code></p>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full vibe-btn-dark !py-3.5 !text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-[0.98] disabled:opacity-50"
              >
                <span>{isLoggingIn ? 'Verifying...' : 'Access Admin Dashboard'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-2 text-center">
              <Link to="/" className="text-xs text-white/50 hover:text-white transition-colors">
                ← Return to Public Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Full Admin Portal
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-[#c9459c] selection:text-white flex flex-col">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 bg-[#16161a] border border-[#78daeb]/40 text-white rounded-2xl shadow-2xl animate-fade-in text-sm">
          <CheckCircle className="w-4 h-4 text-[#78daeb]" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0e0e12]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
              <img
                src="https://vibeacademy.info/wp-content/uploads/2024/11/Vibe-.png"
                alt="Logo"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <div className="hidden sm:block h-5 w-px bg-white/20" />
            <div className="hidden sm:flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-white">Cohort 02 Admin Desk</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#c9459c]/20 text-[#c9459c] border border-[#c9459c]/30">
                  NestJS Serverless
                </span>
              </div>
              <span className="text-[11px] text-white/50">University of Haripur BIC</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* DB Health Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  dbHealth === 'UP' ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
                }`}
              />
              <span className="text-white/70 text-[11px]">
                {dbHealth === 'UP' ? 'MySQL: vibe_coding_db' : 'MySQL Offline'}
              </span>
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => {
                fetchInquiries();
                checkHealth();
                showToast('Refreshed data.');
              }}
              title="Refresh Inquiries"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            {/* Public Site Link */}
            <Link
              to="/"
              target="_blank"
              title="Open Public Site"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public View</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs text-red-300 hover:text-red-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8 space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Applications */}
          <div
            className="p-5 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-md relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-white/60 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Applicants</span>
              <Users className="w-4 h-4 text-[#78daeb]" />
            </div>
            <div className="text-3xl font-extrabold text-white">{stats.total}</div>
            <p className="text-[11px] text-white/50 mt-1">All registrations in database</p>
          </div>

          {/* Card 2: Paid Inquiries */}
          <div
            className="p-5 rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/[0.08] to-white/[0.02] backdrop-blur-md relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Verified Paid</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-400">{stats.paid}</div>
            <p className="text-[11px] text-emerald-300/70 mt-1">
              {stats.paidRate}% conversion rate
            </p>
          </div>

          {/* Card 3: Unpaid / Pending Inquiries */}
          <div
            className="p-5 rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-500/[0.08] to-white/[0.02] backdrop-blur-md relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-amber-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Unpaid / Pending</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-amber-400">{stats.unpaid}</div>
            <p className="text-[11px] text-amber-300/70 mt-1">Awaiting bank verification</p>
          </div>

          {/* Card 4: Cohort Seats Status */}
          <div
            className="p-5 rounded-2xl border border-[#c9459c]/20 bg-gradient-to-b from-[#c9459c]/[0.08] to-white/[0.02] backdrop-blur-md relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-[#c9459c] mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Cohort 02 Capacity</span>
              <GraduationCap className="w-4 h-4 text-[#c9459c]" />
            </div>
            <div className="text-3xl font-extrabold text-[#c9459c]">
              {stats.paid} / 50
            </div>
            <p className="text-[11px] text-white/50 mt-1">Target seats filled</p>
          </div>
        </div>

        {/* Toolbar: Search, Filters, and Export */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/[0.03] p-4 rounded-2xl border border-white/10">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, CNIC, email, or WhatsApp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#78daeb] text-xs sm:text-sm"
            />
          </div>

          {/* Action Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {/* Status Segmented Control */}
            <div className="flex items-center bg-black/60 p-1 rounded-xl border border-white/15 shrink-0">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === 'ALL'
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                All ({inquiries.length})
              </button>
              <button
                onClick={() => setStatusFilter('Unpaid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === 'Unpaid'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Unpaid ({stats.unpaid})
              </button>
              <button
                onClick={() => setStatusFilter('Paid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === 'Paid'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Paid ({stats.paid})
              </button>
            </div>

            {/* Sort Toggle */}
            <button
              onClick={() => setSortBy((prev) => (prev === 'newest' ? 'oldest' : 'newest'))}
              title={`Sort by ${sortBy === 'newest' ? 'Oldest' : 'Newest'}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/60 hover:bg-white/10 border border-white/15 text-xs text-white/80 cursor-pointer shrink-0"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span className="capitalize">{sortBy}</span>
            </button>

            {/* CSV Export */}
            <button
              onClick={handleExportCSV}
              disabled={inquiries.length === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#4467b0]/20 to-[#c9459c]/20 hover:from-[#4467b0]/30 hover:to-[#c9459c]/30 border border-white/20 text-xs font-semibold text-white cursor-pointer shrink-0 disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Error Notice */}
        {errorMsg && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-300 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={fetchInquiries}
              className="px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-xs font-semibold cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

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
                {isLoading && inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-white/50">
                      <div className="flex flex-col items-center gap-2">
                        <RefreshCw className="w-6 h-6 animate-spin text-[#78daeb]" />
                        <span className="text-sm">Loading applications from MySQL...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-white/50">
                      <div className="max-w-xs mx-auto space-y-2">
                        <Users className="w-10 h-10 text-white/20 mx-auto" />
                        <p className="text-base font-medium text-white/70">No applications match</p>
                        <p className="text-xs text-white/40">
                          {searchTerm
                            ? `No records found matching "${searchTerm}". Try a different keyword.`
                            : 'No inquiries recorded yet. Applications submitted via the modal will appear here.'}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((inquiry) => {
                    const isPaid = inquiry.payment_status === 'Paid';
                    const isUpdating = isUpdatingStatus === inquiry.id;

                    return (
                      <tr
                        key={inquiry.id}
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                        {/* 1. Applicant */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs uppercase shrink-0"
                              style={{
                                background: isPaid
                                  ? 'linear-gradient(135deg, #10b981, #059669)'
                                  : 'linear-gradient(135deg, #6b388d, #c9459c)',
                              }}
                            >
                              {inquiry.first_name[0]}
                              {inquiry.last_name[0]}
                            </div>
                            <div>
                              <div className="font-semibold text-white flex items-center gap-1.5">
                                <span>{inquiry.first_name} {inquiry.last_name}</span>
                              </div>
                              <div className="text-[11px] font-mono text-[#78daeb]">
                                Ref: VB-02-{String(inquiry.id).padStart(6, '0')}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* 2. CNIC */}
                        <td className="py-4 px-4 font-mono text-xs text-white/80 whitespace-nowrap">
                          {inquiry.cnic}
                        </td>

                        {/* 3. Contact Info */}
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <a
                              href={`https://wa.me/${inquiry.active_whatsapp_number.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-mono"
                              title="Message on WhatsApp"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>{inquiry.active_whatsapp_number}</span>
                            </a>
                            <div className="flex items-center gap-1.5 text-xs text-white/60">
                              <Mail className="w-3.5 h-3.5 text-white/40" />
                              <span className="truncate max-w-[180px]">{inquiry.email}</span>
                            </div>
                          </div>
                        </td>

                        {/* 4. Academic & Background */}
                        <td className="py-4 px-4">
                          <div className="space-y-1 max-w-[220px]">
                            <div className="text-xs text-white/90 truncate font-medium" title={inquiry.academic_status || 'N/A'}>
                              {inquiry.academic_status || '—'}
                            </div>
                            <div className="text-[11px] text-white/50 truncate" title={inquiry.programming_background || 'N/A'}>
                              {inquiry.programming_background || '—'}
                            </div>
                          </div>
                        </td>

                        {/* 5. Payment Status with One-Click Toggle */}
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex flex-col items-center gap-1.5">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                                isPaid
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

                            {/* Move to Paid / Unpaid Button */}
                            <button
                              disabled={isUpdating}
                              onClick={() => handleTogglePaymentStatus(inquiry, isPaid ? 'Unpaid' : 'Paid')}
                              className={`text-[11px] underline font-medium cursor-pointer transition-colors disabled:opacity-50 ${
                                isPaid
                                  ? 'text-amber-400 hover:text-amber-300'
                                  : 'text-emerald-400 hover:text-emerald-300'
                              }`}
                            >
                              {isUpdating
                                ? 'Updating...'
                                : isPaid
                                ? 'Mark as Unpaid'
                                : 'Mark as Paid'}
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

                        {/* 7. Action: View Details */}
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => setSelectedInquiry(inquiry)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-white/90 hover:text-white transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Footer count indicator */}
          <div className="px-6 py-3 border-t border-white/5 bg-white/[0.01] flex items-center justify-between text-xs text-white/50">
            <span>Showing {filteredInquiries.length} of {inquiries.length} inquiries</span>
            <span>Database: MySQL (`vibe_coding_db`)</span>
          </div>
        </div>
      </main>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <div
            onClick={() => setSelectedInquiry(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <div className="relative bg-[#121215] text-white w-full max-w-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden z-10 my-8">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#18181d] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#78daeb]" />
                <div>
                  <h3 className="text-base font-bold text-white">
                    Application #{selectedInquiry.id} Details
                  </h3>
                  <span className="text-[11px] font-mono text-[#c9459c]">
                    VB-02-{String(selectedInquiry.id).padStart(6, '0')}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-sm max-h-[75vh] overflow-y-auto">
              {/* Payment Status Bar with Quick Switch */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-white/60 block">Current Payment Status</span>
                  <span
                    className={`inline-block mt-1 font-bold text-sm ${
                      selectedInquiry.payment_status === 'Paid'
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`}
                  >
                    ● {selectedInquiry.payment_status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={isUpdatingStatus === selectedInquiry.id}
                    onClick={() => handleTogglePaymentStatus(selectedInquiry, 'Paid')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                      selectedInquiry.payment_status === 'Paid'
                        ? 'bg-emerald-500 text-black font-bold'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                    }`}
                  >
                    Set Paid
                  </button>
                  <button
                    disabled={isUpdatingStatus === selectedInquiry.id}
                    onClick={() => handleTogglePaymentStatus(selectedInquiry, 'Unpaid')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                      selectedInquiry.payment_status === 'Unpaid'
                        ? 'bg-amber-500 text-black font-bold'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                    }`}
                  >
                    Set Unpaid
                  </button>
                </div>
              </div>

              {/* Applicant Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[11px] text-white/50 uppercase tracking-wider block mb-1">
                    Full Name
                  </span>
                  <span className="font-semibold text-white">
                    {selectedInquiry.first_name} {selectedInquiry.last_name}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[11px] text-white/50 uppercase tracking-wider block mb-1">
                    CNIC / B-Form
                  </span>
                  <span className="font-mono text-white">
                    {selectedInquiry.cnic}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[11px] text-white/50 uppercase tracking-wider block mb-1">
                    Active WhatsApp
                  </span>
                  <a
                    href={`https://wa.me/${selectedInquiry.active_whatsapp_number.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedInquiry.active_whatsapp_number}</span>
                  </a>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[11px] text-white/50 uppercase tracking-wider block mb-1">
                    Email Address
                  </span>
                  <span className="text-white/90 break-all">
                    {selectedInquiry.email}
                  </span>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[11px] text-white/50 uppercase tracking-wider block mb-1">
                  Guardian / Emergency Contact
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-white/90">
                  <span>Name: <strong>{selectedInquiry.emergency_contact_name || 'Not specified'}</strong></span>
                  <span>Phone: <strong className="font-mono text-[#78daeb]">{selectedInquiry.emergency_contact_phone || 'Not specified'}</strong></span>
                </div>
              </div>

              {/* Academic & Background */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[11px] text-white/50 uppercase tracking-wider block mb-1">
                    Academic Status
                  </span>
                  <span className="text-white/90">{selectedInquiry.academic_status || '—'}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[11px] text-white/50 uppercase tracking-wider block mb-1">
                    Programming Background
                  </span>
                  <span className="text-white/90">{selectedInquiry.programming_background || '—'}</span>
                </div>

                {selectedInquiry.referral_code && (
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[11px] text-white/50 uppercase tracking-wider block mb-1">
                      Referral Code
                    </span>
                    <span className="font-mono font-bold text-[#c9459c]">{selectedInquiry.referral_code}</span>
                  </div>
                )}

                {selectedInquiry.message && (
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[11px] text-white/50 uppercase tracking-wider block mb-1">
                      Applicant Message / Motivation
                    </span>
                    <p className="text-white/80 whitespace-pre-wrap text-xs leading-relaxed">
                      {selectedInquiry.message}
                    </p>
                  </div>
                )}
              </div>

              {/* Timestamps */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
                <span>Submitted: {new Date(selectedInquiry.created_at).toLocaleString()}</span>
                {selectedInquiry.updated_at && (
                  <span>Updated: {new Date(selectedInquiry.updated_at).toLocaleString()}</span>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-[#18181d] border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
