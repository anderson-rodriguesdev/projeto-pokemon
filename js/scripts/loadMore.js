{
  const btnLoadMore = document.getElementById('js-btn-load-more');

  let countPagination = 10;

  function showMorePokemons() {
    listingPokemons(
      `https://pokeapi.co/api/v2/pokemon?limit=9&offset=${countPagination}`,
    );
    countPagination += 9;
  }

  btnLoadMore.addEventListener('click', showMorePokemons);

  function loadMore(urlApi) {
    axios({
      method: 'GET',
      url: urlApi,
    }).then((response) => {
      const { next } = response.data;
    });
  }
  loadMore('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0');
}
