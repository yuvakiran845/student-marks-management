# Student Marks Management Portal - Frontend

A modern, responsive React application for managing student marks and academic records. Built with Vite, React, and Tailwind CSS for optimal performance and user experience.

## Features

- 🎨 **Creative & Responsive Design**: Modern UI with gradient backgrounds, animations, and mobile-first responsive design
- 🔐 **Role-based Authentication**: Separate dashboards for students and administrators
- 📊 **Admin Dashboard**: Manage students, view statistics, and handle marks
- 👨‍🎓 **Student Dashboard**: View personal academic performance and marks
- ⚡ **Fast & Efficient**: Built with Vite for lightning-fast development and builds
- 🎭 **Smooth Animations**: CSS animations and transitions for enhanced user experience
- 📱 **Mobile Optimized**: Fully responsive design that works on all devices

## Tech Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom components and animations
- **Routing**: React Router DOM
- **HTTP Client**: Axios for API communication
- **State Management**: React Context API
- **Build Tool**: Vite
- **Icons**: Emoji and custom SVG icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

## Project Structure

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── AuthProvider.jsx
│   │   └── useAuth.jsx
│   ├── layouts/
│   │   └── AdminLayout.jsx
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── Login.jsx
│   │   └── StudentDashboard.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Styling Features

- **Custom Tailwind Components**: Reusable button, input, and card components
- **Gradient Backgrounds**: Beautiful gradient overlays and backgrounds
- **Smooth Animations**: Fade-in, slide-up, and bounce animations
- **Glass Morphism**: Modern glass effect cards and overlays
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Custom Scrollbars**: Styled scrollbars for better aesthetics
- **Loading States**: Animated loading spinners and states

## API Integration

The frontend communicates with a Node.js/Express backend API for:
- User authentication and authorization
- Student data management
- Marks and grades handling
- Department and exam management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
