# Cadi

Cadi is just an app that I made while learning `react-native (expo)`. This is a full stack app that includes signup, login, cookies, messaging, search functionality, cache invalidation and much more.

## How to run it

-   Start the `typescript` compilation:
    ```bash
    yarn watch
    ```
-   In another terminal window, start the backend<br/>
    Create a postgres database with the name `cadi` and change the `server/src/index.ts` with the correct postgres config of your system.

    ```bash
    yarn dev
    ```

-   Start the `react-native` app
    ```bash
    yarn ios # to run on ios simulator
    yarn android # to run on android simulator
    yarn web # to run on web
    ```

## Folder structure

| Folder             | Description                                |
| ------------------ | ------------------------------------------ |
| [app](app)         | The app built with `react-native`          |
| [server](server)   | The `graphQL` server built with `express`  |
| [.github](.github) | Github settings config. (eg. `CODEOWNERS`) |
| [.vscode](.vscode) | Project settings for `VSCode`              |

# Tech Stack

## Backend

-   NodeJS
-   Apollo-Server-Express
-   Typeorm
-   Postgres
-   Redis
-   Sessions
-   Cookies
-   GraphQL
-   Type-GraphQL

## Frontend

-   React Native
-   Expo
-   GraphQL-code-generator
-   React-navigation
-   Apollo Client

## Screenshots

![Screenshot](/assets/chat_screen.png)

![Screenshot](/assets/chat.png)

![Screenshot](/assets/login.png)

![Screenshot](/assets/register.png)

![Screenshot](/assets/messages.png)

![Screenshot](/assets/search.png)
