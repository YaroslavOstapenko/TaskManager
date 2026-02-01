const { verifyToken } = require('../config/auth');
const { User } = require('../models');

module.exports = function (allowedRoles = []) {
  return async (req, res, next) => {
    try {
      const header = req.headers.authorization;
      if (!header) return res.status(401).json({ msg: 'Token erforderlich' });
      const token = header.split(' ')[1];
      const decoded = verifyToken(token);
      const user = await User.findByPk(decoded.id);
      if (!user) return res.status(401).json({ msg: 'Benutzer nicht gefunden' });
      if (!user.approved) return res.status(403).json({ msg: 'Konto nicht freigegeben' });
      if (allowedRoles.length && !allowedRoles.includes(user.role))
        return res.status(403).json({ msg: 'Zugriff verweigert' });
      req.user = user;
      next();
    } catch (e) {
      return res.status(401).json({ msg: 'Ungültiges Token' });
    }
  };
};