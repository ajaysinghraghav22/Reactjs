import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const cards = [
    {
      title: 'Card Title 1',
      image: 'https://via.placeholder.com/150', 
      description: 'This is the description for card 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      actionText: 'Learn More',
      actionLink: 'https://example.com',
    },
    {
      title: 'Card Title 2',
      image: 'https://via.placeholder.com/150', 
      description: 'This is the description for card 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
   
  ];

  return (
    <div className="card-container">
      {cards.map((cardData) => (
        <Card key={cardData.title} {...cardData} />
      ))}
    </div>
  );
};

export default App;