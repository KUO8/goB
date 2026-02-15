import React, { useState, useEffect } from 'react';
import { getSchedule, getTrainers, apiClient } from '../api/config';

const TestPage = () => {
  const [schedule, setSchedule] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('Testing connection to API...');
        
        // Пробуем получить расписание
        const scheduleData = await getSchedule();
        console.log('Schedule data received:', scheduleData);
        setSchedule(scheduleData);
        
        // Пробуем получить тренеров
        const trainersData = await getTrainers();
        console.log('Trainers data received:', trainersData);
        setTrainers(trainersData);
        
        setError(null);
      } catch (err) {
        console.error('Connection test failed:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  if (loading) return (
    <div style={{ padding: '20px' }}>
      <h2>🔄 Проверка соединения с API...</h2>
      <p>URL API: {apiClient.defaults.baseURL}</p>
    </div>
  );

  if (error) return (
    <div style={{ padding: '20px', color: 'red' }}>
      <h2>❌ Ошибка соединения</h2>
      <p>{error}</p>
      <p>URL: {apiClient.defaults.baseURL}</p>
      <h3>Что проверить:</h3>
      <ul>
        <li>Правильно ли скопирован URL из Google Apps Script?</li>
        <li>Переразвернули ли скрипт с новой версией?</li>
        <li>Открыт ли доступ "Все" в настройках развертывания?</li>
      </ul>
    </div>
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>✅ Соединение работает!</h2>
      
      <h3>Расписание ({schedule.length} записей):</h3>
      <pre style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
        {JSON.stringify(schedule, null, 2)}
      </pre>
      
      <h3>Тренеры ({trainers.length} записей):</h3>
      <pre style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
        {JSON.stringify(trainers, null, 2)}
      </pre>
    </div>
  );
};

export default TestPage;