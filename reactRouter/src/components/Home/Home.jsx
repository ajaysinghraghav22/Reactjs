// import React, { useState, useEffect } from 'react';
// import emailjs from 'emailjs-com';
// import TravelCards from '../Cards/TravelCards';
// import AIChatbot from '../AIchat/AIChatbot';
// import SeatSelection from '../SeatBook/SeatSelection';
// import LegalPages from '../Term&Privacy/LegalPages';
// import PaymentModal from './PaymentModel';
// import './Home.css';
// import './animations.css'

// const API_URL = 'http://localhost:5000/api';

// const Home = () => {
//   const [fromStation, setFromStation] = useState('');
//   const [toStation, setToStation] = useState('');
//   const [name, setName] = useState('');
//   const [gender, setGender] = useState('');
//   const [age, setAge] = useState('');
//   const [email, setEmail] = useState('');
//   const today = new Date().toISOString().split('T')[0];
//   const [travelDate, setTravelDate] = useState(today);
//   const [suggestions, setSuggestions] = useState([]);
//   const [targetInput, setTargetInput] = useState(null);
//   const [availableBuses, setAvailableBuses] = useState([]);
//   const [selectedBus, setSelectedBus] = useState(null);
//   const [bookingDetails, setBookingDetails] = useState(null);
//   const [showBookingForm, setShowBookingForm] = useState(false);
//   const [showSlip, setShowSlip] = useState(false);
//   const [seats, setSeats] = useState(1);
//   const [selectedSeat, setSelectedSeat] = useState(null);
//   const [searchPerformed, setSearchPerformed] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [confettiElements, setConfettiElements] = useState([]);
//   const [myBookings, setMyBookings] = useState([]);
//   const [showMyBookings, setShowMyBookings] = useState(false);

  

//   const allStations = ['Delhi', 'Mumbai', 'Chandigarh', 'Ludhiana', 'Amritsar', 'Ambala', 'Karnal', 'Hisar', 'Panipat', 'Kolkata', 'Bangalore', 'Jaipur', 'Lucknow', 'Pune'];

//   const popularDestinations = [
//     {
//       id: 1,
//       name: 'Taj Mahal, Agra',
//       image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523',
//       description: 'The iconic white marble mausoleum, one of the Seven Wonders of the World',
//       bestTime: 'Oct-Mar',
//       rating: '4.8/5'
//     },
//     {
//       id: 2,
//       name: 'Jaipur, Rajasthan',
//       image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245',
//       description: 'The Pink City known for its palaces, forts, and vibrant culture',
//       bestTime: 'Oct-Mar',
//       rating: '4.7/5'
//     },
//     {
//       id: 3,
//       name: 'Goa Beaches',
//       image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
//       description: 'Famous for its beaches, nightlife, and Portuguese heritage',
//       bestTime: 'Nov-Feb',
//       rating: '4.6/5'
//     },
//     {
//       id: 4,
//       name: 'Kerala Backwaters',
//       image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae',
//       description: 'Network of lagoons and lakes along the Arabian Sea coast',
//       bestTime: 'Sep-Mar',
//       rating: '4.8/5'
//     },
//   ];

//   const createConfetti = () => {
//     const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];
//     const confetti = [];
//     for (let i = 0; i < 100; i++) {
//       const style = {
//         left: `${Math.random() * 100}vw`,
//         backgroundColor: colors[Math.floor(Math.random() * colors.length)],
//         animationDelay: `${Math.random() * 5}s`,
//         animationDuration: `${3 + Math.random() * 3}s`,
//       };
//       confetti.push(<div key={i} className="confetti" style={style} />);
//     }
//     setConfettiElements(confetti);
//     setTimeout(() => setConfettiElements([]), 5000);
//   };

//   const handleStationChange = (value, setter, inputName) => {
//     setter(value);
//     setTargetInput(inputName);
//     setSuggestions(value.trim() ? allStations.filter(station => 
//       station.toLowerCase().includes(value.toLowerCase())) : []);
//   };

//   const handleSuggestionClick = (station) => {
//     targetInput === 'from' ? setFromStation(station) : setToStation(station);
//     setSuggestions([]);
//   };

//   const fetchAvailableBuses = () => {
//     const buses = [
//       { 
//         id: 1, 
//         busName: 'Sharma Travels AC Sleeper', 
//         availableSeats: 15, 
//         departureTime: '10:00 AM', 
//         arrivalTime: '6:00 PM',
//         busType: 'AC Sleeper',
//         fare: 1200,
//         amenities: ['AC', 'TV', 'Water', 'Blanket'],
//         busNumber: 'HR55 7890'
//       },
//       { 
//         id: 2, 
//         busName: 'Haryana Roadways', 
//         availableSeats: 32, 
//         departureTime: '1:00 PM', 
//         arrivalTime: '9:30 PM',
//         busType: 'Non-AC Seater',
//         fare: 600,
//         amenities: ['Water', 'Charging Port'],
//         busNumber: 'HR55 6543'
//       },
//       { 
//         id: 3, 
//         busName: 'Volvo AC Multi-Axle', 
//         availableSeats: 8, 
//         departureTime: '4:00 PM', 
//         arrivalTime: '12:30 AM',
//         busType: 'AC Multi-Axle',
//         fare: 1500,
//         amenities: ['AC', 'TV', 'Water', 'Blanket', 'WiFi', 'Charging Port'],
//         busNumber: 'HR55 9876'
//       },
//     ];
    
//     setAvailableBuses(buses);
//     setSearchPerformed(true);
//   };

//   const handleBusSelection = (bus) => {
//     setSelectedBus(bus);
//     setShowBookingForm(true);
//   };

//   const handleSeatSelect = (seatNumber) => {
//     setSelectedSeat(seatNumber);
//   };

//   const calculateTotalFare = () => {
//     return selectedBus ? (selectedBus.fare * seats).toFixed(2) : 0;
//   };

//   const handleBooking = (e) => {
//     e.preventDefault();
//     if (selectedBus && selectedSeat) {
//       setShowPaymentModal(true);
//     } else {
//       alert('Please select a seat before booking');
//     }
//   };

//   const handlePaymentSuccess = () => {
//     setPaymentSuccess(true);
//     createConfetti();
//     const details = { 
//       name, 
//       age, 
//       gender, 
//       fromStation, 
//       toStation, 
//       travelDate, 
//       email, 
//       selectedBus,
//       selectedSeat,
//       seats,
//       totalFare: calculateTotalFare()
//     };
//     setBookingDetails(details);
//     setShowSlip(true);
//     setShowPaymentModal(false);

//     emailjs.send('service_ahwth7m', 'template_d27lj6y', {
//       user_name: name,
//       user_from: fromStation,
//       user_to: toStation,
//       user_email: email,
//       bus_name: selectedBus.busName,
//       bus_number: selectedBus.busNumber,
//       departure_time: selectedBus.departureTime,
//       arrival_time: selectedBus.arrivalTime,
//       travel_date: travelDate,
//       seat_number: selectedSeat,
//       total_seats: seats,
//       total_amount: calculateTotalFare()
//     }, 'bnV8F2M2XAD_LOC48')
//       .then(() => alert('Booking confirmed! Check your email for details.'))
//       .catch(() => alert('Booking confirmed, but email failed to send.'));
//   };

//   const downloadSlip = () => {
//     const content = `
// ==============================
//       BUS TICKET CONFIRMATION
// ==============================

// Passenger Details:
// Name        : ${bookingDetails.name}
// Age         : ${bookingDetails.age}
// Gender      : ${bookingDetails.gender}
// Email       : ${bookingDetails.email}

// Journey Details:
// From        : ${bookingDetails.fromStation}
// To          : ${bookingDetails.toStation}
// Date        : ${bookingDetails.travelDate}
// Seat Number : ${bookingDetails.selectedSeat}
// Seats       : ${bookingDetails.seats}

// Bus Details:
// Bus Name    : ${bookingDetails.selectedBus.busName}
// Bus Number  : ${bookingDetails.selectedBus.busNumber}
// Type        : ${bookingDetails.selectedBus.busType}
// Departure   : ${bookingDetails.selectedBus.departureTime}
// Arrival     : ${bookingDetails.selectedBus.arrivalTime}

// Fare Details:
// Per Seat    : ₹${bookingDetails.selectedBus.fare}
// Total Seats : ${bookingDetails.seats}
// Total Fare  : ₹${bookingDetails.totalFare}

// ------------------------------
// IMPORTANT NOTES:
// 1. Please arrive at least 30 minutes before departure
// 2. Carry valid ID proof
// 3. Boarding point: ${bookingDetails.fromStation} Bus Stand

// 📞 Helpline: 1800-BUS-HELP
// ==============================
// `;

//     const blob = new Blob([content], { type: 'text/plain' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = `${bookingDetails.name}_Bus_Ticket.txt`;
//     link.click();
//   };

//   return (
//     <div className={`min-h-screen p-4 md:p-8 ${!showSlip ? 'animated-bg' : 'bg-gradient-to-b from-blue-50 to-blue-100'}`}>
//       {confettiElements}
//       <div className={`max-w-4xl mx-auto rounded-xl shadow-md overflow-hidden ${showSlip ? 'bg-white' : 'bg-white bg-opacity-90 backdrop-blur-sm'}`}>
//         <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
//           <h1 className="text-2xl md:text-3xl font-bold text-center">Online Bus Ticket Booking</h1>
//           <p className="text-center mt-2">Book your journey with ease</p>
//         </div>

//         <div className="p-6">
//           {!showBookingForm && !showSlip && (
//             <div>
//               <div className="bg-blue-50 p-4 rounded-lg mb-6">
//                 <h2 className="text-xl font-semibold mb-4 text-blue-00">Search Buses</h2>
//                 <form onSubmit={(e) => { e.preventDefault(); fetchAvailableBuses(); }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
//                     <input 
//                       type="text" 
//                       placeholder="Departure City" 
//                       value={fromStation} 
//                       onChange={(e) => handleStationChange(e.target.value, setFromStation, 'from')} 
//                       required 
//                       className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
//                     />
//                     {suggestions.length > 0 && targetInput === 'from' && (
//                       <ul className="absolute z-10 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
//                         {suggestions.map((station, i) => (
//                           <li 
//                             key={i} 
//                             onClick={() => handleSuggestionClick(station)} 
//                             className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
//                           >
//                             {station}
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
                  
//                   <div className="relative">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
//                     <input 
//                       type="text" 
//                       placeholder="Destination City" 
//                       value={toStation} 
//                       onChange={(e) => handleStationChange(e.target.value, setToStation, 'to')} 
//                       required 
//                       className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
//                     />
//                     {suggestions.length > 0 && targetInput === 'to' && (
//                       <ul className="absolute z-10 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
//                         {suggestions.map((station, i) => (
//                           <li 
//                             key={i} 
//                             onClick={() => handleSuggestionClick(station)} 
//                             className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
//                           >
//                             {station}
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
//                     <input 
//                       type="date" 
//                       value={travelDate} 
//                       onChange={(e) => setTravelDate(e.target.value)} 
//                       min={today} 
//                       required 
//                       className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
//                     />
//                   </div>
                  
//                   <div className="md:col-span-3">
//                     <button 
//                       type="submit" 
//                       className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 font-medium"
//                     >
//                       Search Buses
//                     </button>
//                   </div>
//                 </form>
//               </div>

//               {searchPerformed && (
//                 <div className="mt-6">
//                   <h2 className="text-xl font-semibold mb-4 text-blue-800">Available Buses</h2>
                  
//                   {availableBuses.length > 0 ? (
//                     <div className="space-y-4">
//                       {availableBuses.map(bus => (
//                         <div key={bus.id} className="bus-card floating-card">
//                           <div className="p-4">
//                             <div className="flex flex-col md:flex-row md:justify-between md:items-center">
//                               <div className="mb-4 md:mb-0">
//                                 <h3 className="text-lg font-bold">{bus.busName}</h3>
//                                 <p className="text-gray-600">{bus.busType}</p>
//                                 <p className="text-sm text-gray-500">Bus No: {bus.busNumber}</p>
//                               </div>
                              
//                               <div className="text-center mb-4 md:mb-0">
//                                 <p className="text-2xl font-bold text-blue-600">₹{bus.fare}</p>
//                                 <p className="text-sm text-gray-500">per seat</p>
//                               </div>
                              
//                               <div className="text-center">
//                                 <p className="font-medium">{bus.departureTime} → {bus.arrivalTime}</p>
//                                 <p className="text-sm text-gray-500">{bus.availableSeats} seats available</p>
//                               </div>
//                             </div>
                            
//                             <div className="mt-4 flex flex-wrap gap-2">
//                               {bus.amenities.map((amenity, index) => (
//                                 <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
//                                   {amenity}
//                                 </span>
//                               ))}
//                             </div>
                            
//                             <button 
//                               onClick={() => handleBusSelection(bus)}
//                               className="mt-4 w-full booking-btn text-white py-2 rounded transition duration-300"
//                             >
//                               Select Bus
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-8 bg-yellow-50 rounded-lg">
//                       <p className="text-lg text-yellow-800">No buses available for the selected route and date.</p>
//                       <p className="mt-2 text-gray-600">Please try different search criteria.</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}

//           {showBookingForm && !showSlip && (
//             <div className="bg-blue-50 p-6 rounded-lg">
//               <h2 className="text-xl font-semibold mb-6 text-blue-800">Passenger Details</h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                 <div className="bg-white p-4 rounded-lg shadow">
//                   <h3 className="font-medium text-gray-800 mb-4">Journey Details</h3>
//                   <p><span className="font-medium">From:</span> {fromStation}</p>
//                   <p><span className="font-medium">To:</span> {toStation}</p>
//                   <p><span className="font-medium">Date:</span> {travelDate}</p>
//                   <p><span className="font-medium">Bus:</span> {selectedBus.busName}</p>
//                   <p><span className="font-medium">Departure:</span> {selectedBus.departureTime}</p>
//                   <p><span className="font-medium">Arrival:</span> {selectedBus.arrivalTime}</p>
//                 </div>
                
//                 <div className="bg-white p-4 rounded-lg shadow">
//                   <h3 className="font-medium text-gray-800 mb-4">Fare Details</h3>
//                   <p><span className="font-medium">Per Seat:</span> ₹{selectedBus.fare}</p>
//                   <div className="mt-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Number of Seats</label>
//                     <select 
//                       value={seats} 
//                       onChange={(e) => setSeats(parseInt(e.target.value))}
//                       className="w-full px-3 py-2 border rounded form-input"
//                     >
//                       {[...Array(10).keys()].map(i => (
//                         <option key={i+1} value={i+1}>{i+1}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <p className="mt-3 font-bold"><span className="font-medium">Total Fare:</span> ₹{calculateTotalFare()}</p>
//                 </div>
//               </div>
              
//               <SeatSelection 
//                 bus={selectedBus} 
//                 onSeatSelect={handleSeatSelect}
//                 userGender={gender}
//               />
              
//               <form onSubmit={handleBooking}>
//                 <h3 className="font-medium text-gray-800 mb-4">Passenger Information</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                     <input 
//                       type="text" 
//                       placeholder="Name as per ID" 
//                       value={name} 
//                       onChange={(e) => setName(e.target.value)} 
//                       required 
//                       className="w-full px-4 py-2 border rounded form-input" 
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                     <input 
//                       type="email" 
//                       placeholder="Your email address" 
//                       value={email} 
//                       onChange={(e) => setEmail(e.target.value)} 
//                       required 
//                       className="w-full px-4 py-2 border rounded form-input" 
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
//                     <input 
//                       type="number" 
//                       placeholder="Age" 
//                       value={age} 
//                       onChange={(e) => setAge(e.target.value)} 
//                       min="1" 
//                       max="100" 
//                       required 
//                       className="w-full px-4 py-2 border rounded form-input" 
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
//                     <select 
//                       value={gender} 
//                       onChange={(e) => setGender(e.target.value)} 
//                       required 
//                       className="w-full px-4 py-2 border rounded form-input"
//                     >
//                       <option value="">Select Gender</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>
//                 </div>
                
//                 <div className="flex justify-between items-center mt-8">
//                   <button 
//                     type="button" 
//                     onClick={() => setShowBookingForm(false)}
//                     className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
//                   >
//                     Back
//                   </button>
//                   <button 
//                     type="submit" 
//                     className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded hover:from-blue-700 hover:to-purple-700 transition duration-300"
//                   >
//                     Proceed to Payment
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}

//           {showSlip && bookingDetails && (
//             <div className="bg-green-50 p-6 rounded-lg border border-green-200">
//               <div className="text-center mb-6">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <h2 className="text-2xl font-bold text-green-800 mt-2">Booking Confirmed!</h2>
//                 <p className="text-green-600">Your ticket has been booked successfully.</p>
//               </div>
              
//               <div className="bg-white p-4 rounded-lg shadow mb-6">
//                 <h3 className="font-bold text-lg mb-3 border-b pb-2">Booking Summary</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <h4 className="font-medium text-gray-800 mb-2">Passenger Details</h4>
//                     <p><span className="font-medium">Name:</span> {bookingDetails.name}</p>
//                     <p><span className="font-medium">Age:</span> {bookingDetails.age}</p>
//                     <p><span className="font-medium">Gender:</span> {bookingDetails.gender}</p>
//                     <p><span className="font-medium">Email:</span> {bookingDetails.email}</p>
//                   </div>
                  
//                   <div>
//                     <h4 className="font-medium text-gray-800 mb-2">Journey Details</h4>
//                     <p><span className="font-medium">From:</span> {bookingDetails.fromStation}</p>
//                     <p><span className="font-medium">To:</span> {bookingDetails.toStation}</p>
//                     <p><span className="font-medium">Date:</span> {bookingDetails.travelDate}</p>
//                     <p><span className="font-medium">Seat:</span> {bookingDetails.selectedSeat}</p>
//                     <p><span className="font-medium">Seats:</span> {bookingDetails.seats}</p>
//                   </div>
                  
//                   <div>
//                     <h4 className="font-medium text-gray-800 mb-2">Bus Details</h4>
//                     <p><span className="font-medium">Bus Name:</span> {bookingDetails.selectedBus.busName}</p>
//                     <p><span className="font-medium">Bus Number:</span> {bookingDetails.selectedBus.busNumber}</p>
//                     <p><span className="font-medium">Type:</span> {bookingDetails.selectedBus.busType}</p>
//                     <p><span className="font-medium">Departure:</span> {bookingDetails.selectedBus.departureTime}</p>
//                     <p><span className="font-medium">Arrival:</span> {bookingDetails.selectedBus.arrivalTime}</p>
//                   </div>
                  
//                   <div>
//                     <h4 className="font-medium text-gray-800 mb-2">Fare Details</h4>
//                     <p><span className="font-medium">Per Seat:</span> ₹{bookingDetails.selectedBus.fare}</p>
//                     <p><span className="font-medium">Total Seats:</span> {bookingDetails.seats}</p>
//                     <p className="font-bold text-lg mt-2"><span className="font-medium">Total Amount:</span> ₹{bookingDetails.totalFare}</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
//                 <h4 className="font-medium text-yellow-800 mb-2">Important Notes</h4>
//                 <ul className="list-disc pl-5 text-yellow-800 space-y-1">
//                   <li>Please carry a valid ID proof during the journey</li>
//                   <li>Arrive at least 30 minutes before departure time</li>
//                   <li>Boarding point: {bookingDetails.fromStation} Bus Stand</li>
//                   <li>An email with your ticket details has been sent to {bookingDetails.email}</li>
//                 </ul>
//               </div>
              
//               <div className="flex flex-col sm:flex-row justify-center gap-4">
//                 <button 
//                   onClick={downloadSlip}
//                   className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded hover:from-blue-700 hover:to-purple-700 flex items-center justify-center gap-2 transition duration-300"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//                   </svg>
//                   Download Ticket
//                 </button>
                
//                 <button 
//                   onClick={() => {
//                     setShowSlip(false);
//                     setShowBookingForm(false);
//                     setSearchPerformed(false);
//                     setAvailableBuses([]);
//                     setSelectedSeat(null);
//                   }}
//                   className="px-6 py-3 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 flex items-center justify-center gap-2 transition duration-300"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                   </svg>
//                   Book Another Ticket
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
        
//         <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">
//           <p>Need help? Call our customer support at 1800-BUS-HELP</p>
//           <p className="mt-1">© {new Date().getFullYear()} Bus Booking System. All rights reserved.</p>
//         </div>
//       </div>
//       <TravelCards destinations={popularDestinations} />
//       <LegalPages />
//       <AIChatbot />
      
//       {showPaymentModal && (
//         <PaymentModal 
//           totalAmount={calculateTotalFare()}
//           onSuccess={handlePaymentSuccess}
//           onClose={() => setShowPaymentModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default Home;s

import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import TravelCards from '../Cards/TravelCards';
import AIChatbot from '../AIchat/AIChatbot';
import SeatSelection from '../SeatBook/SeatSelection';
import LegalPages from '../Term&Privacy/LegalPages';
import PaymentModal from './PaymentModel';
import './Home.css';
import './animations.css';

const API_URL = 'http://localhost:5000/api';

const Home = () => {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [travelDate, setTravelDate] = useState(today);
  const [suggestions, setSuggestions] = useState([]);
  const [targetInput, setTargetInput] = useState(null);
  const [availableBuses, setAvailableBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showSlip, setShowSlip] = useState(false);
  const [seats, setSeats] = useState(1);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [confettiElements, setConfettiElements] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [showMyBookings, setShowMyBookings] = useState(false);
  const [departurePoints, setDeparturePoints] = useState([]);
  const [droppingPoints, setDroppingPoints] = useState([]);
  const [selectedDeparturePoint, setSelectedDeparturePoint] = useState('');
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState('');
  const [loading, setLoading] = useState(false);

  const allStations = [
    { name: 'Delhi', departurePoints: ['ISBT Kashmere Gate', 'Anand Vihar ISBT', 'Sarai Kale Khan'], droppingPoints: ['ISBT Kashmere Gate', 'Anand Vihar ISBT', 'Sarai Kale Khan'] },
    { name: 'Mumbai', departurePoints: ['Mumbai Central', 'Dadar TT', 'Borivali'], droppingPoints: ['Mumbai Central', 'Dadar TT', 'Borivali'] },
    { name: 'Chandigarh', departurePoints: ['ISBT Chandigarh', 'Sector 17 Bus Stand', 'Sector 43 Bus Stand'], droppingPoints: ['ISBT Chandigarh', 'Sector 17 Bus Stand', 'Sector 43 Bus Stand'] },
    { name: 'Bangalore', departurePoints: ['Majestic Bus Stand', 'Electronic City', 'Yeshwantpur'], droppingPoints: ['Majestic Bus Stand', 'Electronic City', 'Yeshwantpur'] }
  ];

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = localStorage.getItem('busBookings');
    if (savedBookings) {
      setMyBookings(JSON.parse(savedBookings));
    }
  }, []);

  useEffect(() => {
    // Update departure and dropping points when stations change
    if (fromStation) {
      const station = allStations.find(s => s.name === fromStation);
      setDeparturePoints(station ? station.departurePoints : []);
    } else {
      setDeparturePoints([]);
    }

    if (toStation) {
      const station = allStations.find(s => s.name === toStation);
      setDroppingPoints(station ? station.droppingPoints : []);
    } else {
      setDroppingPoints([]);
    }
  }, [fromStation, toStation]);

  const createConfetti = () => {
    const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];
    const confetti = [];
    for (let i = 0; i < 100; i++) {
      const style = {
        left: `${Math.random() * 100}vw`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 3}s`,
      };
      confetti.push(<div key={i} className="confetti" style={style} />);
    }
    setConfettiElements(confetti);
    setTimeout(() => setConfettiElements([]), 5000);
  };

  const handleStationChange = (value, setter, inputName) => {
    setter(value);
    setTargetInput(inputName);
    setSuggestions(value.trim() ? allStations.filter(station => 
      station.name.toLowerCase().includes(value.toLowerCase())) : []);
  };

  const handleSuggestionClick = (station) => {
    if (targetInput === 'from') {
      setFromStation(station.name);
      if (station.name === toStation) {
        setToStation('');
      }
    } else {
      setToStation(station.name);
      if (station.name === fromStation) {
        setFromStation('');
      }
    }
    setSuggestions([]);
  };

  const fetchAvailableBuses = async () => {
    setLoading(true);
    try {
      // In a real app, you would fetch from your API
    
      
      // Mock data for demonstration
      const mockBuses = [
        { 
          id: 1, 
          busName: 'Sharma Travels AC Sleeper', 
          availableSeats: 15, 
          departureTime: '10:00 AM', 
          arrivalTime: '6:00 PM',
          busType: 'AC Sleeper',
          fare: 1200,
          amenities: ['AC', 'TV', 'Water', 'Blanket'],
          busNumber: 'HR55 7890',
          departurePoints: departurePoints,
          droppingPoints: droppingPoints
        },
        { 
          id: 2, 
          busName: 'Haryana Roadways', 
          availableSeats: 32, 
          departureTime: '1:00 PM', 
          arrivalTime: '9:30 PM',
          busType: 'Non-AC Seater',
          fare: 600,
          amenities: ['Water', 'Charging Port'],
          busNumber: 'HR55 6543',
          departurePoints: departurePoints,
          droppingPoints: droppingPoints
        }
      ];

      // Filter out buses that are fully booked
      const availableBuses = mockBuses.filter(bus => bus.availableSeats > 0);
      
      setAvailableBuses(availableBuses);
      setSearchPerformed(true);
    } catch (error) {
      console.error('Error fetching buses:', error);
      alert('Failed to fetch available buses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBusSelection = (bus) => {
    setSelectedBus(bus);
    setSelectedDeparturePoint(bus.departurePoints[0]);
    setSelectedDroppingPoint(bus.droppingPoints[0]);
    setShowBookingForm(true);
  };

  const handleSeatSelect = (seatNumber) => {
    setSelectedSeat(seatNumber);
  };

  const calculateTotalFare = () => {
    return selectedBus ? (selectedBus.fare * seats).toFixed(2) : 0;
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedSeat) {
      alert('Please select a seat before booking');
      return;
    }
    if (!selectedDeparturePoint || !selectedDroppingPoint) {
      alert('Please select both departure and dropping points');
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    createConfetti();
    
    const details = { 
      name, 
      age, 
      gender, 
      fromStation, 
      toStation, 
      travelDate, 
      email, 
      selectedBus,
      selectedSeat,
      seats,
      totalFare: calculateTotalFare(),
      departurePoint: selectedDeparturePoint,
      droppingPoint: selectedDroppingPoint,
      bookingDate: new Date().toLocaleString(),
      pnr: Math.random().toString(36).substring(2, 10).toUpperCase()
    };
    
    setBookingDetails(details);
    
    // Save to my bookings
    const updatedBookings = [...myBookings, details];
    setMyBookings(updatedBookings);
    localStorage.setItem('busBookings', JSON.stringify(updatedBookings));
    
    setShowSlip(true);
    setShowPaymentModal(false);

    // Send confirmation email
    emailjs.send('service_ahwth7m', 'template_d27lj6y', {
      user_name: name,
      user_from: fromStation,
      user_to: toStation,
      user_email: email,
      bus_name: selectedBus.busName,
      bus_number: selectedBus.busNumber,
      departure_time: selectedBus.departureTime,
      arrival_time: selectedBus.arrivalTime,
      travel_date: travelDate,
      seat_number: selectedSeat,
      total_seats: seats,
      total_amount: calculateTotalFare(),
      departure_point: selectedDeparturePoint,
      dropping_point: selectedDroppingPoint,
      pnr: details.pnr
    }, 'bnV8F2M2XAD_LOC48')
      .then(() => console.log('Email sent successfully'))
      .catch(err => console.error('Email send failed:', err));
  };

  const downloadSlip = () => {
    const content = `
==============================
      BUS TICKET CONFIRMATION
==============================

PNR Number : ${bookingDetails.pnr}
Booking Date: ${bookingDetails.bookingDate}

Passenger Details:
Name        : ${bookingDetails.name}
Age         : ${bookingDetails.age}
Gender      : ${bookingDetails.gender}
Email       : ${bookingDetails.email}

Journey Details:
From        : ${bookingDetails.fromStation} (${bookingDetails.departurePoint})
To          : ${bookingDetails.toStation} (${bookingDetails.droppingPoint})
Date        : ${bookingDetails.travelDate}
Seat Number : ${bookingDetails.selectedSeat}
Seats       : ${bookingDetails.seats}

Bus Details:
Bus Name    : ${bookingDetails.selectedBus.busName}
Bus Number  : ${bookingDetails.selectedBus.busNumber}
Type        : ${bookingDetails.selectedBus.busType}
Departure   : ${bookingDetails.selectedBus.departureTime}
Arrival     : ${bookingDetails.selectedBus.arrivalTime}

Fare Details:
Per Seat    : ₹${bookingDetails.selectedBus.fare}
Total Seats : ${bookingDetails.seats}
Total Fare  : ₹${bookingDetails.totalFare}

------------------------------
IMPORTANT NOTES:
1. Please arrive at least 30 minutes before departure
2. Carry valid ID proof
3. Boarding point: ${bookingDetails.departurePoint}
4. Dropping point: ${bookingDetails.droppingPoint}

📞 Helpline: 1800-BUS-HELP
==============================
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${bookingDetails.name}_Bus_Ticket_${bookingDetails.pnr}.txt`;
    link.click();
  };

  const cancelBooking = (pnr) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const updatedBookings = myBookings.filter(booking => booking.pnr !== pnr);
      setMyBookings(updatedBookings);
      localStorage.setItem('busBookings', JSON.stringify(updatedBookings));
      alert('Booking cancelled successfully');
    }
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 ${!showSlip ? 'animated-bg' : 'bg-gradient-to-b from-blue-50 to-blue-100'}`}>
      {confettiElements}
      <div className={`max-w-4xl mx-auto rounded-xl shadow-md overflow-hidden ${showSlip ? 'bg-white' : 'bg-white bg-opacity-90 backdrop-blur-sm'}`}>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold text-center">Online Bus Ticket Booking</h1>
          <p className="text-center mt-2">Book your journey with ease</p>
        </div>

        <div className="p-6">
          {!showBookingForm && !showSlip && (
            <div>
              <div className="flex justify-end mb-4">
                <button 
                  onClick={() => setShowMyBookings(!showMyBookings)}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition"
                >
                  {showMyBookings ? 'Back to Search' : 'My Bookings'}
                </button>
              </div>

              {showMyBookings ? (
                <div className="my-bookings">
                  <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
                  {myBookings.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-600">You don't have any bookings yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {myBookings.map((booking, index) => (
                        <div key={index} className="booking-card p-4 border rounded-lg shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold">{booking.fromStation} → {booking.toStation}</h3>
                              <p className="text-sm text-gray-600">{booking.travelDate} | {booking.selectedBus.departureTime}</p>
                              <p className="text-sm">PNR: {booking.pnr}</p>
                              <p className="text-sm">Seat: {booking.selectedSeat}</p>
                              <p className="font-bold text-blue-600">₹{booking.totalFare}</p>
                            </div>
                            <div>
                              <button 
                                onClick={() => cancelBooking(booking.pnr)}
                                className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                          <div className="mt-2 text-sm">
                            <p>Boarding: {booking.departurePoint}</p>
                            <p>Dropping: {booking.droppingPoint}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-blue-800">Search Buses</h2>
                    <form onSubmit={(e) => { e.preventDefault(); fetchAvailableBuses(); }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                        <input 
                          type="text" 
                          placeholder="Departure City" 
                          value={fromStation} 
                          onChange={(e) => handleStationChange(e.target.value, setFromStation, 'from')} 
                          required 
                          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        />
                        {suggestions.length > 0 && targetInput === 'from' && (
                          <ul className="absolute z-10 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
                            {suggestions.map((station, i) => (
                              <li 
                                key={i} 
                                onClick={() => handleSuggestionClick(station)} 
                                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                              >
                                {station.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                        <input 
                          type="text" 
                          placeholder="Destination City" 
                          value={toStation} 
                          onChange={(e) => handleStationChange(e.target.value, setToStation, 'to')} 
                          required 
                          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        />
                        {suggestions.length > 0 && targetInput === 'to' && (
                          <ul className="absolute z-10 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
                            {suggestions.map((station, i) => (
                              <li 
                                key={i} 
                                onClick={() => handleSuggestionClick(station)} 
                                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                              >
                                {station.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                        <input 
                          type="date" 
                          value={travelDate} 
                          onChange={(e) => setTravelDate(e.target.value)} 
                          min={today} 
                          required 
                          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                        />
                      </div>
                      
                      <div className="md:col-span-3">
                        <button 
                          type="submit" 
                          disabled={loading}
                          className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 font-medium ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          {loading ? 'Searching...' : 'Search Buses'}
                        </button>
                      </div>
                    </form>
                  </div>

                  {searchPerformed && (
                    <div className="mt-6">
                      <h2 className="text-xl font-semibold mb-4 text-blue-800">Available Buses</h2>
                      
                      {availableBuses.length > 0 ? (
                        <div className="space-y-4">
                          {availableBuses.map(bus => (
                            <div key={bus.id} className="bus-card floating-card">
                              <div className="p-4">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                  <div className="mb-4 md:mb-0">
                                    <h3 className="text-lg font-bold">{bus.busName}</h3>
                                    <p className="text-gray-600">{bus.busType}</p>
                                    <p className="text-sm text-gray-500">Bus No: {bus.busNumber}</p>
                                  </div>
                                  
                                  <div className="text-center mb-4 md:mb-0">
                                    <p className="text-2xl font-bold text-blue-600">₹{bus.fare}</p>
                                    <p className="text-sm text-gray-500">per seat</p>
                                  </div>
                                  
                                  <div className="text-center">
                                    <p className="font-medium">{bus.departureTime} → {bus.arrivalTime}</p>
                                    <p className="text-sm text-gray-500">{bus.availableSeats} seats available</p>
                                  </div>
                                </div>
                                
                                <div className="mt-4 flex flex-wrap gap-2">
                                  {bus.amenities.map((amenity, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                      {amenity}
                                    </span>
                                  ))}
                                </div>
                                
                                <button 
                                  onClick={() => handleBusSelection(bus)}
                                  className="mt-4 w-full booking-btn text-white py-2 rounded transition duration-300"
                                >
                                  Select Bus
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 bg-yellow-50 rounded-lg">
                          <p className="text-lg text-yellow-800">No buses available for the selected route and date.</p>
                          <p className="mt-2 text-gray-600">Please try different search criteria.</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {showBookingForm && !showSlip && (
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-6 text-blue-800">Passenger Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-medium text-gray-800 mb-4">Journey Details</h3>
                  <p><span className="font-medium">From:</span> {fromStation}</p>
                  <p><span className="font-medium">To:</span> {toStation}</p>
                  <p><span className="font-medium">Date:</span> {travelDate}</p>
                  <p><span className="font-medium">Bus:</span> {selectedBus.busName}</p>
                  <p><span className="font-medium">Departure:</span> {selectedBus.departureTime}</p>
                  <p><span className="font-medium">Arrival:</span> {selectedBus.arrivalTime}</p>
                  
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Departure Point</label>
                    <select 
                      value={selectedDeparturePoint} 
                      onChange={(e) => setSelectedDeparturePoint(e.target.value)}
                      className="w-full px-3 py-2 border rounded form-input"
                    >
                      {selectedBus.departurePoints.map((point, index) => (
                        <option key={index} value={point}>{point}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dropping Point</label>
                    <select 
                      value={selectedDroppingPoint} 
                      onChange={(e) => setSelectedDroppingPoint(e.target.value)}
                      className="w-full px-3 py-2 border rounded form-input"
                    >
                      {selectedBus.droppingPoints.map((point, index) => (
                        <option key={index} value={point}>{point}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-medium text-gray-800 mb-4">Fare Details</h3>
                  <p><span className="font-medium">Per Seat:</span> ₹{selectedBus.fare}</p>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Seats</label>
                    <select 
                      value={seats} 
                      onChange={(e) => setSeats(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border rounded form-input"
                    >
                      {[...Array(10).keys()].map(i => (
                        <option key={i+1} value={i+1}>{i+1}</option>
                      ))}
                    </select>
                  </div>
                  <p className="mt-3 font-bold"><span className="font-medium">Total Fare:</span> ₹{calculateTotalFare()}</p>
                  
                  <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                    <h4 className="font-medium text-yellow-800 mb-1">Cancellation Policy</h4>
                    <p className="text-sm text-yellow-700">
                      - 100% refund if cancelled 24hrs before departure<br />
                      - 50% refund if cancelled 12hrs before departure<br />
                      - No refund within 12hrs of departure
                    </p>
                  </div>
                </div>
              </div>
              
              <SeatSelection 
                bus={selectedBus} 
                onSeatSelect={handleSeatSelect}
                userGender={gender}
              />
              
              <form onSubmit={handleBooking}>
                <h3 className="font-medium text-gray-800 mb-4">Passenger Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Name as per ID" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                      className="w-full px-4 py-2 border rounded form-input" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                      className="w-full px-4 py-2 border rounded form-input" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input 
                      type="number" 
                      placeholder="Age" 
                      value={age} 
                      onChange={(e) => setAge(e.target.value)} 
                      min="1" 
                      max="100" 
                      required 
                      className="w-full px-4 py-2 border rounded form-input" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select 
                      value={gender} 
                      onChange={(e) => setGender(e.target.value)} 
                      required 
                      className="w-full px-4 py-2 border rounded form-input"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
                    <textarea 
                      placeholder="Wheelchair access, dietary needs, etc." 
                      className="w-full px-4 py-2 border rounded form-input" 
                      rows="2"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-8">
                  <button 
                    type="button" 
                    onClick={() => setShowBookingForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded hover:from-blue-700 hover:to-purple-700 transition duration-300"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </div>
          )}

          {showSlip && bookingDetails && (
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="text-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-2xl font-bold text-green-800 mt-2">Booking Confirmed!</h2>
                <p className="text-green-600">Your ticket has been booked successfully.</p>
                <p className="text-sm mt-2 bg-green-100 inline-block px-2 py-1 rounded">
                  PNR: {bookingDetails.pnr}
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h3 className="font-bold text-lg mb-3 border-b pb-2">Booking Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Passenger Details</h4>
                    <p><span className="font-medium">Name:</span> {bookingDetails.name}</p>
                    <p><span className="font-medium">Age:</span> {bookingDetails.age}</p>
                    <p><span className="font-medium">Gender:</span> {bookingDetails.gender}</p>
                    <p><span className="font-medium">Email:</span> {bookingDetails.email}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Journey Details</h4>
                    <p><span className="font-medium">From:</span> {bookingDetails.fromStation} ({bookingDetails.departurePoint})</p>
                    <p><span className="font-medium">To:</span> {bookingDetails.toStation} ({bookingDetails.droppingPoint})</p>
                    <p><span className="font-medium">Date:</span> {bookingDetails.travelDate}</p>
                    <p><span className="font-medium">Seat:</span> {bookingDetails.selectedSeat}</p>
                    <p><span className="font-medium">Seats:</span> {bookingDetails.seats}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Bus Details</h4>
                    <p><span className="font-medium">Bus Name:</span> {bookingDetails.selectedBus.busName}</p>
                    <p><span className="font-medium">Bus Number:</span> {bookingDetails.selectedBus.busNumber}</p>
                    <p><span className="font-medium">Type:</span> {bookingDetails.selectedBus.busType}</p>
                    <p><span className="font-medium">Departure:</span> {bookingDetails.selectedBus.departureTime}</p>
                    <p><span className="font-medium">Arrival:</span> {bookingDetails.selectedBus.arrivalTime}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Fare Details</h4>
                    <p><span className="font-medium">Per Seat:</span> ₹{bookingDetails.selectedBus.fare}</p>
                    <p><span className="font-medium">Total Seats:</span> {bookingDetails.seats}</p>
                    <p className="font-bold text-lg mt-2"><span className="font-medium">Total Amount:</span> ₹{bookingDetails.totalFare}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
                <h4 className="font-medium text-yellow-800 mb-2">Important Notes</h4>
                <ul className="list-disc pl-5 text-yellow-800 space-y-1">
                  <li>Please carry a valid ID proof during the journey</li>
                  <li>Arrive at least 30 minutes before departure time</li>
                  <li>Boarding point: {bookingDetails.departurePoint}</li>
                  <li>Dropping point: {bookingDetails.droppingPoint}</li>
                  <li>An email with your ticket details has been sent to {bookingDetails.email}</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={downloadSlip}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded hover:from-blue-700 hover:to-purple-700 flex items-center justify-center gap-2 transition duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Ticket
                </button>
                
                <button 
                  onClick={() => {
                    setShowSlip(false);
                    setShowBookingForm(false);
                    setSearchPerformed(false);
                    setAvailableBuses([]);
                    setSelectedSeat(null);
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 flex items-center justify-center gap-2 transition duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Book Another Ticket
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">
          <p>Need help? Call our customer support at 1800-BUS-HELP</p>
          <p className="mt-1">© {new Date().getFullYear()} Bus Booking System. All rights reserved.</p>
        </div>
      </div>
      <TravelCards />
      <LegalPages />
      <AIChatbot />
      
      {showPaymentModal && (
        <PaymentModal 
          totalAmount={calculateTotalFare()}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
};

export default Home;