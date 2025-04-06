import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const astrologyFormSchema = z.object({
  birthDate: z.string().min(1, {
    message: "Por favor, selecione uma data de nascimento",
  }),
  birthTime: z.string().min(1, {
    message: "Por favor, informe o horário de nascimento",
  }),
  birthCity: z.string().min(2, {
    message: "Por favor, informe a cidade de nascimento",
  }),
  birthCountry: z.string().min(2, {
    message: "Por favor, informe o país de nascimento",
  }),
});

type AstrologyFormValues = z.infer<typeof astrologyFormSchema>;

interface AstrologyFormProps {
  onSubmit: (data: any) => void;
}

export default function AstrologyForm({ onSubmit }: AstrologyFormProps) {
  const form = useForm<AstrologyFormValues>({
    resolver: zodResolver(astrologyFormSchema),
    defaultValues: {
      birthDate: "",
      birthTime: "",
      birthCity: "",
      birthCountry: "",
    },
  });

  const handleSubmit = async (values: AstrologyFormValues) => {
    try {
      const response = await fetch("/api/astrology/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          birthDate: values.birthDate,
          birthTime: values.birthTime,
          birthCity: values.birthCity,
          birthCountry: values.birthCountry,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao calcular mapa astral");
      }

      const data = await response.json();
      onSubmit(data);
    } catch (error) {
      console.error("Erro ao calcular mapa astral:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-gray-700 font-medium">Data de nascimento</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthTime"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-gray-700 font-medium">Hora de nascimento</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="birthCity"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-gray-700 font-medium">Cidade de nascimento</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: São Paulo"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthCountry"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-gray-700 font-medium">País de nascimento</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Brasil"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-center">
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium shadow-md"
          >
            Gerar Mapa Astral
          </Button>
        </div>
      </form>
    </Form>
  );
}
