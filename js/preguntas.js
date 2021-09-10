const $faqContent = document.getElementById('accordion');

const createFAQContent = (faqList) => `
  <div class="faq__container">
    <h2 class="faq__title" data-aos="fade-up">Preguntas frecuentes</h2>
    ${faqList.map(({ seccion, contenido }, i) => `
      <div class="faq__collapsable" data-aos="fade-up" data-aos-delay="${i * 50}" data-aos-anchor-placement="#accordion">
        <div class="faq__collapsable-header" id="heading${i}">
          <button
            class="faq__collapsable-btn"
            type="button"
            data-toggle="collapse"
            data-target="#collapse${i}"
            aria-expanded="false"
            aria-controls="collapse${i}"
          >
            <h3 class="faq__collapsable-title">${seccion}</h3>
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
          data-parent="#accordion"
        >
          <div class="faq__collapsable-body">
              ${contenido.map(({ pregunta, respuesta }) => `
                <div>
                  <h4 class="faq__collapsable-subtitle">${pregunta}</h4>
                  <p class="faq__collapsable-text">
                    ${respuesta}
                  </p>
                </div>
              `).join('')}
          </div>
        </div>
      </div>
    `).join('')}
  </div>
`;

loadSocialMediaURLs();
fetch('../assets/json/preguntas.json')
  .then((response) => response.json())
  .then((faqList) => {
    $faqContent.innerHTML = createFAQContent(faqList);
  });