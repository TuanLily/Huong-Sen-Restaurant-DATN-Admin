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

import TableList from '../Pages/Tables/TableList';
import TableAdd from '../Pages/Tables/TableAdd';
import TableEdit from '../Pages/Tables/TableEdit';
import TableDelete from '../Pages/Tables/TableDelete';

import ReservationList from '../Pages/Reservations/ReservationList';
import ReservationAdd from '../Pages/Reservations/ReservationAdd';
import ReservationEdit from '../Pages/Reservations/ReservationEdit';
import ReservationDelete from '../Pages/Reservations/ReservationDelete';

import OrderList from '../Pages/Orders/OrderList';
import OrderAdd from '../Pages/Orders/OrderAdd';
import OrderEdit from '../Pages/Orders/OrderEdit';
import OrderDelete from '../Pages/Orders/OrderDelete';

import OrderDetailList from '../Pages/OrderDetails/OrderDetailList';
import OrderDetailAdd from '../Pages/OrderDetails/OrderDetailAdd';
import OrderDetailDelete from '../Pages/OrderDetails/OrderDetailDelete';

import PromotionList from '../Pages/Promotions/PromotionList';
import PromotionAdd from '../Pages/Promotions/PromotionAdd';
import PromotionEdit from '../Pages/Promotions/PromotionEdit';
import PromotionDelete from '../Pages/Promotions/PromotionDelete';

import PayMethodList from '../Pages/PayMethod/PayMethodList';
import PayMethodAdd from '../Pages/PayMethod/PayMethodAdd';
import PayMethodEdit from '../Pages/PayMethod/PayMethodEdit';
import PayMethodDelete from '../Pages/PayMethod/PayMethodDelete';

import CustomerGroupList from '../Pages/CustomerGroup/CustomerGroupList';
import CustomerGroupAdd from '../Pages/CustomerGroup/CustomerGroup';
import CustomerGroupEdit from '../Pages/CustomerGroup/CustomerGroupEdit';
import CustomerGroupDelete from '../Pages/CustomerGroup/CustomerGroupDelete';

import PlacesList from '../Pages/Places/PlacesList';
import PlacesAdd from '../Pages/Places/PlacesAdd';
import PlacesEdit from '../Pages/Places/PlacesEdit';
import PlacesDelete from '../Pages/Places/PlacesDelete';

import RolesList from '../Pages/Roles/RolesList';
import RolesAdd from '../Pages/Roles/RolesAdd';
import RolesEdit from '../Pages/Roles/RolesEdit';
import RolesDelete from '../Pages/Roles/RolesDelete';

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
import PermissionsList from '../Pages/Permissions/PermissionsList';
import PermissionsAdd from '../Pages/Permissions/PermissionsAdd';
import PermissionsEdit from '../Pages/Permissions/PermissionsEdit';
import PermissionsDelete from '../Pages/Permissions/PermissionsDelete';


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

    { path: AdminConfig.routes.table, component: TableList },
    { path: AdminConfig.routes.tableAdd, component: TableAdd },
    { path: AdminConfig.routes.tableEdit, component: TableEdit },
    { path: AdminConfig.routes.tableDelete, component: TableDelete },

    { path: AdminConfig.routes.reservation, component: ReservationList },
    { path: AdminConfig.routes.reservationAdd, component: ReservationAdd },
    { path: AdminConfig.routes.reservationEdit, component: ReservationEdit },
    { path: AdminConfig.routes.reservationDelete, component: ReservationDelete },

    { path: AdminConfig.routes.order, component: OrderList },
    { path: AdminConfig.routes.orderAdd, component: OrderAdd },
    { path: AdminConfig.routes.orderEdit, component: OrderEdit },
    { path: AdminConfig.routes.orderDelete, component: OrderDelete },

    { path: AdminConfig.routes.orderDetail, component: OrderDetailList },
    { path: AdminConfig.routes.orderDetailAdd, component: OrderDetailAdd },
    { path: AdminConfig.routes.orderDetailDelete, component: OrderDetailDelete },

    { path: AdminConfig.routes.promotion, component: PromotionList },
    { path: AdminConfig.routes.promotionAdd, component: PromotionAdd },
    { path: AdminConfig.routes.promotionEdit, component: PromotionEdit },
    { path: AdminConfig.routes.promotionDelete, component: PromotionDelete },

    { path: AdminConfig.routes.payMethod, component: PayMethodList },
    { path: AdminConfig.routes.payMethodAdd, component: PayMethodAdd },
    { path: AdminConfig.routes.payMethodEdit, component: PayMethodEdit },
    { path: AdminConfig.routes.payMethodDelete, component: PayMethodDelete },

    { path: AdminConfig.routes.CustomerGroup, component: CustomerGroupList },
    { path: AdminConfig.routes.CustomerGroupAdd, component: CustomerGroupAdd },
    { path: AdminConfig.routes.CustomerGroupEdit, component: CustomerGroupEdit },
    { path: AdminConfig.routes.CustomerGroupDelete, component: CustomerGroupDelete },

    { path: AdminConfig.routes.Places, component: PlacesList },
    { path: AdminConfig.routes.PlacesAdd, component: PlacesAdd },
    { path: AdminConfig.routes.PlacesEdit, component: PlacesEdit },
    { path: AdminConfig.routes.PlacesDelete, component: PlacesDelete },
    
    { path: AdminConfig.routes.Roles, component: RolesList },
    { path: AdminConfig.routes.RolesAdd, component: RolesAdd },
    { path: AdminConfig.routes.RolesEdit, component: RolesEdit },
    { path: AdminConfig.routes.RolesDelete, component: RolesDelete },

    { path: AdminConfig.routes.Permissions, component: PermissionsList },
    { path: AdminConfig.routes.PermissionsAdd, component: PermissionsAdd },
    { path: AdminConfig.routes.PermissionsEdit, component: PermissionsEdit },
    { path: AdminConfig.routes.PermissionsDelete, component: PermissionsDelete },

];

export { publicAdminRoutes };
