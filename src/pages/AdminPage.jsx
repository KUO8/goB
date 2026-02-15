import React, { useState, useEffect } from 'react';
import { getSchedule, getTrainers } from '../api/config';
import { getRegistrations, updateRegistrationStatus } from '../api/adminApi';
import DashboardStats from '../components/admin/DashboardStats';
import RegistrationsTable from '../components/admin/RegistrationsTable';
import PopularityChart from '../components/admin/PopularityChart';
import AgeDistributionChart from '../components/admin/AgeDistributionChart';
import ScheduleManager from '../components/admin/ScheduleManager';
import { LogOut, Settings, Users, Calendar, TrendingUp } from 'lucide-react';
import './AdminPage.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [registrations, setRegistrations] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    window.location.href = '/'; // Используем window.location вместо navigate
  };

  // Простая авторизация (для курсовой)
  const handleLogin = (e) => {
    e.preventDefault();
    // В реальном проекте используйте нормальную авторизацию!
    if (password === 'admin123') { // Простой пароль для демо
      setIsAuthenticated(true);
    } else {
      alert('Неверный пароль');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const [regs, sched, trainersData] = await Promise.all([
            getRegistrations(),
            getSchedule(),
            getTrainers()
          ]);
          setRegistrations(regs);
          setSchedule(sched);
          setTrainers(trainersData);
        } catch (error) {
          console.error('Error loading admin data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [isAuthenticated]);

  // Форма входа
  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-box">
          <div className="login-icon">🔐</div>
          <h2>Вход в админ-панель</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button type="submit">Войти</button>
          </form>
          <p className="login-hint">Подсказка: admin123</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-basketball">🏀</div>
        <p>Загружаем данные админки...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Дашборд', icon: TrendingUp },
    { id: 'registrations', label: 'Заявки', icon: Users },
    { id: 'schedule', label: 'Управление расписанием', icon: Calendar },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ];

  return (
    <div className="admin-page">
      {/* Боковое меню */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <span className="logo-icon">🏀</span>
          <h2>Admin Panel</h2>
        </div>
        
        <nav className="sidebar-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Выйти</span>
        </button>
      </div>

      {/* Основной контент */}
      <div className="admin-content">
        {activeTab === 'dashboard' && (
          <>
            <h1 className="content-title">Панель управления</h1>
            <DashboardStats registrations={registrations} schedule={schedule} />
            
            <div className="charts-grid">
              <div className="chart-card">
                <h3>Популярность тренировок</h3>
                <PopularityChart registrations={registrations} schedule={schedule} />
              </div>
              
              <div className="chart-card">
                <h3>Возрастное распределение</h3>
                <AgeDistributionChart registrations={registrations} />
              </div>
            </div>
          </>
        )}

        {activeTab === 'registrations' && (
          <>
            <h1 className="content-title">Заявки на тренировки</h1>
            <RegistrationsTable 
              registrations={registrations} 
              schedule={schedule}
              trainers={trainers}
              onStatusChange={async (id, status) => {
                await updateRegistrationStatus(id, status);
                // Обновляем список
                const updated = await getRegistrations();
                setRegistrations(updated);
              }}
            />
          </>
        )}

        {activeTab === 'schedule' && (
          <>
            <h1 className="content-title">Управление расписанием</h1>
            <ScheduleManager 
              schedule={schedule} 
              trainers={trainers}
              onUpdate={async () => {
                const updated = await getSchedule();
                setSchedule(updated);
              }}
            />
          </>
        )}

        {activeTab === 'settings' && (
          <>
            <h1 className="content-title">Настройки</h1>
            <div className="settings-card">
              <h3>Настройки сайта</h3>
              <p>Здесь будут настройки секции, контакты и прочее</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;