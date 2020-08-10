import React from 'react';
import styled from 'styled-components';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { jssPreset } from '@material-ui/core';


const ReportItem = ({ report, expanded, onChange }) => {

  const getInputFields = (report) => {
    return report.fields.map((f) => (
      <Typography key={report.id + '-' + f.name}>
        {f.name}
      </Typography>
    ));
  }

  return (
    <Accordion square={true} expanded={expanded} onChange={onChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} >
        <Box>
          <Typography> {report.title} </Typography> <br />
          <Typography> {report.description} </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {getInputFields(report)}
      </AccordionDetails>
    </Accordion>
  );
};


export default ReportItem;