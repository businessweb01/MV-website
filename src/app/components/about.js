'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Wifi, Zap, Users, MapPin, Star, Check } from 'lucide-react';

// Enhanced Typewriter Component with Variable Speed
const TypewriterText = React.memo(({ text, delay = 0, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    if (currentIndex >= text.length) {
      // Blink cursor a few times then hide
      const cursorTimeout = setTimeout(() => setShowCursor(false), 2000);
      return () => clearTimeout(cursorTimeout);
    }

    // Variable typing speed - faster for spaces, slower for punctuation
    const char = text[currentIndex];
    let typingSpeed = 15; // Base speed (faster)
    
    if (char === ' ') typingSpeed = 5; // Very fast for spaces
    else if (char === ',' || char === '.') typingSpeed = 80; // Slower for punctuation
    else if (char === '-') typingSpeed = 40; // Medium for hyphens

    const timeout = setTimeout(() => {
      setDisplayText(prev => prev + text[currentIndex]);
      setCurrentIndex(prev => prev + 1);
    }, delay + typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, delay]);

  // Cursor blinking effect
  useEffect(() => {
    if (currentIndex < text.length) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530);
      return () => clearInterval(cursorInterval);
    }
  }, [currentIndex, text.length]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && currentIndex <= text.length && (
        <span className="animate-pulse text-purple-400">|</span>
      )}
    </span>
  );
});

TypewriterText.displayName = 'TypewriterText';

// Optimized Stats Counter with RAF optimization
const StatsCounter = React.memo(({ end, label, icon: Icon, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const animateCount = useCallback(() => {
    if (!isInView) return;

    let startTime = null;
    const duration = 1500; // Reduced from 2000ms

    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easeOut for smoother animation
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutProgress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end]);

  useEffect(() => {
    animateCount();
  }, [animateCount]);
  
  return (
    <article
      ref={ref}
      className="text-center p-6 rounded-xl border border-gray-700 hover:border-purple-400 transition-colors duration-200 hover:shadow-lg bg-gray-800/80 backdrop-blur-sm"
    >
      <Icon className="w-8 h-8 text-purple-400 mx-auto mb-3" aria-hidden="true" />
      <data value={count} className="block text-3xl font-bold text-gray-100 mb-2">
        {count}{suffix}
      </data>
      <p className="text-gray-300 text-sm font-medium">{label}</p>
    </article>
  );
});

StatsCounter.displayName = 'StatsCounter';

// Optimized Feature Card
const FeatureCard = React.memo(({ icon: Icon, title, description, delay }) => {
  return (
    <motion.article
      className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700 hover:shadow-xl hover:border-purple-400 transition-all duration-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true, margin: '-20px' }}
    >
      <header className="flex items-center mb-4">
        <div className="bg-purple-400/20 p-3 rounded-lg mr-4 flex-shrink-0">
          <Icon className="w-6 h-6 text-purple-400" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
      </header>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </motion.article>
  );
});

FeatureCard.displayName = 'FeatureCard';

// Main Component
const MultiNetAbout = () => {
    const handleClick = () => {
    window.open('https://www.facebook.com/multinetworkcatv', '_blank', 'noopener,noreferrer');
  };
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.8]);

  // Memoized data to prevent re-renders
  const statsData = useMemo(() => [
    { end: 750, label: "Maximum Speed", icon: Zap, suffix: "Mbps" },
    { end: 99.9, label: "Uptime Guarantee", icon: Wifi, suffix: "%" },
    { end: 90, label: "Premium TV Channels", icon: Star, suffix: "+" }
  ], []);

  const featuresData = useMemo(() => [
    {
      icon: Zap,
      title: "Ultra-fast Fiber Internet",
      description: "Experience blazing speeds up to 750 Mbps with our state-of-the-art fiber optic infrastructure."
    },
    {
      icon: Users,
      title: "Locally Operated",
      description: "Based right here in Cabanatuan City, we provide fast support with real people who understand your needs."
    },
    {
      icon: Star,
      title: "Premium TV Channels",
      description: "Enjoy access to 90+ premium TV channels included free with every internet plan."
    },
    {
      icon: MapPin,
      title: "Community Focused",
      description: "Proudly serving Nueva Ecija, bridging the digital gap with world-class service and hometown touch."
    }
  ], []);

  const benefitsData = useMemo(() => [
    "Ultra-fast Fiber Internet up to 750 Mbps",
    "Free Installation with every plan",
    "Free up to 90 Premium TV Channels",
    "Locally Operated in Cabanatuan City",
    "Affordable Packages for everyone"
  ], []);

  return (
    <main className="relative px-5 py-40 lg:py-0 mb-15">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.header 
          className="text-center mb-20"
          style={{ y, opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="text-gray-100">About </span>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
                Multinet Velocity
              </span>
            </h1>
          </motion.div>

          <motion.div
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <TypewriterText 
              text="Redefining internet connectivity in Cabanatuan City and beyond with blazing-fast, affordable, and reliable fiber optic internet."
              delay={50}
              className="block"
            />
          </motion.div>
        </motion.header>

        {/* Stats Section */}
        <section 
          className="mb-20"
          aria-labelledby="stats-heading"
        >
          <h2 id="stats-heading" className="sr-only">
            Multinet Velocity Performance Statistics
          </h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            {statsData.map((stat, index) => (
              <StatsCounter
                key={`stat-${index}`}
                end={stat.end}
                label={stat.label}
                icon={stat.icon}
                suffix={stat.suffix}
              />
            ))}
          </motion.div>
        </section>

        {/* Mission Section */}
        <section 
          className="mb-20"
          aria-labelledby="mission-heading"
        >
          <motion.div 
            className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700 shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.h2 
              id="mission-heading"
              className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our Mission
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-gray-300 text-center max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
             Our mission is to provide top-quality fiber optic internet service paired with free cable TV. We ensure a fast, stable, and uninterrupted connection for both home and business users. With diverse entertainment options and crystal-clear cable signal, we bring the ultimate digital experience right to your doorstep. Choose us for blazing-fast internet, exceptional customer service, and unbeatable value.
            </motion.p>
          </motion.div>
        </section>

        {/* Features Section */}
        <section 
          className="mb-20"
          aria-labelledby="features-heading"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-100">
              Why Choose Multinet Velocity?
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {featuresData.map((feature, index) => (
                <FeatureCard
                  key={`feature-${index}`}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section 
          className="mb-20 flex items-center justify-center"
          aria-labelledby="benefits-heading"
        >
          <motion.div 
            className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-12 border border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <h3 id="benefits-heading" className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-100">
              What You Get When You Choose Us
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list">
              {benefitsData.map((benefit, index) => (
                <motion.li
                  key={`benefit-${index}`}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-400/10 transition-colors duration-200"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-green-400/20 p-1 rounded-full flex-shrink-0" aria-hidden="true">
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-gray-300 font-medium">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* Call to Action */}
        <section aria-labelledby="cta-heading">
          <motion.div 
            className="text-center bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white shadow-2xl border border-purple-500"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-50px' }}
          >
            <h3 id="cta-heading" className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-lg md:text-xl mb-6 text-purple-100 max-w-2xl mx-auto leading-relaxed">
              Join the thousands who have made the switch to Multinet Velocity and experience the difference of a truly connected life.
            </p>
            <motion.button
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200 hover:bg-gray-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              aria-label="Contact MultiNet Velocity to get connected today"
              onClick={handleClick}
            >
              Get Connected Today
            </motion.button>
          </motion.div>
        </section>
      </div>
    </main>
  );
};

export default MultiNetAbout;