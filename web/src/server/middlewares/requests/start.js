const { client: OozieClient } = require('oozie-api');
const { client: PostgresClient } = require('../../services/pg');
const { getReports } = require('./functions/getReports');
const { getExecution } = require('./functions/getExecution');
const moment = require('moment');
const axios = require('axios');


async function start(req, res) {
  try {
    const login = 'admin';

    const report_id = req.query.report_id;
    const report_version = (await getReports(login))[report_id].version;
    const creator = 'admin'; // ThreadContext.get("username") != null ? ThreadContext.get("username"): "admin"
    const params = JSON.stringify(req.body);
    // TODO: сделать обработку запроса

    const { rows } = await PostgresClient.query(`
      INSERT INTO userdata.reports_execution (id     , created_at, creator     , report_id     , report_version   , params)      --,           progress, progress_stage, error, removed_at, started_at, finished_at, workflow_id) 
      VALUES                                 (DEFAULT, now()     , '${creator}', '${report_id}', ${report_version}, '${params}') --, ...)
      RETURNING id
      `);
    const execution_id = rows[0].id;

    console.log(execution_id);

    /* ----------------- */
    const execution = await getExecution(execution_id);
    const eCreator = execution.creator;
    const eCreatedAt = format_YYYYMMDDhhmmss(execution.created_at);

    const oozieUrl = 'http://dad-oozie.consultant.ru/oozie';
    const xmlConfig = getXmlConfig({
      report_id: report_id,
      execution_id: execution_id,
      created_at: eCreatedAt,
      creator: eCreator
    })

    
    // let oozieClient = new OozieClient({ oozieUrl });
    // const { id: workflow_id } = await oozieClient.createJob(xmlConfig);
    // console.log(workflow_id);

    const requestConfig = {
      headers: { 'Content-Type': 'text/xml' }
    };
    const { id: workflow_id } = await axios.post(oozieUrl, xmlConfig, requestConfig);
    console.log(workflow_id);
    /* ---- */

    await PostgresClient.query(`
      UPDATE userdata.reports_execution SET workflow_id = '${workflow_id}' WHERE id = ${execution_id}
    `)
    res.send(execution_id.toString());

  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
}

module.exports.start = start;

function format_YYYYMMDDhhmmss(date) {
  return moment(date).format('YYYYMMDDhhmmss');
}


function getXmlConfig({
  report_id,
  execution_id,
  created_at,
  creator = 'admin',
  userName = 'administrator',
  nameNode = 'hdfs://hadoop-manager1.consultant.ru:8020',
  jobTracker = 'hadoop-manager1.consultant.ru:8032',
  workflowPath = 'hdfs://hadoop-manager1.consultant.ru:8020/user/administrator/prod/meta/oozie/workflows',
}) {
  return `
    <configuration>
      <property>
          <name>user.name</name>
          <value>${userName}</value>
      </property>
      <property>
          <name>nameNode</name>
          <value>${nameNode}</value>
      </property>
      <property>
          <name>jobTracker</name>
          <value>${jobTracker}</value>
      </property>
      <property>
          <name>dryrun</name>
          <value>False</value> 
      </property>
      <property>
          <name>oozie.action.sharelib.for.spark</name>
          <value>spark_libs,consultant_libs</value>
      </property>
      <property>
          <name>oozie.action.sharelib.for.java</name>
          <value>external_libs,consultant_libs</value>
      </property>
      <property>
          <name>workflowPath</name>
          <value>${workflowPath}</value>
      </property>
      <property>
          <name>oozie.use.system.libpath</name>
          <value>true</value>
      </property>
      <property>
          <name>security_enabled</name>
          <value>False</value>
      </property>
      <property>
          <name>jobClassName</name>
          <value>dad.reports.${report_id}</value> 
      </property>
      <property>
          <name>arg1</name>
          <value>${execution_id}</value>
      </property>
      <property>
          <name>oozie.wf.application.path</name>
          <value>${nameNode}/user/${userName}/prod/meta/oozie/workflows/service/report_job.xml</value>
      </property>
      <property>
          <name>name</name>
          <value>${report_id}</value>
      </property>
      <property>
          <name>creator</name>
          <value>${creator}</value>
      </property>
      <property>
          <name>created_at</name>
          <value>${created_at}</value>
      </property>
  </configuration>
`;
}
