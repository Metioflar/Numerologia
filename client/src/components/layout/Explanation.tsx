import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

interface ExplanationProps {
  activeTab: "numerology" | "astrology";
  setActiveTab: (tab: "numerology" | "astrology") => void;
}

export default function Explanation({ activeTab, setActiveTab }: ExplanationProps) {
  return (
    <section id="explicacao" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-3">
              Entenda os Significados
            </h2>
            <p className="text-gray-600">
              Como interpretar os símbolos e números da sua jornada cósmica
            </p>
          </div>

          <Tabs 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as "numerology" | "astrology")}
          >
            <div className="flex justify-center mb-6">
              <TabsList className="bg-purple-100">
                <TabsTrigger 
                  value="numerology" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2 text-lg"
                >
                  Numerologia
                </TabsTrigger>
                <TabsTrigger 
                  value="astrology" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2 text-lg"
                >
                  Astrologia
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="numerology">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">
                    Pirâmide Invertida na Numerologia
                  </h3>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700">
                      A pirâmide invertida na numerologia é uma ferramenta que revela padrões numéricos em seu nome, 
                      oferecendo insights sobre sua personalidade e potenciais. Cada nível da pirâmide representa 
                      diferentes aspectos de seu ser.
                    </p>
                    
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-bold text-purple-900 mb-2">Como Funciona</h4>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>Cada letra do seu nome é convertida em um número (A=1, B=2, C=3, etc.)</li>
                        <li>Esses números formam a base da pirâmide</li>
                        <li>Os níveis superiores são criados somando dois números adjacentes do nível abaixo</li>
                        <li>O processo continua até chegar ao topo com um único número</li>
                      </ol>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-bold text-purple-900 mb-2">Números Pessoais</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li><span className="font-medium">1:</span> Liderança, independência</li>
                          <li><span className="font-medium">2:</span> Cooperação, sensibilidade</li>
                          <li><span className="font-medium">3:</span> Expressão, criatividade</li>
                          <li><span className="font-medium">4:</span> Estabilidade, organização</li>
                          <li><span className="font-medium">5:</span> Liberdade, adaptabilidade</li>
                        </ul>
                      </div>
                      
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-bold text-purple-900 mb-2">Números Pessoais</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li><span className="font-medium">6:</span> Responsabilidade, harmonia</li>
                          <li><span className="font-medium">7:</span> Análise, espiritualidade</li>
                          <li><span className="font-medium">8:</span> Poder, abundância</li>
                          <li><span className="font-medium">9:</span> Compaixão, conclusão</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="astrology">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-purple-700 mb-4">
                    Como Ler um Mapa Astral
                  </h3>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700">
                      O mapa astral é uma fotografia do céu no momento exato do seu nascimento. Ele revela a posição dos planetas, 
                      signos e casas astrológicas, fornecendo insights sobre sua personalidade, desafios e potenciais.
                    </p>
                    
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-bold text-purple-900 mb-2">Componentes Principais</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li><span className="font-medium">Signos do Zodíaco:</span> 12 signos que representam diferentes energias e características</li>
                        <li><span className="font-medium">Planetas:</span> Representam diferentes aspectos da personalidade e áreas da vida</li>
                        <li><span className="font-medium">Casas Astrológicas:</span> 12 setores que representam diferentes áreas da vida</li>
                        <li><span className="font-medium">Aspectos:</span> Ângulos entre planetas que mostram como essas energias interagem</li>
                      </ul>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-bold text-purple-900 mb-2">Os Três Pilares</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li><span className="font-medium">Sol:</span> Sua essência, ego e propósito de vida</li>
                          <li><span className="font-medium">Lua:</span> Suas emoções, instintos e necessidades emocionais</li>
                          <li><span className="font-medium">Ascendente:</span> Sua máscara social, como os outros o percebem</li>
                        </ul>
                      </div>
                      
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-bold text-purple-900 mb-2">Planetas Importantes</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li><span className="font-medium">Mercúrio:</span> Comunicação, mente</li>
                          <li><span className="font-medium">Vênus:</span> Amor, valores, estética</li>
                          <li><span className="font-medium">Marte:</span> Ação, desejo, energia</li>
                          <li><span className="font-medium">Júpiter:</span> Expansão, abundância</li>
                          <li><span className="font-medium">Saturno:</span> Limites, responsabilidade</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
