import React, { useState, useEffect } from 'react';
import { getQuery } from '../../services/query-service'
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

import Header from '../header';

import CircularProgress from '@material-ui/core/CircularProgress';

const Root = styled.div`
  width: 100%;
  background-color: rgb(245, 245, 245);
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  height: calc(100vh - 50px);
  justify-content: center;
`;

const Main = () => {
	const [data, setData] = useState();

	useEffect(() => {
		(async() => {
			const response = await getQuery(`/getTest`, {});
			setData(response);
		})();
	},[])

	return (
	  <Root>
	    <Header page="main"/>
	    <Content>
			{
				data ? <p>Тест</p> : <CircularProgress />
			}
	    </Content>
	  </Root>
  )
}

export default Main;
