import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AnimalFormGeneral = ({ formData, setFormData, races, types }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Informations générales</CardTitle>
        <CardDescription>
          Les informations de base de l'animal
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nom">Nom de l'animal</Label>
            <Input
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Ex: Bella"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age">Âge (en années)</Label>
            <Input
              id="age"
              name="age"
              type="number"
              min="0"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Type d'animal</Label>
          <Select
            value={types.find(type =>
              type.id === races.find(race =>
                race.id.toString() === formData.race
              )?.typeAnimal?.id
            )?.id?.toString() || ''}
            disabled
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Sélectionnez un type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {type.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-stone-500 mt-1">Le type est déterminé par la race sélectionnée</p>
        </div>
          <div className="space-y-2">
            <Label htmlFor="race">Race</Label>
            <Select
              value={formData.race}
              onValueChange={(value) => handleSelectChange('race', value)}
              required
            >
              <SelectTrigger id="race">
                <SelectValue placeholder="Sélectionnez une race" />
              </SelectTrigger>
              <SelectContent>
                {races.map((race) => (
                  <SelectItem key={race.id} value={race.id.toString()}>
                    {race.nom} ({race.typeAnimal?.nom})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Décrivez l'animal, ses caractéristiques, son comportement..."
            rows={5}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="prixHT">Prix HT (€)</Label>
            <Input
              id="prixHT"
              name="prixHT"
              type="number"
              min="0"
              step="0.01"
              value={formData.prixHT}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dateNaissance">Date de naissance</Label>
            <Input
              id="dateNaissance"
              name="dateNaissance"
              type="date"
              value={formData.dateNaissance}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-4">
          <Switch
            id="aVendre"
            name="aVendre"
            checked={formData.aVendre}
            onCheckedChange={(checked) => handleSelectChange('aVendre', checked)}
          />
          <Label htmlFor="aVendre">Animal à vendre</Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimalFormGeneral;