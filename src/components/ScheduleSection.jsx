import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Calendar, Clock, MapPin, User, Download, CheckCircle2 } from 'lucide-react';

export const ScheduleSection = () => {
  const { schedules } = useAcademy();
  const [selectedDay, setSelectedDay] = useState('ALL');

  const days = ['ALL', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  const filteredSchedules = selectedDay === 'ALL'
    ? schedules
    : schedules.filter(s => s.day === selectedDay);

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <section id="schedules" className="py-24 relative overflow-hidden pitch-lines-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF87]/10 border border-[#00FF87]/20 text-[#00FF87] text-xs font-bold uppercase tracking-widest">
              <Calendar className="w-3.5 h-3.5" />
              <span>TIMETABLE LATIHAN RESMI</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
              JADWAL LATIHAN <span className="text-neon-gradient">MINGGUAN</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
              Sesi latihan terstruktur rapi untuk menjaga keseimbangan antara performa sepak bola dan pendidikan akademis siswa.
            </p>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-[#0D1510] hover:bg-[#121C16] border border-[#00FF87]/30 text-white font-medium text-xs flex items-center gap-2 transition-all hover:border-[#00FF87]"
          >
            <Download className="w-4 h-4 text-[#00FF87]" />
            <span>Unduh / Cetak Jadwal</span>
          </button>
        </div>

        {/* Day Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {days.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelectedDay(d)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedDay === d
                  ? 'bg-[#00FF87] text-black font-bold shadow-md shadow-[#00FF87]/20'
                  : 'bg-[#0D1510] text-gray-300 hover:text-white border border-white/5'
              }`}
            >
              {d === 'ALL' ? 'Semua Hari' : d}
            </button>
          ))}
        </div>

        {/* Schedule Table / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSchedules.map((item, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-[#0D1510]/80 border border-white/10 hover:border-[#00FF87]/40 transition-all hover:-translate-y-1 space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg bg-[#00FF87]/15 text-[#00FF87] font-display font-black text-xs uppercase tracking-wider">
                  {item.day}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-gray-300 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#00FF87]" />
                  <span>{item.time}</span>
                </div>
              </div>

              <div>
                <h4 className="font-display font-bold text-base text-white group-hover:text-[#00FF87] transition-colors">
                  {item.group}
                </h4>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span>{item.pitch}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span>{item.coach}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
