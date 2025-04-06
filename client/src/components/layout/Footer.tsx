import React from "react";
import { GithubIcon, InstagramIcon, TwitterIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-purple-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Astrologia</h3>
            <p className="text-purple-100 text-sm">
              Descubra os segredos do universo através da astrologia e numerologia.
              Conecte-se com os elementos cósmicos que influenciam sua vida.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-purple-100 text-sm">
              <li>
                <a href="#calculadora" className="hover:text-white transition-colors">
                  Calculadora Numerológica
                </a>
              </li>
              <li>
                <a href="#calculadora" className="hover:text-white transition-colors">
                  Mapa Astral
                </a>
              </li>
              <li>
                <a href="#explicacao" className="hover:text-white transition-colors">
                  Significados dos Números
                </a>
              </li>
              <li>
                <a href="#explicacao" className="hover:text-white transition-colors">
                  Sobre Astrologia
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-2 text-purple-100 text-sm">
              <li className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>contato@astrologia.com</span>
              </li>
              <li className="flex space-x-4 mt-4">
                <a href="#" className="text-purple-100 hover:text-white transition-colors">
                  <GithubIcon size={16} />
                </a>
                <a href="#" className="text-purple-100 hover:text-white transition-colors">
                  <InstagramIcon size={16} />
                </a>
                <a href="#" className="text-purple-100 hover:text-white transition-colors">
                  <TwitterIcon size={16} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-800 mt-8 pt-6 text-center text-purple-100 text-sm">
          <p>&copy; {new Date().getFullYear()} Astrologia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
