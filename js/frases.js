const $frasesContent = document.getElementById('frasesContent');

const fillFrasesContent = (data) => {
  const { titulo, texto, subtexto, boton, historias } = data;
  const randomFrase = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  // todo: Cambiar el comentario de las lineas de abajo para pasar de Random a Fijo.
  // let index = 0;
  let index = randomFrase(0, historias.length - 1);

  const isDesktop = window.matchMedia('(min-width: 992px)').matches;
  const { frase, historia, historia2, autor, localidad } = historias[index];
  $frasesContent.innerHTML = `
    <h2 class="banner__title" data-aos="fade-up" ${isDesktop ? 'data-aos-delay="50"' : ''}>${titulo}</h2>
    <p class="banner__text" data-aos="fade-up" ${isDesktop ? 'data-aos-delay="100"' : ''}>${texto}</p>
    <p class="banner__sub-text" data-aos="fade-up" ${isDesktop ? 'data-aos-delay="150"' : ''}>${subtexto}</p>
    <a 
      class="banner__link"
      target="_blank"
      href="../assets/lista-de-frases.pdf"
      data-aos="fade-up"
      data-aos-anchor-placement=".banner__sub-text"
      ${isDesktop ? 'data-aos-delay="200"' : ''}
    >
      ${boton}
    </a>
    <section class="phrases-history">
      <div class="phrases-history__line"></div>
      <div class="phrases-history__content" data-aos="fade-up" ${isDesktop ? 'data-aos-delay="250"' : ''}>
        <h2 class="phrases-history__title">${frase}</h2>
          <figure>
            <blockquote class="phrases-history__blockquote">
              <span class="phrases-history__large-text">${historia}</span>
              ${historia2}
            </blockquote>
            <figcaption class="phrases-history__author-wrapper">
              <cite class="phrases-history__author-name">${autor}</cite>
              <span class="phrases-history__author-location">${localidad}</span>
            </figcaption>
          </figure>
      </div>
      <div class="phrases-history__line"></div>
    </section>
  `;
};

loadSocialMediaURLs();
fetch('../assets/json/frases.json')
  .then((response) => response.json())
  .then((data) => fillFrasesContent(data));
