# RBAC System Implementation - BizPonsel

## Overview

Sistem Role-Based Access Control (RBAC) yang lengkap untuk BizPonsel dengan 3 role:
- **User** - Akses publik website saja
- **Admin** - Akses dashboard admin (kecuali user management)
- **Superadmin** - Akses penuh dashboard admin + user management

---

## Features Implemented

### Backend (Laravel)

#### 1. User Model & Migration
- ✅ Field `is_active` untuk soft deactivation
- ✅ Field `peran` dengan enum: user, admin, superadmin
- ✅ Timestamp: dibuat_pada, diperbarui_pada
- ✅ Password hashing otomatis

#### 2. Authentication & Authorization
- ✅ Login validation untuk `is_active` status
- ✅ Middleware `CheckRole` untuk role-based route protection
- ✅ Sanctum API token authentication

#### 3. User Management Controller (UsersController)
Endpoint untuk superadmin management:
```
GET    /api/admin/users                  - Get all users (paginated, searchable)
GET    /api/admin/users/{id}             - Get user detail
POST   /api/admin/users                  - Create new user
PUT    /api/admin/users/{id}             - Update user
DELETE /api/admin/users/{id}             - Delete user
POST   /api/admin/users/{id}/toggle-status - Toggle active/inactive
```

#### 4. API Routes Protection
```
/api/auth/*                   - PUBLIC (login, register)
/api/*                        - PUBLIC GET endpoints
/api/admin/*                  - PROTECTED (admin, superadmin only)
/api/admin/users/*            - PROTECTED (superadmin only)
```

#### 5. Validation
- Email unique
- Password minimum 8 characters
- Role: user, admin, superadmin
- Status: active/inactive

### Frontend (React)

#### 1. Authentication Flow
- ✅ Login redirect:
  - `user` → `/` (public website)
  - `admin` → `/admin` (admin dashboard)
  - `superadmin` → `/admin` (admin dashboard)

#### 2. Route Protection
- ✅ `<AdminRoute>` - Accepts admin & superadmin only
- ✅ `<SuperadminRoute>` - Superadmin only
- ✅ Redirect ke login jika tidak terautentikasi

#### 3. Dynamic Sidebar Menu
- ✅ Sidebar menu berbeda untuk admin vs superadmin
- ✅ Menu "User" hanya muncul untuk superadmin

#### 4. User Management Page (/admin/users)
- ✅ Tabel user dengan columns:
  - ID, Nama, Email, Role, Status, Password Hash, Bergabung, Aksi
- ✅ Role badge: User (blue), Admin (orange), Super Admin (red)
- ✅ Status badge: Active (green), Inactive (gray)
- ✅ Search by name/email
- ✅ Pagination (5, 10, 20, 50 per page)
- ✅ Sorting
- ✅ Toggle status (click on badge)
- ✅ CRUD Operations:
  - Add user modal
  - Edit user modal
  - Delete confirmation modal
- ✅ Form validation
- ✅ Password hash display (masked: `$2y$10$**************`)

---

## Setup Instructions

### Prerequisites
- PHP 8.1+
- Composer
- Node.js 18+
- npm/yarn

### Backend Setup

#### 1. Database Migration
```bash
cd catalog-be
php artisan migrate
```

#### 2. Seed Default Users
```bash
php artisan db:seed --class=UserSeeder
```

**Default credentials for testing:**
```
Superadmin:
  Email: superadmin@bizponsel.com
  Password: password

Admin:
  Email: admin@bizponsel.com
  Password: password

User:
  Email: user@bizponsel.com
  Password: password

Inactive User (for testing):
  Email: inactive@bizponsel.com
  Password: password
```

#### 3. Run Laravel Dev Server
```bash
php artisan serve
# Server runs at http://127.0.0.1:8000
```

### Frontend Setup

#### 1. Install Dependencies
```bash
cd catalog-fe
npm install
```

#### 2. Run Dev Server
```bash
npm run dev
# Dev server at http://localhost:5173 (or check console)
```

---

## API Testing Guide

### 1. User Login
**POST** `/api/auth/login`
```json
{
  "email": "superadmin@bizponsel.com",
  "password": "password"
}
```

Response:
```json
{
  "status": true,
  "message": "Login berhasil.",
  "data": {
    "user": {
      "id": 1,
      "nama": "Super Admin",
      "email": "superadmin@bizponsel.com",
      "peran": "superadmin",
      "is_active": true,
      "dibuat_pada": "2026-06-01T00:00:00.000000Z",
      "diperbarui_pada": "2026-06-01T00:00:00.000000Z"
    },
    "token": "xxx"
  }
}
```

### 2. Get All Users (Superadmin only)
**GET** `/api/admin/users?page=1&per_page=10&search=&sort=dibuat_pada&order=desc`

Header:
```
Authorization: Bearer {token}
```

### 3. Create User (Superadmin only)
**POST** `/api/admin/users`

Header:
```
Authorization: Bearer {token}
Content-Type: application/json
```

Body:
```json
{
  "nama": "User Baru",
  "email": "user.baru@bizponsel.com",
  "password": "password123",
  "peran": "user"
}
```

### 4. Update User (Superadmin only)
**PUT** `/api/admin/users/{id}`

Body:
```json
{
  "nama": "User Updated",
  "email": "user.updated@bizponsel.com",
  "peran": "admin"
}
```

### 5. Toggle User Status (Superadmin only)
**POST** `/api/admin/users/{id}/toggle-status`

### 6. Delete User (Superadmin only)
**DELETE** `/api/admin/users/{id}`

---

## Authorization Matrix

| Action | User | Admin | Superadmin |
|--------|------|-------|-----------|
| Access Public Website | ✅ | ❌ | ❌ |
| Access Admin Dashboard | ❌ | ✅ | ✅ |
| Access User Management | ❌ | ❌ | ✅ |
| View Products | ✅ | ✅ | ✅ |
| Manage Products | ❌ | ✅ | ✅ |
| Manage Categories | ❌ | ✅ | ✅ |
| Manage Promos | ❌ | ✅ | ✅ |
| Manage Branches | ❌ | ✅ | ✅ |
| Manage Users | ❌ | ❌ | ✅ |
| Create Admin Account | ❌ | ❌ | ✅ |
| Deactivate User | ❌ | ❌ | ✅ |

---

## Security Considerations

### 1. Password Security
- ✅ Password hashing dengan bcrypt
- ✅ Password minimum 8 characters
- ✅ Password tidak ditampilkan di tabel (hanya hash masked)
- ✅ Password di-hash saat create, hidden saat display

### 2. Authentication
- ✅ API token authentication dengan Sanctum
- ✅ Token required untuk protected routes
- ✅ Login validation untuk `is_active` status
- ✅ Automatic logout jika token invalid

### 3. Authorization
- ✅ Middleware `CheckRole` untuk route protection
- ✅ Frontend route guards untuk extra protection
- ✅ Backend validation untuk setiap endpoint
- ✅ Superadmin-only endpoints protected

### 4. Data Validation
- ✅ Email unique validation
- ✅ Role enum validation
- ✅ Form validation di backend

---

## Troubleshooting

### Backend Issues

#### 1. Migration Error: Column already exists
```
Solution: Database sudah ada field is_active, skip migration atau modify
```

#### 2. Middleware not found
```
Error: Class 'App\Http\Middleware\CheckRole' not found
Solution: Register middleware di bootstrap/app.php
```

#### 3. Password hash tidak cocok saat login
```
Solution: Pastikan password di-hash dengan Hash::make()
```

### Frontend Issues

#### 1. Users page blank / API error 404
```
Solution: Pastikan backend running dan routes sudah registered
```

#### 2. Cannot read property 'data' of undefined
```
Solution: Check API response format, pastikan route protection di-bypass untuk dev
```

#### 3. axios not found
```
Solution: Run `npm install axios` (should already installed)
```

---

## File Structure

### Backend
```
catalog-be/
├── app/Http/
│   ├── Controllers/
│   │   ├── AuthController.php         (Updated - is_active validation)
│   │   ├── UsersController.php        (Updated - CRUD + search + pagination)
│   │   └── ...
│   ├── Middleware/
│   │   ├── CheckRole.php             (NEW - Role validation)
│   │   └── ...
├── routes/
│   ├── api.php                        (Updated - New routes)
├── database/
│   ├── migrations/
│   │   ├── 2026_04_01_085348_create_users_table.php
│   │   └── ...
│   └── seeders/
│       ├── UserSeeder.php            (Updated - Default users)
```

### Frontend
```
catalog-fe/src/
├── App.jsx                            (Updated - Route guards)
├── pages/admin/
│   ├── Users.jsx                      (NEW - User management)
│   ├── Dashboard.jsx
│   └── ...
├── components/admin/
│   ├── Sidebar.jsx                    (Updated - Dynamic menu)
│   └── ...
├── utils/
│   ├── services/
│   │   ├── apiClient.js               (NEW - Axios instance)
│   │   └── ...
```

---

## Next Steps / Future Enhancements

- [ ] User profile page
- [ ] Admin profile page
- [ ] Change password functionality
- [ ] User activity logs
- [ ] Email verification on registration
- [ ] Password reset via email
- [ ] Two-factor authentication
- [ ] Audit trail for admin actions
- [ ] Export users to CSV
- [ ] Bulk user operations

---

## Testing Checklist

### Backend
- [ ] Run `php artisan migrate`
- [ ] Run `php artisan db:seed --class=UserSeeder`
- [ ] Test login dengan superadmin
- [ ] Test login dengan admin
- [ ] Test login dengan user
- [ ] Test login dengan inactive user (should fail)
- [ ] Test GET /api/admin/users (should work for superadmin)
- [ ] Test GET /api/admin/users (should fail for admin)
- [ ] Test POST /api/admin/users (should work for superadmin)
- [ ] Test POST /api/admin/users/{id}/toggle-status

### Frontend
- [ ] Run `npm run dev`
- [ ] Test login sebagai user → redirect ke `/`
- [ ] Test login sebagai admin → redirect ke `/admin`
- [ ] Test login sebagai superadmin → redirect ke `/admin`
- [ ] Test sidebar menu untuk admin (no "User" menu)
- [ ] Test sidebar menu untuk superadmin (show "User" menu)
- [ ] Test access `/admin/users` sebagai superadmin (should work)
- [ ] Test access `/admin/users` sebagai admin (should redirect)
- [ ] Test add user dari modal
- [ ] Test edit user dari modal
- [ ] Test delete user
- [ ] Test toggle status
- [ ] Test search users
- [ ] Test pagination

---

## Contact & Support

For issues or questions, contact development team.
