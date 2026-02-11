import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/logo.jpg";
import * as FiIcons from "react-icons/fi";
import { FaMoneyBill, FaBriefcase, FaClipboardList } from "react-icons/fa";
import mainConfig from "../config/mainConfig";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleMenu,
  setSearchCode,
  clearSearchCode,
  setOpenMenus,
} from "../store/sidebarSlice";

const getIcon = (iconName) => {
  if (!iconName) return null;
  if (FiIcons[iconName])
    return React.createElement(FiIcons[iconName], { className: "w-5 h-5" });

  switch (iconName) {
    case "FaMoneyBill":
      return <FaMoneyBill className="w-5 h-5" />;
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

  const isProfilePage = location.pathname.startsWith(
    "/admin/employees/profile",
  );

  const dispatch = useDispatch();
  const { openMenus, searchCode, codeMap } = useSelector(
    (state) => state.sidebar,
  );

  const username = Cookies.get("username") || "User";
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = React.useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const newOpenMenus = {};
    const activePath = location.pathname;

    const findActive = (menus) => {
      menus.forEach((menu) => {
        if (menu.subMenu) {
          menu.subMenu.forEach((sub) => {
            if (sub.path === activePath) newOpenMenus[menu.id] = true;
          });
        }
      });
    };

    findActive(mainConfig);
    dispatch(setOpenMenus(newOpenMenus));
  }, [location.pathname, dispatch]);

  const getEffectivePath = () =>
    location.pathname.startsWith("/admin/employees/profile")
      ? "/admin/employees"
      : location.pathname;

  const getMenuClass = (path) => {
    const activePath = getEffectivePath();
    return `flex items-center justify-between w-full px-2 py-1 rounded-md cursor-pointer transition ${
      activePath === path ? "bg-amber-100 text-gray-800" : "text-gray-800"
    }`;
  };

  const getLinkClass = (path) => {
    const activePath = getEffectivePath();
    return `flex items-center gap-3 px-2 py-1 rounded-md cursor-pointer transition ${
      activePath === path ? "bg-amber-100 text-gray-700" : "text-gray-700"
    }`;
  };

  const handleToggleMenu = (id) => {
    dispatch(toggleMenu(id));
  };

  const renderMenu = (menu) => {
    const isOpen = openMenus[menu.id];

    if (!menu.subMenu) {
      return (
        <div key={menu.id}>
          <Link to={menu.path} className={getLinkClass(menu.path)}>
            <div className="flex items-center gap-3">
              {getIcon(menu.iconName)}
              <span>{menu.label}</span>
            </div>
          </Link>
        </div>
      );
    }

    return (
      <div key={menu.id}>
        <button
          className={getMenuClass(menu.path)}
          onClick={() => handleToggleMenu(menu.id)}
        >
          <div className="flex items-center gap-3">
            {getIcon(menu.iconName)}
            <span>
              {menu.label} <span className="text-xs">{menu.span}</span>
            </span>
          </div>

          <FiIcons.FiChevronRight
            className={`transition-transform duration-300 text-gray-300 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
          />
        </button>

        <ul
          className={`ml-8 space-y-[1px] text-sm transition-all duration-300 ease-in-out overflow-hidden transform origin-top ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
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
    const position = Cookies.get("position");
    let path = "/";
    if (position === "ADMIN") path = "/admin/home";
    else if (position === "GM") path = "/manager/home";
    else if (position === "EXE") path = "/home";
    navigate(path);
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("username");
    Cookies.remove("position");
    window.location.href = "/";
  };

  const handleSearch = () => {
    if (searchCode.length === 3) {
      const route = codeMap[searchCode];
      if (route) navigate(route);
      dispatch(clearSearchCode());
    }
  };

  return (
    <div className="flex relative min-h-screen bg-gradient-to-t from-gray-100 via-gray-50 to-white">
      <header className="fixed top-0 left-[325px] w-[calc(100%-325px)] h-20 flex items-center justify-between px-6 z-30">
        <div className="flex items-center space-x-5 ml-auto z-50">
          <div className="flex items-center border border-gray-300 overflow-hidden rounded h-8">
            <input
              type="text"
              maxLength={3}
              placeholder="Enter code"
              className="flex-1 px-2 outline-none rounded-l w-24"
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

                {!isProfilePage && (
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm font-semibold border-b border-gray-300 cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/profile/${Cookies.get("employee_code")}`)
                    }
                  >
                    <FiIcons.FiUser className="mr-2" /> Profile
                  </button>
                )}

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

      <aside className="fixed top-0 left-0 z-20 w-[325px] h-full px-3 flex flex-col">
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

      <main className="ml-[325px] mt-20 p-6 flex-1"></main>
    </div>
  );
};

export default AdminSidebar;
