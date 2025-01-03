import React from 'react';
import { motion } from 'framer-motion';
import {
    Instagram,
    Facebook,
    Twitter,
    Linkedin,
    Mail,
    Heart
} from 'lucide-react';
import { HashLink } from 'react-router-hash-link';

const Footer = () => {
    const socialIcons = [
        { icon: <Instagram size={20} />, link: "#" },
        { icon: <Facebook size={20} />, link: "#" },
        { icon: <Twitter size={20} />, link: "#" },
        { icon: <Linkedin size={20} />, link: "#" },
        { icon: <Mail size={20} />, link: "#" }
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    return (
        <footer className="bg-black text-gray-300 py-12">
            <motion.div
                className="max-w-6xl mx-auto px-4"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <motion.div variants={itemVariants}>
                        <h3 className="text-white text-xl font-bold mb-4">Dr. Praful Waghade</h3>
                        <p className="text-gray-400 text-sm">
                        Dermatologist & Skin Specialist
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h3 className="text-white text-xl font-bold mb-4">Home</h3>
                        <ul className="text-gray-400 space-y-2">
                        <HashLink  to="#about">About Us</HashLink><br />
                        <HashLink  to="/bookappointment">Book a Appointment</HashLink><br />
                        <HashLink  to="/skinquiz">Skin Quiz</HashLink><br />
                        <HashLink  to="#services">Services</HashLink><br />
                        <HashLink  to="#doctors">Doctors</HashLink><br />
                        <HashLink  to="#testimonials">Testimonials</HashLink><br />
                        <HashLink  to="#contact">Contact</HashLink><br />

                            
                           
                        </ul>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h3 className="text-white text-xl font-bold mb-4">Contact</h3>
                        <ul className="text-gray-400 space-y-2">
                            <li>contact@prafulwghade.com</li>
                            <li>+1 (555) 123-4567</li>
                            <li>Near new, Bus Stop Akola</li>
                            <li>Maharashtra, 444004</li>
                        </ul>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h3 className="text-white text-xl font-bold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            {socialIcons.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.link}
                                    className="text-gray-400 hover:text-white transition-colors duration-300"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Divider */}
                <motion.div
                    className="border-t border-gray-800 my-8"
                    variants={itemVariants}
                />

                {/* Bottom Section */}
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
                    variants={itemVariants}
                >
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Dr.Praful Waghade Clinic. All rights reserved.
                    </p>

                    <motion.p
                        className="text-orange-600 font-bold text-sm flex items-center gap-1"
                        whileHover={{ scale: 1.05 }}
                    >
                        <img className='w-6 h-6' src='https://webreich.vercel.app/logo.png' />
                        <a
                            href="https://webreich.vercel.app/"
                            className="text-orange-600 font-bold hover:text-orange-700 transition-colors duration-300"
                        >Webreich Technologies
                        </a>
                    </motion.p>
                </motion.div>
            </motion.div>
        </footer>
    );
};

export default Footer;