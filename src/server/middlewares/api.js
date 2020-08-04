const { writeResult } = require('./requestHandlers/writeResult');
const { history } = require('./requestHandlers/history');
const { execution } = require('./requestHandlers/execution');
const { reports } = require('./requestHandlers/reports');
const { start } = require('./requestHandlers/start');

const { addOwner } = require('./requestHandlers/addOwner');


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

    app.get('/invite', addOwner);


    // app.post('/api/posts', async (req, res) => {
    //     try {
    //         const { rows } = !req.body.sql ? [] : await client.query(req.body.sql);
    //         res.send(rows);
    //     } catch (err) {
    //         console.log(err.stack)
    //         res.send("Error");
    //     }
    // });
};
