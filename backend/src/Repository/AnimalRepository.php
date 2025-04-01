<?php

namespace App\Repository;

use App\Entity\Animal;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Animal>
 *
 * @method Animal|null find($id, $lockMode = null, $lockVersion = null)
 * @method Animal|null findOneBy(array $criteria, array $orderBy = null)
 * @method Animal[]    findAll()
 * @method Animal[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AnimalRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Animal::class);
    }

    /**
     * Récupère tous les animaux à vendre
     *
     * @return Animal[] Returns an array of Animal objects
     */
    public function findAllForSale(): array
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.aVendre = :val')
            ->setParameter('val', true)
            ->orderBy('a.id', 'DESC')
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * Trouve des animaux à vendre en fonction de la race
     */
    public function findForSaleByRace($raceId): array
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.aVendre = :aVendre')
            ->andWhere('a.race = :raceId')
            ->setParameter('aVendre', true)
            ->setParameter('raceId', $raceId)
            ->orderBy('a.id', 'DESC')
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * Trouve des animaux à vendre en fonction du type d'animal
     */
    public function findForSaleByType($typeId): array
    {
        return $this->createQueryBuilder('a')
            ->join('a.race', 'r')
            ->join('r.typeAnimal', 't')
            ->andWhere('a.aVendre = :aVendre')
            ->andWhere('t.id = :typeId')
            ->setParameter('aVendre', true)
            ->setParameter('typeId', $typeId)
            ->orderBy('a.id', 'DESC')
            ->getQuery()
            ->getResult()
        ;
    }
}