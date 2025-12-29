````md
# Chat Bot Project

This project consists of a **Backend** (Node.js + SQLite) and a **Frontend** (Vite + React).

Follow the steps below to run the project locally.

---

## 🚀 How to Start

---

## 🖥️ Backend Setup

1. **Open terminal**
2. Navigate to the backend folder:
   ```bash
   cd backend
````

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run database migrations:

   ```bash
   npm run migrate
   ```

5. Create a `.env` file inside the `backend` folder and add:

   ```env
   ROUTEWAY_API_KEY=API_KEY
   ```

   🔗 Get your API key from:
   [https://routeway.ai/dashboard](https://routeway.ai/dashboard)

   > Note: Routeway AI is free to use, but responses may be slow.

6. Start the backend server:

   ```bash
   npm run dev
   ```

---

## 🌐 Frontend Setup

1. **Open a new terminal**

2. Navigate to the frontend folder:

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

5. Open your browser and visit:

   ```
   http://localhost:5173/
   ```

---

## ✅ Notes

* Make sure the backend server is running **before** sending messages from the frontend.
* SQLite database is created automatically when migrations run.
* `.env` file should **not** be committed to version control.

---

## 📦 Tech Stack

* **Backend:** Node.js, Express, SQLite
* **Frontend:** React, Vite
* **AI API:** Routeway AI

---

Happy Coding! 🚀

```
```
