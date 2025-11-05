import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewLogsPage() {
  const DRONE_ID = import.meta.env.VITE_DRONE_ID || "3001";
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios
      .get(`/logs/${DRONE_ID}?page=1&perPage=12`)
      .then((res) => setLogs(res.data.items || []))
      .catch(() => {});
  }, []);

  return (
    <div className="container">
      <div className="form-box">
        <h2 className="gradient-text" style={{ textAlign: "center" }}>
          🌈 Drone Logs
        </h2>
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
                    <td>{l.created}</td>
                    <td>{l.country}</td>
                    <td>{l.drone_id}</td>
                    <td>{l.drone_name}</td>
                    <td>{l.celsius}</td>
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
