const { User } = require('../models');

module.exports = async (req, res, next) => {
  if (!req.user.company_id) {
    return res.status(403).json({ msg: 'Sie haben kein Unternehmen' });
  }
  req.companyId = req.user.company_id;
  next();
};
