const { client } = require('../../services/pg');

module.exports.history = async function history(req,res) {
  try {
    const report_id = req.query.report_id;
    const login = req.cookies.login;
    if (!report_id) throw new Error('report_id undefined');
    if (!login) throw new Error('login undefined');

    const { rows } = await client.query(`
      SELECT  id, report_id, created_at, creator, started_at, finished_at, params, error, 
      CASE WHEN progress IS NULL OR progress_stage IS NULL THEN 0.0001 
        WHEN progress != 1 THEN (progress + progress_stage/(2 - progress)) * 100 
        ELSE 100
      END as progress 
      FROM userdata.reports_execution WHERE report_id = '${report_id}' 
      AND '${login}' = ANY(owners)
    `);

    res.send(rows);

  } catch (error) {
    console.log(error);
    res.send('Error: ' + error.message);
  }
}