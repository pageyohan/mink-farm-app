<?php

namespace App\DataFixtures;

use App\Entity\TypeAnimal;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class TypeAnimalFixtures extends Fixture
{
    public const BOVIN_REFERENCE = 'type-bovin';
    public const OVIN_REFERENCE = 'type-ovin';

    public function load(ObjectManager $manager): void
    {
        $bovin = new TypeAnimal();
        $bovin->setNom('Bovins');
        $bovin->setDescription('Les bovins sont des mammifères ruminants qui comprennent les vaches, taureaux et bœufs.');
        $manager->persist($bovin);
        $this->addReference(self::BOVIN_REFERENCE, $bovin);

        $ovin = new TypeAnimal();
        $ovin->setNom('Ovins');
        $ovin->setDescription('Les ovins sont des mammifères ruminants qui comprennent les moutons, brebis et agneaux.');
        $manager->persist($ovin);
        $this->addReference(self::OVIN_REFERENCE, $ovin);

        $manager->flush();
    }
}