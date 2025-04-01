<?php

namespace App\Repository;

use App\Entity\Race;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Race>
 *
 * @method Race|null find($id, $lockMode = null, $lockVersion = null)
 * @method Race|null findOneBy(array $criteria, array $orderBy = null)
 * @method Race[]    findAll()
 * @method Race[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RaceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Race::class);
    }

    /**
     * @return Race[] Returns an array of Race objects for a specific type
     */
    public function findByTypeAnimal($typeAnimalId): array
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.typeAnimal = :val')
            ->setParameter('val', $typeAnimalId)
            ->orderBy('r.nom', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }
}