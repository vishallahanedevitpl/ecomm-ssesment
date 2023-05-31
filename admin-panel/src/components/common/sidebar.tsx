import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setLoggedInUser } from "../../features/generalSlice";
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { user } = useSelector((state: any) => state.general);

  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link
              className={pathname === "/" ? "nav-link" : "nav-link collapsed"}
              to="/"
            >
              <i className="bi bi-grid" />
              <span>Dashboard</span>
            </Link>
          </li>

          <SidebarMenu
            title="Products"
            to="/product"
            iconClass="bi bi-box-seam"
          />

          <SidebarMenu
            title="Categories"
            to="/category"
            iconClass="bi bi-diagram-2"
          />
          {/* Access control check */}
          {user.role.permissions.includes("USER_LIST") && (
            <SidebarMenu title="Users" to="/users" iconClass="bi bi-people" />
          )}

          {/* Access control check */}
          {user.role.permissions.includes("ROLE_LIST") && (
            <SidebarMenu
              title="Roles and Permissions"
              to="#"
              iconClass="bi bi-award"
              isDropDown={true}
              dropDownItems={[
                { title: "Roles", to: "/roles" },
                { title: "Permissions", to: "/permissions" },
              ]}
            />
          )}

          <SidebarMenu title="Profile" to="/profile" iconClass="bi bi-person" />

          <SidebarMenu
            title="Logout"
            to="#"
            iconClass="bi bi-box-arrow-in-right"
            onClick={() => {
              localStorage.removeItem("user");
              dispatch(setLoggedInUser(null));
              navigate("/login");
            }}
          />
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
