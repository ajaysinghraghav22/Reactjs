// // import React, { useState, useEffect } from 'react';
// // import { FaRobot, FaUser, FaPaperPlane, FaTimes } from 'react-icons/fa';

// // const AIChatbot = () => {
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState('');
// //   const [showChat, setShowChat] = useState(false);

// //   useEffect(() => {
// //     setMessages([
// //       {
// //         id: 1,
// //         text: "Hello! I'm your bus booking assistant. How can I help you today?",
// //         sender: 'bot'
// //       }
// //     ]);
// //   }, []);

// //   const handleSendMessage = () => {
// //     if (!input.trim()) return;

// //     // Add user message
// //     const userMessage = {
// //       id: messages.length + 1,
// //       text: input,
// //       sender: 'user'
// //     };
// //     setMessages(prev => [...prev, userMessage]);
// //     setInput('');

// //     // Bot response logic
// //     setTimeout(() => {
// //       let responseText = '';
// //       const lowerInput = input.toLowerCase();

// //       if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
// //         responseText = "Hello! How can I assist you with your bus booking today?";
// //       } 
// //       else if (lowerInput.includes('booking') || lowerInput.includes('book')) {
// //         responseText = "To book a bus, please:\n1. Select your departure and destination\n2. Choose travel date\n3. Select a bus\n4. Choose your seat\n5. Enter passenger details\n6. Make payment";
// //       }
// //       else if (lowerInput.includes('seat') || lowerInput.includes('select seat')) {
// //         responseText = "Our buses have women-only seats marked in pink. Female passengers can book any seat, while male passengers can only book non-pink seats.";
// //       }
// //       else if (lowerInput.includes('cancel') || lowerInput.includes('refund')) {
// //         responseText = "You can cancel tickets up to 4 hours before departure for an 80% refund. Cancellations can be made in the 'My Bookings' section.";
// //       }
// //       else if (lowerInput.includes('payment') || lowerInput.includes('pay')) {
// //         responseText = "We accept UPI, credit/debit cards, net banking, and wallet payments. All transactions are secure and encrypted.";
// //       }
// //       else {
// //         responseText = "I can help with:\n- Bus schedules\n- Seat selection\n- Booking process\n- Cancellations\n- Payment options\nWhat would you like to know?";
// //       }

// //       const botMessage = {
// //         id: messages.length + 2,
// //         text: responseText,
// //         sender: 'bot'
// //       };
// //       setMessages(prev => [...prev, botMessage]);
// //     }, 800);
// //   };

// //   return (
// //     <>
// //       {/* Floating Chat Button */}
// //       {!showChat && (
// //         <button 
// //           onClick={() => setShowChat(true)}
// //           className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
// //         >
// //           <FaRobot size={24} />
// //         </button>
// //       )}

// //       {/* Chat Window */}
// //       {showChat && (
// //         <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-xl flex flex-col border border-gray-200">
// //           {/* Chat Header */}
// //           <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
// //             <div className="flex items-center gap-2">
// //               <FaRobot />
// //               <span>Bus Booking Assistant</span>
// //             </div>
// //             <button 
// //               onClick={() => setShowChat(false)}
// //               className="text-white hover:text-gray-200"
// //             >
// //               <FaTimes />
// //             </button>
// //           </div>

// //           {/* Chat Messages */}
// //           <div className="flex-1 p-4 overflow-y-auto max-h-96">
// //             {messages.map(msg => (
// //               <div 
// //                 key={msg.id} 
// //                 className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
// //               >
// //                 <div className={`max-w-xs p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-800'}`}>
// //                   {msg.text.split('\n').map((line, i) => (
// //                     <p key={i}>{line}</p>
// //                   ))}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Chat Input */}
// //           <div className="p-3 border-t border-gray-200 flex gap-2">
// //             <input
// //               type="text"
// //               value={input}
// //               onChange={(e) => setInput(e.target.value)}
// //               onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
// //               placeholder="Type your message..."
// //               className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
// //             />
// //             <button
// //               onClick={handleSendMessage}
// //               className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
// //             >
// //               <FaPaperPlane />
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default AIChatbot; // Make sure this default export exists

// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   FaRobot, FaUser, FaPaperPlane, FaTimes, FaBus, 
//   FaTicketAlt, FaMoneyBillWave, FaQuestionCircle, 
//   FaMapMarkerAlt, FaCalendarAlt, FaUserShield, FaHeadset 
// } from 'react-icons/fa';
// import { IoMdTime, IoMdHelp } from 'react-icons/io';
// import { MdPayment, MdDirectionsBus, MdCancel } from 'react-icons/md';
// import { RiRefund2Fill } from 'react-icons/ri';
// import { BsFillChatSquareTextFill } from 'react-icons/bs';

// const AIChatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [showChat, setShowChat] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [quickReplies, setQuickReplies] = useState([
//     "How to book a bus?",
//     "Seat selection policy",
//     "Cancellation policy",
//     "Payment options",
//     "Check bus schedules",
//     "Contact customer support"
//   ]);
//   const [suggestedQuestions, setSuggestedQuestions] = useState([]);
//   const [isMinimized, setIsMinimized] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Sample bus data for dynamic responses
//   const busData = {
//     routes: [
//       { from: "Delhi", to: "Mumbai", duration: "16h", fare: "₹1200-₹2500" },
//       { from: "Bangalore", to: "Chennai", duration: "6h", fare: "₹600-₹1500" },
//       { from: "Kolkata", to: "Pune", duration: "28h", fare: "₹1800-₹3500" }
//     ],
//     amenities: ["AC", "Non-AC", "Sleeper", "Semi-Sleeper", "WiFi", "Charging Ports", "TV", "Blankets"],
//     popularBuses: [
//       { name: "Sharma Travels", rating: "4.5/5" },
//       { name: "Patel Tours", rating: "4.3/5" },
//       { name: "Royal Cruiser", rating: "4.7/5" }
//     ]
//   };

//   // Initialize with welcome message
//   useEffect(() => {
//     setMessages([
//       {
//         id: Date.now(),
//         text: "Hello! I'm your bus booking assistant. How can I help you today?",
//         sender: 'bot',
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         quickReplies: [
//           "Book a ticket",
//           "Check schedules",
//           "Payment options",
//           "Cancel booking"
//         ]
//       }
//     ]);
//   }, []);

//   // Auto-scroll to bottom when messages change
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   // Advanced text matching function
//   const containsWord = (input, words) => {
//     const normalizedInput = input.toLowerCase().replace(/[^a-z0-9\s]/g, '');
//     return words.some(word => 
//       new RegExp(`\\b${word.toLowerCase()}\\b`).test(normalizedInput)
//     );
//   };

//   // Generate dynamic route information
//   const getRouteInfo = (input) => {
//     const route = busData.routes.find(r => 
//       containsWord(input, [r.from.toLowerCase(), r.to.toLowerCase()])
//     );
//     if (route) {
//       return `Buses from ${route.from} to ${route.to}:\n\n• Duration: ${route.duration}\n• Fare Range: ${route.fare}\n• Available Amenities: ${busData.amenities.join(', ')}`;
//     }
//     return null;
//   };

//   const handleSendMessage = () => {
//     if (!input.trim()) return;

//     // Add user message
//     const userMessage = {
//       id: Date.now(),
//       text: input,
//       sender: 'user',
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setIsTyping(true);

//     // Bot response logic with delay
//     setTimeout(() => {
//       let responseText = '';
//       let responseOptions = [];
//       let responseType = 'text'; // Can be 'text', 'options', 'infoCards'
//       let infoCards = [];

//       // Check for route-specific queries first
//       const routeInfo = getRouteInfo(input);
//       if (routeInfo) {
//         responseText = routeInfo;
//         responseOptions = [
//           `Book ${input.split(' to ')[0]} to ${input.split(' to ')[1]}`,
//           "View all schedules",
//           "Compare prices"
//         ];
//       }
//       else if (containsWord(input, ['hello', 'hi', 'hey', 'greetings'])) {
//         responseText = "Hello there! 👋 I'm your bus booking assistant. I can help you with:\n\n• Booking tickets\n• Checking schedules\n• Cancellations\n• Payment options\n• Travel information\n\nWhat would you like to know?";
//         responseOptions = [
//           "Book a ticket",
//           "Check schedules",
//           "Payment methods",
//           "Cancel booking"
//         ];
//       } 
//       else if (containsWord(input, ['book', 'ticket', 'reserve', 'booking', 'buy'])) {
//         responseText = "🚌 Here's how to book a bus ticket:\n\n1. Select departure & destination\n2. Choose travel date\n3. Browse available buses\n4. Select your seat\n5. Enter passenger details\n6. Make payment\n\nWould you like me to guide you through any specific step?";
//         responseOptions = [
//           "Seat selection help",
//           "Payment options",
//           "View bus types",
//           "Check schedules"
//         ];
//       }
//       else if (containsWord(input, ['seat', 'select seat', 'choose seat', 'seats', 'sit'])) {
//         responseText = "💺 Our seat selection policy:\n\n• Women-only seats are marked in pink\n• Female passengers can book any seat\n• Male passengers can only book non-pink seats\n• Seat selection available during booking\n• First-come-first-served basis";
//         responseType = 'infoCards';
//         infoCards = [
//           { icon: <FaUserShield />, title: "Women-Only", text: "Reserved seats for female passengers" },
//           { icon: <FaUser />, title: "General", text: "Available for all passengers" },
//           { icon: <FaTicketAlt />, title: "Selection", text: "Choose during booking process" }
//         ];
//       }
//       else if (containsWord(input, ['cancel', 'refund', 'return', 'cancellation'])) {
//         responseText = "❌ Cancellation Policy:\n\n• 100% refund if cancelled 24+ hours before departure\n• 50% refund if cancelled 6-24 hours before\n• No refund within 6 hours of departure\n\nYou can cancel tickets in 'My Bookings' section.";
//         responseType = 'infoCards';
//         infoCards = [
//           { icon: <IoMdTime />, title: "24+ Hours", text: "Full refund" },
//           { icon: <MdCancel />, title: "6-24 Hours", text: "50% refund" },
//           { icon: <RiRefund2Fill />, title: "<6 Hours", text: "No refund" }
//         ];
//       }
//       else if (containsWord(input, ['payment', 'pay', 'money', 'paid', 'price'])) {
//         responseText = "💳 Payment Options:\n\n• Credit/Debit Cards\n• Net Banking\n• UPI (PhonePe, GPay, etc.)\n• Digital Wallets\n• EMI available\n\nAll transactions are SSL encrypted for security.";
//         responseType = 'infoCards';
//         infoCards = [
//           { icon: <MdPayment />, title: "Cards", text: "Visa, MasterCard, Amex" },
//           { icon: <FaMoneyBillWave />, title: "UPI", text: "Instant payments" },
//           { icon: <FaQuestionCircle />, title: "EMI", text: "Available on select cards" }
//         ];
//       }
//       else if (containsWord(input, ['time', 'schedule', 'when', 'timing', 'departure'])) {
//         responseText = "⏰ Bus Schedules:\n\nPopular routes:\n\n" + 
//           busData.routes.map(r => `${r.from} → ${r.to}: ~${r.duration}`).join('\n') + 
//           "\n\nWould you like schedule for a specific route?";
//         responseOptions = busData.routes.map(r => `${r.from} to ${r.to} schedule`);
//       }
//       else if (containsWord(input, ['help', 'problem', 'issue', 'support', 'contact'])) {
//         responseText = "🆘 Need Help?\n\n• Booking issues: Share PNR\n• Payment problems: Check bank statement\n• Cancellations: Visit 'My Bookings'\n\n24/7 Support: 1800-123-4567\nEmail: support@busbooking.com";
//         responseOptions = [
//           "Booking not confirmed",
//           "Payment deducted but no ticket",
//           "Can't login to account"
//         ];
//       }
//       else if (containsWord(input, ['amenities', 'facilities', 'features', 'comfort'])) {
//         responseText = "🛋️ Bus Amenities:\n\n" + busData.amenities.join(', ') + 
//           "\n\nPopular bus operators:\n\n" + 
//           busData.popularBuses.map(b => `${b.name} (${b.rating})`).join('\n');
//         responseOptions = [
//           "Book AC bus",
//           "View sleeper buses",
//           "Compare amenities"
//         ];
//       }
//       else {
//         responseText = "🤔 I'm not sure I understand. I can help with:\n\n• Bus bookings\n• Schedules & routes\n• Seat selection\n• Cancellations\n• Payment options\n\nTry asking differently or choose an option below:";
//         responseOptions = [
//           "How to book a ticket?",
//           "Check cancellation policy",
//           "What payment methods do you accept?",
//           "Contact customer support"
//         ];
//       }

//       const botMessage = {
//         id: Date.now(),
//         text: responseText,
//         sender: 'bot',
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         options: responseOptions,
//         type: responseType,
//         infoCards: infoCards
//       };
      
//       setMessages(prev => [...prev, botMessage]);
//       setIsTyping(false);
//     }, 800 + Math.random() * 800); // Natural typing delay
//   };

//   const handleQuickReply = (reply) => {
//     setInput(reply);
//     handleSendMessage();
//   };

//   const handleOptionSelect = (option) => {
//     const userMessage = {
//       id: Date.now(),
//       text: option,
//       sender: 'user',
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     };
//     setMessages(prev => [...prev, userMessage]);
//     setIsTyping(true);
//     setTimeout(() => handleSendMessage(), 500);
//   };

//   const toggleMinimize = () => {
//     setIsMinimized(!isMinimized);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <>
//       {/* Floating Chat Button */}
//       {!showChat && (
//         <button 
//           onClick={() => setShowChat(true)}
//           className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center z-50 animate-bounce"
//           aria-label="Open chat"
//         >
//           <BsFillChatSquareTextFill size={24} />
//           <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
//         </button>
//       )}

//       {/* Chat Window */}
//       {showChat && (
//         <div className={`fixed ${isMinimized ? 'bottom-0 right-6 w-16 h-16' : 'bottom-6 right-6 w-80 h-[500px]'} bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200 z-50 transition-all duration-300 overflow-hidden`}>
          
//           {/* Chat Header */}
//           <div 
//             className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-t-lg flex justify-between items-center cursor-pointer"
//             onClick={toggleMinimize}
//           >
//             <div className="flex items-center gap-2">
//               <FaRobot className="text-yellow-300" />
//               {!isMinimized && <span className="font-medium">Bus Booking Assistant</span>}
//             </div>
//             <div className="flex items-center gap-2">
//               {!isMinimized && (
//                 <button 
//                   onClick={(e) => { e.stopPropagation(); setShowChat(false); }}
//                   className="text-white hover:text-gray-200 transition"
//                   aria-label="Close chat"
//                 >
//                   <FaTimes />
//                 </button>
//               )}
//             </div>
//           </div>

//           {!isMinimized && (
//             <>
//               {/* Chat Messages */}
//               <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
//                 {messages.map(msg => (
//                   <div key={msg.id} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
//                     <div className={`inline-block max-w-xs p-3 rounded-lg relative ${msg.sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 shadow-md rounded-bl-none border border-gray-100'}`}>
//                       {msg.text.split('\n').map((line, i) => (
//                         <p key={i} className="mb-1">{line}</p>
//                       ))}
//                       <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
//                         {msg.timestamp}
//                       </div>
//                     </div>
                    
//                     {/* Info Cards */}
//                     {msg.sender === 'bot' && msg.type === 'infoCards' && (
//                       <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
//                         {msg.infoCards.map((card, i) => (
//                           <div key={i} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
//                             <div className="text-blue-600 text-xl mb-2">{card.icon}</div>
//                             <h4 className="font-semibold text-sm">{card.title}</h4>
//                             <p className="text-xs text-gray-600">{card.text}</p>
//                           </div>
//                         ))}
//                       </div>
//                     )}
                    
//                     {/* Message options */}
//                     {msg.sender === 'bot' && msg.options && (
//                       <div className="mt-3 flex flex-wrap gap-2">
//                         {msg.options.map((option, i) => (
//                           <button
//                             key={i}
//                             onClick={() => handleOptionSelect(option)}
//                             className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-full border border-gray-200 transition hover:shadow-sm"
//                           >
//                             {option}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
                
//                 {isTyping && (
//                   <div className="mb-4 text-left">
//                     <div className="inline-block bg-white text-gray-800 p-3 rounded-lg rounded-bl-none shadow border border-gray-200">
//                       <div className="flex items-center gap-1">
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
//                         <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
                
//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Quick Replies */}
//               {messages.length <= 1 && (
//                 <div className="p-3 bg-gray-50 border-t border-gray-200">
//                   <div className="text-xs text-gray-500 mb-2 font-medium">Quick replies:</div>
//                   <div className="flex flex-wrap gap-2">
//                     {quickReplies.map((reply, i) => (
//                       <button
//                         key={i}
//                         onClick={() => handleQuickReply(reply)}
//                         className="text-xs bg-white hover:bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full border border-gray-200 transition hover:shadow-sm"
//                       >
//                         {reply}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Chat Input */}
//               <div className="p-3 border-t border-gray-200 bg-white">
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     onKeyDown={handleKeyDown}
//                     placeholder="Type your message..."
//                     className="flex-1 p-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     aria-label="Type your message"
//                   />
//                   <button
//                     onClick={handleSendMessage}
//                     disabled={!input.trim()}
//                     className={`p-2.5 rounded-full ${input.trim() ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'} transition shadow-md`}
//                     aria-label="Send message"
//                   >
//                     <FaPaperPlane />
//                   </button>
//                 </div>
//               </div>

//               {/* Help Links */}
//               <div className="p-2 bg-gray-50 border-t border-gray-200 flex justify-around text-xs">
//                 <button className="text-gray-600 hover:text-blue-600 flex flex-col items-center transition">
//                   <FaBus className="mb-1 text-lg" />
//                   <span>Bus Types</span>
//                 </button>
//                 <button className="text-gray-600 hover:text-blue-600 flex flex-col items-center transition">
//                   <MdDirectionsBus className="mb-1 text-lg" />
//                   <span>Routes</span>
//                 </button>
//                 <button className="text-gray-600 hover:text-blue-600 flex flex-col items-center transition">
//                   <FaCalendarAlt className="mb-1 text-lg" />
//                   <span>Schedules</span>
//                 </button>
//                 <button className="text-gray-600 hover:text-blue-600 flex flex-col items-center transition">
//                   <FaHeadset className="mb-1 text-lg" />
//                   <span>Help</span>
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default AIChatbot;
import React, { useState, useEffect, useRef } from 'react';
import { 
  FaRobot, FaUser, FaPaperPlane, FaTimes, FaBus, 
  FaTicketAlt, FaMoneyBillWave, FaQuestionCircle, 
  FaMapMarkerAlt, FaCalendarAlt, FaUserShield, FaHeadset 
} from 'react-icons/fa';
import { IoMdTime, IoMdHelp } from 'react-icons/io';
import { MdPayment, MdDirectionsBus, MdCancel } from 'react-icons/md';
import { RiRefund2Fill } from 'react-icons/ri';
import { BsFillChatSquareTextFill } from 'react-icons/bs';

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState([
    "How to book a bus?",
    "Seat selection policy",
    "Cancellation policy",
    "Payment options",
    "Check bus schedules",
    "Contact customer support"
  ]);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample bus data for dynamic responses
  const busData = {
    routes: [
      { from: "Delhi", to: "Mumbai", duration: "16h", fare: "₹1200-₹2500" },
      { from: "Bangalore", to: "Chennai", duration: "6h", fare: "₹600-₹1500" },
      { from: "Kolkata", to: "Pune", duration: "28h", fare: "₹1800-₹3500" }
    ],
    amenities: ["AC", "Non-AC", "Sleeper", "Semi-Sleeper", "WiFi", "Charging Ports", "TV", "Blankets"],
    popularBuses: [
      { name: "Sharma Travels", rating: "4.5/5" },
      { name: "Patel Tours", rating: "4.3/5" },
      { name: "Royal Cruiser", rating: "4.7/5" }
    ]
  };

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: Date.now(),
        text: "Hello! I'm your bus booking assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: [
          "Book a ticket",
          "Check schedules",
          "Payment options",
          "Cancel booking"
        ]
      }
    ]);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Advanced text matching function
  const containsWord = (input, words) => {
    const normalizedInput = input.toLowerCase().replace(/[^a-z0-9\s]/g, '');
    return words.some(word => 
      new RegExp(`\\b${word.toLowerCase()}\\b`).test(normalizedInput)
    );
  };

  // Generate dynamic route information
  const getRouteInfo = (input) => {
    const route = busData.routes.find(r => 
      containsWord(input, [r.from.toLowerCase(), r.to.toLowerCase()])
    );
    if (route) {
      return `Buses from ${route.from} to ${route.to}:\n\n• Duration: ${route.duration}\n• Fare Range: ${route.fare}\n• Available Amenities: ${busData.amenities.join(', ')}`;
    }
    return null;
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Bot response logic with delay
    setTimeout(() => {
      let responseText = '';
      let responseOptions = [];
      let responseType = 'text'; // Can be 'text', 'options', 'infoCards'
      let infoCards = [];

      // Check for route-specific queries first
      const routeInfo = getRouteInfo(input);
      if (routeInfo) {
        responseText = routeInfo;
        responseOptions = [
          `Book ${input.split(' to ')[0]} to ${input.split(' to ')[1]}`,
          "View all schedules",
          "Compare prices"
        ];
      }
      else if (containsWord(input, ['hello', 'hi', 'hey', 'greetings'])) {
        responseText = "Hello there! 👋 I'm your bus booking assistant. I can help you with:\n\n• Booking tickets\n• Checking schedules\n• Cancellations\n• Payment options\n• Travel information\n\nWhat would you like to know?";
        responseOptions = [
          "Book a ticket",
          "Check schedules",
          "Payment methods",
          "Cancel booking"
        ];
      } 
      else if (containsWord(input, ['book', 'ticket', 'reserve', 'booking', 'buy'])) {
        responseText = "🚌 Here's how to book a bus ticket:\n\n1. Select departure & destination\n2. Choose travel date\n3. Browse available buses\n4. Select your seat\n5. Enter passenger details\n6. Make payment\n\nWould you like me to guide you through any specific step?";
        responseOptions = [
          "Seat selection help",
          "Payment options",
          "View bus types",
          "Check schedules"
        ];
      }
      else if (containsWord(input, ['seat', 'select seat', 'choose seat', 'seats', 'sit'])) {
        responseText = "💺 Our seat selection policy:\n\n• Women-only seats are marked in pink\n• Female passengers can book any seat\n• Male passengers can only book non-pink seats\n• Seat selection available during booking\n• First-come-first-served basis";
        responseType = 'infoCards';
        infoCards = [
          { icon: <FaUserShield />, title: "Women-Only", text: "Reserved seats for female passengers" },
          { icon: <FaUser />, title: "General", text: "Available for all passengers" },
          { icon: <FaTicketAlt />, title: "Selection", text: "Choose during booking process" }
        ];
      }
      else if (containsWord(input, ['cancel', 'refund', 'return', 'cancellation'])) {
        responseText = "❌ Cancellation Policy:\n\n• 100% refund if cancelled 24+ hours before departure\n• 50% refund if cancelled 6-24 hours before\n• No refund within 6 hours of departure\n\nYou can cancel tickets in 'My Bookings' section.";
        responseType = 'infoCards';
        infoCards = [
          { icon: <IoMdTime />, title: "24+ Hours", text: "Full refund" },
          { icon: <MdCancel />, title: "6-24 Hours", text: "50% refund" },
          { icon: <RiRefund2Fill />, title: "<6 Hours", text: "No refund" }
        ];
      }
      else if (containsWord(input, ['payment', 'pay', 'money', 'paid', 'price'])) {
        responseText = "💳 Payment Options:\n\n• Credit/Debit Cards\n• Net Banking\n• UPI (PhonePe, GPay, etc.)\n• Digital Wallets\n• EMI available\n\nAll transactions are SSL encrypted for security.";
        responseType = 'infoCards';
        infoCards = [
          { icon: <MdPayment />, title: "Cards", text: "Visa, MasterCard, Amex" },
          { icon: <FaMoneyBillWave />, title: "UPI", text: "Instant payments" },
          { icon: <FaQuestionCircle />, title: "EMI", text: "Available on select cards" }
        ];
      }
      else if (containsWord(input, ['time', 'schedule', 'when', 'timing', 'departure'])) {
        responseText = "⏰ Bus Schedules:\n\nPopular routes:\n\n" + 
          busData.routes.map(r => `${r.from} → ${r.to}: ~${r.duration}`).join('\n') + 
          "\n\nWould you like schedule for a specific route?";
        responseOptions = busData.routes.map(r => `${r.from} to ${r.to} schedule`);
      }
      else if (containsWord(input, ['help', 'problem', 'issue', 'support', 'contact'])) {
        responseText = "🆘 Need Help?\n\n• Booking issues: Share PNR\n• Payment problems: Check bank statement\n• Cancellations: Visit 'My Bookings'\n\n24/7 Support: 1800-123-4567\nEmail: support@busbooking.com";
        responseOptions = [
          "Booking not confirmed",
          "Payment deducted but no ticket",
          "Can't login to account"
        ];
      }
      else if (containsWord(input, ['amenities', 'facilities', 'features', 'comfort'])) {
        responseText = "🛋️ Bus Amenities:\n\n" + busData.amenities.join(', ') + 
          "\n\nPopular bus operators:\n\n" + 
          busData.popularBuses.map(b => `${b.name} (${b.rating})`).join('\n');
        responseOptions = [
          "Book AC bus",
          "View sleeper buses",
          "Compare amenities"
        ];
      }
      else {
        responseText = "🤔 I'm not sure I understand. I can help with:\n\n• Bus bookings\n• Schedules & routes\n• Seat selection\n• Cancellations\n• Payment options\n\nTry asking differently or choose an option below:";
        responseOptions = [
          "How to book a ticket?",
          "Check cancellation policy",
          "What payment methods do you accept?",
          "Contact customer support"
        ];
      }

      const botMessage = {
        id: Date.now(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options: responseOptions,
        type: responseType,
        infoCards: infoCards
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 800); // Natural typing delay
  };

  const handleQuickReply = (reply) => {
    setInput(reply);
    handleSendMessage();
  };

  const handleOptionSelect = (option) => {
    const userMessage = {
      id: Date.now(),
      text: option,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setTimeout(() => handleSendMessage(), 500);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!showChat && (
        <button 
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center z-50 animate-bounce"
          aria-label="Open chat"
        >
          <BsFillChatSquareTextFill size={24} />
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {showChat && (
        <div className={`fixed ${isMinimized ? 'bottom-0 right-6 w-16 h-16' : 'bottom-6 right-6 w-80 h-[500px]'} bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200 z-50 transition-all duration-300 overflow-hidden`}>
          
          {/* Chat Header */}
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-t-lg flex justify-between items-center cursor-pointer"
            onClick={toggleMinimize}
          >
            <div className="flex items-center gap-2">
              <FaRobot className="text-yellow-300" />
              {!isMinimized && <span className="font-medium">Bus Booking Assistant</span>}
            </div>
            <div className="flex items-center gap-2">
              {!isMinimized && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowChat(false); }}
                  className="text-white hover:text-gray-200 transition"
                  aria-label="Close chat"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
                {messages.map(msg => (
                  <div key={msg.id} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block max-w-xs p-3 rounded-lg relative ${msg.sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 shadow-md rounded-bl-none border border-gray-100'}`}>
                      {msg.text.split('\n').map((line, i) => (
                        <p key={i} className="mb-1">{line}</p>
                      ))}
                      <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.timestamp}
                      </div>
                    </div>
                    
                    {/* Info Cards */}
                    {msg.sender === 'bot' && msg.type === 'infoCards' && (
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {msg.infoCards.map((card, i) => (
                          <div key={i} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                            <div className="text-blue-600 text-xl mb-2">{card.icon}</div>
                            <h4 className="font-semibold text-sm">{card.title}</h4>
                            <p className="text-xs text-gray-600">{card.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Message options */}
                    {msg.sender === 'bot' && msg.options && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.options.map((option, i) => (
                          <button
                            key={i}
                            onClick={() => handleOptionSelect(option)}
                            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-full border border-gray-200 transition hover:shadow-sm"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="mb-4 text-left">
                    <div className="inline-block bg-white text-gray-800 p-3 rounded-lg rounded-bl-none shadow border border-gray-200">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 1 && (
                <div className="p-3 bg-gray-50 border-t border-gray-200">
                  <div className="text-xs text-gray-500 mb-2 font-medium">Quick replies:</div>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs bg-white hover:bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full border border-gray-200 transition hover:shadow-sm"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input */}
              <div className="p-3 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 p-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label="Type your message"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!input.trim()}
                    className={`p-2.5 rounded-full ${input.trim() ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'} transition shadow-md`}
                    aria-label="Send message"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>

              {/* Help Links */}
              <div className="p-2 bg-gray-50 border-t border-gray-200 flex justify-around text-xs">
                <button className="text-gray-600 hover:text-blue-600 flex flex-col items-center transition">
                  <FaBus className="mb-1 text-lg" />
                  <span>Bus Types</span>
                </button>
                <button className="text-gray-600 hover:text-blue-600 flex flex-col items-center transition">
                  <MdDirectionsBus className="mb-1 text-lg" />
                  <span>Routes</span>
                </button>
                <button className="text-gray-600 hover:text-blue-600 flex flex-col items-center transition">
                  <FaCalendarAlt className="mb-1 text-lg" />
                  <span>Schedules</span>
                </button>
                <button className="text-gray-600 hover:text-blue-600 flex flex-col items-center transition">
                  <FaHeadset className="mb-1 text-lg" />
                  <span>Help</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AIChatbot;