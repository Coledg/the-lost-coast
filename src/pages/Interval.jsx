//import { Linter } from "eslint";

export default function Interval({ interval }) {
    return (
        <div className="Interval">
            Start {interval[0].start.slice(0, interval[0].start.indexOf(','))} End {interval[interval.length
                - 1].start.slice(0, interval[interval.length - 1].start.indexOf(','))}
            <ul>
                {interval.map((i, idx) =>
                    <li key={idx}>
                        {i.start} - {i.end} - Duration: {i.time}
                    </li>)}
            </ul>
        </div>
    );
}