# 🚀 Express Backend Project

This is a backend project built with **JavaScript** using the **Express** framework.

The chosen database is **MongoDB**.

---

## 🛠️ Getting Started

To run this project locally, follow these steps:

1. **Install dependencies**
   ```bash
   npm install

2. **Start the project**
   ```bash
   npm start

> ⚠️ Make sure to create a `.env` file at the root of your project before starting.

---

## 🔧 Environment Variables

The application requires a `.env` file with the following environment variables:

| Variable | Description |
|----------|-------------|
| `PORT`   | The port on which the API will run (e.g., `3000`) |
| `DB_URL` | The connection URL to the MongoDB database |

Example `.env` file:

```env
PORT=3000
DB_URL=mongodb://localhost:27017/my-database

## 📚 Technologies Used

- **Node.js**
- **Express**
- **MongoDB**
- **dotenv**
