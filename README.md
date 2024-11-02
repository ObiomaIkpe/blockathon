# MetaMuse

## Overview
This backend is built to support real-time collaboration for a **collaborative drawing application**. It uses WebSocket connections to facilitate live drawing sessions where multiple users can see each other’s drawing updates instantly.

## Features
- **Real-time communication** via WebSocket
- **Data synchronization** for collaborative drawing
- **Event broadcasting** to all connected clients
- **Simple authentication** (if applicable, e.g., JWT tokens)

## Tech Stack
- **Server**: Node.js, Express
- **WebSocket**: `ws` (or Socket.IO, if preferred)
- **Database**: MongoDB (or any database if storing session data, user profiles, etc.)

## Prerequisites
- **Node.js** (v14+ recommended)
- **npm** or **yarn**
- **MongoDB** (optional, if using a database)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/backend-project-name.git
cd backend-project-name
```
2. Install Dependencies
```
bash
Copy code
npm install
# or
yarn install
```
3. Configuration
Create a .env file in the root directory with the necessary environment variables:

```
Copy code
PORT=3001
MONGO_URI=mongodb://localhost:27017/drawingApp  # Only if using MongoDB
JWT_SECRET=your_jwt_secret                       # Optional if using authentication
```
4. Running the Application
To start the server locally:
```
bash
Copy code
npm run dev
```
This will start the backend server on ```http://localhost:3001``` (or your specified port).

Project Structure
graphql
```
Copy code
backend-project-name/
│
├── src/
│   ├── controllers/             # Handlers for different endpoints
│   │   └── canvasController.js   # Logic for WebSocket events
│   ├── models/                  # Database models (if using MongoDB)
│   ├── routes/                  # Express routes (optional)
│   ├── utils/                   # Utility functions (e.g., WebSocket helpers)
│   ├── app.js                   # Express app setup
│   └── server.js                # Server and WebSocket setup
└── README.md                    # Project documentation
```
API Documentation
Endpoints (Optional)
POST /auth/login - Authenticates users and issues JWT tokens.
POST /auth/register - Registers new users (optional).
WebSocket Events
draw - Broadcasts the drawing data from one client to all other connected clients.
connect - Notifies when a new user connects to the WebSocket server.
disconnect - Handles user disconnection.
Key Code Snippets
Setting Up WebSocket Events
In server.js:


Scripts
```
npm start: Runs the server in production mode.
npm run dev: Runs the server in development mode with auto-reloading (using nodemon).
npm test: in progress (optional).
```
Testing
Use tools like Postman for API testing and WebSocket client tools to simulate real-time data.

Open a WebSocket client (e.g., the WebSocket extension in Postman or an online WebSocket tool).
Connect to the WebSocket server at ws://localhost:3001 (or the relevant server URL).
Emit drawing data to see if updates are broadcasted to all connected clients.
Contributing
Feel free to fork the repo and submit pull requests! Please make sure all code is tested and linted before submission.

License
This project is licensed under the MIT License.