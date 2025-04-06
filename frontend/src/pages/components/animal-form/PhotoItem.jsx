import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Image as ImageIcon } from 'lucide-react';

const PhotoItem = ({ photo, formData, races, onSetMainPhoto, onDeletePhoto }) => {
  return (
    <div className="relative border rounded-md overflow-hidden">
      <img
        src={`/uploads/photos/${photo.filename}`}
        alt={photo.description || 'Photo'}
        className="w-full aspect-square object-cover"
        onError={(e) => {
          e.target.src = formData.race && races.find(r => r.id.toString() === formData.race)?.typeAnimal?.nom === 'Ovin' 
            ? '/ovin.jpeg' 
            : '/bovin.jpeg';
        }}
      />
      
      {photo.principale && (
        <Badge className="absolute top-2 left-2 bg-green-500">Principale</Badge>
      )}
      
      <div className="absolute top-2 right-2 flex space-x-1">
        {!photo.principale && (
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 bg-white"
            onClick={() => onSetMainPhoto(photo.id)}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        )}
        
        <Button
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0 bg-white text-red-500 hover:text-red-700"
          onClick={() => onDeletePhoto(photo.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {photo.description && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-1 text-xs">
          {photo.description}
        </div>
      )}
    </div>
  );
};

export default PhotoItem;