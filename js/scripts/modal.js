//Modal globais
const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');
const closeCard = document.querySelector('.js-close-details-pokemon');
const cardOverlay = document.querySelector('.js-card-overlay');

cardPokemon.forEach((card) => {
  //evento de clique em cada card para abrir modal.
  card.addEventListener('click', openDetailsPokemon);
});
//evento de click em cada card para fechar tanto pelo botão quanto clicando 'fora'
closeCard.addEventListener('click', closeDetailsPokemon);
cardOverlay.addEventListener('click', closeDetailsPokemon);

function openDetailsPokemon() {
  //abertura do modal, classe adicionada ao html.
  document.documentElement.classList.add('open-modal');

  //mapeamento dos elementos HTML para preenchimento.
  let codePokemon = this.getAttribute('code-pokemon');
  let imagePokemon = this.querySelector('.thumb-img');
  let iconPokemon = this.querySelector('.info .icon img');
  let namePokemon = this.querySelector('.info h3');
  let codeStringPokemon = this.querySelector('.info .text span');

  //recriação do modal consumindo dados da API.
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

  //preenchimento do modal.
  imagePokemonModal.setAttribute('src', imagePokemon.getAttribute('src'));
  modalBackground.setAttribute('typePokemonModal', this.classList[2]);
  iconPokemonModal.setAttribute('src', iconPokemon.getAttribute('src'));
  namePokemonModal.textContent = namePokemon.textContent;
  codePokemonModal.textContent = codeStringPokemon.textContent;

  axios({
    //requisição da API para consumir dados referentes ao stats.
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
      //função para preencher os tipos do pokémon.
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
      //função para preencher as fraquezas do pokémon
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

    //preenchimento de informações
    heightPokemonModal.textContent = `${infoPokemon.height / 10}m`;
    weightPokemonModal.textContent = `${infoPokemon.weight / 10}kg`;
    mainAbilitiesPokemonModal.textContent = infoPokemon.mainAbilities;

    //mapeamento dos stats no html para preenchimento com dados da API
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

    getTypesPokemon();
    getWeaknessesPokemon();
  });
}

function closeDetailsPokemon() {
  //função para fechar modal
  document.documentElement.classList.remove('open-modal');
}
