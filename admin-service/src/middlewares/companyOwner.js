const { User } = require('../models');
const { Company } = require('../models');

module.exports = async (req, res, next) => {
  const company = await Company.findByPk(req.user.company_id);
  if (!company || company.owner_id !== req.user.id)
    return res.status(403).json({ msg: 'Nur der Eigentümer des Unternehmens' });
  req.company = company;
  next();
};
