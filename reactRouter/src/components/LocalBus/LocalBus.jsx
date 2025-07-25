
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LegalPages from '../Term&Privacy/LegalPages';
import TravelCards from '../Cards/TravelCards';
import AlarmNotification from '../AlarmNotify/AlarmNotification';
import alarmSoundFile from '../../assets/audio/mixkit-morning-clock-alarm-1003.wav';
import './LocalBus.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocalBus = () => {
  // States
  const [states] = useState([
    'Haryana', 'Punjab', 'Himachal Pradesh', 'Rajasthan', 
    'Uttar Pradesh', 'Uttarakhand', 'Delhi'
  ]);
  
  const [selectedState, setSelectedState] = useState('');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alarmTime, setAlarmTime] = useState('');
  const [departureDate, setDepartureDate] = useState(getDefaultDate());
  const [busTypes] = useState(['All', 'Government', 'Private', 'Volvo', 'Sleeper']);
  const [selectedBusType, setSelectedBusType] = useState('All');
  const [trackingBus, setTrackingBus] = useState(false);
  const [busPosition, setBusPosition] = useState(null);
  const [routePath, setRoutePath] = useState([]);
  const [progress, setProgress] = useState(0);
  const [activeAlarms, setActiveAlarms] = useState([]);
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  
  const mapRef = useRef(null);
  const trackingInterval = useRef(null);
  const alarmSound = useRef(new Audio(alarmSoundFile));

  // Get default date (today)
  function getDefaultDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  // City coordinates with state information (expanded with rural stations)
  const cityCoordinates = {
    // Haryana
    'Gurugram': { lat: 28.4595, lng: 77.0266, state: 'Haryana' },
    'Faridabad': { lat: 28.4089, lng: 77.3178, state: 'Haryana' },
    'Panipat': { lat: 29.3909, lng: 76.9635, state: 'Haryana' },
    'Karnal': { lat: 29.6857, lng: 76.9905, state: 'Haryana' },
    'Rohtak': { lat: 28.8955, lng: 76.6066, state: 'Haryana' },
    'Hisar': { lat: 29.1492, lng: 75.7217, state: 'Haryana' },
    'Sonipat': { lat: 28.9931, lng: 77.0151, state: 'Haryana' },
    'Rewari': { lat: 28.1992, lng: 76.6167, state: 'Haryana' },
    'Jhajjar': { lat: 28.6065, lng: 76.6565, state: 'Haryana' },
    'Bhiwani': { lat: 28.7930, lng: 76.1397, state: 'Haryana' },
    'Sirsa': { lat: 29.5376, lng: 75.0279, state: 'Haryana' },
    'Ambala': { lat: 30.3782, lng: 76.7767, state: 'Haryana' },
    'Palwal': { lat: 28.1488, lng: 77.3256, state: 'Haryana' },
    'Bahadurgarh': { lat: 28.6923, lng: 76.9358, state: 'Haryana' },
    'Kaithal': { lat: 29.8015, lng: 76.3998, state: 'Haryana' },
    'Kurukshetra': { lat: 29.9695, lng: 76.8783, state: 'Haryana' },
    'Yamunanagar': { lat: 30.1290, lng: 77.2674, state: 'Haryana' },
    'Fatehabad': { lat: 29.5153, lng: 75.4555, state: 'Haryana' },
    'Jind': { lat: 29.3167, lng: 76.3167, state: 'Haryana' },
    'Narnaul': { lat: 28.0444, lng: 76.1083, state: 'Haryana' },
    
    // Punjab
    'Amritsar': { lat: 31.6340, lng: 74.8723, state: 'Punjab' },
    'Ludhiana': { lat: 30.9010, lng: 75.8573, state: 'Punjab' },
    'Jalandhar': { lat: 31.3260, lng: 75.5762, state: 'Punjab' },
    'Patiala': { lat: 30.3398, lng: 76.3869, state: 'Punjab' },
    'Bathinda': { lat: 30.2070, lng: 74.9455, state: 'Punjab' },
    'Hoshiarpur': { lat: 31.5322, lng: 75.9170, state: 'Punjab' },
    'Moga': { lat: 30.8157, lng: 75.1688, state: 'Punjab' },
    'Pathankot': { lat: 32.2746, lng: 75.6527, state: 'Punjab' },
    'Sangrur': { lat: 30.2457, lng: 75.8429, state: 'Punjab' },
    'Barnala': { lat: 30.3745, lng: 75.5487, state: 'Punjab' },
    'Firozpur': { lat: 30.9257, lng: 74.6131, state: 'Punjab' },
    'Fazilka': { lat: 30.4021, lng: 74.0284, state: 'Punjab' },
    'Gurdaspur': { lat: 32.0419, lng: 75.4053, state: 'Punjab' },
    'Kapurthala': { lat: 31.3801, lng: 75.3819, state: 'Punjab' },
    'Malerkotla': { lat: 30.5309, lng: 75.8795, state: 'Punjab' },
    'Muktsar': { lat: 30.4745, lng: 74.5160, state: 'Punjab' },
    'Rupnagar': { lat: 30.9656, lng: 76.5265, state: 'Punjab' },
    'S.A.S. Nagar': { lat: 30.7046, lng: 76.7179, state: 'Punjab' },
    
    // Himachal Pradesh
    'Shimla': { lat: 31.1048, lng: 77.1734, state: 'Himachal Pradesh' },
    'Manali': { lat: 32.2396, lng: 77.1887, state: 'Himachal Pradesh' },
    'Dharamshala': { lat: 32.2190, lng: 76.3234, state: 'Himachal Pradesh' },
    'Solan': { lat: 30.9039, lng: 77.0962, state: 'Himachal Pradesh' },
    'Mandi': { lat: 31.7086, lng: 76.9324, state: 'Himachal Pradesh' },
    'Kullu': { lat: 31.9566, lng: 77.1095, state: 'Himachal Pradesh' },
    'Chamba': { lat: 32.5534, lng: 76.1258, state: 'Himachal Pradesh' },
    'Bilaspur': { lat: 31.3383, lng: 76.7569, state: 'Himachal Pradesh' },
    'Una': { lat: 31.4643, lng: 76.2691, state: 'Himachal Pradesh' },
    'Hamirpur': { lat: 31.6860, lng: 76.5173, state: 'Himachal Pradesh' },
    'Kangra': { lat: 32.1007, lng: 76.2691, state: 'Himachal Pradesh' },
    'Nahan': { lat: 30.5568, lng: 77.2939, state: 'Himachal Pradesh' },
    'Palampur': { lat: 32.1145, lng: 76.5316, state: 'Himachal Pradesh' },
    'Dalhousie': { lat: 32.5330, lng: 75.9180, state: 'Himachal Pradesh' },
    'Kasauli': { lat: 30.8986, lng: 76.9659, state: 'Himachal Pradesh' },
    'Parwanoo': { lat: 30.8376, lng: 76.9619, state: 'Himachal Pradesh' },
    'Rampur': { lat: 31.4499, lng: 77.6306, state: 'Himachal Pradesh' },
    'Theog': { lat: 31.1215, lng: 77.3584, state: 'Himachal Pradesh' },
    'Jogindernagar': { lat: 31.9877, lng: 76.7904, state: 'Himachal Pradesh' },
    
    // Rajasthan
    'Jaipur': { lat: 26.9124, lng: 75.7873, state: 'Rajasthan' },
    'Jodhpur': { lat: 26.2389, lng: 73.0243, state: 'Rajasthan' },
    'Udaipur': { lat: 24.5854, lng: 73.7125, state: 'Rajasthan' },
    'Kota': { lat: 25.2138, lng: 75.8648, state: 'Rajasthan' },
    'Ajmer': { lat: 26.4499, lng: 74.6399, state: 'Rajasthan' },
    'Bikaner': { lat: 28.0229, lng: 73.3119, state: 'Rajasthan' },
    'Alwar': { lat: 27.5535, lng: 76.6344, state: 'Rajasthan' },
    'Bharatpur': { lat: 27.2153, lng: 77.4928, state: 'Rajasthan' },
    'Bhilwara': { lat: 25.3463, lng: 74.6364, state: 'Rajasthan' },
    'Chittorgarh': { lat: 24.8898, lng: 74.6245, state: 'Rajasthan' },
    'Hanumangarh': { lat: 29.5816, lng: 74.3294, state: 'Rajasthan' },
    'Jaisalmer': { lat: 26.9157, lng: 70.9083, state: 'Rajasthan' },
    'Jalore': { lat: 25.3451, lng: 72.6155, state: 'Rajasthan' },
    'Jhunjhunu': { lat: 28.1259, lng: 75.3975, state: 'Rajasthan' },
    'Nagaur': { lat: 27.2020, lng: 73.7339, state: 'Rajasthan' },
    'Pali': { lat: 25.7723, lng: 73.3233, state: 'Rajasthan' },
    'Sikar': { lat: 27.6093, lng: 75.1397, state: 'Rajasthan' },
    'Sirohi': { lat: 24.8826, lng: 72.8589, state: 'Rajasthan' },
    'Tonk': { lat: 26.1667, lng: 75.7881, state: 'Rajasthan' },
    'Dholpur': { lat: 26.7025, lng: 77.8934, state: 'Rajasthan' },
    
    // Uttar Pradesh
    'Lucknow': { lat: 26.8467, lng: 80.9462, state: 'Uttar Pradesh' },
    'Kanpur': { lat: 26.4499, lng: 80.3319, state: 'Uttar Pradesh' },
    'Agra': { lat: 27.1767, lng: 78.0081, state: 'Uttar Pradesh' },
    'Varanasi': { lat: 25.3176, lng: 82.9739, state: 'Uttar Pradesh' },
    'Meerut': { lat: 28.9845, lng: 77.7064, state: 'Uttar Pradesh' },
    'Prayagraj': { lat: 25.4358, lng: 81.8463, state: 'Uttar Pradesh' },
    'Ghaziabad': { lat: 28.6692, lng: 77.4538, state: 'Uttar Pradesh' },
    'Noida': { lat: 28.5355, lng: 77.3910, state: 'Uttar Pradesh' },
    'Aligarh': { lat: 27.8974, lng: 78.0880, state: 'Uttar Pradesh' },
    'Bareilly': { lat: 28.3670, lng: 79.4304, state: 'Uttar Pradesh' },
    'Moradabad': { lat: 28.8389, lng: 78.7768, state: 'Uttar Pradesh' },
    'Saharanpur': { lat: 29.9679, lng: 77.5458, state: 'Uttar Pradesh' },
    'Gorakhpur': { lat: 26.7606, lng: 83.3732, state: 'Uttar Pradesh' },
    'Faizabad': { lat: 26.7555, lng: 82.1526, state: 'Uttar Pradesh' },
    'Jhansi': { lat: 25.4484, lng: 78.5685, state: 'Uttar Pradesh' },
    'Mathura': { lat: 27.4924, lng: 77.6737, state: 'Uttar Pradesh' },
    'Firozabad': { lat: 27.1591, lng: 78.3958, state: 'Uttar Pradesh' },
    'Ayodhya': { lat: 26.7924, lng: 82.1943, state: 'Uttar Pradesh' },
    'Rampur': { lat: 28.8031, lng: 79.0264, state: 'Uttar Pradesh' },
    'Shahjahanpur': { lat: 27.8815, lng: 79.9106, state: 'Uttar Pradesh' },
    
    // Uttarakhand
    'Dehradun': { lat: 30.3165, lng: 78.0322, state: 'Uttarakhand' },
    'Haridwar': { lat: 29.9457, lng: 78.1642, state: 'Uttarakhand' },
    'Rishikesh': { lat: 30.0869, lng: 78.2676, state: 'Uttarakhand' },
    'Nainital': { lat: 29.3919, lng: 79.4542, state: 'Uttarakhand' },
    'Mussoorie': { lat: 30.4598, lng: 78.0644, state: 'Uttarakhand' },
    'Haldwani': { lat: 29.2186, lng: 79.5176, state: 'Uttarakhand' },
    'Roorkee': { lat: 29.8543, lng: 77.8880, state: 'Uttarakhand' },
    'Kashipur': { lat: 29.2136, lng: 78.9569, state: 'Uttarakhand' },
    'Rudrapur': { lat: 28.9800, lng: 79.4000, state: 'Uttarakhand' },
    'Kotdwar': { lat: 29.7469, lng: 78.1304, state: 'Uttarakhand' },
    'Pithoragarh': { lat: 29.5829, lng: 80.2182, state: 'Uttarakhand' },
    'Almora': { lat: 29.5973, lng: 79.6570, state: 'Uttarakhand' },
    'Ranikhet': { lat: 29.6424, lng: 79.4322, state: 'Uttarakhand' },
    'Chamoli': { lat: 30.4136, lng: 79.3212, state: 'Uttarakhand' },
    'Pauri': { lat: 30.1519, lng: 78.7778, state: 'Uttarakhand' },
    'Tehri': { lat: 30.3838, lng: 78.4801, state: 'Uttarakhand' },
    'Uttarkashi': { lat: 30.7286, lng: 78.4436, state: 'Uttarakhand' },
    'Bageshwar': { lat: 29.8404, lng: 79.7699, state: 'Uttarakhand' },
    'Champawat': { lat: 29.3354, lng: 80.0784, state: 'Uttarakhand' },
    'Lansdowne': { lat: 29.8383, lng: 78.6800, state: 'Uttarakhand' },
    
    // Delhi/NCR
    'New Delhi': { lat: 28.6139, lng: 77.2090, state: 'Delhi' },
    'Delhi Cantt': { lat: 28.5846, lng: 77.1326, state: 'Delhi' },
    'Dwarka': { lat: 28.5923, lng: 77.0427, state: 'Delhi' },
    'Rohini': { lat: 28.7392, lng: 77.1219, state: 'Delhi' },
    'Greater Noida': { lat: 28.4744, lng: 77.5040, state: 'Delhi' },
    
    // Union Territories
    'Chandigarh': { lat: 30.7333, lng: 76.7794, state: 'Chandigarh' }
};

  // Get cities for selected state
  const cities = Object.keys(cityCoordinates).filter(
    city => cityCoordinates[city].state === selectedState
  );

  // Format time to AM/PM
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          toast.success('Location accessed successfully');
          
          if (mapRef.current) {
            mapRef.current.flyTo([location.lat, location.lng], 13);
          }
        },
        (error) => {
          toast.error('Unable to retrieve your location');
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
    }
  };

  // Search buses - using mock data for demonstration
  const searchBuses = () => {
    if (!selectedState) {
      toast.warning('Please select a state first');
      return;
    }

    if (!fromCity || !toCity) {
      toast.warning('Please select both from and to cities');
      return;
    }

    if (fromCity === toCity) {
      toast.warning('From and To cities cannot be same');
      return;
    }

    setLoading(true);
    
    // Mock data - in a real app, you would call an API here
    setTimeout(() => {
      const mockBuses = [
        {
          id: 'volvo-1',
          name: `${fromCity}-${toCity} Volvo`,
          operator: 'Private Volvo Service',
          type: 'Volvo',
          from: fromCity,
          to: toCity,
          departureTime: '08:30',
          arrivalTime: '12:30',
          fare: Math.floor(Math.random() * 300) + 500,
          duration: '4h',
          station: `${fromCity} Volvo Terminal`,
          stationLocation: cityCoordinates[fromCity],
          amenities: ['AC', 'Reclining Seats', 'Water Bottle', 'Charging Ports'],
          frequency: 'Daily',
          bookingLink: 'https://www.redbus.in',
          status: 'On Time'
        },
        {
          id: 'gov-1',
          name: `${selectedState} Roadways`,
          operator: `${selectedState} Transport`,
          type: 'Government',
          from: fromCity,
          to: toCity,
          departureTime: '06:00',
          arrivalTime: '11:00',
          fare: Math.floor(Math.random() * 200) + 200,
          duration: '5h',
          station: `${fromCity} Bus Stand`,
          stationLocation: cityCoordinates[fromCity],
          amenities: ['Basic Seats'],
          frequency: 'Every 30 minutes',
          bookingLink: `https://${selectedState.toLowerCase()}transport.gov.in`,
          status: 'On Time'
        },
        {
          id: 'sleeper-1',
          name: `${fromCity}-${toCity} Sleeper`,
          operator: 'Private Sleeper Service',
          type: 'Sleeper',
          from: fromCity,
          to: toCity,
          departureTime: '22:00',
          arrivalTime: '05:00',
          fare: Math.floor(Math.random() * 400) + 600,
          duration: '7h',
          station: `${fromCity} Night Terminal`,
          stationLocation: cityCoordinates[fromCity],
          amenities: ['AC', 'Sleeper Berth', 'Blanket', 'Water Bottle'],
          frequency: 'Daily',
          bookingLink: 'https://www.abhibus.com',
          status: 'On Time'
        },
        {
          id: 'private-1',
          name: `${fromCity}-${toCity} Express`,
          operator: 'Private Bus Service',
          type: 'Private',
          from: fromCity,
          to: toCity,
          departureTime: '14:30',
          arrivalTime: '19:30',
          fare: Math.floor(Math.random() * 250) + 300,
          duration: '5h',
          station: `${fromCity} Private Bus Stand`,
          stationLocation: cityCoordinates[fromCity],
          amenities: ['Semi-Sleeper', 'Water Bottle'],
          frequency: 'Every 2 hours',
          bookingLink: 'https://www.paytm.com/bus-tickets',
          status: 'On Time'
        }
      ];

      setBuses(mockBuses);
      setFilteredBuses(mockBuses);
      setLoading(false);
    }, 1000);
  };

  // Filter buses by type
  useEffect(() => {
    if (selectedBusType === 'All') {
      setFilteredBuses(buses);
    } else {
      setFilteredBuses(buses.filter(bus => bus.type === selectedBusType));
    }
  }, [selectedBusType, buses]);

  // Set destination alarm
  const setDestinationAlarm = () => {
    if (!alarmTime || !selectedBus) {
      toast.warning('Please select a bus and set alarm time');
      return;
    }

    const now = new Date();
    const [hours, minutes] = alarmTime.split(':');
    const alarmDate = new Date();
    alarmDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    
    if (alarmDate < now) {
      alarmDate.setDate(alarmDate.getDate() + 1); // Set for next day if time has passed
    }

    const timeUntilAlarm = alarmDate - now;
    const alarmId = Date.now(); // Unique ID for each alarm

    const alarmTimeout = setTimeout(() => {
      setShowAlarmModal(true);
      
      // Remove this alarm from active alarms
      setActiveAlarms(prev => prev.filter(a => a.id !== alarmId));
    }, timeUntilAlarm);

    // Add to active alarms
    setActiveAlarms(prev => [...prev, {
      id: alarmId,
      timeout: alarmTimeout,
      bus: selectedBus,
      time: alarmTime,
    }]);

    toast.success(`Alarm set for ${formatTime(alarmTime)} for ${selectedBus.name} to ${selectedBus.to}`);
  };

  // Track bus location
  const trackBus = () => {
    if (!selectedBus) {
      toast.warning('Please select a bus first');
      return;
    }

    if (!cityCoordinates[selectedBus.from] || !cityCoordinates[selectedBus.to]) {
      toast.error('Route tracking not available for this bus');
      return;
    }
    
    setTrackingBus(true);
    setProgress(0);
    const path = [
      cityCoordinates[selectedBus.from],
      cityCoordinates[selectedBus.to]
    ];
    setRoutePath(path);
    
    if (mapRef.current) {
      const bounds = L.latLngBounds(path);
      mapRef.current.flyToBounds(bounds, { padding: [50, 50] });
    }

    if (trackingInterval.current) {
      clearInterval(trackingInterval.current);
    }

    const startTime = Date.now();
    const tripDuration = getTripDuration(selectedBus.duration);
    
    trackingInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(0.99, elapsed / tripDuration);
      setProgress(newProgress);
      
      const currentPos = {
        lat: cityCoordinates[selectedBus.from].lat + 
             (cityCoordinates[selectedBus.to].lat - cityCoordinates[selectedBus.from].lat) * newProgress,
        lng: cityCoordinates[selectedBus.from].lng + 
             (cityCoordinates[selectedBus.to].lng - cityCoordinates[selectedBus.from].lng) * newProgress
      };
      
      setBusPosition(currentPos);
      
      if (userLocation) {
        const distance = calculateDistanceBetweenPoints(userLocation, currentPos);
        if (distance < 5) {
          toast.info(`Your bus is ${distance.toFixed(1)} km away!`);
        }
      }
      
      if (newProgress >= 0.99) {
        clearInterval(trackingInterval.current);
        toast.success(`Bus has arrived at ${selectedBus.to}`);
        setTrackingBus(false);
      }
    }, 5000);

    toast.info(`Tracking ${selectedBus.name}`);
  };

  // Helper functions
  const calculateDistanceBetweenPoints = (point1, point2) => {
    const R = 6371;
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.lat * Math.PI / 180) * 
      Math.cos(point2.lat * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getTripDuration = (durationStr) => {
    const hoursMatch = durationStr.match(/(\d+)h/);
    const minsMatch = durationStr.match(/(\d+)m/);
    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const mins = minsMatch ? parseInt(minsMatch[1], 10) : 0;
    return (hours * 60 * 60 * 1000) + (mins * 60 * 1000);
  };

  const stopTracking = () => {
    if (trackingInterval.current) {
      clearInterval(trackingInterval.current);
    }
    setTrackingBus(false);
    toast.info('Stopped tracking bus');
  };

  const closeAlarmModal = () => {
    setShowAlarmModal(false);
    alarmSound.current.pause();
    alarmSound.current.currentTime = 0;
  };

  // Clean up intervals and alarms on unmount
  useEffect(() => {
    return () => {
      if (trackingInterval.current) {
        clearInterval(trackingInterval.current);
      }
      activeAlarms.forEach(alarm => clearTimeout(alarm.timeout));
      alarmSound.current.pause();
    };
  }, []);

  // Request notification permission on component mount
  useEffect(() => {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="local-bus-container">
      <div className="header-section">
        <h1 className="page-title">Local Bus Search</h1>
        <p className="page-subtitle">Find and book buses across Northern India</p>
      </div>
      
      {/* Search Form */}
      <div className="search-form">
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Select State</label>
            <select
              className="form-select"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setFromCity('');
                setToCity('');
              }}
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">From </label>
            <select
              className="form-select"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              disabled={!selectedState}
            >
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">To </label>
            <select
              className="form-select"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              disabled={!selectedState}
            >
              <option value="">Select City</option>
              {cities.filter(city => city !== fromCity).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Departure Date</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="form-select"
              min={getDefaultDate()}
            />
          </div>
          
          <div className="form-group">
            <button
              onClick={searchBuses}
              disabled={!selectedState || !fromCity || !toCity || loading}
              className={`search-button ${
                !selectedState || !fromCity || !toCity || loading 
                  ? 'disabled-button' 
                  : ''
              }`}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Searching...
                </>
              ) : 'Search Buses'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Bus Type Filter */}
      {buses.length > 0 && (
        <div className="filter-section">
          <h2 className="section-title">Filter by Bus Type</h2>
          <div className="filter-buttons">
            {busTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedBusType(type)}
                className={`filter-button ${
                  selectedBusType === type ? 'active-filter' : ''
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Bus List */}
      {loading && (
        <div className="loading-section">
          <div className="spinner"></div>
          <p>Loading buses...</p>
        </div>
      )}
      
      {!loading && filteredBuses.length > 0 && (
        <div className="bus-list-section">
          <h2 className="section-title">Available Buses ({filteredBuses.length})</h2>
          <div className="bus-cards">
            {filteredBuses.map(bus => (
              <div 
                key={bus.id} 
                className={`bus-card ${
                  selectedBus?.id === bus.id ? 'selected-bus' : ''
                }`}
                onClick={() => {
                  setSelectedBus(bus);
                  setBusPosition(bus.stationLocation);
                }}
              >
                <div className="bus-card-header">
                  <div className="bus-name-type">
                    <h3 className="bus-name">{bus.name}</h3>
                    <span className={`bus-type ${bus.type.toLowerCase()}`}>
                      {bus.type}
                    </span>
                  </div>
                  <div className="bus-price-status">
                    <p className="bus-fare">₹{bus.fare}</p>
                    <span className={`bus-status ${bus.status.toLowerCase().replace(' ', '-')}`}>
                      {bus.status}
                    </span>
                  </div>
                </div>
                
                <div className="bus-details">
                  <div className="bus-timing">
                    <p className="bus-time">
                      <span>Dep:</span> {formatTime(bus.departureTime)}
                    </p>
                    <p className="bus-time">
                      <span>Arr:</span> {formatTime(bus.arrivalTime)}
                    </p>
                    <p className="bus-duration">{bus.duration}</p>
                  </div>
                  
                  <div className="bus-route">
                    <p className="bus-route-from">
                      <span>From:</span> {bus.from}
                    </p>
                    <p className="bus-route-to">
                      <span>To:</span> {bus.to}
                    </p>
                  </div>
                  
                  <div className="bus-operator">
                    <p>{bus.operator}</p>
                    <p>Boarding: {bus.station}</p>
                  </div>
                  
                  <div className="bus-amenities">
                    {bus.amenities.map(amenity => (
                      <span key={amenity} className="amenity-tag">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bus-actions">
                  <a 
                    href={bus.bookingLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="book-button"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Selected Bus Details */}
      {selectedBus && (
        <div className="bus-detail-section">
          <div className="bus-detail-header">
            <h2 className="section-title">
              Bus Details: <span className="bus-name-highlight">{selectedBus.name}</span>
            </h2>
            <div className="bus-detail-actions">
              {!trackingBus ? (
                <button
                  onClick={trackBus}
                  className="action-button track-button"
                >
                  Track This Bus
                </button>
              ) : (
                <button
                  onClick={stopTracking}
                  className="action-button stop-button"
                >
                  Stop Tracking
                </button>
              )}
              <a 
                href={selectedBus.bookingLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-button book-button"
              >
                Book Now
              </a>
            </div>
          </div>

          <div className="bus-detail-grid">
            <div className="detail-card">
              <h3 className="detail-card-title">Route Information</h3>
              <div className="detail-list">
                <p><span>Operator:</span> {selectedBus.operator}</p>
                <p><span>From:</span> {selectedBus.from}</p>
                <p><span>To:</span> {selectedBus.to}</p>
                <p><span>Departure:</span> {formatTime(selectedBus.departureTime)}</p>
                <p><span>Arrival:</span> {formatTime(selectedBus.arrivalTime)}</p>
                <p><span>Duration:</span> {selectedBus.duration}</p>
                <p><span>Fare:</span> ₹{selectedBus.fare}</p>
                <p><span>Bus Type:</span> {selectedBus.type}</p>
                <p><span>Frequency:</span> {selectedBus.frequency}</p>
              </div>
            </div>
            
            <div className="detail-card">
              <h3 className="detail-card-title">Station Information</h3>
              <div className="detail-list">
                <p><span>Boarding Point:</span> {selectedBus.station}</p>
                {userLocation && busPosition && (
                  <>
                    <p>
                      <span>Distance from you:</span> 
                      {calculateDistanceBetweenPoints(userLocation, busPosition).toFixed(1)} km
                    </p>
                    <p>
                      <span>Bus status:</span> 
                      {trackingBus ? ' In Transit' : ' At Station'}
                    </p>
                    {trackingBus && (
                      <div className="progress-container">
                        <span>Progress:</span>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${progress * 100}%` }}
                          ></div>
                        </div>
                        <span>{(progress * 100).toFixed(0)}%</span>
                      </div>
                    )}
                  </>
                )}
                {!userLocation && (
                  <button 
                    onClick={getUserLocation}
                    className="location-button"
                  >
                    Calculate distance from your location
                  </button>
                )}
              </div>
            </div>
            
            <div className="detail-card">
              <h3 className="detail-card-title">Alarm & Notifications</h3>
              <div className="alarm-section">
                <div className="alarm-form">
                  <label className="form-label">
                    Set Destination Alarm
                  </label>
                  <div className="alarm-input-group">
                    <input
                      type="time"
                      value={alarmTime}
                      onChange={(e) => setAlarmTime(e.target.value)}
                      className="alarm-time-input"
                    />
                    <button
                      onClick={setDestinationAlarm}
                      className="alarm-set-button"
                    >
                      Set Alarm
                    </button>
                  </div>
                </div>
                
                <div className="tracking-notice">
                  <label className="form-label">
                    Bus Tracking
                  </label>
                  {trackingBus ? (
                    <div className="tracking-active">
                      <p>
                        Tracking active. You'll be notified when the bus is near your location.
                      </p>
                    </div>
                  ) : (
                    <p className="tracking-inactive">
                      Enable tracking to get real-time updates about this bus.
                    </p>
                  )}
                </div>
              </div>

              {/* Active Alarms */}
              {activeAlarms.length > 0 && (
                <div className="active-alarms">
                  <h4 className="alarms-title">Active Alarms</h4>
                  <ul className="alarms-list">
                    {activeAlarms.map(alarm => (
                      <li key={alarm.id} className="alarm-item">
                        <span>
                          {alarm.bus.name} to {alarm.bus.to} at {formatTime(alarm.time)}
                        </span>
                        <button 
                          onClick={() => {
                            clearTimeout(alarm.timeout);
                            setActiveAlarms(prev => prev.filter(a => a.id !== alarm.id));
                            toast.info(`Alarm for ${formatTime(alarm.time)} cancelled`);
                          }}
                          className="cancel-alarm-button"
                        >
                          Cancel
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          {/* Map for Bus Tracking */}
          {(trackingBus || selectedBus) && (
            <div className="bus-map-container">
              <MapContainer 
                center={cityCoordinates[selectedBus.from] || [28.6139, 77.2090]} 
                zoom={10} 
                className="bus-map"
                whenCreated={map => { mapRef.current = map }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {routePath.length > 0 && (
                  <Polyline 
                    positions={routePath} 
                    color="var(--primary-color)"
                    weight={3}
                    opacity={0.7}
                  />
                )}
                
                {cityCoordinates[selectedBus.from] && (
                  <Marker position={cityCoordinates[selectedBus.from]}>
                    <Popup>
                      <div className="map-popup">
                        <div className="popup-title">{selectedBus.from}</div>
                        <div>Departure: {formatTime(selectedBus.departureTime)}</div>
                      </div>
                    </Popup>
                  </Marker>
                )}
                
                {cityCoordinates[selectedBus.to] && (
                  <Marker position={cityCoordinates[selectedBus.to]}>
                    <Popup>
                      <div className="map-popup">
                        <div className="popup-title">{selectedBus.to}</div>
                        <div>Arrival: {formatTime(selectedBus.arrivalTime)}</div>
                      </div>
                    </Popup>
                  </Marker>
                )}
                
                {busPosition && trackingBus && (
                  <Marker position={busPosition}>
                    <Popup>
                      <div className="map-popup">
                        <div className="popup-title">{selectedBus.name}</div>
                        <div>En route to {selectedBus.to}</div>
                        <div>Progress: {(progress * 100).toFixed(0)}%</div>
                      </div>
                    </Popup>
                  </Marker>
                )}
                
                {userLocation && (
                  <Marker position={userLocation}>
                    <Popup>
                      <div className="map-popup">
                        <div className="popup-title">Your Location</div>
                        {busPosition && (
                          <div>Distance to bus: {calculateDistanceBetweenPoints(userLocation, busPosition).toFixed(1)} km</div>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          )}
        </div>
      )}
      
      {/* No Buses Found */}
      {!loading && filteredBuses.length === 0 && selectedState && fromCity && toCity && (
        <div className="no-buses-found">
          <div className="no-buses-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="no-buses-text">No buses found for this route.</p>
          <p className="no-buses-hint">
            Try different cities or check back later for updates.
          </p>
        </div>
      )}
      
      <TravelCards/>
      <LegalPages/>

      {/* Alarm Notification Modal */}
      {showAlarmModal && selectedBus && (
        <AlarmNotification 
          bus={selectedBus} 
          onClose={closeAlarmModal} 
          alarmSound={alarmSound.current}
        />
      )}
    </div>
  );
};

export default LocalBus;