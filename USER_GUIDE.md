# User Guide

This guide explains how to handle the system step by step.

## 1. Start The Project

### Backend

1. Open terminal.
2. Go to backend folder:

```powershell
cd hedra-backend
```

3. Start backend:

```powershell
npm run dev
```

4. Confirm backend is running at `http://localhost:8000`.

### Frontend

1. Open another terminal.
2. Go to frontend folder:

```powershell
cd hedra-furniture-gallery
```

3. Start frontend:

```powershell
npm run dev
```

4. Open the shown local URL, usually `http://localhost:5173`.

## 2. Create The First Admin

If admin login does not exist yet:

1. Start backend.
2. Send a `POST` request to:

```text
http://localhost:8000/api/auth/register
```

3. Send JSON like:

```json
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "123456"
}
```

4. After success, open `/admin` in the frontend.

## 3. Admin Login

1. Open:

```text
http://localhost:5173/admin
```

2. Enter admin email.
3. Enter password.
4. Click `Sign In`.
5. You will go to the dashboard.

## 4. How To Add A Product

1. Login as admin.
2. Open `Admin Dashboard`.
3. Click `Add Product`.
4. Fill product details:
   name, description, category, price, tags, specifications if available.
5. Upload product images.
6. Save the product.
7. Check the product in the catalog page.

Important:

- Product image field is uploaded as `images`
- Up to 8 images are allowed
- Use jpg, png, or webp

## 5. How To Edit A Product

1. Login as admin.
2. Open `Products`.
3. Search or filter the product.
4. Click `Edit`.
5. Change details or images.
6. Save changes.
7. Open the product page and verify the update.
8.Click the ‘Best Seller’ button to mark and save this product as a best seller.

## 6. How To Delete A Product

1. Login as admin.
2. Open `Products`.
3. Find the product.
4. Click the delete icon.
5. Confirm delete.

Important:

- Delete cannot be undone from the UI.

## 7. How To Upload A Catalogue

1. Login as admin.
2. Open `Catalogues`.
3. Click `Add Catalogue`.
4. Enter:
   code, name, type.
5. Upload the required files:
   image, pdf, and optionally brand logo.
6. Save.
7. Verify it appears in the catalogue list.

Catalogue types:

- `CHAIR_CATALOGUE`
- `UPHOLSTERY`
- `BRAND_LOGO`

## 8. How To Edit A Catalogue

1. Login as admin.
2. Open `Catalogues`.
3. Search by name or code.
4. Click `Edit`.
5. Update details or files.
6. Save changes.

## 9. How To Delete A Catalogue

1. Login as admin.
2. Open `Catalogues`.
3. Find the catalogue.
4. Click delete.
5. Confirm action.

## 10. How Contact Enquiries Work

1. A user opens the contact page.
2. User submits name, email, phone, and message.
3. Backend saves the enquiry in the database.
4. Backend tries to send an email to admin.

To make this work properly, backend mail environment variables must be configured.

## 11. Public Website Pages

Visitors can use:

- Home
- Catalog
- Category pages
- Product detail page
- Projects
- Services
- About
- Contact
- Chair catalogue
- Upholstery page

## 12. Troubleshooting

### Frontend not loading data

Check:

1. Backend is running
2. Frontend `.env` values are correct
3. API URL points to `http://localhost:8000`

### Admin login fails

Check:

1. Admin user exists in database
2. Email and password are correct
3. `JWT_SECRET` exists in backend `.env`

### Images or PDFs not showing

Check:

1. Upload files are inside backend `uploads` folder
2. `VITE_FILE_BASE_URL` is correct
3. Backend is serving `/uploads`

### Contact form saves but email does not send

Check:

1. `ADMIN_MAIL` is set
2. SMTP or Resend credentials are set correctly
3. Backend logs for mail error details

## 13. Recommended Daily Workflow

1. Start backend
2. Start frontend
3. Login as admin
4. Add or edit products
5. Add or edit catalogues
6. Check public pages
7. Test contact form
8. Stop servers after work
