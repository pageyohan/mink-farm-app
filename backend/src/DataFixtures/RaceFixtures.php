<?php

namespace App\DataFixtures;

use App\Entity\Race;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use App\Entity\TypeAnimal;
use App\Entity\CategorieBut;

class RaceFixtures extends Fixture implements DependentFixtureInterface
{
    public const ANGUS_REFERENCE = 'race-angus';
    public const TEXAS_REFERENCE = 'race-texas';
    public const HEREFORD_REFERENCE = 'race-hereford';
    public const HOLSTEIN_REFERENCE = 'race-holstein';
    public const GUERNESEY_REFERENCE = 'race-guernesey';
    public const SUFFOLK_REFERENCE = 'race-suffolk';
    public const TEXEL_REFERENCE = 'race-texel';

    public function load(ObjectManager $manager): void
    {
        // Races de bovins à viande
        $angus = new Race();
        $angus->setNom('Angus');
        $angus->setDescription('Race écossaise connue pour sa viande persillée et sa rusticité.');
        $angus->setTypeAnimal($this->getReference(TypeAnimalFixtures::BOVIN_REFERENCE, TypeAnimal::class));
        $angus->setCategorieBut($this->getReference(CategorieButFixtures::VIANDE_REFERENCE, CategorieBut::class));
        $manager->persist($angus);
        $this->addReference(self::ANGUS_REFERENCE, $angus);

        $texas = new Race();
        $texas->setNom('Texas Longhorn');
        $texas->setDescription('Race américaine reconnaissable à ses longues cornes.');
        $texas->setTypeAnimal($this->getReference(TypeAnimalFixtures::BOVIN_REFERENCE, TypeAnimal::class));
        $texas->setCategorieBut($this->getReference(CategorieButFixtures::VIANDE_REFERENCE, CategorieBut::class));
        $manager->persist($texas);
        $this->addReference(self::TEXAS_REFERENCE, $texas);

        $hereford = new Race();
        $hereford->setNom('Hereford');
        $hereford->setDescription('Race britannique de bœuf rouge à tête blanche.');
        $hereford->setTypeAnimal($this->getReference(TypeAnimalFixtures::BOVIN_REFERENCE, TypeAnimal::class));
        $hereford->setCategorieBut($this->getReference(CategorieButFixtures::VIANDE_REFERENCE, CategorieBut::class));
        $manager->persist($hereford);
        $this->addReference(self::HEREFORD_REFERENCE, $hereford);

        // Races de bovins laitiers
        $holstein = new Race();
        $holstein->setNom('Holstein-Frisonne');
        $holstein->setDescription('Race la plus productive en lait, reconnaissable à sa robe tachetée noir et blanc.');
        $holstein->setTypeAnimal($this->getReference(TypeAnimalFixtures::BOVIN_REFERENCE, TypeAnimal::class));
        $holstein->setCategorieBut($this->getReference(CategorieButFixtures::LAIT_REFERENCE, CategorieBut::class));
        $manager->persist($holstein);
        $this->addReference(self::HOLSTEIN_REFERENCE, $holstein);

        $guernesey = new Race();
        $guernesey->setNom('Guernesey');
        $guernesey->setDescription('Race britannique produisant un lait riche en matières grasses.');
        $guernesey->setTypeAnimal($this->getReference(TypeAnimalFixtures::BOVIN_REFERENCE, TypeAnimal::class));
        $guernesey->setCategorieBut($this->getReference(CategorieButFixtures::LAIT_REFERENCE, CategorieBut::class));
        $manager->persist($guernesey);
        $this->addReference(self::GUERNESEY_REFERENCE, $guernesey);

        // Races d'ovins à viande
        $suffolk = new Race();
        $suffolk->setNom('Suffolk');
        $suffolk->setDescription('Race britannique de mouton à tête noire et membres noirs.');
        $suffolk->setTypeAnimal($this->getReference(TypeAnimalFixtures::OVIN_REFERENCE, TypeAnimal::class));
        $suffolk->setCategorieBut($this->getReference(CategorieButFixtures::VIANDE_REFERENCE, CategorieBut::class));
        $manager->persist($suffolk);
        $this->addReference(self::SUFFOLK_REFERENCE, $suffolk);

        $texel = new Race();
        $texel->setNom('Texel');
        $texel->setDescription('Race néerlandaise de mouton à viande, musclée et trapue.');
        $texel->setTypeAnimal($this->getReference(TypeAnimalFixtures::OVIN_REFERENCE, TypeAnimal::class));
        $texel->setCategorieBut($this->getReference(CategorieButFixtures::VIANDE_REFERENCE, CategorieBut::class));
        $manager->persist($texel);
        $this->addReference(self::TEXEL_REFERENCE, $texel);

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            TypeAnimalFixtures::class,
            CategorieButFixtures::class,
        ];
    }
}