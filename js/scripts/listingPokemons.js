//Listagem pokémons
function listingPokemons(urlApi) {
  //principal requisição a API. Retorna a listagem de pokémons.
  axios({
    method: 'GET',
    url: urlApi,
  }).then((response) => {
    //desestruturação de dados.
    const { results, count } = response.data;

    //preenchimento com o número totais de pokémons na API.
    countPokemons.innerText = count;

    results.forEach((pokemon) => {
      //para cada pokémon na listagem extraímos a sua url com todas as suas informações.
      let urlApiDetails = pokemon.url;

      axios({
        method: 'GET',
        url: `${urlApiDetails}`,
        //outra requisição com Axios para a url individual de cada pokémon.
      }).then((response) => {
        //desestruturação das principais informações de cada pokémon.
        const { name, id, sprites, types } = response.data;

        //criação de um objeto para melhor organização.
        const infoCard = {
          nome: name,
          code: id,
          image: sprites.other.dream_world.front_default,
          type: types[0].type.name,
        };

        //função createCardPokemon recebe como parâmetros as propriedades do objeto infoCard.
        createCardPokemon(
          infoCard.nome,
          infoCard.code,
          infoCard.type,
          infoCard.image,
        );

        //após criação, seleção dos cards e ativação das funções do modal.
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
