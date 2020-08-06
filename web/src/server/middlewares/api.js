const { writeResult } = require('./requests/writeResult');
const { history } = require('./requests/history');
const { execution } = require('./requests/execution');
const { reports } = require('./requests/reports');
const { start } = require('./requests/start');

const { invite } = require('./requests/invite');
const { uninvite } = require('./requests/uninvite');


module.exports = function (app) {
    // -
    app.post('/api/start', start);
    // ++
    app.get('/api/reports', reports);
    // ++
    app.get('/api/progress', execution);
    // +?
    app.get('/api/download', writeResult);
    // ++
    app.get('/api/history', history);

    app.get('/api/invite', invite);
    app.get('/api/uninvite', uninvite);
};
