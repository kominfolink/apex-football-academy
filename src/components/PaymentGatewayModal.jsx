import React, { useState, useEffect } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { 
  X, 
  CheckCircle2, 
  QrCode, 
  Building2, 
  Smartphone, 
  CreditCard, 
  Copy, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  FileText,
  Sparkles,
  Zap
} from 'lucide-react';

export const PaymentGatewayModal = () => {
  const { 
    isPaymentModalOpen, 
    setIsPaymentModalOpen, 
    activeInvoice, 
    recordPaymentSuccess,
    setIsInvoiceModalOpen,
    siteSettings,
    showToast
  } = useAcademy();

  const [paymentMethod, setPaymentMethod] = useState('QRIS'); // 'QRIS' | 'VA' | 'EWALLET' | 'CARD'
  const [selectedBank, setSelectedBank] = useState('BCA');
  const [selectedEwallet, setSelectedEwallet] = useState('GOPAY');
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(899); // 15 minutes
  const [isProcessing, setIsProcessing] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (!isPaymentModalOpen || !activeInvoice || activeInvoice.status === 'PAID') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaymentModalOpen, activeInvoice]);

  if (!isPaymentModalOpen || !activeInvoice) return null;

  const isPaid = activeInvoice.status === 'PAID';

  const formatIDR = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val || 0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const vaNumbers = {
    BCA: '88301' + (activeInvoice.registrationId?.replace(/\D/g, '') || '2026'),
    Mandiri: '88902' + (activeInvoice.registrationId?.replace(/\D/g, '') || '2026'),
    BRI: '10423' + (activeInvoice.registrationId?.replace(/\D/g, '') || '2026'),
    BNI: '99201' + (activeInvoice.registrationId?.replace(/\D/g, '') || '2026')
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Nomor Virtual Account disalin ke clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  // Simulate Instant Payment Settlement
  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      recordPaymentSuccess(activeInvoice.invoiceId, {
        method: paymentMethod === 'QRIS' ? 'QRIS Dynamic' : `${selectedBank} Virtual Account`,
        refCode: `APEX-SETTLE-${Date.now().toString().slice(-8)}`
      });
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0D1510] border border-[#00FF87]/40 rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#070B09]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00FF87]/10 border border-[#00FF87]/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#00FF87]" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-white uppercase tracking-tight flex items-center gap-2">
                <span>APEX SECURE PAYMENT GATEWAY</span>
                <span className="text-[10px] bg-[#00FF87]/10 text-[#00FF87] px-2 py-0.5 rounded border border-[#00FF87]/30">256-BIT SSL</span>
              </h3>
              <p className="text-xs text-gray-400">Invoice: <strong className="text-white font-mono">{activeInvoice.invoiceId}</strong></p>
            </div>
          </div>
          <button
            onClick={() => setIsPaymentModalOpen(false)}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Notice if PAID */}
        {isPaid ? (
          <div className="p-8 text-center space-y-6 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-[#00FF87]/15 border-2 border-[#00FF87] flex items-center justify-center mx-auto text-[#00FF87] shadow-xl shadow-[#00FF87]/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#00FF87]/20 text-[#00FF87] font-display font-extrabold text-xs uppercase tracking-wider">
                PEMBAYARAN TERVERIFIKASI RESMI
              </span>
              <h4 className="font-display font-black text-2xl text-white">
                Selamat! Registrasi Siswa Berhasil Diselesaikan
              </h4>
              <p className="text-xs text-gray-300 max-w-md mx-auto">
                Status siswa untuk <strong>{activeInvoice.studentName}</strong> kini telah aktif. Jadwal dan kit resmi dapat diambil pada hari pertama latihan.
              </p>
            </div>

            {/* Paid Details Receipt Card */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 max-w-md mx-auto text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">No. Registrasi:</span>
                <strong className="text-white font-mono">{activeInvoice.registrationId}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Program:</span>
                <span className="text-white font-semibold">{activeInvoice.programName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Dibayar:</span>
                <span className="text-[#00FF87] font-black">{formatIDR(activeInvoice.total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Waktu Bayar:</span>
                <span className="text-gray-300">{activeInvoice.paidAt || 'Tervalidasi'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  setIsPaymentModalOpen(false);
                  setIsInvoiceModalOpen(true);
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#00FF87] text-black font-display font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#00FF87]/25"
              >
                <FileText className="w-4 h-4" />
                <span>Cetak / Unduh Bukti Pendaftaran</span>
              </button>

              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        ) : (
          /* UNPAID / CHECKOUT FLOW */
          <div className="p-6 space-y-6">
            
            {/* Total Due Card with Countdown */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0D1510] to-[#121C16] border border-[#00FF87]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-semibold">Total Tagihan Pendaftaran</span>
                <p className="font-display font-black text-2xl sm:text-3xl text-[#00FF87]">
                  {formatIDR(activeInvoice.total)}
                </p>
                <p className="text-[11px] text-gray-300 mt-0.5">
                  Siswa: <strong className="text-white">{activeInvoice.studentName}</strong> • {activeInvoice.programName}
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-xs">
                <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                <span className="text-gray-400">Batas Waktu:</span>
                <span className="font-mono font-bold text-amber-400">{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'QRIS', label: 'QRIS Instan', icon: QrCode },
                { id: 'VA', label: 'Virtual Account', icon: Building2 },
                { id: 'EWALLET', label: 'E-Wallet', icon: Smartphone },
                { id: 'CARD', label: 'Kartu Kredit', icon: CreditCard }
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`py-3 px-2 rounded-xl text-center border transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === m.id
                        ? 'bg-[#00FF87]/15 border-[#00FF87] text-[#00FF87] font-bold shadow-lg shadow-[#00FF87]/10'
                        : 'bg-black/30 border-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-[11px] leading-tight">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* PAYMENT DETAILS CONTENT */}

            {/* 1. QRIS DYNAMIC */}
            {paymentMethod === 'QRIS' && (
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-center space-y-4 animate-fadeIn">
                <div className="inline-block p-4 rounded-2xl bg-white shadow-2xl">
                  {/* Dynamic QR image */}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=APEX_INVOICE_${activeInvoice.invoiceId}_AMT_${activeInvoice.total}`}
                    alt="QRIS Apex Football Academy"
                    className="w-44 h-44 object-contain mx-auto"
                  />
                  <div className="flex items-center justify-center gap-2 pt-2 border-t border-gray-200 mt-2">
                    <span className="font-display font-black text-xs text-black tracking-wider">QRIS NASIONAL</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-semibold text-white">Scan dengan BCA Mobile, GoPay, OVO, ShopeePay, DANA, Livin, atau Mobile Banking apa saja</p>
                  <p className="text-[11px] text-gray-400">Verifikasi instan otomatis dalam hitungan detik tanpa upload bukti transfer.</p>
                </div>
              </div>
            )}

            {/* 2. VIRTUAL ACCOUNT */}
            {paymentMethod === 'VA' && (
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4 animate-fadeIn">
                <div className="flex gap-2">
                  {['BCA', 'Mandiri', 'BRI', 'BNI'].map((bank) => (
                    <button
                      key={bank}
                      onClick={() => setSelectedBank(bank)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedBank === bank
                          ? 'bg-[#00FF87] text-black border-[#00FF87]'
                          : 'bg-black/50 text-gray-300 border-white/10'
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-[#070B09] border border-white/10 space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Nomor Virtual Account {selectedBank}:</span>
                    <span>Atas Nama: APEX FOOTBALL ACADEMY</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-black text-lg sm:text-xl text-[#00FF87] tracking-wider">
                      {vaNumbers[selectedBank]}
                    </span>
                    <button
                      onClick={() => copyToClipboard(vaNumbers[selectedBank])}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white font-bold flex items-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? 'Tersalin!' : 'Salin'}</span>
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-gray-400 space-y-1">
                  <p>1. Buka Mobile Banking / ATM {selectedBank}</p>
                  <p>2. Pilih menu <strong>Transfer &gt; Virtual Account</strong></p>
                  <p>3. Masukkan nomor VA di atas dan konfirmasi nominal tepat: <strong>{formatIDR(activeInvoice.total)}</strong></p>
                </div>
              </div>
            )}

            {/* 3. E-WALLET */}
            {paymentMethod === 'EWALLET' && (
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4 animate-fadeIn">
                <div className="grid grid-cols-4 gap-2">
                  {['GOPAY', 'OVO', 'DANA', 'SHOPEE'].map((ew) => (
                    <button
                      key={ew}
                      onClick={() => setSelectedEwallet(ew)}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedEwallet === ew
                          ? 'bg-[#00FF87] text-black border-[#00FF87]'
                          : 'bg-black/50 text-gray-300 border-white/10'
                      }`}
                    >
                      {ew}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-300 text-center">
                  Pembayaran via <strong>{selectedEwallet}</strong> akan otomatis mengalihkan atau menampilkan QR barcode instan.
                </p>
              </div>
            )}

            {/* 4. CREDIT CARD */}
            {paymentMethod === 'CARD' && (
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 animate-fadeIn text-xs">
                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold">Nomor Kartu Kredit / Debit (Visa / Mastercard)</label>
                  <input
                    type="text"
                    placeholder="4111 2222 3333 4444"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-gray-300 font-semibold">Masa Berlaku (MM/YY)</label>
                    <input
                      type="text"
                      placeholder="12/28"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-300 font-semibold">CVV</label>
                    <input
                      type="password"
                      maxLength={3}
                      placeholder="•••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions & Simulation Webhook Trigger */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00FF87] via-[#10B981] to-[#059669] text-black font-display font-black text-xs uppercase tracking-wider shadow-xl shadow-[#00FF87]/25 hover:shadow-[#00FF87]/50 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>{isProcessing ? 'Memproses Verifikasi Gateway...' : 'Simulasikan Pembayaran Berhasil (Instant Webhook)'}</span>
              </button>

              <p className="text-[10px] text-gray-400 text-center">
                Sistem simulator ini terhubung dengan webhook callback real-time untuk pengujian langsung tanpa biaya perbankan nyata.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
