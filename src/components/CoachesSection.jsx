import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Trophy, Award, ShieldCheck, Star, Sparkles } from 'lucide-react';

export const CoachesSection = () => {
  const { coaches } = useAcademy();

  return (
    <section id="coaches" className="py-24 relative overflow-hidden bg-[#070B09]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF87]/10 border border-[#00FF87]/20 text-[#00FF87] text-xs font-bold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>DEWAN PELATIH & MASTER FACULTY</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
            DIPIMPIN PELATIH LISENSI <span className="text-neon-gradient">UEFA & AFC RESMI</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300">
            Kombinasi mantan pemain profesional, pelatih berlisensi tertinggi di Asia dan Eropa, serta tim dokter spesialis olahraga berdedikasi.
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coaches.map((coach) => (
            <div 
              key={coach.id}
              className="group rounded-3xl bg-[#0D1510] border border-white/10 hover:border-[#00FF87]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-2 shadow-xl"
            >
              
              {/* Photo & License Badge */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={coach.photo} 
                  alt={coach.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1510] via-transparent to-black/30"></div>

                {/* License Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#00FF87] border border-[#00FF87]/40">
                    {coach.license}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-display font-black text-lg text-white group-hover:text-[#00FF87] transition-colors">
                    {coach.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#00FF87] mt-0.5">{coach.role}</p>
                  <p className="text-[11px] text-gray-400 mt-2 italic border-l-2 border-white/10 pl-2">
                    {coach.experience}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Fokus Keahlian:</span>
                  <p className="text-xs text-gray-300 leading-snug">
                    {coach.specialty}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
