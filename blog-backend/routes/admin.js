const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const adminAuth = require('../middleware/auth');
const ContactMessage = require('../models/ContactMessage');

// Admin giriş kontrolü
router.post('/login', (req, res) => {
  const { password } = req.body;
  const ADMIN_PASSWORD = 'admin123';
  
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, message: 'Giriş başarılı' });
  } else {
    res.status(401).json({ error: 'Yanlış şifre' });
  }
});

// Tüm blog yazılarını getir (admin için)
router.get('/posts', adminAuth, async (req, res) => {
  try {
    // MongoDB bağlantısı kontrolü
    if (mongoose.connection.readyState !== 1) {
      // Test verileri (MongoDB bağlantısı yoksa)
      return res.json([
        {
          _id: '1',
          title: 'React Hooks Kullanımı',
          summary: 'Modern React geliştirme teknikleri',
          content: 'React Hooks ile fonksiyonel bileşenler...',
          author: 'Admin',
          category: 'React',
          viewCount: 45,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '2',
          title: 'JavaScript ES6 Özellikleri',
          summary: 'ES6 ile gelen yeni özellikler',
          content: 'Arrow functions, destructuring, spread operator...',
          author: 'Admin',
          category: 'JavaScript',
          viewCount: 32,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '3',
          title: 'Node.js Backend Geliştirme',
          summary: 'Express.js ile API geliştirme',
          content: 'RESTful API tasarımı ve MongoDB entegrasyonu...',
          author: 'Admin',
          category: 'Node.js',
          viewCount: 28,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    }

    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Yazılar alınamadı.' });
  }
});

// Yeni blog yazısı ekle
router.post('/posts', adminAuth, async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: 'Yazı eklenemedi.' });
  }
});

// Blog yazısı güncelle
router.put('/posts/:id', adminAuth, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ error: 'Yazı bulunamadı.' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: 'Yazı güncellenemedi.' });
  }
});

// Blog yazısı sil
router.delete('/posts/:id', adminAuth, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Yazı bulunamadı.' });
    
    // İlgili yorumları da sil
    await Comment.deleteMany({ post: req.params.id });
    
    res.json({ message: 'Yazı ve yorumları silindi.' });
  } catch (err) {
    res.status(400).json({ error: 'Yazı silinemedi.' });
  }
});

// Tüm yorumları getir (admin için)
router.get('/comments', adminAuth, async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('post', 'title')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Yorumlar alınamadı.' });
  }
});

// Yorum sil
router.delete('/comments/:id', adminAuth, async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Yorum bulunamadı.' });
    res.json({ message: 'Yorum silindi.' });
  } catch (err) {
    res.status(400).json({ error: 'Yorum silinemedi.' });
  }
});

// İstatistikler
router.get('/stats', adminAuth, async (req, res) => {
  try {
    // MongoDB bağlantısı kontrolü
    if (mongoose.connection.readyState !== 1) {
      // Test verileri (MongoDB bağlantısı yoksa)
      return res.json({
        totalPosts: 8,
        totalComments: 15,
        totalViews: 123,
        recentPosts: [
          { title: 'React Hooks Kullanımı', viewCount: 45, createdAt: new Date() },
          { title: 'JavaScript ES6 Özellikleri', viewCount: 32, createdAt: new Date() },
          { title: 'Node.js Backend Geliştirme', viewCount: 28, createdAt: new Date() }
        ],
        popularPosts: [
          { title: 'React Hooks Kullanımı', viewCount: 45 },
          { title: 'JavaScript ES6 Özellikleri', viewCount: 32 },
          { title: 'Node.js Backend Geliştirme', viewCount: 28 }
        ]
      });
    }

    const totalPosts = await Post.countDocuments();
    const totalComments = await Comment.countDocuments({ approved: true });
    const totalViewsAgg = await Post.aggregate([
      { $group: { _id: null, total: { $sum: "$viewCount" } } }
    ]);
    const totalViews = (totalViewsAgg[0] && totalViewsAgg[0].total) ? totalViewsAgg[0].total : 0;
    
    const recentPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title viewCount createdAt');
    
    const popularPosts = await Post.find()
      .sort({ viewCount: -1 })
      .limit(5)
      .select('title viewCount');
    
    res.json({
      totalPosts: totalPosts || 0,
      totalComments: totalComments || 0,
      totalViews: totalViews || 0,
      recentPosts,
      popularPosts
    });
  } catch (err) {
    res.status(500).json({ error: 'İstatistikler alınamadı.' });
  }
});

// İletişim mesajlarını getir (admin)
router.get('/contact-messages', adminAuth, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      // Test verisi
      return res.json([
        { _id: '1', name: 'Test Kullanıcı', email: 'test@mail.com', message: 'Merhaba, iletişim testi!', date: new Date() }
      ]);
    }
    const messages = await ContactMessage.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Mesajlar alınamadı.' });
  }
});

// Onay bekleyen yorumları getir
router.get('/pending-comments', adminAuth, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      // Test verisi
      return res.json([
        { _id: '1', name: 'Test', email: 'test@mail.com', text: 'Onay bekleyen yorum', date: new Date(), post: { title: 'Test Blog' }, approved: false }
      ]);
    }
    const comments = await Comment.find({ approved: false }).populate('post', 'title').sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Yorumlar alınamadı.' });
  }
});

// Yorum onayla
router.put('/approve-comment/:id', adminAuth, async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
    if (!comment) return res.status(404).json({ error: 'Yorum bulunamadı.' });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Yorum onaylanamadı.' });
  }
});

module.exports = router; 