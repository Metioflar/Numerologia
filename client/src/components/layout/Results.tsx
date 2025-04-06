import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NumerologyResults from "@/components/numerology/NumerologyResults";
import AstrologyResults from "@/components/astrology/AstrologyResults";

interface ResultsProps {
  activeTab: "numerology" | "astrology";
  numerologyData: any;
  astrologyData: any;
}

export default function Results({ activeTab, numerologyData, astrologyData }: ResultsProps) {
  return (
    <section id="results" className="py-12 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-900 mb-8">
          Seus Resultados Cósmicos
        </h2>

        <Tabs 
          value={activeTab} 
          className="max-w-4xl mx-auto"
          defaultValue={activeTab}
        >
          <div className="hidden">
            <TabsList>
              <TabsTrigger value="numerology">Numerologia</TabsTrigger>
              <TabsTrigger value="astrology">Mapa Astral</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="numerology">
            {numerologyData && <NumerologyResults data={numerologyData} />}
          </TabsContent>

          <TabsContent value="astrology">
            {astrologyData && <AstrologyResults data={astrologyData} />}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
