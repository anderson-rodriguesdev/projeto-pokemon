{
  const btnDropdownSelect = document.querySelector('.js-open-select-custom');
  const overlayDropdownSelect = document.querySelector('.js-overlay-select');

  btnDropdownSelect.addEventListener('click', () => {
    btnDropdownSelect.parentElement.classList.toggle('active');
    overlayDropdownSelect.addEventListener('click', () => {
      btnDropdownSelect.parentElement.classList.remove('active');
    });
  });
}
