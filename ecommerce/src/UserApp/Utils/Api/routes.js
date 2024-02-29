export const baseUrl = 'http://192.168.157.40:3000';

export const API_URLS = {
   products:{
      allCategories:'/products/categories',
      allProducts:'/products/products',
      categorizedProducts:'/products/category'
   },
   
   users:{
      signup:"/users/register",
      login:"/users/login",
      forgetpassword:"/users/forget-password",
      resetPassword: "/users/reset-password"
   },
   orders:{
      placeOrder:'/orders/order',
      getmyOrders:'/orders/orders'
   }
}