import React, { useState, useEffect } from 'react';
import { X, User, Phone, Calendar, Users as UsersIcon } from 'lucide-react';
import { postRegistration } from '../api/config';
import './RegistrationModal.css';

const RegistrationModal = ({ isOpen, onClose, training, onSuccess }) => {
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    parentPhone: '',
    scheduleId: training?.id || '' // Убедимся, что id передается
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Обновляем formData когда меняется training
  useEffect(() => {
    if (training) {
      setFormData(prev => ({
        ...prev,
        scheduleId: training.id
      }));
    }
  }, [training]);

  if (!isOpen || !training) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Проверяем, что scheduleId есть
    if (!formData.scheduleId) {
      setError('Ошибка: не выбрана тренировка');
      setLoading(false);
      return;
    }

    try {
      console.log('Sending registration:', formData); // Отладка
      await postRegistration(formData);
      onSuccess();
      onClose();
      // Очищаем форму
      setFormData({
        childName: '',
        childAge: '',
        parentPhone: '',
        scheduleId: training.id
      });
    } catch (err) {
      setError('Произошла ошибка при отправке. Попробуйте позже.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <div className="modal-icon">🏀</div>
          <h2>Запись на тренировку</h2>
        </div>

        <div className="training-summary">
          <h3>{training.group_name}</h3>
          <div className="summary-details">
            <div className="summary-item">
              <Calendar size={16} />
              <span>{training.day}, {training.time}</span>
            </div>
            <div className="summary-item">
              <UsersIcon size={16} />
              <span>Тренер: {training.trainer_name}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="childName">
              <User size={16} />
              Имя ребенка
            </label>
            <input
              type="text"
              id="childName"
              name="childName"
              value={formData.childName}
              onChange={handleChange}
              required
              placeholder="Введите имя ребенка"
            />
          </div>

          <div className="form-group">
            <label htmlFor="childAge">
              <UsersIcon size={16} />
              Возраст ребенка
            </label>
            <input
              type="number"
              id="childAge"
              name="childAge"
              value={formData.childAge}
              onChange={handleChange}
              required
              min="5"
              max="18"
              placeholder="От 5 до 18 лет"
            />
          </div>

          <div className="form-group">
            <label htmlFor="parentPhone">
              <Phone size={16} />
              Телефон родителя
            </label>
            <input
              type="tel"
              id="parentPhone"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleChange}
              required
              placeholder="89991234567"
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Отправка...' : 'Записаться'}
          </button>

          <p className="form-note">
            Нажимая кнопку, вы соглашаетесь на обработку персональных данных
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;