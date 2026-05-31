# 🏗️ RBAC Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER BROWSER                                 │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         React Frontend (catalog-fe)                      │   │
│  │                                                          │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐ │   │
│  │  │ Login    │  │ Public   │  │ Admin Dashboard      │ │   │
│  │  │ Page     │→ │ Website  │  │ (Admin/Superadmin)   │ │   │
│  │  └──────────┘  │ (User)   │  ├──────────────────────┤ │   │
│  │                │          │  │ Sidebar (Dynamic)    │ │   │
│  │                └──────────┘  ├──────────────────────┤ │   │
│  │                              │ - Dashboard          │ │   │
│  │                              │ - Produk             │ │   │
│  │                              │ - Promo              │ │   │
│  │                              │ - Cabang             │ │   │
│  │                              │ - Pengaturan         │ │   │
│  │                              │ - User (Superadmin)  │ │   │
│  │                              └──────────────────────┘ │   │
│  │                                                        │   │
│  │  ┌────────────────────────────────────────────────┐   │   │
│  │  │ User Management Page (/admin/users)            │   │   │
│  │  │ - Search & Filter                              │   │   │
│  │  │ - Pagination                                   │   │   │
│  │  │ - Add/Edit/Delete Modals                       │   │   │
│  │  │ - Toggle Status                                │   │   │
│  │  │ (Superadmin only)                              │   │   │
│  │  └────────────────────────────────────────────────┘   │   │
│  │                                                        │   │
│  │  Route Guards:                                         │   │
│  │  - AdminRoute (admin + superadmin)                     │   │
│  │  - SuperadminRoute (superadmin only)                   │   │
│  │  - ProtectedRoute (authenticated)                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  apiClient (Axios)                                            │
│  ├─ Interceptors                                             │
│  ├─ Token Management                                         │
│  └─ Error Handling                                           │
└─────────────────────────────────────────────────────────────────┘
                              ↕
                    HTTP/REST API (axios)
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                   Laravel Backend API                            │
│               (catalog-be - port 8000)                          │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ API Routes (/api/auth/*, /api/admin/users/*)              │ │
│  │                                                            │ │
│  │ ├─ POST   /api/auth/login          (AuthController)        │ │
│  │ ├─ POST   /api/auth/register       (AuthController)        │ │
│  │ ├─ POST   /api/auth/logout         (AuthController)        │ │
│  │ │                                                          │ │
│  │ └─ /api/admin/users/* (Protected Routes)                   │ │
│  │    ├─ GET    (UsersController@index)     [Superadmin]      │ │
│  │    ├─ POST   (UsersController@store)     [Superadmin]      │ │
│  │    ├─ PUT    (UsersController@update)    [Superadmin]      │ │
│  │    ├─ DELETE (UsersController@destroy)   [Superadmin]      │ │
│  │    └─ POST   toggle-status               [Superadmin]      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Middleware Stack                                           │ │
│  │ ├─ CheckRole (Role Validation)                            │ │
│  │ ├─ Sanctum (Token Authentication)                         │ │
│  │ └─ CORS (Cross-Origin Resource Sharing)                   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Controllers                                                │ │
│  │ ├─ AuthController (Login, Register)                       │ │
│  │ └─ UsersController (CRUD + Search/Pagination)             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Models                                                     │ │
│  │ └─ User (peran, is_active, email, password hash)          │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↕
                        MySQL Database
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│ users table                                                     │
│ ├─ id (INT, Primary Key)                                       │
│ ├─ nama (VARCHAR)                                              │
│ ├─ email (VARCHAR, Unique)                                     │
│ ├─ password (VARCHAR, hashed)                                  │
│ ├─ peran (ENUM: user, admin, superadmin)                       │
│ ├─ is_active (BOOLEAN, default true)                           │
│ ├─ dibuat_pada (TIMESTAMP)                                     │
│ └─ diperbarui_pada (TIMESTAMP)                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Authentication Flow

```
LOGIN FLOW:
┌─────────────────────────────────────────────────────────────────┐
│ 1. User enters email & password on login page                   │
│ 2. Frontend sends POST /api/auth/login                          │
│ 3. Backend validates credentials                               │
│ 4. Backend checks is_active status                             │
│ 5. If valid → generates token & returns user + token           │
│ 6. Frontend stores token + user in localStorage                │
│ 7. Redirect based on role:                                     │
│    - user → /                                                  │
│    - admin → /admin                                            │
│    - superadmin → /admin                                       │
│ 8. Token sent with every API request (Authorization header)   │
│ 9. Backend validates token via middleware                      │
│ 10. Request allowed if:                                        │
│     - Token valid                                              │
│     - User is_active = true                                    │
│     - User has required role                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Authorization Flow - User Management

```
SUPERADMIN ACCESSING /admin/users:
┌─────────────────────────────────────────────────────────────────┐
│ Frontend:                                                        │
│ 1. Click "User" menu → navigate to /admin/users                │
│ 2. SuperadminRoute checks: is token valid? is user superadmin? │
│ 3. If yes → render Users page                                  │
│ 4. Page loads → fetch data via apiClient.get("/admin/users")   │
│                                                                 │
│ Backend:                                                         │
│ 1. Receive GET /api/admin/users request                        │
│ 2. Sanctum middleware validates token → identify user          │
│ 3. CheckRole middleware checks: is role = superadmin?          │
│ 4. If yes → execute UsersController@index                      │
│ 5. Query users with search/sort/pagination                     │
│ 6. Return paginated results                                    │
│ 7. Frontend displays table with data                           │
│                                                                 │
│ ADMIN ACCESSING /admin/users (should be blocked):              │
│ 1. Click "User" menu → menu NOT VISIBLE (sidebar check)        │
│ 2. Manual URL access /admin/users                              │
│ 3. SuperadminRoute checks: is user superadmin?                 │
│ 4. NO → redirect to /admin                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## CRUD Operation Flow - Creating New User

```
┌─────────────────────────────────────────────────────────────────┐
│ Step 1: Frontend Click "Tambah User" Button                     │
│ ├─ Opens modal with form fields                                │
│ └─ Fields: Nama, Email, Password, Role (dropdown)              │
│                                                                  │
│ Step 2: User Fills Form & Clicks Simpan                         │
│ ├─ Frontend validates:                                         │
│ │  ├─ Nama tidak kosong                                        │
│ │  ├─ Email format valid                                       │
│ │  ├─ Password >= 8 chars                                      │
│ │  └─ Role selected                                            │
│ ├─ If validation failed → show error                           │
│ └─ If validation passed → continue                             │
│                                                                  │
│ Step 3: Send POST /api/admin/users Request                      │
│ ├─ Body: { nama, email, password, peran }                      │
│ ├─ Header: Authorization: Bearer {token}                       │
│ └─ apiClient intercepts & adds token automatically             │
│                                                                  │
│ Step 4: Backend Receives Request                               │
│ ├─ Sanctum middleware validates token                          │
│ ├─ CheckRole middleware validates role = superadmin            │
│ ├─ UsersController@store processes request                     │
│ ├─ Backend validates (same rules):                             │
│ │  ├─ Nama required                                            │
│ │  ├─ Email unique in DB                                       │
│ │  ├─ Password >= 8 chars                                      │
│ │  └─ Role in [user, admin, superadmin]                        │
│ ├─ Hash password with bcrypt                                   │
│ ├─ Set is_active = true                                        │
│ ├─ Create user in database                                     │
│ └─ Return created user data                                    │
│                                                                  │
│ Step 5: Frontend Receives Response                              │
│ ├─ Close modal                                                 │
│ ├─ Show success message: "User berhasil ditambahkan"           │
│ ├─ Clear form fields                                           │
│ ├─ Refresh user table (re-fetch data)                          │
│ └─ User sees new user in table                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Role-Based Menu Display

```
┌─────────────────────────────────────────────────────────────────┐
│ ADMIN SIDEBAR MENU                  SUPERADMIN SIDEBAR MENU     │
│ ────────────────────────            ─────────────────────────  │
│ [Icon] Dashboard                     [Icon] Dashboard           │
│ [Icon] Produk                        [Icon] User ⭐ NEW        │
│ [Icon] Promo                         [Icon] Produk              │
│ [Icon] Cabang                        [Icon] Promo               │
│ [Icon] Pengaturan                    [Icon] Cabang              │
│                                      [Icon] Pengaturan          │
│                                                                  │
│ Logic: Sidebar.jsx                                              │
│ ├─ Read user from localStorage                                 │
│ ├─ Check user.peran                                            │
│ ├─ if peran === "superadmin"                                   │
│ │  └─ Use superadminMenus array (includes "User")             │
│ └─ else                                                         │
│    └─ Use baseMenus array (excludes "User")                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Security & Validation

```
┌─────────────────────────────────────────────────────────────────┐
│ PASSWORD SECURITY                                                │
│ ────────────────────────────────────────────────────────────────│
│ User Input → Hash::make() → Store in DB → Never exposed in API  │
│                                                                  │
│ Display in User Management Table:                              │
│ Original: $2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS5xH  │
│ Display:  $2y$10$**************                                 │
│           (First 14 chars visible for audit)                   │
│                                                                  │
│ PASSWORD REQUIREMENTS                                            │
│ ──────────────────────────────────────────────────────────────  │
│ Minimum: 8 characters                                           │
│ Validation: Backend + Frontend                                  │
│ Hashing: bcrypt (Laravel default)                              │
│ Not Stored: Plain text never stored                            │
│ Not Sent: Password never returned in API                       │
│                                                                  │
│ EMAIL SECURITY                                                   │
│ ─────────────────────────────────────────────────────────────  │
│ Unique Constraint: DB enforces one email per user              │
│ Validation: Format checked (email type)                        │
│ Update Check: Must be unique except current user               │
│ Stored: Plain text (needed for login)                          │
│                                                                  │
│ ROLE SECURITY                                                    │
│ ──────────────────────────────────────────────────────────────  │
│ Enum Values: [user, admin, superadmin] only                    │
│ Frontend: Dropdown restricted to valid roles                   │
│ Backend: Validation ensures only valid roles                   │
│ Stored: In peran column (ENUM)                                 │
│                                                                  │
│ ACTIVE STATUS SECURITY                                           │
│ ────────────────────────────────────────────────────────────────│
│ Validation: Login checks is_active = true                      │
│ Display: Status badge shows Active/Inactive                    │
│ Toggle: Click status badge to flip value                       │
│ Enforcement: Inactive user cannot generate token               │
│                                                                  │
│ TOKEN SECURITY                                                   │
│ ──────────────────────────────────────────────────────────────  │
│ Generation: Sanctum creates unique token per login             │
│ Storage: localStorage (frontend only)                          │
│ Transmission: Authorization header (HTTPS recommended)         │
│ Validation: Backend validates on every request                 │
│ Expiration: Configurable (default: long-lived)                 │
│ Revocation: Logout deletes token                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Error Handling & Edge Cases

```
SCENARIO: Admin tries to access /admin/users
├─ Frontend: SuperadminRoute blocks (not superadmin)
├─ Redirect to: /admin
└─ No error shown to user (UX)

SCENARIO: Inactive user tries to login
├─ AuthController checks is_active
├─ is_active = false
├─ Returns: 403 "Akun Anda telah dinonaktifkan"
└─ User cannot proceed

SCENARIO: Superadmin creates duplicate email
├─ Frontend: No immediate validation
├─ Backend: Email unique validation fails
├─ Response: 422 Validation error
├─ Frontend: Shows error "Email sudah terdaftar"
└─ User can retry with different email

SCENARIO: User token expires
├─ apiClient detects 401 response
├─ Removes token from localStorage
├─ Redirects to /login
├─ User must re-authenticate
└─ New token generated on login

SCENARIO: Superadmin deletes their own account
├─ Allowed by backend (no self-protection)
├─ User gets deleted from database
├─ On next refresh: redirect to login (no token)
└─ Superadmin can create new account
```

---

**System fully documented and ready for deployment! 🚀**
