import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { translations, getCategoryName } from '../../utils/translations.ts';
import { ServiceCategory } from '../../types/index.ts';
import {
  Zap,
  Wrench,
  Wind,
  Sparkles,
  Hammer,
  Tv,
  Paintbrush,
  Bug,
  ArrowRight,
  Sparkle,
} from 'lucide-react';

interface CategoryCardInfo {
  id: ServiceCategory;
  icon: React.ElementType;
  description: string;
  startingPrice: number;
  imageUrl: string;
  popular?: boolean;
}

const CATEGORY_CARDS: CategoryCardInfo[] = [
  {
    id: 'electrical',
    icon: Zap,
    description: 'Switchboards, MCB tripping, fan installation, emergency short circuits & wiring.',
    startingPrice: 249,
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80',
    popular: true,
  },
  {
    id: 'plumbing',
    icon: Wrench,
    description: 'Tap & pipe leakages, bathroom fittings, choked drains, sump motor & geyser repair.',
    startingPrice: 299,
    imageUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=500&auto=format&fit=crop&q=80',
    popular: true,
  },
  {
    id: 'ac_repair',
    icon: Wind,
    description: 'High-pressure foam jet servicing, cooling coil cleaning, gas charging & PCB fixes.',
    startingPrice: 499,
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&auto=format&fit=crop&q=80',
    popular: true,
  },
  {
    id: 'cleaning',
    icon: Sparkles,
    description: 'Full home deep sanitization, hard water tile scrub, kitchen degreasing & sofa shampoo.',
    startingPrice: 799,
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80',
    popular: true,
  },
  {
    id: 'carpentry',
    icon: Hammer,
    description: 'Godrej lock fitting, door latch & hinge realignment, furniture assembly & woodwork.',
    startingPrice: 349,
    imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'appliance',
    icon: Tv,
    description: 'Washing machine drum spin issues, refrigerator cooling loss & microwave repair.',
    startingPrice: 399,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'painting',
    icon: Paintbrush,
    description: 'Moisture seepage waterproofing, wall crack filling & washable luxury emulsion coat.',
    startingPrice: 999,
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'pest_control',
    icon: Bug,
    description: 'Bayer herbal cockroach gel dots, subterranean termite eradication & bedbug warranty.',
    startingPrice: 699,
    imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=500&auto=format&fit=crop&q=80',
  },
];

export const CategoriesGrid: React.FC = () => {
  const { language, setSelectedCategory, setCurrentPage } = useApp();
  const t = translations[language].categories;

  const handleCategoryClick = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setCurrentPage('services');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <section className="py-20 sm:py-24 border-b border-slate-200/80 relative subtle-photo-backdrop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-2">
              <Sparkle className="w-3.5 h-3.5" />
              <span>Expert Craftsmanship</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.title}
            </h2>
            <p className="text-sm text-slate-500 mt-1.5 max-w-xl font-normal leading-relaxed">
              {t.subtitle}
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setCurrentPage('services');
            }}
            className="px-4 py-2 rounded-full btn-3d-secondary text-xs flex items-center gap-1.5 cursor-pointer group"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0071E3] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3D Apple-Grade Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {CATEGORY_CARDS.map((cat) => {
            const Icon = cat.icon;
            const categoryName = getCategoryName(cat.id, language);

            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="apple-card-3d group relative overflow-hidden flex flex-col cursor-pointer"
              >
                {/* 3D Photo Canvas */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={cat.imageUrl}
                    alt={categoryName}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                  
                  {/* Floating 3D Icon Badge */}
                  <div className="absolute bottom-3.5 left-3.5 p-2.5 rounded-2xl bg-white/95 text-slate-900 shadow-[0_8px_16px_rgba(0,0,0,0.15)] flex items-center justify-center border border-white/80 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-[#0071E3]" />
                  </div>
                  
                  {cat.popular && (
                    <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-[#0071E3] text-white text-[10px] font-semibold tracking-wide shadow-md shadow-blue-500/25">
                      Popular
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#0071E3] transition-colors tracking-tight">
                      {categoryName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-normal">
                      {cat.description}
                    </p>
                  </div>
                  
                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                        {t.from}
                      </span>
                      <span className="text-base font-bold text-slate-900 tracking-tight">
                        ₹{cat.startingPrice}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0071E3] group-hover:translate-x-1 transition-transform">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
