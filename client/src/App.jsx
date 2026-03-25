import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/shared/ProtectedRoute';

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
  { path: '/courses', element: <Courses /> },
  { path: '/courses/:id', element: <CourseDetail /> },

  // Protected routes
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/skills',
    element: (
      <ProtectedRoute>
        <Skills />
      </ProtectedRoute>
    ),
  },
  {
    path: '/wallet',
    element: (
      <ProtectedRoute>
        <Wallet />
      </ProtectedRoute>
    ),
  },
  {
    path: '/upload',
    element: (
      <ProtectedRoute>
        <UploadCourse />
      </ProtectedRoute>
    ),
  },
  {
    path: '/roadmaps',
    element: (
      <ProtectedRoute>
        <Roadmaps />
      </ProtectedRoute>
    ),
  },

  // 404
  { path: '*', element: <NotFound /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
