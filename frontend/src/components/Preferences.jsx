import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTempUnit, setDefaultCity, setTheme } from "../features/preferencesSlice";

const Preferences = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tempUnit, defaultCity } = useSelector((state) => state.preferences);
  const theme = useSelector((state) => state.preferences.theme)

  const handleSave = () => {
    navigate("/weather");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-8">
          🌤 Preferences
        </h2>

        {/* Temperature Unit */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Temperature Unit
          </label>
          <select
            value={tempUnit}
            onChange={(e) => dispatch(setTempUnit(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                       dark:bg-gray-800 dark:text-gray-200 transition"
          >
            <option value="C">🌡 Celsius (°C)</option>
            <option value="F">🔥 Fahrenheit (°F)</option>
          </select>
        </div>

        {/* Default City */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Default City
          </label>
          <input
            type="text"
            value={defaultCity}
            onChange={(e) => dispatch(setDefaultCity(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                       dark:bg-gray-800 dark:text-gray-200 transition"
            placeholder="🏙 Enter default city"
          />
        </div>

        {/* Theme */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Theme
          </label>
          <select
            value={theme}
            onChange={(e) => dispatch(setTheme(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                   rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                   dark:bg-gray-800 dark:text-gray-200 transition"
          >
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
          </select>
        </div>

        {/* Save & Go to Weather Button */}
        <button
          onClick={handleSave}
          className="w-full py-3 rounded-xl font-semibold text-lg 
                     bg-gradient-to-r from-blue-600 to-indigo-600 
                     text-white shadow-md hover:from-blue-700 hover:to-indigo-700 
                     transition transform hover:scale-105"
        >
          Save & Go to Weather
        </button>

      </div>
    </div>
  );
};

export default Preferences;
