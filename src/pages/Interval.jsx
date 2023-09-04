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
                    <Typography><b>{interval[0].start.slice(0, interval[0].start.indexOf(','))} - {interval[interval.length
                        - 1].start.slice(0, interval[interval.length - 1].start.indexOf(','))}</b>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {interval.map((i, idx) =>
                        <Typography key={idx}>
                            {i.start} - {i.end} - Duration: {i.time}
                        </Typography>)}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}