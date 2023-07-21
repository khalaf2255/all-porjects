import { useEffect, useState } from "react";

 

export default function App() {
  const [country, setCountry] = useState("cairo");

  useEffect(() => {
    async function getCountry() {
  try {

    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${country}`
    );

    const data = await res.json();
    let allData = data.results;
    const LastData = allData.map((data) => data);

    const { latitude, longitude, timezone, name, country_code } =
      LastData.at(0);

    //   // 2) Getting actual weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
    );
    const weatherData = await weatherRes.json();
    console.log(weatherData);
  } catch (err) {
    console.log(err);
  }
    finally {

  }
    }
    getCountry();
  }, [country]);
  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        alt="dd"
      />
    </div>
  );
}
