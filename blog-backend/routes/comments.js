const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Yorumları hiyerarşik olarak düzenleyen yardımcı fonksiyon
function buildCommentTree(comments) {
  const commentMap = {};
  const roots = [];

  // Tüm yorumları map'e ekle
  comments.forEach(comment => {
    commentMap[comment._id] = { ...comment.toObject(), replies: [] };
  });

  // Hiyerarşiyi oluştur
  comments.forEach(comment => {
    if (comment.parentId) {
      // Bu bir cevap yorumu
      if (commentMap[comment.parentId]) {
        commentMap[comment.parentId].replies.push(commentMap[comment._id]);
      }
    } else {
      // Bu bir ana yorum
      roots.push(commentMap[comment._id]);
    }
  });

  return roots;
}

// Belirli bir yazının tüm yorumlarını getir (hiyerarşik)
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId, approved: true }).sort({ createdAt: -1 });
    const commentTree = buildCommentTree(comments);
    res.json(commentTree);
  } catch (err) {
    res.status(500).json({ error: 'Yorumlar alınamadı.' });
  }
});

// Belirli bir yazıya yeni yorum ekle
router.post('/:postId', async (req, res) => {
  try {
    const { name, email, text, parentId } = req.body;
    const comment = new Comment({
      post: req.params.postId,
      name,
      email,
      text,
      parentId: parentId || null,
      approved: false
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: 'Yorum eklenemedi.' });
  }
});

module.exports = router; 