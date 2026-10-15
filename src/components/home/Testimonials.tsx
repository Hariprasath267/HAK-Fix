import React from 'react';
import { Star } from 'lucide-react';

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
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#FF7A00] font-bold text-xs uppercase tracking-wider">
            Verified Homeowner Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Loved by Over 10,000+ Families
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Read real feedback from neighbors who resolved their home maintenance with HAK fix.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{t.name}</h4>
                    <p className="text-[10px] text-slate-400">{t.location}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-orange-50 text-[#FF7A00] text-[10px] font-bold">
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
