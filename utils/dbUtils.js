const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/tidal-data');
const Tidelevel = require('../models/tidelevel');

const insertData = async (data) => {
    const newData = new Tidelevel({ time: data.t, level: parseFloat(data.v) })
    await newData.save();
}

const populateData = async (data) => {
    await Tidelevel.deleteMany({});
    await data.map(d => insertData(d));
}

const retrieveSafePassingTime = async () => {
    const data = await Tidelevel.find({ level: { $lt: 3 } }).exec();
    console.log(data);
}

module.exports = { populateData, retrieveSafePassingTime };