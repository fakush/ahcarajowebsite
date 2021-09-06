const cuerpoPreguntas = document.getElementById('nuevasPreguntas');

const contenidoSeccion = (data) => {
  aux = ``;
  for (let i = 0; i < data.length; i++) {
    aux += `
			<div>
				<h4 class="faq__collapsable-subtitle">${data[i].pregunta}</h4>
				<p class="faq__collapsable-text">
					${data[i].respuesta}
				</p>
			</div>
        `;
  }
  return aux;
};

const fillPreguntas = (data) => {
  let preguntas = ``;

  for (let i = 0; i < data.length; i++) {
    preguntas += `
    <div class="faq__collapsable">
          <div class="faq__collapsable-header" id="heading${i}">
            <button
              class="faq__collapsable-btn"
              type="button"
              data-toggle="collapse"
              data-target="#collapse${i}"
              aria-expanded="false"
              aria-controls="collapse${i}"
            >
              <h3 class="faq__collapsable-title">${data[i].seccion}</h3>
              <img
                class="faq__collapsable-arrow"
                src="../assets/icons/arrow-down.svg"
                alt="flecha hacia abajo"
              />
            </button>
          </div>
          <div
            id="collapse${i}"
            class="collapse"
            aria-labelledby="heading${i}"
            data-parent="#accordionExample"
          >
            <div class="faq__collapsable-body">
                ${contenidoSeccion(data[i].contenido)}
            </div>
          </div>
        </div>
        
      `;
  }
  cuerpoPreguntas.innerHTML = preguntas;
};

window.onload = function () {
  fetch('../assets/json/preguntas.json')
    .then((response) => response.json())
    .then((data) => {
      fillPreguntas(data);
    });
};
