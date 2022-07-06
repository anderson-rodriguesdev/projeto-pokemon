{
  const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');
  const closeCard = document.querySelector('.js-close-details-pokemon');

  if (cardPokemon && closeCard) {
    function openDetailsPokemon() {
      document.documentElement.classList.add('open-modal');
    }

    function closeDetailsPokemon() {
      document.documentElement.classList.remove('open-modal');
    }

    cardPokemon.forEach((card) => {
      card.addEventListener('click', openDetailsPokemon);
    });

    closeCard.addEventListener('click', closeDetailsPokemon);
  }
}
