
import React from 'react';

const Navbar = () => {
  const handleClick = (option) => {
    console.log(`Clicked: ${option}`);
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <button onClick={() => handleClick('Home')}>Home</button>
        </li>
        <li>
          <button onClick={() => handleClick('About')}>About</button>
        </li>
        <li>
          <button onClick={() => handleClick('Contact Us')}>Contact Us</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;