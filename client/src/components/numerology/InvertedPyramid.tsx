import React from "react";
import { motion } from "framer-motion";
import { findConsecutiveNumbersPatterns, getConsecutiveNumbersMeaning } from "@/lib/numerology";

interface InvertedPyramidProps {
  pyramid: number[][];
  nameLetters: string[];
}

export default function InvertedPyramid({ pyramid, nameLetters }: InvertedPyramidProps) {
  // Função para verificar se um número é parte de uma sequência (3 ou mais iguais)
  const isPartOfSequence = (row: number[], cellIndex: number): boolean => {
    if (cellIndex < 0 || cellIndex >= row.length) return false;
    
    const currentNum = row[cellIndex];
    let count = 1;
    
    // Contar para a esquerda
    let i = cellIndex - 1;
    while (i >= 0 && row[i] === currentNum) {
      count++;
      i--;
    }
    
    // Contar para a direita
    i = cellIndex + 1;
    while (i < row.length && row[i] === currentNum) {
      count++;
      i++;
    }
    
    return count >= 3;
  };

  // Calcula os intervalos de idade baseados no tamanho do nome
  const calculateAgeIntervals = () => {
    const totalLetters = nameLetters.length;
    const intervalSize = totalLetters / 9; // Divide o nome em 9 partes iguais
    
    // Cria um array de intervalos com o índice de início de cada faixa etária
    const intervals = Array.from({ length: 9 }, (_, i) => {
      const startIndex = Math.floor(i * intervalSize);
      return {
        startIndex,
        age: (i + 1) * 9 // Idade correspondente (9, 18, 27, etc.)
      };
    });
    
    return intervals;
  };
  
  const ageIntervals = calculateAgeIntervals();

  // Encontra padrões de números consecutivos
  const consecutivePatterns = findConsecutiveNumbersPatterns(pyramid);

  // Invertendo a ordem para mostrar o nome no topo e pirâmide invertida (base maior em cima)
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="pyramid-container space-y-2">
        {/* Age Intervals Row */}
        <motion.div 
          className="flex justify-center space-x-2 py-2 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {nameLetters.map((_, index) => {
            // Encontra o intervalo de idade correspondente a esta posição
            const interval = ageIntervals.find(
              (int, i) => 
                index >= int.startIndex && 
                (i === ageIntervals.length - 1 || index < ageIntervals[i + 1].startIndex)
            );
            
            // Mostra a idade apenas no primeiro caractere de cada intervalo
            const showAge = interval && interval.startIndex === index;
            
            return (
              <motion.div
                key={`age-${index}`}
                className="w-10 h-6 flex items-center justify-center"
              >
                {showAge && (
                  <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded-full">
                    {interval.age}
                  </span>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Name Letters Row */}
        <motion.div 
          className="flex justify-center space-x-2 py-2 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {nameLetters.map((letter, index) => {
            // Encontra o intervalo de idade correspondente a esta posição
            const interval = ageIntervals.find(
              (int, i) => 
                index >= int.startIndex && 
                (i === ageIntervals.length - 1 || index < ageIntervals[i + 1].startIndex)
            );
            
            // Bordas coloridas diferentes para cada intervalo de idade
            const borderColors = [
              "border-red-400", "border-orange-400", "border-yellow-400", 
              "border-green-400", "border-teal-400", "border-blue-400", 
              "border-indigo-400", "border-purple-400", "border-pink-400"
            ];
            
            const borderColor = interval ? borderColors[ageIntervals.indexOf(interval) % borderColors.length] : "";
            
            return (
              <motion.div
                key={`letter-${index}`}
                className={`w-10 h-10 flex items-center justify-center rounded-md 
                  bg-purple-50 hover:bg-purple-300 transition-all duration-300 
                  border-2 ${borderColor}`}
                whileHover={{ scale: 1.1 }}
              >
                {letter}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Pyramid Rows - Agora realmente invertida (da base maior para o topo) */}
        {pyramid.slice().reverse().map((row, rowIndex) => (
          <motion.div 
            key={`row-${rowIndex}`} 
            className="flex justify-center space-x-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: rowIndex * 0.1, duration: 0.3 }}
          >
            {row.map((cell, cellIndex) => {
              const isSequence = isPartOfSequence(row, cellIndex);
              return (
                <motion.div
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-md 
                    ${rowIndex === pyramid.length - 1 ? "bg-purple-200 font-medium" : "bg-purple-100"} 
                    ${isSequence ? "bg-gradient-to-r from-yellow-300 to-yellow-400 text-purple-900 font-bold border-2 border-purple-500" : ""}
                    hover:bg-purple-300 transition-all duration-300`}
                  whileHover={{ scale: 1.1 }}
                >
                  {cell}
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </div>

      {/* Análise dos Números Consecutivos */}
      {consecutivePatterns.length > 0 && (
        <motion.div 
          className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md max-w-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-lg font-bold text-red-800 mb-2">
            Alerta: Padrões Negativos Detectados
          </h3>
          <p className="text-gray-700 mb-3 text-sm">
            Números consecutivos na numerologia indicam desafios e padrões negativos que precisam ser trabalhados em sua vida:
          </p>
          <ul className="space-y-3">
            {consecutivePatterns.map((pattern, index) => (
              <li key={index} className="bg-white p-3 rounded-md shadow-sm border border-red-200">
                <div className="font-bold text-red-700 flex items-center mb-1">
                  <span className="bg-red-100 text-red-800 rounded-full w-7 h-7 flex items-center justify-center mr-2">{pattern.number}</span>
                  <span>Sequência de {pattern.count} repetições</span>
                </div>
                <p className="text-sm text-gray-600">
                  {getConsecutiveNumbersMeaning(pattern.number)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-3 text-xs text-gray-500">
            Trabalhe estes aspectos para desenvolver melhor equilíbrio numerológico em sua vida.
          </div>
        </motion.div>
      )}
    </div>
  );
}
