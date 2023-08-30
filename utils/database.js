const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/tidal-data');
const Tidelevel = require('../models/tidelevel');
const { shelterCoveID, tidalDataGetter } = require('./fetch')
const { getDateInUTC } = require('./general')

const populateData = async () => {
    const beginDate = new Date();
    const beginDateStr = (beginDate.toISOString()).slice(0, 10).replaceAll('-', '');
    const range = '8760';

    await Tidelevel.deleteMany({});
    const data = await tidalDataGetter(shelterCoveID, beginDateStr, range);
    await Tidelevel.insertMany(data, { ordered: true });
}

const retrieveSafePassingTime = async (startDate, endDate) => {
    const startDateInUTC = getDateInUTC(new Date(startDate));
    const endDateInUTC = getDateInUTC(new Date(endDate), 1);

    const data = await Tidelevel.find({ $and: [{ v: { $lt: 3 } }, { t: { $gte: startDateInUTC } }, { t: { $lte: endDateInUTC } }] }).exec();
    return data;
}

// const groupdDataByRange = (data, numOfDays = 3) => {
//     const intervals = new Array();
//     for (let i = 0; i < data.length - 2; i++) {
//         const maxRange = new Date(data[i].t);
//         maxRange.setDate(data[i].t.getDate() + numOfDays);
//         console.log(data[i].t, maxRange);
//         const currentInterval = new Array();
//         for (let j = i; data[j] && data[j].t < maxRange; j++) {
//             currentInterval.push(data[j])
//         }
//         intervals.push(currentInterval);
//         const nextDay = new Date(data[i].t);
//         nextDay.setUTCHours(0, 0, 0, 0);
//         nextDay.setDate(data[i].t.getDate() + 1);
//         while (data[i].t <= nextDay) i++;
//     }
//     return intervals;
// }

const groupDataByRange = (data, numOfDays = 3) => {
    const endDate = getDateInUTC(new Date(data[data.length - 1].start), 1 - numOfDays);
    const intervals = new Array();
    for (let i = 0; new Date(data[i].end) < endDate;) {
        const endIntervalDate = getDateInUTC(new Date(data[i].start), numOfDays);

        const miniIntervals = new Array();
        for (let j = i; new Date(data[j].end) < endIntervalDate; j++) {
            miniIntervals.push(data[j]);
        }
        intervals.push(miniIntervals);

        const nextDay = getDateInUTC(new Date(data[i].start), 1);
        while (new Date(data[i].start) < nextDay) i++;
    }
    return intervals;
}

const findIntervals = (data) => {
    const peaks = new Array();
    for (let i = 1; i < data.length - 1; i++) {
        if (data[i].v > data[i - 1].v && data[i].v > data[i + 1].v) {
            if (data[i + 1].t - data[i].t === 15 * 60 * 1000) {
                peaks.push(i);
            } else {
                peaks.push(i + 1);
            }
        }
    }
    return peaks;
}

module.exports = { populateData, retrieveSafePassingTime, findIntervals, groupDataByRange };