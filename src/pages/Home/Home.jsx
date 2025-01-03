import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Star,
  Clock,
  Award,
  Users,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Heart,
  Lightbulb,
  ArrowRight
} from "lucide-react";
import ServicesPage from "../Services/Services";
import Testimonials from "../Testimonials/Testimonials";
import ContactPage from "../Contact/Contact";
import DoctorPage from "../Doctors/Doctors";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const CountUpAnimation = ({ target, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.min(Math.floor(progress * target), target));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    if (inView) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, inView]);

  return <span ref={ref}>{count}</span>;
};

const QuizPreview = () => {
  const questions = [
    {
      question: "What's your main skin concern?",
      options: ["Acne", "Aging", "Pigmentation", "Dryness"]
    },
    {
      question: "How would you describe your skin type?",
      options: ["Oily", "Dry", "Combination", "Sensitive"]
    }
  ];

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20"
    >
      <div className="space-y-6">
        {questions.map((q, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold text-[#2E5077]">{q.question}</h3>
            <div className="grid grid-cols-2 gap-2">
              {q.options.map((option, i) => (
                <div
                  key={i}
                  className="px-4 py-2 border border-[#4DA1A9]/20 rounded-lg text-gray-600 bg-white/50 cursor-not-allowed"
                >
                  {option}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6"
      >
        <Link
          to="/skinquiz"
          className="block w-full text-center px-6 py-3 bg-gradient-to-r from-[#2E5077] to-[#4DA1A9] text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
        >
          Take the Full Skin Quiz
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default function Home() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [quizRef, quizInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="w-full bg-[#F6F4F0]">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="relative min-h-[85vh] flex items-center bg-black/90 text-white py-16"
        id="home"
      >
        <motion.div
          initial={{ opacity: 0.1 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={staggerChildren}
              className="text-left space-y-6"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-4">
                  ✨ Trusted by 10,000+ Happy Patients
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-6xl font-bold leading-tight"
              >
                Transform Your Skin Journey
                <span className="text-[#79D7BE]"> Today</span>
              </motion.h1>
              
              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl opacity-90 leading-relaxed"
              >
                Experience personalized dermatology care with cutting-edge treatments 
                tailored to your unique skin needs. Start with our interactive skin 
                assessment quiz.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/bookappointment"
                    className="inline-flex items-center px-6 py-3 bg-[#2E5077] text-white font-medium rounded-lg hover:bg-[#4DA1A9] transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Book Consultation
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/skinquiz"
                    className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-300"
                  >
                    Take Skin Quiz
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="hidden md:block"
            >
              <QuizPreview />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Quick Stats Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#2E5077] to-[#4DA1A9] text-white py-8"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Clock, text: "Same Day Appointments" },
              { icon: ShieldCheck, text: "Expert Care" },
              { icon: Heart, text: "Personalized Treatment" },
              { icon: Sparkles, text: "Advanced Technology" }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                className="flex flex-col items-center space-y-2"
              >
                <item.icon className="w-6 h-6 text-[#79D7BE]" />
                <span className="text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* About Section */}
      <motion.section
        ref={aboutRef}
        initial="hidden"
        animate={aboutInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="py-20 bg-white"
        id="about"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div variants={staggerChildren} className="text-center mb-16">
              <motion.span
                variants={fadeInUp}
                className="inline-block px-4 py-2 bg-[#F6F4F0] rounded-full text-sm font-medium text-[#4DA1A9] mb-4"
              >
                Why Choose Us
              </motion.span>
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold text-[#2E5077] mb-6"
              >
                Excellence in Skin Care
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto"
              >
                With state-of-the-art technology and a patient-first approach, 
                we deliver exceptional dermatological care that transforms lives.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: Clock,
                  number: 7,
                  suffix: "+",
                  text: "Years of Excellence",
                  description: "Dedicated to providing exceptional skin care"
                },
                {
                  icon: Users,
                  number: 10000,
                  suffix: "+",
                  text: "Happy Patients",
                  description: "Trust us with their skin health journey"
                },
                {
                  icon: Award,
                  number: 50,
                  suffix: "+",
                  text: "Treatment Options",
                  description: "Customized solutions for every skin type"
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="p-8 bg-gradient-to-br from-white to-[#F6F4F0] rounded-2xl shadow-lg border border-white"
                >
                  <stat.icon className="w-10 h-10 text-[#4DA1A9] mb-4" />
                  <div className="text-4xl font-bold text-[#2E5077] mb-2">
                    <CountUpAnimation target={stat.number} />
                    {stat.suffix}
                  </div>
                  <div className="text-lg font-semibold text-[#2E5077] mb-2">
                    {stat.text}
                  </div>
                  <div className="text-gray-600">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Skin Quiz CTA Section */}
      <motion.section
        ref={quizRef}
        initial="hidden"
        animate={quizInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="py-20 bg-[#F6F4F0]"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#2E5077] to-[#4DA1A9] rounded-3xl p-12 text-white text-center">
            <motion.div variants={staggerChildren} className="space-y-6">
              <motion.div variants={fadeInUp}>
                <Lightbulb className="w-12 h-12 mx-auto text-[#79D7BE] mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Discover Your Perfect Skin Care Routine
                </h2>
                <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                  Take our comprehensive skin assessment quiz and receive a personalized 
                  treatment plan worth ₹2,000 - completely free! Join thousands who've 
                  transformed their skin health journey with us.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/skinquiz"
                    className="inline-flex items-center px-8 py-4 bg-white text-[#2E5077] font-medium rounded-xl hover:bg-[#79D7BE] hover:text-white transition-all duration-300 shadow-lg"
                  >
                    Start Free Skin Assessment
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </motion.div>
                <p className="text-sm opacity-75">
                  ⚡ 3-minute quiz • Instant results • Personalized recommendations
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <ServicesPage />
      <Testimonials />
      <DoctorPage />
      <ContactPage />
    </div>
  );
}