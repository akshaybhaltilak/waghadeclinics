import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Deepak Sharma',
      role: 'Satisfied Patient',
      feedback: 'I had a fantastic experience at Waghade Skin Clinic. Dr. Praful provided exceptional care with a level of professionalism that exceeded my expectations. The clinic\'s modern facilities and attention to hygiene gave me complete peace of mind.',
      rating: 5,
    },
    {
      name: 'Dr. Neeta Punde',
      role: 'Medical Professional',
      feedback: 'As a fellow medical professional, I can attest to the outstanding quality of care provided here. The attention to detail in patient care and the modern approach to treatment sets a new standard in dermatological care.',
      rating: 5,
    },
    {
      name: 'Shubhangi K Gaikwad',
      role: 'Regular Patient',
      feedback: 'Finding an experienced dermatologist is crucial, and Dr. Waghade exceeds all expectations. The personalized care and attention to detail make this clinic stand out from the rest.',
      rating: 5,
    },
    {
      name: 'Rajesh Kumar',
      role: 'First-time Patient',
      feedback: 'From the moment I walked in, I knew I was in good hands. The staff\'s professionalism and the clinic\'s state-of-the-art facilities impressed me. My treatment results were beyond my expectations.',
      rating: 5,
    },
    {
      name: 'Priya Mehta',
      role: 'Long-term Patient',
      feedback: 'I\'ve been visiting Dr. Waghade for over two years now, and the consistency in quality care is remarkable. The clinic\'s commitment to patient well-being and advanced treatment options keeps me coming back.',
      rating: 5,
    },
    {
      name: 'Amit Desai',
      role: 'Patient',
      feedback: 'The combination of cutting-edge treatments and compassionate care makes this clinic exceptional. Dr. Waghade\'s expertise in dermatology is evident in the outstanding results.',
      rating: 5,
    }
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 relative overflow-hidden" id='testimonials'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Patient Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real experiences from our valued patients who have trusted us with their care
          </p>
        </motion.div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto hide-scrollbar gap-6 pb-4 px-4 -mx-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="flex-shrink-0 w-[350px] bg-white rounded-2xl shadow-xl p-8 relative"
              >
                <Quote className="w-10 h-10 text-blue-500/20 absolute top-6 right-6" />
                
                <div className="mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-yellow-400 inline-block"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>

                <p className="text-gray-700 text-lg mb-6 line-clamp-4">
                  "{testimonial.feedback}"
                </p>

                <div className="mt-auto">
                  <h4 className="font-semibold text-xl text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-blue-600 font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;