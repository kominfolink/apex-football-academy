import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Trophy, Users, Award, Shield, Zap, Sparkles } from 'lucide-react';

export const StatsTicker = () => {
  const { hero } = useAcademy();

  const stats = hero.stats || [
    { label: "Siswa Aktif", value: "540+", suffix: "Talenta Muda" },
    { label: "Pelatih Lisensi", value: "18", suffix: "UEFA / AFC" },
    { label: "Lapangan Standar FIFA", value: "8", suffix: "Hybrid Pitches" },
    { label: "Lolos Pro Pathway", value: "94%", suffix: "Scouted to Pro" }
  ];

  const icons = [Users, Award, Trophy, Zap];

  return (
    <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-[#00FF87]/20 shadow-2xl shadow-black/80 bg-gradient-to-r from-[#0D1510] via-[#070B09] to-[#0D1510]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div key={idx} className={`flex items-center gap-4 ${idx > 0 ? 'pt-4 md:pt-0 md:pl-6' : ''}`}>
                <div className="w-12 h-12 rounded-xl bg-[#00FF87]/10 border border-[#00FF87]/20 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-[#00FF87]" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-200 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-[11px] text-[#00FF87] font-medium">{stat.suffix}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
