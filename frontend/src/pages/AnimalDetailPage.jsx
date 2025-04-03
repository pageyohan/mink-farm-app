// src/pages/AnimalDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Phone } from 'lucide-react';
import AnimalApi from '../services/AnimalApi';

// Import des composants Shadcn
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const AnimalDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        setLoading(true);
        const data = await AnimalApi.getById(id);
        console.log('Animal detail:', data);
        setAnimal(data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement de l\'animal:', err);
        setError('Une erreur est survenue lors du chargement des informations de l\'animal.');
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  // Gestion des photos
  const getAnimalPhotos = () => {
    if (animal?.photos && animal.photos.length > 0) {
      return animal.photos.map(photo => ({
        url: `/uploads/photos/${photo.filename}`,
        description: photo.description || ''
      }));
    }
    
    // Photo par défaut basée sur le type d'animal
    const defaultImage = animal?.race?.typeAnimal?.nom === 'Ovin' ? '/ovin.jpeg' : '/bovin.jpeg';
    return [{ url: defaultImage, description: '' }];
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifiée';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-stone-400 border-e-transparent"></div>
          <p className="mt-4">Chargement des informations de l'animal...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Erreur</h2>
          <p>{error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate('/animaux')}
          >
            Retour à la liste des animaux
          </Button>
        </div>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 text-yellow-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Animal non trouvé</h2>
          <p>L'animal que vous recherchez n'existe pas ou a été retiré de la vente.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate('/animaux')}
          >
            Voir les animaux disponibles
          </Button>
        </div>
      </div>
    );
  }

  const photos = getAnimalPhotos();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="p-0 font-normal">
          <Link to="/animaux" className="flex items-center text-stone-600 hover:text-stone-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste des animaux
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Galerie photos */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
            <img 
              src={photos[activeImage].url} 
              alt={animal.nom || animal.description || 'Animal'} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = animal.race?.typeAnimal?.nom === 'Ovin' ? '/ovin.jpeg' : '/bovin.jpeg';
              }}
            />
          </div>
          
          {photos.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {photos.map((photo, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square overflow-hidden rounded ${activeImage === index ? 'ring-2 ring-stone-800' : ''}`}
                >
                  <img 
                    src={photo.url} 
                    alt={photo.description || `Photo ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informations de l'animal */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-sm font-medium">
              {animal.race?.typeAnimal?.nom || 'Animal'}
            </Badge>
            {animal.aVendre && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200 text-sm">
                À vendre
              </Badge>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-2">
            {animal.nom || `${animal.race?.nom || 'Animal'} ${animal.id}`}
          </h1>
          
          <h2 className="text-xl text-stone-600 mb-4">
            {animal.race?.nom || 'Race non spécifiée'}
          </h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-stone-500" />
              <div>
                <p className="text-sm text-stone-500">Âge</p>
                <p className="font-medium">{animal.age || '?'} ans</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Tag className="h-5 w-5 mr-2 text-stone-500" />
              <div>
                <p className="text-sm text-stone-500">Naissance</p>
                <p className="font-medium">{formatDate(animal.dateNaissance)}</p>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="description" className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Détails</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-4 bg-stone-50 rounded-b-lg min-h-[150px]">
              <p className="text-stone-800">
                {animal.description || 'Aucune description disponible pour cet animal.'}
              </p>
            </TabsContent>
            <TabsContent value="details" className="p-4 bg-stone-50 rounded-b-lg min-h-[150px]">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-stone-800">Type</h3>
                  <p>{animal.race?.typeAnimal?.nom || 'Non spécifié'}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800">Race</h3>
                  <p>{animal.race?.nom || 'Non spécifiée'}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800">Catégorie</h3>
                  <p>{animal.race?.categorieBut?.nom || 'Non spécifiée'}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-stone-500">Prix hors taxes</p>
                  <p className="text-2xl font-bold">{parseFloat(animal.prixHT).toLocaleString()} €</p>
                </div>
                <div>
                  <p className="text-sm text-stone-500">Prix TTC</p>
                  <p className="text-xl">{parseFloat(animal.prixTTC).toLocaleString()} €</p>
                </div>
              </div>
              <p className="text-sm text-stone-500 mb-4">
                TVA applicable : 20%
              </p>
              <Button className="w-full" asChild>
                <a href="tel:0523531489" className="flex items-center justify-center">
                  <Phone className="mr-2 h-4 w-4" />
                  Contacter pour acheter
                </a>
              </Button>
            </CardContent>
          </Card>
          
          <div className="text-sm text-stone-500">
            <p>Référence : #{animal.id}</p>
            <p>Ajouté le : {formatDate(animal.dateNaissance) || 'Date inconnue'}</p>
          </div>
        </div>
      </div>

      <Separator className="my-12" />
    </div>
  );
};

export default AnimalDetailPage;