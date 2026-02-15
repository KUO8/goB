import React, { useState } from 'react';
import { Edit, Trash2, Plus, Save, X, Calendar, Clock, MapPin, Users, Award } from 'lucide-react';
import './ScheduleManager.css';

const ScheduleManager = ({ schedule, trainers, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    day: 'Понедельник',
    time: '17:00 - 18:30',
    group_name: '',
    trainer_id: '',
    location: '',
    max_participants: 15
  });

  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  const times = ['17:00 - 18:30', '18:30 - 20:00', '19:00 - 21:00', '10:00 - 11:30', '11:30 - 13:00'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (training) => {
    setEditingId(training.id);
    setFormData({
      day: training.day,
      time: training.time,
      group_name: training.group_name,
      trainer_id: training.trainer_id,
      location: training.location,
      max_participants: training.max_participants
    });
  };

  const handleSave = async (id) => {
    // Здесь будет API вызов для обновления
    console.log('Saving training:', id, formData);
    // После успешного сохранения
    setEditingId(null);
    onUpdate();
  };

  const handleAdd = async () => {
    // Здесь будет API вызов для добавления
    console.log('Adding new training:', formData);
    // После успешного добавления
    setShowAddForm(false);
    setFormData({
      day: 'Понедельник',
      time: '17:00 - 18:30',
      group_name: '',
      trainer_id: '',
      location: '',
      max_participants: 15
    });
    onUpdate();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту тренировку?')) {
      // Здесь будет API вызов для удаления
      console.log('Deleting training:', id);
      onUpdate();
    }
  };

  const getTrainerName = (id) => {
    const trainer = trainers.find(t => t.id == id);
    return trainer ? trainer.name : 'Не выбран';
  };

  return (
    <div className="schedule-manager">
      {/* Кнопка добавления */}
      <button className="add-button" onClick={() => setShowAddForm(true)}>
        <Plus size={20} />
        Добавить тренировку
      </button>

      {/* Форма добавления */}
      {showAddForm && (
        <div className="edit-form add-form">
          <h3>Новая тренировка</h3>
          <div className="form-grid">
            <div className="form-field">
              <label><Calendar size={16} /> День недели</label>
              <select name="day" value={formData.day} onChange={handleInputChange}>
                {days.map(day => <option key={day}>{day}</option>)}
              </select>
            </div>

            <div className="form-field">
              <label><Clock size={16} /> Время</label>
              <select name="time" value={formData.time} onChange={handleInputChange}>
                {times.map(time => <option key={time}>{time}</option>)}
              </select>
            </div>

            <div className="form-field">
              <label><Users size={16} /> Название группы</label>
              <input
                type="text"
                name="group_name"
                value={formData.group_name}
                onChange={handleInputChange}
                placeholder="Например: Младшая (7-10 лет)"
              />
            </div>

            <div className="form-field">
              <label><Award size={16} /> Тренер</label>
              <select name="trainer_id" value={formData.trainer_id} onChange={handleInputChange}>
                <option value="">Выберите тренера</option>
                {trainers.map(trainer => (
                  <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label><MapPin size={16} /> Место проведения</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Например: Зал №1"
              />
            </div>

            <div className="form-field">
              <label><Users size={16} /> Макс. участников</label>
              <input
                type="number"
                name="max_participants"
                value={formData.max_participants}
                onChange={handleInputChange}
                min="1"
                max="50"
              />
            </div>
          </div>

          <div className="form-actions">
            <button className="save-btn" onClick={handleAdd}>
              <Save size={16} /> Сохранить
            </button>
            <button className="cancel-btn" onClick={() => setShowAddForm(false)}>
              <X size={16} /> Отмена
            </button>
          </div>
        </div>
      )}

      {/* Таблица расписания */}
      <div className="schedule-table">
        <table>
          <thead>
            <tr>
              <th>День</th>
              <th>Время</th>
              <th>Группа</th>
              <th>Тренер</th>
              <th>Место</th>
              <th>Мест</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map(training => (
              <tr key={training.id}>
                {editingId === training.id ? (
                  // Режим редактирования
                  <>
                    <td>
                      <select name="day" value={formData.day} onChange={handleInputChange}>
                        {days.map(day => <option key={day}>{day}</option>)}
                      </select>
                    </td>
                    <td>
                      <select name="time" value={formData.time} onChange={handleInputChange}>
                        {times.map(time => <option key={time}>{time}</option>)}
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="group_name"
                        value={formData.group_name}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <select name="trainer_id" value={formData.trainer_id} onChange={handleInputChange}>
                        <option value="">Выберите тренера</option>
                        {trainers.map(trainer => (
                          <option key={trainer.id} value={trainer.id}>{trainer.name}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="max_participants"
                        value={formData.max_participants}
                        onChange={handleInputChange}
                        min="1"
                        max="50"
                        style={{ width: '70px' }}
                      />
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn save" onClick={() => handleSave(training.id)}>
                          <Save size={16} />
                        </button>
                        <button className="action-btn cancel" onClick={() => setEditingId(null)}>
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  // Режим просмотра
                  <>
                    <td>{training.day}</td>
                    <td>{training.time}</td>
                    <td>{training.group_name}</td>
                    <td>{getTrainerName(training.trainer_id)}</td>
                    <td>{training.location}</td>
                    <td>{training.max_participants}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn edit" onClick={() => handleEdit(training)}>
                          <Edit size={16} />
                        </button>
                        <button className="action-btn delete" onClick={() => handleDelete(training.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleManager;