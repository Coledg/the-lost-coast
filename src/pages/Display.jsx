import Interval from "./Interval";

export default function Display({ requestFunc, range, data }) {
    return (
        <div className="Display">
            <h3>Return query for {range.startDate} - {range.endDate}</h3>
            <button onClick={requestFunc}>Back To Form</button>
            <div>
                {data.map((d, idx) => <Interval key={idx} interval={d} />)}
            </div>
        </div>

    );

}