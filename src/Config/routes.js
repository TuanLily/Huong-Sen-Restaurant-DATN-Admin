const AdminRoutes = {
    dashboard: 'dashboard',
    login: 'login',
    forgot: 'forgot',

    product: 'product',
    productAdd: 'product/add',
    productEdit: 'product/edit/:id',
    productDelete: 'product/delete',

    categoryProduct: 'category-product',
    categoryProductAdd: 'category-product/add',
    categoryProductEdit: 'category-product/edit/:id',
    categoryProductDelete: 'category-product/delete',

    customer: 'customer',
    customerAdd: 'customer/add',
    customerEdit: 'customer/edit/:id',
    customerDelete: 'customer/delete',

    employee: 'employee',
    employeeAdd: 'employee/add',
    employeeEdit: 'employee/edit/:id',
    employeeDelete: 'employee/delete',

    blog: 'blogs',
    blogAdd: 'blogs/add',
    blogEdit: 'blogs/edit/:id',
    blogDelete: 'blogs/delete',

    categoryBlog: 'category-blog',
    categoryBlogAdd: 'category-blog/add',
    categoryBlogEdit: 'category-blog/edit/:id',
    categoryBlogDelete: 'category-blog/delete',

    productImage: 'productImage',
    productImageAdd: 'productImage/add',
    productImageDelete: 'productImage/delete',

    productImageDetail: 'productImage/productImageDetail',
    productImageDetailAdd: 'productImage/productImageDetail/add',
    productImageDetailDelete: 'productImage/productImageDetail/delete',

    table: 'table',
    tableAdd: 'table/add',
    tableEdit: 'table/edit',
    tableDelete: 'table/delete',

    reservation: 'reservation',
    reservationAdd: 'reservation/add',
    reservationEdit: 'reservation/edit',
    reservationDelete: 'reservation/delete',

    order: 'order',
    orderAdd: 'order/add',
    orderEdit: 'order/edit',
    orderDelete: 'order/delete',

    orderDetail: 'orderDetail',
    orderDetailAdd: 'orderDetail/add',
    orderDetailDelete: 'orderDetail/delete',

    promotion: 'promotions',
    promotionAdd: 'promotions/add',
    promotionEdit: 'promotions/edit/:id',
    promotionDelete: 'promotions/delete',

    payMethod: 'payMethod',
    payMethodAdd: 'payMethod/add',
    payMethodEdit: 'payMethod/edit',
    payMethodDelete: 'payMethod/delete',

    CustomerGroup: 'CustomerGroup',
    CustomerGroupAdd: 'CustomerGroup/add',
    CustomerGroupEdit: 'CustomerGroup/edit',
    CustomerGroupDelete: 'CustomerGroup/delete',

    Places: 'Places',
    PlacesAdd: 'Places/add',
    PlacesEdit: 'Places/edit',
    PlacesDelete: 'Places/delete',

    role: 'role',
    roleAdd: 'role/add',
    roleEdit: 'role/edit/:id',
    roleDelete: 'role/delete',

    Permissions: 'permissions',
    PermissionsAdd: 'permissions/add',
    PermissionsEdit: 'permissions/edit/:id',
    PermissionsDelete: 'permissions/delete',

    RolesPermissions: 'rolespermissions',

    CommentProducts: 'commentproducts',
    CommentProductsDelete: 'commentproducts/delete',

    CommentBlog: 'commentblog',
    CommentBlogDelete: 'commentblog/delete',

};

export default AdminRoutes;
