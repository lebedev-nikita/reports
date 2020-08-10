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
	padding: 5vh 0;
`;

const Main = () => {
	const [reports, setReports] = useState(null);
	const [executions, setExecutions] = useState(null);
	const [expandedReport, setExpandedReport] = useState(null);

	React.useEffect(() => {
		getQuery('/reports')
			.then(setReports)
			.catch(console.log);
	}, []);

	React.useEffect(() => {
		if (expandedReport !== null) {
			getQuery(`/history?report_id=${expandedReport}`)
				.then(setExecutions)
				.catch(console.log);
		} else {
			setExecutions([]);
		}
	}, [expandedReport]);

	return (
		<Root>
			<Header page="main" />
			<Content>
				<ReportPanel reports={reports} expanded={expandedReport} setExpanded={setExpandedReport} />
				<ExecutionPanel executions={executions} />
			</Content>
		</Root>
	)
}

export default Main;
