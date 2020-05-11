import React, {useState} from 'react';
// import './App.css';
const weatherApi ={
  key: "3de7dbb3ba541b62d3f9b8b59bbd4b7c",
  baseUrl:"https://api.openweathermap.org/data/2.5/weather"

}

function App() {  

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = event =>{ //getting weather details from api
    if (event.key === "Enter"){
      fetch(`${weatherApi.baseUrl}?q=${query}&units=metric&appid=${weatherApi.key}`)     
      .then(response => response.json())
      .then(result => {        
        setWeather(result);
        setQuery('');
        console.log(result); //debugging
      });
    }
  }

  const dateBuilder= (d) =>{
    let months = ["January", "February", "March", "April", 
                  "May", "June", "July", "August", "September", 
                  "October", "November", "December"
                ];
    let days = ["Sunday", "Monday", "Tuesday","Wednesday", 
                "Thursday", "Friday", "Saturday"
              ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const changeIcon=()=>{
    const iconCode= weather.weather[0].icon;
    const source=`http://openweathermap.org/img/wn/${iconCode}@2x.png`;  
  
    return (<img src={source} alt="" className="icon"/>);
  }

  return (    
    <div className={(typeof weather.main != "undefined") ? (weather.weather[0].main==="Rain" ? "app-rain" : ((weather.main.temp > 16) ? 'app-warm' : 'app')) : 'app-warm'}>
     <main>
       <div className="search-box">
         <input 
         type="text" 
         className="search-bar"
         placeholder="Search..."
         onChange={event => setQuery(event.target.value)}
         value={query}
         onKeyPress={search}
         onLoad={search}
         />
       </div>
       <div>
       {(typeof weather.main != "undefined")? (
        <div>         
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°C</div>          
            <div className="weather">{weather.weather[0].main}</div>   
            <div className="weather-icon">{changeIcon()}</div>        
          </div>                 
        </div>
       ):""}
       </div>
     </main>
    </div>
  );
}

export default App;
