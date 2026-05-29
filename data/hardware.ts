export interface CPU { id: string; brand: 'AMD' | 'Intel'; name: string; cores: number; threads: number; cacheL3: number; price: number; wattage: number; socket: string; minClock: number; maxClock: number; moreleUrl?: string; }
export interface Cooler { id: string; name: string; type: 'Powietrzne' | 'Wodne (AIO)'; maxTdp: number; price: number; wattage: number; height: number; radiatorSize: number; moreleUrl?: string; }
export interface Motherboard { id: string; name: string; price: number; socket: string; ramType: 'DDR4' | 'DDR5'; formFactor: 'ATX' | 'mATX' | 'ITX'; moreleUrl?: string; }
export interface RAM { id: string; name: string; type: 'DDR4' | 'DDR5'; totalCapacity: number; modules: number; speed: number; cl: number; price: number; wattage: number; moreleUrl?: string; }
export interface Storage { id: string; name: string; type: 'HDD' | 'SSD SATA' | 'SSD M.2'; capacity: number; price: number; speed: number; wattage: number; moreleUrl?: string; }
export interface GPU { 
  id: string; 
  brand: 'NVIDIA' | 'AMD' | 'Intel'; 
  name: string; 
  vram: number; 
  price: number; 
  wattage: number; 
  length: number;    
  memoryType: string; // <-- NOWE (np. GDDR6X)
  connector: string;  // <-- NOWE (np. PCIe 4.0 x16)
  moreleUrl?: string; 
}
export interface Case { id: string; name: string; price: number; maxGpuLength: number; maxCpuCoolerHeight: number; maxAioSize: number; supportedFormFactors: ('ATX' | 'mATX' | 'ITX')[]; moreleUrl?: string; }
export interface PSU { id: string; name: string; price: number; wattage: number; moreleUrl?: string; }

export const cpus: CPU[] = [
  // --- AMD ---
  { id: 'c1', brand: 'AMD', name: 'AMD Ryzen 5 5600', cores: 6, threads: 12, cacheL3: 32, price: 485, wattage: 65, socket: 'AM4', minClock: 3.5, maxClock: 4.4, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-5-5600-3-5-ghz-32-mb-oem-100-000000927-10120244/' },
  { id: 'c2', brand: 'AMD', name: 'AMD Ryzen 7 5800X', cores: 8, threads: 16, cacheL3: 32, price: 888, wattage: 105, socket: 'AM4', minClock: 3.8, maxClock: 4.7, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-7-5800x-3-8-ghz-32-mb-box-100-100000063wof-7267024/' }, 
  { id: 'c3', brand: 'AMD', name: 'AMD Ryzen 7 7700', cores: 8, threads: 16, cacheL3: 32, price: 1219, wattage: 65, socket: 'AM5', minClock: 3.8, maxClock: 5.3, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-7-7700-3-8-ghz-32-mb-oem-100-000000592-12984669/' }, 
  { id: 'c4', brand: 'AMD', name: 'AMD Ryzen 7 5700X', cores: 8, threads: 16, cacheL3: 32, price: 677, wattage: 65, socket: 'AM4', minClock: 3.4, maxClock: 4.6, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-7-5700x-3-4-ghz-32-mb-box-100-10000926wof-10120245/' }, 
  { id: 'c5', brand: 'AMD', name: 'AMD Ryzen 7 9800X3D', cores: 8, threads: 16, cacheL3: 96, price: 1768, wattage: 120, socket: 'AM5', minClock: 4.7, maxClock: 5.2, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-7-9800x3d-4-7-ghz-96-mb-box-100-100001084wof-14209713/' }, 
  { id: 'c6', brand: 'AMD', name: 'AMD Ryzen 5 7600', cores: 6, threads: 12, cacheL3: 32, price: 689, wattage: 65, socket: 'AM5', minClock: 3.8, maxClock: 5.1, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-5-7600-3-8-ghz-32-mb-box-100-100001015box-12491803/' }, 
  { id: 'c7', brand: 'AMD', name: 'AMD Ryzen 5 5500', cores: 6, threads: 12, cacheL3: 16, price: 347, wattage: 65, socket: 'AM4', minClock: 3.6, maxClock: 4.2, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-5-5500-3-6-ghz-16-mb-mpk-100-100000457mpk-10120241/' }, 
  { id: 'c8', brand: 'AMD', name: 'AMD Ryzen 5 2600X', cores: 6, threads: 12, cacheL3: 16, price: 744, wattage: 95, socket: 'AM4', minClock: 3.6, maxClock: 4.2, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-5-2600x-3-6-ghz-16-mb-box-yd260xbcafbox-980256/' }, 
  { id: 'c9', brand: 'AMD', name: 'AMD Ryzen 5 7600X', cores: 6, threads: 12, cacheL3: 32, price: 1267, wattage: 105, socket: 'AM5', minClock: 4.7, maxClock: 5.3, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-5-7600x-4-7-ghz-32-mb-box-100-100000593wof-11788491/' }, 
  { id: 'c10', brand: 'AMD', name: 'AMD Ryzen 9 5900X', cores: 12, threads: 24, cacheL3: 64, price: 2465, wattage: 105, socket: 'AM4', minClock: 3.7, maxClock: 4.8, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-9-5900x-3-7-ghz-64-mb-box-100-100000061wof-7267022/' }, 
  { id: 'c11', brand: 'AMD', name: 'AMD Ryzen 7 5700G', cores: 8, threads: 16, cacheL3: 16, price: 775, wattage: 65, socket: 'AM4', minClock: 3.8, maxClock: 4.6, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-7-5700g-3-8-ghz-16-mb-box-100-100000263box-8536076/' }, 
  { id: 'c12', brand: 'AMD', name: 'AMD Ryzen 5 8500G', cores: 6, threads: 12, cacheL3: 16, price: 587, wattage: 65, socket: 'AM5', minClock: 3.5, maxClock: 5.0, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-5-8500g-3-5-ghz-16-mb-box-100-100000931box-13170046/' }, 
  { id: 'c13', brand: 'AMD', name: 'AMD Ryzen 5 8600G', cores: 6, threads: 12, cacheL3: 16, price: 720, wattage: 65, socket: 'AM5', minClock: 4.3, maxClock: 5.0, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-5-8600g-4-3-ghz-16-mb-box-100-100001237box-13170049/' }, 
  { id: 'c14', brand: 'AMD', name: 'AMD Ryzen 7 9700X', cores: 8, threads: 16, cacheL3: 32, price: 1233, wattage: 65, socket: 'AM5', minClock: 3.8, maxClock: 5.5, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-7-9700x-3-8-ghz-32-mb-box-100-100001404wof-13331758/' }, 
  { id: 'c15', brand: 'AMD', name: 'AMD Ryzen 5 9600X', cores: 6, threads: 12, cacheL3: 32, price: 765, wattage: 65, socket: 'AM5', minClock: 3.9, maxClock: 5.4, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-5-9600x-3-9-ghz-32-mb-box-100-100001405wof-13331760/' }, 
  { id: 'c16', brand: 'AMD', name: 'AMD Ryzen 9 9900X', cores: 12, threads: 24, cacheL3: 64, price: 1409, wattage: 120, socket: 'AM5', minClock: 4.4, maxClock: 5.6, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-9-9900x-4-4-ghz-64-mb-box-100-100000662wof-13331757/' },
  
  // Nowe brakujące modele AMD (uzupełnione)
  { id: 'c17', brand: 'AMD', name: 'AMD Ryzen 9 9950X3D', cores: 16, threads: 32, cacheL3: 128, price: 3199, wattage: 120, socket: 'AM5', minClock: 4.3, maxClock: 5.7, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-9-9950x3d-box-100-100001086wof-placeholder/' },
  { id: 'c18', brand: 'AMD', name: 'AMD Ryzen 9 9900X3D', cores: 12, threads: 24, cacheL3: 128, price: 2499, wattage: 120, socket: 'AM5', minClock: 4.4, maxClock: 5.6, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-9-9900x3d-box-100-100001087wof-placeholder/' },
  { id: 'c19', brand: 'AMD', name: 'AMD Ryzen 9 9950X', cores: 16, threads: 32, cacheL3: 64, price: 2649, wattage: 170, socket: 'AM5', minClock: 4.3, maxClock: 5.7, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-9-9950x-4-3-ghz-64-mb-box-100-100000510wof-13331756/' },
  { id: 'c20', brand: 'AMD', name: 'AMD Ryzen 7 7800X3D', cores: 8, threads: 16, cacheL3: 96, price: 1649, wattage: 120, socket: 'AM5', minClock: 4.2, maxClock: 5.0, moreleUrl: 'https://www.morele.net/procesor-amd-ryzen-7-7800x3d-4-2-ghz-96-mb-box-100-100000910wof-12627003/' },

  // --- INTEL ---
  { id: 'i1', brand: 'Intel', name: 'Intel Core Ultra 9 285K', cores: 24, threads: 24, cacheL3: 36, price: 2699, wattage: 125, socket: 'LGA1851', minClock: 3.2, maxClock: 5.7, moreleUrl: 'https://www.morele.net/procesor-intel-core-ultra-9-285k-3-2-ghz-36-mb-box-bx80715285k-13146435/' },
  { id: 'i2', brand: 'Intel', name: 'Intel Core Ultra 7 265K', cores: 20, threads: 20, cacheL3: 30, price: 1999, wattage: 125, socket: 'LGA1851', minClock: 3.3, maxClock: 5.5, moreleUrl: 'https://www.morele.net/procesor-intel-core-ultra-7-265k-3-3-ghz-30-mb-box-bx80715265k-13146437/' },
  { id: 'i3', brand: 'Intel', name: 'Intel Core Ultra 5 245K', cores: 14, threads: 14, cacheL3: 24, price: 1449, wattage: 125, socket: 'LGA1851', minClock: 4.2, maxClock: 5.2, moreleUrl: 'https://www.morele.net/procesor-intel-core-ultra-5-245k-4-2-ghz-24-mb-box-bx80715245k-13146439/' },
  { id: 'i4', brand: 'Intel', name: 'Intel Core i9-14900K', cores: 24, threads: 32, cacheL3: 36, price: 2449, wattage: 253, socket: 'LGA1700', minClock: 3.2, maxClock: 6.0, moreleUrl: 'https://www.morele.net/procesor-intel-core-i9-14900k-3-2-ghz-36-mb-box-bx8071514900k-13103289/' },
  { id: 'i5', brand: 'Intel', name: 'Intel Core i9-14900KF', cores: 24, threads: 32, cacheL3: 36, price: 2399, wattage: 253, socket: 'LGA1700', minClock: 3.2, maxClock: 6.0, moreleUrl: 'https://www.morele.net/procesor-intel-core-i9-14900kf-3-2-ghz-36-mb-box-bx8071514900kf-13103291/' },
  { id: 'i6', brand: 'Intel', name: 'Intel Core i7-14700K', cores: 20, threads: 28, cacheL3: 33, price: 1749, wattage: 253, socket: 'LGA1700', minClock: 3.4, maxClock: 5.6, moreleUrl: 'https://www.morele.net/procesor-intel-core-i7-14700k-3-4-ghz-33-mb-box-bx8071514700k-13103288/' },
  { id: 'i7', brand: 'Intel', name: 'Intel Core i7-14700KF', cores: 20, threads: 28, cacheL3: 33, price: 1699, wattage: 253, socket: 'LGA1700', minClock: 3.4, maxClock: 5.6, moreleUrl: 'https://www.morele.net/procesor-intel-core-i7-14700kf-3-4-ghz-33-mb-box-bx8071514700kf-13103290/' },
  { id: 'i8', brand: 'Intel', name: 'Intel Core i5-14600K', cores: 14, threads: 20, cacheL3: 24, price: 1249, wattage: 181, socket: 'LGA1700', minClock: 3.5, maxClock: 5.3, moreleUrl: 'https://www.morele.net/procesor-intel-core-i5-14600k-3-5-ghz-24-mb-box-bx8071514600k-13103287/' },
  { id: 'i9', brand: 'Intel', name: 'Intel Core i9-13900K', cores: 24, threads: 32, cacheL3: 36, price: 2199, wattage: 253, socket: 'LGA1700', minClock: 3.0, maxClock: 5.8, moreleUrl: 'https://www.morele.net/procesor-intel-core-i9-13900k-3-0-ghz-36-mb-box-bx8071513900k-11786820/' },
  { id: 'i10', brand: 'Intel', name: 'Intel Core i7-13700K', cores: 16, threads: 24, cacheL3: 30, price: 1549, wattage: 253, socket: 'LGA1700', minClock: 3.4, maxClock: 5.4, moreleUrl: 'https://www.morele.net/procesor-intel-core-i7-13700k-3-4-ghz-30-mb-box-bx8071513700k-11786822/' },
  { id: 'i11', brand: 'Intel', name: 'Intel Core i5-13400F', cores: 10, threads: 16, cacheL3: 20, price: 849, wattage: 148, socket: 'LGA1700', minClock: 2.5, maxClock: 4.6, moreleUrl: 'https://www.morele.net/procesor-intel-core-i5-13400f-2-5-ghz-20-mb-box-bx8071513400f-12130768/' },
  { id: 'i12', brand: 'Intel', name: 'Intel Core i9-12900K', cores: 16, threads: 24, cacheL3: 30, price: 1399, wattage: 241, socket: 'LGA1700', minClock: 3.2, maxClock: 5.2, moreleUrl: 'https://www.morele.net/procesor-intel-core-i9-12900k-3-2-ghz-30-mb-box-bx8071512900k-5942456/' },
  { id: 'i13', brand: 'Intel', name: 'Intel Core i7-12700K', cores: 12, threads: 20, cacheL3: 25, price: 1099, wattage: 190, socket: 'LGA1700', minClock: 3.6, maxClock: 5.0, moreleUrl: 'https://www.morele.net/procesor-intel-core-i7-12700k-3-6-ghz-25-mb-box-bx8071512700k-5942457/' },
  { id: 'i14', brand: 'Intel', name: 'Intel Core i5-12400F', cores: 6, threads: 12, cacheL3: 18, price: 549, wattage: 117, socket: 'LGA1700', minClock: 2.5, maxClock: 4.4, moreleUrl: 'https://www.morele.net/procesor-intel-core-i5-12400f-2-5-ghz-18-mb-box-bx8071512400f-9336636/' },
  { id: 'i15', brand: 'Intel', name: 'Intel Core i9-11900K', cores: 8, threads: 16, cacheL3: 16, price: 1299, wattage: 125, socket: 'LGA1200', minClock: 3.5, maxClock: 5.3, moreleUrl: 'https://www.morele.net/procesor-intel-core-i9-11900k-3-5-ghz-16-mb-box-bx8070811900k-5942451/' },
  { id: 'i16', brand: 'Intel', name: 'Intel Core i7-11700K', cores: 8, threads: 16, cacheL3: 16, price: 949, wattage: 125, socket: 'LGA1200', minClock: 3.6, maxClock: 5.0, moreleUrl: 'https://www.morele.net/procesor-intel-core-i7-11700k-3-6-ghz-16-mb-box-bx8070811700k-5942452/' },
  { id: 'i17', brand: 'Intel', name: 'Intel Core i9-10900K', cores: 10, threads: 20, cacheL3: 20, price: 1199, wattage: 125, socket: 'LGA1200', minClock: 3.7, maxClock: 5.3, moreleUrl: 'https://www.morele.net/procesor-intel-core-i9-10900k-3-7-ghz-20-mb-box-bx8070110900k-6712398/' },
  { id: 'i18', brand: 'Intel', name: 'Intel Core i7-10700K', cores: 8, threads: 16, cacheL3: 16, price: 899, wattage: 125, socket: 'LGA1200', minClock: 3.8, maxClock: 5.1, moreleUrl: 'https://www.morele.net/procesor-intel-core-i7-10700k-3-8-ghz-16-mb-box-bx8070110700k-6712399/' },

  // Nowe brakujące modele Intel (uzupełnione)
  { id: 'i19', brand: 'Intel', name: 'Intel Core i5-13600K', cores: 14, threads: 20, cacheL3: 24, price: 1149, wattage: 181, socket: 'LGA1700', minClock: 3.5, maxClock: 5.1, moreleUrl: 'https://www.morele.net/procesor-intel-core-i5-13600k-3-5-ghz-24-mb-box-bx8071513600k-11786823/' },
  { id: 'i20', brand: 'Intel', name: 'Intel Core i5-14600KF', cores: 14, threads: 20, cacheL3: 24, price: 1189, wattage: 181, socket: 'LGA1700', minClock: 3.5, maxClock: 5.3, moreleUrl: 'https://www.morele.net/procesor-intel-core-i5-14600kf-3-5-ghz-24-mb-box-bx8071514600kf-13103292/' },
  { id: 'i21', brand: 'Intel', name: 'Intel Core i5-12600K', cores: 10, threads: 16, cacheL3: 20, price: 899, wattage: 150, socket: 'LGA1700', minClock: 3.7, maxClock: 4.9, moreleUrl: 'https://www.morele.net/procesor-intel-core-i5-12600k-3-7-ghz-20-mb-box-bx8071512600k-5942458/' }
];

export const coolers: Cooler[] = [
  // --- CHŁODZENIA POWIETRZNE ---
  { id: 'cool4', name: 'Deepcool AK400', type: 'Powietrzne', maxTdp: 220, price: 125, wattage: 3, height: 155, radiatorSize: 0, moreleUrl: 'https://www.morele.net/chlodzenie-cpu-deepcool-ak400-r-ak400-bknnmn-g-1-9878226/' },
  { id: 'cool5', name: 'Deepcool AK400 WH', type: 'Powietrzne', maxTdp: 220, price: 139, wattage: 3, height: 155, radiatorSize: 0, moreleUrl: 'https://www.morele.net/chlodzenie-cpu-deepcool-ak400-wh-r-ak400-whnnmn-g-1-10515668/' },
  { id: 'cool6', name: 'Deepcool AK400 Zero Dark', type: 'Powietrzne', maxTdp: 220, price: 145, wattage: 3, height: 155, radiatorSize: 0, moreleUrl: 'https://www.morele.net/chlodzenie-cpu-deepcool-ak400-zero-dark-r-ak400-bknnmn-g-2-11786566/' },
  { id: 'cool7', name: 'Deepcool AK400 Zero Dark Plus', type: 'Powietrzne', maxTdp: 240, price: 189, wattage: 5, height: 155, radiatorSize: 0, moreleUrl: 'https://www.morele.net/chlodzenie-cpu-deepcool-ak400-zero-dark-plus-r-ak400-bknnmd-g-1-11786567/' },
  { id: 'cool8', name: 'Deepcool AK400 Digital WH', type: 'Powietrzne', maxTdp: 220, price: 179, wattage: 4, height: 156, radiatorSize: 0, moreleUrl: 'https://www.morele.net/chlodzenie-cpu-deepcool-ak400-digital-wh-r-ak400-whadmn-g-13133649/' },
  { id: 'cool9', name: 'be quiet! Dark Rock Slim', type: 'Powietrzne', maxTdp: 180, price: 249, wattage: 3, height: 159, radiatorSize: 0, moreleUrl: 'https://www.morele.net/chlodzenie-cpu-be-quiet-dark-rock-slim-bk024-5923982/' },
  { id: 'cool10', name: 'be quiet! Shadow Rock LP', type: 'Powietrzne', maxTdp: 130, price: 199, wattage: 3, height: 75, radiatorSize: 0, moreleUrl: 'https://www.morele.net/chlodzenie-cpu-be-quiet-shadow-rock-lp-bk002-715764/' },
  { id: 'cool11', name: 'be quiet! Pure Rock 2 Black', type: 'Powietrzne', maxTdp: 150, price: 175, wattage: 3, height: 155, radiatorSize: 0, moreleUrl: 'https://www.morele.net/chlodzenie-cpu-be-quiet-pure-rock-2-black-bk007-6745125/' },
  { id: 'cool12', name: 'Raijintek Tisis', type: 'Powietrzne', maxTdp: 350, price: 320, wattage: 6, height: 167, radiatorSize: 0, moreleUrl: 'https://www.morele.net/chlodzenie-cpu-raijintek-tisis-0r100001-633003/' },
  { id: 'cool13', name: 'Deepcool AG400', type: 'Powietrzne', maxTdp: 220, price: 109, wattage: 3, height: 150, radiatorSize: 0, moreleUrl: 'https://www.morele.net/chlodzenie-cpu-deepcool-ag400-r-ag400-bknnmn-g-1-11786564/' },
  { id: 'cool14', name: 'Deepcool AG400 Digital BK ARGB', type: 'Powietrzne', maxTdp: 220, price: 149, wattage: 4, height: 150, radiatorSize: 0, moreleUrl: 'https://www.morele.net/chlodzenie-cpu-deepcool-ag400-digital-bk-argb-r-ag400-bkadmn-g-1-13133647/' },
  { id: 'cool15', name: 'Noctua NH-U14S', type: 'Powietrzne', maxTdp: 220, price: 389, wattage: 3, height: 165, radiatorSize: 0, moreleUrl: 'https://www.morele.net/chlodzenie-cpu-noctua-nh-u14s-5923985/' },
  { id: 'cool16', name: 'Noctua NH-U14S TR4-SP3', type: 'Powietrzne', maxTdp: 250, price: 449, wattage: 3, height: 165, radiatorSize: 0, moreleUrl: 'https://www.morele.net/chlodzenie-cpu-noctua-nh-u14s-tr4-sp3-1577905/' },
  
  // Brakujące, najpopularniejsze chłodzenia powietrzne w Polsce
  { id: 'cool17', name: 'Endorfy Fera 5', type: 'Powietrzne', maxTdp: 220, price: 139, wattage: 3, height: 155, radiatorSize: 0, moreleUrl: 'https://www.morele.net/chlodzenie-cpu-endorfy-fera-5-ey3a005-11788464/' },
  { id: 'cool18', name: 'Endorfy Fortis 5', type: 'Powietrzne', maxTdp: 240, price: 219, wattage: 4, height: 159, radiatorSize: 0, moreleUrl: 'https://www.morele.net/chlodzenie-cpu-endorfy-fortis-5-ey3a008-11788461/' },
  { id: 'cool19', name: 'Thermalright Peerless Assassin 120 SE', type: 'Powietrzne', maxTdp: 245, price: 195, wattage: 5, height: 155, radiatorSize: 0, moreleUrl: 'https://www.morele.net/chlodzenie-cpu-thermalright-peerless-assassin-120-se-13114530/' },

  // --- CHŁODZENIA WODNE (AIO) ---
  { id: 'cool20', name: 'Arctic Liquid Freezer III 240', type: 'Wodne (AIO)', maxTdp: 300, price: 319, wattage: 8, height: 0, radiatorSize: 240, moreleUrl: 'https://www.morele.net/chlodzenie-wodne-arctic-liquid-freezer-iii-240-acfre00134a-13170050/' },
  { id: 'cool21', name: 'Arctic Liquid Freezer III 360', type: 'Wodne (AIO)', maxTdp: 350, price: 399, wattage: 11, height: 0, radiatorSize: 360, moreleUrl: 'https://www.morele.net/chlodzenie-wodne-arctic-liquid-freezer-iii-360-acfre00136a-13170052/' },
  { id: 'cool22', name: 'Endorfy Navis F240', type: 'Wodne (AIO)', maxTdp: 280, price: 399, wattage: 9, height: 0, radiatorSize: 240, moreleUrl: 'https://www.morele.net/chlodzenie-wodne-endorfy-navis-f240-ey3b001-11788473/' },
  { id: 'cool23', name: 'Endorfy Navis F360', type: 'Wodne (AIO)', maxTdp: 350, price: 499, wattage: 12, height: 0, radiatorSize: 360, moreleUrl: 'https://www.morele.net/chlodzenie-wodne-endorfy-navis-f360-ey3b003-11788471/' }
];

export const motherboards: Motherboard[] = [
  // AM4
  { id: 'm1', name: 'MSI MAG B550 TOMAHAWK', price: 650, socket: 'AM4', ramType: 'DDR4', formFactor: 'ATX', moreleUrl: 'https://www.morele.net/plyta-glowna-msi-mag-b550-tomahawk-6851229/' },
  { id: 'm4', name: 'Gigabyte B550 GAMING X V2', price: 390, socket: 'AM4', ramType: 'DDR4', formFactor: 'ATX', moreleUrl: 'https://www.morele.net/plyta-glowna-gigabyte-b550-gaming-x-v2-8178122/' },
  { id: 'm5', name: 'MSI B550-A PRO', price: 451, socket: 'AM4', ramType: 'DDR4', formFactor: 'ATX', moreleUrl: 'https://www.morele.net/plyta-glowna-msi-b550-a-pro-6761596/' },
  { id: 'm6', name: 'Gigabyte B450 AORUS ELITE', price: 519, socket: 'AM4', ramType: 'DDR4', formFactor: 'ATX', moreleUrl: 'https://www.morele.net/plyta-glowna-gigabyte-b450-aorus-elite-4141662/' },
  { id: 'm15', name: 'ASRock B550M Pro4', price: 415, socket: 'AM4', ramType: 'DDR4', formFactor: 'mATX', moreleUrl: 'https://www.morele.net/plyta-glowna-asrock-b550m-pro4-6858386/' },
  { id: 'm16', name: 'Gigabyte B450M DS3H V2', price: 299, socket: 'AM4', ramType: 'DDR4', formFactor: 'mATX', moreleUrl: 'https://www.morele.net/plyta-glowna-gigabyte-b450m-ds3h-v2-5945620/' },
  
  // AM5
  { id: 'm2', name: 'ASUS TUF GAMING B650-PLUS', price: 890, socket: 'AM5', ramType: 'DDR5', formFactor: 'ATX', moreleUrl: 'https://www.morele.net/plyta-glowna-asus-tuf-gaming-b650-plus-11788487/' },
  { id: 'm7', name: 'Gigabyte B850 EAGLE WIFI6E', price: 651, socket: 'AM5', ramType: 'DDR5', formFactor: 'ATX', moreleUrl: 'https://www.morele.net/plyta-glowna-gigabyte-b850-eagle-wifi6e-13175185/' },
  { id: 'm8', name: 'Gigabyte B650 EAGLE', price: 469, socket: 'AM5', ramType: 'DDR5', formFactor: 'ATX', moreleUrl: 'https://www.morele.net/plyta-glowna-gigabyte-b650-eagle-13133646/' },
  { id: 'm9', name: 'MSI MAG B650 TOMAHAWK WIFI', price: 735, socket: 'AM5', ramType: 'DDR5', formFactor: 'ATX', moreleUrl: 'https://www.morele.net/plyta-glowna-msi-mag-b650-tomahawk-wifi-11788484/' },
  { id: 'm17', name: 'ASRock B650M PRO RS', price: 589, socket: 'AM5', ramType: 'DDR5', formFactor: 'mATX', moreleUrl: 'https://www.morele.net/plyta-glowna-asrock-b650m-pro-rs-12893811/' },
  { id: 'm18', name: 'MSI PRO B650-S WIFI', price: 615, socket: 'AM5', ramType: 'DDR5', formFactor: 'ATX', moreleUrl: 'https://www.morele.net/plyta-glowna-msi-pro-b650-s-wifi-13114532/' },
  
  // Intel LGA1700
  { id: 'm3', name: 'Gigabyte B760 GAMING X AX', price: 620, socket: 'LGA1700', ramType: 'DDR5', formFactor: 'ATX', moreleUrl: 'https://www.morele.net/plyta-glowna-gigabyte-b760-gaming-x-ax-12481197/' },
  { id: 'm10', name: 'MSI MAG Z790 TOMAHAWK WIFI', price: 679, socket: 'LGA1700', ramType: 'DDR5', formFactor: 'ATX', moreleUrl: 'https://www.morele.net/plyta-glowna-msi-mag-z790-tomahawk-wifi-11788494/' },
  { id: 'm19', name: 'Gigabyte B760M DS3H DDR4', price: 439, socket: 'LGA1700', ramType: 'DDR4', formFactor: 'mATX', moreleUrl: 'https://www.morele.net/plyta-glowna-gigabyte-b760m-ds3h-ddr4-12481203/' },
  { id: 'm20', name: 'ASUS PRIME B760-PLUS', price: 549, socket: 'LGA1700', ramType: 'DDR5', formFactor: 'ATX', moreleUrl: 'https://www.morele.net/plyta-glowna-asus-prime-b760-plus-12610515/' },

  // Intel LGA1200
  { id: 'm11', name: 'ASUS PRIME B560M-K', price: 349, socket: 'LGA1200', ramType: 'DDR4', formFactor: 'mATX', moreleUrl: 'https://www.morele.net/plyta-glowna-asus-prime-b560m-k-5945829/' },
  { id: 'm12', name: 'Gigabyte H510M H', price: 299, socket: 'LGA1200', ramType: 'DDR4', formFactor: 'mATX', moreleUrl: 'https://www.morele.net/plyta-glowna-gigabyte-h510m-h-8433433/' },
  { id: 'm21', name: 'MSI H510M-A PRO', price: 310, socket: 'LGA1200', ramType: 'DDR4', formFactor: 'mATX', moreleUrl: 'https://www.morele.net/plyta-glowna-msi-h510m-a-pro-5946896/' },

  // Intel LGA1851
  { id: 'm13', name: 'ASUS PRIME Z890-P WIFI', price: 1199, socket: 'LGA1851', ramType: 'DDR5', formFactor: 'ATX', moreleUrl: 'https://www.morele.net/plyta-glowna-asus-prime-z890-p-wifi-13174249/' },
  { id: 'm14', name: 'MSI MAG Z890 TOMAHAWK WIFI', price: 1450, socket: 'LGA1851', ramType: 'DDR5', formFactor: 'ATX', moreleUrl: 'https://www.morele.net/plyta-glowna-msi-mag-z890-tomahawk-wifi-13174362/' },
  { id: 'm22', name: 'Gigabyte Z890 EAGLE WIFI', price: 1089, socket: 'LGA1851', ramType: 'DDR5', formFactor: 'ATX', moreleUrl: 'https://www.morele.net/plyta-glowna-gigabyte-z890-eagle-wifi-13174299/' }
];

export const rams: RAM[] = [
  // DDR4
  { id: 'r1', name: 'G.Skill Aegis 16GB (2x8GB)', type: 'DDR4', totalCapacity: 16, modules: 2, speed: 3200, cl: 16, price: 160, wattage: 4, moreleUrl: 'https://www.morele.net/pamiec-g-skill-aegis-ddr4-16-gb-3200mhz-cl16-f4-3200c16d-16gis-6402454/' },
  { id: 'r4', name: 'Kingston Fury Beast 16GB (2x8GB)', type: 'DDR4', totalCapacity: 16, modules: 2, speed: 3600, cl: 17, price: 199, wattage: 4, moreleUrl: 'https://www.morele.net/pamiec-kingston-fury-beast-ddr4-16-gb-3600mhz-cl17-kf436c17bbk2-16-8898160/' },
  { id: 'r5', name: 'Corsair Vengeance LPX 32GB (2x16GB)', type: 'DDR4', totalCapacity: 32, modules: 2, speed: 3200, cl: 16, price: 325, wattage: 6, moreleUrl: 'https://www.morele.net/pamiec-corsair-vengeance-lpx-ddr4-32-gb-3200mhz-cl16-cmk32gx4m2e3200c16-5942767/' },
  { id: 'r6', name: 'Lexar Thor 16GB (1x16GB)', type: 'DDR4', totalCapacity: 16, modules: 1, speed: 3200, cl: 16, price: 145, wattage: 3, moreleUrl: 'https://www.morele.net/pamiec-lexar-thor-ddr4-16-gb-3200mhz-cl16-ld4au016g-r3200gdax-11786576/' },
  { id: 'r10', name: 'Patriot Viper Steel 16GB (2x8GB)', type: 'DDR4', totalCapacity: 16, modules: 2, speed: 3600, cl: 17, price: 185, wattage: 4, moreleUrl: 'https://www.morele.net/pamiec-patriot-viper-steel-ddr4-16-gb-3600mhz-cl17-pvs416g360c7k-6221135/' },
  { id: 'r11', name: 'Kingston Fury Renegade 32GB (2x16GB)', type: 'DDR4', totalCapacity: 32, modules: 2, speed: 3600, cl: 16, price: 369, wattage: 6, moreleUrl: 'https://www.morele.net/pamiec-kingston-fury-renegade-ddr4-32-gb-3600mhz-cl16-kf436c16rb1k2-32-8854224/' },
  { id: 'r12', name: 'GoodRam IRDM PRO Deep Black 16GB (2x8GB)', type: 'DDR4', totalCapacity: 16, modules: 2, speed: 3600, cl: 18, price: 175, wattage: 4, moreleUrl: 'https://www.morele.net/pamiec-goodram-irdm-pro-deep-black-ddr4-16-gb-3600mhz-cl18-irp-k3600d4v64l18s-16gdc-8256225/' },

  // DDR5
  { id: 'r2', name: 'Lexar THOR DDR5 32GB (2x16GB)', type: 'DDR5', totalCapacity: 32, modules: 2, speed: 6000, cl: 32, price: 450, wattage: 7, moreleUrl: 'https://www.morele.net/pamiec-lexar-thor-oc-ddr5-32-gb-6000mhz-cl32-ld5bu016g-r6000gdxg-13113941/' },
  { id: 'r3', name: 'Corsair Vengeance 64GB (2x32GB)', type: 'DDR5', totalCapacity: 64, modules: 2, speed: 6400, cl: 32, price: 1150, wattage: 12, moreleUrl: 'https://www.morele.net/pamiec-corsair-vengeance-ddr5-64-gb-6400mhz-cl32-cmk64gx5m2b6400c32-12791444/' },
  { id: 'r7', name: 'G.Skill Trident Z5 RGB 32GB (2x16GB)', type: 'DDR5', totalCapacity: 32, modules: 2, speed: 7200, cl: 34, price: 689, wattage: 9, moreleUrl: 'https://www.morele.net/pamiec-g-skill-trident-z5-rgb-ddr5-32-gb-7200mhz-cl34-f5-7200j3445g16gx2-tz5rk-12626573/' },
  { id: 'r8', name: 'Kingston Fury Beast 16GB (1x16GB)', type: 'DDR5', totalCapacity: 16, modules: 1, speed: 5600, cl: 40, price: 279, wattage: 4, moreleUrl: 'https://www.morele.net/pamiec-kingston-fury-beast-ddr5-16-gb-5600mhz-cl40-kf556c40bb-10110363/' },
  { id: 'r9', name: 'ADATA XPG Lancer 32GB (2x16GB)', type: 'DDR5', totalCapacity: 32, modules: 2, speed: 6000, cl: 30, price: 519, wattage: 8, moreleUrl: 'https://www.morele.net/pamiec-adata-xpg-lancer-ddr5-32-gb-6000mhz-cl30-ax5u6000c3016g-dclabk-12720970/' },
  { id: 'r13', name: 'Kingston Fury Renegade 32GB (2x16GB)', type: 'DDR5', totalCapacity: 32, modules: 2, speed: 6000, cl: 32, price: 499, wattage: 8, moreleUrl: 'https://www.morele.net/pamiec-kingston-fury-renegade-ddr5-32-gb-6000mhz-cl32-kf560c32rsk2-32-11756534/' },
  { id: 'r14', name: 'Patriot Viper Venom 32GB (2x16GB)', type: 'DDR5', totalCapacity: 32, modules: 2, speed: 6000, cl: 36, price: 429, wattage: 7, moreleUrl: 'https://www.morele.net/pamiec-patriot-viper-venom-ddr5-32-gb-6000mhz-cl36-pvv532g600c36k-10756779/' },
  { id: 'r15', name: 'Corsair Vengeance RGB 32GB (2x16GB)', type: 'DDR5', totalCapacity: 32, modules: 2, speed: 6000, cl: 30, price: 549, wattage: 8, moreleUrl: 'https://www.morele.net/pamiec-corsair-vengeance-rgb-ddr5-32-gb-6000mhz-cl30-cmh32gx5m2b6000z30k-13114510/' }
];

export const storages: Storage[] = [
  // Dyski SSD M.2 NVMe
  { id: 'd1', name: 'Lexar NM790 1TB', type: 'SSD M.2', capacity: 1000, speed: 7400, price: 340, wattage: 5, moreleUrl: 'https://www.morele.net/dysk-ssd-lexar-nm790-1-tb-m-2-2280-pci-e-x4-gen4-nvme-lnm790x001t-rnnn-12883070/' },
  { id: 'd2', name: 'Kingston KC3000 2TB', type: 'SSD M.2', capacity: 2000, speed: 7000, price: 680, wattage: 8, moreleUrl: 'https://www.morele.net/dysk-ssd-kingston-kc3000-2-tb-m-2-2280-pci-e-x4-gen4-nvme-skc3000d-2048g-5945890/' },
  { id: 'd3', name: 'Samsung 990 Pro 2TB', type: 'SSD M.2', capacity: 2000, speed: 7450, price: 850, wattage: 9, moreleUrl: 'https://www.morele.net/dysk-ssd-samsung-990-pro-2-tb-m-2-2280-pci-e-x4-gen4-nvme-mz-v9p2t0bw-11812836/' },
  { id: 'd4', name: 'Crucial P3 1TB', type: 'SSD M.2', capacity: 1000, speed: 3500, price: 260, wattage: 4, moreleUrl: 'https://www.morele.net/dysk-ssd-crucial-p3-1-tb-m-2-2280-pci-e-x4-gen3-nvme-ct1000p3ssd8-10515663/' },
  { id: 'd5', name: 'WD Black SN850X 1TB', type: 'SSD M.2', capacity: 1000, speed: 7300, price: 399, wattage: 6, moreleUrl: 'https://www.morele.net/dysk-ssd-western-digital-black-sn850x-1-tb-m-2-2280-pci-e-x4-gen4-nvme-wds100t2x0e-11762143/' },
  { id: 'd6', name: 'Samsung 980 Pro 1TB', type: 'SSD M.2', capacity: 1000, speed: 7000, price: 420, wattage: 6, moreleUrl: 'https://www.morele.net/dysk-ssd-samsung-980-pro-1-tb-m-2-2280-pci-e-x4-gen4-nvme-mz-v8p1t0bw-5944292/' },
  { id: 'd7', name: 'Lexar NM710 1TB', type: 'SSD M.2', capacity: 1000, speed: 5000, price: 275, wattage: 4, moreleUrl: 'https://www.morele.net/dysk-ssd-lexar-nm710-1-tb-m-2-2280-pci-e-x4-gen4-nvme-lnm710x001t-rnnng-12586230/' },

  // Dyski HDD (3.5 cala)
  { id: 'h1', name: 'Toshiba P300 1TB', type: 'HDD', capacity: 1000, speed: 7200, price: 180, wattage: 6, moreleUrl: 'https://www.morele.net/dysk-toshiba-p300-1-tb-3-5-sata-iii-hdwd110uzsva-1056586/' },
  { id: 'h2', name: 'Seagate BarraCuda 2TB', type: 'HDD', capacity: 2000, speed: 7200, price: 280, wattage: 7, moreleUrl: 'https://www.morele.net/dysk-seagate-barracuda-2-tb-3-5-sata-iii-st2000dm008-974656/' },
  { id: 'h3', name: 'WD Blue 4TB', type: 'HDD', capacity: 4000, speed: 5400, price: 420, wattage: 8, moreleUrl: 'https://www.morele.net/dysk-western-digital-blue-4-tb-3-5-sata-iii-wd40ezaz-5942475/' },
  { id: 'h4', name: 'WD Blue 2TB', type: 'HDD', capacity: 2000, speed: 7200, price: 260, wattage: 6, moreleUrl: 'https://www.morele.net/dysk-western-digital-blue-2-tb-3-5-sata-iii-wd20ezbx-8193424/' },
  { id: 'h5', name: 'Seagate IronWolf 4TB', type: 'HDD', capacity: 4000, speed: 5400, price: 499, wattage: 7, moreleUrl: 'https://www.morele.net/dysk-seagate-ironwolf-4-tb-3-5-sata-iii-st4000vn006-10457630/' }
];

export const gpus: GPU[] = [
  // Twoje dotychczasowe modele
  { id: 'g1', brand: 'NVIDIA', name: 'GeForce RTX 4060 8GB', vram: 8, price: 1350, wattage: 115, length: 242, memoryType: 'GDDR6', connector: 'PCIe 4.0 x8', moreleUrl: 'https://www.morele.net/karta-graficzna-msi-geforce-rtx-4060-ventus-2x-black-8gb-oc-12935824/' },
  { id: 'g2', brand: 'AMD', name: 'Radeon RX 7600 XT 16GB', vram: 16, price: 1500, wattage: 190, length: 267, memoryType: 'GDDR6', connector: 'PCIe 4.0 x8', moreleUrl: 'https://www.morele.net/karta-graficzna-xfx-radeon-rx-7600-xt-speedster-swft-210-16gb-gddr6-rx-76at8dfd8-13145450/' },
  { id: 'g3', brand: 'AMD', name: 'Radeon RX 7700 XT 12GB', vram: 12, price: 1950, wattage: 245, length: 283, memoryType: 'GDDR6', connector: 'PCIe 4.0 x16', moreleUrl: 'https://www.morele.net/karta-graficzna-sapphire-pulse-radeon-rx-7700-xt-12gb-gddr6-11335-04-20g-13045543/' },
  { id: 'g4', brand: 'AMD', name: 'Radeon RX 9060 XT 8GB', vram: 8, price: 1450, wattage: 160, length: 250, memoryType: 'GDDR6', connector: 'PCIe 5.0 x8', moreleUrl: 'https://www.morele.net/karta-graficzna-placeholder-rx9060/' },
  { id: 'g5', brand: 'NVIDIA', name: 'GeForce RTX 5060 8GB', vram: 8, price: 1400, wattage: 130, length: 245, memoryType: 'GDDR7', connector: 'PCIe 5.0 x8', moreleUrl: 'https://www.morele.net/karta-graficzna-placeholder-rtx5060/' },
  { id: 'g6', brand: 'NVIDIA', name: 'GeForce RTX 5060 Ti 16GB', vram: 16, price: 2200, wattage: 160, length: 272, memoryType: 'GDDR7', connector: 'PCIe 5.0 x8', moreleUrl: 'https://www.morele.net/karta-graficzna-placeholder-rtx5060ti/' },
  { id: 'g7', brand: 'NVIDIA', name: 'GeForce RTX 5070 12GB', vram: 12, price: 2600, wattage: 200, length: 294, memoryType: 'GDDR7', connector: 'PCIe 5.0 x16', moreleUrl: 'https://www.morele.net/karta-graficzna-placeholder-rtx5070/' },
  { id: 'g8', brand: 'AMD', name: 'Radeon RX 9070 XT 16GB', vram: 16, price: 3200, wattage: 300, length: 320, memoryType: 'GDDR6X', connector: 'PCIe 5.0 x16', moreleUrl: 'https://www.morele.net/karta-graficzna-placeholder-rx9070xt/' },
  { id: 'g9', brand: 'NVIDIA', name: 'GeForce RTX 5070 Ti 16GB', vram: 16, price: 4200, wattage: 250, length: 315, memoryType: 'GDDR7', connector: 'PCIe 5.0 x16', moreleUrl: 'https://www.morele.net/karta-graficzna-placeholder-rtx5070ti/' },
  { id: 'g10', brand: 'NVIDIA', name: 'GeForce RTX 5080 16GB', vram: 16, price: 5800, wattage: 350, length: 336, memoryType: 'GDDR7', connector: 'PCIe 5.0 x16', moreleUrl: 'https://www.morele.net/karta-graficzna-placeholder-rtx5080/' },
  { id: 'g11', brand: 'NVIDIA', name: 'GeForce RTX 5090 32GB', vram: 32, price: 11000, wattage: 500, length: 348, memoryType: 'GDDR7', connector: 'PCIe 5.0 x16', moreleUrl: 'https://www.morele.net/karta-graficzna-placeholder-rtx5090/' },
  { id: 'g12', brand: 'Intel', name: 'Arc B580 12GB', vram: 12, price: 1100, wattage: 190, length: 270, memoryType: 'GDDR6', connector: 'PCIe 4.0 x8', moreleUrl: 'https://www.morele.net/karta-graficzna-asrock-arc-b580-challenger-oc-12gb-gddr6-13145000/' },

  // Nowe brakujące modele (uzupełnione)
  { id: 'g13', brand: 'NVIDIA', name: 'GeForce RTX 4070 SUPER 12GB', vram: 12, price: 2650, wattage: 220, length: 261, memoryType: 'GDDR6X', connector: 'PCIe 4.0 x16', moreleUrl: 'https://www.morele.net/karta-graficzna-gigabyte-geforce-rtx-4070-super-windforce-oc-12gb-gddr6x-gv-n407swf3oc-12gd-13145455/' },
  { id: 'g14', brand: 'AMD', name: 'Radeon RX 7800 XT 16GB', vram: 16, price: 2250, wattage: 263, length: 280, memoryType: 'GDDR6', connector: 'PCIe 4.0 x16', moreleUrl: 'https://www.morele.net/karta-graficzna-sapphire-pulse-radeon-rx-7800-xt-16gb-gddr6-11330-02-20g-13045544/' },
  { id: 'g15', brand: 'NVIDIA', name: 'GeForce RTX 4060 Ti 8GB', vram: 8, price: 1699, wattage: 160, length: 242, memoryType: 'GDDR6', connector: 'PCIe 4.0 x8', moreleUrl: 'https://www.morele.net/karta-graficzna-msi-geforce-rtx-4060-ti-ventus-2x-black-8gb-oc-12935823/' },
  { id: 'g16', brand: 'AMD', name: 'Radeon RX 7900 GRE 16GB', vram: 16, price: 2550, wattage: 260, length: 275, memoryType: 'GDDR6', connector: 'PCIe 4.0 x16', moreleUrl: 'https://www.morele.net/karta-graficzna-xfx-radeon-rx-7900-gre-speedster-16gb-gddr6-13145600/' },
  { id: 'g17', brand: 'NVIDIA', name: 'GeForce RTX 4070 Ti SUPER 16GB', vram: 16, price: 3650, wattage: 285, length: 300, memoryType: 'GDDR6X', connector: 'PCIe 4.0 x16', moreleUrl: 'https://www.morele.net/karta-graficzna-gigabyte-geforce-rtx-4070-ti-super-windforce-oc-16gb-gddr6x-13145460/' },
  { id: 'g18', brand: 'AMD', name: 'Radeon RX 6600 8GB', vram: 8, price: 949, wattage: 132, length: 200, memoryType: 'GDDR6', connector: 'PCIe 4.0 x8', moreleUrl: 'https://www.morele.net/karta-graficzna-powercolor-radeon-rx-6600-fighter-8gb-gddr6-axrx-6600-8gbd6-3dh-9407421/' }
];

export const cases: Case[] = [
  // Twoje dotychczasowe modele
  { id: 'cs1', name: 'Endorfy Signum 300 Air', price: 290, maxGpuLength: 325, maxCpuCoolerHeight: 161, maxAioSize: 240, supportedFormFactors: ['ATX', 'mATX', 'ITX'], moreleUrl: 'https://www.morele.net/obudowa-endorfy-signum-300-air-ey2a005-11788214/' },
  { id: 'cs2', name: 'be quiet! Pure Base 500DX', price: 430, maxGpuLength: 369, maxCpuCoolerHeight: 190, maxAioSize: 360, supportedFormFactors: ['ATX', 'mATX', 'ITX'], moreleUrl: 'https://www.morele.net/obudowa-be-quiet-pure-base-500dx-bgw37-6745127/' },
  { id: 'cs3', name: 'Lian Li O11 Dynamic EVO', price: 790, maxGpuLength: 426, maxCpuCoolerHeight: 167, maxAioSize: 360, supportedFormFactors: ['ATX', 'mATX', 'ITX'], moreleUrl: 'https://www.morele.net/obudowa-lian-li-o11-dynamic-evo-o11dex-9643501/' },
  { id: 'cs4', name: 'Fractal Design North Charcoal Black', price: 650, maxGpuLength: 355, maxCpuCoolerHeight: 170, maxAioSize: 360, supportedFormFactors: ['ATX', 'mATX', 'ITX'], moreleUrl: 'https://www.morele.net/obudowa-fractal-design-north-charcoal-black-fd-c-nor1c-01-12500000/' },
  { id: 'cs5', name: 'Corsair 4000D Airflow', price: 450, maxGpuLength: 360, maxCpuCoolerHeight: 170, maxAioSize: 280, supportedFormFactors: ['ATX', 'mATX', 'ITX'], moreleUrl: 'https://www.morele.net/obudowa-corsair-4000d-airflow-cc-9011200-ww-7764953/' },
  { id: 'cs6', name: 'NZXT H7 Flow', price: 550, maxGpuLength: 400, maxCpuCoolerHeight: 185, maxAioSize: 360, supportedFormFactors: ['ATX', 'mATX', 'ITX'], moreleUrl: 'https://www.morele.net/obudowa-nzxt-h7-flow-cm-h71fw-01-11900000/' },
  { id: 'cs7', name: 'Phanteks Eclipse P400A', price: 400, maxGpuLength: 420, maxCpuCoolerHeight: 160, maxAioSize: 280, supportedFormFactors: ['ATX', 'mATX', 'ITX'], moreleUrl: 'https://www.morele.net/obudowa-phanteks-eclipse-p400a-ph-ec400atg-dbk01-6271960/' },
  { id: 'cs8', name: 'Lian Li Lancool II Mesh C Performance', price: 520, maxGpuLength: 384, maxCpuCoolerHeight: 176, maxAioSize: 360, supportedFormFactors: ['ATX', 'mATX', 'ITX'], moreleUrl: 'https://www.morele.net/obudowa-lian-li-lancool-ii-mesh-c-performance-g99-lan2mc-r0-11111111/' },
  
  // Nowe brakujące modele (uzupełnione)
  { id: 'cs9', name: 'Endorfy Ventum 200 Air', price: 225, maxGpuLength: 315, maxCpuCoolerHeight: 161, maxAioSize: 240, supportedFormFactors: ['ATX', 'mATX', 'ITX'], moreleUrl: 'https://www.morele.net/obudowa-endorfy-ventum-200-air-ey2a002-11788211/' },
  { id: 'cs10', name: 'NZXT H5 Flow Black', price: 410, maxGpuLength: 365, maxCpuCoolerHeight: 165, maxAioSize: 240, supportedFormFactors: ['ATX', 'mATX', 'ITX'], moreleUrl: 'https://www.morele.net/obudowa-nzxt-h5-flow-czarna-cc-h51fb-01-12248408/' },
  { id: 'cs11', name: 'Montech AIR 903 MAX Black', price: 349, maxGpuLength: 400, maxCpuCoolerHeight: 180, maxAioSize: 360, supportedFormFactors: ['ATX', 'mATX', 'ITX'], moreleUrl: 'https://www.morele.net/obudowa-montech-air-903-max-czarna-13113576/' },
  { id: 'cs12', name: 'Fractal Design Pop Air RGB TG', price: 420, maxGpuLength: 380, maxCpuCoolerHeight: 170, maxAioSize: 280, supportedFormFactors: ['ATX', 'mATX', 'ITX'], moreleUrl: 'https://www.morele.net/obudowa-fractal-design-pop-air-rgb-black-tg-fd-c-por1a-06-10771694/' },
  { id: 'cs13', name: 'Genesis Irid 505 V2', price: 260, maxGpuLength: 380, maxCpuCoolerHeight: 165, maxAioSize: 280, supportedFormFactors: ['ATX', 'mATX', 'ITX'], moreleUrl: 'https://www.morele.net/obudowa-genesis-irid-505-v2-npc-1872-11003460/' }
];

export const psus: PSU[] = [
  // Twoje dotychczasowe modele
  { id: 'p1', name: 'MSI MAG A550BN 550W', price: 220, wattage: 550, moreleUrl: 'https://www.morele.net/zasilacz-msi-mag-a550bn-550w-9276221/' },
  { id: 'p2', name: 'be quiet! Pure Power 12 M 750W', price: 480, wattage: 750, moreleUrl: 'https://www.morele.net/zasilacz-be-quiet-pure-power-12-m-750w-bn343-12628352/' },
  { id: 'p3', name: 'MSI MAG A850GL 850W ATX 3.0', price: 520, wattage: 850, moreleUrl: 'https://www.morele.net/zasilacz-msi-mag-a850gl-850w-12965646/' },
  { id: 'p4', name: 'Seasonic Focus GX-750 750W', price: 590, wattage: 750, moreleUrl: 'https://www.morele.net/zasilacz-seasonic-focus-gx-750-750w-focus-gx-750-6421074/' },
  { id: 'p5', name: 'Corsair RM750e 750W ATX 3.0', price: 550, wattage: 750, moreleUrl: 'https://www.morele.net/zasilacz-corsair-rm750e-750w-cp-9020262-eu-12704179/' },
  { id: 'p6', name: 'Endorfy Supremo FM5 750W', price: 450, wattage: 750, moreleUrl: 'https://www.morele.net/zasilacz-endorfy-supremo-fm5-750w-ey7a008-11788224/' },
  { id: 'p7', name: 'be quiet! Straight Power 12 850W', price: 750, wattage: 850, moreleUrl: 'https://www.morele.net/zasilacz-be-quiet-straight-power-12-850w-bn337-12668576/' },
  { id: 'p8', name: 'Corsair RM850x 850W', price: 720, wattage: 850, moreleUrl: 'https://www.morele.net/zasilacz-corsair-rm850x-850w-cp-9020200-eu-8445771/' },
  
  // Nowe brakujące modele (uzupełnione)
  { id: 'p9', name: 'Endorfy Vero L5 Bronze 600W', price: 239, wattage: 600, moreleUrl: 'https://www.morele.net/zasilacz-endorfy-vero-l5-bronze-600w-ey7a005-12776403/' },
  { id: 'p10', name: 'MSI MAG A650BN 650W', price: 249, wattage: 650, moreleUrl: 'https://www.morele.net/zasilacz-msi-mag-a650bn-650w-9355157/' },
  { id: 'p11', name: 'be quiet! Pure Power 12 M 850W', price: 570, wattage: 850, moreleUrl: 'https://www.morele.net/zasilacz-be-quiet-pure-power-12-m-850w-bn344-12628353/' },
  { id: 'p12', name: 'Gigabyte UD850GM 850W ATX 3.0', price: 435, wattage: 850, moreleUrl: 'https://www.morele.net/zasilacz-gigabyte-ud850gm-850w-gp-ud850gm-10493836/' },
  { id: 'p13', name: 'Corsair RM1000e 1000W ATX 3.0', price: 749, wattage: 1000, moreleUrl: 'https://www.morele.net/zasilacz-corsair-rm1000e-1000w-cp-9020264-eu-12704181/' }
];