import React from 'react';
import { Calendar, Clock, MapPin, Users, Award } from 'lucide-react';
import './TrainingCard.css';

const TrainingCard = ({ training, trainerName, onRegister }) => {
  // Определяем цвет возрастной группы
  const getGroupColor = (groupName) => {
    if (groupName.includes('Младшая')) return '#4caf50';
    if (groupName.includes('Средняя')) return '#ff9800';
    if (groupName.includes('Старшая')) return '#f44336';
    return '#1e3a8a';
  };

  const groupColor = getGroupColor(training.group_name);

  return (
    <div className="training-card">
      {/* Верхняя полоса с цветом группы */}
      <div className="card-strip" style={{ backgroundColor: groupColor }} />
      
      <div className="card-content">
        {/* Заголовок с днем и временем */}
        <div className="card-header">
          <span className="day-badge">
            <Calendar size={16} />
            {training.day}
          </span>
          <span className="time-badge" style={{ backgroundColor: groupColor + '20', color: groupColor }}>
            <Clock size={16} />
            {training.time}
          </span>
        </div>

        {/* Название группы */}
        <h3 className="group-name">{training.group_name}</h3>

        {/* Информация о тренере */}
        <div className="info-row">
          <Award size={18} className="info-icon" style={{ color: groupColor }} />
          <span className="info-text">Тренер: <strong>{trainerName}</strong></span>
        </div>

        {/* Место проведения */}
        <div className="info-row">
          <MapPin size={18} className="info-icon" style={{ color: groupColor }} />
          <span className="info-text">{training.location}</span>
        </div>

        {/* Количество мест */}
        <div className="info-row">
          <Users size={18} className="info-icon" style={{ color: groupColor }} />
          <span className="info-text">
            {training.max_participants} мест • 
            <span className="free-spots"> {Math.floor(Math.random() * 5) + 1} свободно</span>
          </span>
        </div>

        {/* Кнопка записи */}
        <button 
          className="register-btn"
          style={{ 
            background: `linear-gradient(135deg, ${groupColor}, ${groupColor}dd)`,
            boxShadow: `0 4px 10px ${groupColor}80`
          }}
          onClick={() => onRegister(training)}
        >
          Записаться на тренировку 🏀
        </button>
      </div>

      {/* Декоративный элемент - баскетбольный мяч */}
      <div className="card-basketball">🏀</div>
    </div>
  );
};

export default TrainingCard;