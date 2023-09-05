import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Interval({ interval }) {
    return (
        <div className="Interval">
            <Accordion sx={{ borderRadius: '0px', bordeColor: 'black' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography><b>{interval[0].start.slice(0, 10)} - {interval[interval.length
                        - 1].start.slice(0, 10)}</b>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ul>
                        {interval.map((i, idx) =>
                            <Typography key={idx}>
                                <li>{i.start} - {i.end} - Duration: {i.time}</li>
                            </Typography>)}
                    </ul>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}