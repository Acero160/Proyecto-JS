// Coordenadas del negocio (ubicación de la oficina)
var negocioCoords = [40.416775, -3.703790]; // Madrid, España

// Inicializamos el mapa centrado en la ubicación del negocio
var map = L.map('map').setView(negocioCoords, 13);

// Capa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Añadir un marcador para la ubicación del negocio
var marker = L.marker(negocioCoords).addTo(map)
    .bindPopup('<b>Nuestra Oficina</b><br>Calle Falsa 123, Madrid.').openPopup();

// Función para calcular la ruta (con geolocalización del cliente)
function calculateRoute() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            var userLocation = [lat, lng];

            // Añadir un marcador para la ubicación del cliente
            var clientMarker = L.marker(userLocation).addTo(map)
                .bindPopup('Tu ubicación actual').openPopup();

            // Dibujar una línea entre la ubicación del cliente y el negocio
            var route = L.polyline([userLocation, negocioCoords], { color: 'blue' }).addTo(map);
            map.fitBounds(route.getBounds());
        }, function () {
            alert("No se pudo obtener tu ubicación.");
        });
    } else {
        alert("Geolocalización no soportada por tu navegador.");
    }
}

// Llamada para calcular la ruta cuando se carga la página
calculateRoute();
