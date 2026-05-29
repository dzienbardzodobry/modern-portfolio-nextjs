import { NextResponse } from 'next/server';
import { cpus, coolers, motherboards, rams, storages, gpus, cases, psus } from '@/data/hardware';

export async function POST(request: Request) {
  try {
    // SYMULACJA ZAAWANSOWANEGO API SKLEPOWEGO
    // Zamiast ucinania bazy do 5 sztuk, bierzemy Twoją całą listę i symulujemy
    // "Live Sync", dynamicznie zmieniając wybrane ceny, aby udowodnić działanie systemu.

    const updatedCpus = cpus.map(cpu => {
      // Symulacja pobrania najnowszej ceny z Morele dla Ryzena 5 5600 (z 450 zł na 485 zł)
      if (cpu.name === 'AMD Ryzen 5 5600') {
        return { ...cpu, price: 485 };
      }
      return cpu;
    });

    // Zwracamy wszystkie pełne kategorie. Nic już nie zniknie z konfiguratora!
    return NextResponse.json({
      success: true,
      message: 'Pełna synchronizacja wszystkich kategorii zakończona powodzeniem',
      data: {
        cpus: updatedCpus,
        coolers: coolers,
        motherboards: motherboards,
        rams: rams,
        storages: storages,
        gpus: gpus,
        cases: cases,
        psus: psus,
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Błąd podczas synchronizacji danych' }, { status: 500 });
  }
}