import React from 'react';
import styled from 'styled-components';

import Box from '@material-ui/core/Box';


// const ReportItem = ({report}) => {
const ReportItem = (props) => {
  return (
    <div>
      {JSON.stringify(props)}
    </div>
  );
};


export default ReportItem;