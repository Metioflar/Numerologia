import React from "react";
import { Link } from "wouter";

export default function Header() {
  return (
    <header className="w-full py-4 md:py-6 bg-gradient-to-r from-purple-900 to-indigo-800 bg-opacity-90 relative overflow-hidden">
      <div className="stars-bg absolute inset-0 opacity-30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              <span className="text-purple-100">Astro</span>
              <span className="text-purple-300">logia</span>
            </h1>
            <p className="text-white text-sm md:text-base">
              Descubra seu mapa astral e numerologia
            </p>
          </div>
          <nav>
            <ul className="flex space-x-4 md:space-x-6 text-white">
              <li className="hover:text-purple-200 transition-colors">
                <Link href="/#inicio">
                  <a className="font-medium">Início</a>
                </Link>
              </li>
              <li className="hover:text-purple-200 transition-colors">
                <Link href="/#calculadora">
                  <a className="font-medium">Calculadora</a>
                </Link>
              </li>
              <li className="hover:text-purple-200 transition-colors">
                <Link href="/#explicacao">
                  <a className="font-medium">Explicação</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
