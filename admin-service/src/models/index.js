const sequelize = require('../config/database');
const User = require('./User');
const Task = require('./Task');
const TaskFile = require('./TaskFile');
const Company = require('./Company'); 

Task.belongsTo(User, { as: 'manager', foreignKey: 'manager_id' });
Task.belongsTo(User, { as: 'employee', foreignKey: 'employee_id' });
User.hasMany(Task, { foreignKey: 'manager_id' });
User.hasMany(Task, { foreignKey: 'employee_id' });
Task.hasMany(TaskFile, { foreignKey: 'task_id' });
TaskFile.belongsTo(Task, { foreignKey: 'task_id' });
TaskFile.belongsTo(User, { as: 'uploader', foreignKey: 'uploaded_by' });

module.exports = { sequelize, User, Task, TaskFile, Company };