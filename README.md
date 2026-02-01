---

# Task Manager

Ein einfaches Aufgabenverwaltungssystem mit Rollenunterstützung (Admin, Manager, Employee) und Mandantenfähigkeit (Unternehmen).

Der Service ermöglicht das Erstellen von Unternehmen, die Verwaltung von Benutzern und das Zuweisen von Aufgaben an Mitarbeiter.

---

## 📦 Technologien

**Backend:** - Node.js

* Express
* Sequelize + MySQL
* JWT für die Authentifizierung
* Bcrypt für die Passwort-Hashen

**Frontend:** - React.js

* React Router
* React Bootstrap

---

## ⚙️ Installation

### Backend

1. Klonen Sie das Repository:

```bash
git clone https://github.com/YaroslavOstapenko/TaskManager.git
cd admin-service

```

2. Installieren Sie die Abhängigkeiten:

```bash
npm install

```

3. Erstellen Sie die MySQL-Datenbank:

```sql
CREATE DATABASE taskmanager
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

```

4. Erstellen und konfigurieren Sie die Datei `.env` im `backend`-Stammverzeichnis (Beispiel `admin-service`):

```
PORT=5000
DB_HOST=localhost
DB_USER=ihr_db_benutzer
DB_PASS=ihr_db_passwort
DB_NAME=taskmanager
JWT_SECRET=supersecretkey
UPLOAD_DIR=uploads

```

5. Starten Sie den Server:

```bash
npm start

```

---

### Frontend

1. Wechseln Sie in den Frontend-Ordner:

```bash
cd admin-client

```

2. Installieren Sie die Abhängigkeiten:

```bash
npm install

```

3. Starten Sie den Client:

```bash
npm start

```

Die Anwendung wird unter der Adresse: `http://localhost:3000` erreichbar sein.

---

## 🔑 Benutzerrollen

| Rolle | Verfügbare Bereiche |
| --- | --- |
| Admin | Unternehmen, Benutzer, Aufgaben |
| Manager | Benutzer, Aufgaben |
| Employee | Aufgaben |

---

## 📝 Funktionen

### Benutzer

* Registrierung des Administrators (Backend: `/auth/register-admin`)
* Login (`/auth/login`)
* Profilansicht und Bearbeitung von Daten
* Hinzufügen neuer Mitarbeiter (Admin/Manager)
* Änderung der Benutzerrolle
* Freigabe (Approval) neuer Benutzer
* Löschen von Benutzern

### Unternehmen

* Erstellung eines Unternehmens (Admin)
* Anzeige von Unternehmensinformationen
* Bearbeitung des Unternehmensnamens (nur Eigentümer)
* Liste aller Unternehmen (Admin)

### Aufgaben

* Erstellung von Aufgaben (Manager/Admin)
* Zuweisung von Aufgaben an Mitarbeiter
* Änderung des Aufgabenstatus (`pending`, `in_progress`, `done`)
* Löschen von Aufgaben (Manager/Admin)
* Anhängen von Dateien an Aufgaben
* Anzeigen von Aufgabendateien

---

## 🔗 API-Endpunkte

### Auth (Authentifizierung)

* `POST /auth/register-admin` — Administrator registrieren
* `POST /auth/login` — Einloggen

### Users (Benutzer)

* `GET /users` — Liste der Benutzer des Unternehmens
* `GET /users/me` — Aktueller Benutzer
* `POST /users/add` — Benutzer hinzufügen
* `PATCH /users/approve/:id` — Benutzer genehmigen
* `PATCH /users/role/:id` — Rolle ändern
* `DELETE /users/:id` — Benutzer löschen

### Company (Unternehmen)

* `GET /users/company` — Informationen über das Unternehmen
* `POST /users/company/create` — Unternehmen erstellen
* `PUT /users/companyEdit` — Unternehmen bearbeiten
* `GET /users/companies` — Liste aller Unternehmen

### Tasks (Aufgaben)

* `GET /tasks` — Liste aller Aufgaben
* `POST /tasks` — Aufgabe erstellen
* `PATCH /tasks/:id/status` — Status ändern
* `DELETE /tasks/:id` — Aufgabe löschen
* `POST /tasks/:id/file` — Datei anhängen
* `GET /tasks/:id/files` — Dateiliste anzeigen
* `DELETE /tasks/:id/file` — Datei löschen

---

## 🎥 Demonstration

Hier können Sie ein Video der Anwendung in Aktion sehen:

* [Task Management Demo](https://youtu.be/2loxLhMpUbs)

---

## 🛡️ Sicherheit

* Passwörter werden verschlüsselt gespeichert (bcrypt)
* Authentifizierung über JWT
* Rollenprüfung für den API-Zugriff
* Nur der Unternehmenseigentümer kann Unternehmensdaten bearbeiten

---

## 💡 Lokaler Start

1. Starten Sie MySQL und erstellen Sie die Datenbank.
2. Konfigurieren Sie die `.env` Datei (siehe oben).
3. Starten Sie das Backend (`npm start`).
4. Starten Sie das Frontend (`npm start`).
5. Registrieren Sie einen Administrator, erstellen Sie ein Unternehmen und beginnen Sie mit dem Hinzufügen von Benutzern und Aufgaben.
