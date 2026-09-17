import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { ShieldCheck, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

export const FacilitiesSection = () => {
  const { facilities } = useAcademy();

  return (
    <section id="facilities" className="py-24 relative overflow-hidden pitch-lines-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF87]/10 border border-[#00FF87]/20 text-[#00FF87] text-xs font-bold uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" />
            <span>FASILITAS STANDAR INTERNASIONAL</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
            HIGH PERFORMANCE <span className="text-neon-gradient">COMPLEX & LAB</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300">
            Infrastruktur modern yang dibangun secara terintegrasi untuk mendukung pembinaan fisik, taktikal, dan pemulihan medis atlet usia dini hingga profesional.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {facilities.map((fac) => (
            <div 
              key={fac.id}
              className="group rounded-3xl bg-[#0D1510] border border-white/10 hover:border-[#00FF87]/50 transition-all duration-300 overflow-hidden flex flex-col md:flex-row shadow-xl hover:-translate-y-1"
            >
              <div className="md:w-1/2 h-56 md:h-auto relative overflow-hidden shrink-0">
                <img 
                  src={fac.image} 
                  alt={fac.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#00FF87] border border-[#00FF87]/40">
                    {fac.category}
                  </span>
                </div>
              </div>

              <div className="p-6 md:w-1/2 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-display font-black text-xl text-white group-hover:text-[#00FF87] transition-colors leading-snug">
                    {fac.name}
                  </h3>
                  <p className="text-xs text-gray-300 mt-2.5 leading-relaxed">
                    {fac.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-xs text-[#00FF87] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#00FF87]" />
                  <span>Sertifikasi Standar FIFA / AFC</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
