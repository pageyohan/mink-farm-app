import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import AnimalApi from '@/services/AnimalApi';
import RaceApi from '@/services/RaceApi';
import TypeAnimalApi from '@/services/TypeAnimalApi';
import PhotoApi from  '@/services/PhotoApi';

// Import des composants personnalisés
import AnimalFormGeneral from './components/animal-form/AnimalFormGeneral';
import AnimalFormPhotos from './components/animal-form/AnimalFormPhotos';

// Import des composants UI
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const AdminAnimalEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewAnimal = id === 'new';
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Données pour les select
  const [races, setRaces] = useState([]);
  const [types, setTypes] = useState([]);
  
  // État du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    race: '',
    age: '',
    description: '',
    prixHT: '',
    aVendre: true,
    dateNaissance: ''
  });
  
  // Gestion des photos
  const [photos, setPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  // Chargement des données initiales
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Charger les types et races
        const [typesResponse, racesResponse] = await Promise.all([
          TypeAnimalApi.getAll(),
          RaceApi.getAll()
        ]);
        
        setTypes(typesResponse.member || []);
        setRaces(racesResponse.member || []);
        
        // Si modification, charger les données de l'animal
        if (!isNewAnimal) {
          const animalResponse = await AnimalApi.getById(id);
          
          // Formater les données pour le formulaire
          setFormData({
            nom: animalResponse.nom || '',
            race: animalResponse.race?.id.toString() || '',
            age: animalResponse.age?.toString() || '',
            description: animalResponse.description || '',
            prixHT: animalResponse.prixHT || '',
            aVendre: animalResponse.aVendre || false,
            dateNaissance: animalResponse.dateNaissance ? new Date(animalResponse.dateNaissance).toISOString().split('T')[0] : ''
          });
          
          // Charger les photos
          setPhotos(animalResponse.photos || []);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Une erreur est survenue lors du chargement des données.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, isNewAnimal]);

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      // Formatage des données pour l'API
      const animalData = {
        ...formData,
        age: parseInt(formData.age, 10),
        prixHT: formData.prixHT.toString()
      };
      
      let animalId;
      
      if (isNewAnimal) {
        // Création d'un nouvel animal
        const response = await AnimalApi.create(animalData);
        animalId = response.id;
        setSuccess('Animal ajouté avec succès !');
      } else {
        // Mise à jour d'un animal existant
        await AnimalApi.update(id, animalData);
        animalId = id;
        setSuccess('Animal mis à jour avec succès !');
      }
      
      // Upload des nouvelles photos
      if (newPhotos.length > 0) {
        for (const photoData of newPhotos) {
          try {
            await PhotoApi.uploadForAnimal(animalId, photoData.file, photoData.description, photoData.principale);
            
            // Mettre à jour la progression
            setUploadProgress(prev => ({
              ...prev,
              [photoData.id]: 100
            }));
          } catch (photoError) {
            console.error('Erreur lors de l\'upload de la photo:', photoError);
          }
        }
      }
      
      // Redirection après un court délai
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1500);
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      setError('Une erreur est survenue lors de la sauvegarde. Veuillez réessayer.');
      setSaving(false);
    }
  };

  // Gestionnaires d'événements pour les photos
  const handleAddPhoto = (e) => {
    const files = Array.from(e.target.files);
    
    const newFiles = files.map(file => ({
      id: `new-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      file,
      preview: URL.createObjectURL(file),
      description: '',
      principale: photos.length === 0 && newPhotos.length === 0
    }));
    
    setNewPhotos(prev => [...prev, ...newFiles]);
  };

  const handleDeletePhoto = async (photoId) => {
    try {
      await PhotoApi.delete(photoId);
      setPhotos(photos.filter(photo => photo.id !== photoId));
      setSuccess('Photo supprimée avec succès.');
    } catch (err) {
      console.error('Erreur lors de la suppression de la photo:', err);
      setError('Une erreur est survenue lors de la suppression de la photo.');
    }
  };

  const handleRemoveNewPhoto = (photoId) => {
    const photoToRemove = newPhotos.find(p => p.id === photoId);
    if (photoToRemove && photoToRemove.preview) {
      URL.revokeObjectURL(photoToRemove.preview);
    }
    setNewPhotos(newPhotos.filter(photo => photo.id !== photoId));
  };

  const handleSetMainPhoto = async (photoId) => {
    try {
      await PhotoApi.setAsMain(photoId);
      
      // Mettre à jour l'état local
      const updatedPhotos = photos.map(photo => ({
        ...photo,
        principale: photo.id === photoId
      }));
      
      setPhotos(updatedPhotos);
      setSuccess('Photo principale mise à jour.');
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la photo principale:', err);
      setError('Une erreur est survenue lors de la mise à jour de la photo principale.');
    }
  };

  const handleNewPhotoDescriptionChange = (photoId, description) => {
    setNewPhotos(newPhotos.map(photo => 
      photo.id === photoId ? { ...photo, description } : photo
    ));
  };

  const handleSetNewMainPhoto = (photoId) => {
    setNewPhotos(newPhotos.map(photo => ({
      ...photo,
      principale: photo.id === photoId
    })));
    
    // S'assurer qu'aucune photo existante n'est principale
    if (photos.length > 0) {
      setPhotos(photos.map(photo => ({
        ...photo,
        principale: false
      })));
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-stone-400 border-e-transparent"></div>
          <p className="mt-4">Chargement des données...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" asChild className="mr-4 p-0">
          <Link to="/admin/dashboard" className="flex items-center text-stone-600 hover:text-stone-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">
          {isNewAnimal ? 'Ajouter un nouvel animal' : `Modifier l'animal #${id}`}
        </h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
          <AlertTitle>Succès</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Informations générales */}
          <AnimalFormGeneral 
            formData={formData}
            setFormData={setFormData}
            races={races}
            types={types}
          />

          {/* Gestion des photos */}
          <AnimalFormPhotos 
            formData={formData}
            races={races}
            photos={photos}
            newPhotos={newPhotos}
            uploadProgress={uploadProgress}
            onAddPhoto={handleAddPhoto}
            onDeletePhoto={handleDeletePhoto}
            onSetMainPhoto={handleSetMainPhoto}
            onRemoveNewPhoto={handleRemoveNewPhoto}
            onNewPhotoDescriptionChange={handleNewPhotoDescriptionChange}
            onSetNewMainPhoto={handleSetNewMainPhoto}
          />
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <Button variant="outline" type="button" asChild>
            <Link to="/admin/dashboard">Annuler</Link>
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? 'Enregistrement...' : 'Enregistrer'}
            {!saving && <Save className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminAnimalEditPage;