import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { 
  Trophy, 
  Check, 
  Sparkles, 
  Users, 
  Clock, 
  ArrowRight, 
  ShieldAlert,
  Zap,
  Flame,
  Star
} from 'lucide-react';

export const ProgramsSection = () => {
  const { programs, openRegistration } = useAcademy();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [billingCycle, setBillingCycle] = useState('MONTHLY'); // 'MONTHLY' | 'SEMESTER'

  const categories = ['ALL', 'Grassroots', 'Youth Development', 'High Performance', 'Specialty Clinic', 'Private Mentoring'];

  const filteredPrograms = selectedCategory === 'ALL' 
    ? programs 
    : programs.filter(p => p.category === selectedCategory);

  const formatIDR = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="programs" className="py-24 relative overflow-hidden pitch-lines-bg">
      
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#00FF87]/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF87]/10 border border-[#00FF87]/20 text-[#00FF87] text-xs font-bold uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5" />
            <span>KURIKULUM PEMBINAAN RESMI</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
            PROGRAM PELATIHAN <span className="text-neon-gradient">BERSTANDAR UEFA / AFC</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300">
            Pilih jalur pembinaan sepak bola yang dirancang secara spesifik berdasarkan fase usia, perkembangan motorik, pemahaman taktik, dan persiapan karier profesional.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-semibold ${billingCycle === 'MONTHLY' ? 'text-[#00FF87]' : 'text-gray-400'}`}>
              Biaya Bulanan (SPP)
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'MONTHLY' ? 'SEMESTER' : 'MONTHLY')}
              className="w-14 h-7 rounded-full bg-[#121C16] border border-[#00FF87]/40 p-1 relative transition-all"
            >
              <div className={`w-5 h-5 rounded-full bg-[#00FF87] transition-all transform ${billingCycle === 'SEMESTER' ? 'translate-x-7 bg-[#FFD700]' : 'translate-x-0'}`}></div>
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-semibold ${billingCycle === 'SEMESTER' ? 'text-[#FFD700]' : 'text-gray-400'}`}>
                Paket 1 Semester (6 Bulan)
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#FFD700]/20 text-[#FFD700] text-[10px] font-bold border border-[#FFD700]/30">
                HEMAT 15%
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#00FF87] text-black shadow-lg shadow-[#00FF87]/20 font-bold'
                    : 'bg-[#0D1510] text-gray-300 hover:text-white border border-white/5 hover:border-white/20'
                }`}
              >
                {cat === 'ALL' ? 'Semua Kategori' : cat}
              </button>
            ))}
          </div>

        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((prog) => {
            const price = billingCycle === 'MONTHLY' ? prog.monthlyFee : prog.semesterFee;
            const quotaPercent = Math.round((prog.enrolled / prog.quota) * 100);

            return (
              <div 
                key={prog.id}
                className="group relative rounded-3xl bg-[#0D1510]/90 border border-white/10 hover:border-[#00FF87]/50 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden shadow-xl"
              >
                
                {/* Top Image & Badge */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={prog.image} 
                    alt={prog.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1510] via-transparent to-black/40"></div>

                  {/* Program Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#00FF87] text-black shadow-md shadow-black/50">
                      {prog.badge}
                    </span>
                  </div>

                  {/* Age Range Tag */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-white text-xs font-bold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#00FF87]" />
                    <span>{prog.ageRange}</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  
                  <div className="space-y-3">
                    <h3 className="font-display font-black text-xl text-white group-hover:text-[#00FF87] transition-colors leading-snug">
                      {prog.name}
                    </h3>
                    
                    <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                      {prog.description}
                    </p>

                    {/* Schedule info pill */}
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-gray-300">
                      <Clock className="w-4 h-4 text-[#00FF87] shrink-0" />
                      <span>{prog.scheduleSummary}</span>
                    </div>

                    {/* Quota Progress Bar */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-gray-400 font-medium">Kuota Batch Ini:</span>
                        <span className="font-bold text-[#00FF87]">{prog.enrolled} / {prog.quota} Siswa ({quotaPercent}%)</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-[#00FF87] to-[#10B981]" 
                          style={{ width: `${quotaPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-2 border-t border-white/5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Fasilitas & Manfaat:</span>
                    {prog.features.slice(0, 4).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <div className="w-4 h-4 rounded-full bg-[#00FF87]/15 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#00FF87]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Box & CTA */}
                  <div className="pt-4 border-t border-white/10 space-y-4">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Investasi Pelatihan</span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display font-black text-2xl text-white">
                            {formatIDR(price)}
                          </span>
                          <span className="text-xs text-gray-400 font-normal">
                            / {billingCycle === 'MONTHLY' ? 'Bulan' : '6 Bulan'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 block">Kit & Reg:</span>
                        <span className="text-xs font-semibold text-gray-200">{formatIDR(prog.registrationFee)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => openRegistration(prog)}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00FF87] to-[#10B981] text-black font-display font-bold text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-[#00FF87]/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Pilih & Daftar Program</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
