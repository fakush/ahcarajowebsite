const vinculoFacebook = document.getElementById('facebookLink');
const vinculoInstagram = document.getElementById('InstagramLink');
const vinculoWhatsapp = document.getElementById('whatsappLink');

const fillVinculos = (data) => {
  vinculoFacebook.href = data.facebook;
  vinculoInstagram.href = data.instagram;
  vinculoWhatsapp.href = data.whatsapp;
};

window.onload = function () {
  fetch('../assets/json/vinculos.json')
    .then((response) => response.json())
    .then((data) => fillVinculos(data));
};
