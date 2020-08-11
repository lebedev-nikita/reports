import React from 'react';
import styled from 'styled-components';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';


const ExecutionProgress = ({ progress }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box whiteSpace="nowrap">
        <Typography>Прогресс: </Typography> {/* Сделать, чтобы было inline */}
      </Box>
      <Box width="100%" mr={1} ml={1} >
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(progress)}%`}</Typography>
      </Box>
    </Box>
    // <Box display="flex" >

    // </Box>
    // <LinearProgress variant="determinate" value={progress} />
  );
};


export default ExecutionProgress;