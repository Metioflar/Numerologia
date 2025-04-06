import React from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import NumerologyForm from "@/components/numerology/NumerologyForm";
import NumerologyResults from "@/components/numerology/NumerologyResults";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [calculationDone, setCalculationDone] = React.useState(false);
  const [numerologyData, setNumerologyData] = React.useState<any>(null);

  const handleNumerologySubmit = (data: any) => {
    setNumerologyData(data);
    setCalculationDone(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      
      {/* Numerology Calculator Section */}
      <section id="calculadora" className="py-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 stars-bg opacity-20" aria-hidden="true"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-900 mb-8">
            Sua Pirâmide Numerológica Pessoal
          </h2>

          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
            <NumerologyForm onSubmit={handleNumerologySubmit} />
          </div>
        </div>
      </section>
      
      {/* Results Section */}
      {calculationDone && (
        <section id="results" className="py-12 bg-gradient-to-b from-white to-purple-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-900 mb-8">
              Sua Análise Numerológica Completa
            </h2>
            <NumerologyResults data={numerologyData} />
          </div>
        </section>
      )}
      
      {/* Explanation Section */}
      <section id="explicacao" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-3">
                Entenda a Pirâmide Numerológica
              </h2>
              <p className="text-gray-600">
                Como interpretar os símbolos e números da sua jornada numerológica
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-700 mb-4">
                Pirâmide Invertida na Numerologia
              </h3>
              
              <div className="space-y-6">
                <p className="text-gray-700">
                  A pirâmide invertida na numerologia é uma ferramenta que revela padrões numéricos em seu nome, 
                  oferecendo insights sobre sua personalidade e potenciais. Cada nível da pirâmide representa 
                  diferentes aspectos de seu ser.
                </p>
                
                <div className="bg-purple-100 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">Como Funciona</h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Cada letra do seu nome é convertida em um número (A=1, B=2, C=3, etc.)</li>
                    <li>Esses números formam a base da pirâmide</li>
                    <li>Os níveis superiores são criados somando dois números adjacentes do nível abaixo</li>
                    <li>O processo continua até chegar ao topo com um único número</li>
                  </ol>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-purple-100 rounded-lg p-4">
                    <h4 className="font-bold text-purple-900 mb-2">Números Pessoais</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li><span className="font-medium">1:</span> Liderança, independência</li>
                      <li><span className="font-medium">2:</span> Cooperação, sensibilidade</li>
                      <li><span className="font-medium">3:</span> Expressão, criatividade</li>
                      <li><span className="font-medium">4:</span> Estabilidade, organização</li>
                      <li><span className="font-medium">5:</span> Liberdade, adaptabilidade</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-100 rounded-lg p-4">
                    <h4 className="font-bold text-purple-900 mb-2">Números Pessoais</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li><span className="font-medium">6:</span> Responsabilidade, harmonia</li>
                      <li><span className="font-medium">7:</span> Análise, espiritualidade</li>
                      <li><span className="font-medium">8:</span> Poder, abundância</li>
                      <li><span className="font-medium">9:</span> Compaixão, conclusão</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                  <h4 className="font-bold text-red-800 mb-2">Sequências de Números</h4>
                  <p className="text-gray-700">
                    Quando três ou mais números iguais aparecem em sequência na pirâmide, 
                    isso indica padrões negativos ou desafios que você precisa superar. 
                    Cada número repetido tem um significado específico e revela áreas 
                    em sua vida que exigem atenção especial para alcançar maior equilíbrio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
