import React from 'react';
import { Award, Star, Calendar, Phone, Mail, Send } from 'lucide-react';
import './TrainerCard.css';

const TrainerCard = ({ trainer }) => {
  // Генерируем аватарку на основе имени, если нет фото
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  // Генерируем Telegram ссылку
  const getTelegramLink = () => {
    // Если есть username в trainer, используем его, иначе генерируем из имени
    const username = trainer.telegram || trainer.name.toLowerCase().replace(' ', '_');
    return `https://t.me/${username}`;
  };

  // Генерируем phone ссылку
  const getPhoneLink = () => {
    // Если есть телефон, используем его, иначе показываем кнопку "Позвонить" без номера
    return trainer.phone ? `tel:${trainer.phone}` : '#';
  };

  return (
    <div className="trainer-card">
      <div className="trainer-image">
        {trainer.photo_url ? (
          <img src={trainer.photo_url} alt={trainer.name} />
        ) : (
          <div className="trainer-initials">
            {getInitials(trainer.name)}
          </div>
        )}
        <div className="trainer-level">
          {trainer.experience}
        </div>
      </div>

      <div className="trainer-info">
        <h3 className="trainer-name">{trainer.name}</h3>
        
        <div className="trainer-badges">
          <span className="badge">
            <Award size={14} />
            {trainer.achievements || 'Опытный тренер'}
          </span>
        </div>

        <p className="trainer-bio">{trainer.bio || 'Профессиональный тренер по баскетболу'}</p>

        <div className="trainer-stats">
          <div className="stat">
            <Calendar size={18} />
            <span>Стаж: {trainer.experience}</span>
          </div>
          <div className="stat">
            <Star size={18} />
            <span>Рейтинг: 5.0</span>
          </div>
        </div>

        <div className="trainer-contacts">
          <a 
            href={getPhoneLink()} 
            className="contact-btn phone"
            onClick={(e) => {
              if (!trainer.phone) {
                e.preventDefault();
                alert('Контактный телефон скоро появится');
              }
            }}
          >
            <Phone size={16} />
            {trainer.phone ? 'Позвонить' : 'Скоро'}
          </a>
          <a 
            href={getTelegramLink()} 
            className="contact-btn telegram"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!trainer.telegram) {
                e.preventDefault();
                alert('Telegram скоро появится');
              }
            }}
          >
            <Send size={16} />
            Telegram
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;