// const puppeteer = require('puppeteer');

// (async () => {
//    const browser = await puppeteer.launch();
//    const page = await browser.newPage();

//    await page.goto('https://covid19.health.gov.mv/en/?c=0', {
//       waitUntil: 'networkidle0',
//       timeout: 0,
//    });

//    // first col
//    let [totalCasesEl] = await page.$x('//*[@id="cases_total"]');
//    let [activeCasesEl] = await page.$x('//*[@id="cases_active"]');
//    let [recoveriesEl] = await page.$x('//*[@id="cases_recovered"]');
//    let [totalDeathsEl] = await page.$x('//*[@id="cases_deaths"]');

//    const totalCasesJson = await (
//       await totalCasesEl.getProperty('textContent')
//    ).jsonValue();
//    const activeCasesJson = await (
//       await activeCasesEl.getProperty('textContent')
//    ).jsonValue();
//    const recoveriesJson = await (
//       await recoveriesEl.getProperty('textContent')
//    ).jsonValue();
//    const totalDeathsJson = await (
//       await totalDeathsEl.getProperty('textContent')
//    ).jsonValue();

//    browser.close();
// })();
