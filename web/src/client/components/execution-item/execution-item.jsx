import React from 'react';
import styled from 'styled-components';
import moment from 'moment'

import { Card, CardContent } from '@material-ui/core';

import ExecutionError from '../execution-error/execution-error';
import ExecutionProgress from '../execution-progress';
import ExecutionDownload from '../execution-download';
import ExecutionParams from '../execution-params';

import TestAccordionJson from '../test-accordion-json';
import ExecutionPair from '../execution-pair';


const ExecutionItem = ({ execution: exec }) => {
  
  return (
    <Card variant="outlined" square={true}>
      <CardContent>
        <ExecutionPair
          left={'id'}
          right={exec.id}
        />
        <ExecutionPair
          left={'Дата создания'}
          right={moment(exec.created_at).format('DD.MM.YYYY hh:mm:ss')}
        />
        <ExecutionPair
          left={'Дата запуска'}
          right={moment(exec.started_at).format('DD.MM.YYYY hh:mm:ss')}
        />
        <ExecutionPair
          left={'Создатель'}
          right={exec.creator}
        />
        {
          exec.error
          ? 
          <ExecutionError error={exec.error} /> 
          : 
          exec.progress < 100 
          ?
          <ExecutionProgress progress={exec.progress} />
          :
          <ExecutionDownload execution={exec} />
        }
        <ExecutionParams params={exec.params} />
        {/* <TestAccordionJson header="Полный объект execution:" obj={exec} /> */}
      </CardContent>
    </Card>
  );
};


export default ExecutionItem;
