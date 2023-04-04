import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import CategoryAddPage from "./pages/category/add";
import CategoryListPage from "./pages/category/list";
import ProductListPage from "./pages/product/list";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/category" element={<CategoryListPage />} />
          <Route path="/category/add" element={<CategoryAddPage />} />
          <Route path="/product" element={<ProductListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
