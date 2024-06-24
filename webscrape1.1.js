const puppeteer = require('puppeteer');

let scrape = async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  const link = 'https://www.google.com/maps/place/Starbucks+SM+City+Manila+Level+1/@14.5901614,120.9796841,17z/data=!4m8!3m7!1s0x3397ca1f600b2e23:0x2b5265a86aa20351!8m2!3d14.5901562!4d120.9822644!9m1!1b1!16s%2Fg%2F11bc7sp0m2?authuser=0&hl=en&entry=ttu';

  try {
    await page.goto(link);

    await page.waitForSelector('.jJc9Ad');

    const readMoreButtons = await page.$$('.w8nwRe.kyuRq');
    for (const button of readMoreButtons) {
      await button.click();
    }

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
