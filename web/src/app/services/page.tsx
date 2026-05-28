'use client'
import { useState, useMemo } from 'react';
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Smile, Shield, Heart, Zap, Star, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const fade = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const CONCERNS = ['All', 'Pain Relief', 'Aesthetics', 'Maintenance', 'Anti-Aging', 'Restoration'];

const dental = [
  {
    icon: Sparkles, title: 'Dental Implants',
    desc: 'Titanium-grade precision implants with 3D-guided surgical placement for permanent, natural-looking tooth restoration. Includes full digital planning and custom abutment fabrication.',
    duration: '2\u20133 hours', image: '/__generating__/img_198b4f32d1d8.png',
    concerns: ['Restoration', 'Aesthetics'],
  },
  {
    icon: Smile, title: 'Teeth Whitening',
    desc: 'Professional LED-accelerated whitening using clinical-grade peroxide systems. Achieve up to 8 shades lighter in a single 45-minute session.',
    duration: '45 min', image: '/__generating__/img_72888799fab4.png',
    concerns: ['Aesthetics', 'Maintenance'],
  },
  {
    icon: Shield, title: 'Orthodontics',
    desc: 'Invisible aligners and ceramic braces with AI-assisted treatment planning. Precision movement tracking through digital monitoring.',
    duration: '12\u201318 months', image: '/__generating__/img_198b4f32d1d8.png',
    concerns: ['Aesthetics', 'Pain Relief', 'Restoration'],
  },
];

const aesthetic = [
  {
    icon: Heart, title: 'Skin Rejuvenation',
    desc: 'Advanced dermal therapies combining microneedling, PRP, and growth factor serums to restore deep skin elasticity and natural radiance.',
    duration: '60 min', image: '/__generating__/img_6e1e5c3b22f1.png',
    concerns: ['Aesthetics', 'Anti-Aging'],
  },
  {
    icon: Zap, title: 'Facial Contouring',
    desc: 'Non-invasive sculpting using advanced RF and HIFU technology for refined jawline definition and facial symmetry enhancement.',
    duration: '45\u201390 min', image: '/__generating__/img_6e1e5c3b22f1.png',
    concerns: ['Aesthetics', 'Anti-Aging'],
  },
  {
    icon: Star, title: 'Anti-Aging Treatments',
    desc: 'Cutting-edge cellular regeneration protocols including stem cell therapy, LED phototherapy, and customized peptide infusions.',
    duration: '60\u201390 min', image: '/__generating__/img_6e1e5c3b22f1.png',
    concerns: ['Anti-Aging', 'Aesthetics'],
  },
];

export default function Services() {
  const [tab, setTab] = useState('dental');
  const [activeConcern, setActiveConcern] = useState('All');
  const [search, setSearch] = useState('');

  const allItems = tab === 'dental' ? dental : aesthetic;
  const accentClass = tab === 'dental' ? 'text-blue-600' : 'text-cyan-400';

  const items = useMemo(() => {
    return allItems.filter(s => {
      const matchesConcern = activeConcern === 'All' || s.concerns.includes(activeConcern);
      const matchesSearch = search === '' ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.desc.toLowerCase().includes(search.toLowerCase());
      return matchesConcern && matchesSearch;
    });
  }, [allItems, activeConcern, search]);

  const handleTabChange = (val) => { setTab(val); setActiveConcern('All'); setSearch(''); };

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-[#020617] overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div {...fade}>
            <p className="text-cyan-400 text-sm uppercase tracking-[0.3em] mb-4">Services</p>
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">The Aesthetic Index</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Comprehensive dental and aesthetic services, each precision-engineered for measurable results.</p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Cards */}
      <section className="bg-[#F8FAFC] py-24">
        <div className="max-w-7xl mx-auto px-6">

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search treatments..."
              className="pl-10 pr-10 bg-white border-slate-200 text-slate-900"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <Tabs value={tab} onValueChange={handleTabChange}>
              <TabsList className="bg-slate-100">
                <TabsTrigger value="dental" className="px-8">Dental</TabsTrigger>
                <TabsTrigger value="aesthetic" className="px-8">Aesthetic</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Concern filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CONCERNS.map(c => (
              <button
                key={c}
                onClick={() => setActiveConcern(c)}
                className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
                  activeConcern === c
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-center text-sm text-slate-400 mb-8">
            {items.length} treatment{items.length !== 1 ? 's' : ''} found
            {activeConcern !== 'All' && <span> for <span className="text-slate-700 font-medium">{activeConcern}</span></span>}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab + activeConcern + search}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {items.length === 0 && (
                <div className="col-span-3 text-center py-20">
                  <p className="text-slate-400 text-lg mb-2">No treatments found.</p>
                  <button
                    onClick={() => { setActiveConcern('All'); setSearch(''); }}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
              {items.map((s, i) => (
                <Card key={s.title} className="overflow-hidden bg-white border-slate-200 group hover:shadow-xl transition-all">
                  <div className="h-48 overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <s.icon className={accentClass} size={20} />
                      <h3 className="font-serif text-xl text-slate-900">{s.title}</h3>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">{s.desc}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {s.concerns.map(c => (
                        <Badge
                          key={c}
                          variant="secondary"
                          className="text-xs cursor-pointer hover:bg-slate-200"
                          onClick={() => setActiveConcern(c)}
                        >
                          {c}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Est. {s.duration}</span>
                      <Link href="/book">
                        <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800">
                          Book Now <ArrowRight size={14} className="ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#020617] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-600/5" />
        <motion.div {...fade} className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-white mb-6">{"Not Sure Which Service Is Right?"}</h2>
          <p className="text-slate-400 mb-8">Our specialists will design a personalized treatment plan during your consultation.</p>
          <Link href="/book">
            <Button size="lg" className="bg-cyan-400 text-slate-950 hover:bg-cyan-300 px-8 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all">
              Book Free Consultation <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}