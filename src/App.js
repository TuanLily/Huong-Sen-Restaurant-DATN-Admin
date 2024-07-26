import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import AdminConfig from './Config';
import { publicAdminRoutes } from './Routes/routes';
import NotFound from './Components/NotFound';
import Layout from './Layouts/Layout';
import ProductList from './Pages/Product/ProductList';
import ProductAdd from './Pages/Product/ProductAdd';
import ProductEdit from './Pages/Product/ProductEdit';
import ProductDelete from './Pages/Product/ProductDelete';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>x
          {/* Admin Routes */}
          <Route path={AdminConfig.routes.dashboard} element={<Layout />}>
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
