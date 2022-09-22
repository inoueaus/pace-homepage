# About this Project

The purpose of this project is to build a website for the Pace Coffee farm in Nago, Okinawa.

# License

This project is licensed under the MIT license.

# Getting Started

## Frontend

App Check registration is necessary for access from localhost. App check debug token is logged in the console.

```
App Check debug token: d20ef0.........9836. You will need to add it to your app's App Check settings in the Firebase console for it to work.

```

## Dev Server

This application is set up to use the [Firebase Emulator Suite](https://firebase.google.com/docs/emulator-suite/connect_and_prototype).

You must install [Java](https://www.oracle.com/java/technologies/downloads/) to use it.

```
yarn emulate
yarn install
yarn start
```

# Deployment

```
firebase login
firebase deploy
```

# Cypress

Cypress requires a cypress.env.json file with a email and password value.

App check also must be registered for cypress browser
