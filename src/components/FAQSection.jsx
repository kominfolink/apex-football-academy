import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle } from 'lucide-react';

export const FAQSection = () => {
  const { faqs, siteSettings } = useAcademy();
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-[#070B09]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF87]/10 border border-[#00FF87]/20 text-[#00FF87] text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
            PERTANYAAN <span className="text-neon-gradient">UMUM & INFORMASI</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300">
            Hal-hal yang sering ditanyakan mengenai sistem pendaftaran, kurikulum, fasilitas, dan pembayaran.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-[#0D1510] border-[#00FF87]/40 shadow-lg shadow-[#00FF87]/5' 
                    : 'bg-[#0D1510]/60 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-display font-bold text-sm sm:text-base text-white">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                    isOpen ? 'bg-[#00FF87] text-black' : 'bg-white/5 text-gray-400'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#0D1510] to-[#121C16] border border-[#00FF87]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-display font-bold text-base text-white">Masih ada pertanyaan lain?</h4>
            <p className="text-xs text-gray-400">Tim representatif kami siap membantu konsultasi program yang tepat.</p>
          </div>
          <a
            href={`https://wa.me/${siteSettings.whatsapp.replace(/\D/g, '')}?text=Halo%20Admin%20Apex%20Academy,%20saya%20ingin%20tanya%20seputar%20pendaftaran.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-[#00FF87] hover:bg-[#00FF87]/90 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 shadow-lg shadow-[#00FF87]/20"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat WhatsApp Admin</span>
          </a>
        </div>

      </div>
    </section>
  );
};
