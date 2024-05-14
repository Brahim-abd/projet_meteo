import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './App.css';

function App() {
  const [temp, setTemp] = useState('');
  const [humidite, setHumidite] = useState('');
  const [ville, setVille] = useState('');
  const [pays, setPays] = useState('');
  const [timezone, setTimezone] = useState('');
  const [main, setMain] = useState('');
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [isReady, setReady] = useState(false);
  const [latitude, setLatitude] = useState('12.5833'); 
  const [longitude, setLongitude] = useState('-16.2719'); 

    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e3261a5fa53f1226df0a3629c61e61ee&units=metric`);
            const data = await response.json();
            setTemp(data.main.temp);
            setHumidite(data.main.humidity);
            setVille(data.name);
            setPays(data.sys.country);
            setTimezone(data.timezone);
            setDesc(data.weather[0].main);
            setMain(data.weather[0].main);
            setIcon(data.weather[0].icon);
            setSunrise(data.sys.sunrise);
            setSunset(data.sys.sunset);
            setReady(true);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [latitude, longitude]);

    function Myform() {
        const [localLatitude, setLocalLatitude] = useState(latitude);
        const [localLongitude, setLocalLongitude] = useState(longitude);

        function handleSubmit(event) {
            event.preventDefault();
            setLatitude(localLatitude);
            setLongitude(localLongitude);
        }

        return (
            <div className="card align-left" style={{ maxWidth: '540px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="latitude" className="form-label">Latitude</label>
                        <input
                            type="text"
                            className="form-control"
                            id="latitude"
                            onChange={e => setLocalLatitude(e.target.value)}
                            value={localLatitude}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="longitude" className="form-label">Longitude</label>
                        <input
                            type="text"
                            className="form-control"
                            id="longitude"
                            onChange={e => setLocalLongitude(e.target.value)}
                            value={localLongitude}
                        />
                    </div>
                    <button type="submit" className="btn btn-dark">Cliquez</button>
                </form>
            </div>
        );
    }

    const sunriseTime = moment.unix(sunrise);
    const sunsetTime = moment.unix(sunset);

    const getCardClass = (temp) => {
        if (temp <= 10) return "bg-custom-COLD";
        if (temp >= 11 && temp <= 20) return "bg-custom-COOL";
        if (temp >= 21 && temp <= 30) return "bg-custom-WARM";
        if (temp >= 31) return "bg-custom-HOT";
        return "bg-custom-COOL";
    };

    return (
        <div className="App">
            {isReady ? (
                <div>
                    <nav classe="contraint" className="navbar navbar-expand-lg navbar-dark text-white bg-dark mb-3">
                        <h1 className="navbar-brand" > My Weather App</h1>
                    </nav><br/>
                    <div className="row">
                      <div classe="cont" className={`col card ${getCardClass(temp)}`} id="weather">
                          <div className="card-body">
                              <div className="row g-0">
                                  <div className="col-md-9 text-left">
                                      <p>Ville : {ville}</p>
                                      <p>Température : {temp}°C </p>
                                      
                                      <p>Main : {main}</p>
                                      <div className="col-md-3">
                                      <p>Description : {desc}</p>
                                      <p>Illistration : </p><img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Icône météo" className="img-fluid rounded-start"/>
                                      <p>
                                      sunriseTime: {sunriseTime.format("HH:mm:ss")}
                                      </p>
                                      <p>
                                      sunsetTime : {sunsetTime.format("HH:mm:ss")}
                                      </p>
                                  </div>
                                      
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="col">
                          <nav className="">
                              <h1 className="navbar-brand" >Put Coordinates </h1>
                          </nav><br/>
                          <div className="long">
                              <div className='col'></div>
                              <div className='form-container'>
                              <Myform />
                              </div>
                              <div className='col'></div>
                          </div>
                      </div>
                    </div>
                </div>
            ) : (
                <p>Chargement des données...</p>
            )}
        </div>
    );
}

export default App;