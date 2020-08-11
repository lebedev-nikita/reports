const { getExecution } = require('./functions/getExecution');
const moment = require('moment');

module.exports.writeResult = async function writeResult(req, res) {
  try {
    const execution_id = req.query.execution_id;
    const execution = await getExecution(execution_id);

    const resultFilePath = "/reports/" + execution.report_id + "$/" + moment(execution.created_at).format('YYYYMMDDhhmmss') + "_" + execution.creator + "/data.zip";
    
    // TODO: придумать, как лучше обрабатывать ошибку, когда файл не найден
    res.download(resultFilePath, (err) => {
      res.send(err.message);
      console.log(err);
    });

  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
}