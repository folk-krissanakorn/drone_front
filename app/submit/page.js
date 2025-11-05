"use client";
import { useEffect, useState } from "react";
import { fetchConfig, postLog } from "../api/route";

export default function SubmitPage() {
  const [config, setConfig] = useState(null);
  const [celsius, setCelsius] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // ดึง config ตอนเริ่มต้น
  useEffect(() => {
    let mounted = true;
    fetchConfig()
      .then((data) => mounted && setConfig(data))
      .catch((e) => console.error(e));
    return () => (mounted = false);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    if (!config) return setStatus("Missing config");
    if (!celsius) return setStatus("Enter celsius");

    const payload = {
      drone_id: config.drone_id,
      drone_name: config.drone_name,
      country: config.country,
      celsius: Number(celsius),
    };

    try {
      setLoading(true);
      await postLog(payload);
      setStatus("Submitted successfully");
      setCelsius("");
    } catch (err) {
      console.error(err);
      setStatus("Failed to submit");
    } finally {
      setLoading(false);
    }
  }

  const statusColor = status?.startsWith("Submitted")
    ? "text-green-400"
    : "text-red-500";

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-black to-green-950 text-green-200 font-sans">
      {/* การ์ดหลัก */}
      <div className="relative backdrop-blur-md bg-green-900/20 p-6 rounded-2xl shadow-[0_0_25px_3px_rgba(0,255,100,0.3)] w-full max-w-md border border-green-800/40">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-300 drop-shadow-[0_0_8px_#00ff80]">
          Submit Temperature Log
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="block text-sm font-medium text-green-200">
            Temperature (°C)
            <input
              type="number"
              step="0.1"
              value={celsius}
              onChange={(e) => setCelsius(e.target.value)}
              className="mt-1 block w-full rounded-md border border-green-700 bg-green-950/40 text-green-200 p-2 
                         focus:border-green-400 focus:ring-2 focus:ring-green-500 outline-none transition"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="py-2 px-3 rounded-md text-sm font-semibold text-black 
                       bg-green-400 hover:bg-green-500 
                       focus:outline-none focus:ring-2 focus:ring-green-300 
                       disabled:bg-green-800 disabled:text-green-400 disabled:cursor-not-allowed
                       transition duration-200 shadow-[0_0_10px_#00ff80]"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {status && (
          <p className={`mt-4 font-medium text-center ${statusColor}`}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
