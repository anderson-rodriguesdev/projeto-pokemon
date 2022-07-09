{
  //Global
  function capitalizeLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  //Modal globais
  const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');
  const closeCard = document.querySelector('.js-close-details-pokemon');
  const cardOverlay = document.querySelector('.js-card-overlay');

  cardPokemon.forEach((card) => {
    console.log('oi');
    card.addEventListener('click', openDetailsPokemon);
  });
  closeCard.addEventListener('click', closeDetailsPokemon);
  cardOverlay.addEventListener('click', closeDetailsPokemon);

  //Cards globais
  const areaPokemons = document.getElementById('js-list-pokemons');
  const countPokemons = document.getElementById('js-count-pokemons');

  //Cards
  function createCardPokemon(nome, code, type, imagePok) {
    let card = document.createElement('button');
    card.classList = `card-pokemon js-open-details-pokemon ${type}`;
    card.setAttribute('code-pokemon', code);
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
    infoTextPokemon.appendChild(namePokemon);

    let areaIcon = document.createElement('div');
    areaIcon.classList = 'icon';
    infoCardPokemon.appendChild(areaIcon);

    let imgType = document.createElement('img');
    imgType.setAttribute('src', `./img/icon-types/${type}.svg`);
    areaIcon.appendChild(imgType);
  }

  //Listagem pokémons
  function listingPokemons(urlApi) {
    axios({
      method: 'GET',
      url: urlApi,
    }).then((response) => {
      const { results, count } = response.data;

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

          const cardPokemon = document.querySelectorAll(
            '.js-open-details-pokemon',
          );
          cardPokemon.forEach((card) => {
            card.addEventListener('click', openDetailsPokemon);
          });
        });
      });
    });
  }

  //Ativação da listagem com limite de 9 pokémons
  listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0');

  function openDetailsPokemon() {
    document.documentElement.classList.add('open-modal');
    console.log(this);

    let codePokemon = this.getAttribute('code-pokemon');
    let imagePokemon = this.querySelector('.thumb-img');
    let iconPokemon = this.querySelector('.info .icon img');
    let namePokemon = this.querySelector('.info h3');
    let codeStringPokemon = this.querySelector('.info .text span');

    const modalBackground = document.getElementById('js-modal-background');
    const imagePokemonModal = document.getElementById('js-image-pokemon-modal');
    const iconPokemonModal = document.getElementById('js-icon-pokemon-modal');
    const namePokemonModal = document.getElementById('js-name-pokemon-modal');
    const codePokemonModal = document.getElementById('js-code-pokemon-modal');
    const heightPokemonModal = document.getElementById('js-height-pokemon');
    const weightPokemonModal = document.getElementById('js-weight-pokemon');
    const mainAbilitiesPokemonModal = document.getElementById(
      'js-main-abilities-pokemon',
    );

    imagePokemonModal.setAttribute('src', imagePokemon.getAttribute('src'));
    modalBackground.setAttribute('typePokemonModal', this.classList[2]);
    iconPokemonModal.setAttribute('src', iconPokemon.getAttribute('src'));
    namePokemonModal.textContent = namePokemon.textContent;
    codePokemonModal.textContent = codeStringPokemon.textContent;

    axios({
      method: 'GET',
      url: `https://pokeapi.co/api/v2/pokemon/${codePokemon}`,
    }).then((response) => {
      let data = response.data;

      let infoPokemon = {
        mainAbilities: capitalizeLetter(data.abilities[0].ability.name),
        abilities: data.abilities,
        types: data.types,
        weight: data.weight,
        height: data.height,
        stats: data.stats,
        urlType: data.types[0].type.url,
      };

      function getTypesPokemon() {
        const areaTypesModal = document.getElementById('js-types-pokemon');

        areaTypesModal.innerHTML = ' ';

        let arrayTypes = infoPokemon.types;
        arrayTypes.forEach((itemType) => {
          let itemList = document.createElement('li');
          areaTypesModal.appendChild(itemList);

          let spanList = document.createElement('span');
          spanList.classList = `tag-type ${itemType.type.name}
          `;
          spanList.textContent = capitalizeLetter(itemType.type.name);
          itemList.appendChild(spanList);
        });
      }

      function getWeaknessesPokemon() {
        const areaWeaknesses = document.getElementById('js-weaknesses-pokemon');
        areaWeaknesses.innerHTML = '';

        axios({
          method: 'GET',
          url: `${infoPokemon.urlType}`,
        }).then((response) => {
          let weaknesses = response.data.damage_relations.double_damage_from;

          weaknesses.forEach((itemWeak) => {
            let itemListWeak = document.createElement('li');
            areaWeaknesses.appendChild(itemListWeak);

            let spanList = document.createElement('span');
            spanList.classList = `tag-type ${itemWeak.name}`;
            spanList.textContent = capitalizeLetter(itemWeak.name);
            itemListWeak.appendChild(spanList);
          });
        });
      }

      heightPokemonModal.textContent = `${infoPokemon.height / 10}m`;
      weightPokemonModal.textContent = `${infoPokemon.weight / 10}kg`;
      mainAbilitiesPokemonModal.textContent = infoPokemon.mainAbilities;

      const statsHp = document.getElementById('js-stats-hp');
      const statsAttack = document.getElementById('js-stats-attack');
      const statsDefense = document.getElementById('js-stats-defense');
      const statsSpAttack = document.getElementById('js-stats-sp-attack');
      const statsSpDefense = document.getElementById('js-stats-sp-defense');
      const statsSpeed = document.getElementById('js-stats-speed');

      statsHp.style.width = `${infoPokemon.stats[0].base_stat}%`;
      statsAttack.style.width = `${infoPokemon.stats[1].base_stat}%`;
      statsDefense.style.width = `${infoPokemon.stats[2].base_stat}%`;
      statsSpAttack.style.width = `${infoPokemon.stats[3].base_stat}%`;
      statsSpDefense.style.width = `${infoPokemon.stats[4].base_stat}%`;
      statsSpeed.style.width = `${infoPokemon.stats[5].base_stat}%`;

      console.log(infoPokemon.stats);
      getTypesPokemon();
      getWeaknessesPokemon();
    });
  }

  function closeDetailsPokemon() {
    document.documentElement.classList.remove('open-modal');
  }

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

  //script para listar todos os tipos de pokemon

  const areaTypes = document.getElementById('js-type-area');
  const areaTypesMobile = document.querySelector('.dropdown-select');

  //seleção de dados da API
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

  //filtragem
  function filterByTypes() {
    let idPokemon = this.getAttribute('code-type');
    const allTypesActive = document.querySelectorAll('.type-filter');
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
        countPokemons.innerText = pokemon.length;

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
}
