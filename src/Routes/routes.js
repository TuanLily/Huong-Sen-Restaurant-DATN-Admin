import AdminConfig from '../Config/index';
import Dashboard from '../Pages/Dashboard';

import ProductList from '../Pages/Product/ProductList';
import ProductAdd from '../Pages/Product/ProductAdd';
import ProductEdit from '../Pages/Product/ProductEdit';
import ProductDelete from '../Pages/Product/ProductDelete';

import CategoryProduct from '../Pages/CategoryProduct/CategoryProductList';
import categoryProductAdd from '../Pages/CategoryProduct/CategoryProductAdd';
import categoryProductEdit from '../Pages/CategoryProduct/CategoryProductEdit';
import categoryProductDelete from '../Pages/CategoryProduct/CategoryProductDelete';

import CustomerList from '../Pages/Customer/CustomerList';
import CustomerAdd from '../Pages/Customer/CustomerAdd';
import CustomerEdit from '../Pages/Customer/CustomerEdit';
import CustomerDelete from '../Pages/Customer/CustomerDelete';

import EmployeeList from '../Pages/Employee/EmployeeList';
import EmployeeAdd from '../Pages/Employee/EmployeeAdd';
import EmployeeEdit from '../Pages/Employee/EmployeeEdit';
import EmployeeDelete from '../Pages/Employee/EmployeeDelete';

import BlogList from '../Pages/Blog/BlogList';
import BlogAdd from '../Pages/Blog/BlogAdd';
import BlogEdit from '../Pages/Blog/BlogEdit';
import BlogDelete from '../Pages/Blog/BlogDelete';

import CategoryBlogList from '../Pages/CategoryBlog/CategoryBlogList';
import CategoryBlogAdd from '../Pages/CategoryBlog/CategoryBlogAdd';
import CategoryBlogEdit from '../Pages/CategoryBlog/CategoryBlogEdit';
import CategoryBlogDelete from '../Pages/CategoryBlog/CategoryBlogDelete';

import ProductImageList from '../Pages/ProductImage/ProductImageList';
import ProductImageAdd from '../Pages/ProductImage/ProductImageAdd';
import ProductImageDelete from '../Pages/ProductImage/ProductImageDelete';

import ProductImageDetailList from '../Pages/ProductImage/Detail/ProductImageDetailList';
import ProductImageDetailAdd from '../Pages/ProductImage/Detail/ProductImageDetailAdd';
import ProductImageDetailDelete from '../Pages/ProductImage/Detail/ProductImageDetailDelete';

// Public routes
const publicAdminRoutes = [
    // *Admin routes
    { path: AdminConfig.routes.dashboard, component: Dashboard },

    { path: AdminConfig.routes.product, component: ProductList },
    { path: AdminConfig.routes.productAdd, component: ProductAdd },
    { path: AdminConfig.routes.productEdit, component: ProductEdit },
    { path: AdminConfig.routes.productDelete, component: ProductDelete },

    { path: AdminConfig.routes.categoryProduct, component: CategoryProduct },
    { path: AdminConfig.routes.categoryProductAdd, component: categoryProductAdd },
    { path: AdminConfig.routes.categoryProductEdit, component: categoryProductEdit },
    { path: AdminConfig.routes.categoryProductDelete, component: categoryProductDelete },

    { path: AdminConfig.routes.customer, component: CustomerList },
    { path: AdminConfig.routes.customerAdd, component: CustomerAdd },
    { path: AdminConfig.routes.customerEdit, component: CustomerEdit },
    { path: AdminConfig.routes.customerDelete, component: CustomerDelete },

    { path: AdminConfig.routes.employee, component: EmployeeList },
    { path: AdminConfig.routes.employeeAdd, component: EmployeeAdd },
    { path: AdminConfig.routes.employeeEdit, component: EmployeeEdit },
    { path: AdminConfig.routes.employeeDelete, component: EmployeeDelete },

    { path: AdminConfig.routes.blog, component: BlogList },
    { path: AdminConfig.routes.blogAdd, component: BlogAdd },
    { path: AdminConfig.routes.blogEdit, component: BlogEdit },
    { path: AdminConfig.routes.blogDelete, component: BlogDelete },

    { path: AdminConfig.routes.categoryBlog, component: CategoryBlogList },
    { path: AdminConfig.routes.categoryBlogAdd, component: CategoryBlogAdd },
    { path: AdminConfig.routes.categoryBlogEdit, component: CategoryBlogEdit },
    { path: AdminConfig.routes.categoryBlogDelete, component: CategoryBlogDelete },

    { path: AdminConfig.routes.productImage, component: ProductImageList },
    { path: AdminConfig.routes.productImageAdd, component: ProductImageAdd },
    { path: AdminConfig.routes.productImageDelete, component: ProductImageDelete },

    { path: AdminConfig.routes.productImageDetail, component: ProductImageDetailList },
    { path: AdminConfig.routes.productImageDetailAdd, component: ProductImageDetailAdd },
    { path: AdminConfig.routes.productImageDetailDelete, component: ProductImageDetailDelete },
];

export { publicAdminRoutes };
