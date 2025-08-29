import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchWeather } from "../features/weatherSlice.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  Cloud,
  Wind,
  Droplets,
  Thermometer,
  CloudRain,
  LogOut,
  Search,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const Weather = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.data);
  const loading = useSelector((state) => state.weather.loading);
  const error = useSelector((state) => state.weather.error);
  const navigate = useNavigate();
  const { tempUnit, defaultCity } = useSelector((state) => state.preferences);

  // dummy data fallback
  const forecastData = weather?.forecast || [
    { time: "10 AM", temp: 25 },
    { time: "11 AM", temp: 27 },
    { time: "12 PM", temp: 29 },
    { time: "1 PM", temp: 28 },
    { time: "2 PM", temp: 26 },
  ];



  // ✅ Fetch weather for default city on load or when defaultCity changes
  useEffect(() => {
    if (defaultCity) {
      console.log("Fetching weather of default city", defaultCity);

      dispatch(fetchWeather(defaultCity));
    }
  }, [defaultCity, dispatch]);

  const handleSearch = () => {
    if (!city) return;
    console.log("Dispatching API call for city", city);

    dispatch(fetchWeather(city));
  };

  const handleLogout = () => {
    Cookies.remove("token");
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    navigate("/");
  };

  const temperature =
    weather && tempUnit === "F"
      ? (weather.temperature * 9) / 5 + 32
      : weather?.temperature;

  const cityToShow = weather?.city || defaultCity;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 dark:bg-gray-700 flex flex-col">
      {/* Navbar */}
      <header className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white/10 backdrop-blur-md dark:bg-gray-500  gap-3 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">
          🌤️ Weather App
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center text-[14px] sm:text-[16px] font-[500] gap-2 bg-blue-600 text-white hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg transition w-full sm:w-auto"
          >
            <LogOut size={18} />
            Logout
          </button>
          <button
            onClick={() => navigate("/preferences")}
            className="flex items-center justify-center text-[14px] sm:text-[16px] font-[500] gap-2 bg-blue-600 text-white hover:bg-white hover:text-blue-600 px-4 py-2 rounded-lg transition w-full sm:w-auto"
          >
            Preferences
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center dark:bg-gray-700  justify-center px-4">
        {/* Search Bar */}
        <div className="flex w-full max-w-md bg-white rounded-full shadow-lg overflow-hidden mb-8">
          <input
            type="text"
            placeholder="Enter City..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-2 outline-none text-gray-700"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 flex items-center justify-center hover:bg-blue-700 transition"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Loading / Error */}
        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-200 font-medium">{error}</p>}

        {/* Weather Card */}
        {weather && (
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-lg text-white">
            <h2 className="text-2xl font-bold text-center mb-4">{cityToShow}</h2>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Thermometer size={28} />
                <span className="text-[16px] font-[500]">
                  {temperature} °{tempUnit}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Droplets size={28} />
                <span className="text-[16px] font-[500]">{weather.humidity} %</span>
              </div>
              <div className="flex items-center gap-3">
                <Wind size={28} />
                <span className="text-[16px] font-[500]">{weather.windSpeed} m/s</span>
              </div>
              <div className="flex items-center gap-3">
                <CloudRain size={28} />
                <span className="text-[16px] font-[500]">{weather.precipitation} mm</span>
              </div>
            </div>

            <div className="flex items-center justify-center mt-6">
              <Cloud className="mr-2" size={28} />
              <p className="text-lg capitalize">{weather.description}</p>
            </div>
          </div>
        )}


        {/* Chart Section */}
        {forecastData && (
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-lg mt-6">
            <h3 className="text-xl font-bold text-center mb-4 text-white">
              Temperature Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="time" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Line type="monotone" dataKey="temp" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}


      </main>
    </div>
  );
};

export default Weather;