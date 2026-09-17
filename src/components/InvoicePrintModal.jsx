import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { X, Printer, Trophy, ShieldCheck, CheckCircle2, Download } from 'lucide-react';

export const InvoicePrintModal = () => {
  const { isInvoiceModalOpen, setIsInvoiceModalOpen, activeInvoice, siteSettings } = useAcademy();

  if (!isInvoiceModalOpen || !activeInvoice) return null;

  const formatIDR = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val || 0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white text-black rounded-3xl overflow-hidden shadow-2xl my-8 print:m-0 print:rounded-none print:shadow-none print:border-none">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#070B09] text-white border-b border-white/10 print:hidden">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#00FF87]" />
            <span className="font-display font-bold text-sm">Bukti Pendaftaran & Kwitansi Resmi</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-[#00FF87] hover:bg-[#00FF87]/90 text-black font-bold text-xs uppercase flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={() => setIsInvoiceModalOpen(false)}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Invoice Body */}
        <div className="p-8 sm:p-10 space-y-8 bg-white" id="printable-invoice">
          
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-gray-900 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-black text-[#00FF87] flex items-center justify-center font-display font-black text-2xl border border-black">
                A
              </div>
              <div>
                <h1 className="font-display font-black text-xl tracking-tight text-black uppercase">
                  APEX FOOTBALL ACADEMY
                </h1>
                <p className="text-[11px] text-gray-600 font-medium">PT APEX FOOTBALL HIGH PERFORMANCE INDONESIA</p>
                <p className="text-[10px] text-gray-500">Izin Operasional PSSI / Standard UEFA & AFC</p>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-0.5">
              <span className="inline-block px-3 py-1 rounded bg-green-100 text-green-800 font-bold text-xs uppercase">
                {activeInvoice.status === 'PAID' ? 'LUNAS / OFFICIAL RECEIPT' : 'MENUNGGU PEMBAYARAN'}
              </span>
              <p className="font-mono text-xs font-bold text-gray-900 mt-1">No: {activeInvoice.invoiceId}</p>
              <p className="text-[11px] text-gray-500">Tanggal: {activeInvoice.paidAt || '2026-09-18'}</p>
            </div>
          </div>

          {/* Student & Parent Info Grid */}
          <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">DATA SISWA ATLET:</span>
              <p className="font-bold text-sm text-gray-900">{activeInvoice.studentName}</p>
              <p className="text-gray-600 font-mono">No. Registrasi: <strong>{activeInvoice.registrationId}</strong></p>
              <p className="text-gray-600">Program: <strong>{activeInvoice.programName}</strong></p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">METODE & VERIFIKASI:</span>
              <p className="text-gray-700">Metode Bayar: <strong>{activeInvoice.paymentMethod}</strong></p>
              <p className="text-gray-700 font-mono">Ref Code: <strong>{activeInvoice.referenceCode}</strong></p>
              <p className="text-gray-700">Status Gateway: <strong className="text-green-600">Verified 256-bit SSL</strong></p>
            </div>
          </div>

          {/* Table of Items */}
          <div className="space-y-2">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b-2 border-gray-300 text-gray-500 uppercase text-[10px] font-bold">
                  <th className="py-2">Deskripsi Rincian</th>
                  <th className="py-2 text-center">Jumlah</th>
                  <th className="py-2 text-right">Biaya Satuan</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeInvoice.items?.map((it, idx) => (
                  <tr key={idx}>
                    <td className="py-3 font-semibold text-gray-800">{it.name}</td>
                    <td className="py-3 text-center text-gray-600">1 Paket</td>
                    <td className="py-3 text-right text-gray-600">{formatIDR(it.price)}</td>
                    <td className="py-3 text-right font-bold text-gray-900">{formatIDR(it.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total Calculation */}
            <div className="border-t-2 border-gray-900 pt-3 space-y-1.5 text-xs text-right">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>{formatIDR(activeInvoice.subtotal)}</span>
              </div>
              {activeInvoice.discount > 0 && (
                <div className="flex justify-between text-green-700 font-bold">
                  <span>Diskon Promo:</span>
                  <span>- {formatIDR(activeInvoice.discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-display font-black text-base text-gray-900 pt-2 border-t border-gray-200">
                <span>TOTAL RESMI:</span>
                <span className="text-black">{formatIDR(activeInvoice.total)}</span>
              </div>
            </div>
          </div>

          {/* Stamp & Signature Footer */}
          <div className="pt-6 border-t border-gray-200 flex items-end justify-between">
            <div className="space-y-1 text-[11px] text-gray-500">
              <p>• Harap bawa bukti kwitansi ini saat registrasi ulang / pengambilan jersey.</p>
              <p>• Layanan Bantuan: <strong>{siteSettings.phone}</strong></p>
              <p>• Lokasi Kompleks: {siteSettings.address}</p>
            </div>

            <div className="text-center space-y-1">
              <div className="w-24 h-12 border border-dashed border-gray-400 rounded-lg flex items-center justify-center text-[10px] text-gray-400 font-bold uppercase mx-auto">
                [ STEMPEL RESMI ]
              </div>
              <p className="font-bold text-xs text-gray-900">Head of Admissions</p>
              <p className="text-[10px] text-gray-500">Apex Football Academy</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
