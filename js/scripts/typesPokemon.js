// {
//   //scrip para listar todos os tipos de pokemon
//   const areaTypes = document.getElementById('js-type-area');
//   const areaTypesMobile = document.querySelector('.dropdown-select');

//   axios({
//     method: 'GET',
//     url: 'https://pokeapi.co/api/v2/type',
//   }).then((response) => {
//     const { results } = response.data;
//     results.forEach((type, index) => {
//       if (index < 18) {
//         let listType = document.createElement('li');
//         areaTypes.appendChild(listType);

//         let buttonType = document.createElement('button');
//         buttonType.classList = `type-filter ${type.name}`;
//         buttonType.setAttribute('code-type', index + 1);
//         listType.appendChild(buttonType);

//         let iconType = document.createElement('div');
//         iconType.classList = 'icon';
//         buttonType.appendChild(iconType);

//         let iconImg = document.createElement('img');
//         iconImg.setAttribute('src', `./img/icon-types/${type.name}.svg`);
//         iconType.appendChild(iconImg);

//         let nameType = document.createElement('span');
//         nameType.innerText = capitalizeLetter(type.name);
//         buttonType.appendChild(nameType);

//         //Select type mobile

//         let listTypeMobile = document.createElement('li');
//         areaTypesMobile.appendChild(listTypeMobile);

//         let buttonTypeMobile = document.createElement('button');
//         buttonTypeMobile.classList = `type-filter ${type.name}`;
//         buttonTypeMobile.setAttribute('code-type', index + 1);
//         listTypeMobile.appendChild(buttonTypeMobile);

//         let iconTypeMobile = document.createElement('div');
//         iconTypeMobile.classList = 'icon';
//         buttonTypeMobile.appendChild(iconTypeMobile);

//         let iconImgMobile = document.createElement('img');
//         iconImgMobile.setAttribute('src', `./img/icon-types/${type.name}.svg`);
//         iconTypeMobile.appendChild(iconImgMobile);

//         let nameTypeMobile = document.createElement('span');
//         nameTypeMobile.innerText = capitalizeLetter(type.name);
//         buttonTypeMobile.appendChild(nameTypeMobile);

//         const allTypes = document.querySelectorAll('.type-filter');

//         allTypes.forEach((btn) => {
//           btn.addEventListener('click', filterByTypes);
//         });
//       }
//     });
//   });
// }

// function filterByTypes() {
//   let idPokemon = this.getAttribute('code-type');
//   const allTypesActive = document.querySelectorAll('.type-filter');

//   allTypesActive.forEach((type) => {
//     type.classList.remove('active');
//   });
//   this.classList.add('active');
//   axios({
//     method: 'GET',
//     url: `https://pokeapi.co/api/v2/type/${idPokemon}`,
//   }).then((response) => console.log(response));
// }
