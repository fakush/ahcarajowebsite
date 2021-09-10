'use strict'

const $cardsContainer = document.getElementById('pCardsContainer');
const $modalsContainer = document.getElementById('pModalsContainer');

const createProductCard = ({
  id, tituloProducto, nombreImagen, cantidadImagenes, categoria, precio, textoDetalles, tag, listaDetalles, talles, colores
}) => {
  const createInfoList = ({ collection, collectionType, title, productName }) => {
    if (collection.texto) return `
      <button class="p-card__info-box" type="button" data-toggle="modal" data-target="#${collectionType}Modal${productName}">
        <div class="p-card__info-header">
          <h4 class="p-card__info-title">${title}</h4>
          <img class="p-card__info-icon" src="../assets/icons/info-circle-icon.svg" alt="icono mas informacion">
        </div>
        <ul class="p-card__info-list">
          <li><p class="p-card__info-text">${collection.texto}</p></li>
        </ul>
      </button>
    `;
  
    let items = ``;
    const maxInfoCircles = 6;
    const nViewMore = 1;
    const infoQuantity = collectionType === 'size' ? (collection.length - 1) : collection.length;
    const nPreviewInfoInCard = infoQuantity > maxInfoCircles ? (maxInfoCircles - nViewMore) : infoQuantity;
    if (collectionType === 'size') {
      for (let i = 1; i <= nPreviewInfoInCard; i++) {
        items += `
            <li class="p-card__info-item">${collection[i][0]}</li>
          `;
      }
    } else if (collectionType === 'color') {
      for (let i = 0; i < nPreviewInfoInCard; i++) {
        items += `
            <li class="p-card__info-item" style="background-color: ${collection[i].hexa};"></li>
          `;
      }
    }
    return `
      <button class="p-card__info-box" type="button" data-toggle="modal" data-target="#${collectionType}Modal${productName}">
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
  };

  // ----------------------------------Product Card--------------------------------------------------
  const hasDetailIcons = listaDetalles.some((detail) => detail.icono);
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
  return (`
    <article class="p-card" category="${categoria}" data-aos="fade-up" data-aos-duration="600" data-aos-delay="50">
      <div class="carousel slide carousel-fade" id="p-card-${id}" data-ride="carousel">
        <div class="carousel-inner">
          <p class="p-card__label">${tag}</p>
          ${Array.from({ length: cantidadImagenes }, (el, i) => i === 0 ? null : `
            <picture class="carousel-item ${i === 1 ? 'active' : ''}">
              <source srcset="../assets/products/${nombreImagen}-${i}.webp" type="image/webp">
              <img class="p-card__img" src="../assets/products/${nombreImagen}-${i}.jpg"
                alt="imagen de ${nombreImagen} ${i}" data-interval="15000">
            </picture>
          `).join('')}
        </div>
        <ol class="custom-indicators carousel-indicators">
          ${Array.from({ length: cantidadImagenes }, (el, i) => `
            <li class="custom-indicators__indicator ${i === 0 ? 'active' : ''}" data-target="#p-card-${id}" data-slide-to="${i}"></li>
          `).join('')}
        </ol>
      </div>
      <div class="p-card__body">
        <div class="p-card__header">
          <h3 class="p-card__title">${tituloProducto}</h3>
          <p class="p-card__price">${precio}</p>
        </div>
        ${listaDetalles.length ? (
          `<ul class="p-card__details-list ${hasDetailIcons ? 'p-card__details-list--with-icons' : ''}">
            ${listaDetalles.map(({ icono, texto }) => `
              <li class="p-card__details-item">
                ${icons[icono] ? `<img class="p-card__details-icon" src="${icons[icono].url}" alt="${icons[icono].alt}">` : ''}
                ${texto}
              </li>
            `).join('')}
          </ul>`
        ) : ''}
        ${textoDetalles ? `<p class="p-card__details-text">${textoDetalles}</p>` : ''}
        ${talles.length || colores.length || colores.texto ? (
          `<div class="p-card__bottom-info">
            ${talles.length || talles.texto ? createInfoList({
              collection: talles,
              collectionType: 'size',
              title: 'Talles',
              productName: nombreImagen
            }) : ''}
            ${colores.length || colores.texto ? createInfoList({
              collection: colores,
              collectionType: 'color',
              title: 'Colores',
              productName: nombreImagen
            }) : ''}
          </div>`
        ) : ''}
      </div>
    </article>
  `);
};



const createModal = ({ titulo, nombreImagen, type, talles, colores }) => {
  const createColorList = (colors) => {
    let colorItems = '';
    colors.forEach((color) => {
      colorItems += `
        <li class="p-modal__color-item">
          <span class="p-modal__color-circle" style="background-color: ${color.hexa};"></span>
          ${color.nombre}
        </li>
      `;
    });
    return `
      <ul class="p-modal__color-list">
        ${colorItems}
      </ul>
    `;
  };
  const createSizeTable = (sizeList) => `
    <table>
      <thead>
        <tr class="p-modal__table-row">
          ${sizeList[0].map((headItem) => `
            <th class="p-modal__table-header" scope="col">${headItem}</th>
          `).join('')}
        </tr>
      </thead>
      <tbody>
        ${sizeList.map((row, i) => i === 0 ? null : (`
          <tr class="p-modal__table-row">
            ${row.map((item, j) => j === 0 ? (`
              <th class="p-modal__table-header" scope="row">${item}</th>
            `) : (`
              <td class="p-modal__table-data">${item}</td>
            `)).join('')}
          </tr>
        `)).join('')}
      </tbody>
    </table>
    <p class="p-modal__sub-text">(*medidas expredas en cm)</p>
  `;
  const createPopup = (popup) => `<p class="p-modal__text">${popup}</p>`;
  const content = {
    size: talles.length ? createSizeTable(talles) : (talles.popup ? createPopup(talles.popup) : ''),
    color: colores.length ? createColorList(colores) : (colores.popup ? createPopup(colores.popup) : '')
  };
  return `
    <div
        class="p-modal modal fade"
        id="${type}Modal${nombreImagen}"
        tabindex="-1"
        aria-labelledby="${type}ModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="p-modal__content modal-content">
            <div class="p-modal__header">
              <h4 class="p-modal__title" id="${type}ModalLabel">${titulo}</h4>
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
            ${content[type]}
          </div>
        </div>
    </div>
  `;
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
  .then((productList) => {
    let cards = '';
    let modals = '';
    productList.forEach((productData) => {
      cards += createProductCard(productData);
      modals += createModal({
        titulo: `Talles de ${productData.tituloProducto}`,
        type: 'size',
        ...productData
      });
      modals += createModal({
        titulo: `Colores de ${productData.tituloProducto}`,
        type: 'color',
        ...productData
      });
    });
    const $moreInfo = document.querySelector('.more-info');
    $modalsContainer.innerHTML = modals;
    onResourcesLoaded(() => {
      $cardsContainer.innerHTML = cards;
      $moreInfo.style.display = null;
      orderCardsInCategories();
      $('.carousel').carousel();
    });
  });
