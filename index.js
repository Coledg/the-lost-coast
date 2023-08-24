const express = require('express');
const app = express();
const path = require('path');
const { populateData, retrieveSafePassingTime, findIntervals } = require('./utils/database');

app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/tide-level', async (req, res) => {
    await populateData();
    res.render('home');
})

app.get('/input', async (req, res) => {
    res.render('input');
})

app.get('/retrieve-data', async (req, res) => {
    const { startDate, endDate } = req.query;
    const data = await retrieveSafePassingTime(startDate, endDate);
    const intervalsEndpoints = findIntervals(data);
    const intervals = new Array();
    for (let i = 0; i < intervalsEndpoints.length; i += 2) {
        intervals.push({
            start: data[intervalsEndpoints[i]].t,
            end: data[intervalsEndpoints[i + 1]].t
        })
    }
    intervalsEndpoints.map(i => console.log(data[i].v));
    res.render('intervals', { intervals });
})

app.listen(3000, () => {
    console.log('Listening to port 3000');
})