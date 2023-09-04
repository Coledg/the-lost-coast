import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Interval from "./Interval";

export default function Display({ requestFunc, range, data }) {
    return (
        <Box
            sx={{
                flexGrow: 1,
                border: '1px solid',
                p: 5,
                m: 10,
                textAlign: 'center',
                borderColor: 'primary.main',
                borderRadius: '10px',
                color: 'black',
                bgcolor: '#fafafa'
            }}
            className="Display">
            <div><b>Return query for {range.requestedStart} - {range.requestedEnd}</b></div>
            <Button
                sx={{ m: 2 }}
                variant="contained"
                size="large"
                onClick={requestFunc}
            >
                Back To Form
            </Button>
            <div>
                {data.map((d, idx) => <Interval key={idx} interval={d} />)}
            </div>
        </Box>

    );

}