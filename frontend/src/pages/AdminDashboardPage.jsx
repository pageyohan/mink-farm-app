// src/pages/AdminDashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, LogOut, Search, Filter } from 'lucide-react';
import AnimalApi from '../services/AnimalApi';
import AuthApi from '../services/AuthApi';

// Import des composants Shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSoldAnimals, setShowSoldAnimals] = useState(false);
  const [animalToDelete, setAnimalToDelete] = useState(null);

  useEffect(() => {
    fetchAnimals();
  }, [showSoldAnimals]);

  const fetchAnimals = async () => {
    try {
      setLoading(true);
      // Utilisez getAll sans filtre pour obtenir tous les animaux, vendus ou non
      const response = await AnimalApi.getAll(showSoldAnimals ? {} : { aVendre: true });
      setAnimals(response.member || []);
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors du chargement des animaux:', err);
      setError('Une erreur est survenue lors du chargement des animaux.');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    AuthApi.logout();
    navigate('/');
  };

  const confirmDeleteAnimal = (animal) => {
    setAnimalToDelete(animal);
  };

  const handleDeleteAnimal = async () => {
    if (!animalToDelete) return;
    
    try {
      await AnimalApi.delete(animalToDelete.id);
      setAnimals(animals.filter(a => a.id !== animalToDelete.id));
      setAnimalToDelete(null);
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      setError('Une erreur est survenue lors de la suppression de l\'animal.');
    }
  };

  const handleStatusChange = async (animal) => {
    try {
      const updatedAnimal = {...animal, aVendre: !animal.aVendre};
      await AnimalApi.update(animal.id, updatedAnimal);
      // Rafraîchir la liste
      fetchAnimals();
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut:', err);
      setError('Une erreur est survenue lors de la mise à jour du statut.');
    }
  };

  // Filtrer les animaux selon le terme de recherche
  const filteredAnimals = animals.filter(animal => {
    const searchString = searchTerm.toLowerCase();
    return (
      (animal.nom && animal.nom.toLowerCase().includes(searchString)) ||
      (animal.description && animal.description.toLowerCase().includes(searchString)) ||
      (animal.race?.nom && animal.race.nom.toLowerCase().includes(searchString))
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Tableau de bord - Administration</h1>
          <p className="text-stone-600">Gérez votre inventaire d'animaux</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Total des animaux</CardTitle>
            <CardDescription>Tous les animaux enregistrés</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{animals.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Animaux à vendre</CardTitle>
            <CardDescription>Actuellement en vente</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{animals.filter(a => a.aVendre).length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Animaux vendus</CardTitle>
            <CardDescription>Non disponibles à la vente</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{animals.filter(a => !a.aVendre).length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Liste des animaux</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowSoldAnimals(!showSoldAnimals)}
            >
              <Filter className="mr-2 h-4 w-4" />
              {showSoldAnimals ? 'Masquer vendus' : 'Afficher tous'}
            </Button>
          </div>
          
          <div className="flex w-full sm:w-auto gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-500" />
              <Input
                type="text"
                placeholder="Rechercher un animal..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button asChild>
              <Link to="/admin/animal/new">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter
              </Link>
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-stone-400 border-e-transparent"></div>
            <p className="mt-2">Chargement des données...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-red-700 bg-red-50">{error}</div>
        ) : filteredAnimals.length === 0 ? (
          <div className="p-8 text-center text-stone-500">
            Aucun animal trouvé.
            {searchTerm && (
              <Button 
                variant="link" 
                onClick={() => setSearchTerm('')}
                className="ml-2"
              >
                Effacer la recherche
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Race</TableHead>
                  <TableHead>Âge</TableHead>
                  <TableHead>Prix HT</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAnimals.map((animal) => (
                  <TableRow key={animal.id}>
                    <TableCell className="font-medium">{animal.id}</TableCell>
                    <TableCell>{animal.nom || 'Sans nom'}</TableCell>
                    <TableCell>{animal.race?.typeAnimal?.nom || 'Non spécifié'}</TableCell>
                    <TableCell>{animal.race?.nom || 'Non spécifiée'}</TableCell>
                    <TableCell>{animal.age} {animal.age > 1 ? 'ans' : 'an'}</TableCell>
                    <TableCell>{parseFloat(animal.prixHT).toLocaleString()} €</TableCell>
                    <TableCell>
                      <Badge 
                        variant={animal.aVendre ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => handleStatusChange(animal)}
                      >
                        {animal.aVendre ? 'À vendre' : 'Vendu'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link to={`/admin/animal/${animal.id}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => confirmDeleteAnimal(animal)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirmer la suppression</DialogTitle>
                              <DialogDescription>
                                Êtes-vous sûr de vouloir supprimer l'animal "{animal.nom || `${animal.race?.nom} #${animal.id}`}" ?
                                Cette action est irréversible.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="mt-4">
                              <Button variant="outline" onClick={() => setAnimalToDelete(null)}>
                                Annuler
                              </Button>
                              <Button variant="destructive" onClick={handleDeleteAnimal}>
                                Supprimer
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;