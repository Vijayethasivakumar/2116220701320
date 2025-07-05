import React, { useState } from 'react';
import Home from './components/Home';
import ShortenForm from './components/ShortenForm';
import Result from './components/Result';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const [shortenedList, setShortenedList] = useState([]);

  const handleBatchShorten = (list) => {
    const updatedList = list.map((item) => {
      const hash = item.shortcode
        ? item.shortcode
        : Math.random().toString(36).substr(2, 6);
      const shortUrl = `https://qk.ly/${hash}`;
      const expiry = item.validity
        ? new Date(Date.now() + item.validity * 60000).toLocaleString()
        : 'No Expiry';
      return { ...item, shortUrl, expiry };
    });

    setShortenedList(updatedList);
    setPage('result');
  };

  return (
    <div className="container">
      {page === 'home' && <Home onStart={() => setPage('shorten')} />}
      {page === 'shorten' && <ShortenForm onShorten={handleBatchShorten} />}
      {page === 'result' && (
        <Result data={shortenedList} onBackHome={() => setPage('home')} />
      )}
    </div>
  );
}

export default App;
