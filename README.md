# DATA PROCESSINGBACKEND

## Description
**DATA PROCESSINGBACKEND** est une API backend construite avec **Express.js** qui permet de récupérer des données de transactions financières depuis l'API de Bitmex, de filtrer ces données en fonction de critères spécifiques (symbole, dates), et de calculer la rentabilité des transactions.

Le projet expose deux endpoints principaux :
1. Un endpoint pour récupérer toutes les transactions.
2. Un endpoint pour calculer la rentabilité entre un prix initial et un prix final sur une période définie.

## Fonctionnalités
- **Récupération de tous les trades** : Permet d'obtenir toutes les transactions de trade depuis l'API Bitmex.
- **Filtrage des trades** : Permet de filtrer les transactions selon le symbole et la période (startTime et endTime).
- **Calcul de rentabilité** : Calcule la rentabilité d'un actif financier entre un prix initial et un prix final.

## Prérequis
Avant de commencer, assurez-vous que vous avez installé les éléments suivants :
- **Node.js** (version 22.12.0)
- **npm** (gestionnaire de paquets Node.js)
- **BDD:SQLITE** (version 3)
- Modules : `express`, `axios`
- Une connexion Internet.
- Un éditeur de code (VS Code, PyCharm, etc.).
- Postman (ou un équivalent) installé.


## Installation
1. Clonez ce dépôt sur votre machine locale :
 -  git clone git@github.com:tsiorynobel/dataProcessingBackEnd.git  
 -  cd dataProcessingBackEnd
 -  Lancez la commande : npm install
 -  Pour demarer le server: node server.js
 -  Installation de SQLITE: npm install sequelize sqlite3 dotenv


