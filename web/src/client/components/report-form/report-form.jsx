import React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


const MyForm = styled.form`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;  
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const MyButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
`;


const ReportForm = ({ report }) => {
  const getInputFields = (report) => {
    return report.fields.map((f) => (
      <Grid item xs={6} key={f.id} >
        <StyledTextField label={f.name} name={f.id} key={f.id} />
      </Grid>
    ));
  };

  return (
    <MyForm action="api/start" method="post">
      <Grid container spacing={1} >
        {getInputFields(report)}
        <Grid item xs={6}>
          <MyButton variant="contained" color="primary" type="submit" >
            Отправить
          </MyButton>
        </Grid>
      </Grid>
    </MyForm>
  );
};

export default ReportForm;
