import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NumerologyForm from "@/components/numerology/NumerologyForm";
import AstrologyForm from "@/components/astrology/AstrologyForm";

interface CalculatorProps {
  activeTab: "numerology" | "astrology";
  setActiveTab: (tab: "numerology" | "astrology") => void;
  onNumerologySubmit: (data: any) => void;
  onAstrologySubmit: (data: any) => void;
}

export default function Calculator({ 
  activeTab, 
  setActiveTab, 
  onNumerologySubmit, 
  onAstrologySubmit 
}: CalculatorProps) {
  return (
    <section id="calculadora" className="py-12 bg-white relative overflow-hidden">
      <div className="absolute inset-0 stars-bg opacity-20" aria-hidden="true"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-900 mb-8">
          Sua jornada cósmica pessoal
        </h2>

        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as "numerology" | "astrology")}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-8">
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
                Mapa Astral
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="numerology" className="bg-white rounded-lg shadow-md p-6 mb-8">
            <NumerologyForm onSubmit={onNumerologySubmit} />
          </TabsContent>

          <TabsContent value="astrology" className="bg-white rounded-lg shadow-md p-6 mb-8">
            <AstrologyForm onSubmit={onAstrologySubmit} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
