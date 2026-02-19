import { useEffect, useRef } from "react";
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
    default:
      return null;
  }
};

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // const isProfilePage = location.pathname.startsWith(
  //   "/admin/employees/profile",
  // );

  const dispatch = useDispatch();

  const { openMenus, searchCode } = useSelector((state) => state.sidebar);

  const username = Cookies.get("username") || "User";
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = React.useState(false);

  /* ------------------------------
     RECURSIVE OPEN MENU HANDLER
  --------------------------------*/

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

  const { codeMap } = useSelector((state) => state.sidebar);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (!token) return;

    const fetchNavigation = async () => {
      try {
        const res = await api.get("/access/navigation_box/");
        const data = res.data;

        const dynamicMap = {};

        data.forEach((item) => {
          if (item.code && item.path) {
            dynamicMap[item.code] = item.path;
          }
        });

        dispatch(setCodeMap(dynamicMap));
      } catch (error) {
        console.error("Navigation API error:", error);
      }
    };

    fetchNavigation();
  }, [dispatch]);

  const getMenuClass = (path) => {
    return `flex items-center justify-between w-full px-2 py-1 rounded-md cursor-pointer transition ${
      location.pathname === path
        ? "bg-amber-100 text-gray-800"
        : "text-gray-800"
    }`;
  };

  const getLinkClass = (path) => {
    return `flex items-center gap-3 px-2 py-1 rounded-md cursor-pointer transition ${
      location.pathname === path
        ? "bg-amber-100 text-gray-700"
        : "text-gray-700"
    }`;
  };

  const handleToggleMenu = (id) => {
    dispatch(toggleMenu(id));
  };

  const renderMenu = (menu, level = 0) => {
    const isOpen = openMenus[menu.id];

    if (!menu.subMenu) {
      return (
        <li key={menu.id}>
          <Link to={menu.path} className={getLinkClass(menu.path)}>
            {getIcon(menu.iconName)}
            <span>{menu.label}</span>
          </Link>
        </li>
      );
    }

    return (
      <li key={menu.id}>
        <button
          className={getMenuClass(menu.path)}
          onClick={() => handleToggleMenu(menu.id)}
        >
          <div className="flex items-center gap-3">
            {getIcon(menu.iconName)}
            <span>{menu.label}</span>
          </div>

          {/* ✅ SHOW ICON ONLY WHEN OPEN */}
          {isOpen && (
            <FiIcons.FiChevronRight className="rotate-90 transition-transform duration-300 text-gray-300" />
          )}
        </button>

        <ul
          className={`ml-8 space-y-[1px] text-sm transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {menu.subMenu.map((sub) => renderMenu(sub, level + 1))}
        </ul>
      </li>
    );
  };

  const handleSearch = () => {
    if (searchCode.length === 3) {
      const route = codeMap[searchCode];

      if (route) {
        navigate(route);
      } else {
        console.warn("Invalid T code");
      }

      dispatch(clearSearchCode());
    }
  };

  const handleLogoClick = () => {
    const position = Cookies.get("position");
    let path = "/";
    if (position === "ADMIN") path = "/admin/home";
    else if (position === "MANAGER") path = "/manager/home";
    else if (position === "GENERALMANAGER") path = "/general-manager/home";
    else if (position === "VENDOR") path = "/vendor/home";
    else if (position === "ASSOCIATE") path = "/associate/home";
    else if (position === "EXECUTIVES") path = "/executives/home";
    navigate(path);
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("username");
    Cookies.remove("position");
    window.location.href = "/";
  };

  return (
    <div className="flex relative min-h-screen bg-gradient-to-t from-gray-100 via-gray-50 to-white">
      <header className="fixed top-0 left-[350px] w-[calc(100%-350px)] h-20 flex items-center justify-between px-6 z-30">
        <div className="flex items-center space-x-5 ml-auto z-50">
          <div className="flex items-center border border-gray-300 overflow-hidden rounded h-8">
            <input
              type="text"
              maxLength={3}
              placeholder="Enter T code"
              className="flex-1 px-2 outline-none rounded-l w-28"
              value={searchCode}
              onChange={(e) =>
                dispatch(setSearchCode(e.target.value.toUpperCase()))
              }
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-amber-400 text-black flex items-center justify-center px-2 rounded-r h-full"
            >
              <FiIcons.FiSearch className="w-4 h-4" />
            </button>
          </div>

          <FiIcons.FiSettings
            className="text-xl text-gray-700 hover:text-amber-400 cursor-pointer"
            onClick={() => navigate("/admin/settings")}
          />

          <div className="relative" ref={dropdownRef}>
            <div
              className="w-8 h-8 rounded-full bg-amber-400 text-black font-bold flex items-center justify-center cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {username.charAt(0).toUpperCase()}
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-300 z-50">
                <div className="px-4 py-3 text-sm font-semibold border-b border-gray-300">
                  Hello! {username}
                </div>

                {/* {!isProfilePage && (
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm font-semibold border-b border-gray-300 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/profile/${Cookies.get("employee_code")}`)
                    }
                  >
                    <FiIcons.FiUser className="mr-2" /> Profile
                  </button>
                )} */}

                <button
                  className="flex items-center w-full px-4 py-2 text-sm font-semibold border-b border-gray-300 cursor-pointer"
                  onClick={() => navigate("/admin/settings")}
                >
                  <FiIcons.FiSettings className="mr-2" /> Settings
                </button>

                <button
                  className="flex items-center w-full px-4 py-2 text-sm font-semibold cursor-pointer"
                  onClick={() => setShowLogoutPopup(true)}
                >
                  <FiIcons.FiLogOut className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <aside className="fixed top-0 left-0 z-20 w-[350px] h-full px-3 flex flex-col">
        <div className="cursor-pointer mb-2" onClick={handleLogoClick}>
          <img src={logo} alt="Logo" className="w-full h-34 object-contain" />
        </div>

        <nav className="flex-1 space-y-[0.5px] text-[15px] overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-none">
          {mainConfig.map(renderMenu)}
        </nav>
      </aside>

      {showLogoutPopup && (
        <div className="fixed inset-0 backdrop-blur-[1px] flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-md w-11/12 max-w-md shadow-xl">
            <div className="flex justify-center mb-3">
              <FiIcons.FiAlertTriangle className="text-amber-400 text-4xl" />
            </div>

            <h2 className="text-lg font-semibold text-center mb-4">
              Are you sure you want to exit?
            </h2>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleLogout}
                className="bg-amber-400 text-black font-medium px-3 py-1.5 rounded-md cursor-pointer"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="bg-gray-600 text-white font-medium px-3 py-1.5 rounded-md cursor-pointer"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="ml-[350px] mt-20 p-6 flex-1"></main>
    </div>
  );
};

export default AdminSidebar;
