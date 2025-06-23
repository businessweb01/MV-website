'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { Wifi, Zap, Shield, Clock, ChevronDown, Tv, Users, Star } from 'lucide-react';

// Optimized Brand Configuration (moved to top level to avoid recreation)
const BRAND_CONFIG = {
  identity: {
    name: 'Multinet',
    tagline: 'VELOCITY',
    subtitle: 'INTERNET',
    description: 'Cabanatuan’s Fastest Fiber Internet — FREE Installation & 90+ TV Channels Included'
  },
  services: [
    {
      id: 'speed',
      icon: Zap,
      title: "Lightning Fast",
      description: "Up to 750 Mbps fiber speeds for seamless streaming, gaming, and working from home",
      gradient: "from-yellow-400 to-orange-500",
      highlight: "750 Mbps"
    },
    {
      id: 'tv-channels',
      icon: Tv,
      title: "FREE TV Channels",
      description: "Get up to 90 premium HD channels included with every internet package",
      gradient: "from-purple-400 to-pink-500",
      highlight: "90+ Channels"
    },
    {
      id: 'reliability',
      icon: Shield,
      title: "Ultra Reliable",
      description: "99.9% uptime guarantee with enterprise-grade fiber infrastructure",
      gradient: "from-green-400 to-blue-500",
      highlight: "99.9% Uptime"
    },
    {
      id: 'installation',
      icon: Clock,
      title: "FREE Installation",
      description: "Professional setup by certified technicians at no additional cost to you",
      gradient: "from-cyan-400 to-blue-500",
      highlight: "No Setup Fees"
    }
  ]
};

const TV_FEATURES = [
  { icon: Star, text: "Premium HD" },
  { icon: Users, text: "Family Content" },
  { icon: Tv, text: "Sports & Movies" }
];

// Simplified motion configs
const FAST_TRANSITION = { duration: 0.6, ease: "easeOut" };
const STAGGER_DELAY = 0.1;

// Optimized Background with reduced complexity
function BackgroundLayer() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Simplified gradient overlays instead of complex animated orbs */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-cyan-900/15" />
      
      {/* Static grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} 
      />
    </div>
  );
}

// Optimized Hero Section
function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.section 
      className="relative min-h-screen flex flex-col justify-center items-center px-4 py-20"
      style={{ opacity }}
    >
      <HeaderContent />
      <DescriptiveContent />
      <NavigationHint />
    </motion.section>
  );
}

function HeaderContent() {
  // Pre-compute title parts to avoid recalculation
  const titleParts = useMemo(() => {
    return BRAND_CONFIG.identity.tagline.split('').map((letter, index) => ({
      letter,
      index,
      isWifi: letter.toLowerCase() === 'o'
    }));
  }, []);

  return (
    <header className="text-center z-10 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={FAST_TRANSITION}
      >
        <motion.h1 
          className="text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight mb-2"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...FAST_TRANSITION, delay: 0.1 }}
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            {BRAND_CONFIG.identity.name}
          </span>
        </motion.h1>
        
        <motion.h2 
          className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-wider flex items-center justify-center gap-1"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...FAST_TRANSITION, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent flex items-center">
            {titleParts.map(({ letter, index, isWifi }) => 
              isWifi ? (
                <span key={index} className="relative inline-block">
                 {/* <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 max-w-[60px] max-h-[60px] bg-red-500 rounded-full">
                    <Wifi className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div> */}
                  <div className="relative inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 max-w-[60px] max-h-[60px] bg-red-500 rounded-full -translate-y-1">
                    <Wifi className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </span>
              ) : (
                <span key={index}>{letter}</span>
              )
            )}
          </span>
        </motion.h2>
        
        <motion.div
          className="text-base md:text-lg tracking-[0.6em] font-light text-gray-300 mt-6 opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ ...FAST_TRANSITION, delay: 0.3 }}
        >
          {BRAND_CONFIG.identity.subtitle}
        </motion.div>
      </motion.div>
    </header>
  );
}

function DescriptiveContent() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.p 
        className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto mb-10 leading-relaxed text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...FAST_TRANSITION, delay: 0.4 }}
      >
        {BRAND_CONFIG.identity.description.split('Fastest Fiber Internet').map((part, index) => 
          index === 0 ? (
            <span key={index}>{part}</span>
          ) : (
            <span key={index}>
              <em className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold not-italic">
                 Fastest Fiber Internet
              </em>
              {part}
            </span>
          )
        )}
      </motion.p>

      <motion.div
        className="bg-gradient-to-r from-purple-600/15 to-pink-600/15 backdrop-blur-lg rounded-2xl p-6 mb-12 border border-purple-400/20 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...FAST_TRANSITION, delay: 0.5 }}
      >
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Tv className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white">FREE up to 90 TV Channels</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-300">
            {TV_FEATURES.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <feature.icon className="w-4 h-4 text-purple-400" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function NavigationHint() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ...FAST_TRANSITION, delay: 0.6 }}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center text-gray-400 cursor-pointer hover:text-gray-300 transition-colors"
      >
        <span className="text-sm mb-3 font-light">Discover More</span>
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </motion.div>
  );
}

// Optimized Services Section
function ServicesSection() {
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <section className="relative py-20 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.header 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={FAST_TRANSITION}
          viewport={{ once: true }}
          onAnimationComplete={() => setHasAnimated(true)}
        >
         <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              MultiNet
            </span>
             {' '}Fiber Internet ?
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover why Cabanatuan residents are switching to MultiNet — the fastest and most affordable fiber internet with FREE installation and 90+ premium TV channels.
          </p>
        </motion.header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {BRAND_CONFIG.services.map((service, index) => (
            <ServiceCard 
              key={service.id}
              service={service}
              index={index}
              parentAnimated={hasAnimated}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index, parentAnimated }) {
  return (
    <motion.div
      className="group relative h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ...FAST_TRANSITION, delay: index * STAGGER_DELAY }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4 }}
    >
      <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden group-hover:bg-white/8 h-full flex flex-col min-h-[300px]">
        
        {/* Simplified hover effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
              <service.icon className="w-8 h-8 text-white" />
            </div>
            <div className={`text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r ${service.gradient} text-white opacity-90`}>
              {service.highlight}
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-4">
            {service.title}
          </h3>
          
          <p className="text-gray-300 leading-relaxed flex-grow text-base">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Optimized CTA Section
function CallToActionSection() {
  return (
    <section className="relative py-20 md:py-32 px-4">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={FAST_TRANSITION}
        viewport={{ once: true }}
      >
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
        Ready to{' '}
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Transform
        </span>{' '}
        Your Digital Life ?
      </h2>

      <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
        Discover why more families and businesses in Cabanatuan City are choosing MultiNet — offering the fastest fiber internet speeds, FREE installation, and 90+ premium TV channels in every plan. Say goodbye to slow, expensive connections and experience seamless streaming, gaming, and browsing.
      </p>

      </motion.div>
    </section>
  );
}

// Main Component with performance optimizations
export default function MultiNetVelocityLandingPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Fast loading fallback
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative text-white min-h-screen">
      <BackgroundLayer />
      <main>
        <HeroSection />
        <ServicesSection />
        <CallToActionSection />
      </main>
    </div>
  );
}