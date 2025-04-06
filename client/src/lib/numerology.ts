// Conversion tables from letters to numbers
const letterToNumber: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
  à: 1, á: 1, â: 1, ã: 1, ä: 1, å: 1,
  è: 5, é: 5, ê: 5, ë: 5,
  ì: 9, í: 9, î: 9, ï: 9,
  ò: 6, ó: 6, ô: 6, õ: 6, ö: 6,
  ù: 3, ú: 3, û: 3, ü: 3,
  ç: 3, ñ: 5
};

/**
 * Converts a name to its numerical representation
 */
export function nameToNumbers(name: string): number[] {
  const cleanName = name.toLowerCase()
    .normalize("NFD") // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/\s+/g, " ") // Standardize spaces
    .trim();
  
  return cleanName.split("")
    .filter(char => char !== " ")
    .map(char => letterToNumber[char] || 0);
}

/**
 * Builds a pyramid from the base numbers
 */
export function buildPyramid(baseNumbers: number[]): number[][] {
  const pyramid: number[][] = [baseNumbers];
  let currentRow = baseNumbers;

  while (currentRow.length > 1) {
    const newRow: number[] = [];
    
    for (let i = 0; i < currentRow.length - 1; i++) {
      // Add adjacent numbers and reduce to a single digit
      let sum = currentRow[i] + currentRow[i + 1];
      while (sum > 9) {
        sum = reduceToSingleDigit(sum);
      }
      newRow.push(sum);
    }
    
    pyramid.unshift(newRow);
    currentRow = newRow;
  }
  
  return pyramid;
}

/**
 * Calculates the destiny number from a birth date
 */
export function calculateDestinyNumber(birthDate: string): number {
  const dateParts = birthDate.split("-");
  if (dateParts.length !== 3) {
    throw new Error("Invalid birth date format. Expected YYYY-MM-DD");
  }
  
  const day = parseInt(dateParts[2]);
  const month = parseInt(dateParts[1]);
  const year = parseInt(dateParts[0]);
  
  const sum = day + month + year;
  return reduceToSingleDigit(sum);
}

/**
 * Reduces a number to a single digit by adding its digits
 */
export function reduceToSingleDigit(num: number): number {
  if (num < 10) return num;
  
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  
  if (sum >= 10) {
    return reduceToSingleDigit(sum);
  }
  
  return sum;
}

/**
 * Get the meaning of a destiny number
 */
export function getDestinyNumberMeaning(num: number): string {
  const meanings = {
    1: "O número 1 indica liderança, independência e originalidade. Você tem forte determinação e capacidade de iniciar projetos. Possui uma personalidade assertiva e tende a seguir seu próprio caminho.",
    2: "O número 2 revela cooperação, diplomacia e sensibilidade. Você tem grande capacidade para parcerias e trabalho em equipe. É paciente, detalhista e possui intuição aguçada para entender os outros.",
    3: "O número 3 simboliza expressão, criatividade e comunicação. Você tem facilidade para se expressar e influenciar pessoas. Sua natureza é otimista e você tende a encontrar soluções criativas para problemas.",
    4: "O número 4 representa estabilidade, organização e disciplina. Você valoriza a segurança e constrói bases sólidas para seus projetos. É trabalhador, responsável e persistente em seus objetivos.",
    5: "O número 5 indica liberdade, adaptabilidade e mudança. Você busca experiências variadas e não gosta de limitações. Possui grande versatilidade e capacidade de se ajustar a novas situações.",
    6: "O número 6 simboliza responsabilidade, harmonia e serviço. Você tem forte senso de dever com família e comunidade. É amoroso, protetor e busca criar equilíbrio em todos os aspectos da vida.",
    7: "O número 7 revela análise, sabedoria e espiritualidade. Você tem uma mente questionadora e busca conhecimento profundo. Sua natureza reflexiva o leva a buscar significados mais profundos na vida.",
    8: "O número 8 representa poder, abundância e autoridade. Você tem grande capacidade para realizações materiais e liderança. É ambicioso, pragmático e possui excelentes habilidades organizacionais.",
    9: "O número 9 indica compaixão, idealismo e conclusões. Você tem forte desejo de contribuir para um mundo melhor. É altruísta, criativo e capaz de inspirar os outros com sua visão humanitária."
  };
  
  return meanings[num as keyof typeof meanings] || "Número desconhecido";
}

/**
 * Get the meaning of a pyramid structure
 */
export function getPyramidMeaning(): string {
  return "A base da pirâmide (seu nome) representa sua essência. As camadas superiores revelam qualidades que você desenvolve ao longo da vida, culminando no número do topo que simboliza sua realização. Cada número na pirâmide revela aspectos diferentes de sua personalidade e destino.";
}

/**
 * Get detailed meanings for each number
 */
export function getDetailedNumberMeanings(): Array<{ number: number; meaning: string }> {
  return [
    { number: 1, meaning: "Liderança, independência, originalidade, coragem e determinação." },
    { number: 2, meaning: "Cooperação, diplomacia, paciência, sensibilidade e intuição." },
    { number: 3, meaning: "Expressão, comunicação, criatividade, otimismo e sociabilidade." },
    { number: 4, meaning: "Estabilidade, organização, trabalho árduo, praticidade e confiabilidade." },
    { number: 5, meaning: "Liberdade, mudança, adaptabilidade, curiosidade e aventura." },
    { number: 6, meaning: "Responsabilidade, harmonia, amor, família e equilíbrio." },
    { number: 7, meaning: "Análise, introspecção, sabedoria, espiritualidade e perfeccionismo." },
    { number: 8, meaning: "Poder, abundância, autoridade, sucesso material e organização." },
    { number: 9, meaning: "Compaixão, humanitarismo, idealismo, generosidade e conclusão." }
  ];
}

/**
 * Get negative interpretations for consecutive numbers
 */
export function getConsecutiveNumbersMeaning(num: number): string {
  const consecutiveMeanings: Record<number, string> = {
    1: "Excesso de individualismo e egoísmo. Tendência ao isolamento e dificuldade em trabalhar em equipe. Possível arrogância e teimosia excessiva.",
    2: "Dependência emocional e indecisão crônica. Medo excessivo de conflitos e tendência a evitar confrontos necessários. Possível manipulação passiva.",
    3: "Superficialidade e dispersão de energia. Tendência a falar demais sem profundidade. Possível exibicionismo e dificuldade em completar projetos.",
    4: "Rigidez e resistência extrema a mudanças. Tendência ao perfeccionismo paralisante e crítica excessiva. Possível estagnação e medo de arriscar.",
    5: "Impulsividade descontrolada e busca constante por estímulos. Tendência a compromissos superficiais e instabilidade. Possível comportamento viciante.",
    6: "Controle excessivo sobre os outros e perfeccionismo. Tendência ao auto-sacrifício prejudicial e codependência. Possível manipulação emocional.",
    7: "Isolamento social excessivo e desconexão da realidade. Tendência ao ceticismo extremo e análise paralisante. Possível paranoia e desconfiança.",
    8: "Materialismo obsessivo e busca desenfreada por poder. Tendência à exploração dos outros e workaholic. Possível corrupção ética e moral.",
    9: "Idealismo desconectado da realidade e martírio. Tendência a fugir de responsabilidades pessoais em nome de causas maiores. Possível sensação de superioridade moral."
  };
  
  return consecutiveMeanings[num] || "Padrão repetitivo que indica um desequilíbrio a ser resolvido.";
}

/**
 * Finds all consecutive numbers in a pyramid
 */
export function findConsecutiveNumbersPatterns(pyramid: number[][]): Array<{number: number, count: number}> {
  const patterns: Array<{number: number, count: number}> = [];
  const counted = new Set<string>(); // Para evitar contar o mesmo padrão duas vezes
  
  // Examina cada linha da pirâmide
  pyramid.forEach((row, rowIndex) => {
    let currentNum = 0;
    let count = 0;
    
    // Procura sequências na linha
    for (let i = 0; i < row.length; i++) {
      if (count === 0) {
        currentNum = row[i];
        count = 1;
      } else if (row[i] === currentNum) {
        count++;
      } else {
        if (count >= 3) {
          const key = `${rowIndex}-${i-count}-${currentNum}-${count}`;
          if (!counted.has(key)) {
            patterns.push({ number: currentNum, count });
            counted.add(key);
          }
        }
        currentNum = row[i];
        count = 1;
      }
    }
    
    // Verifica o último conjunto de números
    if (count >= 3) {
      const key = `${rowIndex}-${row.length-count}-${currentNum}-${count}`;
      if (!counted.has(key)) {
        patterns.push({ number: currentNum, count });
        counted.add(key);
      }
    }
  });
  
  return patterns;
}
