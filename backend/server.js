const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/scrape', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.dockerlabs.es/'); // URL de ejemplo
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