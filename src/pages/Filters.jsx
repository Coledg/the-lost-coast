import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";

export default function Filters({ submitFunc }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const submitHandler = async (evt) => {
        evt.preventDefault();
        if (startDate.getUTCHours() < 7) {
            startDate.setDate(startDate.getDate() - 1);
        } else {
            endDate.setDate(endDate.getDate() + 1);
        }
        startDate.setUTCHours(7, 0, 0, 0);
        endDate.setUTCHours(7, 0, 0, 0);
        const requestedStart = startDate.toISOString();
        const requestedEnd = endDate.toISOString();
        const fetchURL = 'http://localhost:3000/retrieve-data?';
        const data = await fetch(fetchURL + new URLSearchParams({
            startDate: requestedStart,
            endDate: requestedEnd
        }))
        const parsedData = await data.json();
        submitFunc({ requestedStart, requestedEnd }, parsedData);
    }
    return (
        <Box
            sx={{
                width: 300,
                height: 350,
                border: '3px solid',
                p: 5,
                m: 10,
                textAlign: 'center',
                borderColor: 'primary.main',
                borderRadius: '10px',
                color: 'black',
                bgcolor: '#fafafa'
            }}
            className="Filters">
            <h2>Find safe passing times for given dates</h2>
            <p>Please specify a time range you would like the trip to take place in. </p>
            <form onSubmit={submitHandler}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        sx={{ pb: 2 }}
                        className="white"
                        label="Start date"
                        value={startDate}
                        onChange={(newStartDate) => setStartDate(newStartDate)}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        sx={{ pb: 2 }}
                        className="white"
                        label="End date"
                        value={endDate}
                        onChange={(newEndDate) => setEndDate(newEndDate)}
                    />
                </LocalizationProvider>
                <Button
                    variant="contained"
                    size="large"
                    onClick={submitHandler}
                >
                    Get Intervals
                </Button>
            </form>
        </Box>
    );
}