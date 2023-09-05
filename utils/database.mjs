import mongoose from 'mongoose';
mongoose.connect('mongodb://127.0.0.1:27017/tidal-data');
import { Tidelevel } from '../models/tidelevel.mjs';
import { shelterCoveID, tidalDataGetter } from './fetch.mjs';
import { formatResult } from './general.mjs';

export const populateData = async () => {
    const beginDate = new Date();
    const beginDateStr = (beginDate.toISOString()).slice(0, 10).replaceAll('-', '');
    const range = '8760';

    await Tidelevel.deleteMany({});
    const data = await tidalDataGetter(shelterCoveID, beginDateStr, range);
    await Tidelevel.insertMany(data, { ordered: true });
}

export const getDateIntervalsForRange = async (startDate, endDate, numOfDays = 3) => {
    const dateIntervalsForRange = new Array();
    const itorStart = new Date(startDate);
    const itorEnd = new Date(endDate);
    itorEnd.setDate(itorEnd.getDate() - (numOfDays - 1));

    for (let i = itorStart; i < itorEnd; i.setDate(i.getDate() + 1)) {
        const iEnd = new Date(i);
        iEnd.setDate(iEnd.getDate() + numOfDays);
        const data = await retrieveSafePassingTime(i, iEnd);
        const startTimes = findStartTimes(data);
        const safeTimes = findSafeTimes(data, startTimes);
        dateIntervalsForRange.push(safeTimes);
    }
    return dateIntervalsForRange;
}

const retrieveSafePassingTime = async (startDate, endDate) => {
    const data = await Tidelevel.find({ $and: [{ v: { $lt: 3 } }, { t: { $gte: startDate } }, { t: { $lte: endDate } }] }).exec();
    return data;
}

const findStartTimes = (data) => {
    const startTimes = new Array();
    const fifteenMins = 15 * 60 * 1000;
    for (let i = 1; i < data.length - 1; i++) {
        if (data[i].v > data[i - 1].v && data[i].v > data[i + 1].v) {
            if (data[i + 1].t - data[i].t === fifteenMins) {
                startTimes.push(i);
            } else {
                startTimes.push(i + 1);
            }
        }
    }
    return startTimes;
}

const findSafeTimes = (data, startTimes) => {
    const safeTimes = new Array();
    if (startTimes[0] > 1) {
        safeTimes.push(
            formatResult({
                start: data[0].t,
                end: data[startTimes[0] - 1].t,
                time: data[startTimes[0] - 1].t - data[0].t
            }))
    }
    for (let i = 0; i < startTimes.length - 1; i++) {
        safeTimes.push(
            formatResult({
                start: data[startTimes[i]].t,
                end: data[startTimes[i + 1] - 1].t,
                time: data[startTimes[i + 1] - 1].t - data[startTimes[i]].t
            }))
    }
    if (startTimes[startTimes.length - 1] != data.length - 1) {
        safeTimes.push(
            formatResult({
                start: data[startTimes[startTimes.length - 1] + 1].t,
                end: data[data.length - 1].t,
                time: data[data.length - 1].t - data[startTimes[startTimes.length - 1] + 1].t
            }))
    }
    return safeTimes;
}
