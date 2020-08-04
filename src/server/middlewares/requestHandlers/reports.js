const { client } = require('../../services/pg');

module.exports.reports = async function reports(req, res) {
  try {
    const login = req.cookies.login;
    if (!login) throw new Error ('login undefined');

    // console.log('Cookies: ' + JSON.stringify(req.cookies, null, 2));

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

    let response = {};
    reports.forEach(report => response[report.id] = report);
    res.send(response);

  } catch (error) {
    res.send('Error: ' + error.message);
    console.log(error);
  }
}