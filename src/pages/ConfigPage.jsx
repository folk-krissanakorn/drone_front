import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ConfigPage() {
  const { id } = useParams();
  const [drone, setDrone] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/configs/${id}`)
      .then((res) => {
        setDrone(res.data);
        localStorage.setItem("droneConfig", JSON.stringify(res.data));
      })
      .catch((err) => setError(err.message));
  }, [id]);

  if (error)
    return (
      <div className="form-box">
        <h2>Error</h2>
        <p>❌ Cannot fetch drone config: {error}</p>
      </div>
    );

  if (!drone)
    return (
      <div className="form-box">
        <h2>Loading...</h2>
        <p>Please wait while fetching drone data.</p>
      </div>
    );

  return (
    <div className="form-box fade-in">
      <h2 className="gradient-text">Drone Configuration</h2>
      <div className="drone-info">
        <p>
          <b>ID:</b> {drone.drone_id}
        </p>
        <p>
          <b>Name:</b> {drone.drone_name}
        </p>
        <p>
          <b>Country:</b> {drone.country}
        </p>
        <p>
          <b>Light:</b> {drone.light}
        </p>
        <p>
          <b>Weight:</b> {drone.weight} kg
        </p>
      </div>
    </div>
  );
}
