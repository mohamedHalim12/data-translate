# Comorian Dataset for NMT | translation 🇫🇷\\|/🇰🇲

⭐ This project is set to create a dataset of sentences **🇫🇷 French -  🇰🇲 Comorian**.  
The platform shows to users Sentences in French and give to users the possibility of offering a Comorian translations.  


- Final (Accepted) translations will be validate by privileged users (admins, master of comorian language).
- Criteria to become a privileged user will be release soon after a official V1



## Getting Started

{ First ⭐ star && ⚔️ Fork &&  Clone this repo  }


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

### Install dependencies and run the development server
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

## Licence
[BSD-3-Clause License]( LICENSE )
