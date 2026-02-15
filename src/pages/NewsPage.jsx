import React, { useState, useEffect } from 'react';
import { Calendar, User, Eye } from 'lucide-react';
import { getNews } from '../api/config';
import './NewsPage.css';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <img src="https://i.pinimg.com/originals/fb/b6/6b/fbb66bd29e9731bfc61f2f8d00a1446d.gif" style={{width: "100px"}} alt="" />
        <p>Загружаем новости...</p>
      </div>
    );
  }

  return (
    <div className="news-page">
      <div className="container">
        <div className="page-header">
          <h1>
            <span className="header-icon">📰</span>
            Новости секции
          </h1>
          <p className="header-subtitle">
            Будьте в курсе последних событий и достижений
          </p>
        </div>

        <div className="news-grid">
          {news.map(item => (
            <div key={item.id} className="news-card">
              {item.image_url && (
                <div className="news-image">
                  <img src={item.image_url} alt={item.title} />
                </div>
              )}
              <div className="news-content">
                <div className="news-meta">
                  <span className="news-date">
                    <Calendar size={14} />
                    {item.date}
                  </span>
                </div>
                <h3 className="news-title">{item.title}</h3>
                <p className="news-excerpt">
                  {item.content.length > 150 
                    ? item.content.substring(0, 150) + '...' 
                    : item.content}
                </p>
                <button 
                  className="news-read-more"
                  onClick={() => setSelectedNews(item)}
                >
                  Читать далее
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Модальное окно с полной новостью */}
        {selectedNews && (
          <div className="modal-overlay" onClick={() => setSelectedNews(null)}>
            <div className="modal-content news-modal" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedNews(null)}>×</button>
              {selectedNews.image_url && (
                <img src={selectedNews.image_url} alt={selectedNews.title} className="modal-image" />
              )}
              <div className="modal-body">
                <div className="modal-meta">
                  <Calendar size={16} />
                  <span>{selectedNews.date}</span>
                </div>
                <h2>{selectedNews.title}</h2>
                <p>{selectedNews.content}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;