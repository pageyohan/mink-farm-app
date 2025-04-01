<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\RaceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: RaceRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['race:read']],
    denormalizationContext: ['groups' => ['race:write']]
)]
class Race
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['race:read', 'animal:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['race:read', 'race:write', 'animal:read'])]
    private ?string $nom = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['race:read', 'race:write'])]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'races')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['race:read', 'race:write', 'animal:read'])]
    private ?TypeAnimal $typeAnimal = null;

    #[ORM\ManyToOne(inversedBy: 'races')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['race:read', 'race:write', 'animal:read'])]
    private ?CategorieBut $categorieBut = null;

    #[ORM\OneToMany(mappedBy: 'race', targetEntity: Animal::class)]
    private Collection $animaux;

    public function __construct()
    {
        $this->animaux = new ArrayCollection();
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

    public function getTypeAnimal(): ?TypeAnimal
    {
        return $this->typeAnimal;
    }

    public function setTypeAnimal(?TypeAnimal $typeAnimal): static
    {
        $this->typeAnimal = $typeAnimal;

        return $this;
    }

    public function getCategorieBut(): ?CategorieBut
    {
        return $this->categorieBut;
    }

    public function setCategorieBut(?CategorieBut $categorieBut): static
    {
        $this->categorieBut = $categorieBut;

        return $this;
    }

    /**
     * @return Collection<int, Animal>
     */
    public function getAnimaux(): Collection
    {
        return $this->animaux;
    }

    public function addAnimaux(Animal $animaux): static
    {
        if (!$this->animaux->contains($animaux)) {
            $this->animaux->add($animaux);
            $animaux->setRace($this);
        }

        return $this;
    }

    public function removeAnimaux(Animal $animaux): static
    {
        if ($this->animaux->removeElement($animaux)) {
            // set the owning side to null (unless already changed)
            if ($animaux->getRace() === $this) {
                $animaux->setRace(null);
            }
        }

        return $this;
    }
}