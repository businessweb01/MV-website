'use client';
import { motion } from 'framer-motion';
import { Phone, MapPin, Facebook } from 'lucide-react';

export default function Footer() {
  const contactNumbers = [
    "(044) 463 8301",
    "+639335088895",
    "+639503964228",
    "+639852751154",
    "+639384618920"
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const phoneVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 border-t border-white/10">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-purple-400/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-300/5 rounded-full blur-2xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-3">
        <div className="w-full h-full bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,0.02)_25px,rgba(255,255,255,0.02)_26px,transparent_27px,transparent_74px,rgba(255,255,255,0.02)_75px,rgba(255,255,255,0.02)_76px,transparent_77px),linear-gradient(rgba(255,255,255,0.02)_24px,transparent_25px,transparent_26px,rgba(255,255,255,0.02)_27px,rgba(255,255,255,0.02)_74px,transparent_75px,transparent_76px,rgba(255,255,255,0.02)_77px)] bg-[length:100px_100px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, threshold: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start"
        >
          {/* Contact Numbers Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center space-x-3 mb-8">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
              >
                <Phone className="w-6 h-6 text-black" />
              </motion.div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Contact Numbers
              </h3>
            </div>
            
            <div className="space-y-3">
              {contactNumbers.map((number, index) => (
                <motion.div
                  key={index}
                  variants={phoneVariants}
                  whileHover={{ 
                    x: 5, 
                    transition: { duration: 0.2 } 
                  }}
                  className="group"
                >
                  <a
                    href={`tel:${number}`}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-400/30 transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="text-white/90 group-hover:text-white font-medium tracking-wide">
                      {number}
                    </span>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Address Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center space-x-3 mb-8">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              >
                <MapPin className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Our Location
              </h3>
            </div>
            
            <motion.a
              href="https://www.google.com/maps/place/MULTINET+VELOCITY/@15.4973427,120.9757242,17z/data=!3m1!4b1!4m6!3m5!1s0x339729316b104b7b:0x27fe9cc941c83628!8m2!3d15.4973428!4d120.9805951!16s%2Fg%2F11bxb4rzns?entry=ttu&g_ep=EgoyMDI1MDYxNy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 hover:border-purple-400/30 transition-all duration-300 backdrop-blur-sm cursor-pointer group"
            >
              <p className="text-white/90 group-hover:text-white leading-relaxed text-lg transition-colors duration-200">
                Purok Mampulog, Brgy. Bitas,<br />
                <span className="text-yellow-400 font-semibold">Cabanatuan City</span>
              </p>
              <p className="text-purple-400 text-sm font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                View on Google Maps
              </p>
            </motion.a>
          </motion.div>

          {/* Facebook Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center space-x-3 mb-8">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
              >
                <Facebook className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Follow Us
              </h3>
            </div>
            
            <motion.a
              href="https://www.facebook.com/multinetworkcatv"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group cursor-pointer block"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/20 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors duration-200">
                    <Facebook className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white/90 group-hover:text-white font-semibold text-lg transition-colors duration-200">
                      MULTINETWORK CATV
                    </p>
                    <p className="text-blue-400 text-sm font-medium">
                      Visit our Facebook page
                    </p>
                  </div>
                </div>
              </div>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <div className="text-center">
            <motion.h2
              whileHover={{ scale: 1.02 }}
              className="text-3xl md:text-4xl font-black mb-4"
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                MULTINET
              </span>{' '}
              <span className="text-white">
                VELOCITY
              </span>
            </motion.h2>
            <p className="text-white/60 text-sm">
              © 2024 Multinetwork CATV. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}