export default function Home({ clickFunc }) {
    const handleClick = async (evt) => {
        evt.preventDefault();
        await fetch('http://localhost:3000/tide-level', { method: "get" })
        clickFunc();
    }
    return (
        <div className="Home">
            <p> Retrieving tidal level predictions as
                reported by the NOAA's Shelter Cove
                station (ID 9418024) for California's
                Lost Coast trail on a 15 minutes
                intervals from start date to end date </p>
            <button onClick={handleClick}>Fetch NOAA data</button>
        </div>
    );
}