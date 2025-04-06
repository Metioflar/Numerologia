// Basic zodiac sign calculation based on birth date
export function calculateSunSign(birthDate: string): string {
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1; // JavaScript months are 0-based
  
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquário";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Peixes";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Áries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Touro";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gêmeos";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Câncer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leão";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgem";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Escorpião";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagitário";
  return "Capricórnio";
}

// Simplified moon sign calculation (without precise astronomical calculations)
export function calculateMoonSign(birthDate: string, birthTime: string): string {
  // This is a simplified placeholder, as actual moon sign calculation requires precise ephemeris data
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const [hours, minutes] = birthTime.split(':').map(Number);
  
  // Using a simplified algorithm for demonstration - not astronomically accurate
  const moonPhase = (day + month + hours) % 12;
  
  const moonSigns = [
    "Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", 
    "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"
  ];
  
  return moonSigns[moonPhase];
}

// Simplified ascendant calculation (without precise astronomical calculations)
export function calculateAscendant(birthDate: string, birthTime: string): string {
  // This is a simplified placeholder, as actual ascendant calculation requires location and precise time
  const date = new Date(birthDate);
  const [hours, minutes] = birthTime.split(':').map(Number);
  
  // Simple formula based on birth hour (not astronomically accurate)
  const ascendantIndex = (hours * 2) % 12;
  
  const signs = [
    "Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", 
    "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"
  ];
  
  return signs[ascendantIndex];
}

// Generate simplified planet positions for visualization
export function generatePlanetPositions(): Array<{name: string, sign: string, position: {x: number, y: number}}> {
  // In a real application, these would be calculated based on astronomical data
  return [
    { 
      name: "Sol", 
      sign: "Leão",
      position: { x: 0.75, y: 0.2 } 
    },
    { 
      name: "Lua", 
      sign: "Câncer",
      position: { x: 0.6, y: 0.7 } 
    },
    { 
      name: "Mercúrio", 
      sign: "Virgem",
      position: { x: 0.4, y: 0.35 } 
    },
    { 
      name: "Vênus", 
      sign: "Libra",
      position: { x: 0.2, y: 0.6 } 
    },
    { 
      name: "Marte", 
      sign: "Gêmeos",
      position: { x: 0.85, y: 0.55 } 
    },
    { 
      name: "Júpiter", 
      sign: "Touro",
      position: { x: 0.4, y: 0.85 } 
    }
  ];
}

// Get interpretation for sun sign
export function getSunSignInterpretation(sign: string): string {
  const interpretations: Record<string, string> = {
    "Áries": "você tem uma personalidade energética, corajosa e pioneira. Tende a ser direto, assertivo e gosta de iniciar novos projetos com entusiasmo.",
    "Touro": "você possui uma personalidade determinada, prática e sensual. Valoriza a estabilidade, conforto material e possui grande resistência.",
    "Gêmeos": "você tem uma mente ágil, curiosa e versátil. Comunica-se com facilidade, adapta-se rapidamente às mudanças e busca conhecimentos variados.",
    "Câncer": "você possui uma personalidade sensível, protetora e intuitiva. Valoriza a família, as raízes e tem uma forte conexão emocional com o passado.",
    "Leão": "você tem uma personalidade magnética e um forte desejo de expressar-se criativamente. É generoso, leal e naturalmente assume posições de liderança.",
    "Virgem": "você possui um senso de análise aguçado e busca aperfeiçoamento constante. É metódico, prático e atento aos detalhes em tudo que faz.",
    "Libra": "você valoriza a harmonia, equilíbrio e justiça. Tem grande senso estético, diplomacia natural e busca parcerias significativas.",
    "Escorpião": "você possui uma personalidade intensa, perceptiva e transformadora. Busca profundidade emocional e tem grande poder de regeneração.",
    "Sagitário": "você tem espírito aventureiro, otimista e filosófico. Busca expansão de horizontes, conhecimento e experiências que ampliem sua visão de mundo.",
    "Capricórnio": "você possui uma personalidade determinada, responsável e ambiciosa. Valoriza conquistas concretas e tem grande capacidade de organização.",
    "Aquário": "você tem uma mente inovadora, independente e humanitária. Valoriza a liberdade intelectual e frequentemente está à frente do seu tempo.",
    "Peixes": "você possui uma personalidade sensível, compassiva e intuitiva. Tem forte conexão com o plano espiritual e grande capacidade criativa."
  };
  
  return interpretations[sign] || "não foi possível determinar sua interpretação solar.";
}

// Get interpretation for moon sign
export function getMoonSignInterpretation(sign: string): string {
  const interpretations: Record<string, string> = {
    "Áries": "revela uma natureza emocional impulsiva e entusiástica, com necessidade de agir rapidamente conforme seus sentimentos.",
    "Touro": "mostra uma natureza emocional estável e sensual, com forte necessidade de segurança material e conforto.",
    "Gêmeos": "indica uma natureza emocional versátil e curiosa, com necessidade de comunicação e estímulo mental constante.",
    "Câncer": "revela uma natureza emocional profunda e intuitiva, com grande necessidade de segurança emocional e conexões familiares.",
    "Leão": "mostra uma natureza emocional calorosa e dramática, com necessidade de reconhecimento e expressão criativa.",
    "Virgem": "indica uma natureza emocional analítica e prática, com necessidade de ordem e utilidade em sua vida afetiva.",
    "Libra": "revela uma natureza emocional equilibrada e harmoniosa, com forte necessidade de relacionamentos e beleza.",
    "Escorpião": "mostra uma natureza emocional intensa e profunda, com necessidade de intimidade e transformação emocional.",
    "Sagitário": "indica uma natureza emocional otimista e expansiva, com necessidade de liberdade e crescimento.",
    "Capricórnio": "revela uma natureza emocional reservada e responsável, com necessidade de estrutura e realizações concretas.",
    "Aquário": "mostra uma natureza emocional independente e original, com necessidade de amizades e causas coletivas.",
    "Peixes": "indica uma natureza emocional sensível e compassiva, com necessidade de conexão espiritual e escape criativo."
  };
  
  return interpretations[sign] || "não foi possível determinar sua interpretação lunar.";
}

// Get interpretation for ascendant
export function getAscendantInterpretation(sign: string): string {
  const interpretations: Record<string, string> = {
    "Áries": "traz uma aparência energética e direta ao mundo exterior. Você tende a agir rapidamente e mostra-se como uma pessoa assertiva e pioneira.",
    "Touro": "traz uma aparência estável e confiável ao mundo exterior. Você tende a agir com determinação e mostra-se como uma pessoa prática e sensual.",
    "Gêmeos": "traz uma aparência comunicativa e adaptável ao mundo exterior. Você tende a expressar-se facilmente e mostra-se como uma pessoa versátil e curiosa.",
    "Câncer": "traz uma aparência sensível e protetora ao mundo exterior. Você tende a agir com cuidado e mostra-se como uma pessoa receptiva e acolhedora.",
    "Leão": "traz uma aparência marcante e confiante ao mundo exterior. Você tende a se apresentar com dignidade e mostra-se como uma pessoa carismática e criativa.",
    "Virgem": "traz uma aparência organizada e analítica ao mundo exterior. Você tende a agir com precisão e mostra-se como uma pessoa atenta aos detalhes e prestativa.",
    "Libra": "traz uma aparência elegante e diplomática ao mundo exterior. Você tende a agir com equilíbrio e mostra-se como uma pessoa harmoniosa e sociável.",
    "Escorpião": "traz uma aparência magnética e reservada ao mundo exterior. Você tende a agir com intensidade e mostra-se como uma pessoa perspicaz e profunda.",
    "Sagitário": "traz uma aparência otimista e expansiva ao mundo exterior. Você tende a agir com entusiasmo e mostra-se como uma pessoa aventureira e filosófica.",
    "Capricórnio": "traz uma aparência séria e responsável ao mundo exterior. Você tende a agir com disciplina e mostra-se como uma pessoa ambiciosa e competente.",
    "Aquário": "traz uma aparência original e independente ao mundo exterior. Você tende a agir de forma inovadora e mostra-se como uma pessoa progressista e intelectual.",
    "Peixes": "traz uma aparência receptiva e compassiva ao mundo exterior. Você tende a agir com sensibilidade e mostra-se como uma pessoa intuitiva e adaptável."
  };
  
  return interpretations[sign] || "não foi possível determinar sua interpretação ascendente.";
}

// Get full interpretation
export function getFullInterpretation(sunSign: string, moonSign: string, ascendantSign: string): string {
  return `Seu mapa astral revela uma personalidade complexa e multifacetada. Com Sol em ${sunSign}, você expressa sua essência através de ${getSunSignInterpretation(sunSign)} 
  
  Sua Lua em ${moonSign} ${getMoonSignInterpretation(moonSign)} Isto significa que internamente, sua natureza emocional busca satisfação através desses aspectos.
  
  Com Ascendente em ${ascendantSign}, você ${getAscendantInterpretation(ascendantSign)} Esta é a máscara que você usa quando conhece novas pessoas e como o mundo tende a vê-lo inicialmente.
  
  A interação entre esses três elementos principais do seu mapa cria uma dinâmica única que define sua jornada de vida. Os demais planetas em seu mapa adicionam camadas de complexidade e nuances a esta interpretação básica, influenciando áreas específicas como comunicação, relacionamentos, ação, expansão, limitações e transformações profundas.`;
}
