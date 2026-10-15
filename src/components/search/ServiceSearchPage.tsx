import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { translations, getCategoryName } from '../../utils/translations.ts';
import { ServiceCategory } from '../../types/index.ts';
import {
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  Wrench,
  ArrowLeft,
} from 'lucide-react';

export const ServiceSearchPage: React.FC = () => {
  const {
    providers,
    language,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    searchPinCode,
    setSearchPinCode,
    openProviderProfile,
    startBookingForProvider,
    setIsAiFinderOpen,
    goBack,
    getBackTitle,
  } = useApp();

  const [localCategory, setLocalCategory] = useState<ServiceCategory | 'all'>(
    selectedCategory || 'all'
  );
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [availabilityOnly, setAvailabilityOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price_asc' | 'price_desc' | 'experience'>(
    'rating'
  );
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filtering & Sorting logic
  const filteredProviders = useMemo(() => {
    return providers
      .filter((p) => {
        // Category filter
        if (localCategory !== 'all' && p.category !== localCategory) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBio = p.bio.toLowerCase().includes(q);
          const matchCategory = p.categoryName.toLowerCase().includes(q);
          const matchSkills = p.skills.some((s) => s.toLowerCase().includes(q));
          const matchAreas = p.serviceAreas.some((a) => a.toLowerCase().includes(q));
          if (!matchName && !matchBio && !matchCategory && !matchSkills && !matchAreas) {
            return false;
          }
        }
        // PIN code filter
        if (searchPinCode.trim()) {
          const pin = searchPinCode.trim();
          if (!p.pinCodes.some((code) => code.includes(pin))) {
            return false;
          }
        }
        // Rating filter
        if (selectedRating > 0 && p.rating < selectedRating) {
          return false;
        }
        // Max starting price filter
        if (p.startingPrice > maxPrice) {
          return false;
        }
        // Availability today filter
        if (availabilityOnly && !p.availabilityToday) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price_asc') return a.startingPrice - b.startingPrice;
        if (sortBy === 'price_desc') return b.startingPrice - a.startingPrice;
        if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
        return 0;
      });
  }, [
    providers,
    localCategory,
    searchQuery,
    searchPinCode,
    selectedRating,
    maxPrice,
    availabilityOnly,
    sortBy,
  ]);

  const resetFilters = () => {
    setLocalCategory('all');
    setSelectedCategory(null);
    setSearchQuery('');
    setSearchPinCode('');
    setSelectedRating(0);
    setMaxPrice(2000);
    setAvailabilityOnly(false);
    setSortBy('rating');
  };

  const categoriesList: Array<{ id: ServiceCategory | 'all'; label: string }> = [
    { id: 'all', label: 'All Categories' },
    { id: 'electrical', label: 'Electrical' },
    { id: 'plumbing', label: 'Plumbing' },
    { id: 'ac_repair', label: 'AC Repair' },
    { id: 'cleaning', label: 'Home Cleaning' },
    { id: 'carpentry', label: 'Carpentry' },
    { id: 'appliance', label: 'Appliance Repair' },
    { id: 'painting', label: 'Painting' },
    { id: 'pest_control', label: 'Pest Control' },
  ];

  return (
    <div className="ambient-mesh-bg min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Back navigation */}
        <div>
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 text-xs font-semibold border border-slate-200/80 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#0071E3]" />
            <span>{getBackTitle()}</span>
          </button>
        </div>

        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Local Service Experts
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-normal">
              Find verified trade professionals across Chennai and Bengaluru with transparent INR rates.
            </p>
          </div>
          <button
            onClick={() => setIsAiFinderOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200/80 shadow-xs transition-all cursor-pointer hover:border-[#0071E3]/50"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0071E3]" />
            <span>Describe Problem (AI Diagnostic)</span>
          </button>
        </div>

        {/* Apple 3D Search Bar */}
        <div className="apple-glass p-3 sm:p-4 rounded-[2rem] flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by specialist name, problem (e.g. tap leak, MCB), or skill..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white/90 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3] border border-slate-200/60 shadow-inner"
            />
          </div>
          <div className="relative w-full sm:w-52">
            <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchPinCode}
              onChange={(e) => setSearchPinCode(e.target.value)}
              placeholder="PIN Code (e.g. 600017)"
              maxLength={6}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white/90 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0071E3] border border-slate-200/60 shadow-inner"
            />
          </div>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="sm:hidden w-full py-2.5 px-4 rounded-full border border-slate-300 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 cursor-pointer bg-white"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters &amp; Sort</span>
          </button>
        </div>

        {/* Layout: Sidebar Filters + Main Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div
            className={`space-y-6 ${
              showMobileFilters ? 'block' : 'hidden lg:block'
            } apple-glass p-6 sm:p-7 rounded-[2rem] h-fit`}
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/60">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#0071E3]" />
                Filters
              </span>
              <button
                onClick={resetFilters}
                className="text-xs text-[#0071E3] hover:text-[#0058B6] flex items-center gap-1 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                Service Category
              </label>
              <div className="space-y-1">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setLocalCategory(cat.id);
                      if (cat.id !== 'all') setSelectedCategory(cat.id as ServiceCategory);
                      else setSelectedCategory(null);
                    }}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                      localCategory === cat.id
                        ? 'bg-blue-50/80 text-[#0071E3] font-semibold'
                        : 'text-slate-600 hover:bg-slate-100/60'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {localCategory === cat.id && <span className="text-[#0071E3] font-bold">&bull;</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Max Starting Price
                </label>
                <span className="text-xs font-bold text-[#0071E3]">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min={200}
                max={2000}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#0071E3] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹200</span>
                <span>₹2,000+</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                Minimum Rating
              </label>
              <div className="flex gap-1.5">
                {[0, 4.0, 4.5, 4.8].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      selectedRating === rating
                        ? 'border-[#0071E3] bg-blue-50 text-[#0071E3]'
                        : 'border-slate-200 text-slate-600 hover:bg-white'
                    }`}
                  >
                    {rating === 0 ? 'Any' : `${rating}★`}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div className="pt-2 border-t border-slate-200/60">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-700 font-medium">
                <input
                  type="checkbox"
                  checked={availabilityOnly}
                  onChange={(e) => setAvailabilityOnly(e.target.checked)}
                  className="w-4 h-4 text-[#0071E3] rounded-md focus:ring-[#0071E3]"
                />
                <span>Available Today Only</span>
              </label>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-3 space-y-5">
            {/* Sorting bar & count */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 apple-glass p-4 rounded-2xl">
              <span className="text-xs font-medium text-slate-600">
                Showing <strong className="text-slate-900">{filteredProviders.length}</strong> verified professionals
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white/80 border border-slate-200/80 rounded-xl px-3 py-1 text-slate-800 font-semibold focus:outline-[#0071E3]"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="experience">Most Experienced</option>
                </select>
              </div>
            </div>

            {/* 3D Results Grid */}
            {filteredProviders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProviders.map((pro) => (
                  <div
                    key={pro.id}
                    className="apple-card-3d bg-white/85 backdrop-blur-xl rounded-[2rem] border border-white/90 p-6 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Pro Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={pro.photoUrl}
                            alt={pro.name}
                            className="w-14 h-14 rounded-2xl object-cover border border-slate-200/80 shrink-0 shadow-sm"
                            loading="lazy"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-bold text-base text-slate-900 tracking-tight">
                                {pro.name}
                              </h3>
                              {pro.isVerified && (
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                              )}
                            </div>
                            <span className="text-xs font-semibold text-[#0071E3]">
                              {getCategoryName(pro.category, language)}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                              <span className="flex items-center text-amber-500 font-semibold">
                                <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                                {pro.rating}
                              </span>
                              <span className="text-slate-400">({pro.reviewCount})</span>
                              <span className="text-slate-300">&bull;</span>
                              <span className="text-slate-500">{pro.experienceYears} yrs exp</span>
                            </div>
                          </div>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide shrink-0 ${
                            pro.availabilityToday
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {pro.availabilityToday ? 'Available Today' : 'Scheduled'}
                        </span>
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-slate-600 mt-3.5 line-clamp-2 leading-relaxed font-normal">
                        {pro.bio}
                      </p>

                      {/* Service Areas */}
                      <div className="mt-3.5 flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">
                          {pro.city}: {pro.serviceAreas.join(', ')}
                        </span>
                      </div>

                      {/* Skills Tags */}
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {pro.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-slate-100/90 text-slate-700 px-2.5 py-1 rounded-xl font-medium border border-slate-200/50"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action bar */}
                    <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                          Starting from
                        </span>
                        <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                          ₹{pro.startingPrice}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openProviderProfile(pro.id)}
                          className="px-3.5 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-all cursor-pointer"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() => startBookingForProvider(pro.id)}
                          className="px-4 py-2 rounded-full apple-btn-3d text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="apple-glass rounded-[2rem] p-12 text-center border border-white/80 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0071E3] flex items-center justify-center mx-auto shadow-inner">
                  <Wrench className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">No technicians found</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    We could not find professionals matching your specific filters. Try expanding your
                    price range, resetting the category, or checking other PIN codes.
                  </p>
                </div>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-full apple-btn-3d text-white text-xs font-semibold shadow-md cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
