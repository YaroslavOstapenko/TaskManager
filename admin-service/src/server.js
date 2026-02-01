const app = require('./app');
const { sequelize } = require('./models');
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Admin-service on port ${PORT}`));
  } catch (e) {
    console.error('DB connection error:', e);
  }
})();