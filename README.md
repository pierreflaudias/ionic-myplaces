# Ionic my places

## Installation

```bash
git clone https://github.com/pierreflaudias/ionic-myplaces && cd ionic-myplaces
npm install
ionic state restore
ionic run android
```

## Réalisations

- Une application permettant d'ajouter des lieux dans une BDD locale.
- Les lieux sont affichés sur une Google Maps
- 1 écran pour la map et l'ajout de lieu, 1 écran pour la liste des lieux et 1 écran pour afficher un lieu
- Ajout de lieu avec un titre, une longitude et une latitude

## Composants utilisés

- Geolocation
- GoogleMaps
- Native Storage
- Diagnostic

## Problèmes rencontrés

- L'application fonctionnait très bien au début (ajout et affichage sur la map fonctionnels)
- Mais ne fonctionnait plus à l'IUT...
- Problème avec le plugin Geolocation (connexion Internet, dépend du téléphone...) plus ou moins résolu
- Problème d'affichage avec le plugin GoogleMaps : utilisation du SDK JavaScript
- Problème de versions d'Android ou version d'Ionic/Cordova (fonctionnement différent)
- Manque de temps et d'exemples pour les tests unitaires
