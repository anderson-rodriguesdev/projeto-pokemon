{
  const areaPokemons = document.getElementById('js-list-pokemons');

  function capitalizeLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function createCardPokemon(nome, code, type, imagePok) {
    let card = document.createElement('button');
    card.classList = `card-pokemon js-open-details-pokemon ${type}`;
    areaPokemons.appendChild(card);

    let image = document.createElement('div');
    image.classList = 'image';
    card.appendChild(image);

    let imageSrc = document.createElement('img');
    imageSrc.classList = 'thumb-img';
    imageSrc.setAttribute('src', imagePok);
    image.appendChild(imageSrc);

    let infoCardPokemon = document.createElement('div');
    infoCardPokemon.classList = 'info';
    card.appendChild(infoCardPokemon);

    let infoTextPokemon = document.createElement('div');
    infoTextPokemon.classList = 'text';
    infoCardPokemon.appendChild(infoTextPokemon);

    let codePokemon = document.createElement('span');
    codePokemon.innerText =
      code < 10 ? `#00${code}` : code < 100 ? `#0${code}` : `#${code}`;
    infoTextPokemon.appendChild(codePokemon);

    let namePokemon = document.createElement('h3');
    namePokemon.innerText = capitalizeLetter(nome);
    codePokemon.appendChild(namePokemon);

    let areaIcon = document.createElement('div');
    areaIcon.classList = 'icon';
    infoCardPokemon.appendChild(areaIcon);

    let imgType = document.createElement('img');
    imgType.setAttribute('src', `./img/icon-types/${type}.svg`);
    infoCardPokemon.appendChild(imgType);
  }

  function listingPokemons(urlApi) {
    axios({
      method: 'GET',
      url: urlApi,
    }).then((response) => {
      const countPokemons = document.getElementById('js-count-pokemons');
      const { results, next, count } = response.data;

      countPokemons.innerText = count;

      results.forEach((pokemon) => {
        let urlApiDetails = pokemon.url;

        axios({
          method: 'GET',
          url: `${urlApiDetails}`,
        }).then((response) => {
          const { name, id, sprites, types } = response.data;

          const infoCard = {
            nome: name,
            code: id,
            image: sprites.other.dream_world.front_default,
            type: types[0].type.name,
          };

          createCardPokemon(
            infoCard.nome,
            infoCard.code,
            infoCard.type,
            infoCard.image,
          );
        });
      });
    });
  }
  listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0');

  //Funcionalidade loadmore
  const btnLoadMore = document.getElementById('js-btn-load-more');

  let countPagination = 9;

  function showMorePokemons() {
    listingPokemons(
      `https://pokeapi.co/api/v2/pokemon?limit=9&offset=${countPagination}`,
    );
    countPagination += 9;
  }

  btnLoadMore.addEventListener('click', showMorePokemons);
}
