import React, { useState, useEffect } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Users, 
  Calendar, 
  MapPin, 
  Check, 
  CreditCard, 
  Tag, 
  ShieldCheck, 
  Sparkles,
  Trophy
} from 'lucide-react';

export const RegistrationModal = () => {
  const { 
    isRegisterModalOpen, 
    setIsRegisterModalOpen, 
    selectedProgramForReg, 
    programs,
    submitRegistration,
    siteSettings,
    showToast
  } = useAcademy();

  const [step, setStep] = useState(1);
  const [selectedProg, setSelectedProg] = useState(programs[0]);
  const [paymentPlan, setPaymentPlan] = useState('Monthly'); // 'Monthly' | 'Semester'
  const [jerseySize, setJerseySize] = useState('M');
  const [selectedAddOns, setSelectedAddOns] = useState(['Official Match Kit Pack']);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    studentName: '',
    birthDate: '2014-06-15',
    ageCategory: 'U-12',
    position: 'Midfielder',
    preferredFoot: 'Kanan',
    medicalNotes: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    address: '',
    trainingCampus: 'Apex High Performance Center (Jakarta Selatan)',
    paymentMethod: 'QRIS Dynamic'
  });

  useEffect(() => {
    if (selectedProgramForReg) {
      setSelectedProg(selectedProgramForReg);
    }
  }, [selectedProgramForReg]);

  if (!isRegisterModalOpen) return null;

  const addOnOptions = [
    { name: 'Official Match Kit Pack (2 Jersey + Kaos Kaki + Gym Bag)', price: 0, required: true },
    { name: 'Asuransi Perlindungan Cedera Atlet (1 Musim Penuh)', price: 250000 },
    { name: 'Video Taktikal Biomekanik 4K + GPS Player Profile', price: 350000 }
  ];

  const planPrice = paymentPlan === 'Monthly' ? selectedProg.monthlyFee : selectedProg.semesterFee;
  const registrationFee = selectedProg.registrationFee;
  const addOnsTotal = selectedAddOns.reduce((acc, name) => {
    const item = addOnOptions.find(o => o.name === name);
    return acc + (item ? item.price : 0);
  }, 0);

  const subtotal = planPrice + registrationFee + addOnsTotal;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const totalAmount = subtotal - discountAmount;

  const formatIDR = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (siteSettings.promoCodes && siteSettings.promoCodes[code]) {
      const p = siteSettings.promoCodes[code];
      setDiscountPercent(p.discountPercent);
      setPromoApplied(true);
      showToast(`Promo ${code} aktif! Diskon ${p.discountPercent}% diterapkan.`);
    } else {
      showToast('Kode voucher tidak valid atau sudah kadaluarsa', 'error');
    }
  };

  const handleAddOnToggle = (name) => {
    if (name.includes('Official Match Kit')) return; // required
    if (selectedAddOns.includes(name)) {
      setSelectedAddOns(selectedAddOns.filter(a => a !== name));
    } else {
      setSelectedAddOns([...selectedAddOns, name]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.parentName || !formData.parentPhone) {
      showToast('Harap lengkapi semua data wajib bertanda bintang (*)', 'error');
      return;
    }

    const payload = {
      ...formData,
      program: selectedProg,
      paymentPlan,
      jerseySize,
      addOns: selectedAddOns,
      planPrice,
      subtotal,
      discount: discountAmount,
      totalAmount,
      items: [
        { name: `${selectedProg.name} (${paymentPlan})`, price: planPrice },
        { name: 'Biaya Registrasi & Official Kit Pack', price: registrationFee },
        ...selectedAddOns.filter(a => !a.includes('Official Match Kit')).map(a => {
          const it = addOnOptions.find(o => o.name === a);
          return { name: a, price: it ? it.price : 0 };
        })
      ]
    };

    submitRegistration(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0D1510] border border-[#00FF87]/40 rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#070B09]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00FF87]/10 border border-[#00FF87]/30 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-[#00FF87]" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                PENDAFTARAN SISWA BARU APEX ACADEMY
              </h3>
              <p className="text-xs text-gray-400">Musim Pelatihan 2026/2027 • Lisensi Standar UEFA/AFC</p>
            </div>
          </div>
          <button
            onClick={() => setIsRegisterModalOpen(false)}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="px-6 py-4 bg-[#0A100C] border-b border-white/5">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Data Siswa' },
              { num: 2, label: 'Data Wali' },
              { num: 3, label: 'Paket & Jadwal' },
              { num: 4, label: 'Add-ons & Kit' },
              { num: 5, label: 'Checkout & Review' }
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                  step === s.num 
                    ? 'bg-[#00FF87] text-black ring-4 ring-[#00FF87]/20 font-extrabold'
                    : step > s.num
                    ? 'bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]/40'
                    : 'bg-white/5 text-gray-400'
                }`}>
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className={`text-xs font-semibold hidden sm:inline ${
                  step === s.num ? 'text-white' : 'text-gray-400'
                }`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Body Container */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* STEP 1: DATA SISWA */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-white/5 pb-2">
                <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-[#00FF87]" />
                  <span>Informasi Calon Siswa Atlet</span>
                </h4>
                <p className="text-xs text-gray-400">Isi identitas siswa yang akan didaftarkan ke akademi.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-300">Nama Lengkap Siswa *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Muhammad Rayhan Pratama"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-[#00FF87] focus:outline-none text-white text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Tanggal Lahir *</label>
                  <input
                    type="date"
                    required
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-[#00FF87] focus:outline-none text-white text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Kategori Usia *</label>
                  <select
                    value={formData.ageCategory}
                    onChange={(e) => setFormData({ ...formData, ageCategory: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-[#00FF87] focus:outline-none text-white text-xs sm:text-sm"
                  >
                    <option value="U-8">Grassroots U-8 (Usia 6 - 8 Thn)</option>
                    <option value="U-10">Grassroots U-10 (Usia 9 - 10 Thn)</option>
                    <option value="U-12">Youth U-12 (Usia 11 - 12 Thn)</option>
                    <option value="U-14">Youth U-14 (Usia 13 - 14 Thn)</option>
                    <option value="U-16">Pro Pathway U-16 (Usia 15 - 16 Thn)</option>
                    <option value="U-18">Pro Pathway U-18 (Usia 17 - 18 Thn)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Posisi Favorit *</label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-[#00FF87] focus:outline-none text-white text-xs sm:text-sm"
                  >
                    <option value="Striker / Forward">Striker / Forward (Penyerang)</option>
                    <option value="Winger (Left/Right)">Winger (Sayap Kiri/Kanan)</option>
                    <option value="Attacking Midfielder (No. 10)">Gelandang Serang (Playmaker)</option>
                    <option value="Center Midfielder (No. 8)">Gelandang Tengah (Box-to-Box)</option>
                    <option value="Defensive Midfielder (No. 6)">Gelandang Bertahan (Anchor)</option>
                    <option value="Fullback / Wingback">Bek Sayap (Wingback)</option>
                    <option value="Center Back">Bek Tengah (Stopper/Ball-playing)</option>
                    <option value="Goalkeeper">Penjaga Gawang (Kiper)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Kaki Dominan *</label>
                  <select
                    value={formData.preferredFoot}
                    onChange={(e) => setFormData({ ...formData, preferredFoot: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-[#00FF87] focus:outline-none text-white text-xs sm:text-sm"
                  >
                    <option value="Kanan">Kanan</option>
                    <option value="Kiri (Kidal)">Kiri (Kidal)</option>
                    <option value="Kedua Kaki (Ambidextrous)">Kedua Kaki (Ambidextrous)</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-300">Catatan Medis / Pengalaman Sepak Bola Sebelumnya</label>
                  <textarea
                    rows={2}
                    placeholder="Contoh: Pernah ikut SSB selama 1 tahun, tidak ada alergi/riwayat asma..."
                    value={formData.medicalNotes}
                    onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-[#00FF87] focus:outline-none text-white text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DATA ORANG TUA / WALI */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-white/5 pb-2">
                <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#00FF87]" />
                  <span>Informasi Orang Tua / Wali Siswa</span>
                </h4>
                <p className="text-xs text-gray-400">Data ini digunakan untuk komunikasi laporan berkala dan kontak darurat.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-300">Nama Lengkap Orang Tua / Wali *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ir. Hendra Gunawan"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-[#00FF87] focus:outline-none text-white text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Nomor WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-[#00FF87] focus:outline-none text-white text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Email Wali *</label>
                  <input
                    type="email"
                    required
                    placeholder="Contoh: hendra@gmail.com"
                    value={formData.parentEmail}
                    onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-[#00FF87] focus:outline-none text-white text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-300">Alamat Tempat Tinggal Lengkap *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Jl. Fatmawati Raya No. 45, Kebayoran Baru, Jakarta Selatan..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-[#00FF87] focus:outline-none text-white text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PILIH PROGRAM & JADWAL */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-white/5 pb-2">
                <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#00FF87]" />
                  <span>Pilihan Program Latihan & Skema Pembayaran</span>
                </h4>
                <p className="text-xs text-gray-400">Pilih kurikulum yang sesuai dengan usia dan target siswa.</p>
              </div>

              {/* Program Selector Grid */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-300">Pilih Program Latihan:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                  {programs.map((prog) => (
                    <div
                      key={prog.id}
                      onClick={() => setSelectedProg(prog)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        selectedProg.id === prog.id
                          ? 'bg-[#00FF87]/15 border-[#00FF87] shadow-lg shadow-[#00FF87]/10'
                          : 'bg-black/40 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-xs text-white">{prog.name}</span>
                        {selectedProg.id === prog.id && <Check className="w-4 h-4 text-[#00FF87]" />}
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1">{prog.ageRange}</p>
                      <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-white/5">
                        <span className="text-[11px] text-[#00FF87] font-bold">{formatIDR(prog.monthlyFee)}/bln</span>
                        <span className="text-[10px] text-gray-400">Reg: {formatIDR(prog.registrationFee)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing Cycle Selector */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div
                  onClick={() => setPaymentPlan('Monthly')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentPlan === 'Monthly'
                      ? 'bg-[#00FF87]/15 border-[#00FF87]'
                      : 'bg-black/40 border-white/10'
                  }`}
                >
                  <p className="text-xs font-bold text-white">Paket Bulanan (SPP)</p>
                  <p className="font-display font-black text-lg text-[#00FF87] mt-1">{formatIDR(selectedProg.monthlyFee)}</p>
                  <span className="text-[10px] text-gray-400">Dibayar rutin setiap bulan</span>
                </div>

                <div
                  onClick={() => setPaymentPlan('Semester')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentPlan === 'Semester'
                      ? 'bg-[#FFD700]/15 border-[#FFD700]'
                      : 'bg-black/40 border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-white">Paket 1 Semester (6 Bulan)</p>
                    <span className="px-1.5 py-0.5 rounded bg-[#FFD700]/20 text-[#FFD700] text-[9px] font-bold">HEMAT 15%</span>
                  </div>
                  <p className="font-display font-black text-lg text-[#FFD700] mt-1">{formatIDR(selectedProg.semesterFee)}</p>
                  <span className="text-[10px] text-gray-400">Garansi tempat selama 6 bulan</span>
                </div>
              </div>

              {/* Campus Location */}
              <div className="space-y-1 pt-2">
                <label className="text-xs font-semibold text-gray-300">Lokasi Kampus Latihan *</label>
                <select
                  value={formData.trainingCampus}
                  onChange={(e) => setFormData({ ...formData, trainingCampus: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-[#00FF87] focus:outline-none text-white text-xs sm:text-sm"
                >
                  <option value="Apex High Performance Center (Jakarta Selatan)">Apex High Performance Center (Jakarta Selatan)</option>
                  <option value="Apex Stadium Training Ground (Jakarta Pusat)">Apex Stadium Training Ground (Jakarta Pusat)</option>
                  <option value="Apex Youth Complex (Tangerang Selatan)">Apex Youth Complex (Tangerang Selatan)</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 4: ADD-ONS & KIT APPAREL */}
          {step === 4 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-white/5 pb-2">
                <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00FF87]" />
                  <span>Ukuran Jersey Resmi & Perlengkapan Tambahan</span>
                </h4>
                <p className="text-xs text-gray-400">Setiap siswa mendapatkan 1 set official match kit jersey.</p>
              </div>

              {/* Jersey Size Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-300">Pilih Ukuran Official Jersey Apex (Anak & Remaja):</label>
                <div className="grid grid-cols-5 gap-2">
                  {['S (6-8 Thn)', 'M (9-11 Thn)', 'L (12-14 Thn)', 'XL (15-16 Thn)', 'XXL (17+ Thn)'].map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => setJerseySize(size.split(' ')[0])}
                      className={`py-3 rounded-xl font-display font-bold text-xs uppercase border transition-all ${
                        jerseySize === size.split(' ')[0]
                          ? 'bg-[#00FF87] text-black font-extrabold border-[#00FF87]'
                          : 'bg-black/40 text-gray-300 border-white/10'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons Checklist */}
              <div className="space-y-3 pt-3">
                <label className="text-xs font-semibold text-gray-300">Pilihan Fasilitas & Add-ons Opsional:</label>
                <div className="space-y-2">
                  {addOnOptions.map((opt, i) => {
                    const isSelected = selectedAddOns.includes(opt.name);
                    return (
                      <div
                        key={i}
                        onClick={() => handleAddOnToggle(opt.name)}
                        className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-[#00FF87]/10 border-[#00FF87]'
                            : 'bg-black/30 border-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                            isSelected ? 'bg-[#00FF87] border-[#00FF87] text-black' : 'border-white/20'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">{opt.name}</p>
                            {opt.required && <span className="text-[10px] text-[#00FF87] font-bold">SUDAH TERMASUK REGISTRASI</span>}
                          </div>
                        </div>
                        <span className="font-display font-bold text-xs text-white">
                          {opt.price === 0 ? 'Gratis' : formatIDR(opt.price)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW & SUMMARY */}
          {step === 5 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-white/5 pb-2">
                <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#00FF87]" />
                  <span>Ringkasan Pendaftaran & Total Biaya</span>
                </h4>
                <p className="text-xs text-gray-400">Periksa kembali data siswa sebelum melanjutkan ke Payment Gateway.</p>
              </div>

              {/* Review Info Card */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Nama Siswa:</span>
                  <strong className="text-white">{formData.studentName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Kategori & Posisi:</span>
                  <span className="text-[#00FF87] font-semibold">{formData.ageCategory} • {formData.position}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Nama Wali / No. WA:</span>
                  <span className="text-white">{formData.parentName} ({formData.parentPhone})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Program Terpilih:</span>
                  <span className="text-white font-bold">{selectedProg.name} ({paymentPlan})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ukuran Jersey:</span>
                  <span className="text-white font-semibold">Size {jerseySize}</span>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Masukkan Kode Voucher (misal: APEXPRO2026)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-[#00FF87] text-white text-xs uppercase"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-5 py-3 rounded-xl bg-[#00FF87] hover:bg-[#00FF87]/80 text-black font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Terapkan
                </button>
              </div>

              {promoApplied && (
                <div className="p-2.5 rounded-xl bg-[#00FF87]/15 border border-[#00FF87]/30 text-xs text-[#00FF87] font-semibold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Voucher APEXPRO2026 Berhasil Digunakan! Diskon {discountPercent}% Aktif.</span>
                </div>
              )}

              {/* Cost Calculation Summary */}
              <div className="p-4 rounded-2xl bg-[#0A100C] border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>Biaya Program ({paymentPlan}):</span>
                  <span>{formatIDR(planPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Biaya Registrasi & Official Kit Pack:</span>
                  <span>{formatIDR(registrationFee)}</span>
                </div>
                {addOnsTotal > 0 && (
                  <div className="flex justify-between text-gray-300">
                    <span>Add-ons Tambahan:</span>
                    <span>{formatIDR(addOnsTotal)}</span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#00FF87] font-bold">
                    <span>Diskon Promo ({discountPercent}%):</span>
                    <span>- {formatIDR(discountAmount)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                  <span className="font-display font-black text-sm text-white uppercase">Total Pembayaran:</span>
                  <span className="font-display font-black text-2xl text-[#00FF87]">
                    {formatIDR(totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Wizard Bottom Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs uppercase flex items-center gap-2 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
            ) : (
              <div></div>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-3 rounded-xl bg-[#00FF87] hover:bg-[#00FF87]/90 text-black font-display font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#00FF87]/20 transition-all"
              >
                <span>Lanjut</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00FF87] via-[#10B981] to-[#059669] text-black font-display font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-[#00FF87]/30 hover:scale-105 active:scale-95 transition-all"
              >
                <CreditCard className="w-4 h-4" />
                <span>Lanjut ke Pembayaran Instan</span>
              </button>
            )}
          </div>

        </form>

      </div>
    </div>
  );
};
