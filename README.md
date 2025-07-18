# 🎮 Scylox Game Catalog

![Project Screenshot](/screenshot.png)

A modern game catalog application with CRUD functionality, built with Node.js, Express, MongoDB, and Tailwind CSS.

## ✨ Features

- **Full CRUD Operations** - Create, Read, Update, Delete games
- **Modern UI** - Sleek dark theme with responsive design
- **Interactive Elements**:
  - Animated game cards
  - Smooth modal transitions
  - Hover effects

## 🛠️ Tech Stack

**Backend**:
- Node.js
- Express
- MongoDB
- Mongoose

**Frontend**:
- Tailwind CSS
- Font Awesome
- Vanilla JavaScript

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Scylox56/game-catalog.git
   cd game-catalog
2. Install dependencies:
    npm install
   
3. Set up environment variables:
    echo "MONGODB_URI=mongodb://localhost:27017/game-catalog" > .env
    echo "PORT=5000" >> .env

4. Start the development server:
    npm run server

## 📂 Project Structure

```text
game-catalog/
├── server/               # Backend code
│   ├── models/           # MongoDB schemas
│   │   └── Game.js       # Game model
│   ├── routes/           # API endpoints
│   │   └── games.js      # Game routes
│   └── server.js         # Express server
├── public/               # Frontend assets
│   ├── css/
│   │   └── styles.css    # Custom styles
│   ├── js/
│   │   ├── main.js       # Core functionality
│   │   ├── gameForm.js   # Form handling
│   │   └── animations.js # UI effects
│   └── index.html        # Main page
├── .env                  # Environment config
├── .gitignore            # Ignored files
└── package.json          # Dependencies
```

