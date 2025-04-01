<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use App\Repository\AnimalRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AnimalRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['animal:read']],
    denormalizationContext: ['groups' => ['animal:write']]
)]
#[ApiFilter(SearchFilter::class, properties: ['race.nom' => 'partial', 'race.typeAnimal.nom' => 'exact', 'race.categorieBut.nom' => 'exact'])]
#[ApiFilter(BooleanFilter::class, properties: ['aVendre'])]
#[ApiFilter(OrderFilter::class, properties: ['age', 'prixHT', 'dateNaissance'])]
class Animal
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['animal:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'animaux')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['animal:read', 'animal:write'])]
    private ?Race $race = null;

    #[ORM\Column]
    #[Groups(['animal:read', 'animal:write'])]
    private ?int $age = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['animal:read', 'animal:write'])]
    private ?string $description = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    #[Groups(['animal:read', 'animal:write'])]
    private ?string $prixHT = null;

    #[ORM\Column]
    #[Groups(['animal:read', 'animal:write'])]
    private ?bool $aVendre = false;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    #[Groups(['animal:read', 'animal:write'])]
    private ?\DateTimeInterface $dateNaissance = null;

    #[ORM\OneToMany(mappedBy: 'animal', targetEntity: Photo::class, cascade: ['persist', 'remove'])]
    #[Groups(['animal:read', 'animal:write'])]
    private Collection $photos;

    public function __construct()
    {
        $this->photos = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRace(): ?Race
    {
        return $this->race;
    }

    public function setRace(?Race $race): static
    {
        $this->race = $race;

        return $this;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(int $age): static
    {
        $this->age = $age;

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

    public function getPrixHT(): ?string
    {
        return $this->prixHT;
    }

    public function setPrixHT(string $prixHT): static
    {
        $this->prixHT = $prixHT;

        return $this;
    }

    /**
     * Calcule le prix TTC en ajoutant 20% de TVA au prix HT
     */
    #[Groups(['animal:read'])]
    public function getPrixTTC(): ?string
    {
        if ($this->prixHT === null) {
            return null;
        }
        
        return (string) (floatval($this->prixHT) * 1.20);
    }

    public function isAVendre(): ?bool
    {
        return $this->aVendre;
    }

    public function setAVendre(bool $aVendre): static
    {
        $this->aVendre = $aVendre;

        return $this;
    }

    public function getDateNaissance(): ?\DateTimeInterface
    {
        return $this->dateNaissance;
    }

    public function setDateNaissance(?\DateTimeInterface $dateNaissance): static
    {
        $this->dateNaissance = $dateNaissance;

        return $this;
    }

    /**
     * @return Collection<int, Photo>
     */
    public function getPhotos(): Collection
    {
        return $this->photos;
    }
    
    public function addPhoto(Photo $photo): static
    {
        if (!$this->photos->contains($photo)) {
            $this->photos->add($photo);
            $photo->setAnimal($this);
        }
    
        return $this;
    }
    
    public function removePhoto(Photo $photo): static
    {
        if ($this->photos->removeElement($photo)) {
            // set the owning side to null (unless already changed)
            if ($photo->getAnimal() === $this) {
                $photo->setAnimal(null);
            }
        }
    
        return $this;
    }
}