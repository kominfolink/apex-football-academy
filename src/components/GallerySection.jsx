import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Image as ImageIcon, Sparkles, ZoomIn, Calendar, X } from 'lucide-react';

export const GallerySection = () => {
  const { gallery } = useAcademy();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['ALL', 'Training Drills', 'Trophy & Match', 'Goalkeeper', 'Scouting', 'Grassroots', 'Facilities'];

  const filteredGallery = activeCategory === 'ALL'
    ? gallery
    : gallery.filter(g => g.category === activeCategory);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-[#070B09]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF87]/10 border border-[#00FF87]/20 text-[#00FF87] text-xs font-bold uppercase tracking-widest">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>DOKUMENTASI & MOMEN JUARA</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
            GALERI AKSI <span className="text-neon-gradient">& PRESTASI SISWA</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300">
            Kumpulan momen latihan intensif, turnamen resmi, scouting showcase, hingga perayaan juara siswa-siswi Apex Football Academy.
          </p>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#00FF87] text-black font-bold shadow-md shadow-[#00FF87]/20'
                    : 'bg-[#0D1510] text-gray-300 hover:text-white border border-white/5'
                }`}
              >
                {cat === 'ALL' ? 'Semua Galeri' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#0D1510] border border-white/10 hover:border-[#00FF87]/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B09] via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>

                {/* Category Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#00FF87] border border-[#00FF87]/30">
                    {item.category}
                  </span>
                </div>

                {/* Hover Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-[#00FF87] text-black flex items-center justify-center shadow-lg shadow-black/80 transform scale-75 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>

                {/* Bottom Caption & Date */}
                <div className="absolute bottom-3 left-3 right-3 space-y-1">
                  <h4 className="font-display font-bold text-sm text-white group-hover:text-[#00FF87] transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-gray-400">
                    <p className="line-clamp-1">{item.caption}</p>
                    <span className="text-[10px] text-gray-400 shrink-0 ml-2">{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#0D1510] border border-[#00FF87]/30 rounded-2xl overflow-hidden shadow-2xl cursor-default"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070B09]">
              <div>
                <h3 className="font-display font-bold text-white text-base">{selectedImage.title}</h3>
                <p className="text-xs text-[#00FF87]">{selectedImage.category} • {selectedImage.date}</p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-black flex items-center justify-center max-h-[70vh] overflow-hidden">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[65vh] w-auto object-contain rounded-lg"
              />
            </div>

            <div className="p-4 bg-[#0D1510] text-xs text-gray-300">
              <p>{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
