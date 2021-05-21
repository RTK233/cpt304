import React, { useState } from 'react';
import { HolidayAPI } from 'holidayapi';

const key = '33b1526f-0121-417d-945d-5f14a83e9bc1';
const holidayApi = new HolidayAPI({ key });

holidayApi.holidays({
  country: 'US',
  year: 2021,
  previous: true,
});
holidayApi.countries({
  search: 'united',
});

// // Fetch supported countries and subdivisions
// holidayApi.countries()
//   .then((countries) => { console.log(countries); })
//   .catch((err) => { console.error(err); });

// // Fetch supported languages
// holidayApi.languages()
//   .then((languages) => { console.log(languages); })
//   .catch((err) => { console.error(err); });

// // Fetch holidays with minimum parameters
// holidayApi.holidays({ country: 'US', year: 2019 })
//   .then((holidays) => { console.log(holidays); })
//   .catch((err) => { console.error(err); });

// // Async? Await? No problem!
// (async () => {
//   // Fetch supported countries and subdivisions
//   const countries = await holidayApi.countries();

//   // Fetch supported languages
//   const languages = await holidayApi.languages();

//   // Fetch holidays with minimum parameters
//   const holidays = await holidayApi.holidays({
//     country: 'US',
//     year: 2019,
//   });
// })();

const api = {
  key: "7d4ef5d23648c7c62acd3ccfa1a0a30b",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
