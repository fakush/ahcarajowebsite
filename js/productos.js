'use strict'

const cardsContainer = document.getElementById('pCardsContainer');
const modalsContainer = document.getElementById('pModalsContainer');

const createProductCard = ({
  id, tituloProducto, nombreImagen, cantidadImagenes, categoria, precio, textoDetalles, tag, listaDetalles, talles, colores
}) => {
  const createImgSlides = (slidesQuantity, imageName) => {
    let slides = ''
    for (let i = 1; i <= slidesQuantity; i += 1) {
      slides += `
        <picture class="carousel-item ${i === 1 ? 'active' : ''}">
          <source srcset="../assets/products/${imageName}-${i}.webp" type="image/webp">
          <img class="p-card__img" src="../assets/products/${imageName}-${i}.jpg"
            alt="imagen de ${imageName} ${i}" data-interval="15000">
        </picture>
      `;
    }
    return slides;
  }
  const createSlideIndicators = (indicatorsQuantity, id) => {
    let indicators = '';
    for (let i = 0; i < indicatorsQuantity; i++) {
      indicators += `
        <li class="custom-indicators__indicator ${i === 0 ? 'active': ''}" data-target="#p-card-${id}" data-slide-to="${i}"></li>
      `;
    }
    return indicators;
  };
  const createDetails = (detailList) => {
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
    let details = ``;
    detailList.forEach((detail) => {
      const icon = icons[detail.icono];
      details += `
          <li class="p-card__details-item">
            ${icon ? `<img class="p-card__details-icon" src="${icon.url}" alt="${icon.alt}">`: ''}
            ${detail.texto}
          </li>
        `;
    });
    return details;
  };
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
    if (collection.length) {
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
    }
    return ``;
  };

  // ----------------------------------Product Card--------------------------------------------------
  const hasDetailIcons = listaDetalles.some((detail) => (detail.icono && detail.icono !== 'ninguno'));
  return (`
    <article class="p-card" category="${categoria}" data-aos="fade">
      <div class="carousel slide carousel-fade" id="p-card-${id}" data-ride="carousel">
        <div class="carousel-inner">
          <p class="p-card__label">${tag}</p>
          ${createImgSlides(cantidadImagenes,nombreImagen)}
        </div>
        <ol class="custom-indicators carousel-indicators">
          ${createSlideIndicators(cantidadImagenes, id)}
        </ol>
      </div>
      <div class="p-card__body">
        <div class="p-card__header">
          <h3 class="p-card__title">${tituloProducto}</h3>
          <p class="p-card__price">${precio}</p>
        </div>
        ${listaDetalles.length ? (
          `<ul class="p-card__details-list ${hasDetailIcons ? 'p-card__details-list--with-icons' : ''}">
            ${createDetails(listaDetalles)}
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
  const createSizeTable = (sizeList) => {
    const createSizesRows = (sizeList) => {
      let rows = '';
      for (let i = 1; i < sizeList.length; i++) {
        rows += `
            <tr class="p-modal__table-row">
              <th class="p-modal__table-header" scope="row">${sizeList[i][0]}</th>
              <td class="p-modal__table-data">${sizeList[i][1]}</td>
              <td class="p-modal__table-data">${sizeList[i][2]}</td>
              <td class="p-modal__table-data">${sizeList[i][3]}</td>
            </tr>
        `;
      }
      return rows;
    }
    return sizeList.length ? (
      `
        <table>
          <thead>
            <tr class="p-modal__table-row">
              <th class="p-modal__table-header" scope="col"></th>
              <th class="p-modal__table-header" scope="col">${sizeList[0][1]}</th>
              <th class="p-modal__table-header" scope="col">${sizeList[0][2]}</th>
              <th class="p-modal__table-header" scope="col">${sizeList[0][3]}</th>
            </tr>
          </thead>
          <tbody>
            ${createSizesRows(sizeList)}
          </tbody>
        </table>
        <p class="p-modal__sub-text">(*medidas expredas en cm)</p>
      `
    ) : '';
  }
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
  modalsContainer.innerHTML = modals;
  onResourcesLoaded(() => {
    cardsContainer.innerHTML = cards;
    orderCardsInCategories();
    $('.carousel').carousel();
  });
  });
