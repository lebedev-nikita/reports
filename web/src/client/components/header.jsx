import React from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const Root = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: #1976d2;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.24);
  color: #fff;
  position: relative;
`;

const Name = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  left: 15px;
`;

const ShortName = styled(Typography)`
  font-size: 30px;
  font-weight: bold;
`;

const FullName = styled(Typography)`
  font-size: 12px;
  line-height: 15px;
  margin-left: 6px;
`;

const Header = ({ page }) => {
  return (
    <Root>
      <Name>
        <ShortName>ВОВ</ShortName>
        <FullName>Витрина отчетов <br/> и выгрузок</FullName>
      </Name>
    </Root>
  );
};

export default Header;
