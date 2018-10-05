// Création et initialisation de la carte
var mymap = L.map('mapid').setView([45.767752, 4.835711], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoidm9vZG9vYmVhciIsImEiOiJjam12eGo2b3YwYWI0M3FvMTE1ZHlwYW1jIn0.9RyAylHiMnrIxPCkRKdHFw'
}).addTo(mymap);

// Création et ersonalisation des markers
var redIcon = L.icon({
    iconUrl: './img/marker.png',

    iconSize:     [30, 48], // size of the icon
    iconAnchor:   [45, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var marker = L.marker([45.767752, 4.835711], {icon: redIcon}).addTo(mymap);

// Récupération des données de l'API JCDeaux
ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=4a546114cb667ec63f49d8e5852e7653b2632825", function(response) {
    var velovJSON = JSON.parse(response);
      // Création d'une boucle pour récupérer les données que l'on veut dans l'API
      velovJSON.forEach(function(velovJSON) {
        console.log(velovJSON.number, velovJSON.name + "\n", velovJSON.position.lat, velovJSON.position.lng, velovJSON.address),
        // utilisation des données de position pour afficher cahque markers au positions des stations velov
        new L.marker([velovJSON.position.lat, velovJSON.position.lng], {icon: redIcon}).addTo(mymap);
      })
    });