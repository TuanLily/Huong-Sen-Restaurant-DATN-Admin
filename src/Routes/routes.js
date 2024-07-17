import AdminConfig from '../Config/index';
import Dashboard from '../Pages/Dashboard';





// Public routes
const publicAdminRoutes = [
    // *Admin routes
    { path: AdminConfig.routes.dashboard, component: Dashboard },
];

export { publicAdminRoutes };
