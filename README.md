# Full Stack Setup Guide (Laravel + Next.js + MySQL + Docker + PWA)

This guide shows how to run a full-stack project using:

* Laravel (API)
* Next.js (Frontend + PWA)
* MySQL (Database via Docker)
* Docker (One-command setup)
* DBeaver (Database GUI)

---

# 📁 Project Structure

```
project/
 ├── apps/
 │    ├── web/              # Next.js (PWA)
 │    └── api/              # Laravel API
 ├── docker/
 ├── docker-compose.yml
 ├── .env
 ├── .gitignore
 ├── README.md
```

---

# 🚀 Goal

Run everything with ONE command:

```bash
docker compose up -d --build
```

---

# ⚙️ 1. SINGLE ROOT ENV FILE (.env)

Create `.env` in project root ONLY:

```env
APP_NAME="MDS Dental and Aesthetic Clinic"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost
APP_KEY=

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

MYSQL_DATABASE=mdsdental
MYSQL_ROOT_PASSWORD=root
MYSQL_PORT=3306

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=mdsdental
DB_USERNAME=root
DB_PASSWORD=root

NEXT_PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:8000

LARAVEL_PORT=8000

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=infinitech.hazel@gmail.com
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=infinitech.hazel@gmail.com
MAIL_FROM_NAME="${APP_NAME}"
```

---

# 🐳 2. DOCKER COMPOSE

```yaml
version: "3.9"

services:

  mysql:
    image: mysql:8
    container_name: mysql_db
    restart: always
    env_file:
      - .env
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
    ports:
      - "${MYSQL_PORT}:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  api:
    build:
      context: ./apps/api
    container_name: laravel_api
    restart: always
    working_dir: /var/www
    volumes:
      - ./apps/api:/var/www
    ports:
      - "${LARAVEL_PORT}:8000"
    env_file:
      - .env
    depends_on:
      - mysql
    command: php artisan serve --host=0.0.0.0 --port=8000

  web:
    build:
      context: ./apps/web
    container_name: next_web
    restart: always
    working_dir: /app
    volumes:
      - ./apps/web:/app
      - /app/node_modules
    ports:
      - "${NEXT_PORT}:3000"
    env_file:
      - .env
    command: npm run dev

volumes:
  mysql_data:
```

---

# 🐘 3. RUN PROJECT

```bash
docker compose up -d --build
```

---

# 🧰 4. DATABASE ACCESS (DBEAVER)

Connect using:

* Host: `127.0.0.1`
* Port: `3306`
* Database: `mdsdental`
* Username: `root`
* Password: `root`

---

# 🚫 5. GITIGNORE

```gitignore
.env
.env.*

apps/web/node_modules
apps/web/.next

apps/api/vendor
apps/api/storage/logs

.DS_Store
.vscode
.idea
```

---

# 📘 ROOT README.md (PARENT)

## 🚀 Project Overview

This is a full-stack monorepo using:

* Laravel (API backend)
* Next.js (PWA frontend)
* MySQL (database via Docker)
* Docker (containerized environment)

---

## 🧠 Architecture

```text
Next.js (web)
   ↓ API calls
Laravel (api)
   ↓ queries
MySQL (db container)
```

---

## ⚡ One Command Start

```bash
docker compose up -d --build

for development 
docker compose up -d 
```

---

## 📦 Requirements

* Docker Desktop
* Node.js (for local dev optional)
* Git

---

## 🔥 Features

* One env file for entire system
* Dockerized full-stack setup
* PWA-ready frontend
* Clean monorepo structure
* GitHub-ready configuration

---

## 🛠 Development Flow

1. Edit Laravel API in `apps/api`
2. Edit Next.js in `apps/web`
3. Run Docker once
4. Done

