import React from 'react';
import { Phone, Mail, MapPin, Clock, Youtube } from 'lucide-react';
import './Footer.css';
import goBasket from "../assets/goBasket.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src={goBasket} alt="" style={{width: "60px"}}/>
            </div>
            <p className="footer-description">
              Профессиональная баскетбольная секция для детей и подростков. 
              Развиваем таланты с 2015 года.
            </p>
            <div className="social-links">
              {/* <a href="#" className="social-link"><Telegram size={20} /></a> */}
              <a href="#" className="social-link"><Youtube size={20} /></a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Контакты</h3>
            <ul className="contact-list">
              <li>
                <Phone size={18} />
                <a href="tel:+79991234567">+7 (999) 123-45-67</a>
              </li>
              <li>
                <Mail size={18} />
                <a href="mailto:info@basketball.ru">info@basketball.ru</a>
              </li>
              <li>
                <MapPin size={18} />
                <span>ул. Спортивная, 10, Москва</span>
              </li>
              <li>
                <Clock size={18} />
                <span>Ежедневно: 9:00 - 22:00</span>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Навигация</h3>
            <ul className="nav-list">
              <li><a href="/">Главная</a></li>
              <li><a href="/schedule">Расписание</a></li>
              <li><a href="/trainers">Тренеры</a></li>
              <li><a href="/news">Новости</a></li>
              <li><a href="/about">О нас</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Занятия в комплексе</h3>
            <div className="map-placeholder">
              <img 
                src="https://rfsolokomotiv.ru/public/news/2022-09-12/ae6e03cbecb7de45c19d24596aa66cd1.jpg" 
                alt="Карта"
                style={{ width: '100%', borderRadius: '10px' }}
              />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Basketball Section. Все права защищены.</p>
          <p>Разработано для курсовой работы</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;