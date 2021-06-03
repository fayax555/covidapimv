const express = require('express');
const puppeteer = require('puppeteer');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
const port = process.env.PORT || 3000;

var allowCrossDomain = function (req, res, next) {
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
   res.send(
      'COVID API. /gov for data from covid19mv dashboard and /mihaaru for data avalable at mihaaru.com'
   );
});

app.get('/gov', async (req, res) => {
   const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
   });

   const page = await browser.newPage();

   await page.goto('https://covid19.health.gov.mv/en/?c=0', {
      waitUntil: 'networkidle0',
      timeout: 0,
   });

   // first col
   let [totalCasesEl] = await page.$x('//*[@id="cases_total"]');
   let [activeCasesEl] = await page.$x('//*[@id="cases_active"]');
   let [recoveriesEl] = await page.$x('//*[@id="cases_recovered"]');
   let [totalDeathsEl] = await page.$x('//*[@id="cases_deaths"]');

   const totalCasesJson = await (
      await totalCasesEl.getProperty('textContent')
   ).jsonValue();
   const activeCasesJson = await (
      await activeCasesEl.getProperty('textContent')
   ).jsonValue();
   const recoveriesJson = await (
      await recoveriesEl.getProperty('textContent')
   ).jsonValue();
   const totalDeathsJson = await (
      await totalDeathsEl.getProperty('textContent')
   ).jsonValue();

   const covidDataJson = {
      total: totalCasesJson,
      activeCases: activeCasesJson,
      recoveries: recoveriesJson,
      totalDeaths: totalDeathsJson,
   };

   await browser.close();

   res.json(covidDataJson);
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

            // Worldwide
            const wTotal = items[1];
            const wRecovered = items[2];
            const wActive = items[3];
            const wDeaths = items[4];

            // Maldives
            const newCases = items[6];
            const total = items[7];
            const recovered = items[8];
            const active = items[9];
            const deaths = items[10];
            const hospitalized = items[11];
            const isolated = items[12];
            const vaccinated = items[13];

            // console.log(items);
            // console.log();
            res.json({
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
