// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Leaf } from 'lucide-react';


// Import des composants Shadcn
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const HomePage = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-stone-900 py-20 md:py-32">
        <div className="absolute inset-0 opacity-20 bg-[url('/placeholder-farm.jpg')] bg-cover bg-center"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Élevage de qualité supérieure</h1>
          <p className="text-xl text-stone-200 max-w-2xl mx-auto mb-10">
            Bovins et ovins de races sélectionnées pour votre exploitation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline" size="lg" className="bg-stone-800 text-white border-stone-600 hover:bg-stone-700">
              <Link to="/animaux">
                Voir nos animaux
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-stone-800 text-white border-stone-600 hover:bg-stone-700">
                <Link to="/contact">
                Contactez-nous !
                </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* À propos */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Bienvenue chez M. Jones</h2>
          <p className="text-stone-600 max-w-3xl mx-auto">
            Depuis plus de 20 ans, notre élevage s'engage à fournir des animaux de qualité exceptionnelle pour les professionnels du secteur agricole.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-stone-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <Trophy className="h-6 w-6 text-stone-800" />
              </div>
              <CardTitle>Qualité supérieure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-stone-600">
                Nos animaux sont sélectionnés selon les critères les plus stricts pour garantir la meilleure génétique.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-stone-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <Leaf className="h-6 w-6 text-stone-800" />
              </div>
              <CardTitle>Élevage respectueux</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-stone-600">
                Notre démarche place le bien-être animal et le respect de l'environnement au cœur de nos pratiques.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-stone-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <ArrowRight className="h-6 w-6 text-stone-800" />
              </div>
              <CardTitle>Suivi personnalisé</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-stone-600">
                Nous accompagnons nos clients avec un service de conseil pour assurer leur réussite.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* Catégories d'animaux */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nos catégories d'animaux</h2>
          <p className="text-stone-600 max-w-3xl mx-auto">
            Découvrez notre sélection de bovins et ovins de races exceptionnelles, adaptés à tous types d'exploitations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="overflow-hidden">
            <div className="relative">
              <AspectRatio ratio={16/9}>
              <div className="absolute inset-0 bg-[url('/bovin.jpeg')] bg-cover bg-center" />
              </AspectRatio>
              <div className="absolute top-4 left-4">
                <span className="bg-stone-800 text-white text-xs px-2 py-1 rounded-md font-medium">
                  Bovins
                </span>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center">
                Bovins
              </CardTitle>
              <CardDescription>
                Races à viande et races laitières
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-stone-600">
                Notre sélection inclut des races à viande comme Angus, Texas Longhorn, 
                Hereford et des races laitières comme Holstein-Frisonne et Guernesey.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/animaux?type=Bovins">
                  Voir les bovins
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="relative">
              <AspectRatio ratio={16/9}>
              <div className="absolute inset-0 bg-[url('/ovin.jpeg')] bg-cover bg-center" />
              </AspectRatio>
              <div className="absolute top-4 left-4">
                <span className="bg-stone-800 text-white text-xs px-2 py-1 rounded-md font-medium">
                  Ovins
                </span>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center">
                Ovins
              </CardTitle>
              <CardDescription>
                Races à viande sélectionnées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-stone-600">
                Notre élevage propose des races à viande comme Suffolk et Texel, 
                connues pour leur excellente conformation et leur rendement.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/animaux?type=Ovins">
                  Voir les ovins
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4">
        <Card className="bg-stone-800 text-white border-none">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Intéressé par nos animaux ?</h3>
            <p className="mb-6 text-stone-300 max-w-2xl mx-auto">
              N'hésitez pas à nous contacter pour plus d'informations ou pour organiser une visite de notre élevage.
            </p>
            <Button asChild size="lg" variant="secondary">
              <a href="tel:0523531489">
                Contactez-nous
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default HomePage;