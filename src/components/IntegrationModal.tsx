import React, { useState, useEffect } from 'react';
import { X, Database, MessageSquare, CheckCircle2, AlertCircle, Copy, Check, RefreshCw } from 'lucide-react';

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntegrationModal: React.FC<IntegrationModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'mysql' | 'whatsapp' | 'live'>('mysql');
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [healthData, setHealthData] = useState<any>(null);
  const [inquiriesData, setInquiriesData] = useState<any[]>([]);
  const [isLoadingHealth, setIsLoadingHealth] = useState(false);

  const fetchStatus = async () => {
    setIsLoadingHealth(true);
    try {
      const adminToken = localStorage.getItem('soch_admin_token');
      const authHeaders: HeadersInit = adminToken ? { Authorization: `Bearer ${adminToken}` } : {};
      const [resHealth, resInquiries] = await Promise.all([
        fetch('/api/inquiries/health').then((r) => r.json()).catch(() => null),
        fetch('/api/inquiries', { headers: authHeaders }).then((r) => r.json()).catch(() => null)
      ]);
      setHealthData(resHealth);
      if (resInquiries?.data) {
        setInquiriesData(resInquiries.data);
      }
    } catch (e) {
      console.error('Error fetching integration health:', e);
    } finally {
      setIsLoadingHealth(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sqlCode = `-- 1. Create Database if it does not exist
CREATE DATABASE IF NOT EXISTS vibe_academy 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE vibe_academy;

-- 2. Create inquiries table with all form fields and timestamp audits
CREATE TABLE IF NOT EXISTS inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  cnic VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  active_whatsapp_number VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NULL,
  emergency_contact_name VARCHAR(255) NULL,
  emergency_contact_phone VARCHAR(50) NULL,
  academic_status VARCHAR(255) NULL,
  programming_background VARCHAR(255) NULL,
  referral_code VARCHAR(100) NULL,
  message TEXT NULL,
  payment_status ENUM('paid', 'unpaid') NOT NULL DEFAULT 'unpaid',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional verification query
SELECT * FROM inquiries ORDER BY created_at DESC;`;

  const envSample = `# 1. Local MySQL Database Settings
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=vibe_academy

# 2. WhatsApp Business Cloud API (Meta Graph API)
WHATSAPP_CLOUD_API_ACCESS_TOKEN=EAAG...YOUR_PERMANENT_OR_TEST_TOKEN
WHATSAPP_PHONE_NUMBER_ID=104829182910291
WHATSAPP_API_VERSION=v21.0
WHATSAPP_TEMPLATE_NAME=
WHATSAPP_TEMPLATE_LANG=en_US`;

  const copyToClipboard = (text: string, type: 'sql' | 'env') => {
    navigator.clipboard.writeText(text);
    if (type === 'sql') {
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    } else {
      setCopiedEnv(true);
      setTimeout(() => setCopiedEnv(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" />

      {/* Modal Dialog */}
      <div className="relative bg-[#111111] text-white w-full max-w-3xl rounded-3xl shadow-2xl border border-white/15 overflow-hidden z-10 my-6 max-h-[90vh] flex flex-col font-sans">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#181818] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#c9459c] to-[#78daeb] flex items-center justify-center">
              <Database className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Integration Guide & Diagnostics
              </h3>
              <p className="text-xs text-white/60">
                Local MySQL Database &amp; WhatsApp Business Cloud API
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Status Bar */}
        <div className="px-6 py-3 bg-[#141414] border-b border-white/10 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  healthData?.database?.connected ? 'bg-[#25d366] animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span className="text-white/80">
                MySQL:{' '}
                <strong className={healthData?.database?.connected ? 'text-[#25d366]' : 'text-amber-400'}>
                  {healthData?.database?.connected ? 'Connected (Localhost)' : 'Ready / Memory Backed'}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  healthData?.whatsapp?.configured ? 'bg-[#25d366] animate-pulse' : 'bg-[#78daeb]'
                }`}
              />
              <span className="text-white/80">
                WhatsApp API:{' '}
                <strong className={healthData?.whatsapp?.configured ? 'text-[#25d366]' : 'text-[#78daeb]'}>
                  {healthData?.whatsapp?.configured ? 'Cloud API Active' : 'Cloud Simulator & wa.me Ready'}
                </strong>
              </span>
            </div>
          </div>
          <button
            onClick={fetchStatus}
            disabled={isLoadingHealth}
            className="flex items-center gap-1 text-[11px] text-white/70 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isLoadingHealth ? 'animate-spin' : ''}`} />
            <span>Refresh Status</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 bg-[#161616] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('mysql')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition ${
              activeTab === 'mysql'
                ? 'border-[#78daeb] text-white bg-white/5'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-[#78daeb]" />
            <span>1. Local MySQL Setup</span>
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition ${
              activeTab === 'whatsapp'
                ? 'border-[#25d366] text-white bg-white/5'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#25d366]" />
            <span>2. WhatsApp Cloud API Setup</span>
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition ${
              activeTab === 'live'
                ? 'border-[#c9459c] text-white bg-white/5'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#c9459c]" />
            <span>3. View Saved Inquiries ({inquiriesData.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-white/90">
          {activeTab === 'mysql' && (
            <div className="space-y-5">
              <div className="bg-[#181818] rounded-2xl p-4 border border-white/10 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#78daeb]/20 text-[#78daeb] flex items-center justify-center text-xs">1</span>
                  Steps to Connect Your Local MySQL Database
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-white/80 pl-1">
                  <li>
                    Start your local MySQL Server (via <strong>XAMPP</strong>, <strong>WampServer</strong>, <strong>Laragon</strong>, <strong>Docker</strong>, or native service on port <strong>3306</strong>).
                  </li>
                  <li>
                    Create the database: <code className="bg-black/60 px-1.5 py-0.5 rounded text-[#78daeb]">CREATE DATABASE vibe_academy;</code>
                  </li>
                  <li>
                    Execute the table script below to create the <code className="bg-black/60 px-1.5 py-0.5 rounded text-[#78daeb]">inquiries</code> table with the <code className="bg-black/60 px-1.5 py-0.5 rounded text-[#78daeb]">active_whatsapp_number</code> column, <code className="bg-black/60 px-1.5 py-0.5 rounded text-[#78daeb]">payment_status</code>, <code className="bg-black/60 px-1.5 py-0.5 rounded text-[#78daeb]">created_at</code>, and <code className="bg-black/60 px-1.5 py-0.5 rounded text-[#78daeb]">deleted_at</code> fields.
                  </li>
                  <li>
                    Add your credentials in your <code className="bg-black/60 px-1.5 py-0.5 rounded text-[#78daeb]">.env</code> file (e.g. <code className="bg-black/60 px-1.5 py-0.5 rounded text-[#78daeb]">MYSQL_USER=root</code>, <code className="bg-black/60 px-1.5 py-0.5 rounded text-[#78daeb]">MYSQL_PASSWORD=...</code>).
                  </li>
                </ol>
              </div>

              {/* SQL Script Snippet */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white/90">
                    Exact SQL Table Schema (Copy &amp; Run in MySQL):
                  </span>
                  <button
                    onClick={() => copyToClipboard(sqlCode, 'sql')}
                    className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition cursor-pointer"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-[#25d366]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
                  </button>
                </div>
                <pre className="bg-black/90 p-4 rounded-xl border border-white/10 text-[11px] sm:text-xs text-[#78daeb] font-mono overflow-x-auto whitespace-pre">
                  {sqlCode}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'whatsapp' && (
            <div className="space-y-5">
              <div className="bg-[#181818] rounded-2xl p-4 border border-white/10 space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#25d366]/20 text-[#25d366] flex items-center justify-center text-xs">2</span>
                  Steps to Integrate WhatsApp Business Cloud API
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-white/80 pl-1">
                  <li>
                    Go to <a href="https://developers.facebook.com" target="_blank" rel="noreferrer" className="text-[#25d366] hover:underline font-semibold">Meta for Developers</a> and sign in with your Facebook/Meta account.
                  </li>
                  <li>
                    Click <strong>My Apps</strong> → <strong>Create App</strong> → Select <strong>Other</strong> → Choose <strong>Business</strong>.
                  </li>
                  <li>
                    On the App Dashboard, scroll down to <strong>WhatsApp</strong> and click <strong>Set Up</strong>.
                  </li>
                  <li>
                    Under <strong>WhatsApp → API Setup</strong> in the left sidebar:
                    <ul className="list-disc list-inside pl-4 pt-1 space-y-1 text-white/70">
                      <li>Copy your <strong>Phone number ID</strong> (e.g. 104829182910291).</li>
                      <li>Copy the <strong>Temporary access token</strong> (or generate a Permanent System User Token in Business Settings).</li>
                      <li>In development mode, add the recipient test WhatsApp phone number to the "To" test recipients list.</li>
                    </ul>
                  </li>
                  <li>
                    Paste these values into your project's <code className="bg-black/60 px-1.5 py-0.5 rounded text-[#25d366]">.env</code> file.
                  </li>
                  <li>
                    Whenever an inquiry is submitted, our serverless NestJS backend automatically invokes the official endpoint:
                    <div className="mt-1 font-mono text-[11px] bg-black/60 p-2 rounded text-[#25d366]">
                      POST https://graph.facebook.com/v21.0/&#123;PHONE_NUMBER_ID&#125;/messages
                    </div>
                  </li>
                </ol>
              </div>

              {/* Environment Variable Snippet */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white/90">
                    Configuration in .env:
                  </span>
                  <button
                    onClick={() => copyToClipboard(envSample, 'env')}
                    className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition cursor-pointer"
                  >
                    {copiedEnv ? <Check className="w-3.5 h-3.5 text-[#25d366]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEnv ? 'Copied!' : 'Copy .env'}</span>
                  </button>
                </div>
                <pre className="bg-black/90 p-4 rounded-xl border border-white/10 text-[11px] sm:text-xs text-[#25d366] font-mono overflow-x-auto whitespace-pre">
                  {envSample}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'live' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">
                  Recorded Inquiries in Database ({inquiriesData.length})
                </span>
                <span className="text-[11px] text-white/50">
                  Table: <code className="text-[#78daeb]">inquiries</code>
                </span>
              </div>

              {inquiriesData.length === 0 ? (
                <div className="py-12 text-center text-white/50 bg-[#181818] rounded-2xl border border-white/10">
                  No inquiries recorded yet. Submit the "Apply Now" or "Contact" form to record an inquiry and test the flow!
                </div>
              ) : (
                <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                  {inquiriesData.map((inq: any, i: number) => (
                    <div
                      key={inq.id || i}
                      className="p-3.5 bg-[#181818] rounded-xl border border-white/10 text-xs space-y-1.5"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white text-sm">
                          {inq.first_name} {inq.last_name}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {inq.payment_status || 'unpaid'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-white/70 text-[11px]">
                        <div>
                          <span className="text-white/40 block">WhatsApp:</span>
                          <span className="font-mono text-white">
                            {inq.active_whatsapp_number || inq.phone || '-'}
                          </span>
                        </div>
                        <div>
                          <span className="text-white/40 block">Email:</span>
                          <span className="text-white">{inq.email}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block">CNIC:</span>
                          <span className="font-mono text-white">{inq.cnic || '-'}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block">Category:</span>
                          <span>{inq.academic_status || '-'}</span>
                        </div>
                        <div>
                          <span className="text-white/40 block">Date:</span>
                          <span>{inq.created_at ? new Date(inq.created_at).toLocaleString() : 'Just now'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#181818] border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="vibe-btn-dark !px-6 !py-2 !text-xs font-semibold uppercase tracking-wider"
          >
            <span>Close Guide</span>
          </button>
        </div>
      </div>
    </div>
  );
};
