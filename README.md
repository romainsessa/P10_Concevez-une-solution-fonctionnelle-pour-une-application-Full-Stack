# YCYW Chat POC

## Contexte

Ce projet est une preuve de concept (POC) réalisée dans le cadre de la modernisation du système d'information de Your Car Your Way (YCYW).

L'objectif est de valider la faisabilité technique d'une fonctionnalité de chat en temps réel entre un utilisateur et un agent du support client.

Cette preuve de concept permet de démontrer :

- la communication temps réel entre un frontend Angular et un backend Spring Boot ;
- l'utilisation des WebSockets pour réduire la latence des échanges ;
- la compatibilité des technologies retenues dans l'architecture cible ;
- la viabilité des choix architecturaux avant un développement à grande échelle.

---

## Périmètre du POC

Fonctionnalités implémentées :

- Sélection d'un rôle : Utilisateur ou Support
- Envoi de messages en temps réel
- Réception des messages en temps réel
- Horodatage des messages
- Diffusion des messages via WebSocket

Fonctionnalités volontairement non implémentées :

- Authentification
- Autorisation
- Persistance des messages
- Historique des conversations
- Gestion de plusieurs salons
- Notifications
- Chiffrement avancé

---

## Technologies utilisées

### Frontend

- Angular 21
- TypeScript
- STOMP JS

### Backend

- Java 25
- Spring Boot 4.1.1
- Spring WebSocket
- STOMP

---

## Architecture

```text
+----------------+
| Angular USER   |
+----------------+
        |
        | WebSocket (STOMP)
        |
+----------------+
| Spring Boot    |
+----------------+
        |
        | WebSocket (STOMP)
        |
+----------------+
| Angular SUPPORT|
+----------------+
```

---

## Structure du projet

### Backend

```text
ws/
├── config
│   └── WebSocketConfig.java
├── controller
│   └── ChatController.java
├── model
│   └── ChatMessage.java
└── WsApplication.java
```

### Frontend

```text
front/
├── src
│   ├── app
│   │   ├── core
│   │   │   └── services
│   │   │       └── websocket.service.ts
│   │   ├── models
│   │   │   └── chat-message.ts
│   │   └── pages
│   │       ├── home
│   │       └── chat
│   └── public
│       └── Logo YCYW.png
```

---

## Prérequis

### Backend

- Java 25
- Maven 3.9+

### Frontend

- Node.js 24.x
- npm 11.x
- Angular CLI 21

---

## Démarrage du backend

Depuis le dossier :

```bash
cd ws
```

Lancer l'application :

```bash
mvn spring-boot:run
```

Le backend démarre sur :

```text
http://localhost:8080
```

Endpoint WebSocket :

```text
ws://localhost:8080/ws
```

---

## Démarrage du frontend

Depuis le dossier :

```bash
cd front
```

Installer les dépendances :

```bash
npm install
```

Lancer l'application :

```bash
ng serve
```

Le frontend est accessible sur :

```text
http://localhost:4200
```

---

## Comment tester le POC

1. Démarrer le backend Spring Boot.
2. Démarrer le frontend Angular.
3. Ouvrir deux fenêtres de navigateur.
4. Dans la première fenêtre, choisir « Utilisateur ».
5. Dans la seconde fenêtre, choisir « Support ».
6. Envoyer des messages depuis chaque fenêtre.

Résultat attendu :

- les messages apparaissent dans les deux fenêtres ;
- les messages sont diffusés en temps réel ;
- le backend journalise les échanges.

---

## Flux technique

### Envoi d'un message

Frontend :

```text
/app/send
```

Backend :

```java
@MessageMapping("/send")
```

### Diffusion

Topic :

```text
/topic/messages
```

Abonnement Angular :

```text
/topic/messages
```

---

## Limites du POC

Cette preuve de concept a pour objectif de valider la communication temps réel.

Dans une architecture de production, les évolutions suivantes seraient envisagées :

- authentification JWT ;
- sécurisation des WebSockets (WSS) ;
- gestion des rôles utilisateur/support ;
- persistance des conversations ;
- base de données ;
- historique des messages ;
- gestion de plusieurs sessions de chat.

---

## Auteur

Romain Sessa