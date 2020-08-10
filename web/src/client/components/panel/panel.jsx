import React from 'react';
import styled from 'styled-components';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const PanelBox = styled(Box)`
  width: 45vw;

  padding-bottom: 2vh;

  display: flex;
  flex-direction: column;
`;

const PanelHeader = styled(Typography)`
  text-align: center;
  font-size: 26px;

  flex-grow: 0;
`;

const ChildrenBox = styled(Box)`
  overflow-x: scroll;
  
  flex-grow: 1;
`;


const Panel = (props) => {
  return (
    <PanelBox>
      <PanelHeader color="primary">
        {props.header}
      </PanelHeader>
      <ChildrenBox>
        {props.children}
      </ChildrenBox>
    </PanelBox>
  );
};

export default Panel;