import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const ExecutionDownload = ({ execution: exec }) => {
  return (
    <Box>
      <Typography>
        <a href={`api/download?execution_id=${exec.id}`}
          download={'report_' + moment(exec.created_at).format('YYYYMMDDhhmmss')}
        >
          Скачать отчёт
        </a>
      </Typography>
    </Box>
  );
};


export default ExecutionDownload;