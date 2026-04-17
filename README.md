# Notes Management API 📝

A clean, production-ready RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing personal notes. This project follows the **MVC (Model-View-Controller)** architecture and uses a custom numeric ID system.

## 🚀 Features
- **Custom Numeric IDs**: Uses simple integers (1, 2, 3) for primary keys instead of default ObjectIDs.
- **Bulk Operations**: Create and delete multiple notes in a single request.
- **Strict Validations**: Numeric ID validation and specific error handling for all routes.
- **Robust JSON Parsing**: Middleware to handle malformed JSON and return standard error responses.
- **Timestamps**: Automatic tracking of creation and update times for every note.

## 🛠️ Technology Stack
- **Backend**: Node.js, Express.js (v5.0+)
- **Database**: MongoDB with Mongoose (v9.0+)
- **Environment**: dotenv for configuration
- **Middleware**: CORS enabled for cross-origin requests
- **Dev Tools**: Nodemon for automatic server restarts

## 📂 Folder Structure
```text
notes-app/
├── src/
│   ├── config/          # Database connection setup
│   ├── controllers/     # Route logic and DB queries
│   ├── models/          # Mongoose schema definitions
│   ├── routes/          # API route definitions
│   ├── middlewares/     # Custom error handlers and logic
│   ├── app.js           # Express app setup & middleware
│   └── index.js         # Entry point (Server listener)
├── .env                 # Environment variables (Private)
├── .env.example         # Environment variables template
├── package.json         # Dependencies and scripts
└── README.md            # Documentation
```

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TrikamDevasi/backend_assignment.git
   cd notes-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Run the application**:
   - Production mode: `npm start`
   - Development mode: `npm run dev`

## 📡 API Endpoints

### Base URL: `/api/notes`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/notes` | Create a single note (requires `id` in body) |
| `POST` | `/api/notes/bulk` | Create multiple notes (requires `notes` array) |
| `GET` | `/api/notes` | Fetch all notes from the database |
| `GET` | `/api/notes/:id` | Fetch a single note by numeric ID |
| `PUT` | `/api/notes/:id` | Replace a note completely (all fields required) |
| `PATCH`| `/api/notes/:id` | Update specific fields only (partial update) |
| `DELETE`| `/api/notes/:id` | Delete a single note by ID |
| `DELETE`| `/api/notes/bulk`| Delete multiple notes (requires `ids` array) |

## 📖 Documentation
Detailed Postman Documentation: [View Here](https://documenter.getpostman.com/view/50840761/2sBXqDsNUP)

## 📄 License
This project is licensed under the ISC License.
