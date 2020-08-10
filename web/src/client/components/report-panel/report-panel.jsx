import React from 'react';
import styled from 'styled-components';

import Panel from '../panel';
import ReportItem from '../report-item';

import CircularProgress from '@material-ui/core/CircularProgress';


const ReportPanel = ({reports, expanded, setExpanded}) => {

  const handleChange = (reportId) => (event, isExpanded) => {
    setExpanded(isExpanded ? reportId : null);
  }

  // TODO: подумать над оптимизацией
  const createReportItemArray = (reports) => {
    let arr = [];
    for (let report of Object.values(reports)) {
      arr.push(<ReportItem 
        expanded={expanded === report.id} //
        report={report} 
        key={report.id} 
        onChange={handleChange(report.id)} //
      />);
    }
    return arr;
  }
  

  return (
    <Panel header="Доступные запросы">
      {reports ? createReportItemArray(reports) : <CircularProgress />}
    </Panel>
  );
};


export default ReportPanel;