import React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const MyForm = styled.form`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;  
`;

const MyTextField = styled(TextField)`
  width: 47%;
`;

const MyButton = styled(Button)`
  width: 47%;
  margin-top: 10px;
`;


const ReportForm = ({ report }) => {

  const getInputFields = (report) => {
    return report.fields.map((f) => (
      <MyTextField label={f.name} name={f.id} key={f.id} />
    ));
  }

  return (
    <MyForm action="api/start" method="post">
      {getInputFields(report)}
      <MyButton variant="contained" color="primary" type="submit" >
        Отправить
      </MyButton>
    </MyForm>
  );
};


export default ReportForm;