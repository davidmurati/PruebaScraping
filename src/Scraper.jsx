import React, { useState } from 'react';
import axios from 'axios';
import './Scraper.css';

const Scraper = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleScrape = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/scrape');
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener los datos', error);
    }
    setLoading(false);
  };

  return (
    <div className="scraper-container">
      <h1>Web Scraper</h1>
      <button onClick={handleScrape} disabled={loading}>
        {loading ? 'Scrapeando...' : 'Iniciar Scraping'}
      </button>
      <div className="results">
        {data.length > 0 ? (
          data.map((item, index) => <p key={index}>{item}</p>)
        ) : (
          <p>No hay datos disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Scraper;