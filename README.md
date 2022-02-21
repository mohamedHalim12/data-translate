# Comorian Dataset for NMT | translation 🇫🇷\\|/🇰🇲

⭐ This project is set to create a dataset of sentences **🇫🇷 French - 🇰🇲 Comorian**.  
The platform shows to users Sentences in French and give to users the possibility of offering a Comorian translations.

- Final (Accepted) translations will be validate by privileged users (admins, master of comorian language).
- Criteria to become a privileged user will be release soon after a official V1

## Getting Started

{ First ⭐ star && ⚔️ Fork && Clone this repo }

```bash
git clone https://github.com/faouziMohamed/data-translate.git
```

Or

```bash
git clone git@github.com:faouziMohamed/data-translate.git
```

### Build tools

- Make sure to have NodeJs LTS version installed (node version 14+)
- For local development make sure to have MongoDB server installed or use the [docker-compose.yaml](docker-compose.yaml) to run the server

### ‼️ Make sure to have in `.env.*` files the required environment variables

- Rename the [.env.development.example](.env.development.example) file to `.env.development` after everything should be fine
- Rename the [.env.production.example](.env.production.example) file to `.env.production` for production build

## Install dependencies and run the development server

This project use yarn as package manager feel free to use npm.

```bash
# Install dependencies
yarn
```

```bash
# Run the development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<!-- Database initialization with smiley -->

## 🏋️‍♂️ Database initialization

If this is your first time to run the server, you need to initialize the database.  
To do so, you'll need to hit the following URL using a GET request (in a browser or your favorite REST client):

```
http://localhost:3000/api/data-init
```

or in a terminal with the following command:

```bash
curl -X GET http://localhost:3000/api/data-init
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## Deploy on Heroku (using a docker container)

This assumes you have a Heroku account and have a [Heroku app](https://dashboard.heroku.com/apps) created.

- Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- Run the following command to create a new Heroku app:

```bash
# Login to heroku container
heroku container:login

# Create a new app
# An url will be displayed after the app creation! This url will be used to visit the app
heroku create shikomori-fr

# Build and push the docker container to heroku
heroku container:push web

# Release the container to heroku
heroku container:release web
```

## Licence

[BSD-3-Clause License](LICENSE)
