import express from 'express';
const app = express();
import path from 'path';
const __dirname = path.resolve();
import { populateData, retrieveSafePassingTime, findIntervals, groupDataByRange } from './utils/database.mjs';
import { getSafeIntervals } from './utils/general.mjs';

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/tide-level', async (req, res) => {
    // await populateData();
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

app.get('/input', async (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
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