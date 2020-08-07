import React from 'react';
import styled from 'styled-components';

import { getQuery } from '../../services/query-service';

import ReportItem from '../report-item';


const ReportList = () => {

  const [reports, setReports] = React.useState({});

  // getQuery('/reports')
  //   .then(setReports)
  //   .catch(console.log);

  // const createReportItemArray = (reports) => {
  //   let arr = [];
  //   for (value in Object.values(reports)) {
  //     arr.push(<ReportItem report={value} />)
  //   }
  // }


  return (
    <div>
      {JSON.stringify(reports)}
      {/* {createReportItemArray(reports)} */}
      {/* <ReportItem reports={reports} /> */}
    </div>
  );
};


export default ReportList;