
# Project Setup Instructions

## Step 1: Import Database Table into MySQL
1. Open MySQL Workbench or MySQL Command Line.
2. Create a database if it doesn't exist:
   ```sql
   CREATE DATABASE your_database_name;
   ```
3. Import the table provided in the `database` folder:
   ```sql
   USE your_database_name;
   SOURCE path_to_your_database_file.sql;
   ```

## Step 2: Backend Setup
1. Open the backend folder in Visual Studio Code.
2. Open the terminal inside VS Code.
3. Run the following command to install backend dependencies:
   ```bash
   npm install
   ```
4. After installation, start the backend server:
   ```bash
   npm start
   ```
5. The backend server should now be running.

## Step 3: Frontend Setup
1. Open the frontend folder in Visual Studio Code.
2. Open the terminal inside VS Code.
3. Run the following command to install frontend dependencies:
   ```bash
   npm install
   ```
4. After installation, start the frontend server:
   ```bash
   npm run dev
   ```
5. The frontend server will be started and accessible in your browser.

6. ENV FILE FOR BACKEND
DB_USER= root
DB_PASSWORD=Avi@1527
DB_DATABASE=user_task
PORT=3600

JWT_SECRET=9c5e4a0b6d684c2d9b7b9f22a4a72bde83ea40c5a799f9b1f3e79fd17f91d827


