const withPuppeteer = require("./withPupetteer");
const withSerpApi = require("./withSerpApi");

withPuppeteer.getLocalPlaceReviews().then((result) => console.dir(result, { depth: null }));

// withSerpApi.getResults().then((result) => console.dir(result, { depth: null }));