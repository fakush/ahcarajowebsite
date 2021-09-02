const textoTitulo = document.getElementById('tituloParche');
const textoCuerpo = document.getElementById('textoParche');

const fillParche = (data) => {
  const setTitulo = data[0].titulo;
  const setCuerpo = data[0].cuerpo;
  textoTitulo.innerHTML = setTitulo;
  textoCuerpo.innerHTML = setCuerpo;
};

window.onload = function () {
  fetch('../assets/json/parche.json')
    .then((response) => response.json())
    .then((data) => fillParche(data));
};
