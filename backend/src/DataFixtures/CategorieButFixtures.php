<?php

namespace App\DataFixtures;

use App\Entity\CategorieBut;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategorieButFixtures extends Fixture
{
    public const VIANDE_REFERENCE = 'but-viande';
    public const LAIT_REFERENCE = 'but-lait';

    public function load(ObjectManager $manager): void
    {
        $viande = new CategorieBut();
        $viande->setNom('Viande');
        $viande->setDescription('Races élevées principalement pour la production de viande.');
        $manager->persist($viande);
        $this->addReference(self::VIANDE_REFERENCE, $viande);

        $lait = new CategorieBut();
        $lait->setNom('Lait');
        $lait->setDescription('Races élevées principalement pour la production de lait.');
        $manager->persist($lait);
        $this->addReference(self::LAIT_REFERENCE, $lait);

        $manager->flush();
    }
}