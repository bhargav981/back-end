module.exports = {
  apps: [
    {
      name: "development",
      script: "./app.js",
      watch: true,
      exec_mode: "cluster",
      error_file: "logs/err.log",
      out_file: "logs/out.log",
      log_file: "logs/app.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm Z",
      instances: "1",
      max_restarts: 10,
      ignore_watch: ["node_modules", "logs", "newrelic_agent.log", "sessions"],
      source_map_support: true,
      env: {
        NODE_ENV: "development"
      }
    },
    {
      name: "production",
      script: "./app.js",
      max_restarts: 100,
      error_file: "logs/err.log",
      out_file: "logs/out.log",
      log_file: "logs/app.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm Z",
      exec_mode: "cluster",
      instances: 1,
      source_map_support: false,
      env: {
        NODE_ENV: "production"
      }
    }
  ],

  deploy: {}
};
