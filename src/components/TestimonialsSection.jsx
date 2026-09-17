import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Star, Quote, Trophy, Sparkles } from 'lucide-react';

export const TestimonialsSection = () => {
  const { testimonials } = useAcademy();

  return (
    <section className="py-24 relative overflow-hidden pitch-lines-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF87]/10 border border-[#00FF87]/20 text-[#00FF87] text-xs font-bold uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5" />
            <span>KATA MEREKA TENTANG APEX</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
            TESTIMONI ORANG TUA <span className="text-neon-gradient">& ALUMNI SUKSES</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300">
            Kisah nyata perkembangan karakter, kedisiplinan, serta lonjakan kemampuan teknis para siswa akademi.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div 
              key={item.id}
              className="p-8 rounded-3xl bg-[#0D1510]/90 border border-white/10 hover:border-[#00FF87]/40 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl relative group hover:-translate-y-1"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5 group-hover:text-[#00FF87]/10 transition-colors pointer-events-none" />

              <div className="space-y-4">
                {/* Stars */}
                <div className="flex items-center gap-1 text-[#FFD700]">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFD700]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-white/5">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-[#00FF87]/30"
                />
                <div>
                  <h4 className="font-display font-bold text-sm text-white">{item.name}</h4>
                  <p className="text-[11px] text-[#00FF87]">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
