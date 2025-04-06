import { 
  users, 
  type User, 
  type InsertUser, 
  type CalculateNumerology, 
  type CalculateAstrology, 
  type NumerologyResult, 
  type AstrologyResult 
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  calculateNumerology(data: CalculateNumerology): Promise<NumerologyResult>;
  calculateAstrology(data: CalculateAstrology): Promise<AstrologyResult>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async calculateNumerology(data: CalculateNumerology): Promise<NumerologyResult> {
    const { fullName, birthDate } = data;
    
    // Convert name to numbers
    const nameLetters = fullName.toLowerCase().replace(/\s+/g, "").split("");
    
    // Generate random base numbers (simplified for demo)
    const baseNumbers = nameLetters.map(letter => {
      const charCode = letter.charCodeAt(0) - 96;
      return charCode > 0 && charCode <= 26 ? (charCode % 9 || 9) : 0;
    });
    
    // Build pyramid (simplified)
    const pyramid: number[][] = [];
    pyramid.push(baseNumbers);
    
    let currentRow = [...baseNumbers];
    while (currentRow.length > 1) {
      const newRow: number[] = [];
      for (let i = 0; i < currentRow.length - 1; i++) {
        let sum = (currentRow[i] + currentRow[i + 1]) % 9;
        if (sum === 0) sum = 9;
        newRow.push(sum);
      }
      pyramid.unshift(newRow);
      currentRow = newRow;
    }
    
    // Calculate destiny number
    const dateParts = birthDate.split("-");
    const day = parseInt(dateParts[2]);
    const month = parseInt(dateParts[1]);
    const year = parseInt(dateParts[0]);
    
    let destinyNumber = day + month + year;
    while (destinyNumber > 9) {
      destinyNumber = destinyNumber.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    
    // Get interpretations
    const destinyInterpretations: Record<number, string> = {
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
    
    const detailedNumbers = [
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
    
    return {
      fullName,
      pyramid,
      nameLetters,
      destinyNumber,
      interpretations: {
        destinyNumber: destinyInterpretations[destinyNumber as keyof typeof destinyInterpretations] || "Número desconhecido",
        pyramid: "A base da pirâmide (seu nome) representa sua essência. As camadas superiores revelam qualidades que você desenvolve ao longo da vida, culminando no número do topo que simboliza sua realização. Cada número na pirâmide revela aspectos diferentes de sua personalidade e destino.",
        detailedNumbers
      }
    };
  }

  async calculateAstrology(data: CalculateAstrology): Promise<AstrologyResult> {
    const { birthDate, birthTime, birthCity, birthCountry } = data;
    
    // Determine sun sign based on birth date
    const date = new Date(birthDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    
    // Simple sun sign determination
    let sunSign = "";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) sunSign = "Aquário";
    else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) sunSign = "Peixes";
    else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) sunSign = "Áries";
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) sunSign = "Touro";
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) sunSign = "Gêmeos";
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) sunSign = "Câncer";
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) sunSign = "Leão";
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) sunSign = "Virgem";
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) sunSign = "Libra";
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) sunSign = "Escorpião";
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) sunSign = "Sagitário";
    else sunSign = "Capricórnio";
    
    // Simple moon sign determination (not astronomically accurate)
    const [hours, minutes] = birthTime.split(':').map(Number);
    const moonPhase = (day + month + hours) % 12;
    const moonSigns = [
      "Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", 
      "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"
    ];
    const moonSign = moonSigns[moonPhase];
    
    // Simple ascendant determination (not astronomically accurate)
    const ascendantIndex = (hours * 2) % 12;
    const ascendantSign = moonSigns[ascendantIndex];
    
    // Generate planet positions for visualization
    const planets = [
      { 
        name: "Sol", 
        sign: sunSign,
        position: { x: 0.75, y: 0.2 } 
      },
      { 
        name: "Lua", 
        sign: moonSign,
        position: { x: 0.6, y: 0.7 } 
      },
      { 
        name: "Mercúrio", 
        sign: moonSigns[(moonPhase + 1) % 12],
        position: { x: 0.4, y: 0.35 } 
      },
      { 
        name: "Vênus", 
        sign: moonSigns[(moonPhase + 2) % 12],
        position: { x: 0.2, y: 0.6 } 
      },
      { 
        name: "Marte", 
        sign: moonSigns[(moonPhase + 3) % 12],
        position: { x: 0.85, y: 0.55 } 
      },
      { 
        name: "Júpiter", 
        sign: moonSigns[(moonPhase + 4) % 12],
        position: { x: 0.4, y: 0.85 } 
      }
    ];
    
    // Interpretations
    const sunInterpretations: Record<string, string> = {
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
    
    const moonInterpretations: Record<string, string> = {
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
    
    const ascendantInterpretations: Record<string, string> = {
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
    
    const fullInterpretation = `Seu mapa astral revela uma personalidade complexa e multifacetada. Com Sol em ${sunSign}, ${sunInterpretations[sunSign]} 
    
    Sua Lua em ${moonSign} ${moonInterpretations[moonSign]} Isto significa que internamente, sua natureza emocional busca satisfação através desses aspectos.
    
    Com Ascendente em ${ascendantSign}, você ${ascendantInterpretations[ascendantSign]} Esta é a máscara que você usa quando conhece novas pessoas e como o mundo tende a vê-lo inicialmente.
    
    A interação entre esses três elementos principais do seu mapa cria uma dinâmica única que define sua jornada de vida. Os demais planetas em seu mapa adicionam camadas de complexidade e nuances a esta interpretação básica, influenciando áreas específicas como comunicação, relacionamentos, ação, expansão, limitações e transformações profundas.`;
    
    return {
      planets,
      signs: {
        sun: sunSign,
        moon: moonSign,
        ascendant: ascendantSign
      },
      interpretations: {
        sun: sunInterpretations[sunSign],
        moon: moonInterpretations[moonSign],
        ascendant: ascendantInterpretations[ascendantSign],
        fullInterpretation
      }
    };
  }
}

export const storage = new MemStorage();
