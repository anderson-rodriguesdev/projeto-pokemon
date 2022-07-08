"use strict";var openDetailsPokemon,closeDetailsPokemon,capitalizeLetter=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},createCardPokemon=function(e,t,n,o){var a=document.createElement("button"),c=(a.classList="card-pokemon js-open-details-pokemon ".concat(n),areaPokemons.appendChild(a),document.createElement("div")),i=(c.classList="image",a.appendChild(c),document.createElement("img")),o=(i.classList="thumb-img",i.setAttribute("src",o),c.appendChild(i),document.createElement("div")),c=(o.classList="info",a.appendChild(o),document.createElement("div")),i=(c.classList="text",o.appendChild(c),document.createElement("span")),a=(i.innerText=(t<10?"#00":t<100?"#0":"#").concat(t),c.appendChild(i),document.createElement("h3")),t=(a.innerText=capitalizeLetter(e),i.appendChild(a),document.createElement("div")),c=(t.classList="icon",o.appendChild(t),document.createElement("img"));c.setAttribute("src","./img/icon-types/".concat(n,".svg")),o.appendChild(c)},listingPokemons=function(e){axios({method:"GET",url:e}).then(function(e){var t=document.getElementById("js-count-pokemons"),e=e.data,n=e.results,e=(e.next,e.count);t.innerText=e,n.forEach(function(e){e=e.url;axios({method:"GET",url:"".concat(e)}).then(function(e){var e=e.data,t=e.name,n=e.id,o=e.sprites,e=e.types,t={nome:t,code:n,image:o.other.dream_world.front_default,type:e[0].type.name};createCardPokemon(t.nome,t.code,t.type,t.image)})})})},showMorePokemons=function(){listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=".concat(countPagination)),countPagination+=9},filterByTypes=function(){var e=this.getAttribute("code-type"),t=document.querySelectorAll(".type-filter"),n=document.getElementById("js-list-pokemons"),o=document.getElementById("js-btn-load-more"),a=document.getElementById("js-count-pokemons"),c=document.querySelector(".s-all-info-pokemons").offsetTop;window.scrollTo({top:c+288,behavior:"smooth"}),console.log(c),n.innerHTML=" ",o.style.display="none",t.forEach(function(e){e.classList.remove("active")}),this.classList.add("active"),e?axios({method:"GET",url:"https://pokeapi.co/api/v2/type/".concat(e)}).then(function(e){e=e.data.pokemon;a.innerText=e.length,e.forEach(function(e){e=e.pokemon.url;axios({method:"GET",url:"".concat(e)}).then(function(e){var e=e.data,t=e.name,n=e.id,o=e.sprites,e=e.types,t={nome:t,code:n,image:o.other.dream_world.front_default,type:e[0].type.name};t.image&&createCardPokemon(t.nome,t.code,t.type,t.image)})})}):(n.innerHTML=" ",listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0"),o.style.display="block")},areaPokemons=document.getElementById("js-list-pokemons"),btnLoadMore=(listingPokemons("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0"),document.getElementById("js-btn-load-more")),countPagination=9,areaTypes=(btnLoadMore.addEventListener("click",showMorePokemons),document.getElementById("js-type-area")),areaTypesMobile=document.querySelector(".dropdown-select"),cardPokemon=(axios({method:"GET",url:"https://pokeapi.co/api/v2/type"}).then(function(e){e.data.results.forEach(function(e,t){var n,o,a;t<18&&(o=document.createElement("li"),areaTypes.appendChild(o),(n=document.createElement("button")).classList="type-filter ".concat(e.name),n.setAttribute("code-type",t+1),o.appendChild(n),(o=document.createElement("div")).classList="icon",n.appendChild(o),(a=document.createElement("img")).setAttribute("src","./img/icon-types/".concat(e.name,".svg")),o.appendChild(a),(o=document.createElement("span")).innerText=capitalizeLetter(e.name),n.appendChild(o),a=document.createElement("li"),areaTypesMobile.appendChild(a),(n=document.createElement("button")).classList="type-filter ".concat(e.name),n.setAttribute("code-type",t+1),a.appendChild(n),(o=document.createElement("div")).classList="icon",n.appendChild(o),(t=document.createElement("img")).setAttribute("src","./img/icon-types/".concat(e.name,".svg")),o.appendChild(t),(a=document.createElement("span")).innerText=capitalizeLetter(e.name),n.appendChild(a),document.querySelectorAll(".type-filter").forEach(function(e){e.addEventListener("click",filterByTypes)}))})}),document.querySelectorAll(".js-open-details-pokemon")),closeCard=document.querySelector(".js-close-details-pokemon"),cardOverlay=document.querySelector(".js-card-overlay"),btnDropdownSelect=(cardPokemon&&closeCard&&(openDetailsPokemon=function(){document.documentElement.classList.add("open-modal")},closeDetailsPokemon=function(){document.documentElement.classList.remove("open-modal")},cardPokemon.forEach(function(e){e.addEventListener("click",openDetailsPokemon)}),closeCard.addEventListener("click",closeDetailsPokemon),cardOverlay.addEventListener("click",closeDetailsPokemon)),document.querySelector(".js-open-select-custom")),overlayDropdownSelect=document.querySelector(".js-overlay-select"),slideHero=(btnDropdownSelect.addEventListener("click",function(){btnDropdownSelect.parentElement.classList.toggle("active"),overlayDropdownSelect.addEventListener("click",function(){btnDropdownSelect.parentElement.classList.remove("active")})}),new Swiper(".slide-hero",{effect:"fade",pagination:{el:".slide-hero .swiper-slide .main-area .area-explore .swiper-pagination"}}));