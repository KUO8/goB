import React from 'react';
import { Award, Users, Target, Heart, Trophy, Clock } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container">
        {/* Герой секция */}
        <div className="about-hero">
          <h1>О нашей секции</h1>
          <p className="hero-subtitle">
            Развиваем баскетбол с 2015 года. Более 500 воспитанников, 
            10 профессиональных тренеров и 5 собственных залов.
          </p>
        </div>

        {/* Миссия и ценности */}
        <div className="mission-section">
          <h2>Наша миссия</h2>
          <div className="mission-cards">
            <div className="mission-card">
              <Target className="mission-icon" />
              <h3>Развитие</h3>
              <p>Развиваем не только спортивные навыки, но и лидерские качества</p>
            </div>
            <div className="mission-card">
              <Heart className="mission-icon" />
              <h3>Забота</h3>
              <p>Индивидуальный подход к каждому ребенку</p>
            </div>
            <div className="mission-card">
              <Trophy className="mission-icon" />
              <h3>Результат</h3>
              <p>Наши воспитанники - победители городских соревнований</p>
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="stats-section">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Воспитанников</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10</span>
            <span className="stat-label">Тренеров</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5</span>
            <span className="stat-label">Залов</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Турниров</span>
          </div>
        </div>

        {/* Преимущества */}
        <div className="advantages-section">
          <h2>Почему выбирают нас</h2>
          <div className="advantages-grid">
            <div className="advantage-card">
              <Clock size={32} />
              <h3>Удобное расписание</h3>
              <p>Занятия утром, днем и вечером. Выбирайте удобное время</p>
            </div>
            <div className="advantage-card">
              <Award size={32} />
              <h3>Профессиональные тренеры</h3>
              <p>Мастера спорта с опытом работы с детьми</p>
            </div>
            <div className="advantage-card">
              <Users size={32} />
              <h3>Небольшие группы</h3>
              <p>До 15 человек в группе - индивидуальный подход</p>
            </div>
          </div>
        </div>

        {/* Тренировочный процесс */}
        <div className="process-section">
          <h2>Как проходят тренировки</h2>
          <div className="process-timeline">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Разминка</h3>
                <p>20 минут разминки и ОФП</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Техника</h3>
                <p>Отработка бросков, передач, ведения</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Тактика</h3>
                <p>Изучение игровых схем и комбинаций</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Игра</h3>
                <p>Двусторонняя игра и отработка навыков</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;