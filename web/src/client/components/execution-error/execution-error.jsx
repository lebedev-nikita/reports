import React from 'react';
import styled from 'styled-components';

import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography';


const ExecutionError = ({ error }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography color="error">
          При подготовке отчета произошла ошибка:
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {error}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};


export default ExecutionError;