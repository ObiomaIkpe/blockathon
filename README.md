#### BACKEND API FOR TEAM CODEX - BLOCKATHON


## Introduction
This project is a backend server for a real-time collaborative drawing application. It allows multiple users to draw simultaneously on a shared canvas, facilitating creativity and collaboration.

## Problem Statement
The project aims to solve two problems: 1). Difficulty of real-time artist collaboration digitally. 2). Enabling seamless, on-chain payments. This eliminates the need for third-party intermediaries, allowing artists to collaborate and transact directly in a decentralized manner.

## Features
- Real-time drawing updates
- User authentication
- On-chain payment integration
- Undo and redo functionality
- Support for multiple drawing tools (pen, eraser, shapes)
- Color selection and fill options
- Canvas sharing with unique room IDs

## Technologies Used
- **Node.js**: For the server-side application
- **Express**: To handle HTTP requests
- **Socket.IO**: For real-time communication and drawing functionality
- **MongoDB**: For data management and user data storage
- **Postman**: For testing API endpoints
- **VSCode**: For code editing and development
- **Render.com**: For hosting the API

## Installation
To set up the project locally, follow these steps:

 Clone the repository:
   ```
   
   bash
   git clone https://github-url-goes-here
Navigate to the project directory:

cd 
npm install

Set up environment variables: Create a .env file in the root directory and add your configurations (e.g., database URL, JWT secret).

Start the server:


npm run dev
```


##### NB: As at the time of this push, some painting room features have not yet been implemented. 
- annoucing activity of other artists in the virtual drawing room.
- ensuring that only authorized users can join rooms.

##### The final artwork will be minted on-chain, and the payment too will be done on-chain.



### Routes
######  sign-up route 
- localhost:3000/sign-up

######  login route 
- localhost:3000/login

######  login route 
- localhost:3000/createCanvas

