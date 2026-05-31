# 🚀 Quick Start Guide - RBAC Setup

## Prerequisites Checklist
- [ ] PHP 8.1+ installed
- [ ] Composer installed
- [ ] Node.js 18+ installed
- [ ] npm/yarn installed
- [ ] MySQL/MariaDB running
- [ ] .env file configured with database credentials

---

## Backend Setup (Laravel)

### 1. Navigate to Backend Directory
```bash
cd catalog-be
```

### 2. Install Composer Dependencies
```bash
composer install
```

### 3. Copy Environment File
```bash
cp .env.example .env
```

### 4. Generate App Key
```bash
php artisan key:generate
```

### 5. Configure Database (.env)
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bizponsel_catalog
DB_USERNAME=root
DB_PASSWORD=
```

### 6. Run Migrations
```bash
php artisan migrate
```

### 7. Seed Database with Default Users
```bash
php artisan db:seed --class=UserSeeder
```

### 8. Start Laravel Development Server
```bash
php artisan serve
```

Server akan berjalan di: `http://127.0.0.1:8000`

---

## Frontend Setup (React)

### 1. Navigate to Frontend Directory
```bash
cd catalog-fe
```

### 2. Install npm Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Dev server akan berjalan di: `http://localhost:5173` (or check terminal output)

---

## Default Test Accounts

Use these credentials to test the RBAC system:

### Superadmin Account
```
Email: superadmin@bizponsel.com
Password: password
Role: superadmin
Access: Full admin dashboard + User Management
```

### Admin Account
```
Email: admin@bizponsel.com
Password: password
Role: admin
Access: Admin dashboard (no User Management)
```

### Regular User Account
```
Email: user@bizponsel.com
Password: password
Role: user
Access: Public website only
```

### Inactive User (for testing)
```
Email: inactive@bizponsel.com
Password: password
Role: user
Status: Inactive
Result: Cannot login
```

---

## Test Scenarios

### 1. Test User Login Flow
1. Go to http://localhost:5173/login
2. Login as **user@bizponsel.com** with password **password**
3. Should redirect to `/` (public website)

### 2. Test Admin Login Flow
1. Go to http://localhost:5173/login
2. Login as **admin@bizponsel.com** with password **password**
3. Should redirect to `/admin` (dashboard)
4. Sidebar should NOT show "User" menu

### 3. Test Superadmin Login Flow
1. Go to http://localhost:5173/login
2. Login as **superadmin@bizponsel.com** with password **password**
3. Should redirect to `/admin` (dashboard)
4. Sidebar should show "User" menu

### 4. Test User Management (Superadmin only)
1. Login as superadmin
2. Click "User" menu in sidebar
3. Should open `/admin/users` page
4. Test features:
   - **Search**: Type in search box to find users by name/email
   - **Pagination**: Change per-page dropdown to see pagination
   - **Add User**: Click "Tambah User" button
     - Fill in: Nama, Email, Password (min 8 chars), Role
     - Click Simpan
   - **Edit User**: Click edit icon on any user row
     - Update: Nama, Email, Role
     - Click Simpan
   - **Delete User**: Click delete icon, confirm
   - **Toggle Status**: Click on status badge to toggle Active/Inactive

### 5. Test Inactive User
1. Go to login page
2. Try login as **inactive@bizponsel.com** with password **password**
3. Should show error: "Akun Anda telah dinonaktifkan."

### 6. Test Authorization
1. As **admin**, try accessing `/admin/users`
   - Should redirect to `/admin` (forbidden)
2. As **user**, try accessing `/admin`
   - Should redirect to `/` (forbidden)

---

## API Testing with cURL

### 1. Login and Get Token
```bash
curl -X POST http://127.0.0.1:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "superadmin@bizponsel.com",
    "password": "password"
  }'
```

Copy the `token` from response.

### 2. Get All Users (with token)
```bash
curl -X GET "http://127.0.0.1:8000/api/admin/users?page=1&per_page=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. Create New User
```bash
curl -X POST http://127.0.0.1:8000/api/admin/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "nama": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "peran": "user"
  }'
```

### 4. Update User
```bash
curl -X PUT http://127.0.0.1:8000/api/admin/users/5 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "nama": "Updated Name",
    "peran": "admin"
  }'
```

### 5. Toggle User Status
```bash
curl -X POST http://127.0.0.1:8000/api/admin/users/5/toggle-status \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 6. Delete User
```bash
curl -X DELETE http://127.0.0.1:8000/api/admin/users/5 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Troubleshooting

### Problem: CORS Error
**Solution:** Check CORS configuration in `catalog-be/config/cors.php`

### Problem: Database Connection Error
**Solution:** 
- Check `.env` database credentials
- Ensure MySQL is running
- Run: `php artisan migrate:refresh`

### Problem: "Class not found" Error for Middleware
**Solution:** Ensure middleware registered in `bootstrap/app.php`

### Problem: Frontend shows blank page
**Solution:**
- Check browser console for errors
- Verify backend is running on http://127.0.0.1:8000
- Clear cache and reload

### Problem: Token invalid on protected routes
**Solution:**
- Make sure token is passed in header
- Format: `Authorization: Bearer {token}`
- Token expires after some time, re-login to get new one

### Problem: Cannot access /admin/users as admin
**Solution:** This is correct! Only superadmin can access user management.

---

## File Changes Summary

### Backend Files Modified/Created
- ✅ `app/Http/Controllers/UsersController.php` - Updated with full CRUD
- ✅ `app/Http/Middleware/CheckRole.php` - Created role authorization middleware
- ✅ `bootstrap/app.php` - Registered middleware alias
- ✅ `routes/api.php` - Added user management routes
- ✅ `database/seeders/UserSeeder.php` - Default users for testing

### Frontend Files Modified/Created
- ✅ `src/App.jsx` - Updated route guards and redirect logic
- ✅ `src/components/admin/Sidebar.jsx` - Dynamic menu based on role
- ✅ `src/pages/admin/Users.jsx` - User management page
- ✅ `src/utils/services/apiClient.js` - Axios instance for API

---

## Support

For detailed documentation, see: `RBAC_DOCUMENTATION.md`

For any issues, check the error messages in:
- Browser console (Frontend)
- Laravel logs: `catalog-be/storage/logs/`

---

## Happy Coding! 🎉
