import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/url', { originalUrl });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const displayShortenedUrl = () => {
    const fullShortUrl = `http://localhost:5000/${shortUrl}`;

    return (
      <div>
        <p>Shortened URL:</p>
        <a href={fullShortUrl} target="_blank" rel="noopener noreferrer">
          {fullShortUrl}
        </a>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Original URL:
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
        </label>
        <button type="submit">Shorten URL</button>
      </form>
      {shortUrl && displayShortenedUrl()}
    </div>
  );
}

export default App;
