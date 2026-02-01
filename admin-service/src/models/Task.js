const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  manager_id: { type: DataTypes.INTEGER, allowNull: false },
  employee_id: { type: DataTypes.INTEGER },
  status: { type: DataTypes.ENUM('pending', 'in_progress', 'done'), defaultValue: 'pending' },
  due_date: { type: DataTypes.DATE },
  created_by: { type: DataTypes.INTEGER, allowNull: false },
  updated_by: { type: DataTypes.INTEGER }
}, {
  tableName: 'tasks',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Task;