'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

export default function Plans() {
  const wifiPlans = [
    { speed: '35 Mbps', price: 'PHP 800', model: 'V - FIBER 1' },
    { speed: '125 Mbps', price: 'PHP 1100', model: 'V - FIBER 2' },
    { speed: '250 Mbps', price: 'PHP 1500', model: 'V - FIBER 3' },
    { speed: '500 Mbps', price: 'PHP 1900', model: 'V - FIBER 4' },
    { speed: '750 Mbps', price: 'PHP 2500', model: 'V - FIBER 5' },
  ];

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const cardsY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen"
    >
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-yellow-300 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 left-1/3 w-28 h-28 bg-yellow-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-20 h-20 bg-yellow-400 rounded-full blur-2xl"></div>
      </motion.div>

      {/* Animated Grid Pattern */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-5"
      >
        <div className="w-full h-full bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,0.03)_25px,rgba(255,255,255,0.03)_26px,transparent_27px,transparent_74px,rgba(255,255,255,0.03)_75px,rgba(255,255,255,0.03)_76px,transparent_77px),linear-gradient(rgba(255,255,255,0.03)_24px,transparent_25px,transparent_26px,rgba(255,255,255,0.03)_27px,rgba(255,255,255,0.03)_74px,transparent_75px,transparent_76px,rgba(255,255,255,0.03)_77px)] bg-[length:100px_100px]"></div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Parallax Title */}
        <motion.div 
          style={{ y: titleY }}
          className="text-center mb-16"
        >
          <motion.h2
            ref={ref}
            variants={titleVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-wider mb-4"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
              VELOCITY
            </span>{' '}
            <span className="text-white drop-shadow-2xl">
              FIBER PLANS
            </span>
          </motion.h2>
          
          {/* Animated underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: "200px" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"
          />
        </motion.div>

        {/* Parallax Cards Container */}
        <motion.div
          style={{ y: cardsY }}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto"
        >
          {wifiPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative h-full"
            >
              {/* Card Background with Hover Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 blur-xl"></div>
              
              <div className="relative h-full flex flex-col justify-between to-black border border-white-400/30 rounded-2xl p-8 text-center hover:border-yellow-400/60 transition-all duration-300 backdrop-blur-sm min-h-[280px] sm:min-h-[320px]">
                {/* Speed Badge */}
                <motion.div 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2 rounded-full text-lg font-bold mb-6 inline-block w-40 mx-auto"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className='flex flex-col justify-center'>
                    <p className="text-xs text-black -mb-1 text-left">UP TO</p>
                    <div className="text-xl font-extrabold text-left">{plan.speed}</div>
                  </div>
                </motion.div>

                {/* Price Section */}
                <div className="mb-6 flex-grow flex flex-col justify-center">
                  <motion.div 
                    className="text-2xl font-black text-white mb-2 break-words"
                    whileHover={{ scale: 1.1 }}
                  >
                    PER MONTH {plan.price}
                  </motion.div>
                </div>

                {/* Model */}
                <motion.div 
                  className="text-white/80 font-bold text-lg tracking-wide break-words"
                  whileHover={{ color: "#fbbf24" }}
                >
                  {plan.model}
                </motion.div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}