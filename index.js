const express = require('express');
const app = express();
const path = require('path');
const { populateData, retrieveSafePassingTime, findIntervals, groupDataByRange } = require('./utils/database');
const { getSafeIntervals } = require('./utils/general');

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
    const peaks = findIntervals(data);
    const intervals = getSafeIntervals(data, peaks);
    const groupedIntervals = groupDataByRange(intervals);
    res.render('intervals', { groupedIntervals });
})

app.listen(3000, () => {
    console.log('Listening to port 3000');
})