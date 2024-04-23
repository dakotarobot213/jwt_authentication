# JWT Authentication Project

This is a project developed to learn and develop skills in utilizing <abbr title="JSON Web Tokens">JWTs</abbr> for web logins.

## Authors

-   [dakotarobot213](https://github.com/dakotarobot213)

## Installation

> Before starting the server, please consider configuring [a `.env` file](#environment-variables)

Before attempting to start the project, please run `npm i` to install dependencies.

## Running

To start the development version of the project server you must enter one of the following into the terminal:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

While the project has fallbacks for these variables, for proper understanding and security it is recommend you should initialize these environmental variables in a root level
`.env`

-   `NAME` : Just a display name
-   `EMAIL` : Used to login
-   `PASSWORD` : Used to login
-   `TIMEOUT_SEC` : How long the JWT should last in seconds
-   `SECRET_KEY` : Used to encrypt transmissions, should be scrambled garbage for best effect.

## Acknowledgements

-   [next](https://nextjs.org/)
-   [jose](https://github.com/panva/jose)
-   [react](https://react.dev/)
    -   [react-dom](https://www.npmjs.com/package/react-dom)
