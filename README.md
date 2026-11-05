# 🌍 Social Development Events Platform (SDEP)

A full-stack web application designed to connect people through social development activities and community events. Users can explore upcoming events, create and manage their own events, and join activities that contribute to making society better.

## 🚀 Live Demo

- **Live Website:** [Add Your Deployed Website URL]
- **Frontend Repository:** [Add Your GitHub Repository URL]
- **Backend Repository:** [Add Your Backend Repository URL]

## ✨ Features

- **User Authentication:** Secure user registration and login using Better Auth.
- **Explore Events:** Browse upcoming social development events.
- **Create Events:** Authenticated users can create new community events.
- **My Events:** View and manage personally created events.
- **Edit Events:** Update existing event information.
- **Delete Events:** Remove events when necessary.
- **Join Events:** Participate in available community events.
- **Joined Events:** View events that the user has joined.
- **Event Categories:** Explore events by category.
- **Search Functionality:** Search events by title and location.
- **Event Details:** View detailed information about individual events.
- **Dark/Light Theme:** Switch between dark and light appearance.
- **Responsive Design:** Optimized for mobile, tablet, laptop and desktop devices.
- **Toast Notifications:** Get instant feedback for important actions.

## 🛠️ Technologies Used

### Frontend
- Next.js
- React.js
- Tailwind CSS
- Lucide React
- Sonner

### Backend
- Node.js
- Express.js
- MongoDB
- Better Auth

### Tools & Services
- Git & GitHub
- Vercel
- MongoDB Atlas

## 📂 Project Structure

```text
Social-Development-Events-Platform/
│
├── events-platform-web/
│   ├── public/
│   │   └── images/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   ├── package.json
│   └── .env.local
│
└── server/
    ├── index.js
    ├── package.json
    └── .env
```

*Note: The structure above is illustrative. Adjust it to match your actual repository.*

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Frontend Setup

Navigate to the frontend directory:

```bash
cd events-platform-web
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the frontend root directory:

```env
MONGODB_URL=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secure_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Add only the environment variables actually required by your frontend configuration.

Start the development server:

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:3000
```

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
```

Start the backend server:

```bash
npm start
```

If your project uses a different start script, use the command defined in your backend `package.json`.

Backend will run at:

```text
http://localhost:5000
```

## 🗄️ Database Configuration

This project uses MongoDB for storing application data.

**Database:** MongoDB

**Database Name:** Event

The database stores event information and authentication-related data.

Make sure your MongoDB connection string is correctly configured in the environment variables.

## 📅 Event Categories

The platform supports the following event categories:

- Donation
- Cleanup
- Plantation
- Winter Relief
- Food Drive
- Health Camp
- Education

Users can explore events based on their preferred categories.

## 🔐 Authentication

Better Auth is used to manage user authentication.

Authentication features include:

- User registration
- User login
- Session management
- Cookie-based authentication
- Protected pages
- User-specific event management
- Logout

## 📱 Responsive Design

The platform is designed to provide a smooth experience across different screen sizes:

- Mobile Phones
- Tablets
- Laptops
- Desktop Computers

## 🔒 Environment Variables & Security

For security purposes:

- Never commit `.env` or `.env.local` files.
- Never expose database credentials.
- Never expose authentication secrets.
- Configure production environment variables in your deployment platform.
- Keep sensitive backend configuration on the server.

## 🚀 Deployment

The frontend can be deployed using **Vercel**.

The Express backend can be deployed using a Node.js-compatible hosting platform.

Before deployment:

1. Configure production environment variables.
2. Update frontend API URLs.
3. Configure CORS for the production frontend domain.
4. Verify MongoDB Atlas network access.
5. Verify authentication cookie and session settings.
6. Test all API endpoints.
7. Test the production build.

## 🎯 Project Goal

The main goal of this platform is to encourage social responsibility and community participation by providing a centralized platform where people can discover, organize and participate in meaningful social development activities.

## 👨‍💻 Author

**Developer:** [Your Name]

**Project:** Social Development Events Platform (SDEP)

---

⭐ If you find this project useful, consider giving it a star on GitHub!