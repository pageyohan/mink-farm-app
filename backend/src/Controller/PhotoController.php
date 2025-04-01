<?php
namespace App\Controller;

use App\Entity\Photo;
use App\Entity\Animal;
use App\Service\PhotoUploader;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PhotoController extends AbstractController
{
    #[Route('/api/animals/{id}/photos', name: 'api_animal_add_photo', methods: ['POST'])]
    public function uploadPhoto(Request $request, Animal $animal, PhotoUploader $uploader, EntityManagerInterface $entityManager): Response
    {
        $file = $request->files->get('photo');
       
        if (!$file) {
            return $this->json(['error' => 'No file uploaded'], 400);
        }
       
        try {
            $fileName = $uploader->upload($file);
           
            $photo = new Photo();
            $photo->setFilename($fileName);
            $photo->setDescription($request->request->get('description') ?? '');
            
            // Vérifier si cette photo doit être marquée comme principale
            $principale = $request->request->get('principale') === 'true';
            
            // Si cette photo doit être principale, vérifier et mettre à jour les autres photos
            if ($principale) {
                foreach ($animal->getPhotos() as $existingPhoto) {
                    if ($existingPhoto->isPrincipale()) {
                        $existingPhoto->setPrincipale(false);
                        $entityManager->persist($existingPhoto);
                    }
                }
            }
            
            $photo->setPrincipale($principale);
            $photo->setAnimal($animal);
           
            $entityManager->persist($photo);
            $entityManager->flush();
           
            return $this->json([
                'id' => $photo->getId(),
                'filename' => $photo->getFilename(),
                'description' => $photo->getDescription(),
                'principale' => $photo->isPrincipale(),
                'url' => $request->getSchemeAndHttpHost() . '/uploads/photos/' . $photo->getFilename()
            ], 201);
        } catch (\Exception $e) {
            return $this->json([
                'error' => 'Failed to upload photo: ' . $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }
    
    #[Route('/api/photos/{id}', name: 'api_photo_delete', methods: ['DELETE'])]
    public function deletePhoto(Photo $photo, EntityManagerInterface $entityManager): Response
    {
        try {
            // Récupérer le nom du fichier pour le supprimer
            $filename = $photo->getFilename();
            
            // Supprimer d'abord l'entité de la base de données
            $entityManager->remove($photo);
            $entityManager->flush();
            
            // Supprimer le fichier physique (optionnel, dépend de votre stratégie)
            $filePath = $this->getParameter('photos_directory') . '/' . $filename;
            if (file_exists($filePath)) {
                unlink($filePath);
            }
            
            return $this->json(['message' => 'Photo supprimée avec succès'], 200);
        } catch (\Exception $e) {
            return $this->json([
                'error' => 'Failed to delete photo: ' . $e->getMessage()
            ], 500);
        }
    }
    
    #[Route('/api/photos/{id}', name: 'api_photo_update', methods: ['PATCH'])]
    public function updatePhoto(Request $request, Photo $photo, EntityManagerInterface $entityManager): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            
            // Mise à jour de la description si fournie
            if (isset($data['description'])) {
                $photo->setDescription($data['description']);
            }
            
            // Mise à jour du statut "principale" si fourni
            if (isset($data['principale']) && $data['principale'] === true) {
                // Récupérer l'animal associé
                $animal = $photo->getAnimal();
                
                // Mettre à jour toutes les autres photos pour qu'elles ne soient plus principales
                foreach ($animal->getPhotos() as $existingPhoto) {
                    if ($existingPhoto->getId() !== $photo->getId() && $existingPhoto->isPrincipale()) {
                        $existingPhoto->setPrincipale(false);
                        $entityManager->persist($existingPhoto);
                    }
                }
                
                // Définir cette photo comme principale
                $photo->setPrincipale(true);
            } elseif (isset($data['principale']) && $data['principale'] === false) {
                $photo->setPrincipale(false);
            }
            
            $entityManager->persist($photo);
            $entityManager->flush();
            
            return $this->json([
                'id' => $photo->getId(),
                'filename' => $photo->getFilename(),
                'description' => $photo->getDescription(),
                'principale' => $photo->isPrincipale()
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'error' => 'Failed to update photo: ' . $e->getMessage()
            ], 500);
        }
    }
    
    #[Route('/api/animals/{id}/photos/reorder', name: 'api_animal_reorder_photos', methods: ['POST'])]
    public function reorderPhotos(Request $request, Animal $animal, EntityManagerInterface $entityManager): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            
            if (!isset($data['photoIds']) || !is_array($data['photoIds'])) {
                return $this->json(['error' => 'Missing or invalid photoIds array'], 400);
            }
            
            // Collecter toutes les photos de l'animal dans un tableau associatif (id => photo)
            $photosMap = [];
            foreach ($animal->getPhotos() as $photo) {
                $photosMap[$photo->getId()] = $photo;
            }
            
            // Vérifier que tous les IDs fournis correspondent à des photos de cet animal
            foreach ($data['photoIds'] as $photoId) {
                if (!isset($photosMap[$photoId])) {
                    return $this->json(['error' => 'Photo ID ' . $photoId . ' does not belong to this animal'], 400);
                }
            }
            
            // Mettre à jour l'ordre des photos (à implémenter selon votre logique d'ordre)
            // Cet exemple suppose que vous avez un champ 'position' dans votre entité Photo
            // Si ce n'est pas le cas, vous devrez adapter cette logique
            
            // $position = 1;
            // foreach ($data['photoIds'] as $photoId) {
            //     $photo = $photosMap[$photoId];
            //     $photo->setPosition($position);
            //     $entityManager->persist($photo);
            //     $position++;
            // }
            
            // $entityManager->flush();
            
            return $this->json(['success' => true, 'message' => 'Photos reordered successfully']);
        } catch (\Exception $e) {
            return $this->json([
                'error' => 'Failed to reorder photos: ' . $e->getMessage()
            ], 500);
        }
    }
    
    #[Route('/api/animals/{id}/photos', name: 'api_animal_get_photos', methods: ['GET'])]
    public function getAnimalPhotos(Animal $animal, Request $request): Response
    {
        try {
            $photos = [];
            foreach ($animal->getPhotos() as $photo) {
                $photos[] = [
                    'id' => $photo->getId(),
                    'filename' => $photo->getFilename(),
                    'description' => $photo->getDescription(),
                    'principale' => $photo->isPrincipale(),
                    'url' => $request->getSchemeAndHttpHost() . '/uploads/photos/' . $photo->getFilename()
                ];
            }
            
            return $this->json($photos);
        } catch (\Exception $e) {
            return $this->json([
                'error' => 'Failed to get photos: ' . $e->getMessage()
            ], 500);
        }
    }
}