import React, { useState, useEffect } from 'react';
import { getTrainers } from '../api/config';
import TrainerCard from '../components/TrainerCard';
import { Users, Search, Award, Star } from 'lucide-react';
import './TrainersPage.css';

const TrainersPage = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const data = await getTrainers();
        console.log('Trainers loaded:', data);
        setTrainers(data);
      } catch (error) {
        console.error('Ошибка загрузки тренеров:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.bio?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <img src="https://i.pinimg.com/originals/fb/b6/6b/fbb66bd29e9731bfc61f2f8d00a1446d.gif" style={{width: "100px"}} alt="" />
        <p>Загружаем тренерский состав...</p>
      </div>
    );
  }

  return (
    <div className="trainers-page basketball-bg">
      <div className="container">
        {/* Заголовок */}
        <div className="page-header">
          <h1>
            <span className="header-icon">👨‍🏫</span>
            Наши тренеры
          </h1>
          <p className="header-subtitle">
            Профессионалы своего дела, которые помогут тебе достичь высот в баскетболе
          </p>
        </div>

        {/* Статистика */}
        <div className="stats-bar">
          <div className="stat-item">
            <Users size={24} />
            <div>
              <span className="stat-number">{trainers.length}</span>
              <span className="stat-label">Тренеров</span>
            </div>
          </div>
          <div className="stat-item">
            <Award size={24} />
            <div>
              <span className="stat-number">10+</span>
              <span className="stat-label">Лет опыта</span>
            </div>
          </div>
          <div className="stat-item">
            <Star size={24} />
            <div>
              <span className="stat-number">500+</span>
              <span className="stat-label">Воспитанников</span>
            </div>
          </div>
        </div>

        {/* Поиск */}
        <div className="search-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Поиск тренера по имени или описанию..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Сетка тренеров */}
        {filteredTrainers.length > 0 ? (
          <div className="trainers-grid">
            {filteredTrainers.map((trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>Тренеры не найдены</h3>
            <p>Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainersPage;
