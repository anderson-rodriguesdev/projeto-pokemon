//Loadmore globais
const btnLoadMore = document.getElementById('js-btn-load-more');
let countPagination = 9;

//Loadmore
function showMorePokemons() {
  listingPokemons(
    `https://pokeapi.co/api/v2/pokemon?limit=9&offset=${countPagination}`,
  );
  countPagination += 9;
}
//evento de clique
btnLoadMore.addEventListener('click', showMorePokemons);
