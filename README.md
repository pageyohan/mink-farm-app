# 🐄 Application de gestion – Élevage Jones

Cette application développée pour l'exercice technique de Mink Agency permet aux clients de M. Jones de consulter les animaux disponibles à la vente, et à M. Jones de gérer l’ensemble de son élevage via une interface d’administration dédiée.

---

## 🔧 Installation

### Prérequis

- PHP 8.2 ou supérieur  
- Composer  
- Node.js 18+  
- MariaDB 10.4+  
- Symfony CLI  

> 💡 Initialement, j'avais prévu d'utiliser Docker pour ce projet, mais suite à plusieurs problèmes de configuration qui ont ralenti le développement, j'ai opté pour un serveur Xampp classique. Cette solution s'est avérée plus simple et plus rapide pour cet exercice technique.

---

### Installation du Backend

```bash
git clone https://github.com/pageyohan/mink-farm-app/
cd mink-farm-app
git checkout master
cd backend
composer install
```

#### Configuration base de données

- Le fichier `.env` contient une configuration par défaut.
- Pour une configuration personnalisée, adapter les identifiants de base de données.

```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load
# Répondre "yes" lors de l'exécution
symfony serve
```

---

### Installation du Frontend

```bash
cd frontend
npm install
npm run dev
```

- Frontend : http://localhost:5173  
- API : http://localhost:8000/api  

---

### Identifiants de connexion (données de démonstration)

- **Email** : `admin@mjones.com`  
- **Mot de passe** : `password`  

---

## 🧩 Dépannage

Si une erreur du type `Unknown column 'nom' in 'field list'` apparaît :

```bash
php bin/console doctrine:schema:update --force
# ou :
php bin/console doctrine:migrations:diff
php bin/console doctrine:migrations:migrate
```

Vérifier ensuite la validité du schéma :

```bash
php bin/console doctrine:schema:validate
```

---

## 🏗 Structure du projet

### Technologies utilisées

- Backend : Symfony 7.2 + API Platform  
- Frontend : React (Vite)  
- UI : TailwindCSS + composants ShadCN  
- Authentification : JWT  

---

## ✨ Fonctionnalités

### Partie publique

- Listing des animaux à vendre :
  - Filtres (type, race, prix)
  - Tri (âge, prix)
  - Recherche par mot-clé
- Fiches détaillées :
  - Galerie photo
  - Informations (race, âge, description)
  - Prix HT/TTC
  - Bouton de contact

### Partie administration

- Authentification sécurisée (JWT)
- Gestion des animaux (ajout, modification, suppression)
- Changement rapide du statut (à vendre / vendu)
- Gestion des photos (upload multiple, photo principale, description)

---

## 🧭 Guide d'utilisation

### Interface client

1. Accéder à la liste des animaux via "Voir nos animaux".
2. Utiliser les filtres pour affiner la recherche.
3. Cliquer sur "Détails" pour consulter une fiche complète.
4. Contacter via le bouton dédié.

### Interface d’administration

1. Se connecter via le lien "Administration".
2. Accéder à l’ensemble des animaux via le tableau de bord.
3. Ajouter, modifier ou supprimer un animal.
4. Gérer les statuts et les photos.

---

## 🧠 Décisions techniques

### Architecture

Le choix d’une architecture avec séparation frontend/backend permet :
- Une évolution indépendante des deux parties
- Une maintenance facilitée
- Une meilleure performance côté utilisateur

### API Platform

Utilisé pour :
- La génération automatique des endpoints REST
- La documentation de l’API (bien que l’interface Swagger n’ait pas pu être affichée correctement, les endpoints sont testables via Postman/Bruno/Insomnia)

### Organisation du frontend

- **Pages** : Composants de haut niveau (`HomePage`, `AnimalDetailPage`, etc.)
- **Components** : Éléments réutilisables (`Navbar`, `Footer`, etc.)
- **Services** : Appels API (`AnimalApi`, `AuthApi`, etc.)

### Librairies choisies

- **ShadCN UI** : Composants accessibles et modernes
- **TailwindCSS** : Pour une interface cohérente et rapide à développer
- **React Router** : Navigation fluide entre les pages

### IA utilisée

L’intelligence artificielle a été utilisée pour :
- Aider à la rédaction de certaines fonctions utilitaires / debugging / avis sur certaines prises de décisions
- Suggérer des optimisations pour les requêtes API
- Troubleshooting par rapport au Swagger API Platform

> Tous les éléments générés ont été vérifiés, testés et adaptés manuellement pour garantir la qualité du code.

---

## ⚠️ Points bloquants rencontrés

1. **Environnement Docker**  
   - Problèmes : réseau, volumes, permissions  
   - Solution : Passage à Xampp 

2. **Authentification JWT**  
   - Problème de configuration initiale du `LexikJWTAuthenticationBundle`  
   - Solution : Réécriture des appels API pour injecter correctement le token dans les headers Authorization

3. **Relations dans API Platform**  
   - Problème : références circulaires  
   - Solution : configuration des groupes de normalisation

---

## 📁 Historique Git

L’historique du dépôt peut sembler incomplet pour la partie backend. Cela s’explique par un changement de dépôt suite aux difficultés rencontrées avec Docker. Le backend initialement développé dans un autre repository a été intégré ici sans l’historique complet.

---

## 📈 Améliorations possibles

1. Fonctionnalités supplémentaires
   - Système de réservation
   - Statistiques et visualisations
   - Export PDF des fiches

2. Sécurité
   - Passage du JWT dans un cookie HttpOnly
   - Implémentation d’un refresh token

3. Tests
   - Tests unitaires (React)
   - Tests automatisés de l’API

---

## ⏱ Temps passé

- Analyse / conception : 4h  
- Docker : 3h  
- Xampp : 30 min  
- Backend (Symfony/API Platform) : 6h  
- Frontend (React/Tailwind) : ~13h  
- Tests & recettage : 3h  
- Documentation : 1h  

**Total : 30h30**

---

## ✅ Conclusion

Le projet répond au cahier des charges, tant sur le plan fonctionnel que technique. L’architecture mise en place permet des évolutions futures sans refonte majeure, tout en assurant une bonne maintenabilité.
