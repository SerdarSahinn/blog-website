import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import EmojiPicker from 'emoji-picker-react';

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({ name: "", email: "", text: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showReplyEmojiPicker, setShowReplyEmojiPicker] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const resPost = await fetch(`/api/posts/${id}`);
        const postData = await resPost.json();
        setPost(postData);
        const resComments = await fetch(`/api/comments/${id}`);
        const commentsData = await resComments.json();
        setComments(commentsData);
      } catch (err) {
        setError("Veriler alınamadı.");
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const handleChange = e => {
    setCommentForm({ ...commentForm, [e.target.name]: e.target.value });
  };

  const onEmojiClick = (emojiObject) => {
    setCommentForm(prev => ({
      ...prev,
      text: prev.text + emojiObject.emoji
    }));
    setShowEmojiPicker(false);
  };

  const onReplyEmojiClick = (emojiObject) => {
    setCommentForm(prev => ({
      ...prev,
      text: prev.text + emojiObject.emoji
    }));
    setShowReplyEmojiPicker(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...commentForm,
          parentId: replyingTo
        })
      });
      if (!res.ok) throw new Error("Yorum eklenemedi.");
      setCommentForm({ name: "", email: "", text: "" });
      setReplyingTo(null);
      setShowEmojiPicker(false);
      setShowReplyEmojiPicker(false);
      setSuccess("Yorumunuz başarılı bir şekilde gönderildi, admin onayı bekleniyor.");
      // Yorumları tekrar çek
      const resComments = await fetch(`/api/comments/${id}`);
      const commentsData = await resComments.json();
      setComments(commentsData);
    } catch (err) {
      setError("Yorum eklenemedi.");
    }
    setSending(false);
  };

  const handleReply = (commentId) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setShowReplyEmojiPicker(false);
  };

  const renderComment = (comment, level = 0) => (
    <div key={comment._id} style={{
      background: "#f7f6f5", 
      borderRadius: 8, 
      padding: 16, 
      boxShadow: "0 2px 8px #FFD60011",
      marginLeft: level * 20,
      borderLeft: level > 0 ? "3px solid #FFD600" : "none"
    }}>
      <div style={{fontWeight: 600, color: "#7F7FD5"}}>
        {comment.name} 
        <span style={{color:'#aaa', fontWeight:400, fontSize:14, marginLeft:8}}>
          {new Date(comment.date).toLocaleDateString("tr-TR")} {new Date(comment.date).toLocaleTimeString("tr-TR",{hour:'2-digit',minute:'2-digit'})}
        </span>
      </div>
      <div style={{color: "#333", fontSize: 17, marginTop: 6, marginBottom: 8}}>{comment.text}</div>
      <button 
        onClick={() => handleReply(comment._id)}
        style={{
          background: "transparent",
          border: "1px solid #FFD600",
          color: "#FFD600",
          padding: "4px 12px",
          borderRadius: 4,
          cursor: "pointer",
          fontSize: 14
        }}
      >
        {replyingTo === comment._id ? "İptal" : "Yanıtla"}
      </button>
      
      {replyingTo === comment._id && (
        <form onSubmit={handleSubmit} style={{marginTop: 12, padding: 12, background: "#fff", borderRadius: 6}}>
          <div style={{position: "relative"}}>
            <textarea 
              name="text" 
              value={commentForm.text} 
              onChange={handleChange} 
              required 
              placeholder="Yanıtınız..." 
              rows={2} 
              style={{width:"100%", padding:8, borderRadius:4, border:"1px solid #FFD600", fontSize:14, marginBottom:8}} 
            />
            <button 
              type="button"
              onClick={() => setShowReplyEmojiPicker(!showReplyEmojiPicker)}
              style={{
                position: "absolute",
                right: 8,
                top: 8,
                background: "transparent",
                border: "none",
                fontSize: 20,
                cursor: "pointer"
              }}
            >
              😊
            </button>
          </div>
          {showReplyEmojiPicker && (
            <div style={{position: "absolute", zIndex: 1000, marginTop: -200}}>
              <EmojiPicker onEmojiClick={onReplyEmojiClick} />
            </div>
          )}
          <div style={{display: "flex", gap: 8}}>
            <input 
              name="name" 
              value={commentForm.name} 
              onChange={handleChange} 
              required 
              placeholder="Adınız" 
              style={{flex:1, padding:8, borderRadius:4, border:"1px solid #FFD600", fontSize:14}} 
            />
            <input 
              name="email" 
              value={commentForm.email} 
              onChange={handleChange} 
              required 
              placeholder="E-posta" 
              type="email" 
              style={{flex:1, padding:8, borderRadius:4, border:"1px solid #FFD600", fontSize:14}} 
            />
          </div>
          <button 
            type="submit" 
            disabled={sending} 
            style={{
              background:"#FFD600", 
              color:"#222", 
              fontWeight:600, 
              fontSize:14, 
              border:"none", 
              borderRadius:4, 
              padding:"6px 16px", 
              cursor:"pointer",
              marginTop: 8
            }}
          >
            {sending ? "Gönderiliyor..." : "Yanıt Gönder"}
          </button>
        </form>
      )}
      
      {comment.replies && comment.replies.length > 0 && (
        <div style={{marginTop: 12}}>
          {comment.replies.map(reply => renderComment(reply, level + 1))}
        </div>
      )}
    </div>
  );

  if (loading) return <div style={{textAlign:'center',marginTop:60}}>Yükleniyor...</div>;
  if (!post) return <div style={{textAlign:'center',marginTop:60}}>Yazı bulunamadı.</div>;

  return (
    <>
      <Helmet>
        <title>{post.title} | Modern Blog</title>
        <meta name="description" content={post.summary || post.title} />
      </Helmet>
      <div style={{maxWidth: 800, margin: "60px auto", padding: 24, background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px #FFD60022", position: 'relative'}}>
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: -32,
            left: 24,
            zIndex: 10,
            background: 'linear-gradient(90deg,#FFD600,#7F7FD5)',
            color: '#222',
            fontWeight: 700,
            fontSize: 20,
            border: 'none',
            borderRadius: 32,
            boxShadow: '0 4px 16px #FFD60055',
            padding: '12px 28px 12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            transition: 'all 0.2s',
            outline: 'none',
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'linear-gradient(90deg,#7F7FD5,#FFD600)';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.boxShadow = '0 6px 24px #7F7FD555';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'linear-gradient(90deg,#FFD600,#7F7FD5)';
            e.currentTarget.style.color = '#222';
            e.currentTarget.style.boxShadow = '0 4px 16px #FFD60055';
          }}
        >
          <span style={{fontSize: 26, marginRight: 4, transition: 'color 0.2s'}}>←</span> Geri Dön
        </button>
        <h1 style={{fontSize: "2.5rem", fontWeight: "bold", marginBottom: 12}}>{post.title}</h1>
        <div style={{color: "#888", marginBottom: 18}}>
          {post.author} &bull; {new Date(post.date).toLocaleDateString("tr-TR")} &bull; {post.category} &bull; 👁️ {post.viewCount || 0} okuma
        </div>
        {post.image && <img src={post.image} alt={post.title} style={{width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 12, marginBottom: 24}} onError={e => {e.target.onerror=null; e.target.src='https://via.placeholder.com/600x220?text=G%C3%B6rsel+Yok';}} />}
        <div style={{fontSize: 20, color: "#333", marginBottom: 32, whiteSpace: "pre-line"}}>{post.content}</div>
        <hr style={{margin: "40px 0 24px 0", border:0, borderTop: "2px solid #FFD600"}} />
        <h2 style={{fontSize: "1.5rem", marginBottom: 18}}>Yorumlar</h2>
        {comments.length === 0 && <div style={{color: "#888", marginBottom: 18}}>Henüz yorum yok. İlk yorumu sen yap!</div>}
        <div style={{display: "flex", flexDirection: "column", gap: 18, marginBottom: 32}}>
          {comments.map(comment => renderComment(comment))}
        </div>
        {!replyingTo && (
          <form onSubmit={handleSubmit} style={{background: "#f7f6f5", borderRadius: 10, padding: 24, boxShadow: "0 2px 8px #FFD60022", maxWidth: 500, position: "relative"}}>
            <div style={{display: "flex", gap: 12, marginBottom: 12}}>
              <input name="name" value={commentForm.name} onChange={handleChange} required placeholder="Adınız" style={{flex:1, padding:12, borderRadius:6, border:"1.5px solid #FFD600", fontSize:16}} />
              <input name="email" value={commentForm.email} onChange={handleChange} required placeholder="E-posta" type="email" style={{flex:1, padding:12, borderRadius:6, border:"1.5px solid #FFD600", fontSize:16}} />
            </div>
            <div style={{position: "relative"}}>
              <textarea name="text" value={commentForm.text} onChange={handleChange} required placeholder="Yorumunuz" rows={3} style={{width:"100%", padding:12, borderRadius:6, border:"1.5px solid #FFD600", fontSize:16, marginBottom:12}} />
              <button 
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: 12,
                  background: "transparent",
                  border: "none",
                  fontSize: 24,
                  cursor: "pointer"
                }}
              >
                😊
              </button>
            </div>
            {showEmojiPicker && (
              <div style={{position: "absolute", zIndex: 1000, marginTop: -200}}>
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
            <button type="submit" disabled={sending} style={{background:"linear-gradient(90deg,#FFD600,#7F7FD5)", color:"#222", fontWeight:600, fontSize:17, border:"none", borderRadius:6, padding:"10px 32px", cursor:"pointer"}}>
              {sending ? "Gönderiliyor..." : "Yorum Yap"}
            </button>
            {error && <div style={{color:"#d32f2f", marginTop:10}}>{error}</div>}
            {success && <div style={{color:"#388e3c", marginTop:10}}>{success}</div>}
          </form>
        )}
      </div>
    </>
  );
}

export default BlogDetail; 