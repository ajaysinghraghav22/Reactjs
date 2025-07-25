import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AlarmNotification = ({ bus, onClose, alarmSound }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notificationSent, setNotificationSent] = useState(false);
  
  useEffect(() => {
    // Play alarm sound when component mounts
    const playSound = async () => {
      try {
        alarmSound.currentTime = 0;
        await alarmSound.play();
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    };
    
    playSound();
    
    // Show browser notification if permission is granted
    if (Notification.permission === 'granted') {
      new Notification(`Bus Alarm - ${bus.name}`, {
        body: `Time to prepare for your bus to ${bus.to} departing at ${formatTime(bus.departureTime)}`
      });
    }
    
    // Show toast notification
    toast.info(
      <div>
        <p className="font-medium">Alarm: Your {bus.name} to {bus.to} is approaching!</p>
        <p>Departure: {formatTime(bus.departureTime)}</p>
      </div>, 
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: (
          <button 
            onClick={() => {
              alarmSound.pause();
              toast.dismiss();
            }}
            className="text-white hover:text-gray-200"
          >
            Dismiss
          </button>
        )
      }
    );
    
    return () => {
      alarmSound.pause();
    };
  }, [bus, alarmSound]);
  
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };
  
  const sendNotification = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend to handle SMS/email
    console.log(`Notification sent to: Email - ${email}, Phone - ${phone}`);
    setNotificationSent(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-bounce-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-red-600">Bus Alarm!</h2>
          <button 
            onClick={() => {
              alarmSound.pause();
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-4">
          <p className="font-medium">{bus.name} to {bus.to}</p>
          <p>Departure: {formatTime(bus.departureTime)}</p>
        </div>
        
        {!notificationSent ? (
          <form onSubmit={sendNotification}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (for future notifications)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone (for SMS alerts)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+91XXXXXXXXXX"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  alarmSound.pause();
                  onClose();
                }}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                Dismiss
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Send Notifications
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-green-600 font-medium">Notifications sent successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlarmNotification;