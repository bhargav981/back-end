module.exports = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  dialect: "postgres",
  benchmark: true,
  logging: (msg, timeTaken) => {
    console.log("PSSQL Log: (Time: %d) %s", timeTaken, msg);
  },
  //seederStorage: "sequelize",
  define: {
    underscored: true,
    timestamps: true
  },
  pool: { 
      max: 50,
      idle: 10000, 
      min: 1
    }
};