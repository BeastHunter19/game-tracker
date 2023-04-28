# Game Tracker

Game Tracker is a web application to keep track of the games that you already played, the ones that are in your backlog and the ones that you want to keep an eye on. It also allows you to search for games by name, genre or popularity and see detailed information on each one.
You can also share your public profile with other people.
All the game data comes from the [IGDB](https://www.igdb.com/api) api.

## Technologies used

This repository contains both the frontend and backend for the application.

### Frontend

The frontend is a Single Page Application and has been made with the [Vue 3](https://vuejs.org/) framework and [Bootstrap](https://getbootstrap.com/). It also uses [Vue-router](https://router.vuejs.org/) for client-side routing, [Pinia](https://pinia.vuejs.org/) as a store manager, [Vite](https://vitejs.dev/) as project manager and [Axios](https://axios-http.com/) to make requests to the backend.

### Backend

The backend is a REST api built with [Express](https://expressjs.com/). It uses [Passport](https://www.passportjs.org/), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) and [bcryptjs](https://www.npmjs.com/package/bcryptjs) for user authentication, [mysql2](https://www.npmjs.com/package/mysql2) to interact with a Mysql database, [Axios](https://axios-http.com/) to make requests to the [IGDB](https://www.igdb.com/api) api and [nodemailer](https://nodemailer.com/about/) to send email verification links.

## Installation steps

1. Clone the repository:  
   `git clone https://github.com/BeastHunter19/game-tracker.git`
2. Change to the cloned directory:  
   `cd game-tracker`
3. Install the npm packages:  
   `npm install && cd client && npm install && cd ..`
4. Install [Mysql](https://www.mysql.com/) 8.0 version or higher from the official website (the community edition is fine)
5. Register with the IGDB api as developer by following the instructions [here](https://api-docs.igdb.com/#getting-started)
6. In the root folder of the project rename the .env.example file to .env and fill in the values in there. You can generate a jwt secret by running:  
   `node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"`
7. Run the server locally:  
   `npm start`  
   It will run on port 3000 by default. You can use [ngrok](https://ngrok.com/) to expose the server on the public network:  
   `ngrok http 3000`
8. Run the client locally:  
   `cd client && npm run dev:host`  
   You can put the dev server url in the .env file in the root folder as _FRONTEND_TEST_URL_ environment variable. If you only want to run the client locally like this you just need to create a .env file in the client folder with the environment variable _VITE_BACKEND_URL_ set to the server url (for example the ngrok public url if you're using that).
9. If you want to host the client somewhere to let other people access it you can fork the repo and put it on a service like [Vercel](https://vercel.com/home); a configuration vercel.json file is already provided in the client folder. If you want to host it somewhere else you will need to setup url rewrites since this is a Single Page Application: every path should be redirected to _/index.html_
