const { client } = require('../../../services/pg');

module.exports.getExecution = async function getExecution(execution_id) {
  if (!execution_id) {
    throw new Error('execution id undefined');
  }

  const { rows } = await client.query(`
    SELECT id, report_id, created_at, creator, started_at, finished_at, params, error, 
    CASE WHEN progress IS NULL OR progress_stage IS NULL THEN 0.0001 
      WHEN progress != 1 THEN (progress + progress_stage/(2 - progress)) * 100
      ELSE 100 
    END AS progress 
    FROM userdata.reports_execution WHERE id = ${execution_id}
  `);

  return rows[0];
}