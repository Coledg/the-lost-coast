const convertFromMs = (timeInMs) => {
    const hour = Math.floor(timeInMs / (60 * 60 * 1000));
    timeInMs %= (60 * 60 * 1000);
    const minute = Math.floor(timeInMs / (60 * 1000));
    return { h: hour, m: minute };
}

const formatTimeToStr = (time) => {
    return `${String(time.h).padStart(2, '0')}h${String(time.m).padStart(2, '0')}m`;
}

export const formatResult = (res) => {
    return {
        start: res.start.toLocaleString('en-GB'),
        end: res.end.toLocaleString('en-GB'),
        time: formatTimeToStr(convertFromMs(res.time))
    }
}

