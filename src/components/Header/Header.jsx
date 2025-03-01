import React, { useState, useEffect } from "react";
import { HashLink } from 'react-router-hash-link';
import { Menu, X, ChevronDown, Search, Phone, Clock, MapPin, Calendar, Star, Heart, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    name: "Home",
    href: "#home",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
  },
  {
    name: "About",
    href: "#about",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  },
  {
    name: "Services",
    href: "#services",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
    submenu: [
      { name: "Dermatitis Treatment", href: "#skin-treatments", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
      { name: "Hyper Pigmentation", href: "#pigmentation", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg> },
      { name: "Skin Rash Treatment", href: "#skin-rash", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
      { name: "PRP Hair Transplantation", href: "#prp", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> },
      { name: "Skin Polishing", href: "#polishing", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> },
      { name: "Skin Hydration", href: "#hydration", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> },
      { name: "Laser Hair Removal", href: "#laser", icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
    ]
  },
  {
    name: "Doctors",
    href: "#doctors",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
  },
  {
    name: "Testimonials",
    href: "#testimonials",
    icon: <Star className="w-4 h-4" />
  },
  {
    name: "Contact",
    href: "#contact",
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [appointmentNotification, setAppointmentNotification] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simulate notification after 5 seconds for demo purposes
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveSubmenu(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you would add/remove dark mode classes to the body
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
  };

  const dismissNotification = () => {
    setShowNotification(false);
  };

  const showAppointmentNotification = () => {
    setAppointmentNotification(true);
    setTimeout(() => {
      setAppointmentNotification(false);
    }, 3000);
  };

  return (
    <>
      {/* Dark mode context */}
      <div className={isDarkMode ? "dark" : ""}>
        {/* Notification */}
        {showNotification && (
          <div className="fixed top-5 right-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50 max-w-sm animate-fade-in transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between px-4 py-2 bg-[#4DA1A9] text-white">
              <h3 className="font-medium text-sm">Special Offer!</h3>
              <button onClick={dismissNotification} className="text-white hover:text-gray-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">Get 20% off on all skin treatments this month! Book your appointment now.</p>
              <button 
                onClick={() => {
                  dismissNotification();
                  showAppointmentNotification();
                }} 
                className="mt-3 w-full px-3 py-1.5 bg-[#2E5077] text-white text-sm rounded hover:bg-[#79D7BE] transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        )}

        {/* Appointment notification */}
        {appointmentNotification && (
          <div className="fixed bottom-5 right-5 bg-green-100 border-l-4 border-green-500 p-4 rounded shadow-lg z-50 animate-slide-up">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  Redirecting to appointment booking page...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Top Info Bar */}
        <div className={`hidden lg:block transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gradient-to-r from-[#2E5077] to-[#4DA1A9] text-white'}`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-2 text-sm">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 group transition-all duration-300">
                  <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className="group-hover:text-[#79D7BE] transition-colors">+91 123 456 7890</span>
                </div>
                <div className="flex items-center space-x-2 group transition-all duration-300">
                  <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span className="group-hover:text-[#79D7BE] transition-colors">Mon - Sat: 9:00 AM - 8:00 PM</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center space-x-2 group transition-all duration-300">
                  <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="group-hover:text-[#79D7BE] transition-colors">123 Medical Plaza, Mumbai, India</span>
                </div>
                <div className="ml-4 pl-4 border-l border-white/20">
                  <button 
                    onClick={toggleDarkMode}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
                    aria-label="Toggle dark mode"
                  >
                    {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className={`w-full transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''} ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
          <div className="container mx-auto">
            <div className="flex items-center justify-between px-4 py-4">
              {/* Logo */}
              <HashLink 
                smooth to="#home" 
                className={`flex items-center space-x-2 group transition-all duration-300 ${
                  isScrolled ? 'scale-95' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2E5077] to-[#4DA1A9] flex items-center justify-center text-white font-bold opacity-90 group-hover:opacity-100 transition-all duration-300">
                  WS
                </div>
                <div className="flex flex-col">
                  <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-[#2E5077]'} group-hover:text-[#4DA1A9] transition-colors`}>
                    Waghade Skin Clinic
                  </span>
                  <span className="text-sm text-[#4DA1A9] font-bold">&hearts; Your Skin, Our Care</span>
                </div>
              </HashLink>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-6">
                {menuItems.map((item) => (
                  <div key={item.name} className="relative group">
                    <HashLink
                      smooth
                      to={item.href}
                      scroll={scrollWithOffset}
                      className={`flex items-center space-x-1.5 px-2 py-2 text-base font-medium rounded-md ${
                        isDarkMode ? 'text-gray-200 hover:text-[#79D7BE]' : 'text-[#2E5077] hover:text-[#79D7BE]'
                      } transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50`}
                    >
                      <span className="opacity-75 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                      <span>{item.name}</span>
                      {item.submenu && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
                    </HashLink>

                    {item.submenu && (
                      <div className={`absolute top-full left-0 w-64 ${
                        isDarkMode ? 'bg-gray-800 shadow-xl' : 'bg-white shadow-xl'
                      } rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 translate-y-2 group-hover:translate-y-0`}>
                        {item.submenu.map((subitem) => (
                          <HashLink
                            key={subitem.name}
                            smooth
                            to={subitem.href}
                            scroll={scrollWithOffset}
                            className={`flex items-center space-x-3 px-4 py-2.5 text-sm ${
                              isDarkMode ? 
                                'text-gray-200 hover:bg-gray-700 hover:text-[#79D7BE]' : 
                                'text-[#2E5077] hover:bg-[#F6F4F0] hover:text-[#4DA1A9]'
                            } transition-colors`}
                          >
                            <span className="text-[#4DA1A9]">{subitem.icon}</span>
                            <span>{subitem.name}</span>
                          </HashLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Right Section */}
              <div className="hidden lg:flex items-center space-x-4">
                <button 
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode ? 
                      'text-gray-300 hover:text-white hover:bg-gray-700' : 
                      'text-[#2E5077] hover:text-[#79D7BE] hover:bg-gray-100'
                  }`}
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button 
                  onClick={toggleSearch}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode ? 
                      'text-gray-300 hover:text-white hover:bg-gray-700' : 
                      'text-[#2E5077] hover:text-[#79D7BE] hover:bg-gray-100'
                  }`}
                >
                  <Search className="w-5 h-5" />
                </button>
                <Link
                  to="#special-offers"
                  className={`relative ${
                    isDarkMode ? 
                      'text-gray-300 hover:text-white hover:bg-gray-700' : 
                      'text-[#2E5077] hover:text-[#79D7BE] hover:bg-gray-100'
                  } p-2 rounded-full transition-colors`}
                >
                  <Heart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">2</span>
                </Link>
                <Link
                  to="/bookappointment"
                  onClick={(e) => {
                    e.preventDefault();
                    showAppointmentNotification();
                  }}
                  className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-[#2E5077] to-[#4DA1A9] text-white font-medium rounded-lg hover:from-[#4DA1A9] hover:to-[#79D7BE] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center space-x-2">
                <button 
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode ? 
                      'text-gray-300 hover:text-white hover:bg-gray-700' : 
                      'text-[#2E5077] hover:text-[#79D7BE] hover:bg-gray-100'
                  }`}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleMenu}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode ? 
                      'text-gray-300 hover:text-white hover:bg-gray-700' : 
                      'text-[#2E5077] hover:text-[#79D7BE] hover:bg-gray-100'
                  }`}
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className={`border-t ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-100 bg-gray-50'} transition-all duration-300 ${
            isSearchOpen ? 'h-16 opacity-100' : 'h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Search for treatments, doctors, services..." 
                  className={`w-full py-3 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-2 ${
                    isDarkMode ? 
                    'bg-gray-800 text-white border-gray-700 focus:ring-[#4DA1A9]' : 
                    'bg-white text-gray-900 border-gray-200 focus:ring-[#2E5077]'
                  } transition-colors`}
                />
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <button 
                  onClick={toggleSearch}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed z-40 inset-0 ${isDarkMode ? 'bg-black/60' : 'bg-gray-800/50'} backdrop-blur-sm transition-opacity lg:hidden ${
              isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={toggleMenu}
          >
            <div
              className={`fixed inset-y-0 right-0 w-full max-w-sm ${
                isDarkMode ? 'bg-gray-900' : 'bg-white'
              } shadow-xl transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`flex items-center justify-between p-4 ${
                isDarkMode ? 'border-gray-800' : 'border-gray-100'
              } border-b`}>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2E5077] to-[#4DA1A9] flex items-center justify-center text-white font-bold">
                    WS
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-[#2E5077]'}`}>Waghade Skin Clinic</span>
                    <span className="text-sm text-[#4DA1A9]">Your Skin, Our Care</span>
                  </div>
                </div>
                <button
                  onClick={toggleMenu}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode ? 
                      'text-gray-300 hover:text-white hover:bg-gray-700' : 
                      'text-[#2E5077] hover:text-[#79D7BE] hover:bg-gray-100'
                  }`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile search */}
              <div className={`p-4 ${isDarkMode ? 'border-gray-800' : 'border-gray-100'} border-b`}>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search for treatments..." 
                    className={`w-full py-2.5 pl-10 pr-4 rounded-lg text-sm focus:outline-none focus:ring-2 ${
                      isDarkMode ? 
                      'bg-gray-800 text-white border-gray-700 focus:ring-[#4DA1A9]' : 
                      'bg-gray-100 text-gray-900 border-gray-200 focus:ring-[#2E5077]'
                    }`}
                  />
                  <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className={`px-4 py-6 space-y-6 overflow-y-auto max-h-[calc(100vh-16rem)]`}>
                {menuItems.map((item) => (
                  <div key={item.name}>
                    <div
                      className={`flex items-center justify-between cursor-pointer ${
                        isDarkMode ? 'text-gray-200 hover:text-[#79D7BE]' : 'text-[#2E5077] hover:text-[#79D7BE]'
                      }`}
                      onClick={() => setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                    >
                      <HashLink
                        smooth
                        to={item.href}
                        scroll={scrollWithOffset}
                        className="flex items-center space-x-3 flex-1 py-2"
                        onClick={toggleMenu}
                      >
                        <span className="text-[#4DA1A9]">{item.icon}</span>
                        <span className="text-base font-medium">{item.name}</span>
                        </HashLink>
                      {item.submenu && (
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${
                            activeSubmenu === item.name ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>

                    {item.submenu && activeSubmenu === item.name && (
                      <div className={`mt-2 ml-8 space-y-2 pl-4 border-l-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        {item.submenu.map((subitem) => (
                          <HashLink
                            key={subitem.name}
                            smooth
                            to={subitem.href}
                            scroll={scrollWithOffset}
                            className={`flex items-center space-x-3 py-2 text-sm ${
                              isDarkMode ? 'text-gray-300 hover:text-[#4DA1A9]' : 'text-[#2E5077] hover:text-[#4DA1A9]'
                            }`}
                            onClick={toggleMenu}
                          >
                            <span className="text-[#4DA1A9]">{subitem.icon}</span>
                            <span>{subitem.name}</span>
                          </HashLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile menu footer */}
              <div className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} p-4 space-y-4`}>
                {/* Contact info */}
                <div className="flex flex-col space-y-2">
                  <div className={`flex items-center space-x-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Phone className="w-4 h-4 text-[#4DA1A9]" />
                    <span className="text-sm">+91 123 456 7890</span>
                  </div>
                  <div className={`flex items-center space-x-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Clock className="w-4 h-4 text-[#4DA1A9]" />
                    <span className="text-sm">Mon - Sat: 9:00 AM - 8:00 PM</span>
                  </div>
                  <div className={`flex items-center space-x-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <MapPin className="w-4 h-4 text-[#4DA1A9]" />
                    <span className="text-sm">123 Medical Plaza, Mumbai, India</span>
                  </div>
                </div>
                
                {/* Mobile call to action */}
                <div className="flex space-x-4">
                  <Link
                    to="#special-offers"
                    className={`flex items-center justify-center space-x-2 flex-1 px-4 py-2.5 ${
                      isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-[#2E5077]'
                    } rounded-lg hover:bg-[#2E5077] hover:text-white transition-colors duration-300`}
                    onClick={toggleMenu}
                  >
                    <Heart className="w-4 h-4" />
                    <span>Offers</span>
                  </Link>
                  <Link
                    to="/bookappointment"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMenu();
                      showAppointmentNotification();
                    }}
                    className="flex items-center justify-center space-x-2 flex-1 px-4 py-2.5 bg-gradient-to-r from-[#2E5077] to-[#4DA1A9] text-white rounded-lg hover:from-[#4DA1A9] hover:to-[#79D7BE] transition-all duration-300"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Now</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
