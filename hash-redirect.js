// Если пользователь заходит по прямому URL без hash, добавляем hash
(function() {
  const repoName = '/goB'; // Замени на своё
  const path = window.location.pathname;
  
  // Если путь не корневой и нет hash, и это не файл
  if (path !== repoName && path !== repoName + '/' && !window.location.hash) {
    const newPath = path.replace(repoName, '');
    window.location.replace(repoName + '/#' + newPath);
  }
})();