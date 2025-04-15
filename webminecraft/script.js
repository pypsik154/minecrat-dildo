const apiUrl = 'http://localhost:3023/api/deaths'; // URL серверного API

// Получаем статистику смертей с серверного API
function fetchDeathStats() {
  fetch(apiUrl, {
    method: 'GET',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Ошибка HTTP: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      displayPlayerStats(data);
    })
    .catch(error => {
      console.error('Ошибка получения данных:', error);
      document.getElementById('players-list').innerHTML = '<p>Ошибка загрузки данных. Попробуйте позже.</p>';
    });
}

// Отображаем статистику на странице
function displayPlayerStats(data) {
  const playersList = document.getElementById('players-list');
  playersList.innerHTML = ''; // Очищаем перед загрузкой новых данных

  if (Object.keys(data).length === 0) {
    playersList.innerHTML = '<p>Нет данных о смертях.</p>';
    return;
  }

  for (const player in data) {
    const playerDeaths = data[player];
    const playerElement = document.createElement('div');
    playerElement.classList.add('player');
    playerElement.innerHTML = `<span>${player}:</span> ${playerDeaths} смертей`;
    playersList.appendChild(playerElement);
  }
}

// Загружаем статистику сразу при загрузке страницы
fetchDeathStats();
