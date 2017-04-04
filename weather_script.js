// api key is 3a56643830a757e248ecaf41d73c15fa
var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?appid=3a56643830a757e248ecaf41d73c15fa';
var googleAPI = "http://maps.googleapis.com/maps/api/geocode/json?sensor=true";
var test = 'San Jose'.replace(' ', '%20');
var isCelcius = false;
var temperature = 68;

function farenheitToCelcius(farenheit){
	return (farenheit-32)*(5.0/9.0);
}
function celciusToFarenheit(celcius){
	return (celcius*(9.0/5.0)) + 32;
}
function kelvinToCelcius(kelvins){
	return kelvins - 273.15;
}
function kelvinToFarenheit(kelvins){
	return celciusToFarenheit(kelvinToCelcius(kelvins));
}

/* Toggles temperature between farenheit  and celcius */
function toggleTemperature(){
	if(isCelcius){
		temperature = celciusToFarenheit(temperature);
		isCelcius = false;
		$('#temperature').html('Temperature: ' + Math.round(temperature, 2) + ' <span id="toggle_temp" onclick="toggleTemperature()">F</span>');
	}else{
		temperature = farenheitToCelcius(temperature);
		isCelcius = true;
		$('#temperature').html('Temperature: ' + Math.round(temperature, 2) + ' <span id="toggle_temp" onclick="toggleTemperature()">C</span>');
	}
}

$(document).ready(function() {
    if(navigator.geolocation){ // asks user for their location (do this first before executing script 
        navigator.geolocation.getCurrentPosition(function(position){
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            googleAPI += "&latlng=" + lat + "," + lon;
            
            $.getJSON(googleAPI, function(json){
                var city = json.results[0].address_components[2].short_name;
                $('#city').html('<h2>' + city + '</h2>');
                weatherAPI += '&q=' + city.replace(' ', '%20');    
                console.log(weatherAPI);
                $.getJSON(weatherAPI, function(json){
                    console.log(json);
                    var weather_description = json.weather[0].main;
                    var kelvins = json.main.temp;    
					temperature = kelvinToFarenheit(kelvins); // set to farenheit by default	
                    $('#description').html('Weather: ' + weather_description);
					$('#temperature').html('Temperature: ' + Math.round(temperature, 2) + ' <span id="toggle_temp" onclick="toggleTemperature()">F</span>');
                });
            });         
        });
    }
});