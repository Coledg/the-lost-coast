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

module.exports = { populateData, retrieveSafePassingTime };