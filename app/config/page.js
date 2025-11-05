"use client";
import { useEffect, useState } from "react";
import { fetchConfig } from "../api/route";

export default function Config() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadConfig() {
      try {
        if (mounted) setLoading(true);
        const data = await fetchConfig();
        if (mounted) setConfig(data);
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message || "Failed to fetch");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadConfig();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading)
    return <p className="p-8 text-purple-200 text-center">Loading config...</p>;
  if (error)
    return (
      <p className="p-8 font-medium text-red-400 text-center">
        Error: {error}
      </p>
    );
  if (!config)
    return <p className="p-8 text-purple-200 text-center">No config found</p>;

  const { drone_id, drone_name, light, country } = config;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-[#18001f] to-[#2a004a] p-6">
      {/* 🟣 ลูกบอลตก */}
      <BallsAnimation />

      {/* 🟪 การ์ดโปร่งใสเงาเรืองแสง */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md border border-purple-500/40 shadow-[0_0_25px_5px_rgba(168,85,247,0.4)] rounded-2xl p-8 w-full max-w-md text-purple-100">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">
          Drone Configuration
        </h1>

        <div className="border border-purple-500/30 rounded-lg overflow-hidden shadow-inner">
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr className="border-b border-purple-500/20">
                <td className="p-3 font-semibold bg-purple-900/20 w-1/3 text-purple-300">
                  Drone ID
                </td>
                <td className="p-3 text-purple-100">{drone_id}</td>
              </tr>
              <tr className="border-b border-purple-500/20">
                <td className="p-3 font-semibold bg-purple-900/20 text-purple-300">
                  Drone Name
                </td>
                <td className="p-3 text-purple-100">{drone_name}</td>
              </tr>
              <tr className="border-b border-purple-500/20">
                <td className="p-3 font-semibold bg-purple-900/20 text-purple-300">
                  Light
                </td>
                <td className="p-3 text-purple-100">{light}</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold bg-purple-900/20 text-purple-300">
                  Country
                </td>
                <td className="p-3 text-purple-100">{country}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 🌌 เอฟเฟกต์ลูกบอลนีออนม่วงตกเบา ๆ
function BallsAnimation() {
  const [balls, setBalls] = useState([]);

  useEffect(() => {
    const newBalls = Array.from({ length: 12 }).map(() => ({
      left: Math.random() * 100,
      size: 8 + Math.random() * 30,
      duration: 6 + Math.random() * 5,
      delay: Math.random() * 4,
      opacity: 0.2 + Math.random() * 0.4,
    }));
    setBalls(newBalls);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {balls.map((ball, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-purple-500 blur-md animate-fall"
          style={{
            left: `${ball.left}%`,
            width: `${ball.size}px`,
            height: `${ball.size}px`,
            opacity: ball.opacity,
            animationDuration: `${ball.duration}s`,
            animationDelay: `${ball.delay}s`,
          }}
        ></div>
      ))}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-120px);
            opacity: 0.9;
          }
          100% {
            transform: translateY(110vh);
            opacity: 0;
          }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
