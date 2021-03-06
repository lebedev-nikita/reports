const { client } = require('../../services/pg');

module.exports.uninvite = async function uninvite(req, res) {
  try {
    const login = req.cookies.login;
    const execution_id = req.query.execution_id;
    if (!login) throw new Error('login undefined');
    if (!execution_id) throw new Error('execution_id undefined');

    await client.query(`
      UPDATE userdata.reports_execution 
      SET owners = array_remove(owners, '${login}'),
          removed_at = CASE
            WHEN cardinality(array_remove(owners, '${login}')) = 0 AND removed_at IS NULL THEN current_timestamp
            ELSE removed_at
          END
      WHERE id = ${execution_id}
    `);

    res.send('You have been removed!');

  } catch (error) {
    console.log(error);
    res.send('Error: ' + error.message);
  }
}