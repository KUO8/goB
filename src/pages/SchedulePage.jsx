import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getSchedule, getTrainers } from '../api/config';
import TrainingCard from '../components/TrainingCard';
import RegistrationModal from '../components/RegistrationModal';
import { Filter, Calendar as CalendarIcon, Loader } from 'lucide-react';
import './SchedulePage.css';
import goBasket from "../assets/goBasket.png"

const SchedulePage = () => {
  const [schedule, setSchedule] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true); // Новый флаг для первой загрузки
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedDay, setSelectedDay] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Загружаем данные
  useEffect(() => {
    let mounted = true;
    let timeoutId;

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Устанавливаем таймаут для безопасности
        timeoutId = setTimeout(() => {
          if (mounted && loading) {
            console.log('Loading timeout - showing error');
            setError('Превышено время загрузки. Проверьте соединение.');
            setLoading(false);
            setInitialLoading(false);
          }
        }, 15000); // 15 секунд таймаут

        console.log('Starting data fetch...');
        
        // Загружаем параллельно
        const [scheduleData, trainersData] = await Promise.all([
          getSchedule(),
          getTrainers()
        ]);
        
        if (mounted) {
          console.log('Data received - schedule:', scheduleData?.length, 'trainers:', trainersData?.length);
          
          // Убеждаемся, что данные - массивы
          const scheduleArray = Array.isArray(scheduleData) ? scheduleData : [];
          const trainersArray = Array.isArray(trainersData) ? trainersData : [];
          
          setSchedule(scheduleArray);
          setTrainers(trainersArray);
          
          // Если данные пустые, показываем сообщение
          if (scheduleArray.length === 0) {
            setError('Нет доступных тренировок');
          } else {
            setError(null);
          }
        }
      } catch (err) {
        if (mounted) {
          console.error('Error loading data:', err);
          setError('Не удалось загрузить данные. Попробуйте обновить страницу.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
          setInitialLoading(false);
          clearTimeout(timeoutId);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // Мемоизируем функции
  const getTrainerName = useCallback((trainerId) => {
    const trainer = trainers.find(t => t.id == trainerId);
    return trainer ? trainer.name : 'Не назначен';
  }, [trainers]);

  // Получаем уникальные дни ТОЛЬКО если есть расписание
  const uniqueDays = useMemo(() => {
    if (!schedule.length) return ['all'];
    const days = [...new Set(schedule.map(item => item.day).filter(Boolean))];
    return ['all', ...days];
  }, [schedule]);

  // Фильтруем расписание
  const filteredSchedule = useMemo(() => {
    if (!schedule.length) return [];
    
    return schedule.filter(item => {
      const ageMatch = filter === 'all' || (item.group_name && item.group_name.includes(filter));
      const dayMatch = selectedDay === 'all' || item.day === selectedDay;
      return ageMatch && dayMatch;
    });
  }, [schedule, filter, selectedDay]);

  // Группируем по дням
  const groupedByDay = useMemo(() => {
    if (!filteredSchedule.length) return {};
    
    return filteredSchedule.reduce((acc, item) => {
      const day = item.day || 'Другой';
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(item);
      return acc;
    }, {});
  }, [filteredSchedule]);

  // Сортируем дни
  const sortedDays = useMemo(() => {
    const dayOrder = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    return Object.keys(groupedByDay).sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
  }, [groupedByDay]);

  const handleRegister = useCallback((training) => {
    setSelectedTraining({
      ...training,
      trainer_name: getTrainerName(training.trainer_id)
    });
    setModalOpen(true);
  }, [getTrainerName]);

  const handleRegistrationSuccess = useCallback(() => {
    setSuccessMessage('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
    setTimeout(() => setSuccessMessage(''), 5000);
  }, []);

  // Показываем загрузку ТОЛЬКО при первой загрузке
  if (initialLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Загружаем расписание...</p>
        <p className="loading-subtitle">Это может занять несколько секунд</p>
      </div>
    );
  }

  // Показываем ошибку, если она есть И нет данных
  if (error && schedule.length === 0) {
    return (
      <div className="container">
        <div className="error-message">
          <h3>⚠️ {error}</h3>
          <p>Попробуйте обновить страницу или зайдите позже</p>
          <button 
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Обновить страницу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="schedule-page">
      <div className="container">
        {/* Уведомление об успехе */}
        {successMessage && (
          <div className="success-notification">
            {successMessage}
          </div>
        )}

        {/* Заголовок */}
        <div className="page-header">
          <h1>
            <img src={goBasket} alt="" style={{width: "130px"}}/>
            Расписание тренировок
          </h1>
          <p className="header-subtitle">Выбери свою группу и присоединяйся к команде!</p>
        </div>

        {/* Фильтры - показываем только если есть данные */}
        {schedule.length > 0 && (
          <div className="filters-section">
            <div className="filter-group">
              <div className="filter-label">
                <Filter size={18} />
                <span>Возрастная группа:</span>
              </div>
              <div className="filter-buttons">
                <button 
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  Все
                </button>
                <button 
                  className={`filter-btn ${filter === 'Младшая' ? 'active' : ''}`}
                  onClick={() => setFilter('Младшая')}
                >
                  7-10 лет
                </button>
                <button 
                  className={`filter-btn ${filter === 'Средняя' ? 'active' : ''}`}
                  onClick={() => setFilter('Средняя')}
                >
                  11-14 лет
                </button>
                <button 
                  className={`filter-btn ${filter === 'Старшая' ? 'active' : ''}`}
                  onClick={() => setFilter('Старшая')}
                >
                  15-17 лет
                </button>
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-label">
                <CalendarIcon size={18} />
                <span>День недели:</span>
              </div>
              <div className="filter-buttons">
                {uniqueDays.map(day => (
                  <button
                    key={day}
                    className={`filter-btn ${selectedDay === day ? 'active' : ''}`}
                    onClick={() => setSelectedDay(day)}
                  >
                    {day === 'all' ? 'Все дни' : day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Расписание */}
        <div className="schedule-content">
          {loading ? (
            // Показываем загрузку только если данные ещё подгружаются после первой загрузки
            <div className="loading-more">
              <div className="loading-spinner-small"></div>
              <p>Обновляем расписание...</p>
            </div>
          ) : sortedDays.length > 0 ? (
            sortedDays.map(day => (
              <div key={day} className="day-section">
                <h2 className="day-title">{day}</h2>
                <div className="trainings-grid">
                  {groupedByDay[day].map((training) => (
                    <TrainingCard
                      key={training.id}
                      training={training}
                      trainerName={getTrainerName(training.trainer_id)}
                      onRegister={handleRegister}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Нет тренировок по фильтру
            <div className="no-results">
              <div className="no-results-icon">🏀</div>
              <h3>Нет тренировок по выбранным фильтрам</h3>
              <p>Попробуйте изменить параметры поиска</p>
              <button 
                className="reset-filters-btn"
                onClick={() => {
                  setFilter('all');
                  setSelectedDay('all');
                }}
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>

        {/* Информационный блок - показываем всегда */}
        <div className="info-block">
          <div className="info-card">
            <div className="info-icon-large">🏀</div>
            <h4>Первая тренировка бесплатно!</h4>
            <p>Приходи познакомиться с тренером и командой</p>
          </div>
          <div className="info-card">
            <div className="info-icon-large">⏱️</div>
            <h4>Длительность 1.5 часа</h4>
            <p>Оптимальное время для продуктивной тренировки</p>
          </div>
          <div className="info-card">
            <div className="info-icon-large">👕</div>
            <h4>Форма в подарок</h4>
            <p>При покупке абонемента на месяц</p>
          </div>
        </div>
      </div>

      {/* Модальное окно */}
      <RegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        training={selectedTraining}
        onSuccess={handleRegistrationSuccess}
      />
    </div>
  );
};

export default SchedulePage;