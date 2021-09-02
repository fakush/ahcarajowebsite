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
                <blockquote class="phrases-history__blockquote">
                <span class="phrases-history__large-text">
                  ${setCuerpo1}
                </span>
                ${setCuerpo2}
              </blockquote>
              <figcaption class="phrases-history__author-wrapper">
                <cite class="phrases-history__author-name">${setAutor}</cite>
                <span class="phrases-history__author-location">${setLocalidad}</span>
              </figcaption>
  `;
};

window.onload = function () {
  fetch('../assets/json/historias.json')
    .then((response) => response.json())
    .then((data) => fillHistoria(data));
};
