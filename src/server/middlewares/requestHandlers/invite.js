const { client } = require('../../services/pg');

module.exports.invite = async function invite(req, res) {
  try {
    const login = req.cookies.login;
    const execution_id = req.query.execution_id;
    if (!login) throw new Error('login undefined');
    if (!execution_id) throw new Error('execution_id undefined');

    await client.query(`
      UPDATE userdata.reports_execution 
      SET owners = CASE
            WHEN '${login}' = ANY(owners) THEN owners
            ELSE array_append(owners, '${login}')
          END,
          removed_at = NULL
      WHERE id = ${execution_id}
    `);

    res.send('You have been added!');

  } catch (error) {
    console.log(error);
    res.send('Error: ' + error.message);
  }
}