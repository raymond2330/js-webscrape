const puppeteer = require('puppeteer');

let scrape = async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  try {
    await page.goto('https://www.google.com/maps/place/Microsoft/@36.1275216,-115.1728651,17z/data=!3m1!5s0x80c8c416a26be787:0x4392ab27a0ae83e0!4m7!3m6!1s0x80c8c4141f4642c5:0x764c3f951cfc6355!8m2!3d36.1275216!4d-115.1706764!9m1!1b1');

    await page.waitForSelector('.jJc9Ad');

    const reviews = await page.evaluate(() => {
      const reviewElements = document.querySelectorAll('.jJc9Ad');
      const reviews = [];

      reviewElements.forEach(el => {
        let fullName = el.querySelector(".d4r55")?.textContent.trim();
        let postDate = el.querySelector(".rsqaWe")?.textContent.trim();
        let starRating = parseFloat(el.querySelector(".kvMYJc")?.getAttribute("aria-label"));
        let postReview = el.querySelector(".MyEned")?.textContent.trim();

        reviews.push({
          fullName,
          postDate,
          starRating,
          postReview
        });
      });

      return reviews;
    });

    return reviews;
  } catch (error) {
    console.error('Error:', error);
    return [];
  } finally {
    await browser.close();
  }
};

scrape().then((reviews) => {
  console.log(reviews);
});
