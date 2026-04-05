import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/shared/ProtectedRoute';
import DashboardLayout from './components/shared/DashboardLayout';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Skills from './pages/Skills';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Wallet from './pages/Wallet';
import UploadCourse from './pages/UploadCourse';
import Roadmaps from './pages/Roadmaps';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  // Public routes
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },

  // Authenticated app routes with shared layout
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/app/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'courses', element: <Courses /> },
      { path: 'courses/:id', element: <CourseDetail /> },
      { path: 'skills', element: <Skills /> },
      { path: 'wallet', element: <Wallet /> },
      { path: 'upload', element: <UploadCourse /> },
      { path: 'roadmaps', element: <Roadmaps /> },
    ],
  },

  // Legacy redirects
  { path: '/dashboard', element: <Navigate to="/app/dashboard" replace /> },
  { path: '/courses', element: <Courses /> },
  { path: '/courses/:id', element: <CourseDetail /> },
  { path: '/skills', element: <Navigate to="/app/skills" replace /> },
  { path: '/wallet', element: <Navigate to="/app/wallet" replace /> },
  { path: '/upload', element: <Navigate to="/app/upload" replace /> },

  // 404
  { path: '*', element: <NotFound /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
