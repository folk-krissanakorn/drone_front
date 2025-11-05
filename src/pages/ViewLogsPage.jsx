import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewLogsPage() {
  const DRONE_ID = import.meta.env.VITE_DRONE_ID || "3001";
  const API_URL = import.meta.env.VITE_API_URL; // ✅ ใช้ URL จาก .env
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/logs/${DRONE_ID}?page=1&perPage=12`)
      .then((res) => setLogs(res.data.items || []))
      .catch((err) => {
        console.error(err);
        setError("❌ Failed to load logs.");
      });
  }, [API_URL, DRONE_ID]);

  return (
    <div className="container">
      <div className="form-box">
        <h2 className="gradient-text" style={{ textAlign: "center" }}>
          🌈 Drone Logs
        </h2>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <div className="table-container">
          <table className="logs-table">
            <thead>
              <tr>
                <th>Created</th>
                <th>Country</th>
                <th>Drone ID</th>
                <th>Drone Name</th>
                <th>Celsius</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((l, idx) => (
                  <tr key={idx}>
                    <td>{new Date(l.created).toLocaleString()}</td>
                    <td>{l.country}</td>
                    <td>{l.drone_id}</td>
                    <td>{l.drone_name}</td>
                    <td>{l.celsius}°C</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
