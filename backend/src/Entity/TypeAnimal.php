<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TypeAnimalRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TypeAnimalRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['type_animal:read']],
    denormalizationContext: ['groups' => ['type_animal:write']]
)]
class TypeAnimal
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['type_animal:read', 'race:read', 'animal:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['type_animal:read', 'type_animal:write', 'race:read', 'animal:read'])]
    private ?string $nom = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['type_animal:read', 'type_animal:write'])]
    private ?string $description = null;

    #[ORM\OneToMany(mappedBy: 'typeAnimal', targetEntity: Race::class)]
    private Collection $races;

    public function __construct()
    {
        $this->races = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Race>
     */
    public function getRaces(): Collection
    {
        return $this->races;
    }

    public function addRace(Race $race): static
    {
        if (!$this->races->contains($race)) {
            $this->races->add($race);
            $race->setTypeAnimal($this);
        }

        return $this;
    }

    public function removeRace(Race $race): static
    {
        if ($this->races->removeElement($race)) {
            // set the owning side to null (unless already changed)
            if ($race->getTypeAnimal() === $this) {
                $race->setTypeAnimal(null);
            }
        }

        return $this;
    }
}