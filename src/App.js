
import { Routes, Route } from 'react-router-dom';


import AdminConfig from './Config';
import { publicAdminRoutes } from './Routes/routes';
import NotFound from './Components/NotFound';
import Layout from './Layouts/Layout';


function App() {
  return (
    <div className="App">
      <Routes>
        {/* Admin Routes */}
        <Route path={AdminConfig.routes.dashboard} element={<Layout />}>
          {publicAdminRoutes
            .filter(route => route.path.startsWith(AdminConfig.routes.dashboard)) // Filter admin routes
            .map(({ path, component: Component }) => (
              <Route key={path} path={path.replace(AdminConfig.routes.dashboard, '')} element={<Component />} />
            ))}
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
