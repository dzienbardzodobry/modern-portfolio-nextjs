"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  // --- DETEKCJA SCROLLOWANIA STRONY ---
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- STANY DLA FORMULARZA KONTAKTOWEGO (POPUP MODAL) ---
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // --- STAN INTERAKTYWNEGO KALKULATORA WYCENY ---
  const [calcService, setCalcService] = useState<'web' | 'mobile' | 'both'>('web');
  const [includeAI, setIncludeAI] = useState<boolean>(false);
  const [includeCMS, setIncludeCMS] = useState<boolean>(false);
  const [speedType, setSpeedType] = useState<'standard' | 'express'>('standard');

  // --- REALIZACJA INFINITE MARQUEE (TECH STACK) ---
  const techStack = [
    'Next.js', 'Kotlin', 'Firebase', 'Tailwind CSS', 
    'TypeScript', 'React', 'Jetpack Compose', 'Android SDK', 
    'Node.js', 'Framer Motion', 'Git', 'REST API'
  ];

  // --- LOGIKA KALKULATORA WYCENY ---
  const projectEstimate = useMemo(() => {
    let basePrice = 0;
    let baseDays = 0;

    if (calcService === 'web') { basePrice = 2500; baseDays = 10; }
    else if (calcService === 'mobile') { basePrice = 4500; baseDays = 18; }
    else { basePrice = 6500; baseDays = 25; }

    if (includeAI) { basePrice += 1500; baseDays += 5; }
    if (includeCMS) { basePrice += 800; baseDays += 3; }
    
    if (speedType === 'express') {
      basePrice = Math.round(basePrice * 1.3);
      baseDays = Math.max(3, Math.round(baseDays * 0.6));
    }

    return { price: basePrice, days: baseDays };
  }, [calcService, includeAI, includeCMS, speedType]);

  // --- FUNKCJA OTWIERAJĄCA MODAL Z AUTO-TEKSTEM ---
  const openContactModal = (initialText: string) => {
    setFormData(prev => ({ ...prev, message: initialText }));
    setIsModalOpen(true);
  };

  // --- OBSŁUGA WYSYŁKI MAILA (MAILTO) ---
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailTo = "jszewczyk728@gmail.com";
    const subject = encodeURIComponent(`Wycena projektu - ${formData.name}`);
    const body = encodeURIComponent(
      `Cześć Jakub,\n\nNazywam się ${formData.name}.\nMoje dane kontaktowe: ${formData.email}\n\nSzczegóły wiadomości:\n${formData.message}`
    );
    
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white font-sans overflow-x-hidden scroll-smooth">
      
      {/* STABILNY: Przyczepiany pasek nawigacji bez skoków interfejsu */}
      <nav className={`flex justify-between items-center px-6 md:px-10 border-b border-gray-900 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-950/95 py-4 shadow-lg shadow-black/50' : 'bg-gray-950/80 py-6'
      }`}>
        <div className="text-xl font-bold tracking-wider select-none">
          Jakub Szewczyk<span className="text-blue-500">.</span>
        </div>

        <div className="space-x-6 text-gray-400 hidden md:flex items-center">
          <Link href="#portfolio" className="hover:text-white transition">Portfolio</Link>
          <Link href="#uslugi" className="hover:text-white transition">Usługi</Link>
          <Link href="#kalkulator" className="hover:text-white transition">Wycena Live</Link>
          <Link href="#cennik" className="hover:text-white transition">Cennik</Link>
          <Link href="/kreator-formularzy" className="hover:text-purple-400 text-purple-500 transition font-semibold">Kreator UI</Link>
          <Link href="/konfigurator" className="hover:text-blue-400 text-blue-500 transition font-semibold bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">Konfigurator PC</Link>
          
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold px-3 py-1 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.05)]">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Wolne terminy: Czerwiec 2026
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center justify-center text-center py-32 px-4 relative min-h-[80vh]"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight">
          Tworzę <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">nowoczesne</span> <br /> aplikacje i strony WWW
        </h1>
        <p className="text-base md:text-lg text-gray-400 max-w-2xl mb-10">
          Od wydajnych aplikacji mobilnych po zaawansowane systemy webowe. 
          Zamieniam skomplikowane pomysły w czysty, intuicyjny gotowy kod.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => openContactModal("Cześć Jakub! Chcę porozmawiać o nowym projekcie WWW lub aplikacji mobilnej.")}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition shadow-lg shadow-blue-600/30 cursor-pointer text-center"
          >
            Oblicz koszt projektu
          </button>
          <Link href="/konfigurator" className="w-full sm:w-auto">
            <button className="w-full border border-gray-700 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-3 rounded-full font-semibold transition bg-gray-900/50 backdrop-blur-sm cursor-pointer">
              Zobacz aplikację PC Builder
            </button>
          </Link>
        </div>
      </motion.section>

      {/* AKTYWNY PASEK TECHNOLOGII (INFINITE MARQUEE EFFECT) */}
      <section className="py-6 bg-gray-900/40 border-y border-gray-900/60 relative overflow-hidden flex items-center select-none">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none"></div>
        
        <motion.div 
          className="flex whitespace-nowrap gap-12 text-sm font-bold tracking-widest text-gray-500 uppercase"
          animate={{ x: [0, -1000] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {techStack.concat(techStack).map((tech, idx) => (
            <span key={idx} className="flex items-center gap-3 hover:text-blue-400 transition cursor-default">
              <span>{tech}</span>
              <span className="text-blue-500/30 font-light">•</span>
            </span>
          ))}
        </motion.div>
      </section>

      {/* ZBALANSOWANA: Sekcja Portfolio / Projekty (Układ 3-kolumnowy z Symulatorem) */}
      <section id="portfolio" className="py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Wybrane Realizacje</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Zobacz zaawansowane aplikacje i systemy, które zaprojektowałem i wdrożyłem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* PROJEKT 1: System Cateringu ze Spring Boot + SYMULATOR LIVE */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900/40 border border-gray-800 hover:border-orange-500/40 p-6 rounded-3xl transition duration-500 group flex flex-col justify-between"
            >
              <div>
                <CateringSimulator />
                <div className="flex justify-between items-center mt-5 mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition">System Obsługi Kateringu</h3>
                  <span className="text-[10px] font-bold uppercase bg-orange-500/10 text-orange-400 px-2.5 py-0.5 rounded-full border border-orange-500/20">Full-Stack</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  Kompleksowy system stworzony zespołowo do zarządzania zamówieniami, logistyką i dietami. Backend w Spring Boot zabezpieczony tokenami JWT kontroluje uprawnienia klientów, menedżerów oraz sekcji kuchni.
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  <span className="bg-gray-950 text-gray-500 text-[11px] px-2.5 py-0.5 rounded border border-gray-900">Spring Boot</span>
                  <span className="bg-gray-950 text-gray-500 text-[11px] px-2.5 py-0.5 rounded border border-gray-900">React</span>
                  <span className="bg-gray-950 text-gray-500 text-[11px] px-2.5 py-0.5 rounded border border-gray-900">SpringSecurity</span>
                  <span className="bg-gray-950 text-gray-500 text-[11px] px-2.5 py-0.5 rounded border border-gray-900">SQL</span>

                </div>
                <a 
                  href="https://github.com/jakub-szewczyk/jakub-szewczyk/tree/main/Projekt%20Katering.rar" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-xs font-bold text-orange-400 hover:text-orange-300 gap-1 group/link"
                >
                  Zobacz kod źródłowy <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </motion.div>

            {/* PROJEKT 2: Konfigurator Komputerowy */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900/40 border border-gray-800 hover:border-blue-500/40 p-6 rounded-3xl transition duration-500 group flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-44 rounded-2xl mb-5 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-gray-800 flex items-center justify-center relative overflow-hidden group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition duration-500">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:22px_22px] opacity-20"></div>
                  <span className="text-4xl group-hover:scale-110 transition duration-500">🖥️</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">PC Configurator</h3>
                  <span className="text-[10px] font-bold uppercase bg-blue-500/10 text-blue-400 px-2.5 py-0.5 rounded-full border border-blue-500/20">System Web</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  Narzędzie webowe z algorytmem sprawdzania kompatybilności podzespołów w locie. Wyposażone w dynamiczne filtry, kalkulator bottlenecku CPU/GPU oraz estymator klatek na sekundę (FPS).
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  <span className="bg-gray-950 text-gray-500 text-[11px] px-2.5 py-0.5 rounded border border-gray-900">Next.js</span>
                  <span className="bg-gray-950 text-gray-500 text-[11px] px-2.5 py-0.5 rounded border border-gray-900">Tailwind</span>
                </div>
                <Link href="/konfigurator" className="inline-flex items-center text-xs font-bold text-blue-400 hover:text-blue-300 gap-1 group/link">
                  Uruchom aplikację <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </motion.div>

            {/* PROJEKT 3: Kreator Formularzy */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900/40 border border-gray-800 hover:border-purple-500/40 p-6 rounded-3xl transition duration-500 group flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-44 rounded-2xl mb-5 bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-gray-800 flex items-center justify-center relative overflow-hidden group-hover:from-purple-600/30 group-hover:to-pink-600/30 transition duration-500">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:22px_22px] opacity-20"></div>
                  <span className="text-4xl group-hover:scale-110 transition duration-500">🛠️</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition">UI Form Builder</h3>
                  <span className="text-[10px] font-bold uppercase bg-purple-500/10 text-purple-400 px-2.5 py-0.5 rounded-full border border-purple-500/20">Aplikacja Web</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  Zaawansowany kreator formularzy czasu rzeczywistego. Pozwala na konfigurację struktury pól, etykiet, motywów CSS oraz automatyczny eksport czystej architektury danych do plików JSON i kodu React.
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  <span className="bg-gray-950 text-gray-500 text-[11px] px-2.5 py-0.5 rounded border border-gray-900">React</span>
                  <span className="bg-gray-950 text-gray-500 text-[11px] px-2.5 py-0.5 rounded border border-gray-900">TypeScript</span>
                </div>
                <Link href="/kreator-formularzy" className="inline-flex items-center text-xs font-bold text-purple-400 hover:text-purple-300 gap-1 group/link">
                  Wypróbuj kreator sam <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </motion.div>

            {/* PROJEKT 4: EcoFridge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900/40 border border-gray-800 hover:border-green-500/40 p-6 rounded-3xl transition duration-500 group flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-44 rounded-2xl mb-5 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-gray-800 flex items-center justify-center relative overflow-hidden group-hover:from-emerald-600/30 group-hover:to-teal-600/30 transition duration-500">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
                  <span className="text-4xl group-hover:scale-110 transition duration-500">📱</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition">EcoFridge App</h3>
                  <span className="text-[10px] font-bold uppercase bg-green-500/10 text-green-400 px-2.5 py-0.5 rounded-full border border-green-500/20">Google Play</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  Inteligentny, natywny program mobilny wspierający zarządzanie żywnością. Oferuje system inwentaryzacji domowej lodówki, powiadomienia o terminach przydatności oraz analizator zdjęć oparty na modelach sztucznej inteligencji.
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  <span className="bg-gray-950 text-gray-500 text-[11px] px-2.5 py-0.5 rounded border border-gray-900">Kotlin</span>
                  <span className="bg-gray-950 text-gray-500 text-[11px] px-2.5 py-0.5 rounded border border-gray-900">Firebase</span>
                </div>
                <span className="text-[11px] text-gray-500 italic">Etap: Testy produkcyjne</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Sekcja Usługi */}
      <section id="uslugi" className="py-24 px-6 md:px-10 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Oferta Współpracy</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Projektuję i wdrażam oprogramowanie biznesowe oraz konsumenckie jako niezależny deweloper.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '📱', title: 'Aplikacje Mobilne Android', desc: 'Natywne rozwiązania mobilne w języku Kotlin. Wykorzystuję najnowsze standardy Jetpack Compose gwarantujące lekkość i idealną płynność interfejsu.' },
              { icon: '💻', title: 'Systemy i Strony WWW', desc: 'Szybkie, responsywne aplikacje webowe oparte na React i Next.js. Pełna optymalizacja kodu pod kątem SEO, szybkości ładowania oraz UX/UI.' },
              { icon: '⚙️', title: 'Dedykowana Logika & AI', desc: 'Automatyzacja procesów, integracje modeli LLM/Sztucznej Inteligencji oraz programowanie zaawansowanych algorytmów (np. kalkulatory wycen).' }
            ].map((service, index) => (
              <div 
                key={index}
                className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:bg-gray-900/80 hover:border-gray-700 transition duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERAKTYWNY KALKULATOR PROJEKTÓW */}
      <section id="kalkulator" className="py-24 px-6 md:px-10 bg-gray-900/20 border-t border-gray-900">
        <div className="max-w-4xl mx-auto bg-gray-900/80 border border-gray-800 p-6 md:p-10 rounded-3xl shadow-2xl relative">
          <div className="absolute top-0 right-10 -translate-y-1/2 bg-blue-600 text-white text-xs uppercase tracking-widest font-black px-4 py-1.5 rounded-full border border-blue-400/30">
            Narzędzie Live
          </div>
          
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black mb-2">Interaktywny Asystent Wyceny</h2>
            <p className="text-sm text-gray-400">Zaznacz kryteria, aby błyskawicznie sprawdzić orientacyjny budżet Twojego projektu.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">1. Typ Oprogramowania</label>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'web', text: 'Strona / Aplikacja WWW' },
                    { id: 'mobile', text: 'Natywna Aplikacja Android' },
                    { id: 'both', text: 'Zestaw Web + Mobile' },
                  ].map((opt) => (
                    <button 
                      key={opt.id} 
                      onClick={() => setCalcService(opt.id as any)}
                      className={`text-left p-3 text-sm rounded-xl border font-semibold transition ${calcService === opt.id ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-gray-950/60 border-gray-800 text-gray-400 hover:border-gray-700'}`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">2. Funkcje Dodatkowe</label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 text-sm bg-gray-950/60 border border-gray-800 rounded-xl cursor-pointer hover:border-gray-700 select-none">
                    <span>Integracja z AI / Modele Językowe</span>
                    <input type="checkbox" checked={includeAI} onChange={e => setIncludeAI(e.target.checked)} className="w-4 h-4 accent-blue-500" />
                  </label>
                  <label className="flex items-center justify-between p-3 text-sm bg-gray-950/60 border border-gray-800 rounded-xl cursor-pointer hover:border-gray-700 select-none">
                    <span>Dedykowany panel zarządzania (CMS)</span>
                    <input type="checkbox" checked={includeCMS} onChange={e => setIncludeCMS(e.target.checked)} className="w-4 h-4 accent-blue-500" />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">3. Tryb Pracy</label>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setSpeedType('standard')} className={`p-3 text-xs rounded-xl border font-bold transition ${speedType === 'standard' ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-gray-950/60 border-gray-800 text-gray-400'}`}>Standardowy</button>
                </div>
              </div>
            </div>

            <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-6 flex flex-col justify-between text-center md:text-left">
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-4">Szacunkowy Wynik</span>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-gray-400 block">Wartość inwestycji od:</span>
                    <span className="text-4xl font-black text-blue-500">{projectEstimate.price.toLocaleString('pl-PL')} zł</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Czas budowy około:</span>
                    <span className="text-xl font-bold text-white">{projectEstimate.days} dni roboczych</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-900 mt-6">
                <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">Kalkulacja ma charakter poglądowy. Każdy projekt wyceniam indywidualnie po omówieniu szczegółów.</p>
                <button 
                  onClick={() => openContactModal(
                    `Siemanko! Wyklikałem projekt w Twoim asystencie wyceny.\n\n` +
                    `- Typ: ${calcService === 'web' ? 'Aplikacja/Strona WWW' : calcService === 'mobile' ? 'Aplikacja Android' : 'Zestaw Web + Mobile'}\n` +
                    `- Integracja z AI: ${includeAI ? 'Tak' : 'Nie'}\n` +
                    `- Panel CMS: ${includeCMS ? 'Tak' : 'Nie'}\n` +
                    `- Szacowany koszt zestawu: od ${projectEstimate.price} zł\n\n` +
                    `Chciałbym omówić szczegóły i podziałać wspólnie przy tym temacie!`
                  )}
                  className="w-full bg-white text-black font-black py-3 rounded-xl hover:bg-gray-200 transition text-sm cursor-pointer block text-center"
                >
                  Zapytaj o szczegóły
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CENNIK USŁUG */}
      <section id="cennik" className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Pakiety i Cennik</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Przejrzyste zasady rozliczeń. Wybierz fundament pod swój przyszły produkt.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Pakiet 1 */}
            <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-300 mb-2">Landing Page / Wizytówka</h3>
                <p className="text-xs text-gray-500 mb-6">Dla firm szukających nowoczesnej prezentacji oferty.</p>
                <div className="text-3xl font-black mb-6">od 1 900 zł</div>
                <ul className="space-y-3 text-sm text-gray-400 border-t border-gray-800 pt-6">
                  <li className="flex items-center gap-2">✓ Unikalny design UI/UX</li>
                  <li className="flex items-center gap-2">✓ Optymalizacja pod SEO i Google</li>
                  <li className="flex items-center gap-2">✓ Pełna responsywność (Mobile)</li>
                  <li className="flex items-center gap-2">✓ Integracja formularza kontaktowego</li>
                </ul>
              </div>
              <button 
                onClick={() => openContactModal("Cześć Jakub! Piszę w sprawie realizacji pakietu: Landing Page / Wizytówka (od 1 900 zł). Chętnie omówię szczegóły.")}
                className="mt-8 w-full bg-gray-800 hover:bg-gray-700 text-white text-sm py-2.5 rounded-xl font-bold transition cursor-pointer"
              >
                Wybierz pakiet
              </button>
            </div>

            {/* Pakiet 2 */}
            <div className="bg-gray-900 border-2 border-blue-600 p-8 rounded-3xl flex flex-col justify-between shadow-xl shadow-blue-600/5 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
                Najpopularniejszy
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Dedykowana Aplikacja Web</h3>
                <p className="text-xs text-gray-400 mb-6">Zaawansowane portale, konfiguratory i systemy SaaS.</p>
                <div className="text-3xl font-black text-blue-400 mb-6">od 3 900 zł</div>
                <ul className="space-y-3 text-sm text-gray-300 border-t border-gray-800 pt-6">
                  <li className="flex items-center gap-2 text-blue-400">✓ Wszystko z pakietu Landing</li>
                  <li className="flex items-center gap-2">✓ Architektura React / Next.js</li>
                  <li className="flex items-center gap-2">✓ Panel administratora do zarządzania</li>
                  <li className="flex items-center gap-2">✓ Integracja zewnętrznych baz danych / API</li>
                </ul>
              </div>
              <button 
                onClick={() => openContactModal("Cześć Jakub! Interesuje mnie stworzenie dedykowanej Aplikacji Webowej w budżecie od 3 900 zł. Kiedy znajdziesz chwilę na rozmowę?")}
                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2.5 rounded-xl font-bold transition cursor-pointer"
              >
                Wybierz pakiet
              </button>
            </div>

            {/* Pakiet 3 */}
            <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-300 mb-2">Natywna Aplikacja Android</h3>
                <p className="text-xs text-gray-500 mb-6">Szybkie programy instalowane prosto na smartfonach.</p>
                <div className="text-3xl font-black mb-6">od 4 900 zł</div>
                <ul className="space-y-3 text-sm text-gray-400 border-t border-gray-800 pt-6">
                  <li className="flex items-center gap-2">✓ Czysty kod w języku Kotlin</li>
                  <li className="flex items-center gap-2">✓ Nowoczesne UI w Jetpack Compose</li>
                  <li className="flex items-center gap-2">✓ Integracja z Firebase / Autoryzacja</li>
                  <li className="flex items-center gap-2">✓ Pomoc w publikacji w Google Play</li>
                </ul>
              </div>
              <button 
                onClick={() => openContactModal("Cześć Jakub! Chcę stworzyć dedykowaną, natywną Aplikację Mobilną na system Android w Kotlinie (od 4 900 zł).")}
                className="mt-8 w-full bg-gray-800 hover:bg-gray-700 text-white text-sm py-2.5 rounded-xl font-bold transition cursor-pointer"
              >
                Wybierz pakiet
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Nowoczesna, rozbudowana stopka odcięta od reszty */}
      <footer className="bg-gray-950 border-t border-gray-900 pt-16 pb-8 px-6 md:px-10 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="text-xl font-bold tracking-wider mb-4">Jakub Szewczyk<span className="text-blue-500">.</span></div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Projektuję i koduję wydajne aplikacje mobilne oraz zaawansowane systemy webowe. Łączę technologię z intuicyjnym designem.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Nawigacja</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
              <Link href="#portfolio" className="hover:text-white transition">Portfolio</Link>
              <Link href="#uslugi" className="hover:text-white transition">Usługi</Link>
              <Link href="#kalkulator" className="hover:text-white transition">Wycena Live</Link>
              <Link href="/kreator-formularzy" className="hover:text-purple-400 text-purple-500 transition">Kreator UI</Link>
              <Link href="/konfigurator" className="hover:text-blue-400 text-blue-500 transition">Konfigurator</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Kontakt</h4>
            <p className="text-sm text-gray-400 mb-2">Masz pomysł na aplikację biznesową?</p>
            <button 
              onClick={() => openContactModal("Cześć Jakub, chciałbym porozmawiać o darmowej wycenie mojego pomysłu.")}
              className="text-sm font-bold text-blue-500 hover:text-blue-400 underline transition cursor-pointer"
            >
              jszewczyk728@gmail.com
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-gray-900/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© 2026 Jakub Szewczyk. Wszystkie prawa zastrzeżone.</p>
          <p>Built with Next.js, Tailwind CSS & Framer Motion</p>
        </div>
      </footer>

      {/* Pływająca, animowana strzałka powrotu na górę strony */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-full shadow-xl shadow-blue-600/30 transition cursor-pointer flex items-center justify-center border border-blue-400/20 group"
            title="Przewiń na górę"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-5 h-5 transform group-hover:-translate-y-0.5 transition-transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- MODAL OKIENKO POPUP DLA FORMULARZA KONTAKTOWEGO --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gray-900 border border-gray-800 p-6 md:p-8 rounded-3xl w-full max-w-xl shadow-2xl relative z-10"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition text-xl cursor-pointer"
              >
                ✕
              </button>

              <div className="mb-6">
                <h3 className="text-xl font-black mb-1">Napisz do mnie wiadomość ✉️</h3>
                <p className="text-xs text-gray-400">Twoja wiadomość trafi bezpośrednio na skrzynkę: <span className="text-blue-400 font-semibold">jszewczyk728@gmail.com</span></p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 block mb-1">Twoje Imię / Firma</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="np. Jan Kowalski"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-sm text-white outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 block mb-1">Twój Adres E-mail</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="np. jan@kowalski.pl"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-sm text-white outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 block mb-1">Treść wiadomości</label>
                  <textarea 
                    rows={6}
                    required
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-sm text-white outline-none focus:border-blue-500 transition resize-none leading-relaxed"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition text-sm cursor-pointer shadow-lg shadow-blue-600/20"
                >
                  Otwórz w aplikacji pocztowej →
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}

// --- POMOCNICZY KOMPONENT SYMULATORA CATERINGU ---
function CateringSimulator() {
  const [step, setStep] = useState<number>(0);

  const stepsInfo = [
    { label: "⚛️ React Frontend", desc: "Użytkownik klika: 'Zamów dietę 2500 kcal' i wysyła zapytanie POST." },
    { label: "🛡️ Spring Security", desc: "Filtr przechwytuje żądanie, sprawdza poprawność tokenu Bearer JWT." },
    { label: "🍃 Spring Boot Backend", desc: "Kontroler przetwarza logikę biznesową i przelicza makroskładniki." },
    { label: "🗄️ Baza Danych (SQL)", desc: "Hibernate wykonuje transakcję: Zapisanie zamówienia ze statusem PAID." }
  ];

  return (
    <div className="w-full h-44 rounded-2xl bg-gray-950 border border-gray-800 p-4 flex flex-col justify-between relative overflow-hidden select-none">
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] uppercase font-black tracking-widest text-orange-500">Symulator architektury API</span>
          <span className="text-[10px] text-gray-600 font-mono">Krok {step + 1}/4</span>
        </div>
        
        <div className="mt-2">
          <h4 className="text-xs font-bold text-white transition-all">{stepsInfo[step].label}</h4>
          <p className="text-[11px] text-gray-400 leading-normal mt-1 min-h-[36px]">{stepsInfo[step].desc}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-300 ${
                i <= step ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]' : 'bg-gray-800'
              }`}
            />
          ))}
        </div>

        <button 
          onClick={(e) => {
            e.preventDefault();
            setStep((prev) => (prev + 1) % 4);
          }}
          className="w-full py-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 text-[11px] font-bold rounded-lg text-gray-300 transition text-center cursor-pointer"
        >
          {step === 3 ? "Resetuj i zacznij od nowa ↺" : "Symuluj kolejny krok potoku →"}
        </button>
      </div>
    </div>
  );
}