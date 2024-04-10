'use strict';

// Fonction pour ajouter un événement à un élément
const addEventOnElem = function (elem, type, callback) {
  if (NodeList.prototype.isPrototypeOf(elem)) { // Vérifie si 'elem' est une NodeList
    for (let i = 0; i < elem.length; i++) {
      if (elem[i] instanceof Element) { // Ajoute une vérification supplémentaire
        elem[i].addEventListener(type, callback);
      }
    }
  } else if (elem instanceof Element) { // Vérifie si 'elem' est un Element
    elem.addEventListener(type, callback);
  }
};

// Fonctions de basculement de la navbar
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

// Fonction pour afficher le header et le bouton de retour en haut de la page lors du défilement
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 80) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
};

window.addEventListener('scroll', headerActive);

// Attend que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', () => {
  // Ajoute un écouteur d'événements au bouton pour la récupération des données
  const fetchDataButton = document.getElementById('fetch-data-button');
  if (fetchDataButton) { // S'assure que le bouton existe avant d'ajouter l'écouteur d'événements
    const resultsContainer = document.getElementById('results');

    fetchDataButton.addEventListener('click', function(event) {
      event.preventDefault(); // Empêche le comportement par défaut du lien
      fetch('/api/images') // Utilise le nouvel endpoint pour les données
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // Efface les résultats précédents
          resultsContainer.innerHTML = '';
          // Crée une nouvelle balise image et la définit avec l'URL de l'image
          const img = document.createElement('img');
          img.src = data.imageData; // Utilise l'attribut imageData contenant l'image en base64
          img.alt = 'Image chargée'; // Ajoutez un texte alternatif pour l'accessibilité
          resultsContainer.appendChild(img);
        })
        .catch(error => {
          console.error('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        });
    });
  }
});
