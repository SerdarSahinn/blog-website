import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [posts, setPosts] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [pendingComments, setPendingComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
    
    // Her 30 saniyede bir istatistikleri güncelle (sadece autoRefresh açıksa)
    const interval = setInterval(() => {
      if (autoRefresh) {
        fetchData();
      }
    }, 30000); // 30 saniye
    
    // Component unmount olduğunda interval'i temizle
    return () => clearInterval(interval);
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [statsRes, postsRes, contactRes, pendingRes] = await Promise.all([
        fetch('/api/admin/stats', {
          headers: { adminpassword: localStorage.getItem('adminToken') || 'admin123' }
        }),
        fetch('/api/admin/posts', {
          headers: { adminpassword: localStorage.getItem('adminToken') || 'admin123' }
        }),
        fetch('/api/admin/contact-messages', {
          headers: { adminpassword: localStorage.getItem('adminToken') || 'admin123' }
        }),
        fetch('/api/admin/pending-comments', {
          headers: { adminpassword: localStorage.getItem('adminToken') || 'admin123' }
        })
      ]);
      const [statsData, postsData, contactData, pendingData] = await Promise.all([
        statsRes.json(),
        postsRes.json(),
        contactRes.json(),
        pendingRes.json()
      ]);
      setStats(statsData);
      setPosts(Array.isArray(postsData) ? postsData : []);
      setContactMessages(Array.isArray(contactData) ? contactData : []);
      setPendingComments(Array.isArray(pendingData) ? pendingData : []);
      setLastUpdate(new Date());
    } catch (err) {
      setPosts([]);
      setContactMessages([]);
      setPendingComments([]);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchData();
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  if (loading) {
    return <div style={{textAlign: 'center', marginTop: 60}}>Yükleniyor...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Modern Blog</title>
      </Helmet>
      <div style={{minHeight: '100vh', background: '#f5f5f5'}}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(90deg, #FFD600, #7F7FD5)',
          padding: '20px 0',
          color: '#222'
        }}>
          <div style={{maxWidth: 1200, margin: '0 auto', padding: '0 20px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h1 style={{margin: 0, fontSize: '2rem'}}>📊 Admin Dashboard</h1>
              <div style={{display: 'flex', gap: 12}}>
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: 8,
                    color: '#222',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: 600,
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? '🔄 Yenileniyor...' : '🔄 Yenile'}
                </button>
                <button
                  onClick={toggleAutoRefresh}
                  style={{
                    background: autoRefresh ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: 8,
                    color: '#222',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  {autoRefresh ? '⏸️ Otomatik Açık' : '▶️ Otomatik Kapalı'}
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: 8,
                    color: '#222',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{maxWidth: 1200, margin: '0 auto', padding: '20px'}}>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: 10,
            marginBottom: 30,
            background: 'white',
            padding: 10,
            borderRadius: 12,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 600,
                background: activeTab === 'dashboard' ? '#FFD600' : 'transparent',
                color: activeTab === 'dashboard' ? '#222' : '#666'
              }}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 600,
                background: activeTab === 'posts' ? '#FFD600' : 'transparent',
                color: activeTab === 'posts' ? '#222' : '#666'
              }}
            >
              📝 Yazılar
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 600,
                background: activeTab === 'contact' ? '#FFD600' : 'transparent',
                color: activeTab === 'contact' ? '#222' : '#666'
              }}
            >
              📬 İletişim Mesajları
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 600,
                background: activeTab === 'pending' ? '#FFD600' : 'transparent',
                color: activeTab === 'pending' ? '#222' : '#666'
              }}
            >
              ⏳ Onay Bekleyen Yorumlar
            </button>
          </div>

          {/* Stats */}
          {activeTab === 'dashboard' && stats && (
            <>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, marginBottom: 20}}>
                <div style={{background: 'white', padding: 24, borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
                  <h3 style={{margin: '0 0 10px 0', color: '#333'}}>📊 Toplam Yazı</h3>
                  <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#FFD600'}}>{stats.totalPosts}</div>
                </div>
                <div style={{background: 'white', padding: 24, borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
                  <h3 style={{margin: '0 0 10px 0', color: '#333'}}>💬 Toplam Yorum</h3>
                  <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#7F7FD5'}}>{stats.totalComments}</div>
                </div>
                <div style={{background: 'white', padding: 24, borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
                  <h3 style={{margin: '0 0 10px 0', color: '#333'}}>👁️ Toplam Görüntüleme</h3>
                  <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#FF6B6B'}}>{stats.totalViews}</div>
                </div>
              </div>
              {lastUpdate && (
                <div style={{
                  textAlign: 'center',
                  color: '#666',
                  fontSize: '14px',
                  marginBottom: '30px',
                  background: 'white',
                  padding: '12px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                  📅 Son Güncelleme: {lastUpdate.toLocaleString('tr-TR')}
                </div>
              )}
            </>
          )}

          {/* Posts Table */}
          {activeTab === 'posts' && (
            <div style={{background: 'white', borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden'}}>
              <h2 style={{margin: '20px', color: '#333'}}>📝 Blog Yazıları</h2>
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                  <tr style={{background: '#f8f9fa'}}>
                    <th style={{padding: 16, textAlign: 'left', borderBottom: '1px solid #dee2e6'}}>Başlık</th>
                    <th style={{padding: 16, textAlign: 'left', borderBottom: '1px solid #dee2e6'}}>Kategori</th>
                    <th style={{padding: 16, textAlign: 'left', borderBottom: '1px solid #dee2e6'}}>Görüntüleme</th>
                    <th style={{padding: 16, textAlign: 'left', borderBottom: '1px solid #dee2e6'}}>Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map(post => (
                      <tr key={post._id} style={{borderBottom: '1px solid #dee2e6'}}>
                        <td style={{padding: 16}}>{post.title}</td>
                        <td style={{padding: 16}}>{post.category || '-'}</td>
                        <td style={{padding: 16}}>{post.viewCount || 0}</td>
                        <td style={{padding: 16}}>{new Date(post.createdAt).toLocaleDateString('tr-TR')}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{padding: 16, textAlign: 'center', color: '#666'}}>
                        Henüz blog yazısı yok
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Contact Messages Tab */}
          {activeTab === 'contact' && (
            <div>
              <h2 style={{margin: '0 0 20px 0', color: '#333'}}>📬 İletişim Mesajları</h2>
              <div style={{background: 'white', borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden'}}>
                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                  <thead>
                    <tr style={{background: '#f8f9fa'}}>
                      <th style={{padding: 16, textAlign: 'left', borderBottom: '1px solid #dee2e6'}}>Ad</th>
                      <th style={{padding: 16, textAlign: 'left', borderBottom: '1px solid #dee2e6'}}>E-posta</th>
                      <th style={{padding: 16, textAlign: 'left', borderBottom: '1px solid #dee2e6'}}>Mesaj</th>
                      <th style={{padding: 16, textAlign: 'left', borderBottom: '1px solid #dee2e6'}}>Tarih</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactMessages.length === 0 ? (
                      <tr><td colSpan="4" style={{padding: 16, textAlign: 'center', color: '#888'}}>Henüz iletişim mesajı yok</td></tr>
                    ) : (
                      contactMessages.map(msg => (
                        <tr key={msg._id} style={{borderBottom: '1px solid #dee2e6'}}>
                          <td style={{padding: 16}}>{msg.name}</td>
                          <td style={{padding: 16}}>{msg.email}</td>
                          <td style={{padding: 16, maxWidth: 400, wordBreak: 'break-word'}}>{msg.message}</td>
                          <td style={{padding: 16}}>{new Date(msg.date).toLocaleString('tr-TR')}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pending Comments Tab */}
          {activeTab === 'pending' && (
            <div>
              <h2 style={{margin: '0 0 20px 0', color: '#333'}}>⏳ Onay Bekleyen Yorumlar</h2>
              <div style={{background: 'white', borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden'}}>
                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                  <thead>
                    <tr style={{background: '#f8f9fa'}}>
                      <th style={{padding: 16, textAlign: 'left', borderBottom: '1px solid #dee2e6'}}>Ad</th>
                      <th style={{padding: 16, textAlign: 'left', borderBottom: '1px solid #dee2e6'}}>E-posta</th>
                      <th style={{padding: 16, textAlign: 'left', borderBottom: '1px solid #dee2e6'}}>Yorum</th>
                      <th style={{padding: 16, textAlign: 'left', borderBottom: '1px solid #dee2e6'}}>Yazı</th>
                      <th style={{padding: 16, textAlign: 'left', borderBottom: '1px solid #dee2e6'}}>Tarih</th>
                      <th style={{padding: 16, textAlign: 'left', borderBottom: '1px solid #dee2e6'}}>İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingComments.length === 0 ? (
                      <tr><td colSpan="6" style={{padding: 16, textAlign: 'center', color: '#888'}}>Onay bekleyen yorum yok</td></tr>
                    ) : (
                      pendingComments.map(c => (
                        <tr key={c._id} style={{borderBottom: '1px solid #dee2e6'}}>
                          <td style={{padding: 16}}>{c.name}</td>
                          <td style={{padding: 16}}>{c.email}</td>
                          <td style={{padding: 16, maxWidth: 300, wordBreak: 'break-word'}}>{c.text}</td>
                          <td style={{padding: 16}}>{c.post?.title || 'Silinmiş yazı'}</td>
                          <td style={{padding: 16}}>{new Date(c.date).toLocaleString('tr-TR')}</td>
                          <td style={{padding: 16}}>
                            <button
                              onClick={async () => {
                                await fetch(`/api/admin/approve-comment/${c._id}`, {
                                  method: 'PUT',
                                  headers: { adminpassword: localStorage.getItem('adminToken') || 'admin123' }
                                });
                                fetchData();
                              }}
                              style={{
                                background: '#4caf50',
                                color: 'white',
                                border: 'none',
                                borderRadius: 6,
                                padding: '6px 18px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: 15
                              }}
                            >
                              Onayla
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard; 