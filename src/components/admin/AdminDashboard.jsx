import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { 
  X, 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Edit3, 
  Image as ImageIcon, 
  UserCheck, 
  Settings, 
  Search, 
  Plus, 
  Trash2, 
  Save, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Eye,
  Trophy,
  Sliders,
  DollarSign
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    hero,
    updateHero,
    programs,
    addProgram,
    updateProgram,
    deleteProgram,
    coaches,
    addCoach,
    updateCoach,
    deleteCoach,
    gallery,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    initialRegistrations,
    updateRegistrationStatus,
    initialInvoices,
    recordPaymentSuccess,
    siteSettings,
    updateSiteSettings,
    resetToDefault,
    exportBackupJSON,
    importBackupJSON,
    showToast
  } = useAcademy();

  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'registrations' | 'invoices' | 'hero' | 'programs' | 'coaches' | 'gallery' | 'seo'
  
  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [regFilterStatus, setRegFilterStatus] = useState('ALL');

  // Hero Edit State
  const [heroForm, setHeroForm] = useState(hero);

  // SEO Form State
  const [seoForm, setSeoForm] = useState(siteSettings.seo || {});

  // Selected Student Dossier Modal
  const [selectedDossier, setSelectedDossier] = useState(null);

  // New Program Modal State
  const [newProgramForm, setNewProgramForm] = useState({
    name: '',
    category: 'Youth Development',
    ageRange: '10 - 14 Tahun',
    monthlyFee: 1500000,
    semesterFee: 8000000,
    registrationFee: 500000,
    quota: 30,
    enrolled: 0,
    badge: 'PROGRAM BARU',
    description: '',
    features: ['3x Latihan per Minggu', 'Official Training Kit', 'Rapor Pemain'],
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop',
    scheduleSummary: 'Senin, Rabu, Jumat (16.00 WIB)'
  });
  const [isAddingProgram, setIsAddingProgram] = useState(false);

  // New Coach Form State
  const [newCoachForm, setNewCoachForm] = useState({
    name: '',
    role: 'Youth Coach',
    license: 'AFC "B" License',
    experience: 'Pelatih SSB & Mantan Atlet',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    specialty: 'Dribbling Drills & Tactical IQ'
  });
  const [isAddingCoach, setIsAddingCoach] = useState(false);

  // New Gallery Item State
  const [newGalleryForm, setNewGalleryForm] = useState({
    title: '',
    category: 'Training Drills',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
    date: 'September 2026',
    caption: ''
  });
  const [isAddingGallery, setIsAddingGallery] = useState(false);

  if (!isAdminModalOpen) return null;

  const formatIDR = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val || 0);
  };

  // Analytics Calculations
  const totalStudents = initialRegistrations.length;
  const activeStudents = initialRegistrations.filter(r => r.paymentStatus === 'PAID').length;
  const pendingStudents = initialRegistrations.filter(r => r.paymentStatus === 'PENDING').length;
  const totalRevenue = initialInvoices
    .filter(i => i.status === 'PAID')
    .reduce((acc, i) => acc + i.total, 0);

  // Filtered Registrations
  const filteredRegistrations = initialRegistrations.filter(reg => {
    const matchSearch = reg.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = regFilterStatus === 'ALL' || reg.paymentStatus === regFilterStatus;
    return matchSearch && matchStatus;
  });

  // Export CSV Helper
  const handleExportCSV = () => {
    const headers = ["ID", "Nama Siswa", "Kategori Usia", "Posisi", "Nama Orang Tua", "No WA", "Program", "Total Biaya", "Status Pembayaran", "Tanggal"];
    const rows = initialRegistrations.map(r => [
      r.id,
      `"${r.studentName}"`,
      r.ageCategory,
      `"${r.position}"`,
      `"${r.parentName}"`,
      r.parentPhone,
      `"${r.programName}"`,
      r.totalAmount,
      r.paymentStatus,
      `"${r.registrationDate}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `apex_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Data siswa berhasil diekspor ke CSV!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-xl animate-fadeIn overflow-hidden">
      <div className="relative w-full max-w-7xl h-[94vh] bg-[#070B09] border border-[#00FF87]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0D1510] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF87] to-[#059669] flex items-center justify-center text-black font-black font-display text-lg">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                  APEX CMS & ACADEMY ADMINISTRATION
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#00FF87]/15 text-[#00FF87] text-[10px] font-bold border border-[#00FF87]/30">
                  MASTER ADMIN
                </span>
              </div>
              <p className="text-xs text-gray-400">Kontrol Konten, Registrasi Siswa, Payment Ledger & SEO</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportBackupJSON}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-gray-300 hover:text-white flex items-center gap-1.5 transition-all"
              title="Download Backup JSON"
            >
              <Download className="w-3.5 h-3.5 text-[#00FF87]" />
              <span className="hidden sm:inline">Backup JSON</span>
            </button>

            <button
              onClick={resetToDefault}
              className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs text-red-400 flex items-center gap-1.5 transition-all"
              title="Reset ke Default Awal"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Default</span>
            </button>

            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Area with Left Tabs & Right Panel */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Navigation Sidebar */}
          <div className="w-full md:w-64 bg-[#0A100C] border-r border-white/5 p-4 flex md:flex-col gap-1.5 overflow-x-auto shrink-0">
            {[
              { id: 'analytics', label: 'Ringkasan & Metrik', icon: LayoutDashboard },
              { id: 'registrations', label: 'Data Pendaftar Siswa', icon: Users, badge: pendingStudents > 0 ? pendingStudents : null },
              { id: 'invoices', label: 'Payment Ledger', icon: CreditCard },
              { id: 'hero', label: 'CMS Banner & Teks', icon: Edit3 },
              { id: 'programs', label: 'CMS Program & Biaya', icon: Trophy },
              { id: 'coaches', label: 'CMS Dewan Pelatih', icon: UserCheck },
              { id: 'gallery', label: 'CMS Galeri & Foto', icon: ImageIcon },
              { id: 'seo', label: 'SEO & Pengaturan', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full px-3.5 py-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-[#00FF87] text-black font-bold shadow-lg shadow-[#00FF87]/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-black">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Panel Body */}
          <div className="flex-1 p-6 overflow-y-auto bg-[#070B09] space-y-6">
            
            {/* 1. ANALYTICS & METRICS TAB */}
            {activeTab === 'analytics' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-black text-xl text-white uppercase">
                    METRIK PERFORMA AKADEMI & KEUANGAN
                  </h4>
                  <span className="text-xs text-gray-400">Live Telemetry Sync</span>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#0D1510] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
                      <span>Total Pendapatan Terverifikasi</span>
                      <DollarSign className="w-4 h-4 text-[#00FF87]" />
                    </div>
                    <p className="font-display font-black text-2xl text-[#00FF87]">{formatIDR(totalRevenue)}</p>
                    <span className="text-[11px] text-gray-400">Dari seluruh invoice lunas</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0D1510] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
                      <span>Siswa Terverifikasi Aktif</span>
                      <Users className="w-4 h-4 text-blue-400" />
                    </div>
                    <p className="font-display font-black text-2xl text-white">{activeStudents} Siswa</p>
                    <span className="text-[11px] text-green-400 font-semibold">Status lunas & kit siap</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0D1510] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
                      <span>Menunggu Pembayaran</span>
                      <Clock className="w-4 h-4 text-amber-400" />
                    </div>
                    <p className="font-display font-black text-2xl text-amber-400">{pendingStudents} Siswa</p>
                    <span className="text-[11px] text-gray-400">Memerlukan follow-up WA</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0D1510] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
                      <span>Total Pendaftar Musim Ini</span>
                      <Trophy className="w-4 h-4 text-[#FFD700]" />
                    </div>
                    <p className="font-display font-black text-2xl text-[#FFD700]">{totalStudents} Pendaftar</p>
                    <span className="text-[11px] text-gray-400">Batch 2026/2027</span>
                  </div>
                </div>

                {/* Recent Registrations Quick Table */}
                <div className="p-5 rounded-2xl bg-[#0D1510] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-display font-bold text-sm text-white uppercase">Pendaftar Terbaru</h5>
                    <button
                      onClick={() => setActiveTab('registrations')}
                      className="text-xs text-[#00FF87] hover:underline flex items-center gap-1"
                    >
                      <span>Lihat Semua ({totalStudents})</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-white/10 text-gray-400">
                          <th className="py-2.5">ID Siswa</th>
                          <th className="py-2.5">Nama Siswa</th>
                          <th className="py-2.5">Program</th>
                          <th className="py-2.5">Kategori</th>
                          <th className="py-2.5">Status Bayar</th>
                          <th className="py-2.5 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {initialRegistrations.slice(0, 4).map((r) => (
                          <tr key={r.id}>
                            <td className="py-3 font-mono text-[#00FF87]">{r.id}</td>
                            <td className="py-3 font-bold text-white">{r.studentName}</td>
                            <td className="py-3 text-gray-300">{r.programName}</td>
                            <td className="py-3 text-gray-300">{r.ageCategory}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                r.paymentStatus === 'PAID' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              }`}>
                                {r.paymentStatus}
                              </span>
                            </td>
                            <td className="py-3 text-right font-bold text-white">{formatIDR(r.totalAmount)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 2. REGISTRATIONS TAB */}
            {activeTab === 'registrations' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-display font-black text-xl text-white uppercase">
                      MANAJEMEN DATA PENDAFTAR SISWA ({filteredRegistrations.length})
                    </h4>
                    <p className="text-xs text-gray-400">Kelola status verifikasi siswa, kontak orang tua, dan berkas atlet.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportCSV}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white font-bold flex items-center gap-1.5 border border-white/10 transition-all"
                    >
                      <Download className="w-3.5 h-3.5 text-[#00FF87]" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Filter & Search Controls */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari berdasarkan nama siswa, orang tua, atau ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:border-[#00FF87] focus:outline-none"
                    />
                  </div>

                  <select
                    value={regFilterStatus}
                    onChange={(e) => setRegFilterStatus(e.target.value)}
                    className="px-4 py-2.5 rounded-xl bg-[#0D1510] border border-white/10 text-xs text-white focus:border-[#00FF87]"
                  >
                    <option value="ALL">Semua Status Pembayaran</option>
                    <option value="PAID">PAID (Lunas & Aktif)</option>
                    <option value="PENDING">PENDING (Menunggu)</option>
                  </select>
                </div>

                {/* Registrations Table */}
                <div className="p-4 rounded-2xl bg-[#0D1510] border border-white/10 overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400">
                        <th className="py-3">No. Reg</th>
                        <th className="py-3">Nama Siswa</th>
                        <th className="py-3">Kategori & Posisi</th>
                        <th className="py-3">Orang Tua / Kontak</th>
                        <th className="py-3">Program Latihan</th>
                        <th className="py-3">Status</th>
                        <th className="py-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredRegistrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-white/[0.02]">
                          <td className="py-3 font-mono font-bold text-[#00FF87]">{reg.id}</td>
                          <td className="py-3 font-bold text-white">{reg.studentName}</td>
                          <td className="py-3 text-gray-300">{reg.ageCategory} • {reg.position}</td>
                          <td className="py-3 text-gray-300">
                            <div>{reg.parentName}</div>
                            <div className="text-[10px] text-gray-500">{reg.parentPhone}</div>
                          </td>
                          <td className="py-3 text-gray-300">{reg.programName}</td>
                          <td className="py-3">
                            <button
                              onClick={() => {
                                const newStat = reg.paymentStatus === 'PAID' ? 'PENDING' : 'PAID';
                                updateRegistrationStatus(reg.id, newStat === 'PAID' ? 'Verified & Active' : 'Menunggu Pembayaran', newStat);
                              }}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                reg.paymentStatus === 'PAID' 
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/40' 
                                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                              }`}
                              title="Klik untuk ubah status Lunas/Pending"
                            >
                              {reg.paymentStatus}
                            </button>
                          </td>
                          <td className="py-3 text-right space-x-1">
                            <button
                              onClick={() => setSelectedDossier(reg)}
                              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#00FF87] hover:text-black text-white font-bold text-[11px] transition-all"
                            >
                              Lihat Dossier
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. PAYMENT LEDGER TAB */}
            {activeTab === 'invoices' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-black text-xl text-white uppercase">
                      LOG TRANSAKSI & INVOICE GATEWAY
                    </h4>
                    <p className="text-xs text-gray-400">Daftar transaksi masuk via QRIS, Virtual Account, dan E-Wallet.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0D1510] border border-white/10 overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400">
                        <th className="py-3">No. Invoice</th>
                        <th className="py-3">Siswa Atlet</th>
                        <th className="py-3">Program</th>
                        <th className="py-3">Metode Bayar</th>
                        <th className="py-3">Ref Code</th>
                        <th className="py-3">Status</th>
                        <th className="py-3 text-right">Total</th>
                        <th className="py-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {initialInvoices.map((inv) => (
                        <tr key={inv.invoiceId} className="hover:bg-white/[0.02]">
                          <td className="py-3 font-mono font-bold text-white">{inv.invoiceId}</td>
                          <td className="py-3 font-semibold text-white">{inv.studentName}</td>
                          <td className="py-3 text-gray-300">{inv.programName}</td>
                          <td className="py-3 text-gray-300">{inv.paymentMethod}</td>
                          <td className="py-3 font-mono text-[11px] text-gray-400">{inv.referenceCode}</td>
                          <td className="py-3">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              inv.status === 'PAID' 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}>
                              {inv.status}
                            </span>
                          </td>
                          <td className="py-3 text-right font-bold text-[#00FF87]">{formatIDR(inv.total)}</td>
                          <td className="py-3 text-right">
                            {inv.status !== 'PAID' && (
                              <button
                                onClick={() => recordPaymentSuccess(inv.invoiceId, { method: 'Verified via Admin' })}
                                className="px-2.5 py-1 rounded-lg bg-[#00FF87] hover:bg-[#00FF87]/80 text-black font-bold text-[10px]"
                              >
                                Set Lunas
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. HERO CMS TAB */}
            {activeTab === 'hero' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-black text-xl text-white uppercase">
                    CMS EDITOR: HERO BANNER & KONTEN UTAMA
                  </h4>
                  <button
                    onClick={() => updateHero(heroForm)}
                    className="px-5 py-2.5 rounded-xl bg-[#00FF87] text-black font-bold text-xs uppercase flex items-center gap-1.5 shadow-lg shadow-[#00FF87]/20"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>

                <div className="p-6 rounded-2xl bg-[#0D1510] border border-white/10 space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-gray-300 font-semibold">Teks Badge Pengumuman Atas</label>
                    <input
                      type="text"
                      value={heroForm.badge}
                      onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-300 font-semibold">Headline Utama (Judul Besar)</label>
                    <input
                      type="text"
                      value={heroForm.headline}
                      onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-300 font-semibold">Subheadline (Deskripsi Lengkap)</label>
                    <textarea
                      rows={3}
                      value={heroForm.subheadline}
                      onChange={(e) => setHeroForm({ ...heroForm, subheadline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-gray-300 font-semibold">Teks Tombol Utama (CTA 1)</label>
                      <input
                        type="text"
                        value={heroForm.primaryCta}
                        onChange={(e) => setHeroForm({ ...heroForm, primaryCta: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-300 font-semibold">Teks Tombol Sekunder (CTA 2)</label>
                      <input
                        type="text"
                        value={heroForm.secondaryCta}
                        onChange={(e) => setHeroForm({ ...heroForm, secondaryCta: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-300 font-semibold">URL Foto Banner Hero</label>
                    <input
                      type="text"
                      value={heroForm.bannerImage}
                      onChange={(e) => setHeroForm({ ...heroForm, bannerImage: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 5. PROGRAMS CMS TAB */}
            {activeTab === 'programs' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-black text-xl text-white uppercase">
                    CMS PROGRAM LATIHAN & BIAYA ({programs.length})
                  </h4>
                  <button
                    onClick={() => setIsAddingProgram(!isAddingProgram)}
                    className="px-4 py-2 rounded-xl bg-[#00FF87] text-black font-bold text-xs uppercase flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Program</span>
                  </button>
                </div>

                {/* New Program Form Modal / Box */}
                {isAddingProgram && (
                  <div className="p-5 rounded-2xl bg-[#0D1510] border border-[#00FF87]/40 space-y-4 text-xs">
                    <h5 className="font-display font-bold text-sm text-white uppercase text-[#00FF87]">Formulir Program Baru</h5>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Nama Program"
                        value={newProgramForm.name}
                        onChange={(e) => setNewProgramForm({ ...newProgramForm, name: e.target.value })}
                        className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Rentang Usia (misal: 6 - 10 Tahun)"
                        value={newProgramForm.ageRange}
                        onChange={(e) => setNewProgramForm({ ...newProgramForm, ageRange: e.target.value })}
                        className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                      />
                      <input
                        type="number"
                        placeholder="SPP Bulanan (IDR)"
                        value={newProgramForm.monthlyFee}
                        onChange={(e) => setNewProgramForm({ ...newProgramForm, monthlyFee: Number(e.target.value) })}
                        className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                      />
                      <input
                        type="number"
                        placeholder="Biaya Registrasi & Kit (IDR)"
                        value={newProgramForm.registrationFee}
                        onChange={(e) => setNewProgramForm({ ...newProgramForm, registrationFee: Number(e.target.value) })}
                        className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                      />
                    </div>
                    <textarea
                      placeholder="Deskripsi Program Singkat..."
                      value={newProgramForm.description}
                      onChange={(e) => setNewProgramForm({ ...newProgramForm, description: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                      rows={2}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsAddingProgram(false)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-400"
                      >
                        Batal
                      </button>
                      <button
                        onClick={() => {
                          if (!newProgramForm.name) return showToast('Nama program wajib diisi', 'error');
                          addProgram(newProgramForm);
                          setIsAddingProgram(false);
                        }}
                        className="px-4 py-1.5 rounded-lg bg-[#00FF87] text-black font-bold"
                      >
                        Simpan Program
                      </button>
                    </div>
                  </div>
                )}

                {/* Programs List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {programs.map((p) => (
                    <div key={p.id} className="p-4 rounded-2xl bg-[#0D1510] border border-white/10 flex justify-between gap-4">
                      <div className="space-y-1 text-xs">
                        <span className="text-[10px] font-bold text-[#00FF87] uppercase">{p.category}</span>
                        <h5 className="font-display font-bold text-sm text-white">{p.name}</h5>
                        <p className="text-gray-400">{p.ageRange} • Kuota: {p.enrolled}/{p.quota}</p>
                        <p className="font-bold text-white mt-1">SPP: {formatIDR(p.monthlyFee)}/bln</p>
                      </div>
                      <div className="flex flex-col justify-between items-end">
                        <button
                          onClick={() => deleteProgram(p.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                          title="Hapus Program"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. COACHES CMS TAB */}
            {activeTab === 'coaches' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-black text-xl text-white uppercase">
                    CMS DEWAN PELATIH ({coaches.length})
                  </h4>
                  <button
                    onClick={() => setIsAddingCoach(!isAddingCoach)}
                    className="px-4 py-2 rounded-xl bg-[#00FF87] text-black font-bold text-xs uppercase flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Pelatih</span>
                  </button>
                </div>

                {isAddingCoach && (
                  <div className="p-5 rounded-2xl bg-[#0D1510] border border-[#00FF87]/40 space-y-3 text-xs">
                    <h5 className="font-display font-bold text-sm text-[#00FF87]">Tambah Profil Pelatih Baru</h5>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Nama Lengkap Pelatih"
                        value={newCoachForm.name}
                        onChange={(e) => setNewCoachForm({ ...newCoachForm, name: e.target.value })}
                        className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Lisensi (misal: UEFA Pro / AFC A)"
                        value={newCoachForm.license}
                        onChange={(e) => setNewCoachForm({ ...newCoachForm, license: e.target.value })}
                        className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Jabatan / Role"
                        value={newCoachForm.role}
                        onChange={(e) => setNewCoachForm({ ...newCoachForm, role: e.target.value })}
                        className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                      />
                      <input
                        type="text"
                        placeholder="URL Foto Pelatih"
                        value={newCoachForm.photo}
                        onChange={(e) => setNewCoachForm({ ...newCoachForm, photo: e.target.value })}
                        className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setIsAddingCoach(false)} className="px-3 py-1.5 bg-white/5 text-gray-400 rounded-lg">Batal</button>
                      <button
                        onClick={() => {
                          if (!newCoachForm.name) return showToast('Nama pelatih wajib diisi', 'error');
                          addCoach(newCoachForm);
                          setIsAddingCoach(false);
                        }}
                        className="px-4 py-1.5 bg-[#00FF87] text-black font-bold rounded-lg"
                      >
                        Simpan Pelatih
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {coaches.map((c) => (
                    <div key={c.id} className="p-4 rounded-2xl bg-[#0D1510] border border-white/10 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={c.photo} alt={c.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div className="text-xs">
                          <h5 className="font-bold text-white">{c.name}</h5>
                          <p className="text-[#00FF87] font-semibold">{c.license}</p>
                          <p className="text-gray-400 text-[11px]">{c.role}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteCoach(c.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. GALLERY CMS TAB */}
            {activeTab === 'gallery' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-black text-xl text-white uppercase">
                    CMS GALERI & FOTO KEGIATAN ({gallery.length})
                  </h4>
                  <button
                    onClick={() => setIsAddingGallery(!isAddingGallery)}
                    className="px-4 py-2 rounded-xl bg-[#00FF87] text-black font-bold text-xs uppercase flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload Foto</span>
                  </button>
                </div>

                {isAddingGallery && (
                  <div className="p-5 rounded-2xl bg-[#0D1510] border border-[#00FF87]/40 space-y-3 text-xs">
                    <h5 className="font-display font-bold text-sm text-[#00FF87]">Tambah Foto Baru ke Galeri</h5>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Judul Foto"
                        value={newGalleryForm.title}
                        onChange={(e) => setNewGalleryForm({ ...newGalleryForm, title: e.target.value })}
                        className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                      />
                      <select
                        value={newGalleryForm.category}
                        onChange={(e) => setNewGalleryForm({ ...newGalleryForm, category: e.target.value })}
                        className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                      >
                        <option value="Training Drills">Training Drills</option>
                        <option value="Trophy & Match">Trophy & Match</option>
                        <option value="Goalkeeper">Goalkeeper</option>
                        <option value="Scouting">Scouting</option>
                        <option value="Grassroots">Grassroots</option>
                        <option value="Facilities">Facilities</option>
                      </select>
                      <input
                        type="text"
                        placeholder="URL Gambar Foto"
                        value={newGalleryForm.image}
                        onChange={(e) => setNewGalleryForm({ ...newGalleryForm, image: e.target.value })}
                        className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-white col-span-2"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Caption / Keterangan..."
                      value={newGalleryForm.caption}
                      onChange={(e) => setNewGalleryForm({ ...newGalleryForm, caption: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                    />
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setIsAddingGallery(false)} className="px-3 py-1.5 bg-white/5 text-gray-400 rounded-lg">Batal</button>
                      <button
                        onClick={() => {
                          if (!newGalleryForm.title) return showToast('Judul foto wajib diisi', 'error');
                          addGalleryItem(newGalleryForm);
                          setIsAddingGallery(false);
                        }}
                        className="px-4 py-1.5 bg-[#00FF87] text-black font-bold rounded-lg"
                      >
                        Simpan Foto
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {gallery.map((g) => (
                    <div key={g.id} className="p-3 rounded-2xl bg-[#0D1510] border border-white/10 space-y-2 text-xs">
                      <img src={g.image} alt={g.title} className="w-full h-32 object-cover rounded-xl" />
                      <div className="flex items-start justify-between">
                        <div>
                          <h6 className="font-bold text-white line-clamp-1">{g.title}</h6>
                          <span className="text-[10px] text-[#00FF87]">{g.category}</span>
                        </div>
                        <button
                          onClick={() => deleteGalleryItem(g.id)}
                          className="p-1 rounded-lg bg-red-500/10 text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. SEO & SITE SETTINGS TAB */}
            {activeTab === 'seo' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-black text-xl text-white uppercase">
                    PENGATURAN WEBSITE & SEO S-TIER
                  </h4>
                  <button
                    onClick={() => updateSiteSettings({ seo: seoForm })}
                    className="px-5 py-2.5 rounded-xl bg-[#00FF87] text-black font-bold text-xs uppercase flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan SEO</span>
                  </button>
                </div>

                <div className="p-6 rounded-2xl bg-[#0D1510] border border-white/10 space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-gray-300 font-semibold">Meta Title Tag (Google Search)</label>
                    <input
                      type="text"
                      value={seoForm.metaTitle}
                      onChange={(e) => setSeoForm({ ...seoForm, metaTitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-300 font-semibold">Meta Description (150-160 karakter)</label>
                    <textarea
                      rows={3}
                      value={seoForm.metaDescription}
                      onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-300 font-semibold">Meta Keywords</label>
                    <input
                      type="text"
                      value={seoForm.metaKeywords}
                      onChange={(e) => setSeoForm({ ...seoForm, metaKeywords: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                    <span className="text-[11px] font-bold text-[#00FF87] uppercase">JSON-LD Structured Data Status:</span>
                    <p className="text-gray-400 text-[11px]">
                      Schema: <code>SportsClub</code>, <code>Course</code>, <code>FAQPage</code> terpasang aktif di <code>index.html</code> untuk Rich Snippets Google.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Student Dossier Detail Modal */}
      {selectedDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0D1510] border border-[#00FF87]/40 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h4 className="font-display font-bold text-base text-white">{selectedDossier.studentName}</h4>
                <p className="text-xs text-[#00FF87] font-mono">Dossier ID: {selectedDossier.id}</p>
              </div>
              <button onClick={() => setSelectedDossier(null)} className="p-1 rounded-lg bg-white/10 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-500">Tanggal Lahir / Kategori:</span>
                <span>{selectedDossier.birthDate} ({selectedDossier.ageCategory})</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-500">Posisi & Kaki Dominan:</span>
                <span>{selectedDossier.position} • {selectedDossier.preferredFoot}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-500">Orang Tua / Wali:</span>
                <span>{selectedDossier.parentName}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-500">No. WhatsApp:</span>
                <span className="font-mono text-white">{selectedDossier.parentPhone}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-500">Email:</span>
                <span>{selectedDossier.parentEmail}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-500">Alamat:</span>
                <span className="text-right max-w-[200px]">{selectedDossier.address}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-500">Ukuran Jersey:</span>
                <span className="font-bold text-white">Size {selectedDossier.jerseySize}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-gray-500">Catatan Medis:</span>
                <span>{selectedDossier.notes}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-gray-500">Status Bayar:</span>
                <span className={`font-bold ${selectedDossier.paymentStatus === 'PAID' ? 'text-green-400' : 'text-amber-400'}`}>
                  {selectedDossier.paymentStatus} ({formatIDR(selectedDossier.totalAmount)})
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedDossier(null)}
                className="px-4 py-2 rounded-xl bg-[#00FF87] text-black font-bold text-xs"
              >
                Tutup Dossier
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
