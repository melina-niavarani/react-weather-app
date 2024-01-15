import './App.css';
import Search from './components/Search';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('null');
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

  function handleSubmit(value){
    let SearchingCity = value
    setCity(SearchingCity)
  }
  const Api_Key = "866a208a73eeff02182218e9441647a1";

  useEffect(()=>{
    const fetchData = async () => {
      if (city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}&units=metric`;
        try {
          const response = await axios.get(url);
          setStatus(response);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoaded(true);
        }
      }
    };

    fetchData();
  }, [city])

 

  function setStatus(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].main,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      wind: response.data.wind.speed,
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <Search handleSubmit={handleSubmit}/>
        {city? (     
          <div>
            <p>
              {city}
            </p>
            <ul>
              <li>{Math.round(weather.temperature)}°C</li>
              <li>{weather.description}</li>
              <li><img srcSet={weather.icon} alt='weather-conditon-icon'/></li>
              <li>{weather.humidity}</li>
              <li>{weather.wind}</li>
            </ul>
          </div>)
          : null
        }
      </header>
    </div>
  );
}

export default App;
