const request = require('request');
const cheerio = require('cheerio');

request('https://mihaaru.com/covid_19?ref=mhr-mn', (error, response, html) => {
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
      console.log({
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
});
