import React from 'react';
import styled from 'styled-components';

import { getQuery } from '../../services/query-service';

import Panel from '../panel';
import ReportItem from '../report-item';

import CircularProgress from '@material-ui/core/CircularProgress';


const ReportPanel = () => {

  const [reports, setReports] = React.useState(0);
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (reportId) => (event, isExpanded) => {
    setExpanded(isExpanded ? reportId : false);
  }

  // TODO: подумать над оптимизацией
  const createReportItemArray = (reports) => {
    let arr = [];
    for (let report of Object.values(reports)) {
      arr.push(<ReportItem 
        // expanded={expanded === report.id}
        report={report} 
        key={report.id} 
        // onChange={handleChange(report.id)}
      />);
    }
    return arr;
  }
  
  React.useEffect(() => {
    getQuery('/reports')
      .then(setReports)
      .catch(console.log);
  }, []);


  return (
    <Panel header="Доступные запросы">
      {reports ? createReportItemArray(reports) : <CircularProgress />}
    </Panel>
  );
};


export default ReportPanel;