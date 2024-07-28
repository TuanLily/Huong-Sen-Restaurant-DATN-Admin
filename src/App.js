import { Routes, Route, Navigate } from 'react-router-dom';

import AdminConfig from './Config';
import { publicAdminRoutes } from './Routes/routes';
import NotFound from './Components/NotFound';
import Layout from './Layouts/Layout';
import Login from './Pages/Authentication/Login';
import Forgot from './Pages/Authentication/Forgot';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />

          <Route path={''} element={<Layout />}>
            {publicAdminRoutes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
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
