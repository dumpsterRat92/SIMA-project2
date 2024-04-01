# GameQuest

## Overview
Welcome to GameQuest! This website is designed to help you organize and enjoy game nights with your friends and family. Whether you're a board game enthusiast or just looking for some fun activities to do together, this platform has got you covered. With features like game categorization, score tracking, and easy-to-use spreadsheets, planning your game night has never been easier.

## Getting Started
1. **Clone the Repository**: 
git clone https://github.com/dumpsterRat92/SIMA-project2.git
2. **Install Dependencies**:
npm install
3. **Database Setup**: Set up your MySQL database by running the schema provided in 'db/schema.sql'.
4. **Configure Environment Variables**: Create a '.env' file in the root directory and add your environment variables such as API keys and database credentials.
5. **Start the Server**:
node server.js
6. **Explore the Website**: Open your web browser and navigate to 'http://localhost:3001' to start exploring the GameQuest website~!
## File Structure
- **config/**
  - `config.js`: Sequelize configuration to connect to your MySQL database.
- **controllers/**
  - `gamesController.js`: Controller for game-related routes.
  - `usersController.js`: Controller for user-related routes.
- **db/**
  - `schema.sql`: MySQL database schema.
- **models/**
  - `index.js`: Imports all models and exports them.
  - `game.js`: Game model.
  - `user.js`: User model.
- **node_modules/**: Created by npm. Holds all your project dependencies.
- **public/**
  - **assets/**
    - **css/**: Stylesheets.
    - **js/**: Front-end JavaScript.
  - **images/**: Store images for your UI.
- **views/**
  - **layouts/**
    - `main.handlebars`: Main layout.
  - **partials/**
    - `game.handlebars`: Partials for game elements.
  - `home.handlebars`: Home page template.
  - `dashboard.handlebars`: User dashboard template.
- `.env`: Environment variables (API keys, DB credentials).
- `.gitignore`: Specifies intentionally untracked files to ignore.
- `package.json`: Project manifest.
- `server.js`: Entry point of your application.


Enjoy your game night with GameQuest!  🎲



