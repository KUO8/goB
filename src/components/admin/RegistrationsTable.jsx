import React, { useState } from 'react';
import { Check, X, Clock, Eye } from 'lucide-react';
import './RegistrationsTable.css';

const RegistrationsTable = ({ registrations, schedule, trainers, onStatusChange }) => {
  const [filter, setFilter] = useState('all');
  const [selectedReg, setSelectedReg] = useState(null);

  const getTrainingInfo = (scheduleId) => {
    const training = schedule.find(s => s.id == scheduleId);
    if (!training) return 'Неизвестно';
    const trainer = trainers.find(t => t.id == training.trainer_id);
    return {
      ...training,
      trainerName: trainer?.name || 'Неизвестно'
    };
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'new':
        return <span className="status-badge status-new"><Clock size={14} /> Новая</span>;
      case 'confirmed':
        return <span className="status-badge status-confirmed"><Check size={14} /> Подтверждена</span>;
      case 'cancelled':
        return <span className="status-badge status-cancelled"><X size={14} /> Отменена</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  const filteredRegistrations = registrations.filter(reg => {
    if (filter === 'all') return true;
    return reg.status === filter;
  });

  return (
    <div className="registrations-table-container">
      <div className="table-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Все ({registrations.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'new' ? 'active' : ''}`}
          onClick={() => setFilter('new')}
        >
          Новые ({registrations.filter(r => r.status === 'new').length})
        </button>
        <button 
          className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
          onClick={() => setFilter('confirmed')}
        >
          Подтвержденные ({registrations.filter(r => r.status === 'confirmed').length})
        </button>
      </div>

      <div className="table-responsive">
        <table className="registrations-table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Ребенок</th>
              <th>Возраст</th>
              <th>Телефон</th>
              <th>Тренировка</th>
              <th>Тренер</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.map(reg => {
              const training = getTrainingInfo(reg.schedule_id);
              return (
                <tr key={reg.id}>
                  <td>{new Date(reg.timestamp).toLocaleDateString()}</td>
                  <td>{reg.child_name}</td>
                  <td>{reg.child_age} лет</td>
                  <td>{reg.parent_phone}</td>
                  <td>{training.group_name} ({training.day})</td>
                  <td>{training.trainerName}</td>
                  <td>{getStatusBadge(reg.status)}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn view"
                        onClick={() => setSelectedReg(reg)}
                        title="Просмотр"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="action-btn confirm"
                        onClick={() => onStatusChange(reg.id, 'confirmed')}
                        title="Подтвердить"
                        disabled={reg.status === 'confirmed'}
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        className="action-btn cancel"
                        onClick={() => onStatusChange(reg.id, 'cancelled')}
                        title="Отменить"
                        disabled={reg.status === 'cancelled'}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Модальное окно детального просмотра */}
      {selectedReg && (
        <div className="modal-overlay" onClick={() => setSelectedReg(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Детали заявки</h3>
            <div className="registration-details">
              <p><strong>ID:</strong> {selectedReg.id}</p>
              <p><strong>Дата:</strong> {new Date(selectedReg.timestamp).toLocaleString()}</p>
              <p><strong>Ребенок:</strong> {selectedReg.child_name}</p>
              <p><strong>Возраст:</strong> {selectedReg.child_age} лет</p>
              <p><strong>Телефон:</strong> {selectedReg.parent_phone}</p>
              <p><strong>Статус:</strong> {selectedReg.status}</p>
            </div>
            <button className="close-btn" onClick={() => setSelectedReg(null)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationsTable;