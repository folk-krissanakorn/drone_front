"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/config", label: "Config" },
  { href: "/submit", label: "Submit" },
  { href: "/logs", label: "Logs" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-black shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-white">
              Drone Portal
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              const linkClasses = `
                text-sm font-medium border-b-2 h-full inline-flex items-center
                ${
                  isActive
                    ? "border-blue-500 text-gray-300"
                    : "border-transparent text-white hover:border-gray-300 hover:text-gray-700"
                }
              `;

              return (
                <Link key={link.label} href={link.href} className={linkClasses}>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}