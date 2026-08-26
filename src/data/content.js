import {
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  Hammer,
  HardHat,
  Layers3,
  MapPin,
  Phone,
  PlugZap,
  Ruler,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Wrench
} from 'lucide-react';

export const company = {
  name: 'Advait Infra',
  tagline: 'Build Your Dreams',
  subBrand: 'PEB Structure | Building Construction | Fabrication Work',
  legalEntity: 'B & K Sons Engineering Works',
  founder: 'Er. Shubham Vilas Bidve',
  founderRole: 'Founder & Director',
  founded: '2016',
  gstin: '27FOKPK1720Q1ZF / 27BLYPB3112J1ZO',
  phones: ['+91 88884 12141', '+91 74600 97009'],
  email: 'advaitinfra88@gmail.com',
  address:
    'Plot No. 1, SR. No. 21/1/1, Block-G, MIDC, Nimblak, Tal. Nagar, Dist. Ahmednagar, MH 414111'
};

export const stats = [
  { label: 'Clients', value: 100, suffix: '+', icon: UsersRound },
  { label: 'Work in States', value: 5, suffix: '+', icon: MapPin },
  { label: 'Total Employees', value: 65, suffix: '+', icon: HardHat },
  { label: 'Total Turnover', prefix: '₹', value: 15, suffix: ' Cr+', icon: Sparkles }
];

export const about = {
  story:
    'Building a legacy of excellence since 2016. Founded by Er. Shubham Vilas Bidve, a seasoned professional in PEB Structure, Fabrication & Civil Engineering, Advait Infra has emerged as a leading player in the construction industry. With a remarkable turnover of ₹15 Cr, their unwavering commitment to excellence and innovation sets them apart in the market.',
  commitment:
    'Driven by a relentless pursuit of excellence, Advait Infra is dedicated to delivering projects of the highest quality. Its commitment to safety, sustainability, and client-centric solutions underscores an unwavering dedication to exceeding industry standards and client expectations.',
  vision:
    "A future built on enduring relationships, exemplary construction practices, and sustainable development. Advait Infra strives to be a trusted partner in bringing clients' visions to life, while contributing to the advancement of the construction industry."
};

export const services = [
  {
    title: 'PEB Construction',
    icon: Factory,
    description:
      'Pre-Engineered Buildings (PEB) are buildings engineered at a factory and assembled at site. Steel structures use built-up sections fabricated to desired shapes and sizes, transported to site, and assembled with bolted connections.'
  },
  {
    title: 'Civil Construction',
    icon: Building2,
    description:
      'Focused on quality craftsmanship and attention to detail, Advait Infra delivers exceptional civil construction projects tailored to client needs, supported by structural engineers.'
  },
  {
    title: 'MEP Services & Solutions',
    icon: PlugZap,
    description:
      'Comprehensive MEP services covering design, installation, and maintenance of Mechanical, Electrical, and Plumbing systems for seamless integration and optimal functionality.'
  },
  {
    title: 'Turnkey Project Solutions',
    icon: ClipboardCheck,
    description:
      'As turnkey project contractors, Advait Infra oversees every aspect of a project from start to finish, giving clients a hassle-free and efficient construction experience.'
  }
];

export const whyUs = [
  {
    title: 'Turnkey Delivery',
    description: 'One accountable team from engineering drawings to handover.',
    icon: CheckCircle2
  },
  {
    title: 'In-House Fabrication',
    description: 'Factory-built steel sections with site-ready bolted assembly.',
    icon: Wrench
  },
  {
    title: 'Safety & Sustainability',
    description: 'Quality systems shaped around durable, responsible construction.',
    icon: ShieldCheck
  },
  {
    title: 'Pan-State Experience',
    description: 'Project delivery experience across 5+ states and varied sites.',
    icon: Layers3
  }
];

export const projects = [
  { name: 'Krushinath Sugar Factory', category: 'Industrial', query: 'steel factory construction' },
  { name: 'Autade Construction', category: 'Civil Works', query: 'construction site concrete' },
  { name: 'Esbee Electrotech Pvt Ltd', category: 'Industrial', query: 'industrial warehouse steel' },
  { name: 'BPCL Pump Canopy', category: 'Fuel Infra', query: 'fuel station canopy' },
  { name: 'Commercial Kopergaon', category: 'Commercial', query: 'commercial building construction' },
  { name: 'RK Industries', category: 'Fabrication', query: 'metal fabrication workshop' }
];

export const processSteps = [
  { title: 'Design & Engineering', icon: Ruler },
  { title: 'Fabrication', icon: Hammer },
  { title: 'Site Assembly', icon: HardHat },
  { title: 'Handover', icon: CheckCircle2 }
];
