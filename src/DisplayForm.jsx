//import { retrieveSafePassingTime } from "../utils/database.mjs";
export default function DisplayForm({ query }) {
    // const data = await retrieveSafePassingTime(query.startDate, query.endDate);
    return (
        <div className="DisplayForm">
            Return query for {query.startDate} - {query.endDate}
            {/* {data.map(d => console.log(d))} */}
        </div>

    );

}