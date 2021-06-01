const puppeteer = require('puppeteer');

(async () => {
   const browser = await puppeteer.launch();
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
   let [hospitalizedEl] = await page.$x('//*[@id="cases_critical"]');

   const txtTotalCasesEl = await totalCasesEl.getProperty('textContent');
   const txtActiveCasesEl = await activeCasesEl.getProperty('textContent');
   const txtRecoveriesEl = await recoveriesEl.getProperty('textContent');
   const txtTotalDeathsEl = await totalDeathsEl.getProperty('textContent');
   const hospitalizedEl = await hospitalizedEl.getProperty('textContent');

   const totalCasesJson = await txtTotalCasesEl.jsonValue();
   const activeCasesJson = await txtActiveCasesEl.jsonValue();
   const recoveriesJson = await txtRecoveriesEl.jsonValue();
   const totalDeathsJson = await txtTotalDeathsEl.jsonValue();
   const totalDeathsJson = await hospitalizedEl.jsonValue();

   // second col: daily new cases
   let [newCasesToday] = await page.$x('//*[@id="new_cases_today"]');
   let [maleArea] = await page.$x('//*[@id="today_male_area"]');
   let [atolls] = await page.$x('//*[@id="today_atolls"]');
   let [resorts] = await page.$x('//*[@id="today_resorts"]');
   let [liveaboards] = await page.$x(
      '//*[@id="today_other_tourist_establishments"]'
   );
   let [islandsUnderDevelopment] = await page.$x(
      '//*[@id="today_islands_under_development"]'
   );
   let [industrialIslands] = await page.$x(
      '//*[@id="today_industrial_islands"]'
   );

   console.log(totalCasesJson);
   console.log(activeCasesJson);
   console.log(recoveriesJson);
   console.log(totalDeathsJson);

   browser.close();
})();
