const { client: OozieClient } = require('oozie-api');
const { client: PostgresClient } = require('../../services/pg');
const { getReports } = require('./functions/getReports');
const { getExecution } = require('./functions/getExecution');
const moment = require('moment');


async function start(req, res) {
  try {
    console.log(req.body);
    // res.send(req.body);
    // return;
    const login = 'admin';
    const report_id = 'SelectOnline';
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

    let oozieClient = new OozieClient({
      oozieUrl: 'http://dad-oozie.consultant.ru/oozie'
    });

    const { id: workflow_id } = await oozieClient.createJob(xmlConfig({
      report_id: report_id,
      execution_id: execution_id,
      created_at: eCreatedAt,
      creator: eCreator
    }));
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


function xmlConfig({
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
      <!-- SERVICE_PARAMS -->
      <property>
          <name>user.name</name>
          <value>${userName}</value>
          <!-- <value>administrator</value> -->
      </property>
      <property>
          <name>nameNode</name>
          <value>${nameNode}</value>
          <!-- <value>hdfs://hadoop-manager1.consultant.ru:8020</value> -->
      </property>
      <property>
          <name>jobTracker</name>
          <value>${jobTracker}</value>
          <!-- <value>hadoop-manager1.consultant.ru:8032</value> -->
      </property>
      <property>
          <name>dryrun</name>
          <value>False</value> 
          <!-- <value>False</value> -->
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
          <!-- <value>hdfs://hadoop-manager1.consultant.ru:8020/user/administrator/prod/meta/oozie/workflows</value> -->
      </property>
      <property>
          <name>oozie.use.system.libpath</name>
          <value>true</value>
      </property>
      <property>
          <name>security_enabled</name>
          <value>False</value>
      </property>
      <!--  -->
      <property>
          <name>jobClassName</name>
          <value>dad.reports.${report_id}</value> 
          <!-- <value>dad.reports.SelectOnline</value> -->
      </property>
      <property>
          <name>arg1</name>
          <!-- EXECUTION_ID to string -->
          <value>${execution_id}</value>
          <!-- <value>218</value> -->
      </property>
          <!-- conf.setProperty(OozieClient.APP_PATH, SERVICE_PARAMS.get("nameNode") + "/user/administrator/prod/meta/oozie/workflows/service/report_job.xml"); -->
      <!-- ВОТ КАК ЗДЕСЬ ОТОБРАЗИТЬ прописать APP_PATH ??? -->
      <property>
          <!-- <name>http://hadoop-manager1.consultant.ru:11000/oozie</name> -->
          <name>oozie.wf.application.path</name>
          <value>${nameNode}/user/${userName}/prod/meta/oozie/workflows/service/report_job.xml</value>
      </property>
      <property>
          <name>name</name>
          <value>${report_id}</value>
          <!-- <value>SelectOnline</value> -->
      </property>
      <property>
          <name>creator</name>
          <value>${creator}</value>
          <!-- <value>admin</value> -->
      </property>
      <!--  -->
      <property>
          <name>created_at</name>
          <value>${created_at}</value>
          <!-- createdAt -->
          <!-- <value>20200525014024</value> -->
      </property>
  </configuration>
`;
}
