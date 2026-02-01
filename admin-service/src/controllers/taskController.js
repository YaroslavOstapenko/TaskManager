const { Task, User } = require('../models');

exports.create = async (req, res) => {
  const { title, description, employee_id, due_date } = req.body;
  const task = await Task.create({
    title,
    description,
    manager_id: req.user.id,
    employee_id,
    due_date,
    created_by: req.user.id,
    updated_by: req.user.id
  });
  res.json(task);
};

exports.listAll = async (req, res) => {
  const tasks = await Task.findAll({
    include: [{
      model: User,
      as: 'employee',
      attributes: ['id', 'full_name', 'role']
    }],
    order: [['id', 'DESC']]
  });

  res.json(tasks);
};

exports.changeStatus = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ msg: 'Aufgabe nicht gefunden' });
  task.status = req.body.status;
  task.updated_by = req.user.id;
  await task.save();
  res.json(task);
};

exports.getTaskById = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ msg: 'Aufgabe nicht gefunden' });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const rows = await Task.destroy({ where: { id: req.params.id } });
  if (!rows) return res.status(404).json({ msg: 'Aufgabe nicht gefunden' });
  res.json({ msg: 'Aufgabe gelöscht' });
};