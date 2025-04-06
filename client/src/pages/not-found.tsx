import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-cosmic-50 to-gray-100">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center mb-4 gap-2">
            <AlertCircle className="h-12 w-12 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">404 - Página Não Encontrada</h1>
          </div>

          <p className="mt-4 mb-6 text-center text-gray-600">
            Parece que você se perdeu nas constelações. Vamos guiá-lo de volta?
          </p>
          
          <div className="flex justify-center">
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90">
                Voltar para o Início
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
