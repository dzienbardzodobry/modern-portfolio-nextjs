"use client";
import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  cpus as initialCpus, coolers as initialCoolers, motherboards as initialMotherboards, 
  rams as initialRams, storages as initialStorages, gpus as initialGpus, 
  cases as initialCases, psus as initialPsus, 
  CPU, Cooler, Motherboard, RAM, Storage, GPU, Case, PSU 
} from '@/data/hardware';

export default function ConfiguratorPage() {
  // --- DYNAMICZNY STAN PODZESPOŁÓW ---
  const [hardwareState, setHardwareState] = useState({
    cpus: initialCpus, coolers: initialCoolers, motherboards: initialMotherboards,
    rams: initialRams, storages: initialStorages, gpus: initialGpus, cases: initialCases, psus: initialPsus,
  });

  const [isSyncing, setIsSyncing] = useState(false);

  // --- STANY WYBORU ---
  const [selectedBrand, setSelectedBrand] = useState<'AMD' | 'Intel' | null>(null);
  const [selectedCpu, setSelectedCpu] = useState<CPU | null>(null);
  const [selectedCooler, setSelectedCooler] = useState<Cooler | null>(null);
  const [selectedMb, setSelectedMb] = useState<Motherboard | null>(null);
  const [selectedRam, setSelectedRam] = useState<RAM | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<Storage | null>(null);
  const [selectedGpu, setSelectedGpu] = useState<GPU | null>(null);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null); 
  const [selectedPsu, setSelectedPsu] = useState<PSU | null>(null);

  const [resolution, setResolution] = useState<'1080p' | '1440p' | '4K'>('1440p');

  // --- STANY FILTRÓW ---
  const [maxCpuPrice, setMaxCpuPrice] = useState<number>(4000); 
  const [minCpuCores, setMinCpuCores] = useState<number>(0);
  const [maxMbPrice, setMaxMbPrice] = useState<number>(2500);
  const [maxRamPrice, setMaxRamPrice] = useState<number>(2000);
  const [ramCapacity, setRamCapacity] = useState<number>(0); 
  const [ramModules, setRamModules] = useState<number>(0); 
  const [minRamSpeed, setMinRamSpeed] = useState<number>(0);
  const [maxRamCl, setMaxRamCl] = useState<number>(50);
  const [storageType, setStorageType] = useState<'All' | 'HDD' | 'SSD SATA' | 'SSD M.2'>('All');
  const [minStorageCap, setMinStorageCap] = useState<number>(0);
  const [maxGpuPrice, setMaxGpuPrice] = useState<number>(12000); 
  const [gpuBrandFilter, setGpuBrandFilter] = useState<'All' | 'NVIDIA' | 'AMD' | 'Intel'>('All');
  const [minVram, setMinVram] = useState<number>(0);
  const [maxCasePrice, setMaxCasePrice] = useState<number>(1000); 

  // --- OCHRONA PRZED "STALE CLOSURES" ---
  const cartRefs = useRef({ selectedCpu, selectedCooler, selectedMb, selectedRam, selectedStorage, selectedGpu, selectedCase, selectedPsu });
  useEffect(() => {
    cartRefs.current = { selectedCpu, selectedCooler, selectedMb, selectedRam, selectedStorage, selectedGpu, selectedCase, selectedPsu };
  }, [selectedCpu, selectedCooler, selectedMb, selectedRam, selectedStorage, selectedGpu, selectedCase, selectedPsu]);

  // --- PEŁNA AKTUALIZACJA W TLE ---
  const handleLiveStoreSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/hardware/sync', { method: 'POST' });
      const resData = await res.json();

      if (resData.success) {
        setHardwareState({
          cpus: resData.data.cpus, coolers: resData.data.coolers, motherboards: resData.data.motherboards,
          rams: resData.data.rams, storages: resData.data.storages, gpus: resData.data.gpus,
          cases: resData.data.cases, psus: resData.data.psus,
        });

        const currentCart = cartRefs.current;
        if (currentCart.selectedCpu && !resData.data.cpus.some((c: CPU) => c.name === currentCart.selectedCpu!.name)) setSelectedCpu(null);
        if (currentCart.selectedCooler && !resData.data.coolers.some((c: Cooler) => c.name === currentCart.selectedCooler!.name)) setSelectedCooler(null);
        if (currentCart.selectedMb && !resData.data.motherboards.some((m: Motherboard) => m.name === currentCart.selectedMb!.name)) setSelectedMb(null);
        if (currentCart.selectedRam && !resData.data.rams.some((r: RAM) => r.name === currentCart.selectedRam!.name)) setSelectedRam(null);
        if (currentCart.selectedStorage && !resData.data.storages.some((s: Storage) => s.name === currentCart.selectedStorage!.name)) setSelectedStorage(null);
        if (currentCart.selectedGpu && !resData.data.gpus.some((g: GPU) => g.name === currentCart.selectedGpu!.name)) setSelectedGpu(null);
        if (currentCart.selectedCase && !resData.data.cases.some((c: Case) => c.name === currentCart.selectedCase!.name)) setSelectedCase(null);
        if (currentCart.selectedPsu && !resData.data.psus.some((p: PSU) => p.name === currentCart.selectedPsu!.name)) setSelectedPsu(null);
      }
    } catch (e) {
      console.error("AutoSync error", e);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    handleLiveStoreSync();
    const intervalId = setInterval(handleLiveStoreSync, 300000);
    return () => clearInterval(intervalId);
  }, []); 

  // --- ZAAWANSOWANA LOGIKA WALIDACJI RESETU ---
  useEffect(() => { 
    if (selectedCpu && selectedCpu.brand !== selectedBrand) setSelectedCpu(null); 
  }, [selectedBrand, selectedCpu]); 

  useEffect(() => {
    if (!selectedCpu) { 
      setSelectedMb(null); 
    } else {
      if (selectedMb && selectedMb.socket !== selectedCpu.socket) {
        setSelectedMb(null);
        setSelectedRam(null); 
      }
      if (selectedCooler && selectedCooler.maxTdp < selectedCpu.wattage) {
        setSelectedCooler(null);
      }
    }
  }, [selectedCpu, selectedMb, selectedCooler]);

  useEffect(() => { 
    if (selectedMb && selectedRam && selectedRam.type !== selectedMb.ramType) setSelectedRam(null); 
  }, [selectedMb, selectedRam]);

  useEffect(() => {
    if (selectedCase) {
      let isCaseCompatible = true;
      if (selectedGpu && selectedGpu.length > selectedCase.maxGpuLength) isCaseCompatible = false;
      if (selectedMb && !selectedCase.supportedFormFactors.includes(selectedMb.formFactor)) isCaseCompatible = false;
      if (selectedCooler) {
        if (selectedCooler.type === 'Powietrzne' && selectedCooler.height > selectedCase.maxCpuCoolerHeight) isCaseCompatible = false;
        if (selectedCooler.type === 'Wodne (AIO)' && selectedCooler.radiatorSize > selectedCase.maxAioSize) isCaseCompatible = false;
      }
      if (!isCaseCompatible) setSelectedCase(null);
    }
  }, [selectedGpu, selectedCooler, selectedMb, selectedCase]);

  const baseSystemWattage = 50; 
  const totalWattage = (selectedCpu?.wattage || 0) + (selectedCooler?.wattage || 0) + (selectedRam?.wattage || 0) + (selectedStorage?.wattage || 0) + (selectedGpu?.wattage || 0) + baseSystemWattage;
  const recommendedPsuWattage = totalWattage * 1.3; 
  
  useEffect(() => { 
    if (selectedPsu && selectedPsu.wattage < recommendedPsuWattage) setSelectedPsu(null); 
  }, [recommendedPsuWattage, selectedPsu]);

  // --- FILTROWANIE W LOCIE ---
  const filteredCpus = useMemo(() => {
    return hardwareState.cpus.filter(c => {
      if (c.brand !== selectedBrand || c.price > maxCpuPrice) return false;
      if (minCpuCores > 0) {
        if (minCpuCores >= 16) return c.cores >= minCpuCores;
        return c.cores === minCpuCores; 
      }
      return true;
    });
  }, [selectedBrand, maxCpuPrice, minCpuCores, hardwareState.cpus]);

  const filteredCoolers = useMemo(() => selectedCpu ? hardwareState.coolers.filter(c => c.maxTdp >= selectedCpu.wattage) : [], [selectedCpu, hardwareState.coolers]);
  const filteredMbs = useMemo(() => hardwareState.motherboards.filter(m => m.socket === selectedCpu?.socket && m.price <= maxMbPrice), [selectedCpu, maxMbPrice, hardwareState.motherboards]);
  const filteredRams = useMemo(() => hardwareState.rams.filter(r => r.type === selectedMb?.ramType && r.price <= maxRamPrice && (ramCapacity === 0 || r.totalCapacity === ramCapacity) && (ramModules === 0 || r.modules === ramModules) && r.speed >= minRamSpeed && r.cl <= maxRamCl), [selectedMb, maxRamPrice, ramCapacity, ramModules, minRamSpeed, maxRamCl, hardwareState.rams]);
  const filteredStorages = useMemo(() => hardwareState.storages.filter(s => (storageType === 'All' || s.type === storageType) && (minStorageCap === 0 || s.capacity >= minStorageCap)), [storageType, minStorageCap, hardwareState.storages]);
  const filteredGpus = useMemo(() => hardwareState.gpus.filter(g => g.price <= maxGpuPrice && (gpuBrandFilter === 'All' || g.brand === gpuBrandFilter) && g.vram >= minVram), [maxGpuPrice, gpuBrandFilter, minVram, hardwareState.gpus]);
  const filteredCases = useMemo(() => {
    return hardwareState.cases.filter(c => {
      if (c.price > maxCasePrice) return false;
      if (selectedGpu && selectedGpu.length > c.maxGpuLength) return false;
      if (selectedMb && !c.supportedFormFactors.includes(selectedMb.formFactor)) return false;
      if (selectedCooler) {
        if (selectedCooler.type === 'Powietrzne' && selectedCooler.height > c.maxCpuCoolerHeight) return false;
        if (selectedCooler.type === 'Wodne (AIO)' && selectedCooler.radiatorSize > c.maxAioSize) return false;
      }
      return true;
    });
  }, [selectedGpu, selectedCooler, selectedMb, maxCasePrice, hardwareState.cases]);

  // --- LOGIKA ASYSTENTA KOMPATYBILNOŚCI ---
  const systemPcieGen = useMemo(() => {
    if (!selectedCpu) return 5;
    if (selectedCpu.socket === 'AM4' || selectedCpu.socket === 'LGA1200') return 4;
    return 5; 
  }, [selectedCpu]);

  const gpuPcieGen = useMemo(() => {
    if (!selectedGpu) return 4;
    if (selectedGpu.name.includes("5080") || selectedGpu.name.includes("5090") || selectedGpu.name.includes("9070 XT")) return 5;
    return 4; 
  }, [selectedGpu]);

  const systemAlerts = useMemo(() => {
    const alerts: { type: 'warning' | 'info'; text: string }[] = [];
    
    if (selectedCpu && selectedGpu) {
      const clock = selectedCpu.maxClock || 4.0;
      const cores = selectedCpu.cores || 6;
      let ipcMultiplier = 1.0;

      if (selectedCpu.socket === 'AM5' || selectedCpu.socket === 'LGA1851') {
        ipcMultiplier = 1.45; 
      } else if (selectedCpu.socket === 'LGA1700') {
        ipcMultiplier = 1.25; 
      } else if (selectedCpu.socket === 'AM4') {
        ipcMultiplier = selectedCpu.name.includes('2600') || selectedCpu.name.includes('1000') || selectedCpu.name.includes('2000') ? 0.75 : 1.0;
      } else if (selectedCpu.socket === 'LGA1200') {
        ipcMultiplier = 0.85;
      } else {
        ipcMultiplier = 0.70; 
      }

      if (selectedCpu.name.includes('X3D')) {
        ipcMultiplier *= 1.25;
      }

      const cpuPerformanceIndex = Math.min(cores, 8) * clock * ipcMultiplier;

      if (cpuPerformanceIndex < 28 && selectedGpu.price > 3500) {
        alerts.push({ 
          type: 'warning', 
          text: `⚠️ Ogromny Bottleneck CPU! Procesor ${selectedCpu.name} opiera się na starszej architekturze lub niskim taktowaniu. W rozdzielczościach 1080p/1440p drastycznie ograniczy potężną kartę graficzną.` 
        });
      }

      if (cpuPerformanceIndex > 50 && selectedGpu.price < 1500) {
        alerts.push({ 
          type: 'warning', 
          text: '⚠️ Potężny procesor w zestawieniu z budżetowym GPU. Karta graficzna zablokuje pełen potencjał tego zestawu w wymagających grach.' 
        });
      }
    }

    if (selectedCpu && selectedGpu && systemPcieGen < gpuPcieGen) {
      alerts.push({ type: 'info', text: ` Wybrana grafika obsługuje PCIe 5.0, ale procesor (${selectedCpu.socket}) ograniczy ją do przepustowości PCIe 4.0.` });
    }
    
    if (selectedCpu && selectedCooler && selectedCooler.maxTdp - selectedCpu.wattage <= 30) {
      alerts.push({ type: 'info', text: '💡 Wybrane chłodzenie działa niemal na granicy TDP procesora. Temperatury w stresie mogą być wysokie.' });
    }
    
    return alerts;
  }, [selectedCpu, selectedGpu, selectedCooler, systemPcieGen, gpuPcieGen]);

  // --- UNIWERSALNY KALKULATOR FPS (BOTTLENECK AWARE) ---
  const fpsEstimates = useMemo(() => {
    if (!selectedGpu || !selectedCpu) return null;
    
    const gpuBaseFps: Record<string, { cp: number, cs2: number, w4: number }> = {
      'GeForce RTX 4060 8GB': { cp: 85, cs2: 320, w4: 55 },
      'GeForce RTX 4060 Ti 8GB': { cp: 100, cs2: 360, w4: 68 },
      'GeForce RTX 4070 SUPER 12GB': { cp: 145, cs2: 480, w4: 105 },
      'GeForce RTX 4070 Ti SUPER 16GB': { cp: 170, cs2: 540, w4: 125 },
      'GeForce RTX 5060 8GB': { cp: 120, cs2: 420, w4: 85 },
      'GeForce RTX 5060 Ti 16GB': { cp: 140, cs2: 460, w4: 100 },
      'GeForce RTX 5070 12GB': { cp: 165, cs2: 520, w4: 120 },
      'GeForce RTX 5070 Ti 16GB': { cp: 195, cs2: 600, w4: 145 },
      'GeForce RTX 5080 16GB': { cp: 230, cs2: 700, w4: 170 },
      'GeForce RTX 5090 32GB': { cp: 280, cs2: 850, w4: 200 },
      'Radeon RX 6600 8GB': { cp: 65, cs2: 240, w4: 42 },
      'Radeon RX 7600 XT 16GB': { cp: 80, cs2: 300, w4: 50 },
      'Radeon RX 7700 XT 12GB': { cp: 110, cs2: 380, w4: 75 },
      'Radeon RX 7800 XT 16GB': { cp: 130, cs2: 440, w4: 90 },
      'Radeon RX 7900 GRE 16GB': { cp: 135, cs2: 450, w4: 95 },
      'Radeon RX 9060 XT 8GB': { cp: 115, cs2: 400, w4: 80 },
      'Radeon RX 9070 XT 16GB': { cp: 180, cs2: 550, w4: 135 },
      'Intel Arc A770 Phantom 16GB': { cp: 75, cs2: 260, w4: 45 },
      'Arc B580 12GB': { cp: 90, cs2: 330, w4: 58 },
    };

    const base = gpuBaseFps[selectedGpu.name] || { cp: 90, cs2: 350, w4: 60 };
    const resMultiplier = resolution === '1080p' ? 1.0 : (resolution === '1440p' ? 0.65 : 0.35);

    const cpuLimits: Record<string, { cp: number, cs2: number }> = {
      'AMD Ryzen 5 5500': { cp: 85, cs2: 250 },
      'AMD Ryzen 5 2600X': { cp: 60, cs2: 180 },
      'AMD Ryzen 5 5600': { cp: 105, cs2: 350 },
      'AMD Ryzen 7 5700X': { cp: 115, cs2: 380 },
      'AMD Ryzen 7 5700G': { cp: 100, cs2: 320 },
      'AMD Ryzen 7 5800X': { cp: 120, cs2: 400 },
      'AMD Ryzen 9 5900X': { cp: 135, cs2: 430 },
      'AMD Ryzen 5 8500G': { cp: 120, cs2: 410 },
      'AMD Ryzen 5 8600G': { cp: 130, cs2: 450 },
      'AMD Ryzen 5 7600': { cp: 145, cs2: 520 },
      'AMD Ryzen 5 7600X': { cp: 150, cs2: 550 },
      'AMD Ryzen 7 7700': { cp: 160, cs2: 600 },
      'AMD Ryzen 7 7800X3D': { cp: 185, cs2: 700 },
      'AMD Ryzen 5 9600X': { cp: 160, cs2: 590 },
      'AMD Ryzen 7 9700X': { cp: 175, cs2: 660 },
      'AMD Ryzen 9 9900X': { cp: 195, cs2: 750 },
      'AMD Ryzen 9 9950X': { cp: 205, cs2: 790 },
      'AMD Ryzen 7 9800X3D': { cp: 215, cs2: 850 },
      'AMD Ryzen 9 9900X3D': { cp: 220, cs2: 880 },
      'AMD Ryzen 9 9950X3D': { cp: 235, cs2: 920 },
      'Intel Core i7-10700K': { cp: 100, cs2: 310 },
      'Intel Core i9-10900K': { cp: 110, cs2: 350 },
      'Intel Core i7-11700K': { cp: 105, cs2: 330 },
      'Intel Core i9-11900K': { cp: 115, cs2: 370 },
      'Intel Core i5-12400F': { cp: 100, cs2: 340 },
      'Intel Core i5-12600K': { cp: 120, cs2: 420 },
      'Intel Core i7-12700K': { cp: 125, cs2: 450 },
      'Intel Core i9-12900K': { cp: 140, cs2: 500 },
      'Intel Core i5-13400F': { cp: 110, cs2: 380 },
      'Intel Core i5-13600K': { cp: 150, cs2: 540 },
      'Intel Core i7-13700K': { cp: 165, cs2: 620 },
      'Intel Core i9-13900K': { cp: 175, cs2: 660 },
      'Intel Core i5-14600K': { cp: 155, cs2: 580 },
      'Intel Core i5-14600KF': { cp: 155, cs2: 580 },
      'Intel Core i7-14700K': { cp: 175, cs2: 650 },
      'Intel Core i7-14700KF': { cp: 175, cs2: 650 },
      'Intel Core i9-14900K': { cp: 180, cs2: 680 },
      'Intel Core i9-14900KF': { cp: 180, cs2: 680 },
      'Intel Core Ultra 5 245K': { cp: 160, cs2: 580 },
      'Intel Core Ultra 7 265K': { cp: 180, cs2: 680 },
      'Intel Core Ultra 9 285K': { cp: 190, cs2: 720 },
    };

    const calculatedLimit = (() => {
      const clock = selectedCpu.maxClock || 4.0;
      const cores = selectedCpu.cores || 6;
      const coreScalingFactor = Math.min(cores, 8) / 8;
      
      let ipcBonus = 1.0;
      if (selectedCpu.socket === 'AM5' || selectedCpu.socket === 'LGA1851') {
        ipcBonus = 1.35; 
      } else if (selectedCpu.socket === 'LGA1700') {
        ipcBonus = 1.15;
      } else if (selectedCpu.socket === 'AM4') {
        ipcBonus = 1.0;
      } else {
        ipcBonus = 0.85; 
      }

      if (selectedCpu.name.includes('X3D')) {
        ipcBonus *= 1.25;
      }

      return {
        cp: Math.round(clock * 22 * coreScalingFactor * ipcBonus),
        cs2: Math.round(clock * 58 * coreScalingFactor * ipcBonus)
      };
    })();

    const limit = cpuLimits[selectedCpu.name] || calculatedLimit;

    let calculatedCp = base.cp * resMultiplier;
    let calculatedCs2 = base.cs2 * resMultiplier;
    let calculatedW4 = base.w4 * resMultiplier;

    let finalCp = Math.min(calculatedCp, limit.cp);
    let finalCs2 = Math.min(calculatedCs2, limit.cs2);
    let finalW4 = Math.min(calculatedW4, limit.cp * 0.85);

    if (systemPcieGen < gpuPcieGen) {
      finalCp *= 0.96; finalCs2 *= 0.98; finalW4 *= 0.95;
    }

    return {
      cyberpunk: Math.max(20, Math.round(finalCp)),
      cs2: Math.max(30, Math.round(finalCs2)),
      witcher: Math.max(20, Math.round(finalW4))
    };
  }, [selectedCpu, selectedGpu, resolution, systemPcieGen, gpuPcieGen]);

  const totalPrice = (selectedCpu?.price || 0) + (selectedCooler?.price || 0) + (selectedMb?.price || 0) + (selectedRam?.price || 0) + (selectedStorage?.price || 0) + (selectedGpu?.price || 0) + (selectedCase?.price || 0) + (selectedPsu?.price || 0);

  // --- FUNKCJA GENEROWANIA DOKUMENTU PDF ---
  const handleSavePDF = () => {
    if (!selectedCpu && !selectedGpu) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const configItems = [
      { label: 'Platforma', name: selectedBrand || '---', price: '' },
      { label: 'Procesor (CPU)', name: selectedCpu?.name || '---', price: selectedCpu ? `${selectedCpu.price} zł` : '---' },
      { label: 'Chłodzenie', name: selectedCooler?.name || '---', price: selectedCooler ? `${selectedCooler.price} zł` : '---' },
      { label: 'Płyta główna', name: selectedMb?.name || '---', price: selectedMb ? `${selectedMb.price} zł` : '---' },
      { label: 'Pamięć RAM', name: selectedRam?.name || '---', price: selectedRam ? `${selectedRam.price} zł` : '---' },
      { label: 'Dysk', name: selectedStorage?.name || '---', price: selectedStorage ? `${selectedStorage.price} zł` : '---' },
      { label: 'Karta graficzna', name: selectedGpu?.name || '---', price: selectedGpu ? `${selectedGpu.price} zł` : '---' },
      { label: 'Obudowa', name: selectedCase?.name || '---', price: selectedCase ? `${selectedCase.price} zł` : '---' },
      { label: 'Zasilacz', name: selectedPsu?.name || '---', price: selectedPsu ? `${selectedPsu.price} zł` : '---' },
    ];

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Specyfikacja Konfiguracji PC</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #ffffff; color: #0f172a; padding: 40px; margin: 0; }
          .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px; }
          .title { font-size: 28px; font-weight: 800; color: #3b82f6; margin: 0 0 5px 0; }
          .subtitle { font-size: 14px; color: #64748b; margin: 0; text-transform: uppercase; letter-spacing: 1px; }
          .table { w-full: 100%; border-collapse: collapse; margin-top: 20px; width: 100%; }
          .table th { text-align: left; padding: 12px; background-color: #f8fafc; color: #475569; font-size: 13px; font-weight: 700; border-bottom: 2px solid #e2e8f0; }
          .table td { padding: 14px 12px; font-size: 14px; border-bottom: 1px solid #f1f5f9; color: #334155; }
          .table td.price { text-align: right; font-weight: 700; color: #0f172a; }
          .footer-section { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
          .total-box { text-align: right; font-size: 24px; font-weight: 900; color: #0f172a; }
          .total-box span { font-size: 14px; font-weight: 600; color: #64748b; margin-right: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">Konfigurator PRO</div>
          <div class="subtitle">Podsumowanie specyfikacji sprzętowej</div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>SEKCJA</th>
              <th>WYBRANY PODZESPÓŁ</th>
              <th style="text-align: right;">CENA</th>
            </tr>
          </thead>
          <tbody>
            ${configItems.map(item => `
              <tr>
                <td style="font-weight: 600; color: #475569;">${item.label}</td>
                <td>${item.name}</td>
                <td class="price">${item.price}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="footer-section">
          <div style="font-size: 12px; color: #94a3b8;">Wygenerowano z podglądu kreatora portfolio.</div>
          <div class="total-box"><span>RAZEM:</span>${totalPrice.toLocaleString('pl-PL')} zł</div>
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.close();
            }, 250);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  // --- FUNKCJA PŁYNNEGO PRZEWIJANIA ---
  const scrollToSection = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150); 
  };

  // --- FUNKCJE KLIKNIĘĆ Z AUTO-SCROLLEM ---
  const handleBrandSelect = (brand: 'AMD' | 'Intel') => {
    if (brand !== selectedBrand) {
      setSelectedBrand(brand);
      setSelectedCpu(null); 
      setSelectedMb(null);
    }
    scrollToSection('step-cpu');
  };

  const handleCpuSelect = (cpu: CPU) => {
    if (selectedCpu?.id === cpu.id) {
      setSelectedCpu(null); 
    } else { 
      setSelectedCpu(cpu); 
      scrollToSection('step-cooler'); 
    }
  };

  const handleCoolerSelect = (cooler: Cooler) => {
    if (selectedCooler?.id === cooler.id) setSelectedCooler(null);
    else { setSelectedCooler(cooler); scrollToSection('step-mb'); }
  };

  const handleMbSelect = (mb: Motherboard) => {
    if (selectedMb?.id === mb.id) setSelectedMb(null);
    else { 
      setSelectedMb(mb); 
      scrollToSection('step-ram'); 
    }
  };

  const handleRamSelect = (ram: RAM) => {
    if (selectedRam?.id === ram.id) setSelectedRam(null);
    else { setSelectedRam(ram); scrollToSection('step-storage'); }
  };

  const handleStorageSelect = (storage: Storage) => {
    if (selectedStorage?.id === storage.id) setSelectedStorage(null);
    else { setSelectedStorage(storage); scrollToSection('step-gpu'); }
  };

  const handleGpuSelect = (gpu: GPU) => {
    if (selectedGpu?.id === gpu.id) setSelectedGpu(null);
    else { 
      setSelectedGpu(gpu); 
      scrollToSection('step-case'); 
    }
  };

  const handleCaseSelect = (cs: Case) => {
    if (selectedCase?.id === cs.id) setSelectedCase(null);
    else { setSelectedCase(cs); scrollToSection('step-psu'); }
  };

  const handlePsuSelect = (psu: PSU) => {
    if (selectedPsu?.id === psu.id) setSelectedPsu(null);
    else setSelectedPsu(psu); 
  };

  const selectedCount = [selectedBrand, selectedCpu, selectedCooler, selectedMb, selectedRam, selectedStorage, selectedGpu, selectedCase, selectedPsu].filter(Boolean).length;
  const progressPercentage = Math.round((selectedCount / 9) * 100);

  return (
    <main className="min-h-screen bg-gray-950 text-white font-sans p-6 md:p-12 pb-32">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <Link href="/" className="text-gray-500 hover:text-blue-400 transition font-semibold">← Wróć do portfolio</Link>
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800 shadow-sm">
          <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-500 animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`}></span>
          {isSyncing ? 'Synchronizacja bazy...' : 'Ceny aktualne'}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mb-12 sticky top-4 z-50 bg-gray-950/90 backdrop-blur px-4 py-3 rounded-2xl border border-gray-800/60 shadow-lg">
        <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
          <span>POSTĘP KONFIGURACJI</span>
          <span className="text-blue-500">{progressPercentage}% ({selectedCount}/9)</span>
        </div>
        <div className="w-full bg-gray-900 rounded-full h-2.5 border border-gray-800">
          <div className="bg-gradient-to-r from-blue-600 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-black mb-4">Konfigurator <span className="text-blue-500">PRO</span></h1>
          </header>

          {/* 1. PLATFORMA */}
          <section id="step-brand" className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl scroll-mt-24">
            <h2 className="text-2xl font-bold mb-6">1. Wybierz platformę</h2>
            <div className="grid grid-cols-2 gap-6">
              {(['AMD', 'Intel'] as const).map((brand) => (
                <button key={brand} onClick={() => handleBrandSelect(brand)} className={`p-8 rounded-2xl border-2 transition font-black text-3xl ${selectedBrand === brand ? (brand === 'AMD' ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-blue-500 bg-blue-500/10 text-blue-500') : 'border-gray-800 bg-gray-900 hover:border-gray-700'}`}>{brand}</button>
              ))}
            </div>
          </section>

          {/* 2. CPU */}
          <AnimatePresence>
            {selectedBrand && (
              <motion.section id="step-cpu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl overflow-hidden scroll-mt-24">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">2. Procesor</h2>
                  <span className="text-sm bg-gray-800 px-3 py-1 rounded-full border border-gray-700">Dostępne: {filteredCpus.length}</span>
                </div>
                <div className="bg-gray-950/50 border border-gray-800 p-5 rounded-2xl mb-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-sm text-gray-400 block mb-2 font-semibold flex justify-between">Cena max: <span className="text-blue-400">{maxCpuPrice} zł</span></label>
                    <input type="range" min="400" max="4000" step="100" value={maxCpuPrice} onChange={e => setMaxCpuPrice(Number(e.target.value))} className="w-full accent-blue-500" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2 font-semibold">Liczba rdzeni:</label>
                    <div className="flex flex-wrap gap-2">
                      {[0, 6, 8, 14, 16].map(c => (
                        <button key={c} onClick={() => setMinCpuCores(c)} className={`flex-1 py-2 px-1 rounded-lg text-xs sm:text-sm whitespace-nowrap transition ${minCpuCores === c ? 'bg-blue-600 text-white font-bold' : 'bg-gray-800 text-gray-400'}`}>
                          {c === 0 ? 'Wszystkie' : c >= 16 ? `${c}+` : `${c} rdzeni`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredCpus.map(cpu => (
                    <div key={cpu.id} onClick={() => handleCpuSelect(cpu)} className={`p-5 rounded-2xl border-2 text-left transition relative flex flex-col justify-between cursor-pointer ${selectedCpu?.id === cpu.id ? 'border-blue-500 bg-blue-500/10' : 'border-gray-800 bg-gray-950 hover:border-gray-600'}`}>
                      {selectedCpu?.id === cpu.id && <span className="absolute top-4 right-4 text-blue-500 text-xs font-bold bg-blue-900/40 px-2 py-1 rounded">Wybrano</span>}
                      <div>
                        <p className="font-bold text-lg pr-20 leading-tight mb-1">{cpu.name}</p>
                        <p className="text-xs text-gray-300 mt-1 font-medium">{cpu.cores} rdzeni / {cpu.threads} wątków | {cpu.minClock.toFixed(1)}-{cpu.maxClock.toFixed(1)} GHz</p>
                        <p className="text-xs text-gray-500 mt-0.5">Socket: {cpu.socket} | Cache L3: {cpu.cacheL3} MB | TDP: {cpu.wattage}W</p>
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <p className="text-blue-400 font-bold text-xl">{cpu.price} zł</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* 3. COOLER */}
          <AnimatePresence>
            {selectedCpu && (
              <motion.section id="step-cooler" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl overflow-hidden scroll-mt-24">
                <h2 className="text-2xl font-bold mb-6 text-gray-200">3. Chłodzenie (Wymagane TDP: {selectedCpu.wattage}W)</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredCoolers.map(cooler => (
                    <div key={cooler.id} onClick={() => handleCoolerSelect(cooler)} className={`p-5 rounded-2xl border-2 text-left transition relative flex flex-col justify-between cursor-pointer ${selectedCooler?.id === cooler.id ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-800 bg-gray-900 hover:border-gray-600'}`}>
                      <div>
                        {selectedCooler?.id === cooler.id && <span className="absolute top-4 right-4 text-cyan-500 text-xs font-bold bg-cyan-900/40 px-2 py-1 rounded">Wybrano</span>}
                        <p className="font-bold text-lg pr-20 leading-tight mb-1">{cooler.name}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {cooler.type} {cooler.type === 'Powietrzne' ? `| Wysokość: ${cooler.height}mm` : `| Radiator: ${cooler.radiatorSize}mm`} <br /> 
                          <span className="font-bold text-gray-200 block mt-1">Max TDP: {cooler.maxTdp}W</span>
                        </p>
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <p className="text-cyan-400 font-bold text-xl">{cooler.price} zł</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* 4. MOTHERBOARD */}
          <AnimatePresence>
            {selectedCpu && selectedCooler && (
              <motion.section id="step-mb" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl overflow-hidden scroll-mt-24">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-200">4. Płyta główna (Socket: {selectedCpu.socket})</h2>
                  <span className="text-sm bg-gray-800 px-3 py-1 rounded-full border border-gray-700">Dostępne: {filteredMbs.length}</span>
                </div>
                <div className="bg-gray-950/50 border border-gray-800 p-5 rounded-2xl mb-6">
                  <label className="text-sm text-purple-400 font-semibold block mb-2">Cena max: {maxMbPrice} zł</label>
                  <input type="range" min="200" max="2500" step="50" value={maxMbPrice} onChange={e => setMaxMbPrice(Number(e.target.value))} className="w-full accent-purple-500" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredMbs.map(mb => (
                    <div key={mb.id} onClick={() => handleMbSelect(mb)} className={`p-5 rounded-2xl border-2 text-left transition relative flex flex-col justify-between cursor-pointer ${selectedMb?.id === mb.id ? 'border-purple-500 bg-purple-500/10' : 'border-gray-800 bg-gray-900 hover:border-gray-600'}`}>
                      <div>
                        {selectedMb?.id === mb.id && <span className="absolute top-4 right-4 text-purple-500 text-xs font-bold bg-purple-900/40 px-2 py-1 rounded">Wybrano</span>}
                        <p className="font-bold text-lg pr-20 leading-tight mb-1">{mb.name}</p>
                        <p className="text-xs text-gray-400 mt-1">Gniazdo: {mb.socket} | Format: {mb.formFactor} | Pamięć: {mb.ramType}</p>
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <p className="text-purple-400 font-bold text-xl">{mb.price} zł</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* 5. RAM */}
          <AnimatePresence>
            {selectedMb && (
              <motion.section id="step-ram" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl overflow-hidden scroll-mt-24">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-200">5. Pamięć RAM ({selectedMb.ramType})</h2>
                  <span className="text-sm bg-gray-800 px-3 py-1 rounded-full border border-gray-700">Dostępne: {filteredRams.length}</span>
                </div>
                
                <div className="bg-gray-950/50 border border-gray-800 p-6 rounded-2xl mb-6 flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-sm text-gray-400 block mb-2 font-semibold flex justify-between">Cena max: <span className="text-green-400">{maxRamPrice} zł</span></label>
                      <input type="range" min="100" max="2000" step="50" value={maxRamPrice} onChange={e => setMaxRamPrice(Number(e.target.value))} className="w-full accent-green-500" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 block mb-2 font-semibold flex justify-between">Min. Taktowanie: <span className="text-gray-300">{minRamSpeed === 0 ? 'Wszystkie' : `${minRamSpeed} MHz`}</span></label>
                      <input type="range" min="0" max="7000" step="200" value={minRamSpeed} onChange={e => setMinRamSpeed(Number(e.target.value))} className="w-full accent-green-500" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 block mb-2 font-semibold flex justify-between">Max. Opóźnienie: <span className="text-gray-300">{maxRamCl === 50 ? 'Wszystkie' : `CL${maxRamCl}`}</span></label>
                      <input type="range" min="14" max="50" step="2" value={maxRamCl} onChange={e => setMaxRamCl(Number(e.target.value))} className="w-full accent-green-500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-gray-400 block mb-2 font-semibold">Pojemność:</label>
                      <div className="flex flex-wrap gap-2">
                        {[0, 8, 16, 32, 64].map(cap => (
                          <button key={cap} onClick={() => setRamCapacity(cap)} className={`flex-1 py-2 px-1 rounded-lg text-xs sm:text-sm whitespace-nowrap transition ${ramCapacity === cap ? 'bg-green-600 text-white font-bold' : 'bg-gray-800 text-gray-400'}`}>
                            {cap === 0 ? 'Wszystko' : `${cap}GB`}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 block mb-2 font-semibold">Liczba modułów:</label>
                      <div className="flex flex-wrap gap-2">
                        {[0, 1, 2].map(mod => (
                          <button key={mod} onClick={() => setRamModules(mod)} className={`flex-1 py-2 px-1 rounded-lg text-xs sm:text-sm whitespace-nowrap transition ${ramModules === mod ? 'bg-green-600 text-white font-bold' : 'bg-gray-800 text-gray-400'}`}>
                            {mod === 0 ? 'Dowolna' : `${mod}x kość`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredRams.map(ram => (
                    <div key={ram.id} onClick={() => handleRamSelect(ram)} className={`p-5 rounded-2xl border-2 text-left transition relative flex flex-col justify-between cursor-pointer ${selectedRam?.id === ram.id ? 'border-green-500 bg-green-500/10' : 'border-gray-800 bg-gray-900 hover:border-gray-600'}`}>
                      <div>
                        {selectedRam?.id === ram.id && <span className="absolute top-4 right-4 text-green-500 text-xs font-bold bg-green-900/40 px-2 py-1 rounded">Wybrano</span>}
                        <p className="font-bold text-lg pr-20 leading-tight mb-1">{ram.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{ram.totalCapacity}GB ({ram.modules}x{ram.totalCapacity / ram.modules}GB) | Speed: {ram.speed}MHz | CL{ram.cl}</p>
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <p className="text-green-400 font-bold text-xl">{ram.price} zł</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* 6. STORAGE */}
          <AnimatePresence>
            {selectedRam && (
              <motion.section id="step-storage" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl overflow-hidden scroll-mt-24">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-200">6. Dysk (Pamięć masowa)</h2>
                  <span className="text-sm bg-gray-800 px-3 py-1 rounded-full border border-gray-700">Pasujące: {filteredStorages.length}</span>
                </div>
                <div className="bg-gray-950/50 border border-gray-800 p-5 rounded-2xl mb-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-sm text-gray-400 block mb-2 font-semibold">Typ dysku:</label>
                    <select value={storageType} onChange={(e) => setStorageType(e.target.value as any)} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm text-white outline-none focus:border-yellow-600">
                      <option value="All">Wszystkie typy</option>
                      <option value="SSD M.2">Najszybsze (SSD M.2)</option>
                      <option value="SSD SATA">Standardowe (SSD SATA)</option>
                      <option value="HDD">Magazyn (HDD)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2 font-semibold">Minimalna Pojemność:</label>
                    <div className="flex flex-wrap gap-2">
                      {[0, 500, 1000, 2000].map(cap => (
                        <button key={cap} onClick={() => setMinStorageCap(cap)} className={`flex-1 py-2 px-1 rounded-lg text-xs sm:text-sm whitespace-nowrap transition ${minStorageCap === cap ? 'bg-yellow-600 text-white font-bold' : 'bg-gray-800 text-gray-400'}`}>
                          {cap === 0 ? 'Wszystko' : cap >= 1000 ? `${cap/1000}TB` : `${cap}GB`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredStorages.map(storage => (
                    <div key={storage.id} onClick={() => handleStorageSelect(storage)} className={`p-5 rounded-2xl border-2 text-left transition relative flex flex-col justify-between cursor-pointer ${selectedStorage?.id === storage.id ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-800 bg-gray-900 hover:border-gray-600'}`}>
                      <div>
                        {selectedStorage?.id === storage.id && <span className="absolute top-4 right-4 text-yellow-500 text-xs font-bold bg-yellow-900/40 px-2 py-1 rounded">Wybrano</span>}
                        <p className="font-bold text-lg pr-20 leading-tight mb-1">{storage.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{storage.type} | Pojemność: {storage.capacity >= 1000 ? `${storage.capacity/1000}TB` : `${storage.capacity}GB`}</p>
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <p className="text-yellow-400 font-bold text-xl">{storage.price} zł</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* 7. GPU */}
          <AnimatePresence>
            {selectedStorage && (
              <motion.section id="step-gpu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl overflow-hidden scroll-mt-24">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-200">7. Karta Graficzna</h2>
                  <span className="text-sm bg-gray-800 px-3 py-1 rounded-full border border-gray-700">Pasujące: {filteredGpus.length}</span>
                </div>
                
                <div className="bg-gray-950/50 border border-gray-800 p-6 rounded-2xl mb-6 flex flex-col gap-6">
                  <div>
                    <label className="text-sm text-gray-400 block mb-3 font-semibold">Producent układu:</label>
                    <div className="flex bg-gray-900 rounded-xl p-1 border border-gray-800">
                      {['All', 'NVIDIA', 'AMD', 'Intel'].map((brand) => (
                        <button 
                          key={brand}
                          onClick={() => setGpuBrandFilter(brand as any)}
                          className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                            gpuBrandFilter === brand 
                            ? (brand === 'NVIDIA' ? 'bg-green-600/20 text-green-500 border border-green-500/30' : brand === 'AMD' ? 'bg-red-600/20 text-red-500 border-red-500/20' : brand === 'Intel' ? 'bg-blue-600/20 text-blue-500 border-blue-500/30' : 'bg-gray-700 text-white border border-gray-500') 
                            : 'text-gray-500 hover:text-gray-300 border border-transparent'
                          }`}
                        >
                          {brand === 'All' ? 'Wszyscy' : brand}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex justify-between items-end mb-3">
                        <label className="text-sm text-gray-400 font-semibold">Cena max:</label>
                        <span className="text-emerald-400 font-bold">{maxGpuPrice} zł</span>
                      </div>
                      <input type="range" min="1000" max="12000" step="500" value={maxGpuPrice} onChange={e => setMaxGpuPrice(Number(e.target.value))} className="w-full accent-emerald-500" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 block mb-3 font-semibold">Min. pamięć VRAM:</label>
                      <div className="flex flex-wrap gap-2">
                        {[0, 8, 12, 16].map(v => (
                          <button key={v} onClick={() => setMinVram(v)} className={`flex-1 py-2 px-1 rounded-lg text-xs sm:text-sm whitespace-nowrap transition ${minVram === v ? 'bg-emerald-600 text-white font-bold' : 'bg-gray-800 text-gray-400'}`}>
                            {v === 0 ? 'Wszystkie' : `${v}GB+`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredGpus.map(gpu => (
                    <div key={gpu.id} onClick={() => handleGpuSelect(gpu)} className={`p-5 rounded-2xl border-2 text-left transition relative flex flex-col justify-between cursor-pointer ${selectedGpu?.id === gpu.id ? 'border-emerald-500 bg-emerald-500/10' : 'border-gray-800 bg-gray-900 hover:border-gray-600'}`}>
                      <div>
                        {selectedGpu?.id === gpu.id && <span className="absolute top-4 right-4 text-emerald-500 text-xs font-bold bg-emerald-900/40 px-2 py-1 rounded">Wybrano</span>}
                        <p className="font-bold text-lg pr-20 leading-tight mb-3">{gpu.name}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded border ${gpu.brand === 'NVIDIA' ? 'bg-green-500/10 text-green-500 border-green-500/20' : gpu.brand === 'AMD' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>{gpu.brand}</span>
                          <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-gray-800 text-gray-300 border border-gray-700">{gpu.vram} GB {(gpu as any).memoryType || 'GDDR6'}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-900 text-purple-400 border border-purple-900/50">Złącze: {(gpu as any).connector || 'PCIe 4.0 x16'}</span>
                          <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-900 text-orange-400 border border-orange-900/50">Dług. {gpu.length} mm</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <p className="text-emerald-400 font-bold text-xl">{gpu.price} zł</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* 8. CASE */}
          <AnimatePresence>
            {selectedGpu && (
              <motion.section id="step-case" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl overflow-hidden scroll-mt-24">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-200">8. Obudowa</h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Wymagania: Karta ({selectedGpu.length}mm) 
                      {selectedMb && ` | Płyta (${selectedMb.formFactor})`}
                      {selectedCooler?.type === 'Powietrzne' && ` | Cooler (${selectedCooler.height}mm)`}
                    </p>
                  </div>
                  <span className="text-sm bg-gray-800 px-3 py-1 rounded-full border border-gray-700">Pasujące: {filteredCases.length}</span>
                </div>

                <div className="bg-gray-950/50 border border-gray-800 p-5 rounded-2xl mb-6">
                  <label className="text-sm text-gray-400 block mb-2 font-semibold flex justify-between">
                    Cena max obudowy: <span className="text-amber-400">{maxCasePrice} zł</span>
                  </label>
                  <input type="range" min="150" max="1000" step="50" value={maxCasePrice} onChange={e => setMaxCasePrice(Number(e.target.value))} className="w-full accent-amber-500" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredCases.map(cs => (
                    <div key={cs.id} onClick={() => handleCaseSelect(cs)} className={`p-5 rounded-2xl border-2 text-left transition relative flex flex-col justify-between cursor-pointer ${selectedCase?.id === cs.id ? 'border-amber-500 bg-amber-500/10' : 'border-gray-800 bg-gray-900 hover:border-gray-600'}`}>
                      <div>
                        {selectedCase?.id === cs.id && <span className="absolute top-4 right-4 text-amber-500 text-xs font-bold bg-amber-900/40 px-2 py-1 rounded">Wybrano</span>}
                        <p className="font-bold text-lg pr-20 leading-tight mb-1">{cs.name}</p>
                        <div className="space-y-1 mt-3">
                          <p className="text-xs text-gray-400 flex justify-between"><span>Maks. długość GPU:</span><span className="font-bold text-gray-200">{cs.maxGpuLength} mm</span></p>
                          <p className="text-xs text-gray-400 flex justify-between"><span>Maks. wys. coolera:</span><span className="font-bold text-gray-200">{cs.maxCpuCoolerHeight} mm</span></p>
                          <p className="text-xs text-gray-400 flex justify-between"><span>Obsługiwane płyty:</span><span className="font-bold text-purple-400">{cs.supportedFormFactors.join(', ')}</span></p>
                        </div>
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <p className="text-amber-400 font-bold text-xl">{cs.price} zł</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* 9. PSU */}
          <AnimatePresence>
            {selectedCase && (
              <motion.section id="step-psu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="bg-blue-900/20 border border-blue-900/50 p-8 rounded-3xl overflow-hidden scroll-mt-24">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-200">9. Zasilacz (TDP: {totalWattage}W)</h2>
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold">Zalecana moc: min. {Math.round(recommendedPsuWattage)}W</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {hardwareState.psus.map(psu => {
                    const isEnough = psu.wattage >= recommendedPsuWattage;
                    return (
                      <div 
                        key={psu.id} 
                        onClick={() => isEnough && handlePsuSelect(psu)} 
                        className={`p-5 rounded-2xl border-2 text-left transition relative flex flex-col justify-between ${!isEnough ? 'border-red-900/30 bg-red-950/20 opacity-50 cursor-not-allowed' : selectedPsu?.id === psu.id ? 'border-orange-500 bg-orange-500/10 cursor-pointer' : 'border-gray-800 bg-gray-900 hover:border-gray-600 cursor-pointer'}`}
                      >
                        <div>
                          {selectedPsu?.id === psu.id && <span className="absolute top-4 right-4 text-orange-500 text-xs font-bold bg-orange-900/40 px-2 py-1 rounded">Wybrano</span>}
                          <p className="font-bold text-lg pr-20 leading-tight mb-1">{psu.name}</p>
                          <p className={`text-xs mt-1 ${!isEnough ? 'text-red-400' : 'text-gray-400'}`}>{!isEnough ? 'Za słaby zasilacz!' : `Zapas: +${Math.floor(psu.wattage - totalWattage)}W`}</p>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                          <p className="text-orange-400 font-bold text-xl">{psu.price} zł</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* PRAWA KOLUMNA: PODSUMOWANIE */}
        <div className="lg:sticky lg:top-24 h-fit flex flex-col space-y-6 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto scrollbar-none">
          
          {/* WIDŻET FPS */}
          <AnimatePresence>
            {fpsEstimates && selectedCpu && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="bg-gray-900 border border-emerald-500/20 p-6 rounded-3xl shadow-xl flex-shrink-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Wydajność w grach
                  </h3>
                  <div className="flex bg-gray-950 p-1 rounded-xl border border-gray-800 text-xs">
                    {(['1080p', '1440p', '4K'] as const).map(res => (
                      <button key={res} onClick={() => setResolution(res)} className={`px-2 py-1 rounded-lg font-bold transition-all ${resolution === res ? 'bg-emerald-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}>
                        {res}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-gray-950/40 p-3 rounded-xl border border-gray-800/60">
                    <span className="text-sm text-gray-400">Cyberpunk 2077 (High)</span>
                    <span className="text-md font-black text-emerald-400">{fpsEstimates.cyberpunk} FPS</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-950/40 p-3 rounded-xl border border-gray-800/60">
                    <span className="text-sm text-gray-400">Counter-Strike 2 (Ultra)</span>
                    <span className="text-md font-black text-green-400">{fpsEstimates.cs2} FPS</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-950/40 p-3 rounded-xl border border-gray-800/60">
                    <span className="text-sm text-gray-400">Wiedźmin 4 (Szacowane)</span>
                    <span className="text-md font-black text-teal-400">{fpsEstimates.witcher} FPS</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ASYSTENT */}
          <AnimatePresence>
            {systemAlerts.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-gray-900 border border-gray-800 p-5 rounded-3xl space-y-3 flex-shrink-0">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Asystent Kompatybilności</h4>
                {systemAlerts.map((alert, idx) => (
                  <p key={idx} className={`text-xs leading-relaxed p-3 rounded-xl border ${alert.type === 'warning' ? 'bg-yellow-500/5 border-yellow-500/20 text-yellow-300' : 'bg-blue-500/5 border-blue-500/20 text-blue-300'}`}>
                    {alert.text}
                  </p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* KOSZYK */}
          <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-2xl relative flex-shrink-0">
            <h3 className="text-xl font-bold mb-6 border-b border-gray-800 pb-4">Koszyk Zestawu</h3>
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between"><span>Platforma:</span><span className="font-bold text-gray-300">{selectedBrand || '---'}</span></div>
              <div className="flex justify-between items-start">
                <span>CPU:</span>
                <div className="text-right">
                  <span className="font-medium text-blue-400">{selectedCpu?.name || '---'}</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <span>Chłodzenie:</span>
                <div className="text-right">
                  <span className="font-medium text-cyan-400">{selectedCooler?.name || '---'}</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <span>Płyta główna:</span>
                <div className="text-right">
                  <span className="font-medium text-purple-400">{selectedMb?.name || '---'}</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <span>RAM:</span>
                <div className="text-right">
                  <span className="font-medium text-green-400">{selectedRam?.name || '---'}</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <span>Dysk:</span>
                <div className="text-right">
                  <span className="font-medium text-yellow-500">{selectedStorage?.name || '---'}</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <span>GPU:</span>
                <div className="text-right">
                  <span className="font-medium text-emerald-400">{selectedGpu?.name || '---'}</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <span>Obudowa:</span>
                <div className="text-right">
                  <span className="font-medium text-amber-400">{selectedCase?.name || '---'}</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <span>Zasilacz:</span>
                <div className="text-right">
                  <span className="font-medium text-orange-400">{selectedPsu?.name || '---'}</span>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-800">
              <div className="flex justify-between items-end mb-6">
                <span className="text-gray-400">Razem:</span>
                <span className="text-4xl font-black text-white">{totalPrice.toLocaleString('pl-PL')} zł</span>
              </div>
              <button 
                onClick={handleSavePDF}
                className={`w-full py-4 rounded-2xl font-black ${selectedPsu ? 'bg-white text-black hover:bg-gray-200 cursor-pointer' : 'bg-gray-800 text-gray-600 cursor-not-allowed'}`}
              >
                ZAPISZ PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}