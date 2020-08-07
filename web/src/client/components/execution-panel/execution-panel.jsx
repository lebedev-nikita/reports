import React from 'react';
import styled from 'styled-components';

import Panel from '../panel';
import PanelHeader from '../panel-header';


const ExecutionPanel = () => {
  return (
    <Panel>
      <PanelHeader>
        Выполненные запросы
      </PanelHeader>
    </Panel>
  );
};


export default ExecutionPanel;