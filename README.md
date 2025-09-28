
# Projet de conception d'application mobile  
Application Nest.js pour la visualisation des événements culturels de la métropole Aix-Marseille.

## Objectif
Cette application permet à l'utilisateur de :
- récupérer des données sur les événements culturels de la métropole Aix-Marseille,  
- obtenir des informations détaillées sur un événement,  
- découvrir les événements proches de sa position.

## Endpoints principaux

### Liste de tous les événements chargés dans l'application
**GET**  
https://app-3102c7c0-32d2-42a0-a764-d00a197fa50c.cleverapps.io/events  

### Détails d’un événement
**GET**  
https://app-3102c7c0-32d2-42a0-a764-d00a197fa50c.cleverapps.io/events/:objectid  

### Ajouter un événement
**POST**  
https://app-3102c7c0-32d2-42a0-a764-d00a197fa50c.cleverapps.io/events  

### Supprimer un événement
**DELETE**  
https://app-3102c7c0-32d2-42a0-a764-d00a197fa50c.cleverapps.io/events/:objectid  

### Gestion des favoris

- affichage: **GET** https://app-3102c7c0-32d2-42a0-a764-d00a197fa50c.cleverapps.io/events/favoris  
- ajout: **POST** https://app-3102c7c0-32d2-42a0-a764-d00a197fa50c.cleverapps.io/events/favoris/:objectid  
- suppression**POST** https://app-3102c7c0-32d2-42a0-a764-d00a197fa50c.cleverapps.io/events/exfavoris/:objectid  
Les favoris sont gérés avec un booléen que nous avons ajouter à notre interface
### Recherche par code postal
**GET**  
https://app-3102c7c0-32d2-42a0-a764-d00a197fa50c.cleverapps.io/events/loc/:code  

### Recherche autour d’une position
**GET**  
https://app-3102c7c0-32d2-42a0-a764-d00a197fa50c.cleverapps.io/events/autourde?lat=\<latitude>&lon=\<longitude>&rayon=\<km> \
Pour la recherche autour d'une position nous nous sommes servis des coordonnées latitude, longitude et de la formule d'Haversine qui permet de calculer la distance entre 2 points ces coordonnées. 

## Test, déploiment et dépôt Git

**Test** \
Les Tests unitaires de toutes les fonctionnalitées sont disponibles dans le fichier app.e2e.spec.ts, ainsi que les tests globaux.

**Déploiment** \
La dernière version de l'application est disponible sur le serveur clevercloud

**Dépôt Git** \
Le dépôt contient 3 branches, la branche main contient la version la plus à jour de l'application mais nous avons tout de même conserver nos branches de test au cas où.


