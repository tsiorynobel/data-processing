# DATA PROCESSING BACKEND

## Description

**DATA PROCESSING BACKEND** est une API backend construite avec **Express.js**. Elle permet de :
- Récupérer des données de transactions financières depuis l'API de **Bitmex**.
- Filtrer ces données selon des critères spécifiques (symbole, dates).
- Calculer des statistiques et la rentabilité des transactions.

### Endpoints principaux :
1. **Récupération des transactions** : Obtenez toutes les transactions de trade depuis l'API Bitmex.
2. **Calcul de rentabilité** : Calculez la rentabilité entre un prix initial et un prix final sur une période définie.
3. **Statistiques des transactions** : Calculez la moyenne, la médiane, le maximum et le minimum sur une période définie.

---

## Fonctionnalités

- **Récupération des trades** : Obtenez toutes les transactions disponibles via l'API Bitmex.
- **Filtrage des données** : Filtrez les transactions par symbole et par période (startTime et endTime).
- **Calcul de rentabilité** : Calculez la rentabilité d'un actif financier entre deux prix définis.
- **Statistiques avancées** : Obtenez des métriques comme la moyenne, la médiane, le maximum et le minimum des transactions.

---

## Prérequis

Avant de commencer, assurez-vous que vous avez installé ou configuré les éléments suivants :

- **Node.js** (version 22.12.0 ou supérieure)
- **npm** (gestionnaire de paquets Node.js)
- **SQLite** (version 3)
- Modules requis : `express`, `axios`, `sequelize`, `sqlite3`, `dotenv`
- Une connexion Internet stable
- Un éditeur de code (par exemple, VS Code ou PyCharm)
- **Postman** (ou un outil équivalent) pour tester les endpoints API

---

## Installation

1. Clonez ce dépôt sur votre machine locale :
   ```bash
   git clone git@github.com:tsiorynobel/dataProcessingBackEnd.git
   cd dataProcessingBackEnd
   ```

2. Installez les dépendances nécessaires :
   ```bash
   npm install
   ```

3. Configurez la base de données SQLite :
   ```bash
   npm install sequelize sqlite3 dotenv
   ```

4. Lancez le serveur backend :
   ```bash
   node server.js
   ```

---

## Notes supplémentaires

- Testez les endpoints avec **Postman** ou un outil similaire pour valider leur bon fonctionnement.
- Assurez-vous que votre base de données SQLite est correctement configurée avant de lancer le serveur.

---
