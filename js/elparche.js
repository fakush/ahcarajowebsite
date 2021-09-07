const $elParcheContent = document.getElementById('elParcheContent');

const fillParche = ({ titulo, cuerpo }) => {
	$elParcheContent.innerHTML = `
      <h2 class="banner__title" data-aos="fade-up">${titulo}</h2>
	  <p class="banner__text" data-aos="fade-up" data-aos-delay="100">${cuerpo}</p>
	`
};

loadSocialMediaURLs();
fetch('../assets/json/parche.json')
  .then((response) => response.json())
  .then((data) => fillParche(data));
