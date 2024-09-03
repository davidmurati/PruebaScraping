const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/scrape', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.dockerlabs.es/');
    const $ = cheerio.load(data);
    
    const result = [];
    $('title').each((i, element) => {
      result.push($(element).text());
    });
    
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al realizar el scraping');
  }
});

// Exporta el módulo para que Vercel lo use
module.exports = app;