const cuerpoHistoria = document.getElementById('nuevaCard');

const fillCard = (data) => {
  let card = ``;
  const fotos = (int, prod) => {
    const fotos = ``;
    for (let i = 2; i <= int; i++) {
      fotos += `
		  		<div class="p-card__img p-card__img--${prod}-${i} carousel-item"></div>
		  		`;
    }
    return fotos;
  };
  const indicadores = (int) => {
    const indicadores = ``;
    for (let i = 1; i < int; i++) {
      indicadores += `
				<li class="custom-indicators__indicator" data-target="#p-card-1" data-slide-to="${i}"></li>
		  		`;
    }
    return indicadores;
  };
  const punteo = (data) => {
    const punteo = ``;
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        punteo += `
		  		<li class="p-card__details-item">${data[i]}</li>
		  `;
      }
    }
    return punteo;
  };
  const talles = (data) => {
    if (data.length > 0) {
      let aux = ``;
      for (let i = 0; i < data.length; i++) {
        aux += `
				<li class="p-card__info-item  p-card__info-item--size">${data[i]}</li>
			`;
      }
      let salida = `<button class="p-card__info-box" type="button" data-toggle="modal" data-target="#sizeModal">
						<h4 class="p-card__info-title">Talles</h4>
						<ul class="p-card__info-list">
							${aux}
						</ul>
					</button>`;
      return salida;
    }
  };
  const colores = (data) => {
    if (data.length > 0) {
      let aux = ``;
      for (let i = 0; i < data.length - 1; i++) {
        aux += `
					<li class="p-card__info-item  p-card__info-item--color-1"></li>
				`;
      }
      let salida = `
	  				<button class="p-card__info-box" type="button" data-toggle="modal" data-target="#colorModal">
						<h4 class="p-card__info-title">Colores</h4>
						<ul class="p-card__info-list p-card__info-list--colors">
							${aux}
							<li class="p-card__info-item  p-card__info-item--more-colors">${data[data.length - 1]}</li>
						</ul>
					</button>
	  `;
      return salida;
    }
  };
  data.array.forEach((element) => {
    card += `
        <article class="p-card" data-aos="fade-up">
			<div class="p-card__carousel carousel slide carousel-fade" id="p-card-1" data-ride="carousel">
				<div class="carousel-inner">
					<p class="p-card__label">${element.tag}</p>
					<div class="p-card__img p-card__img--${element.nombre}-1 carousel-item active"></div>
					${fotos(element.fotos, element.nombre)}
				</div>
				<ol class="custom-indicators carousel-indicators">
					<li class="custom-indicators__indicator active" data-target="#p-card-1" data-slide-to="0"></li>
					${indicadores(element.fotos)}
				</ol>
			</div>
			<div class="p-card__body">
				<div class="p-card__header">
					<h3 class="p-card__title">${element.producto}</h3>
					<p class="p-card__price">${element.precio}</p>
				</div>
				<ul class="p-card__details-list">
					${punteo(element.detalle)}
				</ul>
				<p class="p-card__details-text">
					${element.bajada}
				</p>
				<div class="p-card__bottom-info">
					${talles(element.talles)}
					${colores(element.colores)}
				</div>
			</div>
		</article>
  `;
  });
  cuerpoHistoria.innerHTML = card;
};

window.onload = function () {
  fetch('../assets/json/products.json')
    .then((response) => response.json())
    .then((data) => fillCard(data));
};
