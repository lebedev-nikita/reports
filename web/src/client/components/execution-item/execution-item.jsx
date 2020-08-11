import React from 'react';
import styled from 'styled-components';
import moment from 'moment'

import { Card, CardContent } from '@material-ui/core';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import ExecutionError from '../execution-error/execution-error';
import ExecutionProgress from '../execution-progress';
import ExecutionDownload from '../execution-download';


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
        {
          exec.error !== null 
          ? 
          <ExecutionError error={exec.error} /> 
          : 
          exec.progress < 100 
          ?
          <ExecutionProgress progress={exec.progress} />
          :
          <ExecutionDownload execution={exec} />
        }
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