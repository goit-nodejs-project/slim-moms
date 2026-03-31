const { verifyToken } = require('../helpers/jwt');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Header kontrol
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    //  Token doğrula (TEK YER)
    const decoded = verifyToken(token);

    // Kullanıcıyı bul
    const user = await User.findById(decoded.id);

    //  User yok ya da token eşleşmiyor
    if (!user || user.token !== token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Request'e user ekle
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticate;
