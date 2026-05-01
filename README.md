# 🚀 Mohit's Developer Portfolio

A full-stack, CMS-powered developer portfolio built with **React (Vite)** on the frontend and **Node.js / Express / MongoDB** on the backend. Projects are managed via a private admin dashboard and project images are stored on **Cloudinary**.

---

## 📸 Features

- **Dynamic Projects** — All projects are stored in MongoDB and fetched via REST API
- **Admin Dashboard** — Secure JWT-authenticated panel to create, edit, and delete projects
- **Image Upload** — Project thumbnails are uploaded directly to Cloudinary (CDN)
- **Dark / Light Mode** — Toggleable theme stored in context
- **Typewriter Hero** — Animated role titles using `react-simple-typewriter`
- **Project Detail Pages** — Full descriptions, tech stack, GitHub & live demo links
- **Contact Form** — Submissions stored to MongoDB and viewable in admin panel
- **Fully Responsive** — Mobile-first design with Tailwind CSS
- **SEO Ready** — Per-page metadata via `react-helmet-async`

---

## 🗂️ Project Structure

```
Portfolio/
├── backend/                  # Node.js / Express API
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── contactController.js
│   │   ├── projectController.js
│   │   └── seedController.js
│   ├── data/
│   │   └── projects.json     # Seed data for initial projects
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT protect middleware
│   │   ├── errorHandler.js   # Global error handler
│   │   └── uploadMiddleware.js # Multer (memory storage) for image uploads
│   ├── models/
│   │   ├── Message.js
│   │   ├── Project.js
│   │   └── User.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── contactRoutes.js
│   │   └── projectRoutes.js
│   ├── utils/
│   │   └── cloudinary.js     # Cloudinary upload helper
│   ├── .env                  # Environment variables (never commit this)
│   ├── server.js             # Entry point
│   └── package.json
│
└── frontend/                 # React + Vite app
    ├── public/
    │   └── images/           # Static fallback images (project-*.png)
    ├── src/
    │   ├── api/
    │   │   ├── api.js        # Axios base instance
    │   │   └── adminApi.js   # Admin API methods + auth token helper
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Hero.jsx
    │   │   ├── FeaturedProjects.jsx
    │   │   ├── Skills.jsx
    │   │   ├── Experience.jsx
    │   │   └── Contact.jsx
    │   ├── context/
    │   │   ├── AdminContext.jsx  # JWT auth state
    │   │   └── ThemeContext.jsx  # Dark/light mode
    │   ├── data/
    │   │   └── initialData.js   # Static fallback project data
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── AllProjectsPage.jsx
    │   │   ├── ProjectDetail.jsx
    │   │   ├── AdminLogin.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   ├── NotFound.jsx
    │   │   └── admin/
    │   │       ├── ProjectsManager.jsx
    │   │       └── MessagesManager.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    └── package.json
```

---

## ⚙️ Prerequisites

| Tool | Version |
|------|---------|
| Node.js | >= 18.x |
| npm | >= 9.x |
| MongoDB Atlas | Any (free tier works) |
| Cloudinary | Free account |

---

## 🛠️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?appName=Data
JWT_SECRET=a_long_random_secret_string

# ⚠️ Get these from https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin
```

> **Important:** `CLOUDINARY_CLOUD_NAME` must be the cloud name shown in your [Cloudinary Dashboard](https://cloudinary.com/console) (e.g., `dxy1abc2`), **not** a custom label like "Root".

Start the backend:

```bash
npm run dev       # Development (nodemon, auto-restart)
npm start         # Production
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔑 Environment Variables Reference

### Backend (`backend/.env`)

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Port for Express server | No (default: 5000) |
| `MONGO_URI` | MongoDB connection string | ✅ Yes |
| `JWT_SECRET` | Secret for signing JWTs | ✅ Yes |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name (from dashboard) | ✅ Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ Yes |
| `EMAIL_HOST` | SMTP host for contact emails | No |
| `EMAIL_PORT` | SMTP port | No |
| `EMAIL_USER` | SMTP email address | No |
| `EMAIL_PASS` | SMTP email password (app password) | No |
| `ADMIN_EMAIL` | Default admin email for seeding | No |
| `ADMIN_PASSWORD` | Default admin password for seeding | No |

### Frontend (`frontend/.env`)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API base URL | No (default: `http://localhost:5000/api`) |

---

## 🔌 API Reference

### Projects

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/projects` | Public | Get all projects |
| `GET` | `/api/projects/:id` | Public | Get project by ID |
| `POST` | `/api/projects` | 🔒 Admin | Create a new project (multipart/form-data) |
| `PUT` | `/api/projects/:id` | 🔒 Admin | Update a project |
| `DELETE` | `/api/projects/:id` | 🔒 Admin | Delete a project |

### Admin / Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/admin/login` | Public | Login — returns JWT token |
| `GET` | `/api/admin/messages` | 🔒 Admin | Get all contact messages |
| `PUT` | `/api/admin/messages/:id/read` | 🔒 Admin | Mark a message as read |

### Contact

| Method | Endpoint | Auth | Description |
|--------|----------|------|--------------|
| `POST` | `/api/contact` | Public | Submit a contact form |

### Resume

| Method | Endpoint | Auth | Description |
|--------|----------|------|--------------|
| `GET` | `/api/resume` | Public | Get resume metadata (URL, filename, updatedAt) |
| `GET` | `/api/resume/download` | Public | **Download the PDF** — proxied through backend with correct headers |
| `POST` | `/api/resume` | 🔒 Admin | Upload / replace resume PDF (multipart/form-data, field: `resume`) |
| `DELETE` | `/api/resume` | 🔒 Admin | Delete the current resume |

---

## 🖼️ Image Uploads (Project Thumbnails)

Images are uploaded using `multipart/form-data`. The backend uses **Multer** (memory storage) to buffer the file and pipes it to the **Cloudinary** upload stream.

### How it works:

1. Admin selects an image in the dashboard form
2. Frontend sends `FormData` with the file as the `image` field
3. Multer buffers the file in memory (`req.file.buffer`)
4. `uploadToCloudinary(buffer, 'portfolio-projects')` uploads it to Cloudinary
5. The returned `secure_url` is saved to the `Project` document in MongoDB

### Troubleshooting image uploads:

| Error | Cause | Fix |
|-------|-------|-----|
| `cloud_name mismatch` | Wrong `CLOUDINARY_CLOUD_NAME` | Set the correct cloud name from [Cloudinary Console](https://cloudinary.com/console) |
| `Invalid API Key` | Wrong `CLOUDINARY_API_KEY` | Regenerate API key in Cloudinary settings |
| `POST 500 after 10+ seconds` | Cloudinary auth fails / timeout | Fix credentials, check Cloudinary account status |
| `401 Not authorized` | Missing or expired JWT token | Log out and log back in as admin |

---

## 📄 Resume Upload & Download

The portfolio supports a single live resume PDF managed from the admin dashboard.

### Upload flow (Admin):

1. Admin navigates to **Admin Panel → Resume**
2. Selects a PDF file (max 10 MB) using the drag-and-drop zone
3. Frontend sends `FormData` with the file as the `resume` field to `POST /api/resume`
4. Multer (PDF-only filter, 10 MB limit) buffers the file in memory
5. `uploadRawToCloudinary(buffer, 'portfolio-resume', 'mohit_resume')` uploads it with `resource_type: 'raw'` and `overwrite: true` — always replaces the same Cloudinary asset
6. The returned `secure_url` and `public_id` are upserted into the single `Resume` document in MongoDB

### Download flow (Visitor):

1. Hero section calls `GET /api/resume` to check whether a resume exists
2. If it does, the **"Download Resume"** button is shown
3. Clicking the button hits `GET /api/resume/download` (a backend proxy)
4. The backend fetches the PDF from Cloudinary using Node's built-in `https` module and pipes it to the client with:
   - `Content-Type: application/pdf`
   - `Content-Disposition: attachment; filename="<original-filename>"`
5. The browser downloads the file as a proper PDF — no browser-tab preview

> **Why a proxy?** The `download` HTML attribute is blocked by browsers for cross-origin URLs (e.g., `res.cloudinary.com`). Routing through the backend sets the correct headers and bypasses the cross-origin restriction.

### Admin dashboard:
- Shows the current resume filename and last-updated timestamp
- **Download PDF** button — tests the proxy download
- **Delete** button — removes from both Cloudinary and MongoDB
- **Replace** — upload a new PDF at any time; old one is automatically overwritten

---

## 🛡️ Authentication Flow

1. Admin visits `/admin/login` and submits email + password
2. Backend verifies credentials against the MongoDB `User` collection using `bcryptjs`
3. On success, a **JWT** (30-day expiry) is returned and stored in `localStorage`
4. All admin API requests include `Authorization: Bearer <token>` header
5. The `protect` middleware validates the JWT on every protected route

---

## 🌱 Seeding Initial Data

To populate the database with initial projects and an admin user:

```bash
cd backend
node -e "require('./controllers/seedController').seedProjects()"
```

Or hit the seed endpoint if a route is configured:

```
POST /api/seed
```

---

## 🏗️ Tech Stack

### Frontend
| Library | Purpose |
|---------|---------|
| React 19 + Vite | UI framework + bundler |
| React Router v7 | Client-side routing |
| Axios | HTTP client |
| Framer Motion | Animations |
| Tailwind CSS v3 | Styling |
| Lucide React | Icons |
| react-helmet-async | SEO meta tags |
| react-hot-toast | Toast notifications |
| react-simple-typewriter | Hero text animation |

### Backend
| Library | Purpose |
|---------|---------|
| Express 5 | Web framework |
| Mongoose | MongoDB ODM |
| Multer v2 | File upload handling |
| Cloudinary v2 | Image CDN & storage |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT auth |
| Morgan | HTTP request logging |
| Nodemailer | Email sending |
| dotenvx | Enhanced `.env` loading |
| Nodemon | Dev auto-restart |

---

## 🚀 Deployment

### Backend (Railway / Render / Fly.io)

1. Set all environment variables in the platform dashboard
2. Set start command to `node server.js`
3. Make sure `CLOUDINARY_CLOUD_NAME` matches your actual Cloudinary account

### Frontend (Vercel / Netlify)

1. Set `VITE_API_URL` to your deployed backend URL (e.g., `https://portfolio-api.railway.app/api`)
2. Build command: `npm run build`
3. Output directory: `dist`

---

## 📝 License

MIT — feel free to fork and adapt for your own portfolio.

---

## 👤 Author

**Mohit** — [GitHub](https://github.com/your-username) · [Portfolio](https://your-portfolio.com)
