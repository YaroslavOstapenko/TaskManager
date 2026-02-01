const router = require('express').Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const taskCtrl = require('../controllers/taskController');
const fileCtrl = require('../controllers/fileController');

router.post('/', auth(['manager', 'admin']), taskCtrl.create);
router.get('/', taskCtrl.listAll);
router.patch('/:id/status', auth(['employee']), taskCtrl.changeStatus);
router.get('/:id', auth(['manager', 'employee', 'admin']), taskCtrl.getTaskById);
router.delete('/:id', auth(['manager', 'admin']), taskCtrl.deleteTask);
router.post('/:id/file', auth(['manager', 'employee']), upload.single('file'), fileCtrl.attach);
router.get('/:id/files', auth(['manager', 'employee', 'admin']), fileCtrl.list);
router.delete('/:id/file', auth(['manager', 'employee', 'admin']), fileCtrl.deleteFile);

module.exports = router;