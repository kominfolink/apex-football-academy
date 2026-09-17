import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';

const AcademyContext = createContext();

const STORAGE_KEY = 'apex_football_academy_storage_v2';

export const AcademyProvider = ({ children }) => {
  // Load state from localStorage or fallback to initialData
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialData,
          ...parsed,
          hero: { ...initialData.hero, ...(parsed.hero || {}) },
          siteSettings: { ...initialData.siteSettings, ...(parsed.siteSettings || {}) }
        };
      }
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
    }
    return initialData;
  });

  // UI / Modal States
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  
  const [selectedProgramForReg, setSelectedProgramForReg] = useState(null);
  const [activeInvoice, setActiveInvoice] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [data]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Action: Open Registration with Optional Program Preselection
  const openRegistration = (program = null) => {
    setSelectedProgramForReg(program || data.programs[0]);
    setIsRegisterModalOpen(true);
  };

  // Action: Update Hero Content
  const updateHero = (heroUpdates) => {
    setData(prev => ({
      ...prev,
      hero: { ...prev.hero, ...heroUpdates }
    }));
    showToast('Banner Hero & Konten Utama berhasil diperbarui!');
  };

  // Action: Update Site Settings / SEO
  const updateSiteSettings = (settingsUpdates) => {
    setData(prev => ({
      ...prev,
      siteSettings: { ...prev.siteSettings, ...settingsUpdates }
    }));
    showToast('Pengaturan Website & SEO S-Tier berhasil disimpan!');
  };

  // Programs CRUD
  const addProgram = (program) => {
    const newProg = { ...program, id: `prog-${Date.now()}` };
    setData(prev => ({
      ...prev,
      programs: [...prev.programs, newProg]
    }));
    showToast(`Program "${program.name}" berhasil ditambahkan!`);
  };

  const updateProgram = (id, updatedProgram) => {
    setData(prev => ({
      ...prev,
      programs: prev.programs.map(p => p.id === id ? { ...p, ...updatedProgram } : p)
    }));
    showToast('Program latihan berhasil diperbarui!');
  };

  const deleteProgram = (id) => {
    setData(prev => ({
      ...prev,
      programs: prev.programs.filter(p => p.id !== id)
    }));
    showToast('Program latihan berhasil dihapus.', 'info');
  };

  // Coaches CRUD
  const addCoach = (coach) => {
    const newCoach = { ...coach, id: `coach-${Date.now()}` };
    setData(prev => ({
      ...prev,
      coaches: [...prev.coaches, newCoach]
    }));
    showToast(`Coach ${coach.name} berhasil ditambahkan!`);
  };

  const updateCoach = (id, updatedCoach) => {
    setData(prev => ({
      ...prev,
      coaches: prev.coaches.map(c => c.id === id ? { ...c, ...updatedCoach } : c)
    }));
    showToast('Data pelatih berhasil diperbarui!');
  };

  const deleteCoach = (id) => {
    setData(prev => ({
      ...prev,
      coaches: prev.coaches.filter(c => c.id !== id)
    }));
    showToast('Data pelatih dihapus.', 'info');
  };

  // Gallery CRUD
  const addGalleryItem = (item) => {
    const newItem = { ...item, id: `gal-${Date.now()}` };
    setData(prev => ({
      ...prev,
      gallery: [newItem, ...prev.gallery]
    }));
    showToast('Foto baru berhasil diunggah ke galeri!');
  };

  const updateGalleryItem = (id, updatedItem) => {
    setData(prev => ({
      ...prev,
      gallery: prev.gallery.map(g => g.id === id ? { ...g, ...updatedItem } : g)
    }));
    showToast('Data galeri berhasil diperbarui!');
  };

  const deleteGalleryItem = (id) => {
    setData(prev => ({
      ...prev,
      gallery: prev.gallery.filter(g => g.id !== id)
    }));
    showToast('Foto galeri berhasil dihapus.', 'info');
  };

  // Registration & Payment Flow
  const submitRegistration = (formData) => {
    const regId = `REG-2026-${String(data.initialRegistrations.length + 1).padStart(3, '0')}`;
    const invId = `INV-2026-${new Date().toISOString().slice(5, 10).replace('-', '')}-${String(data.initialInvoices.length + 1).padStart(3, '0')}`;
    
    const nowStr = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });

    const newRegistration = {
      id: regId,
      invoiceId: invId,
      studentName: formData.studentName,
      birthDate: formData.birthDate,
      ageCategory: formData.ageCategory,
      position: formData.position,
      preferredFoot: formData.preferredFoot,
      parentName: formData.parentName,
      parentPhone: formData.parentPhone,
      parentEmail: formData.parentEmail,
      address: formData.address,
      programId: formData.program.id,
      programName: formData.program.name,
      paymentPlan: formData.paymentPlan,
      jerseySize: formData.jerseySize,
      addOns: formData.addOns || [],
      totalAmount: formData.totalAmount,
      paymentStatus: 'PENDING',
      paymentMethod: formData.paymentMethod || 'QRIS Dynamic',
      registrationDate: nowStr,
      status: 'Menunggu Pembayaran',
      notes: formData.medicalNotes || 'Pendaftaran online mandiri.'
    };

    const newInvoice = {
      invoiceId: invId,
      registrationId: regId,
      studentName: formData.studentName,
      programName: formData.program.name,
      items: formData.items || [
        { name: `Biaya Paket (${formData.paymentPlan})`, price: formData.planPrice },
        { name: 'Biaya Registrasi & Official Kit Pack', price: formData.program.registrationFee }
      ],
      subtotal: formData.subtotal,
      discount: formData.discount || 0,
      total: formData.totalAmount,
      paymentMethod: formData.paymentMethod || 'QRIS Dynamic',
      status: 'PENDING',
      paidAt: null,
      referenceCode: `PAY-${Date.now().toString().slice(-8)}`
    };

    // Update state
    setData(prev => ({
      ...prev,
      initialRegistrations: [newRegistration, ...prev.initialRegistrations],
      initialInvoices: [newInvoice, ...prev.initialInvoices]
    }));

    setIsRegisterModalOpen(false);
    setActiveInvoice(newInvoice);
    setIsPaymentModalOpen(true);
    showToast(`Registrasi ${formData.studentName} tercatat! Silakan selesaikan pembayaran.`);
    return { registration: newRegistration, invoice: newInvoice };
  };

  // Payment Settlement Simulation
  const recordPaymentSuccess = (invoiceId, methodDetails = {}) => {
    const paidTime = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB';
    
    setData(prev => {
      const updatedInvoices = prev.initialInvoices.map(inv => {
        if (inv.invoiceId === invoiceId) {
          return {
            ...inv,
            status: 'PAID',
            paidAt: paidTime,
            paymentMethod: methodDetails.method || inv.paymentMethod,
            referenceCode: methodDetails.refCode || inv.referenceCode
          };
        }
        return inv;
      });

      const matchedInvoice = prev.initialInvoices.find(inv => inv.invoiceId === invoiceId);
      const regId = matchedInvoice ? matchedInvoice.registrationId : null;

      const updatedRegistrations = prev.initialRegistrations.map(reg => {
        if (reg.id === regId || reg.invoiceId === invoiceId) {
          return {
            ...reg,
            paymentStatus: 'PAID',
            status: 'Verified & Active',
            paymentMethod: methodDetails.method || reg.paymentMethod
          };
        }
        return reg;
      });

      return {
        ...prev,
        initialInvoices: updatedInvoices,
        initialRegistrations: updatedRegistrations
      };
    });

    if (activeInvoice && activeInvoice.invoiceId === invoiceId) {
      setActiveInvoice(prev => ({
        ...prev,
        status: 'PAID',
        paidAt: paidTime,
        paymentMethod: methodDetails.method || prev.paymentMethod
      }));
    }

    showToast(`Pembayaran Invoice ${invoiceId} BERHASIL diverifikasi! Status siswa Aktif.`);
  };

  // Update Status Registrasi (Admin Manual Action)
  const updateRegistrationStatus = (regId, status, paymentStatus = null) => {
    setData(prev => ({
      ...prev,
      initialRegistrations: prev.initialRegistrations.map(r => {
        if (r.id === regId) {
          return {
            ...r,
            status,
            ...(paymentStatus ? { paymentStatus } : {})
          };
        }
        return r;
      })
    }));
    showToast(`Status registrasi ${regId} diubah menjadi "${status}".`);
  };

  // Reset to Factory Default
  const resetToDefault = () => {
    setData(initialData);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Seluruh data website di-reset ke default awal.', 'info');
  };

  // Export JSON Backup
  const exportBackupJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `apex_football_academy_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('File backup data website berhasil diunduh!');
  };

  // Import JSON Backup
  const importBackupJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.hero && parsed.programs) {
        setData(parsed);
        showToast('Data backup berhasil di-restore!');
        return true;
      }
      throw new Error('Format JSON tidak valid');
    } catch (e) {
      showToast('Gagal memuat backup: ' + e.message, 'error');
      return false;
    }
  };

  return (
    <AcademyContext.Provider
      value={{
        ...data,
        // UI / Modals
        isRegisterModalOpen,
        setIsRegisterModalOpen,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isInvoiceModalOpen,
        setIsInvoiceModalOpen,
        selectedProgramForReg,
        setSelectedProgramForReg,
        activeInvoice,
        setActiveInvoice,
        toastMessage,
        showToast,
        openRegistration,
        
        // CMS & Mutation Handlers
        updateHero,
        updateSiteSettings,
        addProgram,
        updateProgram,
        deleteProgram,
        addCoach,
        updateCoach,
        deleteCoach,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        submitRegistration,
        recordPaymentSuccess,
        updateRegistrationStatus,
        resetToDefault,
        exportBackupJSON,
        importBackupJSON
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = () => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
};
