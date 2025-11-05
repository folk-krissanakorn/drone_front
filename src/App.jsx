import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import ConfigPage from "./pages/ConfigPage";
import LogFormPage from "./pages/LogFormPage";
import ViewLogsPage from "./pages/ViewLogsPage";
import "./index.css";

export default function App() {
  // 🎈 ลูกบอลนีออนตกลงมาช้า ๆ
  useEffect(() => {
    const colors = ["#ff004c", "#00b4ff", "#ffe600", "#00ff88", "#ff00ff"];
    const createBall = () => {
      const ball = document.createElement("div");
      ball.classList.add("ball");
      const size = Math.random() * 40 + 20; // 20–60px
      ball.style.width = `${size}px`;
      ball.style.height = `${size}px`;
      ball.style.left = `${Math.random() * 100}vw`;
      ball.style.background = colors[Math.floor(Math.random() * colors.length)];
      ball.style.opacity = 0.5 + Math.random() * 0.4;
      ball.style.animationDuration = `${6 + Math.random() * 6}s`; // 6–12s
      ball.style.filter = `blur(${Math.random() * 3 + 1}px)`;
      document.body.appendChild(ball);
      setTimeout(() => ball.remove(), 13000);
    };
    const interval = setInterval(createBall, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>
      <header className="navbar">
        <nav className="neon-buttons">
          <Link to="/configs/3001" className="neon-button delay1">
            Config
          </Link>
          <Link to="/form" className="neon-button delay2">
            Add Log
          </Link>
          <Link to="/logs" className="neon-button delay3">
            View Logs
          </Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/configs/3001" />} />
          <Route path="/configs/:id" element={<ConfigPage />} />
          <Route path="/form" element={<LogFormPage />} />
          <Route path="/logs" element={<ViewLogsPage />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
