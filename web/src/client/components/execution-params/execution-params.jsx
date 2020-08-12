import React from 'react';
import styled from 'styled-components';

import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography';

import ExecutionPair from '../execution-pair';


const MyAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
`;


const ExecutionParams = ({ params }) => {

  const paramsToString = (params) => {
    return Object.entries(params).map(([key, value]) => {
      return (
        <ExecutionPair
          key={key}
          left={key}
          right={value}
        />
      );
    });
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} >
        <Typography>
          Посмотреть параметры запроса:
        </Typography>
      </AccordionSummary>
      <MyAccordionDetails display="flex" >
        {paramsToString(params)}
      </MyAccordionDetails>
    </Accordion>
  );
};


export default ExecutionParams;