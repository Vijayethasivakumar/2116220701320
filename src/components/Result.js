import React from 'react';

const Result = ({ data, onBackHome }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div>
      <h2>✅ Your Shortened URLs</h2>
      {data.map((item, idx) => (
        <div key={idx} className="history-item">
          <p><strong>Original:</strong> {item.originalUrl}</p>
          <p>
            <strong>Shortened:</strong> {item.shortUrl}
            <button className="copy-btn" onClick={() => copyToClipboard(item.shortUrl)}>
              Copy
            </button>
          </p>
          <p><strong>Expiry:</strong> {item.expiry}</p>
          {item.shortcode && <p><strong>Custom Code:</strong> {item.shortcode}</p>}
        </div>
      ))}
      <br />
      <button onClick={onBackHome}>Back to Home</button>
    </div>
  );
};

export default Result;
