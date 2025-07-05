import React from 'react';

const Home = ({ onStart }) => {
  return (
    <div>
      <h1>🔗 Welcome to QuickLinkify</h1>
      <p>Simplify your links, track them, and share instantly.</p>
      <button onClick={onStart}>Get Started</button>
    </div>
  );
};

export default Home;
