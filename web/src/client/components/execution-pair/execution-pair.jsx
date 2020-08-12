import React from 'react';
import styled from 'styled-components';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const ExecutionPair = ({left, right}) => {;
  return (
    <Box>
      <Typography display="inline" color="textSecondary">
        {left + ': '}
      </Typography>
      <Typography display="inline">
        {right}
      </Typography>
    </Box>
  )
}

export default ExecutionPair;