const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// İletişim formu mesajı kaydet
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Tüm alanlar zorunlu.' });
    }
    const msg = new ContactMessage({ name, email, message });
    await msg.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Mesaj kaydedilemedi.' });
  }
});

module.exports = router; 