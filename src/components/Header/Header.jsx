import React, { useState, useEffect } from "react";
import { HashLink } from 'react-router-hash-link';
import { Menu, X, ChevronDown, Search, Phone, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    name: "Home",
    href: "#home"
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Services",
    href: "#services",
    submenu: [
      { name: "Dermatitis Treatment", href: "#skin-treatments" },
      { name: "Hyper Pigmentation", href: "#pigmentation" },
      { name: "Skin Rash Treatment", href: "#skin-rash" },
      { name: "PRP Hair Transplantation", href: "#prp" },
      { name: "Skin Polishing", href: "#polishing" },
      { name: "Skin Hydration", href: "#hydration" },
      { name: "Laser Hair Removal", href: "#laser" },
    ]
  },
  {
    name: "Doctors",
    href: "#doctors",
  },
  {
    name: "Testimonials",
    href: "#testimonials",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveSubmenu(null);
  };

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="hidden lg:block bg-[#2E5077] text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>123 Medical Plaza, Mumbai, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`w-full bg-white transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
        <div className="container mx-auto">
          <div className="flex items-center justify-between px-4 py-4">
            {/* Logo */}
            <HashLink smooth to="#home" className="flex items-center space-x-2">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#2E5077]">Waghade Skin Clinic</span>
                <span className="text-sm text-[#4DA1A9] font-bold">Your Skin, Our Care</span>
              </div>
            </HashLink>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <div key={item.name} className="relative group">
                  <HashLink
                    smooth
                    to={item.href}
                    scroll={scrollWithOffset}
                    className="flex items-center space-x-1 px-1 py-2 text-base font-medium text-[#2E5077] hover:text-[#79D7BE] transition-colors"
                  >
                    <span>{item.name}</span>
                    {item.submenu && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
                  </HashLink>

                  {item.submenu && (
                    <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {item.submenu.map((subitem) => (
                        <HashLink
                          key={subitem.name}
                          smooth
                          to={subitem.href}
                          scroll={scrollWithOffset}
                          className="block px-4 py-2.5 text-sm text-[#2E5077] hover:bg-[#F6F4F0] hover:text-[#4DA1A9] transition-colors"
                        >
                          {subitem.name}
                        </HashLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Section */}
            <div className="hidden lg:flex items-center space-x-6">
              <button className="text-[#2E5077] hover:text-[#79D7BE] transition-colors p-2 rounded-full hover:bg-gray-100">
                <Search className="w-5 h-5" />
              </button>
              <Link
                smooth
                to="/bookappointment"
                className="px-6 py-3 bg-[#2E5077] text-white font-medium rounded-lg hover:bg-[#4DA1A9] transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Book Appointment
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-[#2E5077] hover:text-[#79D7BE] p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed z-40 inset-0 bg-gray-800/50 backdrop-blur-sm transition-opacity lg:hidden ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={toggleMenu}
        >
          <div
            className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-[#2E5077]">Waghade Skin Clinic</span>
                <span className="text-sm text-[#4DA1A9]">Your Skin, Our Care</span>
              </div>
              <button
                onClick={toggleMenu}
                className="text-[#2E5077] hover:text-[#79D7BE] p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-4 py-6 space-y-6 overflow-y-auto max-h-[calc(100vh-5rem)]">
              {menuItems.map((item) => (
                <div key={item.name}>
                  <div
                    className="flex items-center justify-between text-[#2E5077] hover:text-[#79D7BE] cursor-pointer"
                    onClick={() => setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                  >
                    <HashLink
                      smooth
                      to={item.href}
                      scroll={scrollWithOffset}
                      className="text-base font-medium"
                      onClick={toggleMenu}
                    >
                      {item.name}
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
                    <div className="mt-2 ml-4 space-y-2">
                      {item.submenu.map((subitem) => (
                        <HashLink
                          key={subitem.name}
                          smooth
                          to={subitem.href}
                          scroll={scrollWithOffset}
                          className="block py-2 text-sm text-[#2E5077] hover:text-[#4DA1A9]"
                          onClick={toggleMenu}
                        >
                          {subitem.name}
                        </HashLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t p-4">
              <Link
                smooth
                to="/bookappointment"
                className="block w-full px-5 py-3 text-center font-medium text-white bg-[#2E5077] rounded-lg hover:bg-[#4DA1A9] transition-all duration-300"
                onClick={toggleMenu}
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}