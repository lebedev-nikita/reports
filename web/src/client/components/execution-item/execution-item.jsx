import React from 'react';
import styled from 'styled-components';
import moment from 'moment'

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';



const ExecutionItem = ({ execution: exec }) => {
  const paramsToString = (params) => {
    return JSON.stringify(params, null, 2)
  }

  return (
    <Card variant="outlined" square={true}>
      <CardContent>
        <Typography>
          {'Дата создания: ' + moment(exec.created_at).format('DD.MM.YYYY hh:mm:ss')}
        </Typography>
        <Typography>
          {'Дата запуска: ' + moment(exec.started_at).format('DD.MM.YYYY hh:mm:ss')}
        </Typography>
        <Typography>
          {'Создатель: ' + exec.creator}
        </Typography>
        <Accordion>
          <AccordionSummary>
            <Typography>
              Полный объект execution:
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {JSON.stringify(exec)}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};


export default ExecutionItem;