const { getExecution } = require('./functions/getExecution');

module.exports.execution = async function execution(req,res) {
  try {
    const execution_id = req.query.execution_id;
    const execution = await getExecution(execution_id);
    res.send(execution);

  } catch (error) {
    res.send('Error: ' + error.message);
    console.log(error);
  }
}