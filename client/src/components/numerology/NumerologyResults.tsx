import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import InvertedPyramid from "./InvertedPyramid";

interface NumerologyResultsProps {
  data: {
    fullName: string;
    pyramid: number[][];
    nameLetters: string[];
    destinyNumber: number;
    interpretations: {
      destinyNumber: string;
      pyramid: string;
      detailedNumbers: Array<{
        number: number;
        meaning: string;
      }>;
    };
  };
}

export default function NumerologyResults({ data }: NumerologyResultsProps) {
  const [showFullInterpretation, setShowFullInterpretation] = useState(false);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-10">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-purple-700">
          Pirâmide Numerológica de <span>{data.fullName}</span>
        </h3>
        <p className="text-gray-600">
          A pirâmide invertida revela os números que influenciam sua personalidade
        </p>
      </div>

      {/* Pyramid Visualization */}
      <div className="flex justify-center mb-8">
        <InvertedPyramid pyramid={data.pyramid} nameLetters={data.nameLetters} />
      </div>

      {/* Numerology Interpretation */}
      <div className="space-y-4 mb-6">
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-900 mb-2">Seu Número de Destino: {data.destinyNumber}</h4>
          <p className="text-gray-700">
            {data.interpretations.destinyNumber}
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-900 mb-2">Significado da Pirâmide</h4>
          <p className="text-gray-700 mb-3">
            {data.interpretations.pyramid}
          </p>
          
          {showFullInterpretation && (
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {data.interpretations.detailedNumbers.map((item, index) => (
                <li key={index}>
                  <span className="font-medium">Número {item.number}:</span> {item.meaning}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button
          variant="ghost"
          className="text-primary hover:text-primary/90 font-medium flex items-center space-x-1"
          onClick={() => setShowFullInterpretation(!showFullInterpretation)}
        >
          <span>{showFullInterpretation ? "Ocultar interpretação completa" : "Ver interpretação completa"}</span>
          {showFullInterpretation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
