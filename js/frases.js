const $historiasContent = document.getElementById('historiasContent');

const createHistoriaContent = (storyList) => {
  let randomStory = Math.floor(Math.random() * storyList.length);
  const { titulo, textoNegrita, texto, autor, ubicacion } = storyList[randomStory];
  return `
    <h2 class="phrases-history__title" data-aos="fade-up" data-aos-delay="50">${titulo}</h2>
    <figure data-aos="fade-up" data-aos-delay="100">
      <blockquote class="phrases-history__blockquote">
        <span class="phrases-history__large-text">${textoNegrita}</span>
        ${texto}
      </blockquote>
      <figcaption class="phrases-history__author-wrapper">
        <cite class="phrases-history__author-name">${autor}</cite>
        <span class="phrases-history__author-location">${ubicacion}</span>
      </figcaption>
    </figure>
  `;
};

loadSocialMediaURLs();
fetch('../assets/json/historias.json')
  .then((response) => response.json())
  .then((storyList) => {
    $historiasContent.innerHTML = createHistoriaContent(storyList);
  });
