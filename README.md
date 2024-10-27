# 🌐 FullStackOpen Project


## 🚀 About the Project

This repository contains my solutions and implementations for the **FullStackOpen** course, which is provided by the University of Helsinki. The course covers modern web development techniques, focusing on building full-stack applications with **React**, **Node.js**, **Express**, and **MongoDB**.

Throughout this course, I've gained knowledge on:

- Building single-page applications using **React**
- Building a backend with **Node.js** and **Express**
- Managing databases with **MongoDB**
- Handling user authentication and session management
- Writing unit and integration tests for frontend and backend

## 🛠️ Technologies Used

- **Frontend:** React, Redux, HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Express, MongoDB
- **Testing:** Jest, Cypress
- **Version Control:** Git & GitHub
- **Deployment:** Heroku, Netlify, Docker

---

## 📂 Project Structure

```plaintext
📦 FullStackOpen
 ┣ 📂 client
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📜 App.js
 ┃ ┃ ┣ 📜 index.js
 ┃ ┃ ┗ 📜 ...
 ┣ 📂 server
 ┃ ┣ 📂 controllers
 ┃ ┣ 📂 models
 ┃ ┣ 📂 routes
 ┃ ┗ 📜 server.js
 ┣ 📜 README.md
 ┗ 📜 package.json
client/: Contains all the frontend code.
server/: Contains backend code, including API routes and database models.
⚙️ Getting Started
To get a local copy of the project up and running, follow these steps:

Prerequisites
Node.js and npm installed on your machine.
MongoDB running locally or hosted on a cloud provider.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/fullstackopen.git
cd fullstackopen
Install dependencies for both frontend and backend:

bash
Copy code
cd client
npm install
cd ../server
npm install
Set up your .env file in the server folder with the following variables:

plaintext
Copy code
MONGODB_URI=your_mongodb_uri
PORT=your_port
Running the Application
Start the backend server:

bash
Copy code
cd server
npm run dev
Start the frontend development server:

bash
Copy code
cd client
npm start
The application should now be running at http://localhost:3000 for the frontend and http://localhost:your_port for the backend.

📈 Progress
Here’s a list of the course parts completed in this repository:

 Part 0: Fundamentals of Web Apps
 Part 1: Introduction to React
 Part 2: Communicating with Server
 Part 3: Programming a Server with NodeJS and Express