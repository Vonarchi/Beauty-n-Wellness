"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  CalendarCheck,
  Camera,
  ChevronDown,
  Gift,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";

const treatments = [
  {
    name: "Signature Sculpt Facial",
    category: "Facials",
    duration: "75 min",
    price: "$220",
    description: "A luminous lift with lymphatic massage, LED therapy, peptides, and chilled rose quartz.",
  },
  {
    name: "SK-II Inspired Renewal",
    category: "Facials",
    duration: "90 min",
    price: "$310",
    description: "Ferment-rich brightening, microcurrent contouring, and a ceremonial mask for glass skin.",
  },
  {
    name: "Equinox Recovery Massage",
    category: "Body",
    duration: "60 min",
    price: "$180",
    description: "Deep tissue recovery for active bodies with warm stones, magnesium, and fascia release.",
  },
  {
    name: "Aromatherapy Sleep Ritual",
    category: "Body",
    duration: "80 min",
    price: "$240",
    description: "A nervous-system reset with breathwork, scalp massage, and warm botanical oils.",
  },
  {
    name: "Rose Gold Glow Peel",
    category: "Advanced",
    duration: "45 min",
    price: "$195",
    description: "A refined resurfacing treatment that smooths texture and revives dull complexions.",
  },
  {
    name: "Online Skin Consultation",
    category: "Virtual",
    duration: "30 min",
    price: "$65",
    description: "Meet with an esthetician to create a personalized regimen and treatment roadmap.",
  },
];

const services = [
  "Advanced facials",
  "Therapeutic massage",
  "Body rituals",
  "Injectable consults",
  "LED light therapy",
  "Wellness coaching",
];

const team = [
  {
    name: "Amara Chen",
    role: "Lead Esthetician",
    specialty: "Facial sculpting, barrier repair, ceremonial skin rituals",
    image: "/images/water-floral-facial.png",
  },
  {
    name: "Noelle Hart",
    role: "Massage Therapist",
    specialty: "Sports recovery, nervous-system regulation, prenatal bodywork",
    image: "/images/sunflower-serum-editorial.png",
  },
  {
    name: "Sofia Vale",
    role: "Wellness Director",
    specialty: "Membership care, product curation, holistic treatment plans",
    image: "/images/dewy-duo-portrait.png",
  },
];

const memberships = [
  {
    name: "Essential Glow",
    price: "$149",
    cadence: "/mo",
    features: ["1 monthly express facial", "10% product savings", "Priority booking", "Birthday enhancement"],
  },
  {
    name: "Lumiere Ritual",
    price: "$289",
    cadence: "/mo",
    featured: true,
    features: ["1 signature treatment", "Quarterly wellness consult", "15% product savings", "Complimentary LED add-on"],
  },
  {
    name: "Private Atelier",
    price: "$540",
    cadence: "/mo",
    features: ["2 premium treatments", "Concierge booking", "20% product savings", "Guest pass each quarter"],
  },
];

const products = [
  {
    name: "Barrier Silk Cream",
    price: "$86",
    note: "Ceramide-rich cushion moisturizer",
    image: "/images/product-botanical-stack.png",
  },
  {
    name: "Rose Quartz Body Oil",
    price: "$64",
    note: "Warm botanical glow for post-shower skin",
    image: "/images/spa-pink-still-life.png",
  },
  {
    name: "Ferment Radiance Essence",
    price: "$118",
    note: "Daily brightening and hydration veil",
    image: "/images/hero-tropical-glow.png",
  },
];

const reviews = [
  {
    quote: "The experience felt cinematic. Every detail, from the lighting to the facial massage, made me book my next visit before I left.",
    author: "Maya R.",
  },
  {
    quote: "It has the polish of a luxury hotel spa with the consistency of a serious wellness studio.",
    author: "Elena P.",
  },
  {
    quote: "My skin looked lifted, calm, and expensive. The membership is now my monthly non-negotiable.",
    author: "Claire S.",
  },
];

const faqs = [
  {
    question: "How far in advance should I book?",
    answer: "Evenings and weekends usually book 10-14 days out. Members receive priority access and concierge rescheduling.",
  },
  {
    question: "Do you offer gift certificates?",
    answer: "Yes. Digital gift cards can be delivered instantly or scheduled with a personal note for any treatment or dollar amount.",
  },
  {
    question: "Can I shop products without an appointment?",
    answer: "Absolutely. Our product shop is open online and in-spa, with esthetician recommendations available by consultation.",
  },
  {
    question: "Are online consultations available?",
    answer: "Yes. Virtual skin and wellness consultations include a custom regimen, treatment schedule, and product edit.",
  },
];

const gallery = [
  { title: "Tropical glow ritual", image: "/images/hero-tropical-glow.png" },
  { title: "Dew skin campaign", image: "/images/skin-campaign-closeup.png" },
  { title: "Botanical product stack", image: "/images/product-botanical-stack.png" },
  { title: "Pink spa still life", image: "/images/spa-pink-still-life.png" },
  { title: "Water facial therapy", image: "/images/water-floral-facial.png" },
  { title: "Triptych skin study", image: "/images/triptych-skin-study.png" },
];

const beforeAfter = [
  {
    caption: "Texture reset after three facials",
    before: "/images/triptych-skin-study.png",
    after: "/images/skin-campaign-closeup.png",
  },
  {
    caption: "Lift and luminosity after sculpt massage",
    before: "/images/dewy-duo-portrait.png",
    after: "/images/water-floral-facial.png",
  },
];
const categories = ["All", ...Array.from(new Set(treatments.map((treatment) => treatment.category)))];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroImageY = useTransform(scrollYProgress, [0, 0.22], [0, -70]);
  const heroCardY = useTransform(scrollYProgress, [0, 0.22], [0, 46]);

  const filteredTreatments = useMemo(
    () =>
      activeCategory === "All"
        ? treatments
        : treatments.filter((treatment) => treatment.category === activeCategory),
    [activeCategory],
  );

  return (
    <main className="min-h-screen overflow-hidden">
      <nav className="fixed left-1/2 top-4 z-50 flex w-[min(1120px,calc(100%-32px))] -translate-x-1/2 items-center justify-between rounded-full border border-[#b98270]/20 bg-[#fffaf3]/80 px-5 py-3 shadow-[0_20px_80px_rgba(47,38,33,0.08)] backdrop-blur-xl">
        <a className="font-display text-xl tracking-[0.18em]" href="#top">
          LUMIERE
        </a>
        <div className="hidden items-center gap-7 text-xs uppercase tracking-[0.24em] text-[#6f7561] md:flex">
          <a href="#treatments">Treatments</a>
          <a href="#membership">Membership</a>
          <a href="#shop">Shop</a>
          <a href="#contact">Contact</a>
        </div>
        <a
          className="rounded-full bg-[#2f2621] px-5 py-3 text-xs uppercase tracking-[0.22em] text-[#fffaf3] shadow-lg shadow-[#2f2621]/10"
          href="#booking"
        >
          Book
        </a>
      </nav>

      <section id="top" className="relative px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <motion.div
          className="absolute left-[-10rem] top-24 h-80 w-80 rounded-full bg-[#d9b88f]/30 blur-3xl"
          animate={{ scale: [1, 1.12, 1], x: [0, 18, 0], y: [0, -14, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-8rem] top-8 h-96 w-96 rounded-full bg-[#b98270]/20 blur-3xl"
          animate={{ scale: [1.08, 0.95, 1.08], x: [0, -22, 0], y: [0, 18, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[0.95fr_0.72fr] xl:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.8, ease: "easeOut" }}>
            <p className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.34em] text-[#9e6d5c]">
              <Sparkles size={16} /> Luxury Beauty & Wellness
            </p>
            <h1 className="font-display max-w-4xl text-6xl leading-[0.92] tracking-[-0.05em] text-[#2f2621] md:text-7xl xl:text-8xl">
              Skin, body, and stillness in perfect ritual.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6f6258] md:text-xl">
              Maison Lumiere is a premium spa experience for restorative treatments,
              advanced skin therapy, curated products, and effortless online booking.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#b98270] px-7 py-4 text-sm uppercase tracking-[0.22em] text-white shadow-2xl shadow-[#b98270]/25"
                href="#booking"
              >
                Book appointment
                <ArrowRight className="transition group-hover:translate-x-1" size={18} />
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-[#b98270]/30 px-7 py-4 text-sm uppercase tracking-[0.22em] text-[#2f2621]"
                href="#gift-cards"
              >
                Send a gift card
              </a>
            </div>
          </motion.div>

          <motion.div
            className="relative min-h-[520px] xl:min-h-[600px]"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
          >
            <motion.div
              className="absolute inset-x-4 top-0 h-[480px] overflow-hidden rounded-t-[18rem] rounded-b-[3rem] shadow-[0_40px_120px_rgba(80,54,43,0.18)] xl:inset-x-8 xl:h-[540px]"
              animate={{ rotate: [0, -1.5, 0.8, 0], scale: [1, 1.015, 1] }}
              style={{ y: heroImageY }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                alt="Editorial tropical beauty still life with dewy skin, botanicals, and pink spa products"
                className="h-full w-full object-cover"
                fill
                priority
                src="/images/hero-tropical-glow.png"
                sizes="(min-width: 1024px) 44vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2f2621]/45 via-transparent to-[#fffaf3]/10" />
            </motion.div>
            <motion.div
              className="absolute left-0 top-16 hidden h-80 w-56 overflow-hidden rounded-t-full bg-[#2f2621] p-3 shadow-2xl lg:block"
              animate={{ y: [0, -18, 0], rotate: [-1, 1.5, -1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative h-full overflow-hidden rounded-t-full border border-white/15">
                <Image
                  alt="Close-up dewy skin campaign portrait"
                  className="h-full w-full object-cover"
                  fill
                  src="/images/skin-campaign-closeup.png"
                  sizes="224px"
                />
              </div>
            </motion.div>
            <motion.div
              className="glass absolute bottom-6 right-0 w-80 rounded-[2rem] p-6"
              animate={{ x: [0, -10, 0] }}
              style={{ y: heroCardY }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.24em] text-[#9e6d5c]">Today</span>
                <CalendarCheck size={20} />
              </div>
              <h2 className="font-display text-3xl">Signature Sculpt Facial</h2>
              <p className="mt-3 text-sm leading-6 text-[#6f6258]">Two appointments left this evening with Amara.</p>
              <div className="mt-6 flex gap-2">
                {["5:30", "7:00"].map((time) => (
                  <span key={time} className="rounded-full bg-white/70 px-4 py-2 text-sm text-[#2f2621]">
                    {time}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="absolute right-10 top-10 h-5 w-5 rounded-full bg-[#fffaf3]/80 shadow-[0_0_36px_rgba(255,250,243,0.9)]"
              animate={{ opacity: [0.25, 0.85, 0.25], scale: [0.8, 1.4, 0.8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#b98270]/15 bg-[#2f2621] px-5 py-5 text-[#fffaf3]">
        <div className="mx-auto max-w-7xl overflow-hidden">
          <motion.div
            className="flex w-max gap-10 text-sm uppercase tracking-[0.26em]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            {[...services, ...services].map((service, index) => (
              <span key={`${service}-${index}`} className="shrink-0">
                {service}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionShell eyebrow="Services" title="Designed like a private wellness membership.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Beauty", "Advanced facial therapies, brows, peels, LED, and glow-focused enhancements."],
            ["Wellness", "Massage, bodywork, breath-led rituals, and active recovery experiences."],
            ["Concierge", "Online consultation, gift certificates, loyalty rewards, and private events."],
          ].map(([title, copy], index) => (
            <motion.div
              key={title}
              className="glass rounded-[2rem] p-7"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ delay: index * 0.08 }}
            >
              <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#b98270]/12 text-[#b98270]">
                <Leaf size={22} />
              </div>
              <h3 className="font-display text-3xl">{title}</h3>
              <p className="mt-4 leading-7 text-[#6f6258]">{copy}</p>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="treatments" eyebrow="Treatments" title="Choose the ritual your body is asking for.">
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              className={`rounded-full border px-5 py-3 text-sm transition ${
                activeCategory === category
                  ? "border-[#2f2621] bg-[#2f2621] text-[#fffaf3]"
                  : "border-[#b98270]/25 bg-white/40 text-[#6f6258] hover:border-[#b98270]"
              }`}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
        <motion.div layout className="grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredTreatments.map((treatment) => (
              <motion.article
                layout
                key={treatment.name}
                className="group rounded-[1.75rem] border border-[#b98270]/18 bg-[#fffaf3]/70 p-6 shadow-[0_20px_80px_rgba(80,54,43,0.06)]"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 240, damping: 24 }}
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[#9e6d5c]">{treatment.category}</p>
                    <h3 className="mt-3 font-display text-3xl">{treatment.name}</h3>
                  </div>
                  <span className="rounded-full bg-[#b98270]/12 px-4 py-2 text-sm text-[#9e6d5c]">{treatment.price}</span>
                </div>
                <p className="mt-4 leading-7 text-[#6f6258]">{treatment.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-[#b98270]/15 pt-5 text-sm text-[#6f7561]">
                  <span>{treatment.duration}</span>
                  <a className="inline-flex items-center gap-2 text-[#2f2621]" href="#booking">
                    Reserve <ArrowRight className="transition group-hover:translate-x-1" size={16} />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </SectionShell>

      <SectionShell eyebrow="Meet Our Team" title="Expert hands, editorial eye, calm presence.">
        <div className="grid gap-5 md:grid-cols-3">
          {team.map((member, index) => (
            <motion.article
              key={member.name}
              className="rounded-t-[12rem] rounded-b-[2rem] bg-[#2f2621] p-3 text-[#fffaf3]"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-80 overflow-hidden rounded-t-[11rem]">
                <Image
                  alt={`${member.name} editorial portrait`}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  fill
                  src={member.image}
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f2621]/35 to-transparent" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.22em] text-[#d9b88f]">{member.role}</p>
                <h3 className="mt-2 font-display text-3xl">{member.name}</h3>
                <p className="mt-4 leading-7 text-[#ead9c4]">{member.specialty}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="membership" eyebrow="Membership Plans" title="A monthly glow you can keep.">
        <div className="grid gap-5 lg:grid-cols-3">
          {memberships.map((plan) => (
            <motion.article
              key={plan.name}
              className={`rounded-[2rem] border p-7 ${
                plan.featured
                  ? "border-[#b98270] bg-[#2f2621] text-[#fffaf3] shadow-2xl shadow-[#2f2621]/15"
                  : "border-[#b98270]/18 bg-[#fffaf3]/70"
              }`}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              {plan.featured && (
                <span className="mb-5 inline-flex rounded-full bg-[#b98270] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white">
                  Most loved
                </span>
              )}
              <h3 className="font-display text-4xl">{plan.name}</h3>
              <div className="mt-5 flex items-end gap-1">
                <span className="font-display text-6xl">{plan.price}</span>
                <span className="pb-2 text-sm opacity-70">{plan.cadence}</span>
              </div>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Heart className="mt-1 shrink-0 text-[#b98270]" size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-4 text-sm uppercase tracking-[0.2em] ${
                  plan.featured ? "bg-[#fffaf3] text-[#2f2621]" : "bg-[#2f2621] text-[#fffaf3]"
                }`}
                href="#booking"
              >
                Join now
              </a>
            </motion.article>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Gallery" title="Warm light, quiet rooms, impeccable details.">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
          {gallery.map((item, index) => (
            <motion.div
              key={item.title}
              className={`group relative overflow-hidden rounded-[2rem] bg-[#2f2621] p-4 shadow-[0_20px_60px_rgba(80,54,43,0.10)] ${
                index % 3 === 0 ? "md:col-span-2 md:row-span-2 min-h-80" : "md:col-span-2 min-h-48"
              }`}
              initial={{ opacity: 0, y: 34, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.05, ease: "easeOut" }}
            >
              <Image
                alt={item.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                fill
                src={item.image}
                sizes="(min-width: 768px) 33vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2f2621]/70 via-[#2f2621]/10 to-transparent" />
              <span className="absolute bottom-5 left-5 max-w-44 text-sm uppercase tracking-[0.22em] text-white">
                {item.title}
              </span>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Testimonials" title="Client reviews with a post-treatment glow.">
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <motion.figure
              key={review.author}
              className="glass rounded-[2rem] p-7"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -8 }}
            >
              <div className="mb-6 flex gap-1 text-[#b98270]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
              </div>
              <blockquote className="font-display text-2xl leading-9">“{review.quote}”</blockquote>
              <figcaption className="mt-6 text-sm uppercase tracking-[0.22em] text-[#9e6d5c]">{review.author}</figcaption>
            </motion.figure>
          ))}
        </div>
      </SectionShell>

      <section id="booking" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#2f2621] text-[#fffaf3] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="p-8 md:p-12">
            <p className="text-xs uppercase tracking-[0.34em] text-[#d9b88f]">Online Booking</p>
            <h2 className="font-display mt-5 text-5xl leading-none tracking-[-0.04em] md:text-7xl">
              Reserve your moment of calm.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#ead9c4]">
              Pick your treatment, preferred specialist, and appointment window. Stripe checkout, Supabase profiles,
              and Resend confirmations are ready for credential-based activation.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {["Instant confirmation", "Loyalty points", "Consultation add-on"].map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 p-4 text-sm text-[#ead9c4]">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <form className="bg-[#fffaf3] p-6 text-[#2f2621] md:p-10">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#9e6d5c]">Name</span>
                <input className="w-full rounded-2xl border border-[#b98270]/20 bg-white px-4 py-4 outline-none focus:border-[#b98270]" placeholder="Your name" />
              </label>
              <label className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#9e6d5c]">Email</span>
                <input className="w-full rounded-2xl border border-[#b98270]/20 bg-white px-4 py-4 outline-none focus:border-[#b98270]" placeholder="you@example.com" type="email" />
              </label>
              <label className="space-y-2 md:col-span-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#9e6d5c]">Treatment</span>
                <select className="w-full rounded-2xl border border-[#b98270]/20 bg-white px-4 py-4 outline-none focus:border-[#b98270]">
                  {treatments.map((treatment) => (
                    <option key={treatment.name}>{treatment.name}</option>
                  ))}
                </select>
              </label>
              <label className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#9e6d5c]">Date</span>
                <input className="w-full rounded-2xl border border-[#b98270]/20 bg-white px-4 py-4 outline-none focus:border-[#b98270]" type="date" />
              </label>
              <label className="space-y-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#9e6d5c]">Time</span>
                <input className="w-full rounded-2xl border border-[#b98270]/20 bg-white px-4 py-4 outline-none focus:border-[#b98270]" type="time" />
              </label>
            </div>
            <button className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#b98270] px-7 py-4 text-sm uppercase tracking-[0.22em] text-white" type="button">
              Request appointment <CalendarCheck size={18} />
            </button>
          </form>
        </div>
      </section>

      <SectionShell id="gift-cards" eyebrow="Gift Cards" title="Give the pleasure of being cared for.">
        <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#2f2621] p-7 text-[#fffaf3] shadow-2xl shadow-[#2f2621]/15">
            <Image
              alt="Luxury pink botanical spa product still life"
              className="absolute inset-0 h-full w-full object-cover opacity-65"
              fill
              src="/images/spa-pink-still-life.png"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2f2621]/85 via-[#2f2621]/30 to-transparent" />
            <div className="relative">
            <Gift className="mb-20" size={30} />
            <p className="text-xs uppercase tracking-[0.28em] text-[#ead9c4]">Digital Certificate</p>
            <h3 className="font-display mt-3 text-5xl">Maison Lumiere</h3>
            <p className="mt-6 text-[#fffaf3]/75">Choose any dollar value or a complete treatment ritual.</p>
            </div>
          </div>
          <div className="glass rounded-[2rem] p-7">
            <h3 className="font-display text-4xl">Gift certificates, delivered beautifully.</h3>
            <p className="mt-4 leading-8 text-[#6f6258]">
              Schedule delivery, include a personal note, and let recipients book online when the timing feels right.
            </p>
            <a className="mt-8 inline-flex rounded-full bg-[#2f2621] px-6 py-4 text-sm uppercase tracking-[0.2em] text-[#fffaf3]" href="#booking">
              Create gift card
            </a>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="shop" eyebrow="Product Shop" title="A curated edit for spa results at home.">
        <div className="grid gap-5 md:grid-cols-3">
          {products.map((product) => (
            <article key={product.name} className="rounded-[2rem] border border-[#b98270]/18 bg-[#fffaf3]/70 p-5">
              <div className="relative h-72 overflow-hidden rounded-[1.5rem] bg-[#2f2621]">
                <Image
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  fill
                  src={product.image}
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f2621]/30 to-transparent" />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl">{product.name}</h3>
                  <p className="mt-2 text-[#6f6258]">{product.note}</p>
                </div>
                <span className="text-[#9e6d5c]">{product.price}</span>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Before & After" title="Visible refinement, never overdone.">
        <div className="grid gap-5 md:grid-cols-2">
          {beforeAfter.map((study) => (
            <div key={study.caption} className="rounded-[2rem] bg-[#fffaf3]/70 p-4">
              <div className="grid min-h-80 grid-cols-2 overflow-hidden rounded-[1.5rem]">
                <div className="relative">
                  <Image
                    alt={`${study.caption} before`}
                    className="h-full w-full object-cover grayscale"
                    fill
                    src={study.before}
                    sizes="(min-width: 768px) 25vw, 50vw"
                  />
                </div>
                <div className="relative">
                  <Image
                    alt={`${study.caption} after`}
                    className="h-full w-full object-cover"
                    fill
                    src={study.after}
                    sizes="(min-width: 768px) 25vw, 50vw"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-between text-sm uppercase tracking-[0.2em] text-[#9e6d5c]">
                <span>Before</span>
                <span>{study.caption}</span>
                <span>After</span>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Wellness Blog & Loyalty" title="Content and rewards that keep clients close.">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            ["Journal", "How to prepare your skin for a luminous facial season."],
            ["Loyalty Program", "Earn points for bookings, product purchases, referrals, and reviews."],
            ["Instagram Gallery", "A refined social wall for rituals, product moments, and client glow."],
          ].map(([title, copy]) => (
            <article key={title} className="glass rounded-[2rem] p-7">
              <Camera className="mb-10 text-[#b98270]" size={24} />
              <h3 className="font-display text-3xl">{title}</h3>
              <p className="mt-4 leading-7 text-[#6f6258]">{copy}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="FAQ" title="Everything you need before you arrive.">
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="rounded-[1.5rem] border border-[#b98270]/18 bg-[#fffaf3]/70">
              <button
                className="flex w-full items-center justify-between gap-5 p-6 text-left"
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                type="button"
              >
                <span className="font-display text-2xl">{faq.question}</span>
                <ChevronDown className={`shrink-0 transition ${openFaq === index ? "rotate-180" : ""}`} size={20} />
              </button>
              <AnimatePresence initial={false}>
                {openFaq === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="px-6 pb-6 leading-7 text-[#6f6258]">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </SectionShell>

      <section id="contact" className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-[2.5rem] bg-[#fffaf3]/70 p-6 md:grid-cols-[0.9fr_1.1fr] md:p-10">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-[#9e6d5c]">Contact</p>
            <h2 className="font-display mt-5 text-5xl leading-none tracking-[-0.04em] md:text-7xl">Step into the light.</h2>
            <div className="mt-8 space-y-4 text-[#6f6258]">
              <p className="flex items-center gap-3"><MapPin size={18} /> 24 Rose Lane, New York, NY</p>
              <p className="flex items-center gap-3"><Phone size={18} /> (212) 555-0198</p>
              <p className="flex items-center gap-3"><Mail size={18} /> hello@maisonlumiere.spa</p>
            </div>
          </div>
          <div className="rounded-[2rem] bg-[#2f2621] p-6 text-[#fffaf3]">
            <div className="flex items-center gap-3 rounded-full border border-white/10 px-5 py-4 text-[#ead9c4]">
              <Search size={18} />
              <span>Ask about a treatment, product, or private event</span>
            </div>
            <textarea className="mt-5 min-h-52 w-full rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-[#fffaf3] outline-none placeholder:text-[#ead9c4]/60" placeholder="Tell us what you are hoping to feel after your visit." />
            <button className="mt-5 rounded-full bg-[#fffaf3] px-6 py-4 text-sm uppercase tracking-[0.2em] text-[#2f2621]" type="button">
              Send consultation request
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionShell({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.34em] text-[#9e6d5c]">{eyebrow}</p>
          <h2 className="font-display text-5xl leading-[0.98] tracking-[-0.04em] md:text-7xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
