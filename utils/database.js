const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/tidal-data');
const Tidelevel = require('../models/tidelevel');
const { shelterCoveID, tidalDataGetter } = require('./fetch')

const populateData = async () => {
    const beginDate = new Date();
    const beginDateStr = (beginDate.toISOString()).slice(0, 10).replaceAll('-', '');
    const range = '8760';
    await Tidelevel.deleteMany({});
    const data = await tidalDataGetter(shelterCoveID, beginDateStr, range);
    await Tidelevel.insertMany(data, { ordered: true });
}

const retrieveSafePassingTime = async (startDate, endDate) => {
    const data = await Tidelevel.find({ $and: [{ v: { $lt: 3 } }, { t: { $gte: startDate } }, { t: { $lte: endDate } }] }).exec();
    return data;
}

const groupdDataByRange = (data) => {

}

const findIntervals = (data) => {
    const intervals = new Array();
    data.map(d => console.log(d.t, d.v));
    for (let i = 1; i < data.length - 1; i++) {
        if (data[i].v > data[i - 1].v && data[i].v > data[i + 1].v) {
            const isStart = data[i + 1].t - data[i].t === 5 * 60 * 1000;
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

module.exports = { populateData, retrieveSafePassingTime, findIntervals };