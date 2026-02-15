import React from 'react';
import { Users, Calendar, Clock, TrendingUp } from 'lucide-react';
import './DashboardStats.css';

const DashboardStats = ({ registrations, schedule }) => {
  // Подсчет статистики
  const totalRegistrations = registrations.length;
  const newRegistrations = registrations.filter(r => r.status === 'new').length;
  const confirmedRegistrations = registrations.filter(r => r.status === 'confirmed').length;
  const totalTrainings = schedule.length;

  // Уникальные посетители (по телефону)
  const uniquePhones = new Set(registrations.map(r => r.parent_phone)).size;

  const stats = [
    {
      title: 'Всего заявок',
      value: totalRegistrations,
      icon: Users,
      color: '#ff6b00',
      bgColor: 'rgba(255,107,0,0.1)'
    },
    {
      title: 'Новые заявки',
      value: newRegistrations,
      icon: Clock,
      color: '#2196f3',
      bgColor: 'rgba(33,150,243,0.1)'
    },
    {
      title: 'Подтверждено',
      value: confirmedRegistrations,
      icon: TrendingUp,
      color: '#4caf50',
      bgColor: 'rgba(76,175,80,0.1)'
    },
    {
      title: 'Уникальных клиентов',
      value: uniquePhones,
      icon: Calendar,
      color: '#9c27b0',
      bgColor: 'rgba(156,39,176,0.1)'
    }
  ];

  return (
    <div className="dashboard-stats">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card" style={{ background: stat.bgColor }}>
          <div className="stat-icon" style={{ color: stat.color }}>
            <stat.icon size={32} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-title">{stat.title}</span>
          </div>
          <div className="stat-trend" style={{ color: stat.color }}>
            ↑ +12%
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;