export default function FetchForm({ clickFunc }) {
    return (
        <div className="FetchForm">
            <p> Retrieving tidal level predictions as
                reported by the NOAA's Shelter Cove
                station (ID 9418024) for California's
                Lost Coast trail on a 15 minutes
                intervals from start date to end date </p>
            <button onClick={clickFunc}>Fetch NOAA data</button>
        </div>
    );
}