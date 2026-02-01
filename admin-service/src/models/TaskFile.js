const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TaskFile = sequelize.define('TaskFile', {
  task_id:     { type: DataTypes.INTEGER, allowNull: false },
  filename:    { type: DataTypes.STRING, allowNull: false },
  path:        { type: DataTypes.STRING, allowNull: false },
  uploaded_by: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'task_files',
  underscored: true,
  createdAt: 'uploaded_at',
  updatedAt: false
});

module.exports = TaskFile;