import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const numerologyFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres",
  }),
  birthDate: z.string().min(1, {
    message: "Por favor, selecione uma data de nascimento",
  }),
});

type NumerologyFormValues = z.infer<typeof numerologyFormSchema>;

interface NumerologyFormProps {
  onSubmit: (data: any) => void;
}

export default function NumerologyForm({ onSubmit }: NumerologyFormProps) {
  const form = useForm<NumerologyFormValues>({
    resolver: zodResolver(numerologyFormSchema),
    defaultValues: {
      fullName: "",
      birthDate: "",
    },
  });

  const handleSubmit = async (values: NumerologyFormValues) => {
    try {
      const response = await fetch("/api/numerology/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: values.fullName,
          birthDate: values.birthDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao calcular numerologia");
      }

      const data = await response.json();
      onSubmit(data);
    } catch (error) {
      console.error("Erro ao calcular numerologia:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-gray-700 font-medium">Nome completo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu nome completo"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    {...field}
                  />
                </FormControl>
                <p className="text-sm text-gray-500">
                  Para calcular sua pirâmide numerológica
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

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
                <p className="text-sm text-gray-500">
                  Para calcular seu número de destino
                </p>
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
            Calcular Pirâmide Numerológica
          </Button>
        </div>
      </form>
    </Form>
  );
}
