// src/pages/AnimalListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';

// Import des composants Shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Import des services d'API
import AnimalApi from '../services/AnimalApi';
import TypeAnimalApi from '../services/TypeAnimalApi';
import RaceApi from '../services/RaceApi';

const AnimalListPage = () => {
  // États pour gérer les données et les filtres
  const [animals, setAnimals] = useState([]);
  const [types, setTypes] = useState([]);
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    race: 'all',
    minPrice: '',
    maxPrice: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');
  const [searchParams] = useSearchParams();

  // Chargement des données depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Charger les données en parallèle
        const [animalsResponse, typesResponse, racesResponse] = await Promise.all([
          AnimalApi.getAnimalsForSale(),
          TypeAnimalApi.getAll(),
          RaceApi.getAll()
        ]);
                
        // Extraire les données des réponses API avec la structure correcte
        const animalsData = animalsResponse.member || [];
        const typesData = typesResponse.member || [];
        const racesData = racesResponse.member || [];
        
        setAnimals(animalsData);
        setTypes(typesData);
        setRaces(racesData);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError("Une erreur est survenue lors du chargement des données. Veuillez réessayer plus tard.");
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        setLoading(true);
        
        // Préparer les filtres pour l'API
        const apiFilters = { aVendre: true };
        
        // Ajouter le type d'animal si présent dans l'URL
        const typeParam = searchParams.get('type');
        if (typeParam) {
          apiFilters['race.typeAnimal.nom'] = typeParam;
        }
        
        // Charger les animaux filtrés
        const response = await AnimalApi.getAll(apiFilters);
        setAnimals(response.member || []);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError("Une erreur est survenue lors du chargement des données.");
        setLoading(false);
      }
    };
    
    fetchAnimals();
  }, [searchParams]);

  // Gérer les changements de filtres
  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setFilters({
      type: 'all',
      race: 'all',
      minPrice: '',
      maxPrice: ''
    });
  };

  // Gérer le changement d'ordre de tri
  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  // Filtrer les animaux en fonction des critères
  const filteredAnimals = animals.filter(animal => {
    let matches = true;
    
    if (filters.type && filters.type !== "all" && 
        animal.race?.typeAnimal?.id?.toString() !== filters.type) {
      matches = false;
    }
    
    if (filters.race && filters.race !== "all" && 
        animal.race?.id?.toString() !== filters.race) {
      matches = false;
    }
    
    if (filters.minPrice && animal.prix < parseFloat(filters.minPrice)) {
      matches = false;
    }
    
    if (filters.maxPrice && animal.prix > parseFloat(filters.maxPrice)) {
      matches = false;
    }
    
    return matches;
  });

  // Trier les animaux
  const sortedAnimals = [...filteredAnimals].sort((a, b) => {
    switch(sortOrder) {
      case 'price-asc':
        return (a.prix || 0) - (b.prix || 0);
      case 'price-desc':
        return (b.prix || 0) - (a.prix || 0);
      case 'age-asc':
        return (a.age || 0) - (b.age || 0);
      case 'age-desc':
        return (b.age || 0) - (a.age || 0);
      default:
        return 0; // Pas de tri spécifique
    }
  });

  return (
    <div className="space-y-8 pb-16">
      {/* En-tête de la page */}
      <div className="bg-stone-800 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white text-center">Nos animaux à vendre</h1>
          <p className="text-stone-300 text-center mt-2">
            Découvrez notre sélection d'animaux de qualité
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Bouton mobile pour afficher/masquer les filtres */}
        <div className="md:hidden mb-4">
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="w-full"
          >
            <Filter className="mr-2 h-4 w-4" />
            {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Section des filtres */}
          <div className={`md:block ${showFilters ? 'block' : 'hidden'}`}>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Filtres</h2>
                
                <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Type d'animal</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <Select 
                          value={filters.type} 
                          onValueChange={(value) => handleFilterChange('type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Tous les types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous les types</SelectItem>
                            {types.map(type => (
                              <SelectItem key={type.id} value={type.id.toString()}>
                                {type.nom}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Race</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <Select 
                          value={filters.race} 
                          onValueChange={(value) => handleFilterChange('race', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Toutes les races" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Toutes les races</SelectItem>
                            {races
                              .filter(race => filters.type === 'all' || race.typeAnimal?.id?.toString() === filters.type)
                              .map(race => (
                                <SelectItem key={race.id} value={race.id.toString()}>
                                  {race.nom}
                                </SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Prix</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Prix minimum (€)</label>
                          <Input
                            type="number"
                            value={filters.minPrice}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                            placeholder="Min"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Prix maximum (€)</label>
                          <Input
                            type="number"
                            value={filters.maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                            placeholder="Max"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="mt-6 space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={resetFilters}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Réinitialiser les filtres
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Liste des animaux */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-stone-400 border-e-transparent"></div>
                <p className="mt-4">Chargement des animaux...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-800 p-4 rounded-lg">
                {error}
              </div>
            ) : (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-stone-600">
                    {sortedAnimals.length} animaux trouvés
                  </p>
                  <Select 
                    value={sortOrder}
                    onValueChange={handleSortChange}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Par défaut</SelectItem>
                      <SelectItem value="price-asc">Prix croissant</SelectItem>
                      <SelectItem value="price-desc">Prix décroissant</SelectItem>
                      <SelectItem value="age-asc">Âge croissant</SelectItem>
                      <SelectItem value="age-desc">Âge décroissant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {sortedAnimals.length === 0 ? (
                  <div className="text-center py-16 bg-stone-50 rounded-lg">
                    <p className="text-stone-500 mb-4">Aucun animal ne correspond à vos critères</p>
                    <Button variant="outline" onClick={resetFilters}>
                      Réinitialiser les filtres
                    </Button>
                  </div>
                ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedAnimals.map(animal => (
                    <Card key={animal.id} className="overflow-hidden flex flex-col h-full">
                      <div className="relative aspect-video">
                      {animal.photos && animal.photos.length > 0 && animal.photos[0].filename ? (
                        <img 
                          src={`http://localhost:8000/uploads/photos/${animal.photos[0].filename}`} 
                          alt={animal.nom || 'Animal'} 
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => {
                            console.log("Erreur de chargement d'image pour:", animal.nom, animal.photos[0]);
                            e.target.src = animal.race?.typeAnimal?.nom === "Ovin" ? '/ovin.jpeg' : '/bovin.jpeg';
                          }}
                        />
                      ) : (
                        <img 
                          src={animal.race?.typeAnimal?.nom === "Ovin" ? '/ovin.jpeg' : '/bovin.jpeg'} 
                          alt={animal.nom || 'Animal'} 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-stone-800 text-white hover:bg-stone-700">
                            {animal.race?.typeAnimal?.nom || "Animal"}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4 flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold">{animal.nom || animal.description || "Sans nom"}</h3>
                          <span className="text-sm bg-stone-100 px-2 py-1 rounded">
                            {animal.age} {animal.age > 1 ? 'ans' : 'an'}
                          </span>
                        </div>
                        <p className="text-sm text-stone-600 mb-2">{animal.race?.nom || "Race non spécifiée"}</p>
                        <p className="text-sm text-stone-500 line-clamp-2 mb-4">
                          {animal.description || "Aucune description disponible"}
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 border-t">
                        <div className="w-full flex justify-between items-center">
                          <div>
                            <p className="font-bold">
                              {animal.prixHT ? `${parseFloat(animal.prixHT).toLocaleString()} € HT` : "Prix sur demande"}
                            </p>
                            {animal.prixTTC && (
                              <p className="text-xs text-stone-500">
                                {parseFloat(animal.prixTTC).toLocaleString()} € TTC
                              </p>
                            )}
                          </div>
                          <Button asChild size="sm" variant="outline">
                            <Link to={`/animaux/${animal.id}`}>
                              Détails
                            </Link>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalListPage;