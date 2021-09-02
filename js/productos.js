const tituloHistoria = document.getElementById('tituloHistoria');
const cuerpoHistoria = document.getElementById('cuerpoHistoria');

const fillHistoria = (data) => {
  const randomFrase = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  // todo: Cambiar el comentario de las lineas de abajo para pasar de Random a Fijo.
  // let index = 0;
  let index = randomFrase(0, data.length - 1);

  const setFrase = data[index].frase;
  const setCuerpo1 = data[index].historia;
  const setCuerpo2 = data[index].historia2;
  const setAutor = data[index].autor;
  const setLocalidad = data[index].localidad;
  tituloHistoria.innerHTML = setFrase;
  cuerpoHistoria.innerHTML = `
                <article class="p-card" data-aos="fade-up">
			<div class="p-card__carousel carousel slide carousel-fade" id="p-card-1" data-ride="carousel">
				<div class="carousel-inner">
					<p class="p-card__label">¡Personalízalo!</p>
					<div class="p-card__img p-card__img--camiseta-1 carousel-item active"></div>
					<div class="p-card__img p-card__img--camiseta-2 carousel-item"></div>
					<div class="p-card__img p-card__img--camiseta-3 carousel-item"></div>
					<div class="p-card__img p-card__img--camiseta-4 carousel-item"></div>
				</div>
				<ol class="custom-indicators carousel-indicators">
					<li class="custom-indicators__indicator active" data-target="#p-card-1" data-slide-to="0"></li>
					<li class="custom-indicators__indicator" data-target="#p-card-1" data-slide-to="1"></li>
					<li class="custom-indicators__indicator" data-target="#p-card-1" data-slide-to="2"></li>
					<li class="custom-indicators__indicator" data-target="#p-card-1" data-slide-to="3"></li>
				</ol>
			</div>
			<div class="p-card__body">
				<div class="p-card__header">
					<h3 class="p-card__title">Camiseta</h3>
					<p class="p-card__price">$45.000</p>
				</div>
				<ul class="p-card__details-list">
					<li class="p-card__details-item">100% algodòn.</li>
					<li class="p-card__details-item">Cuello V o Redondo.</li>
					<li class="p-card__details-item">Empaca en una tula ecológica.</li>
				</ul>
				<div class="p-card__bottom-info">
					<button class="p-card__info-box" type="button" data-toggle="modal" data-target="#sizeModal">
						<h4 class="p-card__info-title">Talles</h4>
						<ul class="p-card__info-list">
							<li class="p-card__info-item  p-card__info-item--size">2</li>
							<li class="p-card__info-item  p-card__info-item--size">XS</li>
							<li class="p-card__info-item  p-card__info-item--size">S</li>
							<li class="p-card__info-item  p-card__info-item--size">M</li>
							<li class="p-card__info-item  p-card__info-item--size">L</li>
							<li class="p-card__info-item  p-card__info-item--size">XL</li>
						</ul>
					</button>
					<button class="p-card__info-box" type="button" data-toggle="modal" data-target="#colorModal">
						<h4 class="p-card__info-title">Colores</h4>
						<ul class="p-card__info-list p-card__info-list--colors">
							<li class="p-card__info-item  p-card__info-item--color-1"></li>
							<li class="p-card__info-item  p-card__info-item--color-2"></li>
							<li class="p-card__info-item  p-card__info-item--color-3"></li>
							<li class="p-card__info-item  p-card__info-item--color-4"></li>
							<li class="p-card__info-item  p-card__info-item--color-5"></li>
							<li class="p-card__info-item  p-card__info-item--more-colors">+7</li>
						</ul>
					</button>
				</div>
			</div>
		</article>
  `;
};

window.onload = function () {
  fetch('../assets/json/products.json')
    .then((response) => response.json())
    .then((data) => fillHistoria(data));
};
