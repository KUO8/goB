// Простой прокси для обхода CORS
export const fetchWithProxy = async (url) => {
  try {
    // Используем несколько публичных CORS прокси
    const proxies = [
      'https://api.allorigins.win/raw?url=',
      'https://cors-anywhere.herokuapp.com/',
      'https://corsproxy.io/?'
    ];

    // Пробуем первый прокси
    const proxyUrl = proxies[0] + encodeURIComponent(url);
    
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error('Proxy failed');
    
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch (error) {
    console.error('Proxy error:', error);
    throw error;
  }
};

// Функция для JSONP запросов (запасной вариант)
export const fetchWithJsonP = (url) => {
  return new Promise((resolve, reject) => {
    const callbackName = `jsonp_callback_${Date.now()}`;
    const script = document.createElement('script');
    
    window[callbackName] = (data) => {
      delete window[callbackName];
      document.body.removeChild(script);
      resolve(data);
    };
    
    script.src = `${url}&callback=${callbackName}`;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};