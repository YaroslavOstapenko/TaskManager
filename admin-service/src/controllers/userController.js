const { sendEmail } = require('../services/emailService');
const crypto = require('crypto');
const { User } = require('../models');
const { Op } = require('sequelize');

exports.listPending = async (req, res) => {
  const users = await User.findAll({ where: { approved: false } });
  res.json(users);
};

exports.approve = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ msg: 'Benutzer nicht gefunden' });
  user.approved = true;
  await user.save();
  res.json({ msg: 'Benutzer freigegeben' });
};

exports.updateRole = async (req, res) => {
  const { role } = req.body;
  if (!['admin','manager','employee'].includes(role))
    return res.status(400).json({ msg: 'Ungültige Rolle' });
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ msg: 'Benutzer nicht gefunden' });
  user.role = role;
  await user.save();
  res.json(user);
};

exports.listAll = async (req, res) => {
  const users = await User.findAll({
    where: {
      company_id: req.user.company_id,
      id: { [Op.ne]: req.user.id }
    },
    attributes: ['id', 'email', 'full_name', 'role', 'approved']
  });
  res.json(users);
};

exports.approve = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id, company_id: req.user.company_id }
  });
  if (!user) return res.status(404).json({ msg: 'Benutzer nicht gefunden' });
  user.approved = true;
  user.company_id = req.user.company_id;
  await user.save();
  res.json({ msg: 'Freigegeben' });
};

exports.createUser = async (req, res) => {
  const { email, full_name, role = 'employee' } = req.body;
  if (!['manager', 'employee'].includes(role)) return res.status(400).json({ msg: 'Ungültige Rolle' });

  const randomPassword = crypto.randomBytes(8).toString('hex');

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      email,
      full_name,
      role,
      password: randomPassword,
      approved: false,
      company_id: req.user.company_id,
      created_by_admin_id: req.user.id
    }
  });
  if (!created) return res.status(409).json({ msg: 'Email existiert bereits' });

  console.log(`Zufälliges Passwort für ${email}: ${randomPassword}`);

  res.json({ id: user.id, email, full_name, role });
};

exports.deleteUser = async (req, res) => {
  if (req.params.id == req.user.id) {
    return res.status(403).json({ msg: 'Sie können sich nicht selbst löschen' });
  }
  const rows = await User.destroy({
    where: { id: req.params.id, company_id: req.companyId }
  });
  if (!rows) return res.status(404).json({ msg: 'Nicht gefunden' });
  res.json({ msg: 'Gelöscht' });
};

exports.getMe = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ['id', 'full_name', 'email', 'role', 'company_id']
  });
  if (!user) return res.status(404).json({ msg: 'Benutzer nicht gefunden' });
  res.json(user);
};

exports.listEmployees = async (req, res) => {
  const roles =
    req.user.role === 'admin'
      ? ['employee', 'manager']
      : ['employee'];

  const users = await User.findAll({
    where: {
      company_id: req.companyId,
      role: { [Op.in]: roles },
      approved: true,
      id: { [Op.ne]: req.user.id }
    },
    attributes: ['id', 'full_name', 'role']
  });

  res.json(users);
};