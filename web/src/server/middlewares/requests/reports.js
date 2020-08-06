const { getReports } = require('./functions/getReports');

module.exports.reports = async function reports(req, res) {
  try {
    const login = req.cookies.login;
    let response = await getReports(login);
    res.send(response);

  } catch (error) {
    res.send('Error: ' + error.message);
    console.log(error);
  }
}