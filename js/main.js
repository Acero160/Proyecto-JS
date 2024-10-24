// Función para cargar noticias desde un archivo JSON
function cargarNoticias() {
  fetch('../js/noticias.json')
    .then(response => response.json())
    .then(data => {
      mostrarNoticias('nacionales', data.nacionales);
      mostrarNoticias('internacionales', data.internacionales);
      mostrarNoticias('deportes', data.deportes);
      mostrarNoticias('tecnologia', data.tecnologia);
    })
    .catch(error => console.error('Error al cargar el JSON:', error));
}

// Función para mostrar las noticias en la sección correspondiente
function mostrarNoticias(categoria, noticias) {
  const contenedor = document.getElementById(categoria + 'Noticias');
  noticias.forEach(noticia => {
    const article = document.createElement('article');
    const titulo = document.createElement('h3');
    const contenido = document.createElement('p');
    const enlace = document.createElement('a');

    titulo.textContent = noticia.titulo;
    contenido.textContent = noticia.contenido;
    enlace.textContent = 'Leer más';
    enlace.href = noticia.enlace;

    article.appendChild(titulo);
    article.appendChild(contenido);
    article.appendChild(enlace);

    contenedor.appendChild(article);
  });
}

// Cargar las noticias cuando se cargue la página
window.onload = cargarNoticias;


/* Navbar */
let dropdowns = document.querySelectorAll('.navbar .dropdown-toggler')
let dropdownIsOpen = false

// Handle dropdown menues
if (dropdowns.length) {
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('click', (event) => {
      let target = document.querySelector(`#${event.target.dataset.dropdown}`)

      if (target) {
        if (target.classList.contains('show')) {
          target.classList.remove('show')
          dropdownIsOpen = false
        } else {
          target.classList.add('show')
          dropdownIsOpen = true
        }
      }
    })
  })
}

// Handle closing dropdowns if a user clicked the body
window.addEventListener('mouseup', (event) => {
  if (dropdownIsOpen) {
    dropdowns.forEach((dropdownButton) => {
      let dropdown = document.querySelector(`#${dropdownButton.dataset.dropdown}`)
      let targetIsDropdown = dropdown == event.target

      if (dropdownButton == event.target) {
        return
      }

      if ((!targetIsDropdown) && (!dropdown.contains(event.target))) {
        dropdown.classList.remove('show')
      }
    })
  }
})
function handleSmallScreens() {
  document.querySelector('.navbar-toggler')
    .addEventListener('click', () => {
      let navbarMenu = document.querySelector('.navbar-menu')

      if (!navbarMenu.classList.contains('active')) {
        navbarMenu.classList.add('active')
      } else {
        navbarMenu.classList.remove('active')
      }
    })
}

handleSmallScreens()




// Lista de imágenes para la galería
const galleryImages = [
    './assets/imagen1.jpg',
    './assets/imagen2.jpg',
    './assets/imagen3.jpg',
    './assets/imagen4.jpg',
    './assets/imagen5.jpg'
];

// Variables para el control de la galería
let currentImageIndex = 0;
const galleryImageElement = document.getElementById('gallery-image');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');

// Función para mostrar la imagen actual en la galería
function showImage(index) {
    galleryImageElement.src = galleryImages[index];
}

// Mostrar la primera imagen al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    showImage(currentImageIndex);
    // Iniciar la presentación automática
    startSlideshow();
});

// Evento para el botón 'Siguiente'
nextButton.addEventListener('click', () => {
    nextImage();
});

// Evento para el botón 'Anterior'
prevButton.addEventListener('click', () => {
    prevImage();
});

// Función para avanzar a la siguiente imagen
function nextImage() {
    currentImageIndex++;
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0; // Volver a la primera imagen
    }
    showImage(currentImageIndex);
}

// Función para retroceder a la imagen anterior
function prevImage() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1; // Volver a la última imagen
    }
    showImage(currentImageIndex);
}

// Función para iniciar la presentación automática
function startSlideshow() {
    setInterval(() => {
        nextImage(); // Avanzar a la siguiente imagen cada 3 segundos
    }, 3000); // 3000 ms = 3 segundos
}
