const models = require('@models');
const fetch = require("node-fetch");

class ReportServiceController {
  async generateReportUrl(uliId, ctx, data) {
    // 1. Get task id API
    // 2. poll for the report url
    // 3. On receiving the report url save in database.
    // 4. make a new table user_report {uliId, reporturl, created at , geenrated at}

    // 5. TODO: if report service is unavailable 503,500 then sim keeps hitting the service continously. what to do then?
    let report_html = await this.getReportHtml(data, ctx)
    let taskId = await this.getTaskId(uliId, report_html)
    let reportUrl = await this.pollReportUrl(taskId)
    if (!reportUrl) {
      console.log("Some issue occured in the external Report Service")
    } else {
      await this.saveReportUrl(reportUrl, uliId)
      return { reportUrl, taskId }
    }
  }

  async getTaskId(uliId, report_html) {
    const reportService = process.env.REPORT_SERVICE_MS_URL + "/report";

    console.log("Hitting the report service url")

    let response;
    await fetch(reportService, {
      method: "post",
      headers: {
        "x-server-token": process.env.REPORT_SERVER_TOKEN,
        "x-service-name": process.env.REPORT_SERVICE_SIM_NAME
      },
      body: JSON.stringify({
        reportType: "URL_TO_PDF_REPORT",
        reportOutputType: "pdf",
        metaData: {
          uliID: uliId,
          html: report_html,
        }
      })
    }).then(
      res => res.json()
    ).then(res => {
      response = res;
    }).catch(e => {
      console.log(e)
    })

    console.log("gettask taskId : ", response.taskId)
    // Get the taskId
    if (response.taskId) {
      let taskId = response.taskId;
      console.log("taskId: ", taskId);
      return taskId
    } else {
      if (response.status == 503 || response.status == 500) {
        console.log("Service Unavailable")
        return null
      }
      console.log("Error in fetching task Id...Reconnecting!!", response)
      await this.getTaskId(uliId, report_html);
    }
  }

  async pollReportUrl(taskId) {
    const reportService = process.env.REPORT_SERVICE_MS_URL + "/report";
    let reportUrl = ""
    console.log("Hitting the report service url with task ID", taskId)
    if (!taskId) {
      console.log("TaskID not found")
      return null
    }
    // Reconnect in 15 second
    await new Promise(resolve => setTimeout(resolve, 10000));
    let response
    await fetch(reportService + `?taskId=${taskId}`, {
      method: "get",
      headers: {
        "x-server-token": process.env.REPORT_SERVER_TOKEN,
        "x-service-name": process.env.REPORT_SERVICE_SIM_NAME
      }
    }).then(
      res => res.json()
    ).then(res => {
      response = res;
    }).catch(e => {
      console.log(e)
    })
    console.log("pollReportUrl : ", response)
    if (response.status === "COMPLETED" && response.reportLink) {

      console.log("reportLink: ", response.reportLink);
      // now get report url
      return response.reportLink
    } else if (response.status == 503 || response.status == 500) {
      console.log("Service Unavailable")
      return null
    } else {
      console.log("Error in polling report url...Reconnecting!!", response)
      return await this.pollReportUrl(taskId);
    }
  }

  async saveReportUrl(reportUrl, uliId) {
    await models.user_reports.upsert({
      uliId,
      reportUrl
    })
    console.log("Report url saved in db for user", uliId)
  }

  async getReportHtml(data, ctx) {
    console.log("Preparing the report html")
    const appUrl = process.env.COMMONDB_DEFAULT_REDIRECT_URI.replace("/login", "")
    await ctx.render("report/agile", {
      appUrl,
      json: data
    });
    return ctx.body
  }
}

module.exports = new ReportServiceController();
