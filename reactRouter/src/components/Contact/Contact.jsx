import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [visitorCount, setVisitorCount] = useState(0);
    const [floatingShapes, setFloatingShapes] = useState([]);
    const [messages, setMessages] = useState([]);
    const [activeTab, setActiveTab] = useState('form');
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0
    });

    // Fetch data from backend
    const fetchData = async () => {
        try {
            setLoading(true);
            
            // Fetch stats
            const statsRes = await fetch('http://localhost:5000/api/stats');
            const statsData = await statsRes.json();
            setVisitorCount(statsData.visitorCount);
            
            // Fetch messages
            const messagesRes = await fetch(
                `http://localhost:5000/api/messages?limit=${pagination.limit}&page=${pagination.page}`
            );
            const messagesData = await messagesRes.json();
            setMessages(messagesData.messages);
            setPagination(prev => ({
                ...prev,
                total: messagesData.total
            }));
            
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    // Initialize data
    useEffect(() => {
        // Create floating background shapes
        const shapes = [];
        const colors = ['from-pink-400', 'from-purple-400', 'from-blue-400', 'from-green-400', 'from-yellow-400'];
        for (let i = 0; i < 15; i++) {
            shapes.push({
                id: i,
                color: colors[i % colors.length],
                size: Math.random() * 100 + 50,
                x: Math.random() * 100,
                y: Math.random() * 100,
                duration: Math.random() * 15 + 10,
                delay: Math.random() * 5
            });
        }
        setFloatingShapes(shapes);
        
        fetchData();
    }, [pagination.page]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const messageData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message')
        };

        try {
            const response = await fetch('http://localhost:5000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });

            if (response.ok) {
                setSubmitted(true);
                e.target.reset();
                fetchData(); // Refresh data
                setTimeout(() => setSubmitted(false), 5000);
            }
        } catch (err) {
            console.error('Error submitting form:', err);
        } finally {
            setLoading(false);
        }
    };

    // Calculate active users today (messages sent today)
    const activeToday = messages.filter(message => {
        const today = new Date();
        const messageDate = new Date(message.date);
        return messageDate.toDateString() === today.toDateString();
    }).length;

    const handleLoadMore = () => {
        setPagination(prev => ({
            ...prev,
            page: prev.page + 1,
            limit: prev.limit + 10
        }));
    };

    return (
        <div className="relative min-h-screen bg-gray-50 overflow-hidden">
            {/* Floating animated background */}
            <div className="absolute inset-0 overflow-hidden z-0">
                {floatingShapes.map(shape => (
                    <motion.div
                        key={shape.id}
                        className={`absolute rounded-full bg-gradient-to-br ${shape.color} to-transparent opacity-20`}
                        style={{
                            width: `${shape.size}px`,
                            height: `${shape.size}px`,
                            left: `${shape.x}%`,
                            top: `${shape.y}%`,
                        }}
                        animate={{
                            x: [0, 50, 0, -30, 0],
                            y: [0, 30, 50, 20, 0],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: shape.duration,
                            delay: shape.delay,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Navigation Tabs */}
            <div className="relative z-10 pt-8 flex justify-center">
                <div className="flex bg-white rounded-full shadow-lg p-1">
                    <button
                        onClick={() => setActiveTab('form')}
                        className={`px-6 py-2 rounded-full transition-all ${activeTab === 'form' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-gray-800'}`}
                    >
                        Contact Form
                    </button>
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`px-6 py-2 rounded-full transition-all ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-gray-800'}`}
                    >
                        User Dashboard
                    </button>
                </div>
            </div>

            {/* Visitor counter badge */}
            <div className="absolute top-4 right-4 z-20">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center bg-white shadow-lg rounded-full px-4 py-2"
                >
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">
                        {visitorCount.toLocaleString()} active users
                    </span>
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <AnimatePresence mode="wait">
                    {activeTab === 'form' ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="mt-8 overflow-hidden rounded-2xl shadow-2xl border border-gray-200 bg-white bg-opacity-90 backdrop-blur-md"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                {/* Contact Info */}
                                <div className="p-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-l-lg">
                                    <motion.h1
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-3xl md:text-4xl font-bold mb-2"
                                    >
                                        Let's Connect
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-lg opacity-90 mb-8"
                                    >
                                        We'd love to hear from you! Send us a message and we'll respond as soon as possible.
                                    </motion.p>

                                    <div className="space-y-6">
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="flex items-start"
                                        >
                                            <div className="flex-shrink-0 p-2 bg-white bg-opacity-20 rounded-lg">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-semibold">Our Location</h3>
                                                <p className="mt-1 opacity-90">DLF, Gurugram, Haryana 122104</p>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="flex items-start"
                                        >
                                            <div className="flex-shrink-0 p-2 bg-white bg-opacity-20 rounded-lg">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h2a1 1 0 011 1v2a1 1 0 01-1 1H5v11a2 2 0 002 2h10a2 2 0 002-2V7h-2a1 1 0 01-1-1V4a1 1 0 011-1h2a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-semibold">Phone Number</h3>
                                                <p className="mt-1 opacity-90">+91 8689xxxxxx</p>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6 }}
                                            className="flex items-start"
                                        >
                                            <div className="flex-shrink-0 p-2 bg-white bg-opacity-20 rounded-lg">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-semibold">Email Address</h3>
                                                <p className="mt-1 opacity-90">info@acme.org</p>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Contact Form */}
                                <div className="p-8 bg-white rounded-r-lg relative">
                                    <AnimatePresence>
                                        {submitted && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="absolute inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center z-10 rounded-r-lg"
                                            >
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.1, 1],
                                                        rotate: [0, 5, -5, 0]
                                                    }}
                                                    transition={{
                                                        duration: 0.6,
                                                        ease: "easeInOut"
                                                    }}
                                                >
                                                    <svg className="w-24 h-24 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </motion.div>
                                                <motion.h3
                                                    initial={{ y: 20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.2 }}
                                                    className="mt-6 text-2xl font-bold text-gray-800"
                                                >
                                                    Message Sent!
                                                </motion.h3>
                                                <motion.p
                                                    initial={{ y: 20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.3 }}
                                                    className="mt-2 text-gray-600 text-center max-w-xs"
                                                >
                                                    Thank you for reaching out. We'll get back to you within 24 hours.
                                                </motion.p>
                                                <motion.button
                                                    initial={{ y: 20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.4 }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setSubmitted(false)}
                                                    className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium"
                                                >
                                                    Send Another Message
                                                </motion.button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <form onSubmit={handleSubmit}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="mb-6"
                                        >
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Send us a message</h2>
                                            <p className="mt-2 text-gray-600">We're here to help and answer any questions</p>
                                        </motion.div>

                                        <div className="space-y-4">
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="John Doe"
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                            >
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="your@email.com"
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                            >
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="+91 1234567890"
                                                />
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.6 }}
                                            >
                                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    rows="4"
                                                    required
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="How can we help you?"
                                                ></textarea>
                                            </motion.div>

                                            <motion.button
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.7 }}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                disabled={loading}
                                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {loading ? 'Sending...' : 'Send Message'}
                                            </motion.button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="mt-8 overflow-hidden rounded-2xl shadow-2xl border border-gray-200 bg-white bg-opacity-90 backdrop-blur-md"
                        >
                            <div className="p-6 md:p-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">User Engagement Dashboard</h2>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 sm:p-6 rounded-xl shadow-md"
                                    >
                                        <h3 className="text-sm font-medium">Total Users</h3>
                                        <p className="text-2xl sm:text-3xl font-bold mt-1">{visitorCount.toLocaleString()}</p>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 sm:p-6 rounded-xl shadow-md"
                                    >
                                        <h3 className="text-sm font-medium">Messages Received</h3>
                                        <p className="text-2xl sm:text-3xl font-bold mt-1">{pagination.total.toLocaleString()}</p>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 sm:p-6 rounded-xl shadow-md"
                                    >
                                        <h3 className="text-sm font-medium">Active Today</h3>
                                        <p className="text-2xl sm:text-3xl font-bold mt-1">{activeToday.toLocaleString()}</p>
                                    </motion.div>
                                </div>

                                {/* Messages List */}
                                <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg sm:text-xl font-semibold">Recent Messages</h3>
                                        <span className="text-sm text-gray-500">{pagination.total} total</span>
                                    </div>
                                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                                        {loading ? (
                                            <div className="flex justify-center py-8">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                                            </div>
                                        ) : messages.length > 0 ? (
                                            <>
                                                {messages.map((message, index) => (
                                                    <motion.div
                                                        key={message._id || index}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h4 className="font-medium text-gray-800">{message.name}</h4>
                                                                <p className="text-sm text-gray-500">{message.email}</p>
                                                            </div>
                                                            <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                                                                {new Date(message.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </span>
                                                        </div>
                                                        {message.phone && (
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                Phone: {message.phone}
                                                            </p>
                                                        )}
                                                        <p className="mt-2 text-gray-600">{message.message}</p>
                                                    </motion.div>
                                                ))}
                                                {messages.length < pagination.total && (
                                                    <div className="flex justify-center mt-4">
                                                        <button
                                                            onClick={handleLoadMore}
                                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                                        >
                                                            Load More
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="text-center py-8 text-gray-500">
                                                No messages received yet
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}