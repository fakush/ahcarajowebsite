const cuerpoCards = document.getElementById('nuevasCards');
const cuerpoModales = document.getElementById('nuevosModales');

const fillCards = (data) => {
  let card = ``;
  // Me fijo cuantas fotos hay, y creo un div para cada uno.
  const fotos = (int, prod) => {
    let fotos = ``;
    for (let i = 1; i <= int; i++) {
      fotos += `
        <picture class="carousel-item ${i === 1 ? 'active' : ''}">
          <source srcset="../assets/products/${prod}-${i}.webp" type="image/webp">
          <img class="p-card__img" src="../assets/products/${prod}-${i}.jpg"
            alt="imagen de ${prod} ${i}" data-interval="15000">
        </picture>
      `;
    }
    return fotos;
  };
  // Me fijo cuantas fotos hay, y creo un indicador para cada uno, desde la segunda.
  const indicadores = (int, id) => {
    let indicadores = ``;
    for (let i = 1; i < int; i++) {
      indicadores += `<li class="custom-indicators__indicator" data-target="#p-card-${id}" data-slide-to="${i}"></li>`;
    }
    return indicadores;
  };
  const punteo = (detalles) => {
    const iconTemplate = (url, alt) => `<img class="p-card__details-icon" src="${url}" alt="${alt}">`;
    const icons = {
      'hoja de arbol': {
        url: '../assets/icons/tree-leaf-icon.svg',
        alt: 'icono hoja de arbol',
      },
      reciclaje: {
        url: '../assets/icons/recycling-icon.svg',
        alt: 'icono reciclaje',
      },
      libro: {
        url: '../assets/icons/book-icon.svg',
        alt: 'icono libro',
      },
      mapa: {
        url: '../assets/icons/map-icon.svg',
        alt: 'icono mapa',
      },
      peso: {
        url: '../assets/icons/weight-icon.svg',
        alt: 'icono peso',
      },
    };
    let punteo = ``;
    if (detalles.length) {
      for (let i = 0; i < detalles.length; i++) {
        const icon = icons[detalles[i].icono];
        punteo += `
          <li class="p-card__details-item">
            ${icon ? iconTemplate(icon.url, icon.alt) : ''}
            ${detalles[i].texto}
          </li>
        `;
      }
    }
    return punteo;
  };
  const createInfoList = ({ list, listType, title, productName }) => {
    if (typeof list === 'string') return `
      <div class="p-card__info-box">
				<h4 class="p-card__info-title">${title}</h4>
				<ul class="p-card__info-list">
          <li><p class="p-card__info-text">${list}</p></li>
		  	</ul>
			</div>
    `;
    let items = ``;
    const maxInfoCircles = 6;
    const nViewMore = 1;
    const infoQuantity = listType === 'size' ? (list.length - 1) : list.length;
    const nPreviewInfoInCard = infoQuantity > maxInfoCircles ? (maxInfoCircles - nViewMore) : infoQuantity;
    if (listType === 'size') {
      for (let i = 1; i <= nPreviewInfoInCard; i++) {
        items += `
          <li class="p-card__info-item">${list[i][0]}</li>
        `;
      }
    } else if (listType === 'color') {
      for (let i = 0; i < nPreviewInfoInCard; i++) {
        items += `
          <li class="p-card__info-item" style="background-color: ${list[i].hexa};"></li>
        `;
      }
    }
    if (list.length) {
      return `
	  		<button class="p-card__info-box" type="button" data-toggle="modal" data-target="#${listType}Modal${productName}">
          <div class="p-card__info-header">
            <h4 class="p-card__info-title">${title}</h4>
            <img class="p-card__info-icon" src="../assets/icons/info-circle-icon.svg" alt="icono mas informacion">
          </div>
				  <ul class="p-card__info-list">
            ${items}
  					${infoQuantity > maxInfoCircles ? `<li class="p-card__info-item">+${infoQuantity - nPreviewInfoInCard}</li>` : ''}
		  		</ul>
				</button>
	    `;
    }
    return ``;
  };
  // Creo una card para cada producto.
  for (let i = 0; i < data.length; i++) {
	  const hasDetailIcons = data[i].detalles.some((detail) => (detail.icono && detail.icono !== 'ninguno'));
    card += `
    <article class="p-card" category="${data[i].categoria}" data-aos="fade">
			<div class="carousel slide carousel-fade" id="p-card-${data[i].id}" data-ride="carousel">
				<div class="carousel-inner">
					<p class="p-card__label">${data[i].tag}</p>
					${fotos(data[i].imagenes, data[i].nombre)}
				</div>
				<ol class="custom-indicators carousel-indicators">
					<li class="custom-indicators__indicator active" data-target="#p-card-${data[i].id}" data-slide-to="0"></li>
					${indicadores(data[i].imagenes, data[i].id)}
				</ol>
			</div>
			<div class="p-card__body">
				<div class="p-card__header">
					<h3 class="p-card__title">${data[i].producto}</h3>
					<p class="p-card__price">${data[i].precio}</p>
				</div>
				${data[i].detalles ?
					`<ul class="p-card__details-list ${hasDetailIcons ? 'p-card__details-list--with-icons' : ''}">
						${punteo(data[i].detalles)}
					</ul>`
				: ''}
				${data[i].bajada ? `<p class="p-card__details-text">${data[i].bajada}</p>` : ''}
				${data[i].talles.length || data[i].colores.length ?
					`<div class="p-card__bottom-info">
						${data[i].talles.length ? createInfoList({
              list: data[i].talles,
              listType: 'size',
              title: 'Talles',
              productName: data[i].nombre
            }) : ''}
						${data[i].colores.length ? createInfoList({ 
                list: data[i].colores,
                listType: 'color',
                title: 'Colores',
                productName: data[i].nombre
              }) : ''}
					</div>`
				: ''}
			</div>
		</article>
  `;
  }
  cuerpoCards.innerHTML = card;
};

const fillModales = (data) => {
  let modales = ``;

  // Armo la lista de colores
  const colores = (data) => {
    let aux = ``;
    for (let i = 0; i < data.length; i++) {
      aux += `
          <li class="p-modal__color-item">
            <span class="p-modal__color-circle" style="background-color: ${data[i].hexa};"></span>
            ${data[i].nombre}
          </li>
      `;
    }
    return aux;
  };
  // Genero un modal de colores para cada producto de la lista.
  for (let i = 0; i < data.length; i++) {
    modales += `
    <div
        class="p-modal modal fade"
        id="colorModal${data[i].nombre}"
        tabindex="-1"
        aria-labelledby="colorModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="p-modal__content modal-content">
            <div class="p-modal__header">
              <h4 class="p-modal__title" id="colorModalLabel">Colores</h4>
              <button
                class="p-modal__close-btn close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <img class="p-modal__close-icon" src="../assets/icons/close-icon.svg" alt="icono cruz" />
              </button>
            </div>
            <div class="p-modal__line"></div>
            <ul class="p-modal__color-list">
              ${colores(data[i].colores)}
            </ul>
          </div>
        </div>
      </div>
    `;
  }
  // Armo la lista de talles
  const tablaTalles = (data) => {
    let aux = ``;
    if (data.length > 0) {
      aux += `
      <thead>
        <tr class="p-modal__table-row">
          <th class="p-modal__table-header" scope="col"></th>
          <th class="p-modal__table-header" scope="col">${data[0][1]}</th>
          <th class="p-modal__table-header" scope="col">${data[0][2]}</th>
          <th class="p-modal__table-header" scope="col">${data[0][3]}</th>
        </tr>
      </thead>
      <tbody>
      `;
    }
    for (let i = 1; i < data.length; i++) {
      aux += `
          <tr class="p-modal__table-row">
            <th class="p-modal__table-header" scope="row">${data[i][0]}</th>
            <td class="p-modal__table-data">${data[i][1]}</td>
            <td class="p-modal__table-data">${data[i][2]}</td>
            <td class="p-modal__table-data">${data[i][3]}</td>
          </tr>
      `;
    }
    return aux;
  };
  // Genero un modal de talles para cada producto de la lista.
  for (let i = 0; i < data.length; i++) {
    modales += `
    <div
        class="p-modal modal fade"
        id="sizeModal${data[i].nombre}"
        tabindex="-1"
        aria-labelledby="sizeModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="p-modal__content modal-content">
            <div class="p-modal__header">
              <h4 class="p-modal__title" id="sizeModalLabel">Talles de ${data[i].producto}</h4>
              <button
                class="p-modal__close-btn close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <img class="p-modal__close-icon" src="../assets/icons/close-icon.svg" alt="icono cruz" />
              </button>
            </div>
            <div class="p-modal__line"></div>
            <table>
              ${tablaTalles(data[i].talles)}
              </tbody>
            </table>
            <p class="p-modal__sub-text">(*medidas expredas en cm)</p>
          </div>
        </div>
      </div>
    `;
  }
  cuerpoModales.innerHTML = modales;
};

// -------Order product cards depending of the clicked category in 'inicio'-------
const orderCardsInCategories = () => {
  const targetCategory = localStorage.getItem('clickedCategory');
  if (targetCategory) {
    const productCards = document.querySelectorAll(`[category="${targetCategory}"]`);
    productCards.forEach((pCard) => {
      pCard.style.order = '-1';
      localStorage.removeItem('clickedCategory');
    });
  }
};


const onResourcesLoaded = (func) => {
  if (document.readyState === 'complete') {
    func();
  } else {
    window.onload = func;
  }
}

loadSocialMediaURLs();
fetch('../assets/json/productos.json')
.then((response) => response.json())
.then((data) => {
  onResourcesLoaded(() => {
    fillCards(data);
    orderCardsInCategories();
  });
	fillModales(data);
	$('.carousel').carousel();
  });
