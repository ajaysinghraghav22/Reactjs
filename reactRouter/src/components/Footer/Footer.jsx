import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBus, FaGithub, FaDiscord, FaMapMarkerAlt, FaClock, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import "./Footer.css";

export default function Footer() {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  };

  return (
    <footer className="footer-container">
      {/* Animated background elements */}
      <div className="footer-bg-elements">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="bus-icon-bg"
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.7, 0.3],
              transition: {
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            <FaBus />
          </motion.div>
        ))}
      </div>

      <div className="footer-content">
        <motion.div
          className="footer-main"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={footerVariants}
        >
          <div className="footer-brand">
            <Link to="/" className="flex items-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaBus className="logo-icon" />
              </motion.div>
              <span className="logo-text">ChloBus</span>
            </Link>
            <p className="brand-tagline">
              Your one-stop solution for all bus travel needs across India
            </p>
            <div className="social-links">
              <motion.a
                href="https://github.com/hiteshchoudhary"
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3 }}
                className="social-link"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="social-link"
              >
                <FaDiscord />
              </motion.a>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="footer-links-group">
              <h3 className="links-heading">Quick Links</h3>
              <ul>
                {[
                  { name: "Home", path: "/" },
                  { name: "About", path: "/about" }
                ].map((link, i) => (
                  <motion.li
                    key={link.name}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={listItemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <Link to={link.path}>{link.name}</Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="footer-links-group">
              <h3 className="links-heading">Legal</h3>
              <ul>
                {[
                  { name: "Privacy Policy", path: "#" },
                  { name: "Terms & Conditions", path: "#" }
                ].map((link, i) => (
                  <motion.li
                    key={link.name}
                    custom={i + 2}
                    initial="hidden"
                    animate="visible"
                    variants={listItemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <Link to={link.path}>{link.name}</Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="footer-links-group">
              <h3 className="links-heading">Contact Us</h3>
              <ul className="contact-info">
                <motion.li
                  whileHover={{ x: 5 }}
                >
                  <FaPhoneAlt /> +91 9876543210
                </motion.li>
                <motion.li
                  whileHover={{ x: 5 }}
                >
                  <FaEnvelope /> support@busexpress.com
                </motion.li>
                <motion.li
                  whileHover={{ x: 5 }}
                >
                  <RiCustomerService2Fill /> 24/7 Customer Support
                </motion.li>
              </ul>
            </div>
          </div>
        </motion.div>

        <div className="footer-bottom">
          <motion.div
            className="bus-animation-track"
            animate={{
              x: ["-100%", "100%"],
              transition: {
                duration: 15,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear"
              }
            }}
          >
            <FaBus className="moving-bus" />
          </motion.div>

          <div className="copyright">
            © {new Date().getFullYear()} BusExpress. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}