import React, { useEffect } from 'react';
import './FutureFeatures.css';

const FutureTransportFeatures = () => {
    useEffect(() => {
        // Create animated particles
        const particlesContainer = document.getElementById('transport-particles');
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('transport-particle');

            // Random size between 5px and 20px
            const size = Math.random() * 15 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Random position
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.bottom = `-${size}px`;

            // Random animation duration
            const duration = Math.random() * 10 + 10;
            particle.style.animationDuration = `${duration}s`;

            // Random delay
            particle.style.animationDelay = `${Math.random() * 10}s`;

            particlesContainer.appendChild(particle);
        }

        // RGB color cycling for elements
        let hue = 0;

        function cycleColors() {
            hue = (hue + 1) % 360;
            const primary = `hsl(${hue}, 100%, 50%)`;
            const secondary = `hsl(${(hue + 120) % 360}, 100%, 50%)`;
            const accent = `hsl(${(hue + 240) % 360}, 100%, 50%)`;

            document.documentElement.style.setProperty('--primary', primary);
            document.documentElement.style.setProperty('--secondary', secondary);
            document.documentElement.style.setProperty('--accent', accent);

            requestAnimationFrame(cycleColors);
        }

        // Start color cycling
        cycleColors();

        // Add scroll animations
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.transport-feature-card, .transport-timeline-item');
            elements.forEach(el => {
                const elementPosition = el.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;

                if (elementPosition < screenPosition) {
                    el.classList.add('transport-animated');
                }
            });
        };

        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Run once on load

        return () => {
            window.removeEventListener('scroll', animateOnScroll);
            while (particlesContainer.firstChild) {
                particlesContainer.removeChild(particlesContainer.firstChild);
            }
        };
    }, []);
    const transportFeatures = [
        {
            icon: "🚌",
            title: "Enhanced Real-Time Bus Tracking",
            description: "Next-gen tracking with 99.9% accuracy, predictive arrival times, and live crowd monitoring. Now with 2x faster updates and low-data mode for rural areas.",
            animation: "fadeInUp",
            outcome: "Reduces wait times by 50% with precise ETAs and route optimization"
        },
        {
            icon: "📴",
            title: "Offline Bus Search & Booking",
            description: "Find bus routes, schedules and book tickets without internet. Automatic sync when connection returns. Essential for remote areas with spotty coverage.",
            animation: "fadeInUp",
            outcome: "Enables 100% booking availability regardless of network conditions"
        },
        {
            icon: "👩‍🎓",
            title: "Women's Exam Special Buses",
            description: "Exclusive booking for women traveling to government exams. Verified female drivers, group booking options, and direct driver communication for safety.",
            animation: "fadeInUp",
            outcome: "Makes exam travel 70% safer and less stressful for women candidates"
        },
        {
            icon: "🛡️",
            title: "Women's Safety Shield",
            description: "Live tracking shared with trusted contacts, emergency SOS button, real-time alerts, and verified female-only transport options with direct driver messaging.",
            animation: "fadeInUp",
            outcome: "Reduces safety concerns by 65% for women travelers"
        },
        {
            icon: "🛵",
            title: "Multi-Vehicle Booking",
            description: "Book buses, bikes, autos - all from one platform. Seamless integration with government booking schemes when available.",
            animation: "fadeInUp",
            outcome: "30% increase in bookings by providing all options in one place"
        },
        {
            icon: "📍",
            title: "Local Bus Integration",
            description: "When local buses implement GPS tracking, monitor their exact locations in real-time through our unified platform.",
            animation: "fadeInUp",
            outcome: "Will cover 100% of public transport options in supported cities"
        },
        {
            icon: "🤖",
            title: "AI Travel Assistant",
            description: "Smart chatbot suggests safest routes for women, predicts delays, and answers all transport questions instantly.",
            animation: "fadeInUp",
            outcome: "Reduces planning time by 70% with intelligent recommendations"
        },
        {
            icon: "💳",
            title: "Unified Payment System",
            description: "Single wallet for all transport with digital tickets, subscriptions, and cashless options. Special discounts for women travelers.",
            animation: "fadeInUp",
            outcome: "99.9% payment success rate with faster transactions"
        }
    ];

    const transportTimeline = [
        {
            date: "Q4 2024",
            content: "Real-time GPS tracking for government buses goes live",
            outcome: "Expected to serve 1M+ daily commuters in phase 1 cities"
        },
        {
            date: "Q1 2025",
            title: "Auto and Bike Booking",
            content: "Integration of auto-rickshaw and bike taxis as policies allow",
            outcome: "Projected 500K+ new users from expanded vehicle options"
        },
        {
            date: "Q2 2025",
            content: "AI travel assistant beta launch with smart routing",
            outcome: "Anticipated 40% reduction in customer support queries"
        },
        {
            date: "Q3 2025",
            content: "Municipal bus tracking integration begins",
            outcome: "Will complete full public transport coverage in 5 major cities"
        },
        {
            date: "Q4 2025",
            content: "Complete transport ecosystem fully operational",
            outcome: "Projected to be the #1 transport app with 10M+ active users"
        }
    ];

    const benefits = [
        {
            icon: "⏱️",
            title: "Time Saved",
            value: "30-45 minutes",
            description: "Daily time saved per user through optimized routes and reduced waiting"
        },
        {
            icon: "💰",
            title: "Cost Reduction",
            value: "Up to 25%",
            description: "Savings on transport costs through smart planning and deals"
        },
        {
            icon: "🌱",
            title: "Carbon Footprint",
            value: "15% lower",
            description: "Reduced emissions from optimized routes and increased public transport use"
        }
    ];

    return (
        <div className="future-transport-page">
            <div className="transport-background-animation" id="transport-particles"></div>

            <header className="transport-header">
                <h1 className="transport-heading">The Future of Urban Mobility</h1>
                <p className="transport-subtitle">Transforming how cities move with integrated, intelligent transport solutions</p>
                <div className="transport-scroll-hint">
                    <span>Explore what's coming</span>
                    <div className="transport-scroll-arrow"></div>
                </div>
            </header>

            <div className="transport-features-container">
                {transportFeatures.map((feature, index) => (
                    <div
                        className={`transport-feature-card ${feature.animation}`}
                        key={index}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="transport-feature-icon">{feature.icon}</div>
                        <h3 className="transport-feature-title">{feature.title}</h3>
                        <p className="transport-feature-desc">{feature.description}</p>
                        <div className="transport-feature-outcome">
                            <strong>Expected Outcome:</strong> {feature.outcome}
                        </div>
                    </div>
                ))}
            </div>

            <div className="transport-timeline-section">
                <h2 className="transport-section-title">Our Development Roadmap</h2>
                <div className="transport-timeline">
                {transportTimeline.map((item, index) => (
  <div 
    className={`transport-timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
    key={index}
  >
                            <div className="transport-timeline-date">{item.date}</div>
                            <div className="transport-timeline-content">
                                <h4>{item.title || item.content.split(' ')[0]}</h4>
                                <p>{item.content}</p>
                                <div className="transport-timeline-outcome">
                                    <strong>Impact:</strong> {item.outcome}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="transport-benefits">
                <h2 className="transport-section-title">Expected Outcomes</h2>
                <div className="transport-benefits-grid">
                    {benefits.map((benefit, index) => (
                        <div
                            className="transport-benefit-card zoomIn"
                            key={index}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="transport-benefit-icon">{benefit.icon}</div>
                            <h3 className="transport-benefit-title">{benefit.title}</h3>
                            <div className="transport-benefit-value">{benefit.value}</div>
                            <p className="transport-benefit-desc">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="transport-footer">
                <h2 className="transport-cta-title">Be Part of the Mobility Revolution</h2>
                <p className="transport-cta-text">Join our early access program to shape the future of urban transport</p>
                <div className="transport-cta-buttons">
                    <a href="#" className="transport-cta-button">Join Beta Program</a>
                    <a href="#" className="transport-cta-button secondary">Request Demo</a>
                </div>
                <div className="transport-footer-note">
                    Projected to serve 10M+ users across 20 cities by 2026
                </div>
            </footer>
        </div>
    );
};

export default FutureTransportFeatures;