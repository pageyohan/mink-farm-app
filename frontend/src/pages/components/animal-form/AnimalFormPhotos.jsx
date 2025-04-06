import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PhotoItem from './PhotoItem';
import NewPhotoItem from './NewPhotoItem';

const AnimalFormPhotos = ({
  formData,
  races,
  photos,
  newPhotos,
  uploadProgress,
  onAddPhoto,
  onDeletePhoto,
  onSetMainPhoto,
  onRemoveNewPhoto,
  onNewPhotoDescriptionChange,
  onSetNewMainPhoto
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Photos</CardTitle>
        <CardDescription>
          Ajoutez des photos de l'animal
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Photos existantes */}
          {photos.map(photo => (
            <PhotoItem
              key={photo.id}
              photo={photo}
              formData={formData}
              races={races}
              onSetMainPhoto={onSetMainPhoto}
              onDeletePhoto={onDeletePhoto}
            />
          ))}
          
          {/* Nouvelles photos */}
          {newPhotos.map(photo => (
            <NewPhotoItem
              key={photo.id}
              photo={photo}
              onSetMainPhoto={onSetNewMainPhoto}
              onRemovePhoto={onRemoveNewPhoto}
              onDescriptionChange={onNewPhotoDescriptionChange}
              uploadProgress={uploadProgress[photo.id]}
            />
          ))}
        </div>

        <div className="pt-4">
          <Label htmlFor="photo" className="block mb-2">Ajouter une photo</Label>
          <Input
            id="photo"
            type="file"
            accept="image/*"
            onChange={onAddPhoto}
            multiple
          />
          <p className="text-xs text-stone-500 mt-1">
            Formats acceptés: JPG, PNG. Taille max: 5MB
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnimalFormPhotos;