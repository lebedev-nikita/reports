const { getExecution } = require('./functions/getExecution');

module.exports.writeResult = async function writeResult(req,res) {
  try {
    const executionId = req.query.execution_id;
    const execution = getExecution(executionId); 

    // TODO: понять, в какой папке теперь искать данные
    const resultFilePath = "/reports/" + execution.reportId + "$/" + execution.createdAt + "_" + execution.creator + "/data.zip";

    // const filePath = path.resolve(__dirname, 'start.js')
    res.download(resultFilePath);


  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
}