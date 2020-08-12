import React from 'react';
import styled from 'styled-components';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const PanelBox = styled(Box)`
  width: 45vw;

  display: flex;
  flex-direction: column;
`;

const PanelHeader = styled(Typography)`
  text-align: center;
  margin: 1.5vh 0 1vh 0;
  
  flex-grow: 0;
`;

const ChildrenBox = styled(Box)`
  overflow-y: scroll;
  
  flex-grow: 1;
`;


const Panel = (props) => {
  return (
    <PanelBox>
      <PanelHeader color="primary" variant="h5" component="h1">
        {props.header}
      </PanelHeader>
      <ChildrenBox>
        {props.children}
      </ChildrenBox>
    </PanelBox>
  );
};

export default Panel;