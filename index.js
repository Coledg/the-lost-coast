const express = require('express');
const app = express();
const path = require('path');
const { shelterCoveID, tidalDataGetter } = require('./utils/fetchUtils');
const { populateData, retrieveSafePassingTime } = require('./utils/dbUtils');

app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/tide-level', (req, res) => {
    res.render('home');
})

app.get('/retrieve-data', async (req, res) => {
    const { startDate, endDate } = req.query;
    const data = await tidalDataGetter(shelterCoveID, startDate.replaceAll("-", ""), endDate.replaceAll("-", ""));
    await populateData(data);
    res.render('data');
})

app.get('/view-data', async (req, res) => {
    const data = await retrieveSafePassingTime();
    data.map(d => console.log(d.t, d.v));
    res.send('Done viewing data');
})

app.listen(3000, () => {
    console.log('Listening to port 3000');
})