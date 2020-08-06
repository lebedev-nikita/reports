const { writeResult } = require('./requests/writeResult');
const { history } = require('./requests/history');
const { execution } = require('./requests/execution');
const { reports } = require('./requests/reports');
const { start } = require('./requests/start');

const { invite } = require('./requests/invite');
const { uninvite } = require('./requests/uninvite');


const { client } = require('../services/pg');

module.exports = function (app) {
    // -
    app.post('/start', start);
    // ++
    app.get('/reports', reports);
    // ++
    app.get('/progress', execution);
    // +?
    app.get('/download', writeResult);
    // ++
    app.get('/history', history);

    app.get('/invite', invite);
    app.get('/uninvite', uninvite);

    app.get('/api/getTest2', async (req, res) => {

        const { rows: data } = await client.query('SELECT * FROM userdata.reports_execution LIMIT 100');
        res.send(data);
    });

};
