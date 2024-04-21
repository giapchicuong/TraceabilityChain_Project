const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("bykipefhq1twgzq8ueuy", "uexpryenigz9rn0d", "5rB8xpMk8fod7Kq0Voiq", {
  host: "bykipefhq1twgzq8ueuy-mysql.services.clever-cloud.com",
  dialect: "mysql",
});
const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connection;
