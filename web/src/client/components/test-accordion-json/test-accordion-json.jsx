import React from 'react';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';


const TestAccordionJson = ({ header, obj }) => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography>
          {header}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {JSON.stringify(obj, null, 2)}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};


export default TestAccordionJson;