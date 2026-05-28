'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const fade = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const info = [
  { icon: Phone, label: 'Phone', value: '+1 (555) 234-5678' },
  { icon: Mail, label: 'Email', value: 'info@mdsclinic.com' },
  { icon: MapPin, label: 'Address', value: '123 Medical Avenue, Suite 200\nMetropolitan City, MC 10001' },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri: 9AM–7PM\nSaturday: 9AM–5PM\nSunday: Closed' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-[#020617] overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div {...fade}>
            <p className="text-cyan-400 text-sm uppercase tracking-[0.3em] mb-4">Contact</p>
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-6">Get In Touch</h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">Have questions or ready to start your journey? We're here to help.</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#F8FAFC] py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div {...fade}>
            <Card className="p-8 bg-white border-slate-200">
              {sent ? (
                <div className="text-center py-12">
                  <CheckCircle className="text-green-500 mx-auto mb-4" size={40} />
                  <h3 className="font-serif text-2xl text-slate-900 mb-2">Message Sent</h3>
                  <p className="text-slate-500">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3 className="font-serif text-2xl text-slate-900 mb-6">Send a Message</h3>
                  <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-slate-600 text-sm">Name</Label>
                        <Input required placeholder="Your name" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-slate-600 text-sm">Email</Label>
                        <Input required type="email" placeholder="you@example.com" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-slate-600 text-sm">Subject</Label>
                      <Input required placeholder="How can we help?" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-slate-600 text-sm">Message</Label>
                      <Textarea required placeholder="Tell us more..." rows={5} className="mt-1" />
                    </div>
                    <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800 w-full">
                      Send Message <Send size={16} className="ml-2" />
                    </Button>
                  </form>
                </>
              )}
            </Card>
          </motion.div>

          {/* Info */}
          <motion.div {...fade} transition={{ delay: 0.15 }} className="space-y-6">
            {info.map((item, i) => (
              <Card key={i} className="p-5 bg-white border-slate-200 flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <item.icon size={20} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900">{item.label}</h4>
                  <p className="text-sm text-slate-500 whitespace-pre-line">{item.value}</p>
                </div>
              </Card>
            ))}

            {/* Map placeholder */}
            <Card className="overflow-hidden border-slate-200">
              <div className="h-48 bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="text-slate-300 mx-auto mb-2" size={32} />
                  <p className="text-slate-400 text-sm">123 Medical Avenue, Suite 200</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}