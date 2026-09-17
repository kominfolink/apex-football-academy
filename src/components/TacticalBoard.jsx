import React, { useState } from 'react';
import { Trophy, Play, RotateCcw, Shield, Zap, Sparkles, Layers, Info } from 'lucide-react';

export const TacticalBoard = () => {
  const [activeFormation, setActiveFormation] = useState('4-3-3');
  const [isPlayingDrill, setIsPlayingDrill] = useState(false);

  const tacticsData = {
    '4-3-3': {
      title: '4-3-3 Total Pressing & Positional Play',
      philosophy: 'Metodologi penguasaan bola progresif standar Ajax Amsterdam & Barcelona Youth Academy.',
      phasePoints: [
        'Overload sisi lapangan (Overloading Half-Spaces) untuk memancing lawan.',
        'High Pressing 5 detik setelah kehilangan bola (Gegenpressing trigger).',
        'Inverted Winger menusuk ke kotak penalti saat Striker menarik bek tengah.'
      ],
      players: [
        { num: 1, pos: 'GK', x: 50, y: 90, role: 'Sweeper Keeper' },
        { num: 2, pos: 'RB', x: 85, y: 70, role: 'Attacking Fullback' },
        { num: 4, pos: 'CB', x: 65, y: 75, role: 'Ball Playing CB' },
        { num: 5, pos: 'CB', x: 35, y: 75, role: 'Stopper CB' },
        { num: 3, pos: 'LB', x: 15, y: 70, role: 'Inverted Wingback' },
        { num: 6, pos: 'DM', x: 50, y: 55, role: 'Deep-Lying Anchor' },
        { num: 8, pos: 'CM', x: 30, y: 42, role: 'Box-to-Box Playmaker' },
        { num: 10, pos: 'AM', x: 70, y: 42, role: 'Advanced Free 10' },
        { num: 7, pos: 'RW', x: 85, y: 22, role: 'Inverted Winger' },
        { num: 9, pos: 'ST', x: 50, y: 16, role: 'Complete Forward' },
        { num: 11, pos: 'LW', x: 15, y: 22, role: 'Inside Forward' }
      ]
    },
    '4-2-3-1': {
      title: '4-2-3-1 High Transition Counter Attack',
      philosophy: 'Stabilitas lini tengah dengan double pivot dan kecepatan transisi cepat menuju sepertiga akhir.',
      phasePoints: [
        'Double pivot (DM 6 & 8) bertindak sebagai tameng pertahanan dan filter serangan balik.',
        'Playmaker No. 10 memiliki kebebasan membaca ruang di antara lini tengah dan bek lawan.',
        'Target man No. 9 melakukan link-up play untuk second runner.'
      ],
      players: [
        { num: 1, pos: 'GK', x: 50, y: 90, role: 'Shot Stopper' },
        { num: 2, pos: 'RB', x: 85, y: 72, role: 'Support FB' },
        { num: 4, pos: 'CB', x: 65, y: 77, role: 'Covering CB' },
        { num: 5, pos: 'CB', x: 35, y: 77, role: 'Marking CB' },
        { num: 3, pos: 'LB', x: 15, y: 72, role: 'Support FB' },
        { num: 6, pos: 'DM', x: 38, y: 58, role: 'Ball Winner' },
        { num: 8, pos: 'DM', x: 62, y: 58, role: 'Deep Playmaker' },
        { num: 10, pos: 'CAM', x: 50, y: 38, role: 'Central Creator' },
        { num: 7, pos: 'RM', x: 82, y: 32, role: 'Wide Speedster' },
        { num: 9, pos: 'ST', x: 50, y: 16, role: 'Target Man' },
        { num: 11, pos: 'LM', x: 18, y: 32, role: 'Wide Creator' }
      ]
    },
    '3-5-2': {
      title: '3-5-2 Dynamic Wing Overload & Dual Striker',
      philosophy: 'Penguasaan area tengah lapangan dengan 3 bek tengah kokoh dan dua ujung tombak saling melengkapi.',
      phasePoints: [
        'Wingback No. 2 & 3 bertugas menjaga lebar lapangan dan mengirimkan umpan silang akurat.',
        'Kemitraan dua penyerang (No. 9 & 10) melakukan pergerakan silang membingungkan bek.',
        'Tiga bek tengah memudahkan sirkulasi build-up bola dari bawah dengan superioritas numerik.'
      ],
      players: [
        { num: 1, pos: 'GK', x: 50, y: 90, role: 'Commanding GK' },
        { num: 4, pos: 'RCB', x: 72, y: 75, role: 'Wide Centerback' },
        { num: 5, pos: 'CB', x: 50, y: 78, role: 'Libero / Sweeper' },
        { num: 6, pos: 'LCB', x: 28, y: 75, role: 'Wide Centerback' },
        { num: 2, pos: 'RWB', x: 88, y: 48, role: 'High Wingback' },
        { num: 8, pos: 'CM', x: 65, y: 52, role: 'Mezzala' },
        { num: 14, pos: 'DM', x: 50, y: 60, role: 'Regista' },
        { num: 16, pos: 'CM', x: 35, y: 52, role: 'Carrilero' },
        { num: 3, pos: 'LWB', x: 12, y: 48, role: 'High Wingback' },
        { num: 9, pos: 'ST', x: 38, y: 20, role: 'Poacher' },
        { num: 10, pos: 'ST', x: 62, y: 20, role: 'Second Striker' }
      ]
    }
  };

  const currentTactic = tacticsData[activeFormation];

  const handleSimulate = () => {
    setIsPlayingDrill(true);
    setTimeout(() => {
      setIsPlayingDrill(false);
    }, 4000);
  };

  return (
    <section id="tactical-board" className="py-24 relative overflow-hidden bg-[#070B09]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF87]/10 border border-[#00FF87]/20 text-[#00FF87] text-xs font-bold uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            <span>INTERACTIVE TACTICAL LAB</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
            PAPAN TAKTIK & <span className="text-neon-gradient">ANALISIS PERIODISASI</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300">
            Setiap siswa di Apex Academy diajarkan memahami filosofi permainan modern, rotasi spasial, dan pengambilan keputusan cepat di lapangan.
          </p>

          {/* Formation Selectors */}
          <div className="flex items-center justify-center gap-3 pt-4">
            {Object.keys(tacticsData).map((formKey) => (
              <button
                key={formKey}
                onClick={() => setActiveFormation(formKey)}
                className={`px-5 py-2.5 rounded-xl font-display font-black text-xs uppercase tracking-wider transition-all ${
                  activeFormation === formKey
                    ? 'bg-[#00FF87] text-black shadow-lg shadow-[#00FF87]/30 scale-105'
                    : 'bg-[#0D1510] text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                Formasi {formKey}
              </button>
            ))}
          </div>
        </div>

        {/* Tactical Canvas & Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 2D Pitch Interactive Simulator */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-[3/4] rounded-3xl p-4 bg-[#0D1510] border-2 border-[#00FF87]/30 shadow-2xl shadow-[#00FF87]/10 flex flex-col justify-between overflow-hidden">
              
              {/* Pitch Grass Surface */}
              <div className="relative w-full h-full soccer-field rounded-2xl p-4 flex flex-col justify-between">
                
                {/* Field Lines Layer */}
                <div className="soccer-field-lines">
                  {/* Outer border */}
                  <div className="absolute inset-2 border-2 border-white/30 rounded-lg"></div>
                  {/* Halfway line */}
                  <div className="absolute top-1/2 left-2 right-2 h-px bg-white/30 -translate-y-1/2"></div>
                  {/* Center circle */}
                  <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/50 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                  {/* Penalty Box Top */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-44 h-24 border-2 border-t-0 border-white/30"></div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-8 border-2 border-t-0 border-white/30"></div>
                  {/* Penalty Box Bottom */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-44 h-24 border-2 border-b-0 border-white/30"></div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-8 border-2 border-b-0 border-white/30"></div>
                  {/* Corner Arcs */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-b-2 border-r-2 border-white/30 rounded-br-full"></div>
                  <div className="absolute top-2 right-2 w-6 h-6 border-b-2 border-l-2 border-white/30 rounded-bl-full"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-t-2 border-r-2 border-white/30 rounded-tr-full"></div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-t-2 border-l-2 border-white/30 rounded-tl-full"></div>
                </div>

                {/* Animated Ball when Simulating */}
                <div 
                  className={`absolute w-5 h-5 rounded-full bg-white shadow-lg shadow-white/80 z-30 transition-all duration-1000 flex items-center justify-center border border-black ${
                    isPlayingDrill ? 'top-1/4 left-1/2 -translate-x-1/2 scale-125' : 'bottom-1/3 left-1/2 -translate-x-1/2'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-black/40"></div>
                </div>

                {/* Tactical Players Plotted */}
                {currentTactic.players.map((p) => (
                  <div
                    key={p.num}
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer transition-all duration-700 ${
                      isPlayingDrill ? 'animate-bounce' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF87] to-[#059669] text-black font-display font-black text-xs flex items-center justify-center border-2 border-white shadow-lg shadow-black/80 group-hover:scale-125 group-hover:bg-[#FFD700] transition-transform">
                      {p.num}
                    </div>
                    {/* Tooltip on Hover */}
                    <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 text-white text-[10px] px-2 py-0.5 rounded border border-white/20 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-40">
                      <p className="font-bold text-[#00FF87]">{p.pos} ({p.role})</p>
                    </div>
                  </div>
                ))}

              </div>

              {/* Pitch Controls Footer */}
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-[11px] text-gray-400 font-semibold">
                  Taktik: <strong className="text-white">{currentTactic.title}</strong>
                </span>
                <button
                  onClick={handleSimulate}
                  disabled={isPlayingDrill}
                  className="px-3.5 py-1.5 rounded-lg bg-[#00FF87] hover:bg-[#00FF87]/80 text-black font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  {isPlayingDrill ? <RotateCcw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-black" />}
                  <span>{isPlayingDrill ? 'Simulasi Berjalan...' : 'Simulasi Drill'}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Right: Tactical Points & Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-6 border border-[#00FF87]/20 space-y-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#00FF87]" />
                <h3 className="font-display font-black text-xl text-white uppercase">{currentTactic.title}</h3>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed italic border-l-2 border-[#00FF87] pl-3">
                "{currentTactic.philosophy}"
              </p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#FFD700]" />
                  <span>3 Kunci Pelatihan Taktik Ini:</span>
                </h4>

                {currentTactic.phasePoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-[#00FF87]/15 text-[#00FF87] font-bold text-[11px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-[#00FF87]/5 border border-[#00FF87]/20 flex items-center gap-3 text-xs text-gray-300">
                <Info className="w-4 h-4 text-[#00FF87] shrink-0" />
                <span>Semua sesi latihan direkam menggunakan kamera analitik drone untuk review taktikal mingguan.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
