const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Tüm yazıları getir
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Yazılar alınamadı.' });
  }
});

// Tek yazı getir
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Yazı bulunamadı.' });
    post.viewCount = (post.viewCount || 0) + 1;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Yazı alınamadı.' });
  }
});

// Yeni yazı ekle (admin)
router.post('/', async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: 'Yazı eklenemedi.' });
  }
});

// Yazı güncelle (admin)
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ error: 'Yazı bulunamadı.' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: 'Yazı güncellenemedi.' });
  }
});

// Yazı sil (admin)
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Yazı bulunamadı.' });
    res.json({ message: 'Yazı silindi.' });
  } catch (err) {
    res.status(400).json({ error: 'Yazı silinemedi.' });
  }
});

module.exports = router; 