const { client } = require('../../../services/pg');

module.exports.getReports = async function getReports(login) {
  if (!login) throw new Error ('login undefined');

  const { rows: reports } = await client.query(`
    SELECT report.* FROM service.report
    JOIN (SELECT max(updated_at) AS updated_at, id
      FROM service.report
      GROUP BY id) AS last_report_version
    ON report.id = last_report_version.id AND report.updated_at = last_report_version.updated_at
    JOIN service.report_owners
    ON report.id = report_owners.report_id
    WHERE '${login}' = ANY(owners)
  `);

  let ret = {};
  reports.forEach(report => ret[report.id] = report);
  return ret;
}