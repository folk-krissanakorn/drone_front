"use client";
import { useEffect, useState } from "react";

const CogIcon = () => (
  <svg
    className="w-7 h-7 text-red-400 drop-shadow-[0_0_8px_rgba(255,80,80,0.8)]"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.34 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774a1.125 1.125 0 0 1 .12 1.45l-.527.737c-.25.35-.272.806-.108 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11v1.093c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.142.854.108 1.204l.527.738a1.125 1.125 0 0 1-.12 1.45l-.773.773a1.125 1.125 0 0 1-1.45.12l-.737-.527c-.35-.25-.806-.272-1.204-.108-.397.165-.71.505-.78.93l-.15.893c-.09.543-.56.94-1.11.94h-1.093c-.55 0-1.02-.397-1.11-.94l-.149-.893c-.07-.425-.383-.765-.78-.93-.398-.165-.854-.142-1.204.108l-.738.527a1.125 1.125 0 0 1-1.45-.12l-.773-.773a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.11v-1.093c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.764-.383.93-.78.165-.398.142-.854-.108-1.204l-.527-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.806.272 1.204.108.397-.165.71-.505.78-.93l.15-.893zM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
    />
  </svg>
);

const CloudArrowUpIcon = () => (
  <svg
    className="w-7 h-7 text-red-400 drop-shadow-[0_0_8px_rgba(255,50,50,0.8)]"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.33-2.13 3 3 0 0 1 .11-5.875M18.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.33-2.13 3 3 0 0 1 .11-5.875"
    />
  </svg>
);

const DocumentTextIcon = () => (
  <svg
    className="w-7 h-7 text-red-400 drop-shadow-[0_0_8px_rgba(255,70,70,0.8)]"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6"
    />
  </svg>
);

export default function HomePage() {
  const [balls, setBalls] = useState([]);

  useEffect(() => {
    const newBalls = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 20 + Math.random() * 40,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 5,
      opacity: 0.2 + Math.random() * 0.6,
    }));
    setBalls(newBalls);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black via-[#200000] to-black text-zinc-50 font-sans relative overflow-hidden">

      {/* ลูกบอลนีออนแดงโปร่งใสตกลงมา */}
      {balls.map((ball) => (
        <div
          key={ball.id}
          className="absolute rounded-full animate-fall"
          style={{
            left: `${ball.left}%`,
            width: `${ball.size}px`,
            height: `${ball.size}px`,
            background: "radial-gradient(circle, rgba(255,0,0,0.7), rgba(255,0,0,0.05))",
            boxShadow: "0 0 15px rgba(255,0,0,0.8)",
            animationDelay: `${ball.delay}s`,
            animationDuration: `${ball.duration}s`,
            opacity: ball.opacity,
          }}
        />
      ))}

      {/* แสงนีออนพื้นหลัง */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,0,0,0.15),_transparent_60%)] blur-2xl" />

      <main className="relative z-10 flex flex-col items-center w-full max-w-6xl p-8 md:p-16">
        <div className="text-center py-16 md:py-20">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-red-500 drop-shadow-[0_0_25px_rgba(255,50,50,0.9)]">
            Welcome to the Drone Portal
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-zinc-300">
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/config"
              className="rounded-lg bg-red-600/90 px-6 py-3 text-base font-semibold text-white shadow-[0_0_15px_rgba(255,0,0,0.7)] backdrop-blur-md hover:bg-red-500/90 transition-all duration-300 hover:scale-105"
            >
              View Configuration
            </a>
            <a
              href="/logs"
              className="rounded-lg bg-white/10 px-6 py-3 text-base font-semibold text-zinc-200 shadow-[0_0_10px_rgba(255,50,50,0.4)] ring-1 ring-red-500/20 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              Review Logs
            </a>
          </div>
        </div>

        <div className="py-16 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Manage Configuration",
                href: "/config",
                icon: <CogIcon />,
              },
              {
                title: "Submit Data",
                href: "/submit",
                icon: <CloudArrowUpIcon />,
              },
              {
                title: "Review History",
                href: "/logs",
                icon: <DocumentTextIcon />,
              },
            ].map((card, i) => (
              <div
                key={i}
                className="group relative text-center p-8 rounded-2xl border border-red-500/30 bg-red-950/10 backdrop-blur-xl shadow-[0_0_20px_rgba(255,0,0,0.2)] hover:shadow-[0_0_35px_rgba(255,50,50,0.6)] transition-all duration-500 hover:scale-105"
              >
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-red-500/20 text-red-400 mx-auto group-hover:bg-red-500/30 transition">
                  {card.icon}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-3 text-base text-zinc-300">{card.desc}</p>
                <a
                  href={card.href}
                  className="mt-5 inline-block text-red-400 hover:text-red-300 font-medium transition"
                >
                  Go &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10%);
            opacity: 0.8;
          }
          90% {
            opacity: 0.6;
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
