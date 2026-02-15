import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Users, Newspaper, Info, LogIn } from 'lucide-react';
import './Navigation.css';
import goBasket from "../assets/goBasket.png";

const Navigation = () => {
  const location = useLocation();
  const currentPage = location.pathname.substring(1) || 'schedule';

  const navItems = [
    { path: '/schedule', icon: Calendar, label: 'Расписание' },
    { path: '/trainers', icon: Users, label: 'Тренеры' },
    { path: '/news', icon: Newspaper, label: 'Новости' },
    { path: '/about', icon: Info, label: 'О нас' },
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src={goBasket} alt="" style={{width: "60px"}}/>
        </Link>
        
        <div className="nav-links">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`nav-link ${location.pathname === path ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;