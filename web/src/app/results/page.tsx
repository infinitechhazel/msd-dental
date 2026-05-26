'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import ComparisonSlider from '@/components/ComparisonSlider';
import Link from 'next/link';

const fade = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const CATEGORIES = ['All', 'Dental', 'Aesthetic'];

const cases = [
  {
    id: 1,
    category: 'Dental',
    treatment: 'Teeth Whitening',
    before: 'https://media.base44.com/images/public/6a13e4d0cd3364a569f6bbfc/a0aa36c06_generated_image.png',
    after: 'https://media.base44.com/images/public/6a13e4d0cd3364a569f6bbfc/531e2f0ff_generated_image.png',
    result: '8 shades brighter',
    duration: '45 min session',
    rating: 5,
    testimonial: '"I genuinely cannot believe the difference. My smile has completely transformed after just one session."',
    patient: 'A.M., 34',
  },
  {
    id: 2,
    category: 'Dental',
    treatment: 'Orthodontics',
    before: 'https://media.base44.com/images/public/6a13e4d0cd3364a569f6bbfc/0756d9482_generated_image.png',
    after: 'https://media.base44.com/images/public/6a13e4d0cd3364a569f6bbfc/3cd0a3503_generated_image.png',
    result: 'Perfect alignment achieved',
    duration: '14-month treatment',
    rating: 5,
    testimonial: '"The invisible aligners were so comfortable. I had straight teeth without anyone even noticing I was in treatment."',
    patient: 'R.K., 28',
  },
  {
    id: 3,
    category: 'Aesthetic',
    treatment: 'Skin Rejuvenation',
    before: 'https://media.base44.com/images/public/6a13e4d0cd3364a569f6bbfc/2fb5f0006_generated_image.png',
    after: 'https://media.base44.com/images/public/6a13e4d0cd3364a569f6bbfc/169a77bff_generated_image.png',
    result: 'Visibly smoother, radiant skin',
    duration: '3-session protocol',
    rating: 5,
    testimonial: '"My skin looks 10 years younger. The team at MDS understood exactly what I needed and delivered beyond expectations."',
    patient: 'S.L., 42',
  },
  {
    id: 4,
    category: 'Aesthetic',
    treatment: 'Facial Contouring',
    before: 'https://media.base44.com/images/public/6a13e4d0cd3364a569f6bbfc/65ab52d20_generated_image.png',
    after: 'https://media.base44.com/images/public/6a13e4d0cd3364a569f6bbfc/f59fa16c7_generated_image.png',
    result: 'Defined jawline and profile',
    duration: 'Single session',
    rating: 5,
    testimonial: '"The result is incredibly natural-looking. My face shape is exactly what I envisioned, with zero downtime."',
    patient: 'T.W., 39',
  },
];

export default function BeforeAfter() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCase, setActiveCase] = useState(cases[0]);

  const filtered = activeCategory === 'All' ? cases : cases.filter(c => c.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#020617] overflow-hidden">
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div {...fade}>
            <p className="text-cyan-400 text-sm uppercase tracking-[0.3em] mb-4">Results Gallery</p>
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">See the Transformation</h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">Drag the slider to reveal real patient results. Every case is a testament to clinical precision and aesthetic artistry.</p>
          </motion.div>
        </div>
      </section>

      {/* Featured spotlight */}
      <section className="bg-[#0B1220] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div {...fade}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <Badge variant="outline" className="border-cyan-400/30 text-cyan-400 mb-2">{activeCase.category}</Badge>
                <h2 className="font-serif text-2xl text-white">{activeCase.treatment}</h2>
              </div>
              <div className="text-right text-sm">
                <p className="text-cyan-400 font-medium">{activeCase.result}</p>
                <p className="text-slate-500">{activeCase.duration}</p>
              </div>
            </div>

            <ComparisonSlider
              before={activeCase.before}
              after={activeCase.after}
              beforeLabel="Before"
              afterLabel="After"
            />

            <div className="mt-6 flex items-start gap-4">
              <div className="flex gap-0.5 mt-0.5">
                {Array(activeCase.rating).fill(0).map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div>
                <p className="text-slate-400 text-sm italic">{activeCase.testimonial}</p>
                <p className="text-slate-600 text-xs mt-1">— Patient {activeCase.patient}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="bg-[#F8FAFC] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fade} className="text-center mb-12">
            <p className="text-blue-600 text-sm uppercase tracking-[0.3em] mb-3">All Cases</p>
            <h2 className="font-serif text-3xl text-slate-900 mb-6">Browse Transformations</h2>
            <div className="flex justify-center gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-1.5 rounded-full text-sm border transition-all ${
                    activeCategory === cat
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                {...fade}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setActiveCase(c); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                  activeCase.id === c.id
                    ? 'border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.15)]'
                    : 'border-transparent hover:border-slate-300'
                } bg-white`}
              >
                <div className="p-4">
                  <ComparisonSlider
                    before={c.before}
                    after={c.after}
                    beforeLabel="Before"
                    afterLabel="After"
                  />
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <Badge variant="secondary" className="text-xs mb-1">{c.category}</Badge>
                      <h3 className="font-serif text-lg text-slate-900">{c.treatment}</h3>
                      <p className="text-slate-500 text-sm">{c.result}</p>
                    </div>
                    <Link href="/book" onClick={e => e.stopPropagation()}>
                      <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800 shrink-0">
                        Book <ArrowRight size={14} className="ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#020617] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-600/5" />
        <motion.div {...fade} className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-white mb-4">Ready for Your Transformation?</h2>
          <p className="text-slate-400 mb-8">These results could be yours. Book a consultation and let our specialists design your personalized treatment plan.</p>
          <Link href="/book">
            <Button size="lg" className="bg-cyan-400 text-slate-950 hover:bg-cyan-300 px-8 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all">
              Book Your Consultation <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}