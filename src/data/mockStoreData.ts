export interface Product {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  productType: string;
  price: number;
  compareAtPrice?: number;
  available: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  specs: { [key: string]: string };
  image: string;
  secondaryImage?: string;
  variants: {
    id: string;
    title: string;
    price: number;
    compareAtPrice?: number;
    available: boolean;
    sku: string;
  }[];
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  productCount: number;
  image: string;
}

// Import generated images
import heroImg from '../assets/images/hero_gaming_setup_1790238438789.jpg';
import pcImg from '../assets/images/product_gaming_pc_1790238456223.jpg';
import kbImg from '../assets/images/product_keyboard_1790238468888.jpg';
import mouseImg from '../assets/images/product_mouse_1790238486115.jpg';
import roomImg from '../assets/images/setup_banner_room_1790238502166.jpg';

export { heroImg, pcImg, kbImg, mouseImg, roomImg };

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    title: 'AVEART Apex Ultra Gaming Desktop PC',
    handle: 'aveart-apex-ultra-gaming-pc',
    vendor: 'AVEART',
    productType: 'Gaming PCs',
    price: 2499.00,
    compareAtPrice: 2799.00,
    available: true,
    rating: 5.0,
    reviewCount: 94,
    description: 'Precision-engineered liquid-cooled gaming powerhouse with CNC aluminum chassis, quiet acoustic dampening, and sustained tournament clock speeds.',
    specs: {
      'Processor': 'Intel Core i9-14900KF (24-Core, 6.0 GHz)',
      'Graphics': 'NVIDIA GeForce RTX 4090 24GB GDDR6X',
      'Memory': '64GB DDR5-6000MHz Low-Latency',
      'Storage': '2TB PCIe 4.0 NVMe M.2 SSD',
      'Cooling': '360mm Closed-Loop Liquid Thermal Matrix'
    },
    image: pcImg,
    secondaryImage: roomImg,
    variants: [
      { id: 'v_pc_1', title: 'RTX 4090 / 64GB DDR5', price: 2499.00, compareAtPrice: 2799.00, available: true, sku: 'AV-PC-4090-64' },
      { id: 'v_pc_2', title: 'RTX 4080 Super / 32GB DDR5', price: 1999.00, compareAtPrice: 2199.00, available: true, sku: 'AV-PC-4080-32' }
    ]
  },
  {
    id: 'prod_2',
    title: 'AVEART Precision 75% Custom Mechanical Keyboard',
    handle: 'aveart-precision-75-keyboard',
    vendor: 'AVEART',
    productType: 'Keyboards',
    price: 219.00,
    compareAtPrice: 249.00,
    available: true,
    rating: 4.9,
    reviewCount: 168,
    description: 'CNC machined anodized aluminum case with gasket mount suspension, factory lubricated magnetic hall-effect switches, and ultra-durable PBT keycaps.',
    specs: {
      'Switches': 'AVEART Linear Magnetic (Rapid Trigger 0.1mm)',
      'Mounting': 'Poron Gasket Suspension Isolation',
      'Polling Rate': '8000Hz Ultra-Low Latency',
      'Connectivity': 'Detachable Braided USB-C / 2.4GHz Wireless'
    },
    image: kbImg,
    secondaryImage: pcImg,
    variants: [
      { id: 'v_kb_1', title: 'Anodized Matte Black / Linear', price: 219.00, compareAtPrice: 249.00, available: true, sku: 'AV-KB-75-BLK' },
      { id: 'v_kb_2', title: 'Brushed Silver / Tactile', price: 219.00, compareAtPrice: 249.00, available: true, sku: 'AV-KB-75-SLV' }
    ]
  },
  {
    id: 'prod_3',
    title: 'AVEART Featherweight Wireless 8K Gaming Mouse',
    handle: 'aveart-featherweight-wireless-mouse',
    vendor: 'AVEART',
    productType: 'Mice',
    price: 139.00,
    compareAtPrice: 159.00,
    available: true,
    rating: 4.9,
    reviewCount: 214,
    description: '49-gram ultra-lightweight symmetrical esports wireless mouse equipped with 30,000 DPI optical sensor, pure PTFE skates, and 90-hour battery life.',
    specs: {
      'Weight': '49 grams (Hole-Free Solid Shell)',
      'Sensor': 'PAW3395 Optical (30,000 DPI, 750 IPS)',
      'Polling Rate': 'Native 8000Hz Wireless Transceiver',
      'Battery': 'Up to 90 Hours Continuous Gameplay'
    },
    image: mouseImg,
    secondaryImage: kbImg,
    variants: [
      { id: 'v_m_1', title: 'Pure Chalk White', price: 139.00, compareAtPrice: 159.00, available: true, sku: 'AV-MS-WHT' },
      { id: 'v_m_2', title: 'Stealth Matte Black', price: 139.00, compareAtPrice: 159.00, available: true, sku: 'AV-MS-BLK' }
    ]
  },
  {
    id: 'prod_4',
    title: 'AVEART Horizon 34-Inch Curved OLED 240Hz Display',
    handle: 'aveart-horizon-34-curved-oled',
    vendor: 'AVEART',
    productType: 'Monitors',
    price: 899.00,
    compareAtPrice: 999.00,
    available: true,
    rating: 5.0,
    reviewCount: 72,
    description: '0.03ms response time QD-OLED ultrawide panel featuring 240Hz refresh rate, 99.3% DCI-P3 color gamut, and integrated custom graphene heatsink.',
    specs: {
      'Resolution': '3440 x 1440 Ultrawide QHD (21:9)',
      'Panel': 'Quantum Dot OLED (0.03ms GtG)',
      'Refresh Rate': '240Hz Adaptive Sync (G-SYNC Compatible)',
      'Ports': '2x DisplayPort 1.4, 2x HDMI 2.1, 90W USB-C'
    },
    image: heroImg,
    secondaryImage: roomImg,
    variants: [
      { id: 'v_mon_1', title: '34" Curved QD-OLED / 240Hz', price: 899.00, compareAtPrice: 999.00, available: true, sku: 'AV-MON-34-OLED' }
    ]
  },
  {
    id: 'prod_5',
    title: 'AVEART Acoustic Studio Pro Wireless Headset',
    handle: 'aveart-acoustic-studio-pro-headset',
    vendor: 'AVEART',
    productType: 'Headsets',
    price: 199.00,
    compareAtPrice: 229.00,
    available: true,
    rating: 4.8,
    reviewCount: 88,
    description: 'Planar magnetic 50mm dynamic drivers tuned for competitive spatial accuracy, broadcast-grade detachable microphone, and memory foam cooling gel pads.',
    specs: {
      'Drivers': '50mm Planar Magnetic Custom Diaphragm',
      'Microphone': 'Supercardioid 9.9mm Condenser Capsule',
      'Wireless': '2.4GHz Lossless + Bluetooth 5.3 Multipoint',
      'Cushions': 'Breathable Mesh with Cooling Gel Infusion'
    },
    image: roomImg,
    secondaryImage: kbImg,
    variants: [
      { id: 'v_hs_1', title: 'Carbon Black Edition', price: 199.00, compareAtPrice: 229.00, available: true, sku: 'AV-HS-BLK' }
    ]
  },
  {
    id: 'prod_6',
    title: 'AVEART Cordura Heavy Precision Desk Mat (900x400)',
    handle: 'aveart-cordura-precision-desk-mat',
    vendor: 'AVEART',
    productType: 'Accessories',
    price: 49.00,
    available: true,
    rating: 4.9,
    reviewCount: 310,
    description: 'Genuine military-spec Cordura water-resistant fabric with micro-textured weave, anti-slip natural rubber base, and low-profile stitched borders.',
    specs: {
      'Material': 'Authentic CORDURA 500D Textile',
      'Dimensions': '900mm x 400mm x 4mm',
      'Surface': 'Hybrid Speed & Micro-Control Balanced'
    },
    image: heroImg,
    secondaryImage: mouseImg,
    variants: [
      { id: 'v_mat_1', title: '900 x 400mm / Deep Charcoal', price: 49.00, available: true, sku: 'AV-MAT-900' }
    ]
  }
];

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'col_1',
    title: 'Gaming PCs',
    handle: 'gaming-pcs',
    description: 'Extreme-performance pre-built workstations with custom liquid thermal loops.',
    productCount: 1,
    image: pcImg
  },
  {
    id: 'col_2',
    title: 'Monitors & Displays',
    handle: 'monitors',
    description: 'OLED and Fast-IPS displays with 240Hz+ refresh rates and true sub-1ms response times.',
    productCount: 1,
    image: heroImg
  },
  {
    id: 'col_3',
    title: 'Mechanical Keyboards',
    handle: 'keyboards',
    description: 'Custom CNC aluminum mechanical keyboards with rapid trigger magnetic switches.',
    productCount: 1,
    image: kbImg
  },
  {
    id: 'col_4',
    title: 'Esports Mice',
    handle: 'mice',
    description: 'Ultra-lightweight wireless gaming mice engineered for competitive precision.',
    productCount: 1,
    image: mouseImg
  },
  {
    id: 'col_5',
    title: 'Audio & Headsets',
    handle: 'headsets',
    description: 'Audiophile-grade acoustic drivers tuned for 360-degree spatial localization.',
    productCount: 1,
    image: roomImg
  },
  {
    id: 'col_6',
    title: 'Desk Accessories',
    handle: 'accessories',
    description: 'Cordura desk surfaces, aluminum monitor mounts, and unified cable channels.',
    productCount: 1,
    image: heroImg
  }
];
