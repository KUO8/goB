import axios from 'axios';
import { fetchWithProxy } from './corsProxy';

// ВСТАВЬ СВОЙ URL ИЗ ГУГЛ СКРИПТА
const BASE_URL = 'https://script.google.com/macros/s/AKfycbzVtxd0koc6aLQY8AOX-KH3a31nx1mu8q_XsNZDPJXEsxIRJtarnjcqPuk-1YOef4t2/exec';

// Создаем axios instance
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'text/plain',
  }
});

// Добавляем перехватчик для обработки ошибок CORS
apiClient.interceptors.response.use(
  response => {
    console.log('API Response:', response.data);
    
    if (response.data && response.data.success) {
      return response.data.data !== undefined ? response.data.data : response.data;
    }
    
    if (response.data && !response.data.success) {
      throw new Error(response.data.error || 'Unknown error');
    }
    
    return response.data;
  },
  async error => {
    console.error('API Error:', error);
    
    // Если CORS ошибка, пробуем через прокси
    if (error.message.includes('CORS') || error.code === 'ERR_NETWORK') {
      console.log('CORS detected, trying proxy...');
      
      try {
        // Пробуем получить данные через прокси
        const config = error.config;
        const url = `${BASE_URL}?${new URLSearchParams(config.params).toString()}`;
        
        const data = await fetchWithProxy(url);
        return Promise.resolve({ data });
      } catch (proxyError) {
        console.error('Proxy also failed:', proxyError);
        throw new Error('Не удалось загрузить данные. Попробуйте позже.');
      }
    }
    
    throw error;
  }
);

// Простое кэширование
const cache = {
  schedule: null,
  trainers: null,
  news: null,
  timestamp: null
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

// Функция для GET запросов с кэшированием
export const fetchData = async (path) => {
  const now = Date.now();
  
  // Если есть свежие данные в кэше - возвращаем их
  if (cache[path] && cache.timestamp && (now - cache.timestamp) < CACHE_DURATION) {
    console.log(`Using cached ${path} data`);
    return cache[path];
  }
  
  try {
    const url = `https://script.google.com/macros/s/ТВОЙ_ID/exec?path=${path}`;
    console.log(`Fetching ${path} from API...`);
    
    const response = await fetch(url);
    const text = await response.text();
    
    try {
      const data = JSON.parse(text);
      if (data && data.success) {
        const result = data.data || [];
        
        // Сохраняем в кэш
        cache[path] = result;
        cache.timestamp = now;
        
        return result;
      }
      return [];
    } catch (e) {
      console.log('Raw response:', text);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    return [];
  }
};

// Функции для работы с данными
export const getSchedule = async () => {
  try {
    const data = await apiClient.get('', { params: { path: 'schedule' } });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return [];
  }
};

export const getTrainers = async () => {
  try {
    const data = await apiClient.get('', { params: { path: 'trainers' } });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching trainers:', error);
    return [];
  }
};

export const getNews = async () => {
  try {
    const data = await apiClient.get('', { params: { path: 'news' } });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

export const postRegistration = async (formData) => {
  try {
    // Для POST запросов используем прямой вызов
    const response = await fetch(BASE_URL, {
      method: 'POST',
      mode: 'no-cors', // Важно! Это может помочь с CORS
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({
        action: 'register',
        ...formData
      })
    });
    
    // При no-cors мы не можем прочитать ответ
    return { success: true, message: 'Заявка отправлена' };
  } catch (error) {
    console.error('Error posting registration:', error);
    throw error;
  }
};

// Функция для прямой проверки API
export const testApiConnection = async () => {
  try {
    // Пробуем через прокси
    const url = `${BASE_URL}?path=schedule`;
    const data = await fetchWithProxy(url);
    console.log('Proxy test successful:', data);
    return true;
  } catch (error) {
    console.error('All connection methods failed:', error);
    return false;
  }
};