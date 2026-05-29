"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'textarea';
  label: string;
  placeholder: string;
  required: boolean;
}

export default function FormBuilderPage() {
  // --- STAN USTAWIEŃ GŁÓWNYCH FORMULARZA ---
  const [formSettings, setFormSettings] = useState({
    title: 'Napisz do nas!',
    description: 'Odpowiadamy w ciągu 24 godzin.',
    buttonText: 'Wyślij wiadomość',
    theme: 'blue', 
    radius: 'rounded-xl', 
  });

  // --- STAN DYNAMICZNEJ LISTY PÓL FORMULARZA ---
  const [fields, setFields] = useState<FormField[]>([
    { id: 'f_name', type: 'text', label: 'Imię i nazwisko', placeholder: 'np. Jan Kowalski', required: true },
    { id: 'f_email', type: 'email', label: 'Adres E-mail', placeholder: 'np. jan@kowalski.pl', required: true },
    { id: 'f_message', type: 'textarea', label: 'Treść wiadomości', placeholder: 'Opisz swój pomysł...', required: true },
  ]);

  const [activeExportTab, setActiveExportTab] = useState<'preview' | 'json' | 'html'>('preview');
  const [copied, setCopied] = useState<boolean>(false);

  // --- FUNKCJE ZARZĄDZANIA KOLEJNOŚCIĄ I STRUKTURĄ ---
  const addField = () => {
    const newId = `field_${Date.now()}`;
    const newField: FormField = {
      id: newId,
      type: 'text',
      label: 'Nowe pole',
      placeholder: 'Wpisz wartość...',
      required: false
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const updateField = (id: string, key: keyof FormField, value: any) => {
    setFields(fields.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  const moveField = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === fields.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedFields = [...fields];
    const temp = updatedFields[index];
    updatedFields[index] = updatedFields[targetIndex];
    updatedFields[targetIndex] = temp;
    setFields(updatedFields);
  };

  // --- MAPOWANIE MOTYWÓW GRAFICZNYCH ---
  const currentThemeStyles = useMemo(() => {
    switch (formSettings.theme) {
      case 'purple':
        return { text: 'text-purple-400', border: 'border-purple-500', bg: 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/20', glow: 'bg-purple-500', accent: 'accent-purple-500' };
      case 'emerald':
        return { text: 'text-emerald-400', border: 'border-emerald-500', bg: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20', glow: 'bg-emerald-500', accent: 'accent-emerald-500' };
      case 'orange':
        return { text: 'text-orange-400', border: 'border-orange-500', bg: 'bg-orange-600 hover:bg-orange-700 shadow-orange-600/20', glow: 'bg-orange-500', accent: 'accent-orange-500' };
      case 'rose':
        return { text: 'text-rose-400', border: 'border-rose-500', bg: 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20', glow: 'bg-rose-500', accent: 'accent-rose-500' };
      default: 
        return { text: 'text-blue-400', border: 'border-blue-500', bg: 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20', glow: 'bg-blue-500', accent: 'accent-blue-500' };
    }
  }, [formSettings.theme]);

  // --- GENERATOR KODU HTML/TAILWIND ---
  const generatedHtmlCode = useMemo(() => {
    return `<div class="bg-gray-900 border border-gray-800 p-8 ${formSettings.radius} max-w-md w-full">
  <h3 class="text-xl font-bold text-white mb-1">${formSettings.title}</h3>
  <p class="text-xs text-gray-400 mb-6">${formSettings.description}</p>
  <form class="space-y-4">
${fields.map(f => `    <div>
      <label class="text-xs font-semibold text-gray-400 block mb-1">${f.label}${f.required ? ' *' : ''}</label>
      ${f.type === 'textarea' 
        ? `<textarea placeholder="${f.placeholder}" class="w-full bg-gray-950 border border-gray-800 ${formSettings.radius} p-3 text-sm text-white outline-none focus:border-blue-500" rows="4"></textarea>`
        : `<input type="${f.type === 'phone' ? 'tel' : f.type}" placeholder="${f.placeholder}" class="w-full bg-gray-950 border border-gray-800 ${formSettings.radius} p-3 text-sm text-white outline-none focus:border-blue-500" />`
      }
    </div>`).join('\n')}
    <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 ${formSettings.radius} text-sm transition-all duration-300">
      ${formSettings.buttonText}
    </button>
  </form>
</div>`;
  }, [formSettings, fields]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white font-sans p-6 md:p-12 pb-32">
      
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-12">
        <Link href="/" className="text-gray-500 hover:text-blue-400 transition font-semibold flex items-center gap-2">
          ← Wróć do portfolio
        </Link>
        <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
          Kreator No-Code Live
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEWA KOLUMNA: PANEL STEROWANIA */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-3xl space-y-6">
            <div>
              <h1 className="text-2xl font-black mb-1">UI Form Builder</h1>
              <p className="text-xs text-gray-400">Zmieniaj kolejność pól, typy elementów i generuj kod strukturalny.</p>
            </div>

            <hr className="border-gray-800" />

            {/* Teksty */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500">1. Nagłówki i teksty</h3>
              <div>
                <label className="text-[11px] text-gray-400 font-bold uppercase block mb-1">Tytuł formularza</label>
                <input type="text" value={formSettings.title} onChange={e => setFormSettings({ ...formSettings, title: e.target.value })} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-sm outline-none focus:border-gray-700" />
              </div>
              <div>
                <label className="text-[11px] text-gray-400 font-bold uppercase block mb-1">Krótki opis</label>
                <input type="text" value={formSettings.description} onChange={e => setFormSettings({ ...formSettings, description: e.target.value })} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-sm outline-none focus:border-gray-700" />
              </div>
              <div>
                <label className="text-[11px] text-gray-400 font-bold uppercase block mb-1">Tekst na przycisku</label>
                <input type="text" value={formSettings.buttonText} onChange={e => setFormSettings({ ...formSettings, buttonText: e.target.value })} className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-sm outline-none focus:border-gray-700" />
              </div>
            </div>

            {/* Wygląd */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500">2. Motyw i Kształt (UI)</h3>
              <div>
                <label className="text-[11px] text-gray-400 font-bold uppercase block mb-2">Paleta kolorów</label>
                <div className="grid grid-cols-5 gap-2">
                  {['blue', 'purple', 'emerald', 'orange', 'rose'].map(themeId => (
                    <button 
                      key={themeId} 
                      onClick={() => setFormSettings({ ...formSettings, theme: themeId })}
                      className={`h-8 rounded-lg cursor-pointer transition ${
                        themeId === 'blue' ? 'bg-blue-600' : themeId === 'purple' ? 'bg-purple-600' : themeId === 'emerald' ? 'bg-emerald-600' : themeId === 'orange' ? 'bg-orange-600' : 'bg-rose-600'
                      } ${formSettings.theme === themeId ? 'ring-2 ring-white scale-105' : 'opacity-60 hover:opacity-100'}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] text-gray-400 font-bold uppercase block mb-2">Zaokrąglenie krawędzi</label>
                <div className="grid grid-cols-3 gap-2">
                  {[{ id: 'rounded-none', text: 'Ostre (0px)' }, { id: 'rounded-xl', text: 'Standard' }, { id: 'rounded-3xl', text: 'Okrągłe' }].map(r => (
                    <button key={r.id} onClick={() => setFormSettings({ ...formSettings, radius: r.id })} className={`py-2 px-1 text-xs rounded-xl border font-semibold text-center transition cursor-pointer ${formSettings.radius === r.id ? 'border-white bg-white/5 text-white' : 'border-gray-800 text-gray-500 bg-transparent'}`}>{r.text}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* ULEPSZONA: Sekcja zarządzania i sortowania strukturą pól */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500">3. Struktura i kolejność pól</h3>
                <button onClick={addField} className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20 hover:bg-purple-500/20 transition cursor-pointer">+ Dodaj pole</button>
              </div>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-none">
                <AnimatePresence initial={false}>
                  {fields.map((field, index) => (
                    <motion.div 
                      key={field.id} 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-gray-950 border border-gray-800 p-4 rounded-2xl space-y-3 relative group"
                    >
                      <div className="flex justify-between items-center">
                        {/* Kontrolery pozycji przesuwania Up/Down */}
                        <div className="flex items-center gap-1 bg-gray-900 rounded-lg p-0.5 border border-gray-800/60">
                          <button disabled={index === 0} onClick={() => moveField(index, 'up')} className="p-1 text-xs text-gray-400 hover:text-white disabled:opacity-20 disabled:hover:text-gray-400 transition font-mono cursor-pointer">▲</button>
                          <button disabled={index === fields.length - 1} onClick={() => moveField(index, 'down')} className="p-1 text-xs text-gray-400 hover:text-white disabled:opacity-20 disabled:hover:text-gray-400 transition font-mono cursor-pointer">▼</button>
                        </div>

                        <div className="flex items-center gap-2">
                          <select 
                            value={field.type} 
                            onChange={e => updateField(field.id, 'type', e.target.value)}
                            className="bg-gray-900 border border-gray-800 rounded-md text-[10px] uppercase font-bold p-1 text-gray-400 outline-none cursor-pointer"
                          >
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                            <option value="textarea">Textarea</option>
                          </select>
                          <button onClick={() => removeField(field.id)} className="text-[10px] font-bold text-red-500 hover:text-red-400 transition bg-red-500/5 border border-red-500/10 px-2 py-1 rounded-md cursor-pointer">Usuń</button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-[10px] text-gray-600 block mb-0.5 font-bold uppercase">Etykieta</span>
                          <input type="text" value={field.label} onChange={e => updateField(field.id, 'label', e.target.value)} className="w-full bg-gray-900 border border-gray-800 text-xs rounded-lg p-2 text-white outline-none focus:border-gray-700" />
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-600 block mb-0.5 font-bold uppercase">Podpowiedź</span>
                          <input type="text" value={field.placeholder} onChange={e => updateField(field.id, 'placeholder', e.target.value)} className="w-full bg-gray-900 border border-gray-800 text-xs rounded-lg p-2 text-white outline-none focus:border-gray-700" />
                        </div>
                      </div>

                      <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer select-none">
                        <input type="checkbox" checked={field.required} onChange={e => updateField(field.id, 'required', e.target.checked)} className={`w-3.5 h-3.5 ${currentThemeStyles.accent}`} />
                        <span>Pole wymagane</span>
                      </label>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>

        {/* PRAWA KOLUMNA: INTEGRACJA PODGLĄDU ORAZ DYNAMICZNY PODZIAŁ KODU */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex bg-gray-900 rounded-2xl p-1 border border-gray-800 max-w-md">
            {[{ id: 'preview', label: 'Podgląd UI Live' }, { id: 'json', label: 'Konfiguracja JSON' }, { id: 'html', label: 'Kod HTML / Tailwind' }].map((tab) => (
              <button key={tab.id} onClick={() => setActiveExportTab(tab.id as any)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeExportTab === tab.id ? 'bg-gray-950 border border-gray-800 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}>{tab.label}</button>
            ))}
          </div>

          <div className="bg-gray-950 border border-gray-800 p-6 md:p-12 rounded-3xl min-h-[520px] flex flex-col justify-center relative overflow-hidden">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[110px] opacity-10 -z-10 transition-all duration-700 ${currentThemeStyles.glow}`} />

            <AnimatePresence mode="wait">
              {activeExportTab === 'preview' && (
                <motion.div 
                  key="view-preview" 
                  initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                  className="max-w-md w-full mx-auto bg-gray-900 border border-gray-800/80 p-8 shadow-2xl relative"
                  style={{ borderRadius: formSettings.radius === 'rounded-none' ? '0px' : formSettings.radius === 'rounded-xl' ? '12px' : '24px' }}
                >
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-1">{formSettings.title || '---'}</h3>
                    <p className="text-xs text-gray-400">{formSettings.description || '---'}</p>
                  </div>

                  <form onSubmit={e => e.preventDefault()} className="space-y-4">
                    <AnimatePresence initial={false}>
                      {fields.map((f) => (
                        <motion.div 
                          key={f.id} 
                          layout
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                          className="space-y-1"
                        >
                          <label className="text-[11px] font-semibold text-gray-400 block">
                            {f.label || 'Pole bez nazwy'} {f.required && <span className={currentThemeStyles.text}>*</span>}
                          </label>
                          {f.type === 'textarea' ? (
                            <textarea disabled placeholder={f.placeholder} rows={4} className={`w-full bg-gray-950 border border-gray-800 text-xs text-gray-400 p-3 outline-none pointer-events-none ${formSettings.radius}`} />
                          ) : (
                            <input type={f.type === 'phone' ? 'tel' : f.type} disabled placeholder={f.placeholder} className={`w-full bg-gray-950 border border-gray-800 text-xs text-gray-400 p-3 outline-none pointer-events-none ${formSettings.radius}`} />
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    <button disabled className={`w-full py-3.5 font-bold text-xs uppercase tracking-wider mt-2 border text-white shadow-lg shadow-black/40 cursor-not-allowed transition-all duration-300 ${formSettings.radius} ${currentThemeStyles.bg}`}>
                      {formSettings.buttonText || 'Wyślij'}
                    </button>
                  </form>
                </motion.div>
              )}

              {activeExportTab === 'json' && (
                <motion.div key="view-json" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full h-full flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Struktura danych form.json</span>
                    <button onClick={() => copyToClipboard(JSON.stringify({ settings: formSettings, schema: fields }, null, 2))} className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/20 hover:bg-blue-500/20 transition cursor-pointer">{copied ? '⚙️ Skopiowano!' : '📋 Kopiuj JSON'}</button>
                  </div>
                  <pre className="w-full bg-gray-900 border border-gray-800/80 p-5 rounded-2xl text-[11px] text-purple-300 font-mono overflow-x-auto max-h-[380px]">{JSON.stringify({ settings: formSettings, schema: fields }, null, 2)}</pre>
                </motion.div>
              )}

              {activeExportTab === 'html' && (
                <motion.div key="view-html" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full h-full flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Kod HTML z klasami Tailwind CSS</span>
                    <button onClick={() => copyToClipboard(generatedHtmlCode)} className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/20 hover:bg-blue-500/20 transition cursor-pointer">{copied ? '⚙️ Skopiowano!' : '📋 Kopiuj kod HTML'}</button>
                  </div>
                  <pre className="w-full bg-gray-900 border border-gray-800/80 p-5 rounded-2xl text-[11px] text-emerald-300 font-mono overflow-x-auto max-h-[380px] whitespace-pre-wrap">{generatedHtmlCode}</pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </main>
  );
}