# Fullstack template

This is a template for small fullstack projects. It is based on svelte, express, and mongoDB, with support for AWS hosting. Routing for svelte is done with the `svelte-routing` package. Larger projects should rely on something mroe sophisticated, like Sapper.

## Installation

1. Clone the repo
2. Add your web app firebase config to `./frontend/src/services/firebase.js` on line 7. **Note:** this project uses both email/password login and google auth login. These must be enabled in your firebase project or it will cause issues. Removing them is as simple as removing the export in the frontend `./src/service/firebase.js` file and in the frontend `./src/components/SignInForm.svelte` file (remove the imports, functions, and buttons)
3. create a `.env` file in the `/backend/` folder
   1. add `GOOGLE_APPLICATION_CREDENTIALS=<PATH TO FIREBASE ADMIN SDK KEY JSON>`
   2. add `DB_URI=<MONGODB SRV CONNECTION STRING>`

`.gitignore` will ignore anything in the `./backend/google/` and `.env` this allows for a convenient place to store things like google service account keys.

## Usage

the npm scripts for the frontend are the standard svelte npm scripts
the backend has npm scripts to start the server (as well as a nodemon version to start a dev server) and a lint lint file.

## License
[MIT](https://choosealicense.com/licenses/mit/)