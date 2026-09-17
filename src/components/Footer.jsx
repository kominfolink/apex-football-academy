import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Trophy, Phone, Mail, MapPin, Instagram, Youtube, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const { siteSettings, openRegistration, setIsAdminModalOpen } = useAcademy();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050806] border-t border-[#00FF87]/15 pt-16 pb-12 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-[#00FF87]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF87] to-[#059669] p-[2px]">
                <div className="w-full h-full bg-[#070B09] rounded-[10px] flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-[#00FF87]" />
                </div>
              </div>
              <div>
                <span className="font-display font-black text-xl tracking-wider text-white">APEX</span>
                <span className="font-display font-bold text-xs uppercase ml-1 px-1.5 py-0.5 rounded bg-[#00FF87]/10 text-[#00FF87] border border-[#00FF87]/30">
                  PRO ACADEMY
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Akademi sepak bola profesional dan pusat performa tinggi berstandar UEFA/AFC. Berkomitmen melahirkan generasi pesepak bola Indonesia yang berdaya saing global, berkarakter tangguh, dan bermental juara.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#00FF87] hover:text-black text-gray-300 flex items-center justify-center transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#00FF87] hover:text-black text-gray-300 flex items-center justify-center transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-[10px] font-mono border border-white/5 transition-all"
              >
                /admin-cms
              </button>
            </div>
          </div>

          {/* Col 3: Program Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">
              Program Pembinaan
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#programs" className="hover:text-[#00FF87] transition-colors">Grassroots Foundation (U-8 & U-10)</a></li>
              <li><a href="#programs" className="hover:text-[#00FF87] transition-colors">Youth Development (U-12 & U-14)</a></li>
              <li><a href="#programs" className="hover:text-[#00FF87] transition-colors">Elite Pro Pathway (U-16 & U-18)</a></li>
              <li><a href="#programs" className="hover:text-[#00FF87] transition-colors">Goalkeeper Masterclass</a></li>
              <li><a href="#programs" className="hover:text-[#00FF87] transition-colors">1-on-1 Private Mentoring</a></li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#schedules" className="hover:text-[#00FF87] transition-colors">Jadwal Latihan Mingguan</a></li>
              <li><a href="#tactical-board" className="hover:text-[#00FF87] transition-colors">Papan Taktik Interaktif</a></li>
              <li><a href="#coaches" className="hover:text-[#00FF87] transition-colors">Dewan Pelatih Lisensi UEFA/AFC</a></li>
              <li><a href="#facilities" className="hover:text-[#00FF87] transition-colors">Fasilitas Standar FIFA</a></li>
              <li><a href="#gallery" className="hover:text-[#00FF87] transition-colors">Galeri Dokumentasi</a></li>
              <li><a href="#faq" className="hover:text-[#00FF87] transition-colors">Pertanyaan Umum (FAQ)</a></li>
            </ul>
          </div>

          {/* Col 5: Contact & Location */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">
              Sekretariat & Hubungi Kami
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00FF87] shrink-0 mt-0.5" />
                <span>{siteSettings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#00FF87] shrink-0" />
                <span>{siteSettings.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00FF87] shrink-0" />
                <span>{siteSettings.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Accreditation & Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            © 2026 Apex Football Academy. All Rights Reserved. Terdaftar di PSSI & AFC Grassroots Charter.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#00FF87] font-semibold">256-Bit SSL Payment Secured</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              title="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
