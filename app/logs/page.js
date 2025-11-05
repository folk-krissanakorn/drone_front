"use client";
import { useEffect, useState } from "react";
import { fetchLogs } from "../api/route";

export default function LogsPage() {
  const [allLogs, setAllLogs] = useState([]);
  const [paginatedLogs, setPaginatedLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10);
  const [balls, setBalls] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function loadLogs() {
      try {
        if (mounted) setLoading(true);
        const data = await fetchLogs();
        const arr = Array.isArray(data) ? data : data.data || [];
        arr.sort((a, b) => new Date(b.created) - new Date(a.created));
        if (mounted) setAllLogs(arr);
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message || "Failed to load logs");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadLogs();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    setPaginatedLogs(allLogs.slice(indexOfFirstLog, indexOfLastLog));
  }, [allLogs, currentPage, logsPerPage]);

  const totalPages = Math.ceil(allLogs.length / logsPerPage);

  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));

  // 🌌 สร้างลูกบอลนีออนฟ้า
  useEffect(() => {
    const newBalls = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 15 + Math.random() * 35,
      delay: Math.random() * 5,
      duration: 7 + Math.random() * 6,
      opacity: 0.2 + Math.random() * 0.5,
    }));
    setBalls(newBalls);
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-blue-300">
        Loading logs...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-400">
        Error: {error}
      </div>
    );

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#001020] to-[#000814] text-blue-100 font-sans overflow-hidden p-6">
      {/* 💠 ลูกบอลนีออนสีฟ้าตกลงมา */}
      {balls.map((ball) => (
        <div
          key={ball.id}
          className="absolute rounded-full animate-fall"
          style={{
            left: `${ball.left}%`,
            width: `${ball.size}px`,
            height: `${ball.size}px`,
            background:
              "radial-gradient(circle, rgba(0,180,255,0.8), rgba(0,80,200,0.05))",
            boxShadow: "0 0 15px rgba(0,150,255,0.7)",
            animationDelay: `${ball.delay}s`,
            animationDuration: `${ball.duration}s`,
            opacity: ball.opacity,
          }}
        />
      ))}

      {/* 💎 การ์ดโปร่งแสง */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-blue-400/30 shadow-[0_0_25px_rgba(0,150,255,0.4)] rounded-2xl p-8 w-full max-w-5xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-400 drop-shadow-[0_0_12px_rgba(0,150,255,0.9)]">
          Drone Logs
        </h1>

        <div className="overflow-x-auto rounded-xl border border-blue-500/20">
          <table className="w-full border-collapse min-w-[600px]">
            <thead className="bg-blue-950/40 text-blue-300">
              <tr>
                {["Created", "Country", "Drone ID", "Drone Name", "Celsius"].map(
                  (head, i) => (
                    <th
                      key={i}
                      className="border-b border-blue-500/20 p-3 text-left text-sm font-semibold"
                    >
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/40">
              {paginatedLogs.map((r, i) => (
                <tr
                  key={i}
                  className="hover:bg-blue-950/30 transition duration-300"
                >
                  <td className="p-3 text-sm">
                    {new Date(r.created).toLocaleString()}
                  </td>
                  <td className="p-3 text-sm">{r.country}</td>
                  <td className="p-3 text-sm">{r.drone_id}</td>
                  <td className="p-3 text-sm">{r.drone_name}</td>
                  <td className="p-3 text-sm">{r.celsius}</td>
                </tr>
              ))}

              {allLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-blue-300">
                    No logs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {allLogs.length > logsPerPage && (
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-5 py-2 rounded-lg font-medium text-white bg-blue-600/80 hover:bg-blue-500/90 shadow-[0_0_12px_rgba(0,150,255,0.6)] transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-blue-200 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-5 py-2 rounded-lg font-medium text-white bg-blue-600/80 hover:bg-blue-500/90 shadow-[0_0_12px_rgba(0,150,255,0.6)] transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* ⚙️ Keyframes ลูกบอลตก */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10%);
            opacity: 0.8;
          }
          100% {
            transform: translateY(110vh);
            opacity: 0;
          }
        }
        .animate-fall {
          position: absolute;
          top: -50px;
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
