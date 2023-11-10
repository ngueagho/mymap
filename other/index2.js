var map = L.map('map').setView([4.40, 11], 13);
// console.log(map);


// L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', { 
// attribution: 'données © <a href="//asm.org/ copyright">OpenStreetMap</a>/0DbL - rendu <a href="// openstreetmap.fr">0SM France</a>',
// minzoom: 1,
// maxZoom: 20
// }).addTo(map);

window.onload = function(){
    var OpenStreetMap_Roberto = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        maxZoom: 30,
        attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        name:"tile"// permettra de ne pas supprimer la couche;
        }).addTo(map);
        
        // gestion des champs
        let champsVille = document.getElementById('ville')
        let champsDistance = document.getElementById('distance')
        let champsValeur_distance = document.getElementById('valeur_distance')

        champsDistance.addEventListener("change",function(){
            distance= this.value;
            champsValeur_distance.innerText = distance + "  KM"
        })

        champsVille.addEventListener('change', function(){
            // on envoi lla requette ajax vers nominatim 
            ajaxGet('https://nominatim.openstreetmap.org/search?q=${this.value}&format=json&addressdetails=1&limit=1&polygon_svg=1')
            .then(response => {
                console.log(responsew)
            })
        })


        // partie ajax
        // cette fonction effeectu un appel ajax vers l'url et retoune une promesse
        function ajaxGet(url) {
            return new Promise(function(resolve, reject){
                // gestion de la promesse 
                let xmlhttp = new XMLHttpRequest()

                xmlhttp.onreadystatechange = function (){
                    if (xmlhttp.readyState == 4){
                        if(xmlhttp.status == 200){
                            // on resoud la promesse
                            resolve(xmlhttp.response)
                        }else{
                            reject(xmlhttp)
                        }
                    }
                }
                xmlhttp.onerror = function(error){
                    reject(error)
                }
                xmlhttp.open('get', url, true)
                xmlhttp.send()
            })
        }











        // partie qui cree la zone de recherche 
        L.Routing.control({
        geocoder: L.Control.Geocoder.nominatim(),
        lineOptions:{
            styles: [{
                color: '#839c49',
                opacity: 1,
                weight:7
            }]
        },
         
        router: new L.Routing.osrmv1({
            language: "fr",
            profile: "car"
        })
        }).addTo(map);

        var routeControl = L.Routing.control({
            waypoints: [
              L.latLng(4.28, 10.10),
              L.latLng(4.37, 11.6),
              L.latLng(4.55, 11.5)
            ]
        }).addTo(map);
        routeControl.on('routesfound', function(e) {
        var routes = e.routes;
        var summary = routes[0].summary;
        console.log(e);
        // alert distance and time in km and minutes
        let heure= Math.floor(summary.totalTime/3600)
        let minutes= (summary.totalTime - (heure*3600))/60
        minutes = Math.round(minutes);
        alert('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + heure + ' heures'+ minutes+ ' minutes');
        });

        

        // donne la latitude et la longitud du point sur lequel on cliquee
        function onMapClick(e) {
            alert("You clicked the map at " + e.latlng);
            console.log(e.latlng);
            console.log(L);
        }
        map.on('click', onMapClick);

        // L.Routing.control({
        //     geocoder: L.Control.Geocoder.nominatim()
        // }).addTo(map);
}



// var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
// attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
// subdomains: 'abcd',
// maxZoom: 20
// }).addTo(map);

// var marker = L.marker([51.5, -0.09]).addTo(map);
// marker.bindPopup("<P>roberto</p>")

var popup = L.popup()
.setLatLng([4.40, 11])
.setContent("I am roberto")
.openOn(map);



var icone=L.icon({
    iconUrl:"images/png.webp",
    iconSize: [50,50],
})

