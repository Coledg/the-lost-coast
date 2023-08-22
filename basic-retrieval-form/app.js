const form = document.querySelector('form');
const startDateElm = document.getElementById('startDate');
const endDateElm = document.getElementById('endDate');
const shelterCoveID = '9418024';

form.addEventListener('submit', (event) => {
    console.log('hello')
    event.preventDefault();
    tidalDataGetter(
        shelterCoveID,
        startDateElm.value.replaceAll("-", ""),
        endDateElm.value.replaceAll("-", "")
    );
})

const tidalDataGetter = async (stationId, beginDate, endDate) => {
    console.log(beginDate, endDate);
    try {
        const res = await fetch('https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?'
            + `station=${stationId}`
            + `&begin_date=${beginDate}`
            + `&end_date=${endDate}`
            + `&product=predictions`
            + '&datum=MLLW'
            + '&units=english'
            + '&time_zone=lst_ldt'
            + '&interval=15'
            + '&format=json'
            + '&application=UCSC_AStudent');
        const data = await res.json()
        console.log(data);
    } catch (err) {
        console.log("Error getting data", err);
    }
}


