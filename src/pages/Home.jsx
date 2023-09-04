import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';

import { Button } from '@mui/material';
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
        <Box
            sx={{
                width: 300,
                height: 300,
                border: '1px solid',
                p: 5,
                m: 10,
                textAlign: 'center',
                borderColor: 'primary.main',
                borderRadius: '10px',
                color: 'black',
                bgcolor: '#fafafa'
            }}
            className="Home">
            <h2>Lost Coast Tidal Data</h2>
            <p> Retrieving tidal level predictions as
                reported by the NOAA's Shelter Cove
                station (ID 9418024) for California's
                Lost Coast trail on a 15 minutes
                intervals from start date to end date </p>

            {isRetrieved === false &&
                <LoadingButton
                    size="large"
                    onClick={handleClick}
                    loading={isRetrieving}
                    variant="contained"
                >
                    Fetch Data
                </LoadingButton>
            }
            {isRetrieved &&
                <Button
                    variant="contained"
                    size="large"
                    onClick={changePage}
                >
                    View Data
                </Button>
            }
            <p style={{ transition: "0.5s opacity", opacity: isRetrieving ? 1 : 0 }}>Retrieving Data...</p>

        </Box>
    );
}