"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Terminal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [history, setHistory] = useState<string[]>(['Witaj w terminalu Jakuba. Wpisz "help" aby zobaczyć dostępne komendy.']);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  const handleCommand = (cmd: string) => {
    const c = cmd.toLowerCase().trim();
    let response = '';

    switch (c) {
      case 'help': response = 'Dostępne komendy: skills, projects, kontakt, clear, build-pc'; break;
      case 'skills': response = 'Stack: Next.js, Kotlin, Firebase, React, Tailwind, Spring Boot.'; break;
      case 'projects': response = 'PC Configurator, EcoFridge, Catering System.'; break;
      case 'kontakt': response = 'Napisz na: jszewczyk728@gmail.com'; break;
      case 'build-pc': response = 'Uruchamiam konfigurator... (przekierowuję)'; window.location.href = '/konfigurator'; break;
      case 'clear': setHistory([]); return;
      default: response = `Nieznana komenda: ${c}. Wpisz "help".`;
    }
    setHistory(prev => [...prev, `> ${cmd}`, response]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
          className="fixed bottom-0 left-0 w-full h-80 bg-black/90 border-t border-gray-800 z-[100] p-6 font-mono text-sm"
        >
          <button onClick={onClose} className="absolute top-2 right-4 text-gray-500 hover:text-white">✕ Zamknij</button>
          <div className="h-60 overflow-y-auto mb-4 space-y-1">
            {history.map((line, i) => <div key={i} className={line.startsWith('>') ? 'text-blue-400' : 'text-gray-300'}>{line}</div>)}
            <div ref={bottomRef} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleCommand(input); setInput(''); }}>
            <span className="text-green-500 mr-2">jakub@portfolio:~$</span>
            <input 
              autoFocus
              className="bg-transparent outline-none text-white w-2/3"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}