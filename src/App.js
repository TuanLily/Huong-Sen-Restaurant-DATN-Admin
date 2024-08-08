import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import React from 'react';

import { publicAdminRoutes } from './Routes/routes';
import NotFound from './Components/NotFound';
import Layout from './Layouts/Layout';
import Login from './Pages/Authentication/Login';
import Forgot from './Pages/Authentication/Forgot';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />

          <Route path={''} element={<ProtectedRoute element={<Layout />} />}>
            {publicAdminRoutes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />}/>
            ))}
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
