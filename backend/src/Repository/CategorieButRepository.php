<?php

namespace App\Repository;

use App\Entity\CategorieBut;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CategorieBut>
 *
 * @method CategorieBut|null find($id, $lockMode = null, $lockVersion = null)
 * @method CategorieBut|null findOneBy(array $criteria, array $orderBy = null)
 * @method CategorieBut[]    findAll()
 * @method CategorieBut[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CategorieButRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CategorieBut::class);
    }

    // Vous pouvez ajouter des méthodes personnalisées ici si nécessaire
}