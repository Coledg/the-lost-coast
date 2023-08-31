const convertFromMs = (timeInMs) => {
    const hour = Math.floor(timeInMs / (60 * 60 * 1000));
    timeInMs %= (60 * 60 * 1000);
    const minute = Math.floor(timeInMs / (60 * 1000));
    return { h: hour, m: minute };
}

const formatTimeToStr = (time) => {
    return `${String(time.h).padStart(2, '0')}h${String(time.m).padStart(2, '0')}m`;
}

export const getDateInUTC = (currentDate, daysToIncrement = 0) => {
    currentDate.setDate(currentDate.getDate() + daysToIncrement);
    currentDate.setUTCHours(7, 0, 0, 0);
    return currentDate;
}

const formatResult = (res) => {
    return {
        start: res.start.toLocaleString(),
        end: res.end.toLocaleString(),
        time: formatTimeToStr(convertFromMs(res.time))
    }
}

export const getSafeIntervals = (data, peaks) => {
    const intervals = new Array();
    if (peaks[0] > 1) {
        intervals.push(
            formatResult({
                start: data[0].t,
                end: data[peaks[0] - 1].t,
                time: Math.abs(data[peaks[0] - 1].t - data[0].t)
            }))
    }
    for (let i = 0; i < peaks.length - 1; i++) {
        intervals.push(
            formatResult({
                start: data[peaks[i]].t,
                end: data[peaks[i + 1] - 1].t,
                time: Math.abs(data[peaks[i + 1] - 1].t - data[peaks[i]].t)
            }))
    }
    if (peaks[peaks.length - 1] != data.length - 1) {
        intervals.push(
            formatResult({
                start: data[peaks[peaks.length - 1] + 1].t,
                end: data[data.length - 1].t,
                time: Math.abs(data[data.length - 1].t - data[peaks[peaks.length - 1] + 1].t)
            }))
    }
    return intervals;
}
