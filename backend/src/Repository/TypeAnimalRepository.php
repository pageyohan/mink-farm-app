<?php

namespace App\Repository;

use App\Entity\TypeAnimal;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<TypeAnimal>
 *
 * @method TypeAnimal|null find($id, $lockMode = null, $lockVersion = null)
 * @method TypeAnimal|null findOneBy(array $criteria, array $orderBy = null)
 * @method TypeAnimal[]    findAll()
 * @method TypeAnimal[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TypeAnimalRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TypeAnimal::class);
    }

    // Vous pouvez ajouter des méthodes personnalisées ici si nécessaire
}