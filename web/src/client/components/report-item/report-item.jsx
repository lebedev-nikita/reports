import React from 'react';
import styled from 'styled-components';

import ReportFrom from '../report-form';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const MyAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
`;


const ReportItem = ({ report, expanded, onChange }) => {

  return (
    <Accordion square={true} expanded={expanded} onChange={onChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} >
        <Box>
          <Typography variant="h6" component="h2" > {report.title} </Typography> <br />
          <Typography variant="body1" > {report.description} </Typography>
        </Box>
      </AccordionSummary>
      <MyAccordionDetails>
        <ReportFrom report={report} />
      </MyAccordionDetails>
    </Accordion>
  );
};


export default ReportItem;