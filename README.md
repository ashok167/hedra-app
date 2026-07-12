# Hedra Furniture Gallery

This repository contains a complete furniture catalogue system with:

- `hedra-furniture-gallery`: React + Vite frontend
- `hedra-backend`: Express + Prisma backend

The application supports:

- Public furniture browsing
- Product detail pages
- Project and services pages
- Contact/enquiry submission
- Admin login
- Product management
- Catalogue upload and management

## Project Structure

```text
HF/
|-- hedra-furniture-gallery/   # frontend
|-- hedra-backend/             # backend
`-- README.md
```

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- Backend: Node.js, Express, Prisma
- Database: PostgreSQL
- Auth: JWT
- Uploads: Multer

## Main Features

### Public website

- Home page
- Catalog page
- Category browsing
- Product detail page
- Projects page
- Services page
- About page
- Contact page
- Chair catalogue and upholstery pages

### Admin panel

- Admin login
- Dashboard overview
- Add product
- Edit product
- Delete product
- Upload catalogue
- Edit catalogue
- Delete catalogue

## Frontend Routes

- `/` - Home
- `/catalog` - Catalog
- `/catalog/:category` - Category catalog
- `/catalog/:category/browse` - Category browse page
- `/product` - Product detail
- `/projects` - Projects
- `/homeprojects` - Home projects
- `/chooseupholstery` - Upholstery page
- `/funrifanenquiry` - Enquiry page
- `/chaircatalog` - Chair catalogue page
- `/services` - Services
- `/about` - About
- `/contact` - Contact
- `/admin` - Admin login
- `/admin/dashboard` - Admin dashboard
- `/admin/products` - Manage products
- `/admin/products/add` - Add product
- `/admin/products/edit` - Edit product
- `/admin/catalogue` - Manage catalogues
- `/admin/catalogue/upload` - Upload catalogue
- `/admin/catalogue/edit` - Edit catalogue

## Backend API

### Auth

- `POST /api/auth/register` - create first admin
- `POST /api/auth/login` - admin login

### Products

- `GET /api/products/getAllProducts`
- `GET /api/products/getProductById/:id`
- `GET /api/products/getProductsByCategory/:category`
- `GET /api/products/getchairs`
- `GET /api/products/best-sellers`
- `POST /api/products/saveProduct`
- `PUT /api/products/updateProduct/:id`
- `DELETE /api/products/deleteProduct/:id`

### Projects

- `GET /api/projects`
- `GET /api/projects/:id`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

### Contact

- `POST /api/contact/createcontact`
- `POST /api/contact/`
- `GET /api/contact/`

### Catalogue

- `POST /api/catalogue/createcatalogue`
- `GET /api/catalogue/listCatalogues`
- `GET /api/catalogue/allCatalogues`
- `GET /api/catalogue/getCatalogueByCode/:code`
- `PUT /api/catalogue/catalogue/:code`
- `DELETE /api/catalogue/catalogue/:code`

## Environment Variables

### Backend `.env`

Create `hedra-backend/.env` with values like:

```env
PORT=8000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB_NAME
JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=7d

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_mail@example.com
SMTP_PASS=your_password

ADMIN_MAIL=admin@example.com
FROM_EMAIL=onboarding@resend.dev
RESEND_API_KEY=your_resend_key
```

Used by the backend:

- `DATABASE_URL` for Prisma/PostgreSQL
- `JWT_SECRET` for admin authentication
- `SMTP_*`, `ADMIN_MAIL`, `FROM_EMAIL`, `RESEND_API_KEY` for enquiry email delivery

### Frontend `.env`

Create `hedra-furniture-gallery/.env` with:

```env
VITE_API_URL=http://localhost:8000
VITE_API_BASE_URL=http://localhost:8000
VITE_FILE_BASE_URL=http://localhost:8000
```

Important note:

- `src/lib/axios.ts` uses `VITE_API_URL`
- some pages use `VITE_API_BASE_URL`
- uploaded file rendering uses `VITE_FILE_BASE_URL`
- `service.tsx` is currently hardcoded to `https://www.edendek.com/api/`, so local admin actions may need that file adjusted if you want full local testing

## Local Setup

### 1. Install frontend dependencies

```powershell
cd hedra-furniture-gallery
npm install
```

### 2. Install backend dependencies

```powershell
cd ..\hedra-backend
npm install
```

### 3. Configure the database

Make sure PostgreSQL is running and `DATABASE_URL` is correct.

Run Prisma migration:

```powershell
npx prisma migrate deploy
```

For local development, if needed:

```powershell
npx prisma migrate dev
```

### 4. Start backend

```powershell
cd hedra-backend
npm run dev
```

Backend runs on:

```text
http://localhost:8000
```

### 5. Start frontend

Open a second terminal:

```powershell
cd hedra-furniture-gallery
npm run dev
```

Frontend usually runs on:

```text
http://localhost:5173
```

## First Admin Setup

Use the register API once to create the first admin user.

Example:

```http
POST http://localhost:8000/api/auth/register
Content-Type: application/json

{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "your_password"
}
```

After that, log in from:

```text
http://localhost:5173/admin
```

## File Upload Rules

### Product uploads

- field name: `images`
- max files: `8`
- allowed types: jpg, png, webp
- max size: `8 MB` each

### Catalogue uploads

Supported fields:

- `image`
- `pdf`
- `brandLogo`

Allowed types:

- jpg
- png
- webp
- pdf

Max size:

- `20 MB`

Files are stored in:

- `hedra-backend/uploads/`
- `hedra-backend/uploads/catalogue/images/`
- `hedra-backend/uploads/catalogue/pdfs/`

## Database Models

Main Prisma models:

- `User`
- `Product`
- `Project`
- `ContactMessage`
- `Catalogue`

Catalogue types:

- `CHAIR_CATALOGUE`
- `UPHOLSTERY`
- `BRAND_LOGO`

## Daily Operations

For simple operating instructions, see:

- [USER_GUIDE.md](./USER_GUIDE.md)

## Notes

- Backend CORS currently allows `http://localhost:5173`, `http://localhost:8080`, and `https://www.edendek.com`
- The backend serves uploads from `/uploads`
- The backend also serves the built frontend from `hedra-backend/dist`
- There is a redirect in backend code that sends `onrender.com` traffic to `https://www.edendek.com`
