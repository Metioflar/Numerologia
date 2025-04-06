import React from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";

interface Planet {
  name: string;
  sign: string;
  position: {
    x: number;
    y: number;
  };
}

interface BirthChartProps {
  planets: Planet[];
}

export default function BirthChart({ planets }: BirthChartProps) {
  const chartSize = 280;
  const innerSize = chartSize * 0.7;
  const centerX = chartSize / 2;
  const centerY = chartSize / 2;

  return (
    <div className="relative">
      <svg
        width={chartSize}
        height={chartSize}
        viewBox={`0 0 ${chartSize} ${chartSize}`}
        className="bg-purple-50 rounded-full border-2 border-purple-300"
      >
        {/* Chart background */}
        <circle
          cx={centerX}
          cy={centerY}
          r={chartSize / 2 - 1}
          fill="transparent"
          stroke="#9F7AEA"
          strokeWidth="1"
        />

        {/* Inner circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={innerSize / 2}
          fill="transparent"
          stroke="#B794F4"
          strokeWidth="1"
        />

        {/* Dividing lines (houses) */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = centerX + (chartSize / 2 - 1) * Math.cos(angle);
          const y1 = centerY + (chartSize / 2 - 1) * Math.sin(angle);
          const x2 = centerX + (innerSize / 2) * Math.cos(angle);
          const y2 = centerY + (innerSize / 2) * Math.sin(angle);

          return (
            <line
              key={`house-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#B794F4"
              strokeWidth="0.5"
            />
          );
        })}
      </svg>

      {/* Planet elements */}
      {planets.map((planet, index) => {
        const position = calculatePosition(planet.position, centerX, centerY, chartSize);
        
        return (
          <motion.div
            key={`planet-${index}`}
            className="absolute py-1 px-2 bg-primary text-white text-xs font-bold rounded shadow-md"
            style={{
              left: position.x,
              top: position.y,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.2, zIndex: 10 }}
          >
            {planet.name} {getZodiacSymbol(planet.sign)}
          </motion.div>
        );
      })}
    </div>
  );
}

function calculatePosition(
  position: { x: number; y: number },
  centerX: number,
  centerY: number,
  chartSize: number
) {
  const radius = (chartSize * 0.35) * Math.sqrt(position.x * position.x + position.y * position.y);
  const angle = Math.atan2(position.y, position.x);
  
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);
  
  return { x, y };
}

function getZodiacSymbol(sign: string): string {
  const symbols: Record<string, string> = {
    'Áries': '♈',
    'Touro': '♉',
    'Gêmeos': '♊',
    'Câncer': '♋',
    'Leão': '♌',
    'Virgem': '♍',
    'Libra': '♎',
    'Escorpião': '♏',
    'Sagitário': '♐',
    'Capricórnio': '♑',
    'Aquário': '♒',
    'Peixes': '♓',
  };
  
  return symbols[sign] || sign;
}
