
# Blog App

This is a full-stack blog application built with **React**, **Node.js**, **Express**, and **MongoDB**. The app allows users to authenticate, create, update, delete blogs, and view all blogs or their own blogs.

## Features

- User Authentication (Signup, Login)
- Create, Update, Delete blogs
- View all blogs
- View only user-specific blogs
- State management with **Redux**
- API handling with **Axios**
- Backend server built with **Node.js** and **Express**
- **MongoDB** as the database

## Folder Structure

### Frontend (in `/frontend`)
The frontend of the application is created using React and is located in the `src` directory. The folder structure is as follows:

- **/src**
  - **components**:
    - `AddBlog`
    - `Auth`
    - `Blog`
    - `BlogDetails`
    - `Blogs`
    - `Header`
    - `UserBlogs`
  - **store**:
    - `index.js` (Redux store)
  - **assets**: Static assets (images, icons, etc.)
  - `App.jsx`: Main app component
  - `Main.jsx`: Main entry point for rendering the app
  - `index.css`: Global CSS styles

### Backend (in `/backend`)
The backend of the application is built using Node.js and Express and has the following structure:

- **/backend**
  - **controllers**:
    - `Blog.controller.js`
    - `User.controller.js`
  - **models**:
    - `Blog.model.js`
    - `User.model.js`
  - **routes**:
    - `Blog.route.js`
    - `User.route.js`
  - `index.js`: Main server file

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud-based)

### Backend Setup

1. Navigate to the backend folder:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `/backend` folder and add your environment variables:

    ```bash
    DATABASE=<your_mongodb_database_url>
    PORT=3000
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend folder:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm run dev
    ```

## API Endpoints

- **User Authentication**:
  - `POST /api/user/signup`: Create a new user
  - `POST /api/user/login`: Authenticate a user

- **Blog Management**:
  - `GET /api/blogs`: Get all blogs
  - `GET /api/blogs/:id`: Get a specific blog by ID
  - `POST /api/blogs`: Create a new blog
  - `PUT /api/blogs/:id`: Update a blog by ID
  - `DELETE /api/blogs/:id`: Delete a blog by ID

## Technologies Used

- **Frontend**:
  - React.js
  - Redux (State Management)
  - Axios (HTTP Requests)
  - Tailwind CSS (Optional)
  
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Database)
  - Mongoose (MongoDB ODM)

## Running the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/rakeshmakvana/Blog-App

2. Set up the backend (see **Backend Setup** above).

3. Set up the frontend (see **Frontend Setup** above).

4. Ensure both the frontend and backend are running simultaneously for the app to function properly.

## Environment Variables

The following environment variables need to be configured in the `.env` file (inside `/backend`):

```bash
DATABASE=<your_mongodb_database_url>
PORT=3000
```

## License

This project is licensed under the MIT License.
