# 🚀 Getting Started with Sistem Peminjaman Development

## 📖 Table of Contents

- [🚀 Getting Started with Sistem Peminjaman Development](#🚀-getting-started-with-sistem-peminjaman-development)
  - [📖 Table of Contents](#📖-table-of-contents)
  - [📝 Introduction](#📝-introduction)
  - [📦 Installation](#📦-installation)
  - [🧩 How to Start Development](#🧩-how-to-start-development)
  - [📚 Account Information](#📚-account-information)

## 📝 Introduction

Sistem peminjaman adalah sebuah sistem yang digunakan untuk mengelola peminjaman di kampus. Aplikasi ini dibuat menggunakan NextJS dan PlanetScale DB.

## 📦 Installation

1. Clone this repository
2. Install all dependencies using pnpm install
3. Pull the latest changes from environment variables
   ```bash
   npx dotenv-vault@latest pull
   ```

## 🧩 How to Start Development

1. Run the development server.
   ```bash
   pnpm run dev
   ```
2. You should have a ngrok server to run this application, you can download it [here](https://ngrok.com/download). After that, run the ngrok server.
   ```bash
   ./ngrok http 3000
   ```
3. Copy the ngrok url and paste it to note, you will need it later.
4. Login to Clerk dahboard using admin account. Then go to webhooks and add api endpoint to the webhook.
   ```bash
   https://<your-ngrok-url>/api/webhooks/user
   ```

## 📚 Account Information

1. Google
   - Email: `projekramdan@gmail.com`
   - Password: `projekramdan@2023`
2. PlanetScale
   - Email: `projekramdan@gmail.com`
   - Password: `projekramdan@2023`
3. Clerk
   - Email: `projekramdan@gmail.com`
   - Password: `projekramdan@2023`
