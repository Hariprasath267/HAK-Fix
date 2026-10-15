import React from 'react';
import { Star, Sparkle } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Dr. Priya Narayanan',
      location: 'Anna Nagar, Chennai',
      rating: 5,
      role: 'Homeowner',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      comment:
        'My master bedroom AC started blowing warm air right in the middle of a hot Chennai summer afternoon. Imran from HAK fix arrived within 40 minutes with a pressure jet kit. He explained the gas pressure test clearly, filled R32 gas and now it chills at 18 degrees effortlessly.',
      service: 'AC Servicing & Gas Refill',
    },
    {
      name: 'Anand Venkatesh',
      location: 'Indiranagar, Bengaluru',
      rating: 5,
      role: 'Apartment Secretary',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      comment:
        'We booked HAK fix for a concealed pipeline leakage that two local plumbers had failed to locate. Suresh diagnosed the damp spot using a moisture sensor and replaced the CPVC elbow without destroying our entire wall tiles. Transparent billing with GST receipt!',
      service: 'Plumbing & Concealed Leak Repair',
    },
    {
      name: 'Kavitha Ramesh',
      location: 'Adyar, Chennai',
      rating: 5,
      role: 'Working Professional',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      comment:
        'The "Describe Your Problem" AI feature is brilliant! I typed "kitchen tap dripping all over bottom cabinet" and it instantly recommended the exact washer fix and gave an accurate ₹299 quote. Booking took less than 60 seconds.',
      service: 'AI Diagnosis & Tap Repair',
    },
  ];

  return (
    <section className="py-20 sm:py-24 ambient-mesh-bg border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-[#0071E3] text-xs font-semibold uppercase tracking-widest mb-2">
            <Sparkle className="w-3.5 h-3.5" />
            <span>Real Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Loved by Over 10,000+ Families
          </h2>
          <p className="text-sm text-slate-500 mt-1.5 font-normal">
            Read real feedback from neighbors who resolved their home maintenance with HAK fix.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="apple-card-3d bg-white/85 backdrop-blur-xl rounded-[2rem] p-7 sm:p-8 border border-white/90 flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal italic">
                  "{t.comment}"
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-xs"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 tracking-tight">{t.name}</h4>
                    <p className="text-[11px] text-slate-400 font-normal">{t.location}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0071E3] text-[10px] font-semibold">
                  {t.service.split('&')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
