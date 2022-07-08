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

  //scrip para listar todos os tipos de pokemon

  const areaTypes = document.getElementById('js-type-area');
  const areaTypesMobile = document.querySelector('.dropdown-select');

  axios({
    method: 'GET',
    url: 'https://pokeapi.co/api/v2/type',
  }).then((response) => {
    const { results } = response.data;
    results.forEach((type, index) => {
      if (index < 18) {
        let listType = document.createElement('li');
        areaTypes.appendChild(listType);

        let buttonType = document.createElement('button');
        buttonType.classList = `type-filter ${type.name}`;
        buttonType.setAttribute('code-type', index + 1);
        listType.appendChild(buttonType);

        let iconType = document.createElement('div');
        iconType.classList = 'icon';
        buttonType.appendChild(iconType);

        let iconImg = document.createElement('img');
        iconImg.setAttribute('src', `./img/icon-types/${type.name}.svg`);
        iconType.appendChild(iconImg);

        let nameType = document.createElement('span');
        nameType.innerText = capitalizeLetter(type.name);
        buttonType.appendChild(nameType);

        //Select type mobile

        let listTypeMobile = document.createElement('li');
        areaTypesMobile.appendChild(listTypeMobile);

        let buttonTypeMobile = document.createElement('button');
        buttonTypeMobile.classList = `type-filter ${type.name}`;
        buttonTypeMobile.setAttribute('code-type', index + 1);
        listTypeMobile.appendChild(buttonTypeMobile);

        let iconTypeMobile = document.createElement('div');
        iconTypeMobile.classList = 'icon';
        buttonTypeMobile.appendChild(iconTypeMobile);

        let iconImgMobile = document.createElement('img');
        iconImgMobile.setAttribute('src', `./img/icon-types/${type.name}.svg`);
        iconTypeMobile.appendChild(iconImgMobile);

        let nameTypeMobile = document.createElement('span');
        nameTypeMobile.innerText = capitalizeLetter(type.name);
        buttonTypeMobile.appendChild(nameTypeMobile);

        const allTypes = document.querySelectorAll('.type-filter');

        allTypes.forEach((btn) => {
          btn.addEventListener('click', filterByTypes);
        });
      }
    });
  });

  function filterByTypes() {
    let idPokemon = this.getAttribute('code-type');
    const allTypesActive = document.querySelectorAll('.type-filter');
    const areaPokemons = document.getElementById('js-list-pokemons');
    const btnLoadMore = document.getElementById('js-btn-load-more');
    const countPokemonsType = document.getElementById('js-count-pokemons');
    const sectionPokemons = document.querySelector('.s-all-info-pokemons');
    const topSectionPokemons = sectionPokemons.offsetTop;

    window.scrollTo({
      top: topSectionPokemons + 288,
      behavior: 'smooth',
    });

    console.log(topSectionPokemons);

    areaPokemons.innerHTML = ' ';
    btnLoadMore.style.display = 'none';

    allTypesActive.forEach((type) => {
      type.classList.remove('active');
    });
    this.classList.add('active');

    if (idPokemon) {
      axios({
        method: 'GET',
        url: `https://pokeapi.co/api/v2/type/${idPokemon}`,
      }).then((response) => {
        const { pokemon } = response.data;
        countPokemonsType.innerText = pokemon.length;

        pokemon.forEach((pok) => {
          const { url } = pok.pokemon;

          axios({
            method: 'GET',
            url: `${url}`,
          }).then((response) => {
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
            }
          });
        });
      });
    } else {
      areaPokemons.innerHTML = ' ';
      listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0');
      btnLoadMore.style.display = 'block';
    }
  }
}
