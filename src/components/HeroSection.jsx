import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { 
  Trophy, 
  Play, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Flame, 
  CheckCircle2, 
  Star,
  Activity,
  X
} from 'lucide-react';

export const HeroSection = () => {
  const { hero, openRegistration, siteSettings } = useAcademy();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden pitch-lines-bg">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-[#00FF87]/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Season Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00FF87]/10 border border-[#00FF87]/30 text-[#00FF87] text-xs font-semibold uppercase tracking-wider animate-pulse-slow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{hero.badge || "PENDAFTARAN MUSIM 2026/2027 TELAH DIBUKA"}</span>
            </div>

            {/* Main Athletic Headline */}
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-white tracking-tight uppercase leading-[1.08]">
              {hero.headline ? (
                hero.headline.split(' ').map((word, i) => (
                  <span key={i} className={i % 3 === 1 ? 'text-neon-gradient block sm:inline ' : ''}>
                    {word}{' '}
                  </span>
                ))
              ) : (
                <>
                  MEMBENTUK <span className="text-neon-gradient">BINTANG SEPAK BOLA</span> MASA DEPAN
                </>
              )}
            </h1>

            {/* Subheadline Description */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {hero.subheadline || "Akademi sepak bola nomor satu dengan kurikulum standar internasional UEFA & AFC. Fasilitas kelas dunia, sport science lab, dan jalur beasiswa profesional ke Liga 1 & luar negeri."}
            </p>

            {/* Key Value Proposition Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-medium text-gray-300">
              <div className="flex items-center gap-1.5 bg-[#0D1510] px-3 py-1.5 rounded-lg border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#00FF87]" />
                <span>Lisensi UEFA & AFC</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#0D1510] px-3 py-1.5 rounded-lg border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#00FF87]" />
                <span>Hybrid Pitch Standar FIFA</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#0D1510] px-3 py-1.5 rounded-lg border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#00FF87]" />
                <span>Payment QRIS & VA Instan</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => openRegistration()}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#00FF87] via-[#10B981] to-[#059669] text-black font-display font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-[#00FF87]/25 hover:shadow-[#00FF87]/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
              >
                <span>{hero.primaryCta || "Daftar Siswa Baru"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-black" />
              </button>

              <a
                href={`https://wa.me/${siteSettings.whatsapp.replace(/\D/g, '')}?text=Halo%20Admin%20Apex%20Football%20Academy,%20saya%20ingin%20jadwalkan%20Free%20Trial%20latihan%20sepak%20bola.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#0D1510] hover:bg-[#121C16] border border-[#00FF87]/30 text-white font-display font-bold text-sm uppercase tracking-wider hover:border-[#00FF87] transition-all flex items-center justify-center gap-2.5"
              >
                <Activity className="w-4 h-4 text-[#00FF87]" />
                <span>{hero.secondaryCta || "Jadwalkan Free Trial"}</span>
              </a>
            </div>

            {/* Trust & Social Proof Bar */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-gray-400">
              <div className="flex -space-x-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#070B09] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100" alt="Avatar 1" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#070B09] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100" alt="Avatar 2" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#070B09] object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100" alt="Avatar 3" />
                <div className="w-8 h-8 rounded-full bg-[#00FF87] text-black font-bold flex items-center justify-center ring-2 ring-[#070B09] text-[10px]">
                  500+
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-[#FFD700]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FFD700]" />
                  ))}
                  <span className="font-bold text-white text-xs ml-1">4.9 / 5.0</span>
                </div>
                <p className="text-[11px] text-gray-400">Dipercaya oleh 500+ orang tua atlet di Indonesia</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            
            {/* Visual Glass Wrapper */}
            <div className="relative rounded-3xl p-3 bg-gradient-to-b from-[#00FF87]/20 via-white/5 to-transparent border border-[#00FF87]/30 shadow-2xl shadow-[#00FF87]/10">
              
              {/* Main Banner Image with Overlay */}
              <div className="relative h-[380px] sm:h-[460px] rounded-2xl overflow-hidden group">
                <img 
                  src={hero.bannerImage || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop"} 
                  alt="Apex Football Academy Training" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B09] via-transparent to-black/30"></div>

                {/* Video Play Button Trigger */}
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#00FF87]/90 hover:bg-[#00FF87] text-black flex items-center justify-center shadow-xl shadow-[#00FF87]/40 hover:scale-110 active:scale-95 transition-all group"
                  title="Tonton Video Profil Akademi"
                >
                  <Play className="w-6 h-6 fill-black translate-x-0.5" />
                </button>

                {/* Floating Live Badge Top */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  <span>FIFA Standard Hybrid Pitch</span>
                </div>

                {/* Bottom Floating Stats Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0D1510]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Scouting Rate</span>
                    <p className="font-display font-black text-xl text-[#00FF87]">94% Tembus Pro</p>
                  </div>
                  <div className="h-8 w-px bg-white/10"></div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">UEFA/AFC Coach</span>
                    <p className="font-display font-black text-xl text-white">18 Lisensi</p>
                  </div>
                  <div className="h-8 w-px bg-white/10"></div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Fasilitas</span>
                    <p className="font-display font-black text-xl text-[#FFD700]">Pro Lab</p>
                  </div>
                </div>

              </div>

            </div>

            {/* Corner Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#00FF87]/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#FFD700]/10 rounded-full blur-xl pointer-events-none"></div>

          </div>

        </div>

      </div>

      {/* Video Modal Preview */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#0D1510] border border-[#00FF87]/30 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070B09]">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#00FF87]" />
                <span className="font-display font-bold text-white text-sm">Official Highlight Reel — Apex Football Academy</span>
              </div>
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video 
                src={hero.videoHighlightUrl || "https://assets.mixkit.co/videos/preview/mixkit-boys-playing-football-match-in-a-stadium-41440-large.mp4"} 
                controls 
                autoPlay 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
