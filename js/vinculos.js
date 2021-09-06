const vinculoFacebook = document.getElementById('facebookLink');
const vinculoInstagram = document.getElementById('InstagramLink');
const numeroWhatsapp = document.getElementById('whatsappNumber');
const textoWhastapp = document.getElementById('whatsappText');

const fillVinculos = (data) => {
  vinculoFacebook.href = data.facebook;
  vinculoInstagram.href = data.instagram;
};

window.onload = function () {
  fetch('../assets/json/vinculos.json')
    .then((response) => response.json())
    .then((data) => fillVinculos(data));
};
