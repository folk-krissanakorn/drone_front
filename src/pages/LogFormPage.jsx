import { useState } from "react";
import axios from "axios";

export default function LogFormPage() {
  const [celsius, setCelsius] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const config = JSON.parse(localStorage.getItem("droneConfig") || "{}");

  // ✅ ใช้ API URL จาก .env
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        drone_id: config.drone_id,
        drone_name: config.drone_name,
        country: config.country,
        celsius: Number(celsius),
      };

      // ✅ ใช้ URL เต็มตรงนี้
      await axios.post(`${API_URL}/logs`, payload);

      setMessage("✅ Log saved successfully!");
      setCelsius("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save log.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2 className="gradient-text" style={{ textAlign: "center" }}>
          🌡️ Add Temperature Log
        </h2>

        <form onSubmit={handleSubmit} className="form-layout">
          <div className="input-group">
            <label htmlFor="temp">Temperature (°C)</label>
            <input
              id="temp"
              type="number"
              placeholder="Enter temperature..."
              value={celsius}
              onChange={(e) => setCelsius(e.target.value)}
              required
            />
          </div>

          <button className="gradient-button" type="submit" disabled={loading}>
            <span className="gradient-text">
              {loading ? "Submitting..." : "Submit Log"}
            </span>
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
