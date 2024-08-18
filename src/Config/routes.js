const AdminRoutes = {
    dashboard: 'dashboard',
    login: 'login',
    forgot: 'forgot',

    product: 'product',
    productAdd: 'product/add',
    productEdit: 'product/edit/:id',
    productDelete: 'product/delete',
    productTamXoa: 'product/tam_xoa',

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

    table: 'tables',
    tableAdd: 'tables/add',
    tableEdit: 'tables/edit/:id',
    tableDelete: 'tables/delete',

    reservation: 'reservation',
    reservationAdd: 'reservation/add',
    reservationEdit: 'reservation/edit',
    reservationDelete: 'reservation/delete',

    order: 'order',
    orderAdd: 'order/add',
    orderEdit: 'order/edit',
    orderDelete: 'order/delete',

    orderDetail: 'order-detail',
    orderDetailAdd: 'order-detail/add',
    orderDetailDelete: 'order-detail/delete',

    promotion: 'promotions',
    promotionAdd: 'promotions/add',
    promotionEdit: 'promotions/edit/:id',
    promotionDelete: 'promotions/delete',

    payMethod: 'pay-method',
    payMethodAdd: 'pay-method/add',
    payMethodEdit: 'pay-method/edit',
    payMethodDelete: 'pay-method/delete',

    customerGroup: 'customer-group',
    customerGroupAdd: 'customer-group/add',
    customerGroupEdit: 'customer-group/edit',
    customerGroupDelete: 'customer-group/delete',

    places: 'places',
    placesAdd: 'places/add',
    placesEdit: 'places/edit',
    placesDelete: 'places/delete',

    role: 'role',
    roleAdd: 'role/add',
    roleEdit: 'role/edit/:id',
    roleDelete: 'role/delete',

    permissions: 'permissions',
    permissionsAdd: 'permissions/add',
    permissionsEdit: 'permissions/edit/:id',
    permissionsDelete: 'permissions/delete',

    rolesPermissions: 'roles-permissions',

    commentProducts: 'comment-products',
    commentProductsDelete: 'comment-products/delete',

    commentBlog: 'comment-blog',
    commentBlogAdd: 'comment-blog/add',
    commentBlogEdit: 'comment-blog/edit/:id',
    commentBlogDelete: 'comment-blog/delete',

};

export default AdminRoutes;
