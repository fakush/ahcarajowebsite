const cuerpoCards = document.getElementById('nuevasCards');
const cuerpoModales = document.getElementById('nuevosModales');

const fillCard = (data) => {
  let card = ``;
  // Me fijo cuantas fotos hay, y creo un div para cada uno, desde la segunda.
  const fotos = (int, prod) => {
    let fotos = ``;
    for (let i = 2; i <= int; i++) {
      fotos += `<div class="p-card__img p-card__img--${prod}-${i} carousel-item" data-interval="15000"></div>`;
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
  const punteo = (data) => {
    let punteo = ``;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        punteo += `
		  		<li class="p-card__details-item">${data[i]}</li>
		  `;
      }
    }
    return punteo;
  };
  const talles = (data, nombre) => {
    if (data.length > 0) {
      let aux = ``;
      for (let i = 1; i < data.length; i++) {
        aux += `
				<li class="p-card__info-item  p-card__info-item--size">${data[i][0]}</li>
			`;
      }
      let salida = `
          <button class="p-card__info-box" type="button" data-toggle="modal" data-target="#sizeModal${nombre}">
						<h4 class="p-card__info-title">Talles</h4>
						<ul class="p-card__info-list">
							${aux}
						</ul>
          </button>
					`;
      return salida;
    }
    return ``;
  };
  const colores = (data, nombre) => {
    if (data.length > 0) {
      let aux = ``;
      for (let i = 0; i < 4; i++) {
        aux += `
					<li class="p-card__info-item  p-card__info-item--color-1" style="background-color: ${data[i].hexa}; border: 1px solid #303030;"></li>
				`;
      }
      let salida = `
	  				<button class="p-card__info-box" type="button" data-toggle="modal" data-target="#colorModal${nombre}">
						  <h4 class="p-card__info-title">Colores</h4>
						  <ul class="p-card__info-list p-card__info-list--colors">
  							${aux}
	  						<li class="p-card__info-item  p-card__info-item--more-colors">+${data.length - 5}</li>
		  				</ul>
					</button>
	  `;
      return salida;
    }
    return ``;
  };
  // Creo una card para cada producto.
  for (let i = 0; i < data.length; i++) {
    card += `
    <article class="p-card" data-aos="fade-up">
			<div class="p-card__carousel carousel slide carousel-fade" id="p-card-${
        data[i].id
      }" data-ride="carousel">
				<div class="carousel-inner">
					<p class="p-card__label">${data[i].tag}</p>
					<div class="p-card__img p-card__img--${
            data[i].nombre
          }-1 carousel-item active" data-interval="15000"></div>
					${fotos(data[i].imagenes, data[i].nombre)}
				</div>
				<ol class="custom-indicators carousel-indicators">
					<li class="custom-indicators__indicator active" data-target="#p-card-${
            data[i].id
          }" data-slide-to="0"></li>
					${indicadores(data[i].imagenes, data[i].id)}
				</ol>
			</div>
			<div class="p-card__body">
				<div class="p-card__header">
					<h3 class="p-card__title">${data[i].producto}</h3>
					<p class="p-card__price">${data[i].precio}</p>
				</div>
				<ul class="p-card__details-list">${punteo(data[i].detalle)}</ul>
				<p class="p-card__details-text">${data[i].bajada}</p>
				<div class="p-card__bottom-info">
          ${talles(data[i].talles, data[i].nombre)} 
          ${colores(data[i].colores, data[i].nombre)}
        </div>
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
            <span class="p-modal__color-circle p-modal__color-circle--rojo" style="background-color: ${data[i].hexa}; border: 1px solid #303030;"></span>
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
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
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
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
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
          </div>
        </div>
      </div>
    `;
  }
  cuerpoModales.innerHTML = modales;
};

window.onload = function () {
  fetch('../assets/json/products.json')
    .then((response) => response.json())
    .then((data) => {
      fillCard(data);
      fillModales(data);
    });
};
