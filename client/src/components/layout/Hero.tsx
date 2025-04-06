import React from "react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToCalculator = () => {
    const calculatorElement = document.getElementById("calculadora");
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="py-16 md:py-24 bg-gradient-to-br from-purple-50 to-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 stars-bg opacity-30" aria-hidden="true"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-purple-900 mb-6 leading-tight">
            Descubra os segredos do universo sobre você
          </h2>
          <p className="text-base md:text-xl text-gray-700 mb-8 leading-relaxed">
            Sua jornada através dos mistérios da astrologia e numerologia começa aqui.
            Obtenha insights profundos sobre sua personalidade, destino e propósito de vida.
          </p>
          <div className="flex justify-center">
            <Button 
              onClick={scrollToCalculator}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-6 text-lg rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
            >
              Começar agora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
