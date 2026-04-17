# 📋 Task Manager System (Multi-Tenant)

![Backend](https://img.shields.io/badge/Backend-Node.js-green)
![Database](https://img.shields.io/badge/Database-MySQL-orange)
![Auth](https://img.shields.io/badge/Auth-JWT-blueviolet)

A professional task management solution supporting Multi-Tenancy (Companies) and Role-Based Access Control (RBAC). Manage companies, users, and tasks with granular permissions for Admins, Managers, and Employees.

---

## 🌟 Key Features

### 🏢 Multi-Tenancy & Company Management
- **Isolation:** Each company operates in its own workspace.
- **Admin Control:** Global Admins can manage all companies and their settings.

### 👥 User & Role Management
- **RBAC:** Three distinct roles: `Admin`, `Manager`, and `Employee`.
- **Approval System:** New users require approval before gaining access.
- **Profile Management:** Users can manage their own profiles and avatars.

### 📝 Task Tracking
- **Lifecycle:** Track tasks through `Pending`, `In Progress`, and `Done` statuses.
- **Attachments:** Securely upload, view, and delete files linked to specific tasks.
- **Assignment:** Assign tasks to specific employees within the same company.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Backend** | Node.js, Express |
| **ORM** | Sequelize (MySQL) |
| **Frontend** | React.js, React Bootstrap |
| **Authentication** | JSON Web Tokens (JWT) & Bcrypt |
| **File Handling** | Multer / Local Storage |

---

## 🎥 Video Demonstration

Check out the full workflow and features in the demo video:

📺 **[Watch Task Manager Demo](https://youtu.be/2loxLhMpUbs)**

---

## 🔑 Role Permissions

| Feature | Admin | Manager | Employee |
| :--- | :---: | :---: | :---: |
| Manage Companies | ✅ | ❌ | ❌ |
| Manage Users | ✅ | ✅ | ❌ |
| Create/Delete Tasks | ✅ | ✅ | ❌ |
| Update Task Status | ✅ | ✅ | ✅ |
| View Own Tasks | ✅ | ✅ | ✅ |

---

## 📡 API Endpoints (Core)

### Authentication
- `POST /auth/register-admin` – Register initial admin
- `POST /auth/login` – Secure login & JWT generation

### Tasks & Files
- `GET /tasks` – List company tasks
- `POST /tasks` – Create new task
- `PATCH /tasks/:id/status` – Transition task state
- `POST /tasks/:id/file` – Upload attachment

---
