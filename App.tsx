
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import DetailPage from './pages/DetailPage';
import CreatePage from './pages/CreatePage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/auth" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="homebrew/:id" element={<DetailPage />} />
            <Route
              path="create"
              element={
                <PrivateRoute>
                  <CreatePage />
                </PrivateRoute>
              }
            />
             <Route
              path="profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
