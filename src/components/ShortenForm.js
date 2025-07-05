import React, { useState } from 'react';

const ShortenForm = ({ onShorten }) => {
  const [urls, setUrls] = useState([
    { originalUrl: '', validity: '', shortcode: '' },
  ]);
  const [error, setError] = useState('');

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const validate = () => {
    for (let i = 0; i < urls.length; i++) {
      const { originalUrl, validity, shortcode } = urls[i];
      const urlRegex = /^https?:\/\/.+/i;

      if (!urlRegex.test(originalUrl)) {
        setError(`Invalid URL format in entry ${i + 1}`);
        return false;
      }

      if (validity && isNaN(validity)) {
        setError(`Validity must be a number in entry ${i + 1}`);
        return false;
      }

      if (shortcode && !/^[a-zA-Z0-9]+$/.test(shortcode)) {
        setError(`Shortcode must be alphanumeric in entry ${i + 1}`);
        return false;
      }
    }

    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onShorten(urls);
    }
  };

  const addField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { originalUrl: '', validity: '', shortcode: '' }]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter Up to 5 URLs</h2>
      {urls.map((url, idx) => (
        <div key={idx} style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label>URL #{idx + 1}:</label><br />
          <input
            type="url"
            placeholder="https://example.com"
            value={url.originalUrl}
            onChange={(e) => handleChange(idx, 'originalUrl', e.target.value)}
            required
          /><br />
          <input
            type="text"
            placeholder="Validity (mins, optional)"
            value={url.validity}
            onChange={(e) => handleChange(idx, 'validity', e.target.value)}
          /><br />
          <input
            type="text"
            placeholder="Preferred Shortcode (optional)"
            value={url.shortcode}
            onChange={(e) => handleChange(idx, 'shortcode', e.target.value)}
          />
        </div>
      ))}
      {urls.length < 5 && (
        <button type="button" onClick={addField}>
          + Add another URL
        </button>
      )}
      <br />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Shorten URLs</button>
    </form>
  );
};

export default ShortenForm;
