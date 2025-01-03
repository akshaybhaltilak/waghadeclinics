import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Award, Clock, AlertCircle, ChevronRight, Check, Heart } from 'lucide-react';

const SkinQuiz = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [progress, setProgress] = useState(0);
    const [showTip, setShowTip] = useState(false);
    const [loading, setLoading] = useState(false);

    const questions = [
        {
            question: "What's your biggest skin concern right now?",
            options: [
                { text: "Acne & Breakouts", icon: "😔" },
                { text: "Aging & Fine Lines", icon: "🕐" },
                { text: "Dark Spots & Uneven Tone", icon: "🔆" },
                { text: "Dryness & Sensitivity", icon: "🌵" }
            ],
            tip: "Your skin concerns are unique to you. Understanding them is the first step to achieving your dream skin!"
        },
        {
            question: "How would you describe your skin's behavior?",
            options: [
                { text: "Oily & Shiny", icon: "✨" },
                { text: "Dry & Tight", icon: "🏜️" },
                { text: "Combination & Unpredictable", icon: "🎭" },
                { text: "Sensitive & Reactive", icon: "🎯" }
            ],
            tip: "Your skin type can change with seasons and age. Professional guidance helps adapt to these changes!"
        },
        {
            question: "How much attention do you give to sun protection?",
            options: [
                { text: "I rarely think about it", icon: "🌞" },
                { text: "Only when it's very sunny", icon: "⛱️" },
                { text: "I try to use sunscreen daily", icon: "🧴" },
                { text: "I'm religious about UV protection", icon: "🛡️" }
            ],
            tip: "Did you know? 80% of skin aging is caused by sun exposure. Expert advice can help protect your skin!"
        },
        {
            question: "What's your current skincare routine like?",
            options: [
                { text: "Just basics (cleanse & moisturize)", icon: "🧼" },
                { text: "Moderate (including some treatments)", icon: "✨" },
                { text: "Extensive but not sure if correct", icon: "❓" },
                { text: "I need guidance to start", icon: "🤔" }
            ],
            tip: "A personalized skincare routine can transform your skin's health and appearance!"
        }
    ];

    const skinAnalysis = {
        "Acne & Breakouts": {
            concernLevel: "High",
            timeFrame: "Immediate action required to prevent scarring",
            recommendedActions: [
                "Use salicylic acid or benzoyl peroxide-based treatments",
                "Avoid touching or picking at acne",
                "Keep your skin hydrated with non-comedogenic products"
            ],
            urgentNeeds: ["Consult a dermatologist for persistent or severe acne"]
        },
        "Aging & Fine Lines": {
            concernLevel: "Moderate to High",
            timeFrame: "Critical for the next 3-6 months",
            recommendedActions: [
                "Incorporate retinoids and peptides into your routine",
                "Ensure daily sunscreen application (SPF 50+)",
                "Stay hydrated and consider professional anti-aging treatments"
            ],
            urgentNeeds: ["Start sun protection and anti-aging products immediately"]
        },
        "Dark Spots & Uneven Tone": {
            concernLevel: "Moderate",
            timeFrame: "Improvements visible within 6 weeks",
            recommendedActions: [
                "Use Vitamin C or niacinamide serums",
                "Exfoliate weekly with AHAs/BHAs",
                "Protect skin daily with SPF 50+ to prevent further pigmentation"
            ],
            urgentNeeds: ["Prevent worsening by avoiding direct sun exposure"]
        },
        "Dryness & Sensitivity": {
            concernLevel: "Moderate to High",
            timeFrame: "Requires consistent care for 4-8 weeks",
            recommendedActions: [
                "Use a gentle, fragrance-free cleanser",
                "Apply ceramide-rich moisturizers daily",
                "Avoid harsh exfoliants and extreme weather conditions"
            ],
            urgentNeeds: ["Restore skin's moisture barrier immediately"]
        }
    };

    // Continued from the previous section...
    const generateResult = () => {
        setLoading(true);

        setTimeout(() => {
            const mainConcern = answers[0];
            const skinType = answers[1];
            const sunProtection = answers[2];
            const routine = answers[3];

            let analysis = {
                concernLevel: "",
                timeFrame: "",
                recommendedActions: [],
                urgentNeeds: [],
                professionalAdvice: false
            };

            // Set concern level based on skin concern
            switch (mainConcern) {
                case "Acne & Breakouts":
                    analysis.concernLevel = "High - Requires Immediate Action";
                    analysis.urgentNeeds.push("Acne treatment plan to prevent scarring.");
                    analysis.recommendedActions = [
                        "Use salicylic acid or benzoyl peroxide treatments.",
                        "Incorporate non-comedogenic products.",
                        "Schedule professional consultations for severe acne."
                    ];
                    break;
                case "Aging & Fine Lines":
                    analysis.concernLevel = "Moderate to High - Preventive Care Recommended";
                    analysis.urgentNeeds.push("Implement anti-aging skincare routine with sunscreen.");
                    analysis.recommendedActions = [
                        "Apply a broad-spectrum sunscreen daily.",
                        "Use products with retinoids and peptides.",
                        "Schedule clinical treatments for visible fine lines."
                    ];
                    break;
                case "Dark Spots & Uneven Tone":
                    analysis.concernLevel = "Moderate - Targeted Care Needed";
                    analysis.urgentNeeds.push("Use SPF 50+ to prevent further pigmentation.");
                    analysis.recommendedActions = [
                        "Incorporate Vitamin C serums.",
                        "Use AHAs or BHAs to exfoliate and renew skin tone.",
                        "Consider professional chemical peels or laser treatments."
                    ];
                    break;
                case "Dryness & Sensitivity":
                    analysis.concernLevel = "Moderate - Barrier Repair Needed";
                    analysis.urgentNeeds.push("Hydrate skin to repair moisture barrier.");
                    analysis.recommendedActions = [
                        "Use products with ceramides and hyaluronic acid.",
                        "Avoid harsh cleansers and exfoliants.",
                        "Consult a dermatologist for persistent sensitivity."
                    ];
                    break;
                default:
                    analysis.concernLevel = "Low";
                    break;
            }

            // Analyze sun protection habits
            if (sunProtection === "I rarely think about it") {
                analysis.urgentNeeds.push("Immediate sun protection strategy needed.");
                analysis.recommendedActions.push(
                    "Apply sunscreen every morning with SPF 30 or higher."
                );
            } else if (sunProtection === "Only when it's very sunny") {
                analysis.recommendedActions.push(
                    "Make sunscreen a daily habit regardless of the weather."
                );
            }

            // Analyze skincare routine
            switch (routine) {
                case "Just basics (cleanse & moisturize)":
                    analysis.recommendedActions.push(
                        "Introduce treatments like serums for targeted concerns."
                    );
                    break;
                case "Moderate (including some treatments)":
                    analysis.recommendedActions.push(
                        "Evaluate the effectiveness of your current routine."
                    );
                    break;
                case "Extensive but not sure if correct":
                    analysis.recommendedActions.push(
                        "Consult a dermatologist to optimize your regimen."
                    );
                    break;
                case "I need guidance to start":
                    analysis.urgentNeeds.push("Build a basic skincare routine immediately.");
                    analysis.recommendedActions.push(
                        "Start with a cleanser, moisturizer, and sunscreen."
                    );
                    break;
            }

            analysis.timeFrame = "Next 3-6 months are crucial for visible improvement.";
            analysis.professionalAdvice = true;

            setResult(analysis);
            setLoading(false);
        }, 1500);
    };


    const handleAnswer = (answer) => {
        setAnswers(prev => ({ ...prev, [step]: answer }));
        setProgress((step + 1) * (100 / questions.length));

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            generateResult();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Your Journey to Radiant Skin Starts Here
                    </h1>
                    <p className="text-gray-600">
                        Take our interactive quiz to discover your skin's true potential
                    </p>
                </motion.div>

                {!result ? (
                    <motion.div
                        className="bg-white rounded-2xl shadow-xl p-8 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="mb-6">
                            <div className="h-2 bg-gray-100 rounded-full">
                                <motion.div
                                    className="h-2 bg-blue-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                            >
                                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                    {questions[step].question}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {questions[step].options.map((option, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleAnswer(option.text)}
                                            className="p-4 rounded-xl bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center gap-3"
                                        >
                                            <span className="text-2xl">{option.icon}</span>
                                            <span className="text-gray-700 font-medium">{option.text}</span>
                                        </motion.button>
                                    ))}
                                </div>

                                <motion.div
                                    className="mt-6 p-4 bg-blue-50 rounded-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <p className="text-blue-800 flex items-center gap-2">
                                        <Sparkles className="w-5 h-5" />
                                        {questions[step].tip}
                                    </p>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xl p-8"
                    >
                        {loading ? (
                            <div className="text-center py-12">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                                />
                                <p className="text-gray-600">Analyzing your skin profile...</p>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-8 text-center">
                                    <Award className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                        Your Personalized Skin Analysis
                                    </h2>
                                    <p className="text-gray-600">
                                        Based on your responses, here's what your skin needs
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <motion.div
                                        className="p-4 bg-red-50 rounded-lg border border-red-100"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        <h3 className="font-semibold text-red-800 flex items-center gap-2 mb-2">
                                            <AlertCircle className="w-5 h-5" />
                                            Urgent Attention Needed
                                        </h3>
                                        <ul className="list-disc list-inside text-red-700 space-y-1">
                                            {result.urgentNeeds.map((need, index) => (
                                                <li key={index}>{need}</li>
                                            ))}
                                        </ul>
                                    </motion.div>

                                    <motion.div
                                        className="p-4 bg-blue-50 rounded-lg"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <h3 className="font-semibold text-blue-800 flex items-center gap-2 mb-2">
                                            <Clock className="w-5 h-5" />
                                            Time-Sensitive Window
                                        </h3>
                                        <p className="text-blue-700">
                                            {result.timeFrame}
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        className="mt-8"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <a
                                            href="/contact"
                                            className="block w-full bg-blue-600 text-white text-center py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                                        >
                                            Book Your Professional Consultation Now
                                        </a>
                                        <p className="text-center text-gray-500 mt-4">
                                            Take the first step towards healthier, more radiant skin
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default SkinQuiz;