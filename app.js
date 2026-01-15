require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/user.routes'))
app.use('/api/positions', require('./routes/position.routes'))
app.use('/api/applicants', require('./routes/applicant.routes'))

//health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
  });
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    console.log("Loaded models:", Object.keys(db));

    await db.sequelize.sync({ alter: true });
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
