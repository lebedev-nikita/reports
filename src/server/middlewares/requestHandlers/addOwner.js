const { client } = require('../../services/pg');

module.exports.addOwner = async function addOwner(req, res) {
  try {
    const login = req.cookies.login;
    if (!login) throw new Error('login undefined');

    console.log('login: ' + login);
    res.send('JIJA');
    
  } catch (error) {
    console.log(error);
    res.send('Error: ' + error.message);
  }
}