import React from 'react';
import styled from 'styled-components';

import { getQuery } from '../../services/query-service';

import Panel from '../panel';
import ReportItem from '../report-item';

import CircularProgress from '@material-ui/core/CircularProgress';


const ReportPanel = () => {

  const [reports, setReports] = React.useState(0);

  const createReportItemArray = (reports) => {
    let arr = [];
    for (let [key, value] of Object.entries(reports)) {
      arr.push(<ReportItem report={value} key={key} />)
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