const mongoose = require('mongoose');
mongoose.connect('mongodb://elonmusk:elon1234@ds143070.mlab.com:43070/scrapping');
const Tesla = mongoose.model('Tesla', { name: String });
const puppeteer = require('puppeteer');
const express = require('express');
const app = express();


app.get('/set', async function (req, res) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.leboncoin.fr/voitures/offres/?ca=12_s&c=2&w=3&th=1&q=tesla');
    let titles = await page.evaluate(() => {
        return [...document.querySelectorAll('.item_title')]
            .map((el) => {
                return el.textContent;
            });
    });

    console.log(titles)
    titles.forEach((title) => {
        const car = new Tesla({ name: title });
        car.save();

        console.log(title)
    });

    await browser.close();
    res.send('ok')
});

app.get('/get', function (req, res) {
    Tesla.find({}, function (err, teslas) {
        res.send(teslas);
    });
});

app.listen(4000, function () {
    console.log('Example app listening on port 4000!')
});
