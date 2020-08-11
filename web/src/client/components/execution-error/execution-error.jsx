import React from 'react';
import styled from 'styled-components';

import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'


const ExecutionError = ({ error }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography color="secondary">
          Запрос завершился с ошибкой:
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