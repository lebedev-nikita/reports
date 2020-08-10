import React from 'react';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

import CenteredCircularProgress from '../centered-circular-progress';
import ExecutionItem from '../execution-item';


import Panel from '../panel';

const ExecutionPanel = ({executions}) => {

  const createExecutionItemArray = (executions) => {
    return executions.map((exec) => {
      return <ExecutionItem key={exec.id} execution={exec} />
    })
  }


  return (
    <Panel header="Выполненные запросы">
      {executions ? createExecutionItemArray(executions) : <CenteredCircularProgress />}
    </Panel>
  );
};


export default ExecutionPanel;