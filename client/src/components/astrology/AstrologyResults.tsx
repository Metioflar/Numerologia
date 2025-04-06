import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import BirthChart from "./BirthChart";

interface AstrologyResultsProps {
  data: {
    planets: Array<{
      name: string;
      sign: string;
      position: { x: number; y: number };
    }>;
    signs: {
      sun: string;
      moon: string;
      ascendant: string;
    };
    interpretations: {
      sun: string;
      moon: string;
      ascendant: string;
      fullInterpretation: string;
    };
  };
}

export default function AstrologyResults({ data }: AstrologyResultsProps) {
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-purple-700">
          Seu Mapa Astral
        </h3>
        <p className="text-gray-600">
          Uma representação dos céus no momento do seu nascimento
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Natal Chart Visual */}
        <div className="flex-shrink-0 flex justify-center">
          <BirthChart planets={data.planets} />
        </div>

        {/* Astrology Interpretation */}
        <div className="flex-grow space-y-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-bold text-purple-900 mb-2">Seus Signos Principais</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="inline-block w-20 font-medium text-purple-700">Sol:</span>
                <span>{data.signs.sun} - Representa sua essência e ego</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-20 font-medium text-purple-700">Lua:</span>
                <span>{data.signs.moon} - Representa suas emoções e intuição</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-20 font-medium text-purple-700">Ascendente:</span>
                <span>{data.signs.ascendant} - Como você se apresenta ao mundo</span>
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-bold text-purple-900 mb-2">Interpretação</h4>
            <p className="text-gray-700 mb-3">
              Com Sol em {data.signs.sun}, {data.interpretations.sun} 
              Sua Lua em {data.signs.moon} {data.interpretations.moon}
              O Ascendente em {data.signs.ascendant} {data.interpretations.ascendant}
            </p>

            {showFullAnalysis && (
              <div className="mt-4 text-gray-700">
                <p>{data.interpretations.fullInterpretation}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Button
          variant="ghost"
          className="text-primary hover:text-primary/90 font-medium flex items-center space-x-1 mx-auto"
          onClick={() => setShowFullAnalysis(!showFullAnalysis)}
        >
          <span>{showFullAnalysis ? "Ocultar análise completa" : "Ver análise completa dos planetas"}</span>
          {showFullAnalysis ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
