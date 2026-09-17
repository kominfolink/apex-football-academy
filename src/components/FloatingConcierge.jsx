import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { MessageCircle, UserPlus, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const FloatingConcierge = () => {
  const { siteSettings, openRegistration, toastMessage } = useAcademy();

  return (
    <>
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 animate-bounce">
          <div className={`px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md border flex items-center gap-3 text-xs ${
            toastMessage.type === 'error'
              ? 'bg-red-950/90 border-red-500 text-white'
              : toastMessage.type === 'info'
              ? 'bg-blue-950/90 border-blue-500 text-white'
              : 'bg-[#0D1510]/95 border-[#00FF87] text-white'
          }`}>
            {toastMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            ) : toastMessage.type === 'info' ? (
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#00FF87] shrink-0" />
            )}
            <span className="font-medium">{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* Floating Action Buttons (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Quick Registration Floating Pill */}
        <button
          onClick={() => openRegistration()}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#00FF87] to-[#10B981] text-black font-display font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#00FF87]/30 hover:scale-105 active:scale-95 transition-all"
        >
          <UserPlus className="w-4 h-4 text-black" />
          <span>Daftar Sekarang</span>
        </button>

        {/* WhatsApp Floating Button */}
        <a
          href={`https://wa.me/${siteSettings.whatsapp.replace(/\D/g, '')}?text=Halo%20Admin%20Apex%20Football%20Academy,%20saya%20ingin%20konsultasi%20pendaftaran%20siswa%20baru.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 p-3.5 rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
          title="Chat WhatsApp Konsultasi Pendaftaran"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
        </a>
      </div>
    </>
  );
};
