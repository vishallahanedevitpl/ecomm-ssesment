import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import SubCategoryListPage from "./pages/subCategory/list";
import ProductAddPage from "./pages/product/add";
import NotFoundPage from "./pages/notFound";
import RolesListPage from "./pages/roles/list";
import DashboardPage from "./pages/dashboard";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";

import CategoryListPage from "./pages/category/list";
import ProductListPage from "./pages/product/list";
import PasswordResetPage from "./pages/passwordReset";
import UserListPage from "./pages/user/list";
import PermissionsLandingPage from "./pages/roles/permissions/landing";

const Routing = () => {
  const { user } = useSelector((state: any) => state.general);
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/passwordReset" element={<PasswordResetPage />} />
      {user ? (
        <>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/category" element={<CategoryListPage />} />
          <Route
            path="/category/sub-categories/:catId"
            element={<SubCategoryListPage />}
          />
          <Route path="/roles" element={<RolesListPage />} />
          <Route path="/permissions" element={<PermissionsLandingPage />} />

          <Route path="/users" element={<UserListPage />} />
          <Route path="/product" element={<ProductListPage />} />
          <Route path="product/add" element={<ProductAddPage />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to={"/login"} replace />} />
      )}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Routing;
