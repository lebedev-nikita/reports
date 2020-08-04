const { client } = require('../../services/pg');

module.exports.history = async function history(req,res) {
  const reportId = req.query.report_id;
  if (!reportId) {
    res.send('Error: report_id undefined');
    return;
  }

  try {
    const { rows } = await client.query(`
      SELECT  id, report_id, created_at, creator, started_at, finished_at, params, error, 
      CASE WHEN progress IS NULL OR progress_stage IS NULL THEN 0.0001 
        WHEN progress != 1 THEN (progress + progress_stage/(2 - progress)) * 100 
        ELSE 100
      END as progress 
      FROM userdata.reports_execution WHERE report_id = '${reportId}'
    `);
    res.send(rows);

  } catch (error) {
    console.log('Error: ' + error.message);
    res.send("Error");
  }
}