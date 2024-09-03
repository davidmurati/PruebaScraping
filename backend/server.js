const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

// Lista de diferentes User-Agents para rotar
const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0",
  "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/91.0.864.59",
];

// Función para obtener un User-Agent aleatorio
const getRandomUserAgent = () => {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
};

app.get('/scrape', async (req, res) => {
  try {
    // Configura la solicitud con un User-Agent aleatorio
    const { data } = await axios.get('https://www.dockerlabs.es/', {
      headers: {
        'User-Agent': getRandomUserAgent(),
      },
    });

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

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
