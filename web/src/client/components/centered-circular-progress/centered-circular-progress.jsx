import React from 'react';
import styled from 'styled-components';

import { CircularProgress } from '@material-ui/core';


const CenteredCircularProgress = styled(CircularProgress)`
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

export default CenteredCircularProgress;