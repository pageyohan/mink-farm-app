import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Image as ImageIcon } from 'lucide-react';

const NewPhotoItem = ({ photo, onSetMainPhoto, onRemovePhoto, onDescriptionChange, uploadProgress }) => {
  return (
    <div className="relative border rounded-md overflow-hidden">
      <img
        src={photo.preview}
        alt="Aperçu"
        className="w-full aspect-square object-cover"
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
          onClick={() => onRemovePhoto(photo.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <Input
        type="text"
        placeholder="Description..."
        className="absolute bottom-0 left-0 right-0 border-0 bg-black bg-opacity-50 text-white text-xs h-8"
        value={photo.description}
        onChange={(e) => onDescriptionChange(photo.id, e.target.value)}
      />
      
      {uploadProgress && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white px-4 py-2 rounded-md text-sm">
            {uploadProgress}%
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPhotoItem;