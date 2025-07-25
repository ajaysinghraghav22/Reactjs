import React from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Slider from 'react-slick';
import 'leaflet/dist/leaflet.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TravelCards.css';

const TravelCards = () => {
  const govtBuses = [
    {
      id: 1,
      title: "Haryana Roadways",
      description: "Affordable and reliable government bus service across Haryana",
      features: ["AC/Non-AC options", "Frequent schedules", "Priority seating"],
      price: "₹200-500",
      images: [
        "https://coachbuildersindia.com/wp-content/uploads/2024/01/Haryana-Roadways-Delhi-to-Yamunanagar-bus-timetable-fare-online-booking-1024x536.webp",
        "https://www.arthparkash.com/uploads/Haryana-Roadways-Bus.jpg"
      ],
    },
    {
      id: 2,
      title: "Punjab Roadways",
      description: "State-run buses connecting major cities in Punjab",
      features: ["Comfortable seating", "On-time service", "Luggage space"],
      price: "₹150-400",
      images: [
        "https://indiabuses.wordpress.com/wp-content/uploads/2018/08/punjab-roadways-bus-ashok-leyland-red-49.jpg?w=1024",
        "https://i0.wp.com/indiabuses.wordpress.com/wp-content/uploads/2018/08/punjab-roadways-bus-ashok-leyland-red-45.jpg?w=309&h=174&ssl=1"
      ],
    },
    {
      id: 3,
      title: "HRTC (Himachal)",
      description: "Connecting the hilly regions of Himachal Pradesh",
      features: ["Good connectivity in mountains", "Scenic routes"],
      price: "₹250-600",
      images: [
        "https://mir-s3-cdn-cf.behance.net/project_modules/fs/e4e0b838758867.576d85d76c5c4.jpg",
        "https://mir-s3-cdn-cf.behance.net/project_modules/source/db755838758867.576d85d76d8df.jpg"
      ],
    }
   
  ];

  const privateBuses = [
    {
      id: 1,
      title: "Volvo Luxury",
      description: "Premium private bus service with modern amenities",
      features: ["Fully AC", "Reclining seats", "Entertainment system"],
      price: "₹800-1500",
      images: [
        "https://buscdn.cardekho.com/in/volvo/9400-b11r/volvo-9400-b11r.jpg?impolicy=resize&imwidth=480",
        "https://minivanhiredelhi.com/uploads/19379_volvo-53-seater-multiaxle-6.jpg"
      ],
    },
    {
      id: 2,
      title: "Sleeper Coach",
      description: "Overnight travel with comfortable sleeping berths",
      features: ["Individual berths", "Blankets provided", "Charging ports"],
      price: "₹1000-2000",
      images: [
        "https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/9600-15m-sleeper-R_01a-hires?qlt=82&wid=1024&ts=1660036336151&dpr=off&fit=constrain",
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgp0MJErT6yFnY79Wh54VOC0AF8x8etA-ro8BX0L6YKjxs1G3mnywuzeK47_6tVMpeTVe66QXbh2Zri0a1meqNyWmbINDcPBH0Lwx-SqQ59gXYX17CkrS0b8dQ78O3LUKOyN0HZvCebNuU/s320/DSCN1268.JPG"
      ],
    },
  ];

  const famousPlaces = [
    {
      id: 1,
      name: "Taj Mahal, Agra (UP)",
      images: [
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        "https://whc.unesco.org/uploads/thumbs/event_567-890-520-20090915151635.jpg"
      ],
      description: "The iconic white marble mausoleum, a UNESCO World Heritage Site.",
      specialities: ["Symbol of love", "Mughal architecture", "Intricate marble inlay work"],
      latitude: 27.1751,
      longitude: 78.0421,
    },
    {
      id: 2,
      name: "Golden Temple, Amritsar (Punjab)",
      images: [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/6b/92/ef/caption.jpg?w=1200&h=-1&s=1",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYcXgVJwVeu0Tj39fYColEI1WNva8KFx__HQ&s"
      ],
      description: "The holiest Gurdwara of Sikhism, known for its golden dome and serene Sarovar.",
      specialities: ["Spiritual significance", "Community kitchen (Langar)", "Beautiful architecture"],
      latitude: 31.6200,
      longitude: 74.8766,
    },
    {
      id: 3,
      name: "Shimla (Himachal)",
      images: [
        "https://scontent.faip1-1.fna.fbcdn.net/v/t39.30808-6/484872471_1067688655385439_1383657202091969333_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=rXenzLuI4PwQ7kNvwFjKLqk&_nc_oc=AdmUR_2INrE4V3KLAD_2GZzlZd8ZcyOduITkwXB15eCBboeGzpTC5xUQMXDSdC1nGGwaVlgURVbrbLCWJvW4pfzK&_nc_zt=23&_nc_ht=scontent.faip1-1.fna&_nc_gid=olT4ZksMy15CVD3DcDWkiA&oh=00_AfGG5gG5YSIE-V74yGETl4i0zzChayMQf4knwFXyFdy7JA&oe=681186AF",
        "https://miro.medium.com/v2/resize:fit:750/1*0V-8k6WJJFnHB1bAfBKAMw.jpeg"
      ],
      description: "The 'Queen of Hills', known for its colonial architecture and scenic views.",
      specialities: ["The Mall Road", "Toy Train", "Colonial buildings"],
      latitude: 31.1048,
      longitude: 77.1734,
    },
    {
      id: 4,
      name: "Varanasi (UP)",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTW2L70BMkaqrf_4rFciCol44Iw8lyas4oxg&s",
        "https://t4.ftcdn.net/jpg/04/08/25/05/360_F_408250543_MVaEVGeWxb4FiFy7mEGKj8nfYkwoAZON.jpg"
      ],
      description: "The spiritual capital of India, famous for its ghats and ancient rituals.",
      specialities: ["Ganga Aarti", "Kashi Vishwanath Temple", "Sarnath"],
      latitude: 25.3216,
      longitude: 82.9785,
    },
    {
      id: 5,
      name: "Manali (Himachal)",
      images: [
        "https://manalitourism.co.in/images/places-to-visit/headers/beas-river-manali-header-manali-tourism.jpg.jpg",
        "https://www.tourmyindia.com/blog//wp-content/uploads/2021/02/Best-Places-to-Visit-in-May-in-India.jpg"
      ],
      description: "A popular hill station with adventure activities and stunning Himalayan landscapes.",
      specialities: ["Beas River", "Solang Valley", "Hadimba Devi Temple"],
      latitude: 32.2432,
      longitude: 77.1892,
    },
    {
      id: 6,
      name: "Chandigarh",
      images: [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/4c/43/64/the-rock-garden-of-chandigarh.jpg?w=1600&h=900&s=1",
        "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2017/05/sukhna-lake-weed-735x400-1494932001.jpg"
      ],
      description: "A well-planned city known for its modern architecture and gardens.",
      specialities: ["Rock Garden", "Sukhna Lake", "Rose Garden"],
      latitude: 30.7333,
      longitude: 76.7794,
    },
  ];

  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.6 },
    },
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="travel-cards-container">
      {/* Government Buses Section */}
      <section className="section govt-buses">
        <h2 className="section-title">Government Buses</h2>
        <p className="section-subtitle">Explore state-run bus services</p>
        <div className="cards-grid">
          {govtBuses.map((bus) => (
            <motion.div
              key={bus.id}
              className="card govt-card"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
            >
              <div className="card-header">
                <h3>{bus.title}</h3>
                <span className="price-badge">{bus.price}</span>
              </div>
              <div className="card-image-container">
                <Slider {...sliderSettings}>
                  {bus.images.map((img, index) => (
                    <div key={index}>
                      <img src={img} alt={`${bus.title} ${index + 1}`} className="card-image" />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="card-content">
                <p className="card-description">{bus.description}</p>
                <ul className="features-list">
                  {bus.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
             
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Private Buses Section */}
      <section className="section private-buses">
        <h2 className="section-title">Private Buses</h2>
        <p className="section-subtitle">Discover comfortable private bus options</p>
        <div className="cards-grid">
          {privateBuses.map((bus) => (
            <motion.div
              key={bus.id}
              className="card private-card"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
            >
              <div className="card-header">
                <h3>{bus.title}</h3>
                <span className="price-badge">{bus.price}</span>
              </div>
              <div className="card-image-container">
                <Slider {...sliderSettings}>
                  {bus.images.map((img, index) => (
                    <div key={index}>
                      <img src={img} alt={`${bus.title} ${index + 1}`} className="card-image" />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="card-content">
                <p className="card-description">{bus.description}</p>
                <ul className="features-list">
                  {bus.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
             
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Famous Places Section */}
      <section className="section famous-places">
        <h2 className="section-title">Explore Destinations</h2>
        <p className="section-subtitle">Discover beautiful places in India</p>
        <div className="places-grid">
          {famousPlaces.map((place) => (
            <motion.div
              key={place.id}
              className="place-card"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.1 }}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
            >
              <div className="place-image-container">
                <Slider {...sliderSettings}>
                  {place.images.map((img, index) => (
                    <div key={index}>
                      <img src={img} alt={place.name} className="place-image" />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="place-content">
                <h3>{place.name}</h3>
                <p className="place-description">{place.description}</p>
                <div className="specialities">
                  <p className="specialities-title">Specialities:</p>
                  <ul className="specialities-list">
                    {place.specialities.map((speciality, index) => (
                      <li key={index}>{speciality}</li>
                    ))}
                  </ul>
                </div>
               
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="section map-section">
        <h2 className="section-title">Places on Map</h2>
        <p className="section-subtitle">See the destinations on a map</p>
        <motion.div
          className="map-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <MapContainer 
            center={[28.6139, 77.2090]} 
            zoom={5} 
            style={{ height: '400px', width: '100%', borderRadius: '12px' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {famousPlaces.map((place) => (
              <Marker key={place.id} position={[place.latitude, place.longitude]}>
                <Popup>
                  <div className="map-popup">
                    <h4>{place.name}</h4>
                    <p>{place.description.substring(0, 80)}...</p>
                    <img 
                      src={place.images[0]} 
                      alt={place.name} 
                      style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '4px' }} 
                    />
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>
      </section>
    </div>
  );
};

export default TravelCards;