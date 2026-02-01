const Task = require('../models/Task');

exports.attach = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ msg: 'Aufgabe nicht gefunden' });
  task.file = req.file.filename;
  await task.save();
  res.json(task);
};

exports.list = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ msg: 'Aufgabe nicht gefunden' });
  res.json({ file: task.file });
};

exports.deleteFile = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ msg: 'Aufgabe nicht gefunden' });
  task.file = null;
  await task.save();
  res.json({ msg: 'Datei gelöscht' });
};
