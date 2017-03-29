// api key is 3a56643830a757e248ecaf41d73c15fa
var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?appid=3a56643830a757e248ecaf41d73c15fa';
var googleAPI = "http://maps.googleapis.com/maps/api/geocode/json?sensor=true";
var test = 'San Jose'.replace(' ', '%20');

$(document).ready(function() {
    if(navigator.geolocation){ // asks user for their location (do this first before executing script 
        navigator.geolocation.getCurrentPosition(function(position){
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            googleAPI += "&latlng=" + lat + "," + lon;
            
            $.getJSON(googleAPI, function(json){
                var city = json.results[0].address_components[3].short_name;
                $('#city').html('<h2>' + city + '</h2>');
                weatherAPI += '&q=' + city.replace(' ', '%20');    
                console.log(weatherAPI);
                $.getJSON(weatherAPI, function(json){
                    console.log(json);
                    var weather = json.weather[0].main;
                    var kelvins = json.main.temp;     
                    var details = weather + '<br>' + kelvins + ' K<br>';
                    $('#details').html(details);    
                });
            });         
        });
    }
});