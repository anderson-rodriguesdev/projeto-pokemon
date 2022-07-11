//funcao para buscar pokemons
const btnSearch = document.getElementById('js-btn-search');
const inputSearch = document.getElementById('js-input-search');

function searchPokemon() {
  let valueInput = inputSearch.value.toLowerCase();
  const typeFilters = document.querySelectorAll('.type-filter');

  typeFilters.forEach((type) => {
    type.classList.remove('active');
  });

  axios({
    method: 'GET',
    url: `https://pokeapi.co/api/v2/pokemon/${valueInput}`,
  })
    .then((response) => {
      areaPokemons.innerHTML = '';
      btnLoadMore.style.display = 'none';
      countPokemons.innerText = 1;

      const { name, id, sprites, types } = response.data;

      const infoCard = {
        nome: name,
        code: id,
        image: sprites.other.dream_world.front_default,
        type: types[0].type.name,
      };
      if (infoCard.image) {
        createCardPokemon(
          infoCard.nome,
          infoCard.code,
          infoCard.type,
          infoCard.image,
        );
        const cardPokemon = document.querySelectorAll(
          '.js-open-details-pokemon',
        );
        cardPokemon.forEach((card) => {
          card.addEventListener('click', openDetailsPokemon);
        });
      }
    })
    .catch((error) => {
      if (error.response) {
        areaPokemons.innerHTML = '';
        btnLoadMore.style.display = 'none';
        countPokemons.innerText = 0;
        alert('Não foi encontrado nenhum resultado');
      }
    });
}

inputSearch.addEventListener('keyup', (event) => {
  if ((event.code === 'Enter') | (event.code === 'NumpadEnter')) {
    searchPokemon();
  }
});
btnSearch.addEventListener('click', searchPokemon);
