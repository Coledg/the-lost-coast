const shelterCoveID = '9418024';
const tidalDataGetter = async (stationId, beginDate, range) => {
    try {
        const res = await fetch('https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?'
            + `station=${stationId}`
            + `&begin_date=${beginDate}`
            + `&range=${range}`
            + `&product=predictions`
            + '&datum=MLLW'
            + '&units=english'
            + '&time_zone=lst_ldt'
            + '&interval=5'
            + '&format=json'
            + '&application=UCSC_AStudent');
        const data = await res.json()
        return (data.predictions);
    } catch (err) {
        console.log("Error getting data", err);
    }
}

module.exports = { shelterCoveID, tidalDataGetter };