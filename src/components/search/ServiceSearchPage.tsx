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
} from 'lucide-react';

export const ServiceSearchPage: React.FC = () => {
  const {
    providers,
    services,
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
        // Search query filter (matches name, bio, skills, category, areas)
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
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Local Service Experts
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Find verified trade professionals across Chennai and Bengaluru with transparent INR rates.
            </p>
          </div>
          <button
            onClick={() => setIsAiFinderOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Describe Problem (AI Diagnostic)</span>
          </button>
        </div>

        {/* Search Bar Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-3xl border border-slate-200 shadow-xs mb-8 flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by specialist name, problem (e.g. tap leak, MCB), or skill..."
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-orange-500"
            />
          </div>
          <div className="relative w-full sm:w-48">
            <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchPinCode}
              onChange={(e) => setSearchPinCode(e.target.value)}
              placeholder="PIN Code (e.g. 600017)"
              maxLength={6}
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-orange-500"
            />
          </div>
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="sm:hidden w-full py-2 px-4 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 cursor-pointer"
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
            } bg-white p-6 rounded-3xl border border-slate-200 shadow-xs h-fit`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#FF7A00]" />
                Filters
              </span>
              <button
                onClick={resetFilters}
                className="text-xs text-[#FF7A00] hover:text-[#e66e00] flex items-center gap-1 font-medium cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
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
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                      localCategory === cat.id
                        ? 'bg-orange-50 text-[#FF7A00] font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {localCategory === cat.id && <span className="text-[#FF7A00] font-bold">&bull;</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Max Starting Price
                </label>
                <span className="text-xs font-bold text-emerald-600">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min={200}
                max={2000}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹200</span>
                <span>₹2,000+</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Minimum Rating
              </label>
              <div className="flex gap-1.5">
                {[0, 4.0, 4.5, 4.8].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      selectedRating === rating
                        ? 'border-orange-500 bg-orange-50 text-[#FF7A00] font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {rating === 0 ? 'Any' : `${rating}★`}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-700 font-medium">
                <input
                  type="checkbox"
                  checked={availabilityOnly}
                  onChange={(e) => setAvailabilityOnly(e.target.checked)}
                  className="w-4 h-4 text-orange-600 rounded-md focus:ring-orange-500"
                />
                <span>Available Today Only</span>
              </label>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-3 space-y-4">
            {/* Sorting bar & count */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-600">
                Showing <strong className="text-slate-900">{filteredProviders.length}</strong>{' '}
                verified professionals
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-slate-800 font-semibold focus:outline-orange-500"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="experience">Most Experienced</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {filteredProviders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredProviders.map((pro) => (
                  <div
                    key={pro.id}
                    className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Pro Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={pro.photoUrl}
                            alt={pro.name}
                            className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                            loading="lazy"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-bold text-sm sm:text-base text-slate-900">
                                {pro.name}
                              </h3>
                              {pro.isVerified && (
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                              )}
                            </div>
                            <span className="text-xs font-semibold text-[#FF7A00]">
                              {getCategoryName(pro.category, language)}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                              <span className="flex items-center text-amber-500 font-bold">
                                <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                                {pro.rating}
                              </span>
                              <span>({pro.reviewCount})</span>
                              <span className="text-slate-300">&bull;</span>
                              <span>{pro.experienceYears} yrs exp</span>
                            </div>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                            pro.availabilityToday
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {pro.availabilityToday ? 'Available Today' : 'Scheduled'}
                        </span>
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                        {pro.bio}
                      </p>

                      {/* Service Areas */}
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">
                          {pro.city}: {pro.serviceAreas.join(', ')}
                        </span>
                      </div>

                      {/* Skills Tags */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {pro.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action bar */}
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Starting from</span>
                        <span className="text-base font-extrabold text-slate-900">
                          ₹{pro.startingPrice}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openProviderProfile(pro.id)}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() => startBookingForProvider(pro.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all flex items-center gap-1 cursor-pointer"
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
              /* Empty State */
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
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
                  className="px-4 py-2 rounded-xl bg-[#FF7A00] text-white text-xs font-semibold shadow-md cursor-pointer"
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
