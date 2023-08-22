const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/tidal-data');
const Tidelevel = require('../models/tidelevel');

const populateData = async (data) => {
    await Tidelevel.deleteMany({});
    await Tidelevel.insertMany(data, { ordered: true });
}

const retrieveSafePassingTime = async () => {
    const data = await Tidelevel.find({ v: { $lt: 3 } }).exec();
    return data;
}

const findIntervals = (data) => {
    const intervals = new Array();
    data.map(d => console.log(d.t, d.v));
    for (let i = 1; i < data.length - 1; i++) {
        if (data[i].v > data[i - 1].v && data[i].v > data[i + 1].v) {
            const isStart = data[i + 1].t - data[i].t === 15 * 60 * 1000;
            if (isStart) {
                intervals.push(i - 1);
                intervals.push(i);
            } else {
                intervals.push(i);
                intervals.push(i + 1);
            }
        }
    }
    return intervals.slice(1, -1);
}

const groupdDataByDay = (dataOverGivenRange) => {

}

module.exports = { populateData, retrieveSafePassingTime, findIntervals };