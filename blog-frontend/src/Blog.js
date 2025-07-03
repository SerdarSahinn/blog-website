import React, { useState, useEffect } from "react";
import './Blog.css';
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const categories = ["Tümü", "React", "Tasarım", "Kariyer"];

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Responsive stiller için
  const isMobile = window.innerWidth < 900;

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setPosts([]);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "Tümü" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      (post.summary && post.summary.toLowerCase().includes(search.toLowerCase())) ||
      (post.author && post.author.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Blog Yazıları | Modern Blog</title>
        <meta name="description" content="Güncel yazılım, tasarım ve kariyer blog yazıları. Modern ve profesyonel içerikler." />
      </Helmet>
      <div style={{maxWidth: 900, margin: "60px auto", padding: 24}}>
        <h1 className="blog-main-title">Blog Yazıları</h1>
        <div className="blog-main-desc">
          En güncel yazılar, ipuçları ve rehberler burada! Yazılım, tasarım ve kariyer üzerine profesyonel içerikler.
        </div>
        <div className="blog-filter-bar">
          <div className="blog-categories">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? "blog-category-btn active" : "blog-category-btn"}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Yazı, yazar veya özet ara..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="blog-search-input"
          />
        </div>
        <div style={{display: "flex", flexDirection: "column", gap: 36}}>
          {loading && (
            <div style={{color: "#888", fontSize: 18, textAlign: "center", margin: "40px 0"}}>
              Yükleniyor...
            </div>
          )}
          {!loading && filteredPosts.length === 0 && (
            <div style={{color: "#888", fontSize: 18, textAlign: "center", margin: "40px 0"}}>
              Sonuç bulunamadı.
            </div>
          )}
          {!loading && filteredPosts.map((post, i) => (
            <div key={post._id} className="blog-card"
              onClick={() => navigate(`/blog/${post._id}`)}
              style={{ cursor: 'pointer' }}
              onMouseOver={e => { e.currentTarget.classList.add('blog-card-hover'); }}
              onMouseOut={e => { e.currentTarget.classList.remove('blog-card-hover'); }}
            >
              <img src={post.image} alt={post.title} className="blog-card-img" onError={e => {e.target.onerror=null; e.target.src='https://via.placeholder.com/220x220?text=G%C3%B6rsel+Yok';}} />
              <div className="blog-card-content">
                <div className="blog-card-title">{post.title}</div>
                <div className="blog-card-summary">{post.summary}</div>
                <div className="blog-card-meta">
                  {post.author} &bull; {new Date(post.date).toLocaleDateString("tr-TR")}
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                  <button onClick={e => { e.stopPropagation(); navigate(`/blog/${post._id}`); }} className="blog-detail-btn">Devamını Oku</button>
                  <button onClick={e => { e.stopPropagation(); navigate(`/blog/${post._id}`); }} className="blog-comment-btn">Yorumlar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Blog; 