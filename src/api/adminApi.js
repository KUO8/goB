import { apiClient } from './config';

// Получение всех заявок
export const getRegistrations = async () => {
  try {
    const data = await apiClient.get('', { params: { path: 'registrations' } });
    return data;
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return [];
  }
};

// Обновление статуса заявки
export const updateRegistrationStatus = async (id, status) => {
  try {
    const response = await apiClient.post('', {
      action: 'updateStatus',
      id: id,
      status: status
    });
    return response;
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
};

// Добавление новой тренировки
export const addTraining = async (trainingData) => {
  try {
    const response = await apiClient.post('', {
      action: 'addTraining',
      ...trainingData
    });
    return response;
  } catch (error) {
    console.error('Error adding training:', error);
    throw error;
  }
};

// Обновление тренировки
export const updateTraining = async (id, trainingData) => {
  try {
    const response = await apiClient.post('', {
      action: 'updateTraining',
      id: id,
      ...trainingData
    });
    return response;
  } catch (error) {
    console.error('Error updating training:', error);
    throw error;
  }
};

// Удаление тренировки
export const deleteTraining = async (id) => {
  try {
    const response = await apiClient.post('', {
      action: 'deleteTraining',
      id: id
    });
    return response;
  } catch (error) {
    console.error('Error deleting training:', error);
    throw error;
  }
};

// Получение статистики
export const getStats = async () => {
  try {
    const response = await apiClient.get('', { params: { path: 'stats' } });
    return response;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
};