//Cards globais
//mapeamento do html.
const areaPokemons = document.getElementById('js-list-pokemons');
const countPokemons = document.getElementById('js-count-pokemons');

//Cards
function createCardPokemon(nome, code, type, imagePok) {
  //recriação do card com os dados da API. A função createCardPokemon está dentro da listingPokemons de onde ela pega os seus dados.
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
