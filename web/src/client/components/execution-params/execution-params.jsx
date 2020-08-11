import React from 'react';
import styled from 'styled-components';

import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const MyAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
`;


const ExecutionParams = ({ params }) => {
  const paramsToString = (params) => {
    return Object.entries(params).map(([key, value]) => {
      return (
        <Box whiteSpace="nowrap" key={key}>
          <Typography>
            {`${key}: ${value}`}
          </Typography>
        </Box>
      )
    })
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} >
        <Typography>
          Посмотреть параметры запроса:
        </Typography>
      </AccordionSummary>
      <MyAccordionDetails display="flex" >
        {/* <Typography> */}
        {paramsToString(params)}
        {/* </Typography> */}
      </MyAccordionDetails>
    </Accordion>
  );
};


export default ExecutionParams;