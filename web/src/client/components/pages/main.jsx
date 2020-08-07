import React, { useState, useEffect } from 'react';
import { getQuery } from '../../services/query-service'
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

import Header from '../header';
import ReportPanel from '../report-panel';
import ExecutionPanel from '../execution-panel';


import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';


const Root = styled.div`
  width: 100%;
  background-color: rgb(245, 245, 245);
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  height: calc(100vh - 50px);
	justify-content: space-evenly;
	padding: 10vh 0;
`;

const Main = () => {
	const [data, setData] = useState();

	// useEffect(() => {
	// 	(async () => {
	// 		const response = await getQuery(`/getTest`, {});
	// 		setData(response);
	// 	})();
	// }, [])

	return (
		<Root>
			<Header page="main" />
			<Content>
				<ReportPanel />
				<ExecutionPanel />
			</Content>
		</Root>
	)
}

export default Main;
