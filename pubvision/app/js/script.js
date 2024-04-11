'use strict';

// Fonction pour ajouter un événement à un élément
const addEventOnElem = function(elem, type, callback) {
  if (NodeList.prototype.isPrototypeOf(elem)) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

// Fonctions de basculement de la navbar
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

// Ajoute des événements sur les éléments de la navbar
addEventOnElem(navTogglers, "click", toggleNavbar);
addEventOnElem(navbarLinks, "click", closeNavbar);

// Gestion du chargement d'images et de l'interaction avec celles-ci
document.addEventListener('DOMContentLoaded', function() {
  const fetchDataButton = document.getElementById('fetch-data-button');
  const resultsContainer = document.getElementById('results');
  
  fetchDataButton.addEventListener('click', function(event) {
    event.preventDefault();
    fetch('/api/images')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        resultsContainer.innerHTML = '';
        const img = new Image();
        img.src = data.imageData;
        img.alt = 'Loaded Image';
        img.className = 'image-in-cadran';
        img.onload = () => {
          initializeImageInteractions(img);
        };
        resultsContainer.appendChild(img);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  });
});

// Fonctions pour la navigation
function toggleNavbar() {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

function closeNavbar() {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

// Fonction pour afficher le header et le bouton de retour en haut de la page lors du défilement
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener('scroll', function() {
  header.classList.toggle("active", window.scrollY > 80);
  backTopBtn.classList.toggle("active", window.scrollY > 80);
});

// Fonction pour la manipulation de l'image
function initializeImageInteractions(image) {
  let scale = 1;
  const scaleIncrement = 0.1;
  const moveAmount = 10;
  const cadran = document.getElementById('cadranImageContainer');

  document.addEventListener('keydown', function(event) {
    switch (event.key) {
      case 'p':
        image.style.top = `${Math.max(-image.offsetHeight * (scale - 1), parseInt(image.style.top) - moveAmount)}px`;
        break;
      case 'o':
        image.style.top = `${Math.min(0, parseInt(image.style.top) + moveAmount)}px`;
        break;
      case 'ArrowLeft':
        image.style.left = `${Math.max(-image.offsetWidth * (scale - 1), parseInt(image.style.left) - moveAmount)}px`;
        break;
      case 'ArrowRight':
        image.style.left = `${Math.min(0, parseInt(image.style.left) + moveAmount)}px`;
        break;
      case 'z':
        scale = Math.min(4, scale + scaleIncrement);
        break;
      case 's':
        scale = Math.max(1, scale - scaleIncrement);
        break;
    }
    image.style.transform = `scale(${scale})`;
    updateImagePosition();
  });

  function updateImagePosition() {
    const rect = cadran.getBoundingClientRect();
    const imgRect = image.getBoundingClientRect();
    const maxLeft = 0;
    const maxTop = 0;
    const minLeft = rect.width - imgRect.width * scale;
    const minTop = rect.height - imgRect.height * scale;

    image.style.left = `${Math.min(maxLeft, Math.max(minLeft, parseInt(image.style.left)))}px`;
    image.style.top = `${Math.min(maxTop, Math.max(minTop, parseInt(image.style.top)))}px`;
  }

  // Initialise le style de l'image pour la manipulation
  image.style.position = 'absolute';
  image.style.left = '50%';
  image.style.top = '50%';
  image.style.transform = 'translate(-50%, -50%)';
  image.style.transformOrigin = 'top left';
}
