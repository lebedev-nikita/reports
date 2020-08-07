import React from 'react';
import styled from 'styled-components';

import Panel from '../panel';
import PanelHeader from '../panel-header';
import ReportList from '../report-list';



// const MyBox = styled(Box)`
//   background-color: yellow;
// `;


const ReportPanel = () => {
  return (
    <Panel>
      <PanelHeader>
        Доступные запросы
      </PanelHeader>
      <ReportList />
    </Panel>
  );
};


export default ReportPanel;