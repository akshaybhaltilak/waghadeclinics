import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Stethoscope,
    Scissors,
    Sparkles,
    Shield,
    Syringe,
    Sun,
    Workflow,
    Heart,
    Gift,
    Activity,
    X,
    Clock,
    ChevronRight,
    Microscope,
    Fingerprint,
    Zap,
    Droplet,
    Brush,
    Target,
    CheckCircle
} from 'lucide-react';

const servicesData = {
    "Treatment": {
        icon: <Stethoscope className="w-6 h-6" />,
        color: "bg-gradient-to-br from-[#F6F4F0] to-[#E6E4E0]",
        iconColor: "text-[#2E5077]",
        services: [
            {
                title: "Dermatitis Treatment",
                description: "Comprehensive care for skin inflammation and irritation.",
                longDescription: "Our program addresses various forms of dermatitis including atopic, contact, and seborrheic dermatitis, offering relief through topical treatments and lifestyle guidance.",
                duration: "30-45 minutes",
                benefits: [
                    "Relief from itching and inflammation",
                    "Prevention of flare-ups",
                    "Skin barrier restoration"
                ],
                icon: <Shield className="w-8 h-8" />
            },
            {
                title: "Hyper Pigmentation",
                description: "Advanced solutions for even skin tone.",
                longDescription: "We provide targeted treatments like chemical peels and laser therapies to reduce dark spots and hyperpigmentation effectively.",
                duration: "20-40 minutes",
                benefits: [
                    "Reduces dark spots",
                    "Improves skin tone",
                    "Boosts confidence"
                ],
                icon: <Fingerprint className="w-8 h-8" />
            },
            {
                title: "Skin Rash Treatment",
                description: "Effective care for persistent skin rashes.",
                longDescription: "Our treatments are designed to alleviate discomfort and target the underlying causes of rashes through advanced dermatological care.",
                duration: "15-30 minutes",
                benefits: [
                    "Immediate relief",
                    "Prevention of recurrence",
                    "Improved skin health"
                ],
                icon: <Activity className="w-8 h-8" />
            }
        ]
    },
    "Surgery": {
        icon: <Microscope className="w-6 h-6" />,
        color: "bg-gradient-to-br from-[#79D7BE] to-[#69C7AE]",
        iconColor: "text-[#2E5077]",
        services: [
            {
                title: "PRP Hair Transplantation",
                description: "Non-invasive procedure for hair restoration.",
                longDescription: "Platelet-rich plasma (PRP) therapy uses your own blood to stimulate natural hair growth and maintain it.",
                duration: "1-2 hours",
                benefits: [
                    "Natural-looking results",
                    "Improved hair density",
                    "Boosted confidence"
                ],
                icon: <Zap className="w-8 h-8" />
            }
        ]
    },
    "Skin Care": {
        icon: <Sparkles className="w-6 h-6" />,
        color: "bg-gradient-to-br from-[#4DA1A9] to-[#3D9199]",
        iconColor: "text-[#F6F4F0]",
        services: [
            {
                title: "Skin Polishing",
                description: "Enhance your skin's natural glow.",
                longDescription: "Skin polishing uses microdermabrasion techniques to remove dead skin cells, leaving a smoother and brighter complexion.",
                duration: "45 minutes",
                benefits: [
                    "Radiant skin",
                    "Improved texture",
                    "Youthful appearance"
                ],
                icon: <Brush className="w-8 h-8" />
            },
            {
                title: "Skin Hydration",
                description: "Deep hydration for healthy skin.",
                longDescription: "Our hydration treatments replenish your skin's moisture, combating dryness and promoting elasticity.",
                duration: "30 minutes",
                benefits: [
                    "Long-lasting hydration",
                    "Smoother skin",
                    "Reduced dryness"
                ],
                icon: <Droplet className="w-8 h-8" />
            }
        ]
    },
    "Procedures": {
        icon: <Target className="w-6 h-6" />,
        color: "bg-gradient-to-br from-[#2E5077] to-[#1E4067]",
        iconColor: "text-[#F6F4F0]",
        services: [
            {
                title: "Laser Hair Removal",
                description: "Safe and effective hair removal technique.",
                longDescription: "Our laser hair removal procedure targets hair follicles to reduce unwanted hair growth, leaving smooth skin.",
                duration: "20-60 minutes",
                benefits: [
                    "Permanent hair reduction",
                    "Smooth skin",
                    "Time-saving"
                ],
                icon: <Sun className="w-8 h-8" />
            }
        ]
    }
};

const ServiceCard = ({ service, category, onClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ y: -5, scale: 1.02 }}
        onClick={onClick}
        className="group backdrop-blur-md bg-white/80 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-white/20"
        id='services'
    >
        <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
                <div className={`w-16 h-16 rounded-2xl ${category.color} ${category.iconColor} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {service.icon}
                </div>
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="flex items-center text-[#4DA1A9]"
                >
                    <span className="text-sm font-medium mr-1">Learn More</span>
                    <ChevronRight className="w-4 h-4" />
                </motion.div>
            </div>
            <div>
                <h3 className="text-xl font-bold text-[#2E5077] mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
            </div>
            <div className="flex items-center text-[#4DA1A9] text-sm">
                <Clock className="w-4 h-4 mr-2" />
                <span>{service.duration}</span>
            </div>
        </div>
    </motion.div>
);

const ServiceModal = ({ service, isOpen, onClose }) => {
    if (!isOpen || !service) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 overflow-auto bg-black/40 backdrop-blur-md flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative bg-white/90 backdrop-blur-lg rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl border border-white/20"
                >
                    <div className="absolute right-4 top-4 z-10">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="p-2 rounded-full bg-[#F6F4F0] hover:bg-[#79D7BE]/20 text-[#2E5077] transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </motion.button>
                    </div>

                    <div className="p-8">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="flex items-center gap-6 mb-8"
                        >
                            <div className="bg-gradient-to-br from-[#F6F4F0] to-[#E6E4E0] text-[#2E5077] p-4 rounded-xl shadow-lg">
                                {service.icon}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-[#2E5077] mb-2">{service.title}</h2>
                                <div className="flex items-center text-[#4DA1A9]">
                                    <Clock className="w-5 h-5 mr-2" />
                                    <span>{service.duration}</span>
                                </div>
                            </div>
                        </motion.div>

                        <div className="overflow-auto max-h-[60vh] pr-4 space-y-8">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="bg-gradient-to-br from-[#F6F4F0] to-[#E6E4E0] p-6 rounded-xl shadow-lg"
                            >
                                <h3 className="font-bold text-lg text-[#2E5077] mb-4">About this treatment</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {service.longDescription}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h3 className="font-bold text-lg text-[#2E5077] mb-4">Key Benefits</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {service.benefits.map((benefit, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ scale: 1.02 }}
                                            className="flex items-start gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-[#79D7BE]/20 hover:border-[#79D7BE] transition-colors shadow-lg"
                                        >
                                            <CheckCircle className="w-5 h-5 text-[#4DA1A9] mt-0.5" />
                                            <span className="text-gray-700">{benefit}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-8 pt-6 border-t border-gray-100"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onClose}
                                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-[#2E5077] to-[#4DA1A9] text-white rounded-xl transition-all duration-300 mb-5 shadow-lg hover:shadow-xl"
                            >
                                Close
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const Tabs = ({ tabs, activeTab, onTabChange, children }) => {
    return (
        <div>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex flex-wrap justify-center gap-3 mb-12 px-4"
            >
                {tabs.map((tab) => (
                    <motion.button
                        key={tab}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onTabChange(tab)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg ${activeTab === tab
                                ? 'bg-gradient-to-r from-[#2E5077] to-[#4DA1A9] text-white scale-105'
                                : 'bg-white/80 backdrop-blur-sm text-[#2E5077] hover:bg-[#F6F4F0]'
                            }`}
                    >
                        {servicesData[tab].icon}
                        <span className="font-medium">{tab}</span>
                    </motion.button>
                ))}
            </motion.div>
            <AnimatePresence mode="wait">
                {children}
            </AnimatePresence>
        </div>
    );
};

const ServicesPage = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [activeTab, setActiveTab] = useState(Object.keys(servicesData)[0]);
    const categories = Object.keys(servicesData);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F6F4F0] via-white to-[#F6F4F0] py-16">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-[#2E5077] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#2E5077] to-[#4DA1A9]">
                        Our Services
                    </h1>
                    <p className="text-lg text-gray-600">
                        Discover our comprehensive range of dermatological treatments and procedures,
                        tailored to address your specific skin health needs.
                    </p>
                </motion.div>

                <Tabs tabs={categories} activeTab={activeTab} onTabChange={setActiveTab}>
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2"
                    >
                        {servicesData[activeTab].services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: index * 0.1 }
                                }}
                            >
                                <ServiceCard
                                    service={service}
                                    category={servicesData[activeTab]}
                                    onClick={() => setSelectedService(service)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </Tabs>

                <ServiceModal
                    service={selectedService}
                    isOpen={!!selectedService}
                    onClose={() => setSelectedService(null)}
                />
            </div>

            {/* Decorative Background Elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
            >
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#79D7BE]/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4DA1A9]/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#2E5077]/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
        </div>
    );
};

// Add custom hook for animation controls
const useAnimationControls = () => {
    const controls = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.3 }
    };

    return controls;
};

export default ServicesPage;