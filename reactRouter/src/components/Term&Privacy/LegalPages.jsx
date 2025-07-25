import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LegalPages.css';

const LegalPages = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);

  // Slideshow content
  const slides = [
    {
      title: "Your Safety is Our Priority",
      content: "Comprehensive safety measures for all passengers",
      image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Transparent Pricing",
      content: "No hidden fees, just honest pricing",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "from-green-500 to-green-700"
    },
    {
      title: "24/7 Customer Support",
      content: "We're always here to help you",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      color: "from-purple-500 to-purple-700"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Auto-rotate slides
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="legal-pages-container">
      {/* Animated background elements */}
      <div className="legal-background-elements">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="legal-bg-element"
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              scale: Math.random() * 0.3 + 0.7,
              opacity: 0.1
            }}
            animate={{
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
              transition: {
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }
            }}
          />
        ))}
      </div>

      {/* Hero Slideshow */}
      <motion.div 
        className="hero-slideshow relative rounded-2xl overflow-hidden shadow-xl mb-12 h-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            className={`absolute inset-0 bg-gradient-to-br ${slides[activeSlide].color} flex items-center justify-center`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative z-10 px-8 text-center text-white">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold mb-4"
              >
                {slides[activeSlide].title}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl max-w-2xl mx-auto"
              >
                {slides[activeSlide].content}
              </motion.p>
            </div>
            <img 
              src={slides[activeSlide].image} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Slideshow controls */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${activeSlide === index ? 'bg-white w-6' : 'bg-white bg-opacity-50'}`}
            />
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="legal-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Legal Information</h1>
        <div className="legal-header-decoration"></div>
      </motion.div>

      <div className="legal-content-wrapper">
        {/* Terms & Conditions Section */}
        <motion.section 
          className="legal-section terms-section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Terms & Conditions
          </motion.h2>
          
          <motion.div 
            className="legal-content"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              {
                title: "1. Acceptance of Terms",
                content: "By accessing and using our travel services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.",
                expanded: "This agreement constitutes a legally binding contract between you and our company. Continued use of our services after any modifications to these terms will constitute your acceptance of such changes."
              },
              {
                title: "2. Booking and Payments",
                content: (
                  <ul>
                    <li>All bus bookings are subject to availability</li>
                    <li>Prices are subject to change without notice</li>
                    <li>Full payment is required at the time of booking</li>
                    <li>We accept major credit cards and digital payment methods</li>
                  </ul>
                ),
                expanded: "For international payments, a small currency conversion fee may apply. All transactions are processed securely through our PCI-compliant payment gateway. You will receive an electronic receipt for all payments made."
              },
              {
                title: "3. Cancellation Policy",
                content: "Cancellations made 48 hours before departure will receive a full refund. Cancellations made within 48 hours will be subject to a 50% cancellation fee. No refunds for no-shows.",
                expanded: "To request a cancellation, please contact our customer service team with your booking reference number. Refunds will be processed within 7-10 business days and credited to the original payment method. Special events and holidays may have different cancellation policies which will be clearly stated at the time of booking."
              },
              {
                title: "4. Travel Requirements",
                content: (
                  <ul>
                    <li>Passengers must arrive at least 30 minutes before departure</li>
                    <li>Valid government-issued ID is required for all travelers</li>
                    <li>Children under 12 must be accompanied by an adult</li>
                    <li>Baggage allowance is limited to one suitcase and one carry-on per passenger</li>
                  </ul>
                ),
                expanded: "For international travel, passengers are responsible for ensuring they have all required travel documents including visas and health certificates. We reserve the right to refuse service to any passenger who fails to meet these requirements without refund. Special accommodations for passengers with disabilities must be requested at least 72 hours before travel."
              },
              {
                title: "5. Limitation of Liability",
                content: "Our company is not liable for any delays, cancellations, or inconveniences caused by weather conditions, road closures, mechanical issues, or other unforeseen circumstances beyond our control.",
                expanded: "In no event shall our liability exceed the amount paid for the ticket. We are not responsible for any indirect, incidental, special or consequential damages arising from your use of our services. This limitation of liability applies to the fullest extent permitted by law in your jurisdiction."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className={`legal-card ${expandedCard === index ? 'expanded' : ''}`}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                onClick={() => setExpandedCard(expandedCard === index ? null : index)}
              >
                <h3>{item.title}</h3>
                <div className="summary-content">
                  {item.content}
                </div>
                <AnimatePresence>
                  {expandedCard === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="expanded-content"
                    >
                      <div className="expanded-inner">
                        {typeof item.expanded === 'string' ? <p>{item.expanded}</p> : item.expanded}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div 
                  className="expand-indicator"
                  animate={{ rotate: expandedCard === index ? 180 : 0 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Privacy Policy Section */}
        <motion.section 
          className="legal-section privacy-section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Privacy Policy
          </motion.h2>
          
          <motion.div 
            className="legal-content"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              {
                title: "1. Information We Collect",
                content: "We collect personal information when you make a booking, including your name, contact details, payment information, and travel preferences. We may also collect usage data through cookies.",
                expanded: "The types of personal information we collect include: full name, email address, phone number, billing address, payment details (processed securely), travel itinerary preferences, IP address, device information, and browsing behavior on our website. We collect this information to provide and improve our services."
              },
              {
                title: "2. How We Use Your Information",
                content: (
                  <ul>
                    <li>To process your bookings and payments</li>
                    <li>To communicate with you about your travel plans</li>
                    <li>To improve our services and website experience</li>
                    <li>To send promotional offers (with your consent)</li>
                    <li>To comply with legal requirements</li>
                  </ul>
                ),
                expanded: "We may use your information for: customer service communications, fraud prevention, marketing analysis, service improvement, personalized recommendations, dispute resolution, and legal compliance. We will never sell your personal data to third parties. Marketing communications will only be sent with your explicit consent and you can opt-out at any time."
              },
              {
                title: "3. Data Security",
                content: "We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted using SSL technology.",
                expanded: "Our security measures include: encryption of sensitive data, regular security audits, access controls, employee training on data protection, and secure data storage. While we implement robust security measures, no system can be 100% secure, so we cannot guarantee absolute security of your information transmitted to our site."
              },
              {
                title: "4. Third-Party Sharing",
                content: "We may share your information with bus operators, payment processors, and service providers necessary to fulfill your booking. We do not sell your personal data to third parties.",
                expanded: "We only share information with third parties when necessary for service delivery, including: transportation providers, payment processors, IT service providers, and legal authorities when required by law. All third parties are contractually obligated to protect your data and use it only for the purposes we specify."
              },
              {
                title: "5. Your Rights",
                content: (
                  <ul>
                    <li>Right to access and correct your personal information</li>
                    <li>Right to request deletion of your data</li>
                    <li>Right to opt-out of marketing communications</li>
                    <li>Right to lodge a complaint with data protection authorities</li>
                  </ul>
                ),
                expanded: "Depending on your jurisdiction, you may have additional rights including: right to data portability, right to restrict processing, right to object to processing, and rights related to automated decision making. To exercise any of these rights, please contact our Data Protection Officer at privacy@travelbusindia.com. We may need to verify your identity before processing certain requests."
              },
              {
                title: "6. Cookies and Tracking",
                content: "Our website uses cookies to enhance user experience. You can disable cookies in your browser settings, but this may affect website functionality.",
                expanded: "We use several types of cookies: essential (necessary for site functionality), performance (help us understand how visitors use our site), functional (remember your preferences), and targeting (used for advertising). You can manage cookie preferences through your browser settings or our cookie consent tool. Some third-party services (like Google Analytics) may also set cookies when you use our site."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className={`legal-card ${expandedCard === index + 5 ? 'expanded' : ''}`}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                onClick={() => setExpandedCard(expandedCard === index + 5 ? null : index + 5)}
              >
                <h3>{item.title}</h3>
                <div className="summary-content">
                  {item.content}
                </div>
                <AnimatePresence>
                  {expandedCard === index + 5 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="expanded-content"
                    >
                      <div className="expanded-inner">
                        {typeof item.expanded === 'string' ? <p>{item.expanded}</p> : item.expanded}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div 
                  className="expand-indicator"
                  animate={{ rotate: expandedCard === index + 5 ? 180 : 0 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* FAQ Accordion Section */}
        <motion.section 
          className="legal-section faq-section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.div 
            className="legal-content"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              {
                question: "How do I change or cancel my booking?",
                answer: "You can change or cancel your booking through our website or mobile app by accessing your account. Alternatively, you can contact our customer service team. Please note that changes and cancellations are subject to our terms and conditions."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit and debit cards (Visa, MasterCard, American Express), digital wallets (Paytm, Google Pay, PhonePe), UPI payments, and net banking. We do not currently accept cash payments for online bookings."
              },
              {
                question: "How early should I arrive before departure?",
                answer: "We recommend arriving at least 30 minutes before scheduled departure for domestic routes and 45 minutes for international routes. This allows time for check-in procedures and boarding. Late arrivals may result in forfeiture of your seat without refund."
              },
              {
                question: "Is there Wi-Fi on your buses?",
                answer: "Most of our premium buses are equipped with free Wi-Fi. However, connectivity may vary depending on the route and network coverage. We cannot guarantee uninterrupted service throughout your journey."
              },
              {
                question: "What is your luggage policy?",
                answer: "Each passenger is allowed one suitcase (max 20kg) and one small carry-on bag. Additional luggage may be subject to fees. Certain items like hazardous materials, weapons, and perishable goods are prohibited. Please check our full luggage policy for details."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className={`legal-card faq-card ${expandedCard === index + 11 ? 'expanded' : ''}`}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                onClick={() => setExpandedCard(expandedCard === index + 11 ? null : index + 11)}
              >
                <h3>{item.question}</h3>
                <AnimatePresence>
                  {expandedCard === index + 11 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="expanded-content"
                    >
                      <div className="expanded-inner">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div 
                  className="expand-indicator"
                  animate={{ rotate: expandedCard === index + 11 ? 180 : 0 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Contact Information */}
        <motion.section 
          className="legal-contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3>Contact Us</h3>
            <p>If you have any questions about our Terms & Conditions or Privacy Policy, please contact us at:</p>
          </motion.div>
          <motion.div 
            className="contact-details"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="contact-method">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <p><strong>Email:</strong> legal@travelbusindia.com</p>
            </div>
            <div className="contact-method">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
              </div>
              <p><strong>Phone:</strong> +91 12345 67890</p>
            </div>
            <div className="contact-method">
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <p><strong>Address:</strong> 123 Travel Plaza, New Delhi, India - 110001</p>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default LegalPages;