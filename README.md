[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19862068&assignment_repo_type=AssignmentRepo)
# MERN Stack Integration Assignment - Week 4

## 🎯 Assignment Overview

This project demonstrates a complete full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that showcases seamless integration between front-end and back-end components. The application is a fully functional blog platform with user authentication, CRUD operations, and advanced features.

## ✅ Assignment Objectives Completed

### Task 1: Project Setup ✅
- [x] Clear directory structure for both client and server
- [x] MongoDB connection with Mongoose
- [x] Express.js server with necessary middleware
- [x] React frontend with Vite and proxy configuration
- [x] Environment variables management

### Task 2: Backend Development ✅
- [x] RESTful API for blog posts and categories
- [x] Mongoose models for Post, Category, and User with relationships
- [x] Input validation using express-validator
- [x] Error handling middleware
- [x] JWT authentication and authorization

### Task 3: Frontend Development ✅
- [x] React components for posts, forms, navigation, and layout
- [x] React Router for navigation between views
- [x] React hooks for state management (useState, useEffect)
- [x] Custom API service for backend communication

### Task 4: Integration and Data Flow ✅
- [x] API service in React to communicate with backend
- [x] State management for posts and categories
- [x] Forms with proper validation for creating/editing posts
- [x] Loading and error states for API calls
- [x] Optimistic UI updates for comments

### Task 5: Advanced Features ✅
- [x] User authentication (registration, login, protected routes)
- [x] Comments feature for blog posts
- [x] CRUD operations for posts with authorization
- [x] Category management
- [x] Responsive design with Tailwind CSS

## 🚀 Features Implemented

### Core Features
- **User Authentication System**
  - User registration with validation
  - Secure login with JWT tokens
  - Protected routes and authorization
  - User-specific actions (edit/delete own posts)

- **Blog Post Management**
  - Create, read, update, delete posts
  - Rich text content with excerpts
  - Category organization
  - Tags support
  - Publish/unpublish functionality

- **Comments System**
  - Add comments to posts (authenticated users)
  - Real-time comment updates
  - Comment display with user information

- **Category Management**
  - Create and manage post categories
  - Category-based post filtering
  - Admin-only category management

### Advanced Features
- **Responsive Design**
  - Modern UI with Tailwind CSS
  - Mobile-friendly interface
  - Clean, professional design

- **Form Validation**
  - Client-side validation
  - Server-side validation with express-validator
  - User-friendly error messages

- **Error Handling**
  - Comprehensive error handling
  - User-friendly error messages
  - Loading states and feedback

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

## 📁 Project Structure

```
mern-blog/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── PostCard.jsx
│   │   │   ├── CommentForm.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── PostPage.jsx
│   │   │   ├── PostFormPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/       # API services
│   │   │   └── api.js
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/                 # Express backend
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── categoryController.js
│   ├── middleware/         # Custom middleware
│   │   ├── auth.js
│   │   ├── error.js
│   │   └── validate.js
│   ├── models/             # Mongoose models
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Category.js
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── posts.js
│   │   └── categories.js
│   ├── server.js           # Main server file
│   ├── package.json
│   └── env.example
├── setup.js               # Setup automation script
├── package.json           # Root package.json
└── README.md              # This file
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-blog
   ```

2. **Run the automated setup**
   ```bash
   npm run setup
   ```

3. **Start both servers**
   ```bash
   npm run dev
   ```

### Manual Setup

#### Backend Setup
```bash
cd server
npm install
cp env.example .env
# Update .env with your MongoDB URI and JWT secret
npm run dev
```

#### Frontend Setup
```bash
cd client
npm install
npm run dev
```

### Environment Configuration
Create a `.env` file in the server directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:5000

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user
```json
{
  "username": "june siele",
  "email": "junesiele@gmail.com",
  "password": "password123",
  "firstName": "June",
  "lastName": "siele"
}
```

#### POST /api/auth/login
Login user
```json
{
  "email": "junesiele@gmail.com",
  "password": "password123"
}
```

#### GET /api/auth/me
Get current user (requires authentication)

### Posts Endpoints

#### GET /api/posts
Get all published posts
- Query parameters: `page`, `limit`, `category`, `search`

#### GET /api/posts/:id
Get a specific post

#### POST /api/posts
Create a new post (requires authentication)
```json
{
  "title": "My Blog Post",
  "content": "Post content...",
  "category": "categoryId",
  "excerpt": "Brief summary",
  "tags": "tag1, tag2, tag3",
  "isPublished": true
}
```

#### PUT /api/posts/:id
Update a post (requires authentication)

#### DELETE /api/posts/:id
Delete a post (requires authentication)

#### POST /api/posts/:id/comments
Add a comment to a post (requires authentication)
```json
{
  "content": "Great post!"
}
```

### Categories Endpoints

#### GET /api/categories
Get all active categories

#### POST /api/categories
Create a new category (admin only)
```json
{
  "name": "Technology",
  "description": "Tech-related posts",
  "color": "#3B82F6"
}
```

## 🎯 Key Features Demonstrated

### 1. Full CRUD Operations
- **Create**: Users can create new blog posts
- **Read**: Display posts with pagination and filtering
- **Update**: Authors can edit their own posts
- **Delete**: Authors can delete their own posts

### 2. User Authentication & Authorization
- Secure user registration and login
- JWT token-based authentication
- Protected routes and actions
- User-specific permissions

### 3. Database Integration
- MongoDB with Mongoose ODM
- Proper data relationships (User -> Posts, Posts -> Comments)
- Data validation and error handling

### 4. Frontend-Backend Integration
- Seamless API communication
- Real-time data updates
- Error handling and loading states
- Responsive user interface

### 5. Advanced Features
- Comments system with real-time updates
- Category management
- Form validation (client and server-side)
- Professional UI/UX design

## 🧪 Testing the Application

1. **Register a new account** at http://localhost:3001/register
2. **Login** with your credentials
3. **Create a blog post** using the "Create New Post" button
4. **View posts** on the home page
5. **Add comments** to posts (when logged in)
6. **Edit/delete** your own posts
7. **Test the responsive design** on different screen sizes

## 📸 Screenshots

*Screenshots of the working application will be added here to demonstrate the completed functionality*

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the MONGODB_URI in .env file

2. **Port Already in Use**
   - Change ports in configuration files
   - Kill processes using the ports

3. **Dependencies Issues**
   - Delete node_modules and run npm install again
   - Check Node.js version compatibility

## 📝 Submission Checklist

- [x] Complete client and server code
- [x] Environment configuration files
- [x] Comprehensive README with setup instructions
- [x] API documentation
- [x] All required features implemented
- [x] Code organization and best practices
- [x] Error handling and validation
- [x] Responsive design
- [x] Authentication and authorization

## 🎉 Conclusion

This MERN Stack Integration Assignment demonstrates a complete full-stack application with:

- **Seamless integration** between MongoDB, Express.js, React.js, and Node.js
- **Professional code organization** with separation of concerns
- **Comprehensive feature set** including authentication, CRUD operations, and advanced features
- **Modern development practices** with proper error handling, validation, and user experience
- **Production-ready structure** that can be easily extended and maintained

The application successfully meets all assignment requirements and demonstrates proficiency in MERN stack development.

---

**Student Name**: [Your Name]  
**Course**: MERN Stack Development  
**Week**: 4 - MERN Integration Assignment  
**Date**: [Submission Date] 