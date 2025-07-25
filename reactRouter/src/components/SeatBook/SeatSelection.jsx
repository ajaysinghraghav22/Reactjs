import React, { useState, useEffect } from 'react';
import { FaFemale, FaMale } from 'react-icons/fa';

const SeatSelection = ({ bus, onSeatSelect, userGender }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [seatLayout, setSeatLayout] = useState([]);

  // Initialize seat layout when bus is selected
  useEffect(() => {
    if (bus) {
      // Check localStorage for existing bookings
      const savedBookings = JSON.parse(localStorage.getItem('busBookings')) || [];
      const busBookings = savedBookings.filter(b => b.selectedBus.id === bus.id);

      const layout = Array.from({ length: 5 }, (_, row) => 
        Array.from({ length: 4 }, (_, seat) => {
          const seatNumber = row * 4 + seat + 1;
          const isWomenOnly = Math.random() < 0.2;
          
          // Check if seat is already booked
          const booking = busBookings.find(b => b.selectedSeat === seatNumber);
          const isBooked = !!booking;
          const bookedBy = isBooked ? booking.gender.toLowerCase() : null;
          
          return { 
            number: seatNumber, 
            isWomenOnly,
            bookedBy,
            selected: false
          };
        })
      );
      setSeatLayout(layout);
    }
  }, [bus]);

  const handleSeatClick = (seat) => {
    // Don't allow selection if seat is already booked
    if (seat.bookedBy) {
      alert(`Seat ${seat.number} is already booked`);
      return;
    }

    // Don't allow male passengers to select women-only seats
    if (seat.isWomenOnly && userGender === 'male') {
      alert("This seat is reserved for female passengers only");
      return;
    }

    // Toggle seat selection
    const updatedLayout = seatLayout.map(row => 
      row.map(s => ({
        ...s,
        selected: s.number === seat.number ? !s.selected : false
      }))
    );
    
    setSeatLayout(updatedLayout);
    const newSelected = seat.number === selectedSeat ? null : seat.number;
    setSelectedSeat(newSelected);
    onSeatSelect(newSelected);
  };

  const getSeatColor = (seat) => {
    if (seat.bookedBy === 'female') return 'bg-pink-200';
    if (seat.bookedBy === 'male') return 'bg-blue-200';
    if (seat.isWomenOnly) return 'bg-pink-100';
    if (seat.selected) return 'bg-green-200';
    return 'bg-gray-100';
  };

  const getSeatBorder = (seat) => {
    if (seat.bookedBy === 'female') return 'border-2 border-pink-400';
    if (seat.bookedBy === 'male') return 'border-2 border-blue-400';
    if (seat.isWomenOnly) return 'border-2 border-pink-300';
    return 'border border-gray-300';
  };

  return (
    <div className="seat-selection-container p-4 bg-gray-50 rounded-lg mt-4">
      <h3 className="text-lg font-semibold mb-4">Select Your Seat</h3>
      
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-pink-200 rounded-full border-2 border-pink-400"></div>
          <span className="text-sm">Booked by female</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-200 rounded-full border-2 border-blue-400"></div>
          <span className="text-sm">Booked by male</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-pink-100 rounded-full border-2 border-pink-300"></div>
          <span className="text-sm">Women-only</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-200 rounded-full border border-gray-300"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 rounded-full border border-gray-300"></div>
          <span className="text-sm">Selected</span>
        </div>
      </div>

      <div className="bus-seat-map bg-white p-4 rounded-lg shadow-inner">
        <div className="grid grid-cols-4 gap-4">
          {seatLayout.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.map((seat) => (
                <div 
                  key={seat.number}
                  onClick={() => handleSeatClick(seat)}
                  className={`seat w-12 h-12 flex items-center justify-center rounded cursor-pointer transition-all relative
                    ${getSeatColor(seat)}
                    ${getSeatBorder(seat)}
                    ${seat.bookedBy ? 'cursor-not-allowed' : 'hover:bg-gray-200'}
                    ${seat.isWomenOnly && userGender === 'male' ? 'opacity-60 cursor-not-allowed' : ''}
                  `}
                  title={
                    seat.bookedBy ? `Seat ${seat.number} booked by ${seat.bookedBy}` :
                    seat.isWomenOnly ? "Women-only seat" : "Available seat"
                  }
                >
                  {seat.number}
                  {seat.isWomenOnly && !seat.bookedBy && (
                    <span className="absolute bottom-1 right-1 text-pink-500 text-xs">
                      <FaFemale />
                    </span>
                  )}
                  {seat.bookedBy === 'male' && (
                    <span className="absolute bottom-1 right-1 text-blue-500 text-xs">
                      <FaMale />
                    </span>
                  )}
                  {seat.bookedBy === 'female' && (
                    <span className="absolute bottom-1 right-1 text-pink-500 text-xs">
                      <FaFemale />
                    </span>
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <div className="w-24 h-8 bg-gray-300 rounded flex items-center justify-center text-sm">
            Driver Seat
          </div>
        </div>
      </div>

      {selectedSeat && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded flex justify-between items-center">
          <span>Selected seat: {selectedSeat}</span>
          <button 
            onClick={() => {
              setSelectedSeat(null);
              onSeatSelect(null);
              const updatedLayout = seatLayout.map(row => 
                row.map(s => ({
                  ...s,
                  selected: false
                }))
              );
              setSeatLayout(updatedLayout);
            }}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Clear Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;