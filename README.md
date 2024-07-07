# Formula One Project Documentation

This document provides instructions for running the Formula One project locally, using Docker, and deploying it to GitHub Pages.

## Table of Contents

- [Running Locally](#running-locally)
- [Running with Docker](#running-with-docker)
  -- [Development Mode](#development-mode)
  -- [Production Mode](#production-mode)
- [Deploying to GitHub Pages](#deploying-to-github-pages)
- [Notes](#notes) - [Scripts](#scripts)

## Running Locally

### Prerequisites:

- Node.js (v14 or later)
- npm (v6 or later)

### Steps:

Clone the repository:

```Bash
git clone https://github.com/shaantalk/formula-one.git
cd formula-one
```

Install dependencies:

```Bash
npm install
```

Start the development server:

```Bash
npm start
```

The application will be running on http://localhost:3000.

## Running with Docker

### Prerequisites:

- Docker
- Docker Compose

### Development Mode:

Clone the repository:

```Bash
git  clone  https://github.com/shaantalk/formula-one.git
cd  formula-one
```

Run the Docker container:

```Bash
docker-compose  -f  docker-compose.dev.yml  up  --build
```

The application will be running on http://localhost:3000.

### Production Mode:

Clone the repository:

```Bash
git  clone  https://github.com/shaantalk/formula-one.git
cd  formula-one
```

Run the Docker container:

```Bash
docker-compose  -f  docker-compose.prod.yml  up  --build
```

The application will be running on http://localhost: (port may differ depending on configuration).

## Deploying to GitHub Pages

### Prerequisites:

- Ensure you have gh-pages installed as a development dependency:

```Bash
npm  install  gh-pages  --save-dev
```

### Steps:

Build the project for production:

```Bash
npm  run  build:prod
```

Deploy to GitHub Pages:

```Bash
npm  run  deploy
```

Notes:
Ensure that the homepage field in your package.json is set to the correct GitHub Pages URL. For example:

```JSON
"homepage": "https://<your-username>.github.io/formula-one"
```

## Scripts

The project provides various npm scripts for different tasks:

`npm start:` Starts the development server.
`npm run build:` Builds the project with TypeScript and ESLint errors ignored.
`npm run build:prod:` Builds the project for production.
`npm run build:dev:` Builds the project for development.
`npm run deploy:` Deploys the project to GitHub Pages.
`npm run serve:` Serves the production build locally.
