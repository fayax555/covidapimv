const express = require('express');
// const puppeteer = require('puppeteer');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
const port = process.env.PORT || 3000;

const allowCrossDomain = function (req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Content-Length, X-Requested-With'
   );

   // intercept OPTIONS method
   if ('OPTIONS' == req.method) {
      res.send(200);
   } else {
      next();
   }
};

app.use(allowCrossDomain);

app.get('/', async (req, res) => {
   res.send('COVID API. Go to /mihaaru - covid data avalable at mihaaru.com');
});

app.get('/mihaaru', async (req, res) => {
   request(
      'https://mihaaru.com/covid_19?ref=mhr-mn',
      (error, response, html) => {
         if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            const items = [];
            $('.text-lg').each((i, el) => {
               const item = $(el).text();
               items.push(item);
            });

            // w - Worldwide, rest - Maldives
            const [
               ,
               wTotal,
               wRecovered,
               wActive,
               wDeaths,
               ,
               newCases,
               total,
               recovered,
               active,
               deaths,
               hospitalized,
               isolated,
               vaccinated,
            ] = items;

            let dateEl = [];
            $('.text-14px').each((i, el) => {
               dateEl.push($(el).text().replace(/\s\s+/g, ''));
            });

            const date = dateEl[4];

            res.json({
               date,
               wTotal,
               wRecovered,
               wActive,
               wDeaths,
               newCases,
               total,
               recovered,
               active,
               deaths,
               hospitalized,
               isolated,
               vaccinated,
            });
         }
      }
   );
});

app.listen(port, () => {
   console.log(`port listening on http://localhost:${port}`);
});
