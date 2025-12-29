# Chat Bot Project

This project contains a backend server and a frontend client.

---

## How to Start the Project

---

## Backend Setup

1. Open a terminal.

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run database migrations:

   ```bash
   npm run migrate
   ```

5. Create a `.env` file inside the `backend` folder and add the following:

   ```env
   ROUTEWAY_API_KEY=API_KEY
   ```

6. Get your API key from:

   ```
   https://routeway.ai/dashboard
   ```

   Note: Routeway AI is free to use but responses can be slow.

7. Start the backend server:

   ```bash
   npm run dev
   ```

---

## Frontend Setup

1. Open a new terminal.

2. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the frontend development server:

   ```bash
   npm run dev
   ```

5. Open your browser and go to:

   ```
   http://localhost:5173/
   ```

---

## Notes

* Ensure the backend server is running before using the frontend.
* The SQLite database is created automatically after running migrations.
* Do not commit the `.env` file to version control.

---

## Tech Stack

* Backend: Node.js, Express, SQLite
* Frontend: React, Vite
* AI API: Routeway AI

