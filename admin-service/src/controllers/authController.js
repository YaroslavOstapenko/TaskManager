const { User, Company } = require('../models');
const { generateToken } = require('../config/auth');
const { registerSchema, loginSchema } = require('../validators/auth');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const bcrypt = require('bcrypt');

exports.registerAdmin = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { email, password, full_name, companyName = 'Mein Unternehmen' } = req.body;

  const t = await sequelize.transaction();
  try {
    const company = await Company.create({ name: companyName.trim(), owner_id: null }, { transaction: t });

    const user = await User.create({
      email,
      password,
      full_name,
      role: 'admin',
      approved: true,
      company_id: company.id
    }, { transaction: t });

    await company.update({ owner_id: user.id }, { transaction: t });

    await t.commit();
    const token = generateToken({ id: user.id, role: user.role });
    res.json({ token, user });
  } catch (e) {
    await t.rollback();
    res.status(500).json({ msg: e.message });
  }
};

exports.login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { email, password } = req.body;
  console.log('LOGIN-Versuch:', email, 'klartext=', password);

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('→ Benutzer nicht gefunden');
      return res.status(401).json({ msg: 'Ungültige Zugangsdaten' });
    }
    console.log('→ Benutzer gefunden, Hash aus DB:', user.password);

    const ok = await user.validatePassword(password);
    console.log('→ bcrypt Vergleichsergebnis:', ok);

    if (!ok) return res.status(401).json({ msg: 'Ungültige Zugangsdaten' });
    if (!user.approved) return res.status(403).json({ msg: 'Konto wartet auf Freigabe' });

    const token = generateToken({ id: user.id, role: user.role });
    res.json({ token, user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: e.message });
  }
};
