import express from 'express';
const app = express();
import path from 'path';
const __dirname = path.resolve();
import { populateData, getDateIntervalsForRange } from './utils/database.mjs';
import cors from 'cors';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/tide-level', async (req, res) => {
    await populateData();
    res.send();
})

app.get('/retrieve-data', async (req, res) => {
    const { startDate, endDate } = req.query;
    const data = await getDateIntervalsForRange(startDate, endDate);
    res.send(data);
})

app.listen(3000, () => {
    console.log('Listening to port 3000');
})