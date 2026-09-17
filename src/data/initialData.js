export const initialData = {
  hero: {
    badge: "PENDAFTARAN MUSIM 2026/2027 TELAH DIBUKA",
    headline: "MEMBENTUK BINTANG SEPAK BOLA MASA DEPAN",
    subheadline: "Akademi sepak bola nomor satu dengan kurikulum standar internasional UEFA & AFC. Fasilitas kelas dunia, sport science lab, dan jalur beasiswa profesional ke Liga 1 & luar negeri.",
    primaryCta: "Daftar Siswa Baru",
    secondaryCta: "Jadwalkan Free Trial",
    bannerImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1600&auto=format&fit=crop",
    videoHighlightUrl: "https://assets.mixkit.co/videos/preview/mixkit-boys-playing-football-match-in-a-stadium-41440-large.mp4",
    stats: [
      { label: "Siswa Aktif", value: "540+", suffix: "Talenta" },
      { label: "Pelatih Lisensi", value: "18", suffix: "UEFA / AFC" },
      { label: "Lapangan Standar FIFA", value: "8", suffix: "Pitches" },
      { label: "Lolos Pro Pathway", value: "94%", suffix: "Scouted" }
    ]
  },

  siteSettings: {
    academyName: "Apex Football Academy",
    tagline: "Elite Youth Football Development & High Performance Training Center",
    phone: "+62 812-8888-2026",
    whatsapp: "+6281288882026",
    email: "admissions@apexfootball.academy",
    address: "Apex High Performance Complex, Jl. Stadion Gelora No. 88, Jakarta Selatan",
    operatingHours: "Selasa - Minggu: 07.00 - 20.30 WIB",
    currency: "IDR",
    bankAccounts: [
      { bank: "BCA", accountName: "PT APEX FOOTBALL INDONESIA", accountNumber: "8830-1928-2026" },
      { bank: "Mandiri", accountName: "PT APEX FOOTBALL INDONESIA", accountNumber: "137-00-2026-8888" },
      { bank: "BRI", accountName: "PT APEX FOOTBALL INDONESIA", accountNumber: "0421-01-002026-501" }
    ],
    qrisUrl: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=00020101021226580014ID.LINKAJA.WWW01189360091100202688880215APEXFOOTBALL0303UMI51440014ID.CO.QRIS.WWW0215ID10202688888885204581253033605802ID5922APEX FOOTBALL ACADEMY6007JAKARTA61051219062070703A016304D1A8",
    promoCodes: {
      "APEXPRO2026": { discountPercent: 15, desc: "Diskon 15% Early Bird Musim Baru" },
      "GARUDA10": { discountPercent: 10, desc: "Diskon 10% Spesial Siswa Rekomendasi" },
      "TRIALFREE": { discountPercent: 100, desc: "Free Trial Pass 100% Bebas Biaya Pendaftaran" }
    },
    seo: {
      metaTitle: "Apex Football Academy — Akademi Sepak Bola Profesional & High Performance Center",
      metaDescription: "Akademi sepak bola nomor 1 kurikulum UEFA & AFC. Usia 6-18 tahun, fasilitas FIFA, video analysis, & jalur beasiswa pro.",
      metaKeywords: "sekolah sepak bola, akademi bola jakarta, ssb terbaik indonesia, apex football, latihan bola anak, pro pathway uefa",
      ogImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop"
    }
  },

  programs: [
    {
      id: "prog-grassroots",
      name: "Grassroots Foundation (U-8 & U-10)",
      category: "Grassroots",
      ageRange: "6 - 10 Tahun",
      monthlyFee: 1250000,
      semesterFee: 6500000,
      registrationFee: 450000,
      quota: 40,
      enrolled: 34,
      badge: "POPULER USIA DINI",
      color: "from-emerald-500 to-teal-700",
      description: "Fokus pada penguasaan bola fundamental (ball mastery), koordinasi motorik, kelincahan, dan penanaman rasa percaya diri dalam bermain secara gembira.",
      features: [
        "3x Latihan / Minggu (60 Menit)",
        "Rasio Pelatih : Siswa = 1 : 8 (Intensif)",
        "Official Training Kit (2 Jersey + Kaos Kaki)",
        "Fun Match Internal Tiap Akhir Bulan",
        "Rapor Perkembangan Motorik Berkala"
      ],
      image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800&auto=format&fit=crop",
      scheduleSummary: "Selasa, Kamis, Sabtu (15.30 - 17.00 WIB)"
    },
    {
      id: "prog-youth-dev",
      name: "Youth Development Academy (U-12 & U-14)",
      category: "Youth Development",
      ageRange: "11 - 14 Tahun",
      monthlyFee: 1650000,
      semesterFee: 8800000,
      registrationFee: 500000,
      quota: 35,
      enrolled: 31,
      badge: "KOMPETISI RESMI",
      color: "from-blue-600 to-indigo-800",
      description: "Pengembangan Tactical IQ, pemahaman posisi, passing tempo, transition play, dan persiapan mental tanding liga usia muda bergengsi.",
      features: [
        "4x Latihan / Minggu (90 Menit)",
        "Analisis Video Taktikal & GPS Tracker Session",
        "Keikutsertaan Liga Resmi Piala PSSI / Soeratin",
        "Nutrisi & Konsultasi Fisioterapi Olahraga",
        "Official Match & Training Kit Full Set"
      ],
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop",
      scheduleSummary: "Senin, Rabu, Jumat, Sabtu (16.00 - 18.00 WIB)"
    },
    {
      id: "prog-pro-pathway",
      name: "Elite Pro Pathway (U-16 & U-18)",
      category: "High Performance",
      ageRange: "15 - 18 Tahun",
      monthlyFee: 2250000,
      semesterFee: 12000000,
      registrationFee: 750000,
      quota: 25,
      enrolled: 22,
      badge: "SCOUTING & PRO CONTRACT",
      color: "from-amber-500 to-red-700",
      description: "Program intensif atlet berprospek tinggi menuju karier profesional. Dilengkapi program gym sport science, uji coba klub Liga 1, dan showcase internasional.",
      features: [
        "5x Latihan / Minggu + 1x Match Day",
        "Program Gym & Strength Conditioning Spesifik",
        "Kamera Taktik AI & Player Data Tracking",
        "Uji Tanding dengan Akademi Tim Liga 1 & EPA",
        "Pendampingan Agen Lisensi FIFA & Beasiswa Atlet"
      ],
      image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=800&auto=format&fit=crop",
      scheduleSummary: "Senin s/d Jumat (06.30 - 08.30 & 16.00 - 18.00 WIB)"
    },
    {
      id: "prog-gk-clinic",
      name: "Goalkeeper Specialty Masterclass",
      category: "Specialty Clinic",
      ageRange: "8 - 18 Tahun",
      monthlyFee: 1450000,
      semesterFee: 7800000,
      registrationFee: 450000,
      quota: 15,
      enrolled: 12,
      badge: "SPESIALIS KIPER",
      color: "from-purple-600 to-fuchsia-900",
      description: "Kurikulum komprehensif penjaga gawang modern: shot stopping, reaksi refleks, duel 1-lawan-1, antisipasi umpan silang, dan distribusi modern sweeping keeper.",
      features: [
        "3x Sesi Khusus Kiper + 1x Sesi Match Integrasi",
        "Pelatih Berlisensi Kiper AFC GK Level 2",
        "Drill Mesin Pelontar Bola & Reaction Lights",
        "Kit Sarung Tangan Pro & Padded Jersey",
        "Analisis Video Diving & Footwork Mechanics"
      ],
      image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?q=80&w=800&auto=format&fit=crop",
      scheduleSummary: "Rabu, Jumat, Minggu (15.30 - 17.30 WIB)"
    },
    {
      id: "prog-private-1on1",
      name: "1-on-1 Individual Elite Masterclass",
      category: "Private Mentoring",
      ageRange: "Semua Usia",
      monthlyFee: 3500000,
      semesterFee: 19000000,
      registrationFee: 500000,
      quota: 10,
      enrolled: 8,
      badge: "PRIVATE EXCLUSIVE",
      color: "from-zinc-700 to-black",
      description: "Pendampingan privat personal langsung oleh Head Coach untuk koreksi teknik spesifik, akurasi shooting, dribbling speed, serta mentalitas bertanding.",
      features: [
        "8 Sesi Private Exclusive per Bulan",
        "Waktu & Lapangan Fleksibel Sesuai Jadwal Siswa",
        "1 Pelatih Berlisensi UEFA A Khusus 1 Siswa",
        "Laporan Biomekanik Gerakan & Kecepatan",
        "Free Konsultasi Nutrisi & Pemulihan Atlet"
      ],
      image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800&auto=format&fit=crop",
      scheduleSummary: "Jadwal Fleksibel (By Appointment)"
    }
  ],

  coaches: [
    {
      id: "coach-1",
      name: "Coach Fernando Rossi",
      role: "Technical Director & Head Coach",
      license: "UEFA Pro License (Italia)",
      experience: "Ex-Atalanta Youth Academy & Timnas U-19",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
      specialty: "Modern Tactical Periodization, Positional Play, Scouting Pipeline"
    },
    {
      id: "coach-2",
      name: "Coach Bagus Prasetyo, S.Or",
      role: "Head of Youth Development (U-12 - U-16)",
      license: "AFC 'A' Coaching License",
      experience: "12 Tahun Pelatih Tim Liga 1 & Juara Piala Soeratin",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      specialty: "High Pressing Drills, Transition Speed, Mental Conditioning"
    },
    {
      id: "coach-3",
      name: "Coach Bramantyo Hendra",
      role: "Head Goalkeeping Specialist",
      license: "AFC GK Level 2 & AFC 'B'",
      experience: "Mantan Kiper Timnas & Pelatih Kiper Klub Pro",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
      specialty: "Reflex Drills, Modern Sweeper Keeper, Penalty Psychology"
    },
    {
      id: "coach-4",
      name: "dr. Claudia Sinta, Sp.KO",
      role: "Head of Sport Science & Medical Performance",
      license: "Sports Physician & FIFA Diploma in Football Medicine",
      experience: "Konsultan Nutrisi & Fisioterapi Atlet Nasional",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
      specialty: "Injury Prevention, Biomechanics, VO2 Max Conditioning, Nutrition"
    }
  ],

  facilities: [
    {
      id: "fac-1",
      name: "FIFA Quality Pro Hybrid Turf Pitch",
      category: "Lapangan Utama",
      image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=800&auto=format&fit=crop",
      description: "Lapangan berstandar sertifikasi FIFA dengan sistem drainase bawah tanah otomatis dan pencahayaan lampu floodlight LED 1200 Lux."
    },
    {
      id: "fac-2",
      name: "High-Performance Gym & Conditioning Center",
      category: "Pusat Kebugaran",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      description: "Dilengkapi peralatan beban fungsional, sensor akselerasi, laser agility gates, dan platform plyometric khusus sepak bola."
    },
    {
      id: "fac-3",
      name: "Tactical Video Theater & Analytics Lab",
      category: "Ruang Taktik AI",
      image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=800&auto=format&fit=crop",
      description: "Ruang teater interaktif berteknologi drone camera dan software analisis taktik untuk bedah pertandingan setiap pekan."
    },
    {
      id: "fac-4",
      name: "Hydrotherapy & Recovery Cryo Zone",
      category: "Pemulihan Medis",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
      description: "Kolam air es (ice bath), jacuzzi terapi, dan ruang fisioterapi aktif untuk memastikan pemulihan otot maksimal setelah sesi latihan."
    }
  ],

  gallery: [
    {
      id: "gal-1",
      title: "Sesi Latihan Passing Kombinasi U-14",
      category: "Training Drills",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop",
      date: "September 2026",
      caption: "Latihan intensitas tinggi melatih visi bermain dan kecepatan bola satu sentuhan."
    },
    {
      id: "gal-2",
      title: "Kemenangan Final Liga Remaja Nasional",
      category: "Trophy & Match",
      image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=800&auto=format&fit=crop",
      date: "Agustus 2026",
      caption: "Skuad Apex U-16 mengangkat trofi juara setelah menundukkan lawan dengan skor 3-0."
    },
    {
      id: "gal-3",
      title: "Drill Penyelamatan Kiper Reaksi Cepat",
      category: "Goalkeeper",
      image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?q=80&w=800&auto=format&fit=crop",
      date: "September 2026",
      caption: "Latihan diving footwork dan penguasaan area kotak penalti di bawah mistar gawang."
    },
    {
      id: "gal-4",
      title: "Scouting Showcase di Hadapan Tim Liga 1",
      category: "Scouting",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
      date: "Juli 2026",
      caption: "Ajang pemantauan bakat siswa Apex oleh pemandu bakat resmi klub profesional."
    },
    {
      id: "gal-5",
      title: "Kegembiraan Latihan Grassroots U-8",
      category: "Grassroots",
      image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800&auto=format&fit=crop",
      date: "Agustus 2026",
      caption: "Menumbuhkan cinta terhadap si kulit bundar sejak usia dini dengan teknik yang tepat."
    },
    {
      id: "gal-6",
      title: "Fasilitas Lapangan Malam Hari dengan Lampu Floodlight",
      category: "Facilities",
      image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=800&auto=format&fit=crop",
      date: "September 2026",
      caption: "Suasana stadion latihan malam hari berstandar pencahayaan broadcast HD."
    }
  ],

  schedules: [
    { day: "Senin", time: "16.00 - 18.00 WIB", group: "Youth U-14 & U-16", pitch: "Pitch 1 (Hybrid Turf)", coach: "Coach Fernando & Coach Bagus" },
    { day: "Selasa", time: "15.30 - 17.00 WIB", group: "Grassroots U-8 & U-10", pitch: "Pitch 2 (Mini Turf)", coach: "Coach Bagus & Staff" },
    { day: "Rabu", time: "16.00 - 18.00 WIB", group: "Youth U-12 & GK Clinic", pitch: "Pitch 1 & GK Zone", coach: "Coach Bramantyo & Staff" },
    { day: "Kamis", time: "15.30 - 17.00 WIB", group: "Grassroots U-8 & U-10", pitch: "Pitch 2 (Mini Turf)", coach: "Coach Bagus & Staff" },
    { day: "Jumat", time: "16.00 - 18.00 WIB", group: "Elite Pro Pathway U-18", pitch: "Main Stadium Pitch", coach: "Coach Fernando Rossi" },
    { day: "Sabtu", time: "07.30 - 10.30 WIB", group: "All Academy Match Day", pitch: "All Pitches", coach: "All Coaching Staff" },
    { day: "Minggu", time: "08.00 - 11.00 WIB", group: "Special 1-on-1 & GK Clinic", pitch: "Pitch 1", coach: "Coach Bramantyo & Coach Rossi" }
  ],

  testimonials: [
    {
      id: "test-1",
      name: "Bambang Pamungkas (Orang Tua Siswa)",
      role: "Wali dari Arya Pratama (Siswa U-14)",
      text: "Sejak bergabung di Apex Football Academy 1 tahun lalu, kedisiplinan dan pemahaman taktik anak saya melompat luar biasa. Terbukti sekarang ia terpilih seleksi Timnas Pelajar Indonesia. Program dan pelatihnya benar-benar standar Eropa!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
      rating: 5
    },
    {
      id: "test-2",
      name: "Rizky Fauzan",
      role: "Alumni Apex U-18 (Kini Pemain EPA Liga 1)",
      text: "Latihan di Apex sangat mendetail. Bukan cuma fisik, tapi kami diajarkan membaca ruang, nutrisi profesional, dan mentalitas juara. Fasilitas gym dan video review-nya membuat saya siap 100% menembus level profesional.",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
      rating: 5
    },
    {
      id: "test-3",
      name: "Ibu Maya Dewi",
      role: "Orang Tua dari Kevin (Siswa Grassroots U-8)",
      text: "Coach di kelas Grassroots sangat ramah anak dan sabar, namun kurikulum latihannya sangat berbobot. Anak saya selalu antusias berangkat latihan dan fisiknya jadi jauh lebih aktif dan bugar.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
      rating: 5
    }
  ],

  faqs: [
    {
      q: "Bagaimana cara mendaftar dan berapa biayanya?",
      a: "Pendaftaran dapat dilakukan langsung melalui website ini dengan menekan tombol 'Daftar Siswa Baru'. Anda cukup mengisi data siswa, memilih paket latihan, dan menyelesaikan pembayaran secara instan via QRIS atau Virtual Account bank."
    },
    {
      q: "Apakah ada sesi coba latihan (Free Trial)?",
      a: "Tentu! Kami menyediakan 1 sesi Free Trial dan Skills Assessment gratis. Anda bisa mendaftar dengan mengklik 'Jadwalkan Free Trial' pada banner utama atau menghubungi WhatsApp concierge kami."
    },
    {
      q: "Apa saja perlengkapan yang didapatkan setelah registrasi?",
      a: "Setiap siswa resmi akan mendapatkan 1 paket Official Apex Kit yang terdiri dari 2 pasang jersey latihan berkualitas tinggi, celana, kaos kaki, tas gym akademi, dan ID card digital siswa."
    },
    {
      q: "Apakah anak yang belum pernah bermain bola bisa bergabung?",
      a: "Sangat bisa! Di kelas Grassroots Foundation (U-8 & U-10), kami mengajarkan dari tingkat paling dasar dengan metode yang menyenangkan dan membangun kepercayaan diri anak secara bertahap."
    },
    {
      q: "Bagaimana sistem pembayaran dan perpanjangan SPP bulanan?",
      a: "Pembayaran terintegrasi dengan Payment Gateway instan (QRIS, VA BCA, Mandiri, BRI, BNI, E-Wallet). Invoice otomatis diterbitkan setiap bulan dan bukti pembayaran resmi dapat diunduh langsung."
    },
    {
      q: "Apakah ada jalur beasiswa bagi anak berprestasi?",
      a: "Ya, kami memiliki program 'Apex Young Talents Scholarship' dengan beasiswa hingga 100% biaya pelatihan untuk talenta berbakat yang lolos seleksi tim pemandu bakat kami."
    }
  ],

  initialRegistrations: [
    {
      id: "REG-2026-001",
      studentName: "Muhammad Rayhan Al-Ghifari",
      birthDate: "2012-05-14",
      ageCategory: "U-14",
      position: "Midfielder (Playmaker)",
      preferredFoot: "Kanan",
      parentName: "Hendra Kurniawan",
      parentPhone: "+6281234567890",
      parentEmail: "hendra.kurniawan@gmail.com",
      address: "Jl. Fatmawati Raya No. 45, Cilandak, Jakarta Selatan",
      programId: "prog-youth-dev",
      programName: "Youth Development Academy (U-12 & U-14)",
      paymentPlan: "Monthly",
      jerseySize: "M",
      addOns: ["Kit Match Day Official", "Asuransi Cedera Atlet"],
      totalAmount: 2150000,
      paymentStatus: "PAID",
      paymentMethod: "QRIS Dynamic",
      invoiceId: "INV-2026-0918-001",
      registrationDate: "2026-09-17 14:20",
      status: "Verified & Active",
      notes: "Pengalaman di SSB lokal 2 tahun. Kecepatan dan passing sangat baik."
    },
    {
      id: "REG-2026-002",
      studentName: "Dion Nathaniel Tan",
      birthDate: "2015-11-03",
      ageCategory: "U-10",
      position: "Striker / Forward",
      preferredFoot: "Kiri",
      parentName: "Tan Wijaya",
      parentPhone: "+6281987654321",
      parentEmail: "tan.wijaya@outlook.com",
      address: "Pondok Indah Blok A No. 12, Kebayoran Lama",
      programId: "prog-grassroots",
      programName: "Grassroots Foundation (U-8 & U-10)",
      paymentPlan: "Semester (6 Bulan)",
      jerseySize: "S",
      addOns: ["Kit Match Day Official"],
      totalAmount: 6950000,
      paymentStatus: "PAID",
      paymentMethod: "BCA Virtual Account",
      invoiceId: "INV-2026-0918-002",
      registrationDate: "2026-09-17 16:45",
      status: "Verified & Active",
      notes: "Sangat antusias, fisik prima, kidal dengan tembakan akurat."
    },
    {
      id: "REG-2026-003",
      studentName: "Bagus Satria Pratama",
      birthDate: "2009-08-20",
      ageCategory: "U-18",
      position: "Goalkeeper",
      preferredFoot: "Kanan",
      parentName: "Joko Susilo",
      parentPhone: "+6281311223344",
      parentEmail: "joko.susilo@yahoo.com",
      address: "Jl. Tebet Barat Dalam No. 8, Jakarta Selatan",
      programId: "prog-gk-clinic",
      programName: "Goalkeeper Specialty Masterclass",
      paymentPlan: "Monthly",
      jerseySize: "XL",
      addOns: ["Sarung Tangan Pro Glove", "Video Review Biomekanik"],
      totalAmount: 1900000,
      paymentStatus: "PAID",
      paymentMethod: "Mandiri Virtual Account",
      invoiceId: "INV-2026-0918-003",
      registrationDate: "2026-09-18 08:15",
      status: "Verified & Active",
      notes: "Tinggi badan 182cm, refleks tangkapan bola atas sangat prima."
    },
    {
      id: "REG-2026-004",
      studentName: "Kenzo Alexander",
      birthDate: "2013-03-11",
      ageCategory: "U-12",
      position: "Center Back (Defender)",
      preferredFoot: "Kanan",
      parentName: "David Alexander",
      parentPhone: "+6281700998877",
      parentEmail: "david.alex@corp.com",
      address: "Jl. Kemang Raya No. 102, Jakarta Selatan",
      programId: "prog-youth-dev",
      programName: "Youth Development Academy (U-12 & U-14)",
      paymentPlan: "Monthly",
      jerseySize: "L",
      addOns: ["Kit Match Day Official"],
      totalAmount: 2150000,
      paymentStatus: "PENDING",
      paymentMethod: "QRIS Dynamic",
      invoiceId: "INV-2026-0918-004",
      registrationDate: "2026-09-18 09:30",
      status: "Menunggu Pembayaran",
      notes: "Menunggu konfirmasi pembayaran QRIS."
    }
  ],

  initialInvoices: [
    {
      invoiceId: "INV-2026-0918-001",
      registrationId: "REG-2026-001",
      studentName: "Muhammad Rayhan Al-Ghifari",
      programName: "Youth Development Academy (U-12 & U-14)",
      items: [
        { name: "SPP Bulan Pertama (Youth Development)", price: 1650000 },
        { name: "Biaya Registrasi & Official Kit Pack", price: 500000 }
      ],
      subtotal: 2150000,
      discount: 0,
      total: 2150000,
      paymentMethod: "QRIS Dynamic",
      status: "PAID",
      paidAt: "2026-09-17 14:22 WIB",
      referenceCode: "QRIS-APEX-88301928"
    },
    {
      invoiceId: "INV-2026-0918-002",
      registrationId: "REG-2026-002",
      studentName: "Dion Nathaniel Tan",
      programName: "Grassroots Foundation (U-8 & U-10)",
      items: [
        { name: "Paket 1 Semester (6 Bulan) Grassroots", price: 6500000 },
        { name: "Biaya Registrasi & Official Kit Pack", price: 450000 }
      ],
      subtotal: 6950000,
      discount: 0,
      total: 6950000,
      paymentMethod: "BCA Virtual Account (88301928002)",
      status: "PAID",
      paidAt: "2026-09-17 16:48 WIB",
      referenceCode: "BCA-VA-99018239"
    },
    {
      invoiceId: "INV-2026-0918-003",
      registrationId: "REG-2026-003",
      studentName: "Bagus Satria Pratama",
      programName: "Goalkeeper Specialty Masterclass",
      items: [
        { name: "SPP Bulanan Kiper Masterclass", price: 1450000 },
        { name: "Biaya Registrasi & Official Kit Kiper", price: 450000 }
      ],
      subtotal: 1900000,
      discount: 0,
      total: 1900000,
      paymentMethod: "Mandiri Virtual Account (13700202688)",
      status: "PAID",
      paidAt: "2026-09-18 08:20 WIB",
      referenceCode: "MDR-VA-44120931"
    },
    {
      invoiceId: "INV-2026-0918-004",
      registrationId: "REG-2026-004",
      studentName: "Kenzo Alexander",
      programName: "Youth Development Academy (U-12 & U-14)",
      items: [
        { name: "SPP Bulan Pertama (Youth Development)", price: 1650000 },
        { name: "Biaya Registrasi & Official Kit Pack", price: 500000 }
      ],
      subtotal: 2150000,
      discount: 0,
      total: 2150000,
      paymentMethod: "QRIS Dynamic",
      status: "PENDING",
      paidAt: null,
      referenceCode: "QRIS-APEX-PENDING-04"
    }
  ]
};
