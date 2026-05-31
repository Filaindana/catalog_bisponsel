# 🎯 RBAC Deployment & Testing Checklist

**Project**: BizPonsel Catalog  
**Version**: 1.0  
**Date**: June 1, 2026

---

## ✅ Pre-Deployment Checklist

### Backend Prerequisites
- [ ] PHP 8.1+ installed
- [ ] Composer installed
- [ ] MySQL/MariaDB installed and running
- [ ] `.env` file exists with database config
- [ ] `APP_KEY` generated

### Frontend Prerequisites
- [ ] Node.js 18+ installed
- [ ] npm/yarn installed
- [ ] axios in package.json

---

## 📦 Installation Checklist

### Backend Installation
```
□ cd catalog-be
□ composer install
□ cp .env.example .env
□ php artisan key:generate
□ Configure DB credentials in .env
  - DB_HOST=127.0.0.1
  - DB_PORT=3306
  - DB_DATABASE=bizponsel_catalog
  - DB_USERNAME=root
  - DB_PASSWORD=
□ php artisan migrate
□ php artisan db:seed --class=UserSeeder
□ php artisan serve (on port 8000)
□ Verify: http://127.0.0.1:8000/api/auth/me returns 401 (no token)
```

### Frontend Installation
```
□ cd catalog-fe
□ npm install
□ Verify axios installed
□ npm run dev
□ Verify: http://localhost:5173 loads without errors
```

---

## 🧪 Testing Checklist

### Authentication Tests

#### 1. User Login (Regular User)
```
Test: Login as user
□ Go to http://localhost:5173/login
□ Email: user@bizponsel.com
□ Password: password
□ Expected: Redirect to / (public website)
□ Verify: localStorage has token & user with peran='user'
□ Result: ✅ PASS / ❌ FAIL
```

#### 2. Admin Login
```
Test: Login as admin
□ Go to http://localhost:5173/login
□ Email: admin@bizponsel.com
□ Password: password
□ Expected: Redirect to /admin (dashboard)
□ Verify: localStorage has token & user with peran='admin'
□ Verify: Sidebar shows menu WITHOUT "User" option
□ Result: ✅ PASS / ❌ FAIL
```

#### 3. Superadmin Login
```
Test: Login as superadmin
□ Go to http://localhost:5173/login
□ Email: superadmin@bizponsel.com
□ Password: password
□ Expected: Redirect to /admin (dashboard)
□ Verify: localStorage has token & user with peran='superadmin'
□ Verify: Sidebar shows menu WITH "User" option
□ Result: ✅ PASS / ❌ FAIL
```

#### 4. Inactive User Login
```
Test: Login as inactive user
□ Go to http://localhost:5173/login
□ Email: inactive@bizponsel.com
□ Password: password
□ Expected: Error message "Akun Anda telah dinonaktifkan."
□ Not redirected anywhere
□ Result: ✅ PASS / ❌ FAIL
```

#### 5. Wrong Credentials
```
Test: Login with wrong email
□ Email: wrong@example.com
□ Password: anything
□ Expected: Error "Email atau password salah."

Test: Login with wrong password
□ Email: admin@bizponsel.com
□ Password: wrongpassword
□ Expected: Error "Email atau password salah."
□ Result: ✅ PASS / ❌ FAIL
```

---

### Authorization Tests

#### 6. Admin Cannot Access User Management
```
Test: Admin access /admin/users
□ Login as admin (already tested)
□ Try to access: http://localhost:5173/admin/users
□ Expected: Redirect to /admin (forbidden)
□ Expected: Sidebar "User" menu NOT visible to admin
□ Result: ✅ PASS / ❌ FAIL
```

#### 7. Superadmin Can Access User Management
```
Test: Superadmin access /admin/users
□ Login as superadmin (already tested)
□ Click "User" menu in sidebar
□ Expected: /admin/users page loads
□ Expected: User table visible with:
  - Search box
  - Pagination controls
  - User data table
  - Add/Edit/Delete buttons
□ Result: ✅ PASS / ❌ FAIL
```

#### 8. Unauthenticated Cannot Access Admin
```
Test: No login access /admin
□ Clear localStorage (logout)
□ Go to http://localhost:5173/admin
□ Expected: Redirect to /login
□ Result: ✅ PASS / ❌ FAIL
```

---

### User Management CRUD Tests

#### 9. Create User
```
Test: Superadmin creates new user
□ Login as superadmin
□ Go to /admin/users
□ Click "Tambah User" button
□ Fill form:
  - Nama: "Test User"
  - Email: "testuser@example.com"
  - Password: "password123" (8+ chars)
  - Role: "user"
□ Click "Simpan"
□ Expected: Success message
□ Expected: Modal closes
□ Expected: New user appears in table
□ Result: ✅ PASS / ❌ FAIL

Validation Tests:
□ Empty Nama → show error
□ Invalid Email → show error
□ Password < 8 chars → show error
□ Duplicate Email → show error from backend
□ Result: ✅ PASS / ❌ FAIL
```

#### 10. Read/Search Users
```
Test: Search functionality
□ Type in search box: "user1"
□ Expected: Table filters to show only matching users
□ Result: ✅ PASS / ❌ FAIL

Test: Search by email
□ Type in search box: "@example.com"
□ Expected: Show all users with that email domain
□ Result: ✅ PASS / ❌ FAIL

Test: Pagination
□ Change "per halaman" dropdown to 5
□ Expected: Show 5 users per page
□ Click next page
□ Expected: Show next 5 users
□ Result: ✅ PASS / ❌ FAIL
```

#### 11. Update User
```
Test: Edit user
□ Click edit icon on any user
□ Modal opens with user data
□ Change: Nama to "Updated Name"
□ Change: Role to "admin"
□ Click "Simpan"
□ Expected: Success message
□ Expected: User table updated
□ Expected: Name and role changed
□ Result: ✅ PASS / ❌ FAIL

Test: Cannot update with invalid data
□ Click edit icon
□ Clear email field
□ Click "Simpan"
□ Expected: Error message
□ Result: ✅ PASS / ❌ FAIL
```

#### 12. Delete User
```
Test: Delete user
□ Click delete icon on any user
□ Confirmation modal shows
□ Click "Hapus"
□ Expected: Success message
□ Expected: User removed from table
□ Expected: Total user count decreased
□ Result: ✅ PASS / ❌ FAIL

Test: Cancel delete
□ Click delete icon
□ Click "Batal"
□ Expected: Modal closes
□ Expected: User NOT deleted
□ Result: ✅ PASS / ❌ FAIL
```

#### 13. Toggle User Status
```
Test: Deactivate user
□ Find any user in table
□ Click status badge "Active"
□ Expected: Status changes to "Inactive"
□ Expected: User badge shows gray "Inactive"
□ Result: ✅ PASS / ❌ FAIL

Test: Inactive user cannot login
□ Deactivate a user (e.g., admin account)
□ Logout
□ Try to login with deactivated account
□ Expected: Error "Akun Anda telah dinonaktifkan."
□ Result: ✅ PASS / ❌ FAIL

Test: Reactivate user
□ Click status badge "Inactive"
□ Expected: Status changes back to "Active"
□ Expected: User can login again
□ Result: ✅ PASS / ❌ FAIL
```

---

### Data Display Tests

#### 14. Role Badges
```
Test: Role badges display correctly
□ Admin page shows users with role badges:
  - User (blue background)
  - Admin (orange background)
  - Super Admin (red background)
□ Badges are readable and properly styled
□ Result: ✅ PASS / ❌ FAIL
```

#### 15. Status Badges
```
Test: Status badges display correctly
□ Table shows status badges:
  - Active (green background)
  - Inactive (gray background)
□ Can click badges to toggle
□ Result: ✅ PASS / ❌ FAIL
```

#### 16. Password Display
```
Test: Password hash display
□ Password Hash column shows masked hash:
  - Format: $2y$10$**************
  - First 14 chars visible
  - Remaining 34 chars masked
□ Never shows plain password
□ Result: ✅ PASS / ❌ FAIL
```

#### 17. Date Formatting
```
Test: Dates display correctly
□ "Bergabung" column shows formatted date:
  - Format: DD/MM/YYYY (Indonesian)
  - Example: 01/06/2026
□ Dates are correct based on database
□ Result: ✅ PASS / ❌ FAIL
```

---

### API Endpoint Tests

#### 18. GET /api/admin/users (Superadmin)
```bash
Test: Fetch all users
□ Authorization: Bearer {superadmin_token}
□ Expected: 200 OK
□ Response includes pagination data:
  - data: array of users
  - current_page: 1
  - last_page: N
  - total: count of users
□ Result: ✅ PASS / ❌ FAIL

Test: As admin
□ Authorization: Bearer {admin_token}
□ Expected: 403 Forbidden
□ Result: ✅ PASS / ❌ FAIL

Test: As regular user
□ Authorization: Bearer {user_token}
□ Expected: 403 Forbidden
□ Result: ✅ PASS / ❌ FAIL

Test: No token
□ No Authorization header
□ Expected: 401 Unauthorized
□ Result: ✅ PASS / ❌ FAIL
```

#### 19. POST /api/admin/users (Create)
```bash
Test: Create new user
□ Authorization: Bearer {superadmin_token}
□ Body: { nama, email, password, peran }
□ Expected: 201 Created
□ Response includes created user
□ Result: ✅ PASS / ❌ FAIL

Test: Validation errors
□ Missing required fields
□ Expected: 422 Unprocessable Entity
□ Response includes validation errors
□ Result: ✅ PASS / ❌ FAIL

Test: As admin
□ Authorization: Bearer {admin_token}
□ Expected: 403 Forbidden
□ Result: ✅ PASS / ❌ FAIL
```

#### 20. PUT /api/admin/users/{id} (Update)
```bash
Test: Update user
□ Authorization: Bearer {superadmin_token}
□ Body: { nama, email, peran, is_active }
□ Expected: 200 OK
□ Response includes updated user
□ Result: ✅ PASS / ❌ FAIL

Test: User not found
□ ID: 9999 (non-existent)
□ Expected: 404 Not Found
□ Result: ✅ PASS / ❌ FAIL
```

#### 21. DELETE /api/admin/users/{id} (Delete)
```bash
Test: Delete user
□ Authorization: Bearer {superadmin_token}
□ Expected: 200 OK
□ User no longer exists in database
□ Result: ✅ PASS / ❌ FAIL

Test: User not found
□ ID: 9999 (non-existent)
□ Expected: 404 Not Found
□ Result: ✅ PASS / ❌ FAIL
```

#### 22. POST /api/admin/users/{id}/toggle-status
```bash
Test: Toggle status
□ Authorization: Bearer {superadmin_token}
□ Expected: 200 OK
□ is_active value flipped
□ Result: ✅ PASS / ❌ FAIL
```

---

### Browser Console Tests

#### 23. No Console Errors
```
Test: Check browser console
□ Open DevTools (F12)
□ Go through all user management operations
□ Expected: No red error messages
□ Expected: No warnings related to auth
□ Result: ✅ PASS / ❌ FAIL
```

---

### Performance Tests

#### 24. Page Load Time
```
Test: /admin/users page load
□ Measure time from navigation to table display
□ Expected: < 2 seconds
□ Result: ✅ PASS / ❌ FAIL
```

#### 25. Search Performance
```
Test: Search with 100+ users
□ Type in search box
□ Expected: Results update within 300ms
□ Expected: No lag or freezing
□ Result: ✅ PASS / ❌ FAIL
```

---

## 🐛 Bug Report Template

If any test fails, report using this template:

```
Test Name: [e.g., "Admin Cannot Access User Management"]
Expected Result: [What should happen]
Actual Result: [What actually happened]
Steps to Reproduce:
  1. [Step 1]
  2. [Step 2]
  3. [Step 3]
Browser Console Error: [If applicable]
Laravel Log Error: [If applicable]
Screenshots: [If applicable]
Severity: [Critical / High / Medium / Low]
```

---

## ✨ Final Sign-Off

### Developer Checklist
- [ ] All code committed to repository
- [ ] All tests pass
- [ ] No console errors
- [ ] Documentation complete
- [ ] Ready for QA/Staging

### QA Checklist
- [ ] All test scenarios completed
- [ ] No bugs found
- [ ] Performance acceptable
- [ ] Ready for production

### Deployment Checklist
- [ ] Database backed up
- [ ] Code deployed to production
- [ ] Migration run successfully
- [ ] Seeds run successfully
- [ ] API endpoints accessible
- [ ] Frontend loads correctly
- [ ] Monitoring alerts configured
- [ ] Rollback plan ready

---

**Project Status: ✅ READY FOR TESTING**

All components implemented and documented.  
Ready for QA verification and deployment.

---

**Sign-off:**
- Developer: ___________________ Date: ___________
- QA: ___________________ Date: ___________
- DevOps: ___________________ Date: ___________
