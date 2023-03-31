const weatherImg = document.getElementById('weatherImg');
const humidity = document.getElementById('humidity');
const city = document.getElementById('city');

window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    if(navigator.geolocation){
        try{
            navigator.geolocation.getCurrentPosition( position => {
                console.log(position);

                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                console.log(lat)

                const apiKey = "8b9603401ff3ca81c38d240589c83e71";
                const url =  `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=8b9603401ff3ca81c38d240589c83e71`;
                console.log(url);

                fetch(url)
                    .then(res=>res.json())
                    .then(data=>{
                        console.log(data);
                       let currentTemp = Math.round(data.current.temp);
                       const currentDegrees = document.getElementById('currentDegrees');
                       currentDegrees.innerHTML = currentTemp +"°C";
                        
                       let cityName = data.timezone.split("/");
                       city.textContent = cityName[1];
                       console.log(data.current.weather[0].main);// ME QUEDÉ ACÁ, ESTA CHOTA NO FUNCIONA, ESTÁ MAL LA REFERENCIA, DEVUELVE NULL
                       switch(data.current.weather[0].main){
                        case "Clouds": 
                            weatherImg.src= "icons/animated/cloudy.svg";
                        break;
                        case "Rain":
                            weatherImg.src= "icons/animated/rainy-1.svg";
                        break;
                        case "Thunderstorm":
                            weatherImg.src= "icons/animated/thunder.svg";
                        break;
                        case "Snow":
                            weatherImg.src= "icons/animated/snowy-1.svg";
                        break;
                        case "Drizzle":
                            weatherImg.src= "icons/animated/cloudy.svg";
                        break;
                        case "Clear":
                            weatherImg.src= "icons/animated/day.svg";
                        break;
                        case "Haze":
                            weatherImg.src= "icons/animated/cloudy.svg";
                        break;


                       }
                       humidity.innerHTML = "Humidity: "+ data.current.humidity + "%";
                    })
            });
        }
        catch(e){
            console.log(e);
        }
    }
});

