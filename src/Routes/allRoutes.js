import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard

import DashboardEcommerce from "../pages/DashboardEcommerce";
import EcommerceAddProduct from "../pages/Ecommerce/EcommerceProducts/EcommerceAddProduct";
import EcommerceProducts from "../pages/Ecommerce/EcommerceProducts";
import EcommerceProductDetail from "../pages/Ecommerce/EcommerceProducts/EcommerceProductDetail";
import EcommerceOrders from "../pages/Ecommerce/EcommerceOrders";
import EcommerceOrderDetail from "../pages/Ecommerce/EcommerceOrders/EcommerceOrderDetail";
import EcommerceCustomers from "../pages/Ecommerce/EcommerceCustomers";
import UserProfile from "../pages/Authentication/user-profile";
import Logout from "../pages/Authentication/Logout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import BrandComponent from "../pages/common/Brand";
import AttributeComponent from "../pages/common/Attribute";
import CategoriesComponent from "../pages/common/Category";
import ColorComponent from "../pages/common/Color";
import SubCategoryComponent from "../pages/common/subCategory";

const authProtectedRoutes = [
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/index", component: <DashboardEcommerce /> },
  { path: "/apps-ecommerce-products", component: <EcommerceProducts /> },
  { path: "/brand", component: <BrandComponent /> },
  { path: "/attribute", component: <AttributeComponent /> },
  { path: "/category", component: <CategoriesComponent /> },
  { path: "/subcategory", component: <SubCategoryComponent /> },
  { path: "/color", component: <ColorComponent /> },
  {
    path: "/apps-ecommerce-product-details/:_id",
    component: <EcommerceProductDetail />,
  },
  {
    path: "/apps-ecommerce-product-details",
    component: <EcommerceProductDetail />,
  },
  { path: "/apps-ecommerce-add-product", component: <EcommerceAddProduct /> },
  {
    path: "/apps-ecommerce-add-product/:_id",
    component: <EcommerceAddProduct />,
  },
  { path: "/apps-ecommerce-orders", component: <EcommerceOrders /> },
  {
    path: "/apps-ecommerce-order-details",
    component: <EcommerceOrderDetail />,
  },
  {
    path: "/apps-ecommerce-order-details/:_id",
    component: <EcommerceOrderDetail />,
  },
  { path: "/apps-ecommerce-customers", component: <EcommerceCustomers /> },
  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
