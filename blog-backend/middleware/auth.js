const adminAuth = (req, res, next) => {
  // Hem küçük hem büyük harfli header kontrolü
  const adminPassword = req.headers.adminpassword || req.headers.adminPassword;
  const ADMIN_PASSWORD = 'admin123';
  if (adminPassword === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ error: 'Admin yetkisi gerekli.' });
  }
};

module.exports = adminAuth; 