import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaBus, FaInfoCircle, FaPhoneAlt, FaLightbulb, FaChevronDown } from "react-icons/fa";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

function Header() {
  const [themeColor, setThemeColor] = useState("#3A86FF");
  const [scrolled, setScrolled] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const { scrollY } = useScroll();

  // Hide/show header on scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 10);
  });

  // Smooth color transition effect
  useEffect(() => {
    const colors = [
      "#3A86FF", // Blue
      "#8338EC", // Purple
      "#FF006E", // Pink
      "#FFBE0B", // Yellow
      "#FB5607", // Orange
      "#2EC4B6", // Teal
    ];
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % colors.length;
      setThemeColor(colors[currentIndex]);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { path: "/", name: "Home", icon: <FaHome /> },
    { path: "/LocalBus", name: "Local Bus", icon: <FaBus /> },
    { path: "/about", name: "About", icon: <FaInfoCircle /> },
    { path: "/contact", name: "Contact", icon: <FaPhoneAlt /> },
    { path: "/FutureFeatures", name: "Future Features", icon: <FaLightbulb /> },
  ];

  // Close mobile menu when a link is clicked
  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Spacer for fixed header */}
      <div 
        className="h-24" 
        style={{ 
          marginBottom: hidden ? '0' : '1em',
          transition: 'margin-bottom 0.3s ease-in-out' 
        }}
      />
      
      <motion.header
        ref={headerRef}
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled ? "py-2 bg-gray-900/95 shadow-2xl" : "py-4 bg-gray-900/90 backdrop-blur-md"
        }`}
        initial={{ y: 0 }}
        animate={{ 
          y: hidden ? -100 : 0,
          transition: { 
            type: "spring", 
            damping: 20, 
            stiffness: 300,
            mass: 0.5
          }
        }}
        style={{ 
          top: 0, 
          left: 0,
          borderBottom: scrolled ? `1px solid ${themeColor}20` : 'none'
        }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            {/* Logo with enhanced animation */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
              animate={{ opacity: 1 }}
            >
              <Link to="/" className="flex items-center">
                <motion.div
                  animate={{
                    color: themeColor,
                    rotate: [0, 5, -5, 0],
                    transition: { 
                      color: { 
                        duration: 2,
                        ease: "easeInOut"
                      },
                      rotate: { 
                        duration: 1.5, 
                        repeat: Infinity, 
                        repeatDelay: 8 
                      }
                    }
                  }}
                  className="text-4xl mr-3"
                >
                  <FaBus />
                </motion.div>
                <motion.span
                  className="text-2xl font-bold bg-clip-text text-transparent"
                  animate={{
                    backgroundImage: `linear-gradient(45deg, ${themeColor}, ${themeColor}99, ${themeColor})`,
                    transition: { 
                      duration: 2,
                      ease: "easeInOut"
                    }
                  }}
                  whileHover={{
                    scale: 1.05,
                    textShadow: `0 0 15px ${themeColor}80`
                  }}
                >
                  ChloBus
                </motion.span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 300
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 rounded-lg transition-all ${
                        isActive 
                          ? `text-white font-semibold`
                          : "text-gray-300 hover:text-white"
                      }`
                    }
                    style={({ isActive }) => ({
                      background: isActive ? `${themeColor}20` : 'transparent',
                      border: isActive ? `1px solid ${themeColor}40` : '1px solid transparent'
                    })}
                  >
                    {({ isActive }) => (
                      <>
                        <motion.span
                          className="mr-2 text-lg"
                          animate={{ 
                            color: isActive ? themeColor : "#D1D5DB",
                            scale: isActive ? 1.2 : 1,
                            transition: { type: "spring", stiffness: 400 }
                          }}
                        >
                          {link.icon}
                        </motion.span>
                        <motion.span
                          animate={{
                            color: isActive ? themeColor : "#D1D5DB",
                            fontWeight: isActive ? "semibold" : "normal"
                          }}
                        >
                          {link.name}
                        </motion.span>
                        {isActive && (
                          <motion.span
                            className="ml-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <FaChevronDown className="text-xs" />
                          </motion.span>
                        )}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                color: themeColor,
                backgroundColor: `${themeColor}20`,
                border: `1px solid ${themeColor}40`
              }}
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>

            {/* Color Picker */}
            <motion.div 
              className="relative hidden md:block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="p-3 rounded-full focus:outline-none transition-all"
                style={{ 
                  backgroundColor: `${themeColor}20`,
                  color: themeColor,
                  border: `1px solid ${themeColor}40`,
                  boxShadow: `0 0 15px ${themeColor}40`
                }}
                aria-label="Change theme color"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {showColorPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 p-4 bg-gray-800 rounded-xl shadow-2xl z-50 border border-gray-700"
                    style={{
                      backdropFilter: 'blur(10px)',
                      backgroundColor: 'rgba(31, 41, 55, 0.95)'
                    }}
                  >
                    <h3 className="text-white mb-3 text-center font-semibold text-lg">
                      Choose Theme Color
                    </h3>
                    <div className="grid grid-cols-5 gap-3">
                      {[
                        "#3A86FF", "#8338EC", "#FF006E", "#FFBE0B", "#FB5607",
                        "#2EC4B6", "#F72585", "#4CC9F0", "#7209B7", "#4361EE"
                      ].map((color) => (
                        <motion.button
                          key={color}
                          whileHover={{ 
                            scale: 1.15, 
                            boxShadow: `0 0 0 3px ${color}80`
                          }}
                          whileTap={{ scale: 0.9 }}
                          className="h-10 w-10 rounded-full focus:outline-none transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            setThemeColor(color);
                            setShowColorPicker(false);
                          }}
                          aria-label={`Select ${color} as theme color`}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: 1,
                  height: 'auto',
                  transition: {
                    opacity: { duration: 0.2 },
                    height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }
                  }
                }}
                exit={{ 
                  opacity: 0,
                  height: 0,
                  transition: {
                    opacity: { duration: 0.15 },
                    height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }
                  }
                }}
                className="md:hidden overflow-hidden"
              >
                <div className="pt-4 pb-6 space-y-2">
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.path}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ 
                        x: 0,
                        opacity: 1,
                        transition: { 
                          type: "spring",
                          stiffness: 300,
                          damping: 24
                        }
                      }}
                      exit={{ x: 20, opacity: 0 }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={handleNavLinkClick}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-3 rounded-lg transition-all w-full ${
                            isActive 
                              ? `text-white font-semibold`
                              : "text-gray-300 hover:text-white"
                          }`
                        }
                        style={({ isActive }) => ({
                          background: isActive ? `${themeColor}20` : 'transparent',
                          border: isActive ? `1px solid ${themeColor}40` : '1px solid transparent'
                        })}
                      >
                        <span className="mr-3 text-lg" style={{ color: themeColor }}>
                          {link.icon}
                        </span>
                        <span>{link.name}</span>
                      </NavLink>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Color Picker */}
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ 
                      x: 0,
                      opacity: 1,
                      transition: { 
                        delay: 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 24
                      }
                    }}
                    className="px-4 py-3"
                  >
                    <h4 className="text-gray-300 mb-2 text-sm font-medium">
                      Theme Color
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "#3A86FF", "#8338EC", "#FF006E", "#FFBE0B", "#FB5607",
                        "#2EC4B6"
                      ].map((color) => (
                        <motion.button
                          key={color}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="h-8 w-8 rounded-full focus:outline-none"
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            setThemeColor(color);
                            setShowColorPicker(false);
                          }}
                          aria-label={`Select ${color} as theme color`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}

export default Header;