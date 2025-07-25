import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaBus, FaMapMarkedAlt, FaBell, FaClock, 
  FaSearch, FaRegSmile, FaMobileAlt, 
  FaChartLine, FaHeart, FaRocket, FaUsers 
} from 'react-icons/fa';
import { GiAutoRepair, GiTicket } from 'react-icons/gi';
import { RiGovernmentLine, RiUserHeartLine } from 'react-icons/ri';
import { IoMdHappy } from 'react-icons/io';
import { BsGraphUp } from 'react-icons/bs';
import './AboutPage.css';

// Sample user images (replace with actual user photos)
const user1 = "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFwcHklMjBwZXJzb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60";
const user2 = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGFwcHklMjBwZXJzb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60";
const user3 = "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGFwcHklMjBwZXJzb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60";

const AboutPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const featureItems = [
    {
      icon: <FaSearch className="feature-icon" />,
      title: "Unified Search",
      description: "Search all bus types - government, private, Volvo, sleeper - in one platform"
    },
    {
      icon: <FaMapMarkedAlt className="feature-icon" />,
      title: "Real-time Tracking",
      description: "Track your bus in real-time with live location updates"
    },
    {
      icon: <FaBell className="feature-icon" />,
      title: "Smart Alarms",
      description: "Set alarms for your stops so you never miss your destination"
    },
    {
      icon: <FaClock className="feature-icon" />,
      title: "Time Saver",
      description: "No more switching between multiple apps - find everything in one place"
    }
  ];

  const futureFeatures = [
    {
      icon: <RiGovernmentLine className="feature-icon" />,
      title: "Government Bus Booking",
      description: "Book government buses directly if schemes become available"
    },
    {
      icon: <GiAutoRepair className="feature-icon" />,
      title: "Auto/Bike Integration",
      description: "Find auto-rickshaws and bikes for your route when buses aren't available"
    },
    {
      icon: <GiTicket className="feature-icon" />,
      title: "Digital Tickets",
      description: "Store all your tickets in one place with easy access"
    },
    {
      icon: <BsGraphUp className="feature-icon" />,
      title: "Price Trends",
      description: "See historical pricing to book at the best rates"
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "This app saved me hours of searching across different websites. Now I can plan my entire trip in minutes!",
      name: "Rahul Sharma",
      role: "Frequent Traveler",
      image: user1,
      rating: 5
    },
    {
      id: 2,
      quote: "The bus tracking feature is a game-changer. I never have to worry about missing my bus anymore.",
      name: "Priya Patel",
      role: "College Student",
      image: user2,
      rating: 5
    },
    {
      id: 3,
      quote: "As someone who travels weekly for work, this platform has reduced my stress levels significantly.",
      name: "Arjun Mehta",
      role: "Business Professional",
      image: user3,
      rating: 4
    }
  ];

  const happyStats = [
    { value: "10,000+", label: "Happy Users", icon: <IoMdHappy /> },
    { value: "500+", label: "Daily Bookings", icon: <FaHeart /> },
    { value: "95%", label: "Satisfaction Rate", icon: <RiUserHeartLine /> },
    { value: "4.8/5", label: "App Rating", icon: <FaRocket /> }
  ];

  return (
    <motion.div 
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section with Animated Bus */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Revolutionizing Bus Travel in India
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            One platform for all your bus travel needs - saving your time and hassle
          </motion.p>
          <motion.div 
            className="hero-bus-container"
            animate={{ 
              x: [0, 20, -20, 0],
              transition: { 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 8 
              } 
            }}
          >
            <FaBus className="hero-bus-icon" />
            <motion.div 
              className="bus-smoke"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 0.5, 0],
                transition: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeOut"
                }
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* User Happiness Poster */}
      <motion.section 
        className="happiness-poster"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="poster-content">
          <motion.div 
            className="happy-users-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.slice(0, 3).map((user, index) => (
              <motion.div 
                key={user.id}
                className="user-photo"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                style={{
                  backgroundImage: `url(${user.image})`,
                  zIndex: 3 - index
                }}
              />
            ))}
          </motion.div>
          <div className="poster-message">
            <h2>Join Thousands of Happy Travelers</h2>
            <p>Our users report saving an average of 2 hours per trip by using our platform</p>
            <motion.div 
              className="floating-icons"
              animate={{
                y: [0, -10, 0],
                transition: {
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }
              }}
            >
              <FaRegSmile className="icon-1" />
              <FaHeart className="icon-2" />
              <IoMdHappy className="icon-3" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Mission */}
      <section className="mission-section">
        <motion.div 
          className="mission-content"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={fadeIn}>Our Mission</motion.h2>
          <motion.p variants={fadeIn}>
            We're tired of jumping between multiple websites to find bus information. Our mission is to 
            <strong> simplify bus travel</strong> by providing a <strong>single platform</strong> that aggregates all bus services across 
            India, saving you time and reducing the hassle of planning your journeys.
          </motion.p>
          
          {/* Happy Stats */}
          <motion.div 
            className="happy-stats"
            variants={staggerContainer}
          >
            {happyStats.map((stat, index) => (
              <motion.div 
                key={index}
                className="stat-box"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Current Features */}
      <section className="features-section">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What We Offer Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Features designed to make your bus travel experience seamless
          </motion.p>
        </div>
        <div className="features-grid">
          {featureItems.map((item, index) => (
            <motion.div 
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="icon-container"
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                {item.icon}
              </motion.div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What Our Users Say
          </motion.h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="user-info">
                <div 
                  className="user-avatar"
                  style={{ backgroundImage: `url(${testimonial.image})` }}
                />
                <div className="user-details">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <FaHeart 
                    key={i} 
                    className={i < testimonial.rating ? "filled" : "empty"} 
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Future Vision */}
      <section className="future-section">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Future Vision
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We're constantly working to enhance your travel experience
          </motion.p>
        </div>
        <div className="features-grid future-grid">
          {futureFeatures.map((item, index) => (
            <motion.div 
              key={index}
              className="feature-card future-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="icon-container"
                whileHover={{ rotate: -15, scale: 1.1 }}
              >
                {item.icon}
              </motion.div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="closing-message"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <FaRegSmile className="smile-icon" />
          <p>We're listening! Your feedback helps us build features you actually want.</p>
        </motion.div>
      </section>

      {/* Call to Action */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            transition: { repeat: Infinity, duration: 3 }
          }}
        >
          <h2>Ready to Simplify Your Bus Travel?</h2>
          <p>Join thousands of happy travelers today</p>
          <button className="cta-button">
            <motion.span
              animate={{
                x: [0, 5, -5, 0],
                transition: { repeat: Infinity, duration: 2 }
              }}
            >
              Start Searching Now
            </motion.span>
          </button>
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default AboutPage;