import React, { useState } from 'react';
import { getSchedule, getTrainers } from '../api/config';

const ApiTestPage = () => {
  const [schedule, setSchedule] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState([]);

  const addLog = (message) => {
    setLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testGetSchedule = async () => {
    setLoading(true);
    addLog('Запрашиваем расписание...');
    try {
      const data = await getSchedule();
      console.log('Schedule response:', data);
      setSchedule(data);
      addLog(`Получено ${data.length} записей расписания`);
    } catch (error) {
      addLog(`Ошибка: ${error.message}`);
    }
    setLoading(false);
  };

  const testGetTrainers = async () => {
    setLoading(true);
    addLog('Запрашиваем тренеров...');
    try {
      const data = await getTrainers();
      console.log('Trainers response:', data);
      setTrainers(data);
      addLog(`Получено ${data.length} тренеров`);
    } catch (error) {
      addLog(`Ошибка: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Тест API</h1>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={testGetSchedule}
          disabled={loading}
          style={{ padding: '10px 20px', background: '#ff6b00', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Тест расписания
        </button>
        <button 
          onClick={testGetTrainers}
          disabled={loading}
          style={{ padding: '10px 20px', background: '#1e3a8a', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Тест тренеров
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Лог:</h3>
        <div style={{ 
          background: '#f5f5f5', 
          padding: '10px', 
          borderRadius: '5px',
          maxHeight: '200px',
          overflow: 'auto',
          fontFamily: 'monospace'
        }}>
          {log.map((line, i) => <div key={i}>{line}</div>)}
        </div>
      </div>

      {schedule.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Расписание:</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
            {JSON.stringify(schedule, null, 2)}
          </pre>
        </div>
      )}

      {trainers.length > 0 && (
        <div>
          <h3>Тренеры:</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
            {JSON.stringify(trainers, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTestPage;