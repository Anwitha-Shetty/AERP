import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/logo.png";
import * as FiIcons from "react-icons/fi";
import api from "../utils/api";
import {
  FaMoneyBill,
  FaBriefcase,
  FaClipboardList,
  FaFileSignature,
  FaBuilding,
  FaCog,
} from "react-icons/fa";
import mainConfig from "../config/mainConfig";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleMenu,
  setSearchCode,
  clearSearchCode,
  setOpenMenus,
  setCodeMap,
} from "../store/slices/sidebarSlice";
import {MdCurrencyExchange} from "react-icons/md"

const HEADER_HEIGHT = 160; // adjust once if needed

const getIcon = (iconName) => {
  if (!iconName) return null;
  if (FiIcons[iconName])
    return React.createElement(FiIcons[iconName], { className: "w-5 h-5" });

  switch (iconName) {
    case "FaMoneyBill":
      return <FaMoneyBill className="w-5 h-5" />;
    case "FaBuilding":
      return <FaBuilding className="w-5 h-5" />;
    case "FaFileSignature":
      return <FaFileSignature className="w-5 h-5" />;
    case "FaBriefcase":
      return <FaBriefcase className="w-5 h-5" />;
    case "FaClipboardList":
      return <FaClipboardList className="w-5 h-5" />;
      case "FaCog":
         return <FaCog className="w-5 h-5" />;
         case "MdCurrencyExchange":
          return <MdCurrencyExchange className="w-5 h-5" />;

    default:
      return null;
  }
};

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { openMenus, searchCode, codeMap } = useSelector(
    (state) => state.sidebar,
  );

  const [collapsed, setCollapsed] = useState(false);

  /* AUTO OPEN ACTIVE MENU */
  useEffect(() => {
    const activePath = location.pathname;
    const newOpenMenus = {};

    const findAndOpenParents = (menus, parents = []) => {
      menus.forEach((menu) => {
        if (menu.path === activePath) {
          parents.forEach((p) => (newOpenMenus[p] = true));
        }
        if (menu.subMenu) {
          findAndOpenParents(menu.subMenu, [...parents, menu.id]);
        }
      });
    };

    findAndOpenParents(mainConfig);
    dispatch(setOpenMenus(newOpenMenus));
  }, [location.pathname, dispatch]);

  /* FETCH T-CODE MAP */
  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const res = await api.get("/access/navigation_box/");
        const dynamicMap = {};
        res.data.forEach((item) => {
          if (item.code && item.path) {
            dynamicMap[item.code] = item.path;
          }
        });
        dispatch(setCodeMap(dynamicMap));
      } catch (error) {
        console.error(error);
      }
    };
    fetchNavigation();
  }, [dispatch]);

  const handleSearch = () => {
    if (searchCode.length === 3) {
      const route = codeMap[searchCode];
      if (route) navigate(route);
      dispatch(clearSearchCode());
    }
  };

  const sidebarWidth = collapsed ? "w-[90px]" : "w-[350px]";
  const contentMargin = collapsed ? "ml-[90px]" : "ml-[350px]";

  // const getEffectivePath = () => {
  //   if (location.pathname.startsWith("/admin/users/profile")) {
  //     return "/admin/users";
  //   }
  //   return location.pathname;
  // };

  const getMenuClass = (path) => {
    const activePath = location.pathname;

    return `flex items-center justify-between w-full px-2 py-1 rounded-md cursor-pointer transition ${
      activePath === path ? "bg-amber-100 text-gray-800" : "text-gray-800"
    }`;
  };

  const getLinkClass = (path) => {
    const activePath = location.pathname;
    return `flex items-center gap-3 px-2 py-1 rounded-md cursor-pointer transition ${
      activePath === path ? "bg-amber-100 text-gray-700" : "text-gray-700"
    }`;
  };

  const renderMenu = (menu) => {
    const isOpen = openMenus[menu.id];

    if (!menu.subMenu) {
      return (
        <div key={menu.id}>
          <Link to={menu.path} className={getLinkClass(menu.path)}>
            {getIcon(menu.iconName)}
            <span>{menu.label}</span>
          </Link>
        </div>
      );
    }

    return (
      <div key={menu.id}>
        <button
          onClick={() => dispatch(toggleMenu(menu.id))}
          className="flex items-center justify-between w-full px-2 py-1 rounded-md text-gray-800"
        >
          <div className="flex items-center gap-3">
            {getIcon(menu.iconName)}
            <span>{menu.label}</span>
          </div>

          {isOpen && (
            <FiIcons.FiChevronRight className="rotate-90 text-gray-300 transition-transform duration-300" />
          )}
        </button>

        <ul
          className={`ml-8 text-sm space-y-[1px] transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {menu.subMenu.map((sub) =>
            sub.subMenu ? (
              renderMenu(sub)
            ) : (
              <li key={sub.path}>
                <Link to={sub.path} className={getLinkClass(sub.path)}>
                  {getIcon(sub.iconName)}
                  <span>{sub.label}</span>
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    );
  };

  const handleLogoClick = () => {
    const username = Cookies.get("username");
    const position = Cookies.get("position");

    let path = "/";

    if (position === "ADMIN") {
      path = "/admin/home";
    } else if (position === "GM") {
      path = "/manager/home";
    } else if (position === "EXE") {
      path = "/home";
    }

    navigate(path, { state: { username: username } });
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("username");
    Cookies.remove("position");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-200 border-b border-gray-400">
        <div
          className="cursor-pointer mb-2 px-6 py-1.5"
          onClick={handleLogoClick}
        >
          <img src={logo} alt="Logo" className="h-16 object-contain" />
          <div className="text-xs font-semibold">
            Enterprise Resource Structure
          </div>
        </div>

        <div className="flex items-center px-6 py-3 border-t border-gray-400 bg-gray-100">
          <span className="font-medium mr-12">Quick Access</span>

          <div className="flex items-stretch border border-gray-400 bg-white rounded overflow-hidden">
            <span className="px-3 flex items-center border-r border-gray-300">
              T-code:
            </span>

            <input
              type="text"
              maxLength={3}
              value={searchCode}
              onChange={(e) =>
                dispatch(setSearchCode(e.target.value.toUpperCase()))
              }
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="px-3 w-14 h-8 outline-none"
            />

            <button
              onClick={handleSearch}
              className="px-3 bg-amber-400 flex items-center justify-center"
            >
              <FiIcons.FiSearch />
            </button>
          </div>
        </div>
      </header>

      {/* SIDEBAR (Correctly Positioned) */}
      <aside
        className={`fixed left-0 ${sidebarWidth} bg-white border-r border-gray-300 transition-all duration-300`}
        style={{
          top: HEADER_HEIGHT,
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <nav className="h-full overflow-y-auto px-3 text-[15px] py-2">
          {mainConfig.map(renderMenu)}
        </nav>
      </aside>

      {/* CONTENT */}
      <main
        className={`${contentMargin} p-6 transition-all duration-300`}
        style={{ marginTop: HEADER_HEIGHT }}
      >
        {/* Page Content */}
      </main>
    </div>
  );
};

export default AdminSidebar;
