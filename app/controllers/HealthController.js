const redis = require('redis');
const healthCheck = require('health-check-sdk').default;
const { DataBase, ORMTypes } = require('health-check-sdk/dist/utils/Constants');
const models = require("@models");
const fetch = require("node-fetch");

class HealthController {

    async checkHealth(ctx) {

        let redisClient = redis.createClient({
            host: process.env.SESSION_REDIS_HOST,
            port: process.env.SESSION_REDIS_PORT,
            password: process.env.SESSION_REDIS_PASSWORD
        });

        const healthCheckConfig = {
            DB: {
                name: DataBase.POSTGRESQL,
                orm: ORMTypes.SEQUELIZE,
                connection: models.sequelize,
            },
            Redis: redisClient,
            Outbound: false
        }
        healthCheck.config(healthCheckConfig);

        const status = await healthCheck.check();
        let reportServiceStatus = await this.getReportStatus();

        return ctx.body = { ...status, reportServiceStatus };

    }

    async getReportStatus(){

        const reportService = process.env.REPORT_SERVICE_MS_URL.replace(
          "/api/v1",
          "/health"
        );
    
        let response;
        await fetch(reportService, {
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

        let rstatus = response;
        return rstatus
    }

 }

module.exports = new HealthController();
