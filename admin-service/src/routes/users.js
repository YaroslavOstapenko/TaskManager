const router = require('express').Router();
const auth = require('../middlewares/auth');
const ctrl = require('../controllers/userController');
const { Company, User } = require('../models');
const { Op } = require('sequelize');
const companyAuth = require('../middlewares/companyAuth');
const companyOwner = require('../middlewares/companyOwner');

router.get('/pending', auth(['admin']), ctrl.listPending);
router.patch('/approve/:id', auth(['admin', 'manager']), ctrl.approve);
router.patch('/role/:id', auth(['admin']), ctrl.updateRole);
router.get('/', auth(['admin', 'manager']), companyAuth, ctrl.listAll);
router.post('/add', auth(['admin', 'manager']), companyAuth, ctrl.createUser);
router.delete('/:id', auth(['admin']), companyAuth, ctrl.deleteUser);
router.get('/me', auth(), ctrl.getMe);
router.get(
  '/employees',
  auth(['admin', 'manager']),
  companyAuth,
  ctrl.listEmployees
);

router.get('/company', auth(['admin','manager','employee']), companyAuth, async (req, res) => {
  const company = await Company.findByPk(req.companyId);
  res.json(company);
});

router.post('/company/create', auth(['admin']), async (req, res) => {
  const { name } = req.body;
  if (!name || name.trim().length < 2)
    return res.status(400).json({ msg: 'Mindestens 2 Zeichen' });

  const existing = await Company.findOne({ where: { owner_id: req.user.id } });
  if (existing)
    return res.status(409).json({ msg: 'Sie haben bereits ein Unternehmen' });

  const company = await Company.create({ name: name.trim(), owner_id: req.user.id });
  await User.update({ company_id: company.id }, { where: { id: req.user.id } });

  res.json(company);
});

router.get('/companies', auth(['admin']), async (req, res) => {
  const list = await Company.findAll({ order: [['name', 'ASC']] });
  res.json(list);
});

router.put('/companyEdit', auth(['admin']), companyOwner, async (req, res) => {
  const { name } = req.body;
  if (!name || name.trim().length < 2)
    return res.status(400).json({ msg: 'Mindestens 2 Zeichen' });
  await req.company.update({ name: name.trim() });
  res.json(req.company);
});

module.exports = router;