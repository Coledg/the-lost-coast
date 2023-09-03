import { useState } from "react";
export default function Home({ clickFunc }) {
    const [isRetrieving, setIsRetrieving] = useState(false);
    const [isRetrieved, setIsRetrieved] = useState(false);
    const handleClick = async (evt) => {
        evt.preventDefault();
        setIsRetrieving(true);
        await fetchAPIData();
    }
    const changePage = () => {
        clickFunc();
    }
    const fetchAPIData = async () => {
        await fetch('http://localhost:3000/tide-level', { method: "get" });
        setIsRetrieving(false);
        setIsRetrieved(true);
    }
    return (
        <div className="Home">
            <p style={{ transition: "1s opacity", opacity: isRetrieving ? 1 : 0 }}>Retrieving Data...</p>
            <p> Retrieving tidal level predictions as
                reported by the NOAA's Shelter Cove
                station (ID 9418024) for California's
                Lost Coast trail on a 15 minutes
                intervals from start date to end date </p>

            {isRetrieved === false && <button onClick={handleClick}>Fetch NOAA data</button>}
            {isRetrieved && <button onClick={changePage}>View Data</button>}
        </div>
    );
}