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
          setLoaded(true)
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoaded(false);
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
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`,
      wind: response.data.wind.speed,
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <Search handleSubmit={handleSubmit}/>
        {loaded? (     
          <div className='container rounded bg-light bg-opacity-25 py-5 mt-5'>
            <div className='d-flex justify-content-center align-items-center mb-5'>
              <img srcSet={weather.icon} alt='weather-conditon-icon'/>
              <div className='text-secondary'>
                <p className="text-capitalize fw-bold fs-2 m-0">
                  {city}
                </p>
                <div className='fs-5'>{Math.round(weather.temperature)}°C</div>
                <div className='fs-6'>{weather.description}</div>
              </div>
            </div>
            <hr></hr>
            <div className='d-flex justify-content-evenly fw-bold'>
              <span>💧{weather.humidity}</span>
              <span>🌬️ {weather.wind}</span>
            </div>
          </div>)
          : null
        }
      </header>
    </div>
  );
}

export default App;
