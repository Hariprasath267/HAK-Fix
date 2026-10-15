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
  TrendingUp,
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
    <section className="py-16 sm:py-20 bg-slate-50/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#0C2340] text-xs font-bold uppercase tracking-wider mb-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>Comprehensive Home Care</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">{t.subtitle}</p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setCurrentPage('services');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF7A00] hover:text-[#e66e00] hover:underline cursor-pointer"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid (8 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORY_CARDS.map((cat) => {
            const Icon = cat.icon;
            const categoryName = getCategoryName(cat.id, language);

            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="group relative bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
              >
                {/* Image Banner */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={cat.imageUrl}
                    alt={categoryName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  {/* Icon Badge */}
                  <div className="absolute bottom-3 left-3 p-2 rounded-2xl bg-white text-slate-900 shadow-md flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#FF7A00]" />
                  </div>
                  {cat.popular && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#FF7A00] text-white text-[10px] font-bold shadow-sm">
                      Popular
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-[#FF7A00] transition-colors">
                      {categoryName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">{t.from}</span>
                      <span className="text-sm font-extrabold text-slate-900">
                        ₹{cat.startingPrice}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF7A00] group-hover:translate-x-0.5 transition-transform">
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
