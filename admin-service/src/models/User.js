const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  email:      { type: DataTypes.STRING(120), allowNull: false, unique: true },
  password:   { type: DataTypes.STRING(255), },
  full_name:  { type: DataTypes.STRING(120) },
  role:       { type: DataTypes.ENUM('admin','manager','employee'), defaultValue: 'employee' },
  approved:   { type: DataTypes.BOOLEAN, defaultValue: false },
  company_id: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
  created_by_admin_id: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: 'users',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
 hooks: {
  beforeCreate: async (user) => {
    if (!user.password) {
      user.password = 'default_password';
    }
    user.password = await bcrypt.hash(user.password, 12);
    if (!user.company_id && user.created_by_admin_id) {
      const admin = await User.findByPk(user.created_by_admin_id, {
        attributes: ['company_id']
      });
      if (admin) user.company_id = admin.company_id;
    }
  }
}
});

User.prototype.validatePassword = async function (pwd) {
  return bcrypt.compare(pwd, this.password);
};

module.exports = User;