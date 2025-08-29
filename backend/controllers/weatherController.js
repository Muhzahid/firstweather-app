import axios from "axios";
import { sendEmail } from "../utils/sendEmail.js";

export const getWeather = async (req, res) => {
  try {
    const { city, email } = req.query; // email param allow karenge

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );

    const data = response.data;

    const weatherInfo = {
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      precipitation: data.rain?.["1h"] || data.snow?.["1h"] || 0,
      description: data.weather[0].description,
    };

    // ✅ Check extreme conditions
    let alertMessage = "";
    if (weatherInfo.temperature > 40) {
      alertMessage = `🔥 Extreme Heat Alert in ${weatherInfo.city}! Temp: ${weatherInfo.temperature}°C`;
    } else if (weatherInfo.temperature < 0) {
      alertMessage = `❄️ Extreme Cold Alert in ${weatherInfo.city}! Temp: ${weatherInfo.temperature}°C`;
    } else if (weatherInfo.windSpeed > 50) {
      alertMessage = `🌪️ High Wind Alert in ${weatherInfo.city}! Wind Speed: ${weatherInfo.windSpeed} km/h`;
    } else if (weatherInfo.precipitation > 20) {
      alertMessage = `🌧️ Heavy Rain Alert in ${weatherInfo.city}! Precipitation: ${weatherInfo.precipitation} mm`;
    }

    // ✅ Agar alert hai aur email diya gaya hai to bhej do
    if (alertMessage && email) {
      await sendEmail(email, "⚠️ Weather Alert", alertMessage);
      weatherInfo.alertSent = true;
    }

    res.json(weatherInfo);
  } catch (err) {
    console.error("Weather fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};
