import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', 'admin123');
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Giriş başarısız');
      }
    } catch (err) {
      setError('Bağlantı hatası');
    }

    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Admin Girişi | Modern Blog</title>
      </Helmet>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 20
      }}>
        <div style={{
          background: 'white',
          padding: 40,
          borderRadius: 16,
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          width: '100%',
          maxWidth: 400
        }}>
          <h1 style={{
            textAlign: 'center',
            marginBottom: 30,
            color: '#333',
            fontSize: '2rem',
            fontWeight: 'bold'
          }}>
            🔐 Admin Girişi
          </h1>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label style={{
                display: 'block',
                marginBottom: 8,
                color: '#555',
                fontWeight: 600
              }}>
                Şifre
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 8,
                  border: '2px solid #e1e5e9',
                  fontSize: 16,
                  transition: 'border-color 0.3s'
                }}
                placeholder="Admin şifresini girin"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: 12,
                background: 'linear-gradient(90deg, #FFD600, #7F7FD5)',
                color: '#222',
                border: 'none',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>
            
            {error && (
              <div style={{
                marginTop: 16,
                padding: 12,
                background: '#ffebee',
                color: '#c62828',
                borderRadius: 8,
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}
          </form>
          
          <div style={{
            marginTop: 20,
            textAlign: 'center',
            color: '#666',
            fontSize: 14
          }}>
            <p>Test şifresi: <strong>admin123</strong></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin; 