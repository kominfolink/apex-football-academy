import React, { useState, useEffect } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { 
  Trophy, 
  Menu, 
  X, 
  ShieldCheck, 
  Calendar, 
  Sparkles, 
  Phone, 
  Lock, 
  UserPlus,
  Compass,
  Layers,
  ChevronRight
} from 'lucide-react';

export const Navbar = () => {
  const { openRegistration, setIsAdminModalOpen, siteSettings } = useAcademy();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', href: '#' },
    { label: 'Program Latihan', href: '#programs' },
    { label: 'Papan Taktik', href: '#tactical-board' },
    { label: 'Jadwal', href: '#schedules' },
    { label: 'Pelatih & Staf', href: '#coaches' },
    { label: 'Fasilitas', href: '#facilities' },
    { label: 'Galeri', href: '#gallery' },
    { label: 'FAQ', href: '#faq' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#070B09]/95 backdrop-blur-md border-b border-[#00FF87]/15 py-3 shadow-2xl shadow-black/50' 
        : 'bg-gradient-to-b from-[#070B09]/90 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#00FF87] via-[#10B981] to-[#047857] p-[2px] shadow-lg shadow-[#00FF87]/20 group-hover:shadow-[#00FF87]/40 transition-all">
              <div className="w-full h-full bg-[#070B09] rounded-[10px] flex items-center justify-center">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#00FF87] group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-lg sm:text-xl tracking-wider text-white">APEX</span>
                <span className="font-display font-bold text-xs uppercase px-1.5 py-0.5 rounded bg-[#00FF87]/10 text-[#00FF87] border border-[#00FF87]/30">PRO ACADEMY</span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase -mt-0.5">Football High Performance</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#0D1510]/80 border border-white/5 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-medium text-gray-300 hover:text-[#00FF87] hover:bg-[#00FF87]/5 rounded-full transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Admin CMS Button */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="px-3 py-2 text-xs font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg flex items-center gap-1.5 transition-all"
              title="Akses Dashboard Admin & CMS"
            >
              <Lock className="w-3.5 h-3.5 text-[#00FF87]" />
              <span>Admin CMS</span>
            </button>

            {/* Trial CTA */}
            <a
              href={`https://wa.me/${siteSettings.whatsapp.replace(/\D/g, '')}?text=Halo%20Admin%20Apex%20Football%20Academy,%20saya%20ingin%20jadwalkan%20Free%20Trial%20latihan%20sepak%20bola.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs font-semibold text-gray-200 hover:text-white bg-[#0D1510] hover:bg-[#121C16] border border-[#00FF87]/30 rounded-lg flex items-center gap-1.5 transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-[#00FF87]" />
              <span>Free Trial</span>
            </a>

            {/* Register CTA */}
            <button
              onClick={() => openRegistration()}
              className="relative group overflow-hidden px-4 py-2 rounded-lg bg-gradient-to-r from-[#00FF87] to-[#10B981] text-black font-display font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#00FF87]/25 hover:shadow-[#00FF87]/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4 text-black" />
              <span>Daftar Siswa</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="p-2 text-xs bg-white/5 border border-white/10 rounded-lg text-[#00FF87]"
              title="Admin CMS"
            >
              <Lock className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white bg-[#0D1510] border border-white/10 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#070B09]/98 border-b border-[#00FF87]/20 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 text-xs font-medium text-gray-300 hover:text-[#00FF87] bg-[#0D1510] border border-white/5 rounded-lg flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openRegistration();
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#00FF87] to-[#10B981] text-black font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#00FF87]/20"
            >
              <UserPlus className="w-4 h-4" />
              <span>Daftar Siswa Baru</span>
            </button>

            <a
              href={`https://wa.me/${siteSettings.whatsapp.replace(/\D/g, '')}?text=Halo%20Admin%20Apex%20Football%20Academy,%20saya%20ingin%20jadwalkan%20Free%20Trial.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-[#0D1510] border border-[#00FF87]/30 text-white font-medium text-xs flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#00FF87]" />
              <span>Jadwalkan Free Trial</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
