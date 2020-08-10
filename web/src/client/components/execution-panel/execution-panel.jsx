import React from 'react';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import ExecutionItem from '../execution-item';
import { getQuery } from '../../services/query-service';



import Panel from '../panel';

const ExecutionPanel = ({executions}) => {

  const createExecutionItemArray = (executions) => {
    return executions.map((exec) => {
      return <ExecutionItem key={exec.id} execution={exec} />
    })
  }


  return (
    <Panel header="Выполныенные запросы">
      {executions ? createExecutionItemArray(executions) : <CircularProgress />}
      {/* <Typography>{JSON.stringify(executions)}</Typography> */}
    </Panel>
  );
};


export default ExecutionPanel;