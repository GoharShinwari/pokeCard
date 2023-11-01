function searchCard(event) {
  event.preventDefault(); // Prevent form submission
  const cardName = document.getElementById('cardName').value;
  if (cardName) {
      const apiUrl = `https://api.pokemontcg.io/v2/cards?q=name:${cardName}&pageSize=1000`;

      // API Info is fetched, card info is created and sorted by 6 in rows
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              let cardInfo = '';
              data.data.forEach((cardData, index) => {
                  if (index % 6 === 0) {
                      cardInfo += '<div class="row">';
                  }
                  cardInfo += `
                      <div class="card">
                          <div class="card-img">
                              <img src="${cardData.images.small}">
                          </div>
                          <div class="card-info">
                          </div>
                      </div>
                  `;
                  if ((index + 1) % 6 === 0 || index === data.data.length - 1) {
                      cardInfo += '</div>';
                  }
              });
              document.getElementById('cardInfo').innerHTML = cardInfo;
          })
          .catch(error => console.error(error));
  }
}

document.querySelector('form').addEventListener('submit', searchCard);
