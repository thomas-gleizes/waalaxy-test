# Walaxy-test

## Requirements

- [Node.js](https://nodejs.org/fr/)
- [npm](https://www.npmjs.com/)

## Launch

```bash
npm install
npm run dev
```

## Description

Le projet est un monorepo qui contiens 2 packages et 2 apps

## Packages

Dans le dossier packages se trouve 2 packages qui sont des utilitaire pour les apps

### @walaxy-test/fifo

C'est un utilitaire qui permet de créer une file d'attente FIFO (First In First Out)

### @walaxy-test/utils

C'est un utilitaire met a disposition des fonctions utiles pour les apps, des schema zod pour de la validation et des types typescript

## Apps

Dans le dossier apps se trouve 2 apps qui sont l'api express et le client react

### server

C'est une api express qui permet de créer des utilisateurs et de les authentifier
et de gérér des files d'attentes FIFO

### client

C'est une app react qui permet de créer des utilisateurs et de les authentifier
et de gérér leur files d'attentes FIFO
