import { CPU, Cooler, Motherboard, RAM, Storage, GPU, Case, PSU } from '@/data/hardware';

export interface ScrapedProduct {
  name: string;
  price: number;
  moreleUrl: string;
  spec?: Partial<CPU & GPU & Case & Cooler & Motherboard & RAM & Storage & PSU>;
}

export function synchronizeCategory<T extends { id: string; name: string; price: number; moreleUrl?: string }>(
  currentList: T[],
  scrapedList: ScrapedProduct[],
  defaultTemplate: Partial<T>
): T[] {
  const updatedList: T[] = [];

  scrapedList.forEach((scrapedItem) => {
    // KULOODPORNE PORÓWNANIE: Sprawdza URL lub to, czy jedna nazwa zawiera się w drugiej
    const existingItem = currentList.find((item) => 
      item.moreleUrl === scrapedItem.moreleUrl || 
      item.name.toLowerCase() === scrapedItem.name.toLowerCase() ||
      item.name.toLowerCase().includes(scrapedItem.name.toLowerCase()) ||
      scrapedItem.name.toLowerCase().includes(item.name.toLowerCase())
    );

    if (existingItem) {
      updatedList.push({
        ...existingItem,
        price: scrapedItem.price, // Aktualizacja ceny rynkowej
      });
    } else {
      const newId = `${defaultTemplate.id || 'p'}_${Math.random().toString(36).substr(2, 9)}`;
      const newProduct = {
        ...defaultTemplate,
        id: newId,
        name: scrapedItem.name,
        price: scrapedItem.price,
        moreleUrl: scrapedItem.moreleUrl,
        ...(scrapedItem.spec || {}),
      } as T;
      
      updatedList.push(newProduct);
    }
  });

  return updatedList;
}