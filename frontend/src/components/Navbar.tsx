import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { AppDispatch, RootState } from "../app/store";
import logo from "../assets/logo.svg";
import { FaBars, FaTimes, FaHome, FaUser } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import ThemeSwitcher from "./ThemeSwitch";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="relative">
      {/* Backdrop */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 z-20 backdrop-blur-sm" onClick={closeSidebar} />}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-72 h-full bg-base-100 shadow-2xl transition-transform transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden z-30 rounded-l-3xl`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-base-300">
            <div className="flex items-center gap-3">
              <img src={logo} alt="logo" className="h-10 w-10" />
              <span className="text-xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">BudgetTracker</span>
            </div>
            <button className="btn btn-circle btn-sm btn-ghost" onClick={closeSidebar}>
              <FaTimes />
            </button>
          </div>

          <div className="flex-grow px-4 py-6 space-y-4">
            {user ? (
              <>
                <Link
                  to="/"
                  className="flex items-center gap-3 p-3 hover:bg-base-200 rounded-xl transition-colors"
                  onClick={closeSidebar}
                >
                  <FaHome className="text-primary" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/user"
                  className="flex items-center gap-3 p-3 hover:bg-base-200 rounded-xl transition-colors"
                  onClick={closeSidebar}
                >
                  <FaUser className="text-secondary" />
                  <span>Profile</span>
                </Link>
                <div className="divider">Theme</div>
                <div className="flex justify-center">
                  <ThemeSwitcher />
                </div>
                <div className="divider">Account</div>
                <button
                  className="btn btn-error w-full flex items-center justify-center gap-2 rounded-xl"
                  onClick={() => {
                    handleLogout();
                    closeSidebar();
                  }}
                >
                  <FaArrowRightFromBracket /> Sign Out
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    className="btn btn-primary btn-outline w-full rounded-xl"
                    onClick={closeSidebar}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary w-full rounded-xl"
                    onClick={closeSidebar}
                  >
                    Create Account
                  </Link>
                </div>
                <div className="divider">Theme</div>
                <div className="flex justify-center">
                  <ThemeSwitcher />
                </div>
              </>
            )}
          </div>
          {user && (
            <div className="p-4 border-t border-base-300 m-4 rounded-xl bg-base-200">
              <Link to="/user" className="flex items-center gap-3" onClick={closeSidebar}>
                {user.profilePicture ? (
                  <img
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                    src={`/${user.profilePicture}?${user.token}`}
                    alt="Profile"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                    {user.name ? user.name[0].toUpperCase() : ""}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs opacity-70">{user.email}</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-base-100/80 backdrop-blur-md fixed top-0 left-0 w-full z-10 shadow-lg">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="logo" className="h-10 w-10" />
            <span className="text-xl font-bold font-heading hidden md:block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">BudgetTracker</span>
          </Link>
          <div className="hidden lg:flex items-center gap-6">
            {user ? (
              <>
                <Link to="/" className="btn btn-ghost btn-sm rounded-xl hover:bg-base-200 flex items-center gap-2">
                  <FaHome /> Dashboard
                </Link>
                <Link to="/user" className="btn btn-ghost btn-sm rounded-xl hover:bg-base-200 flex items-center gap-2">
                  <FaUser /> Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm rounded-xl hover:bg-base-200">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm rounded-xl">
                  Create Account
                </Link>
              </>
            )}
            <ThemeSwitcher />
          </div>
          
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                {user.profilePicture ? (
                  <img
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary"
                    src={`/${user.profilePicture}?${user.token}`}
                    alt="Profile"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                    {user.name ? user.name[0].toUpperCase() : ""}
                  </div>
                )}
                <button 
                  className="btn btn-error btn-sm btn-outline rounded-xl hidden md:flex items-center gap-2" 
                  onClick={handleLogout}
                >
                  <FaArrowRightFromBracket /> Sign Out
                </button>
              </div>
              <button className="lg:hidden btn btn-ghost btn-circle" onClick={() => setIsSidebarOpen(true)}>
                <FaBars className="text-lg" />
              </button>
            </div>
          ) : (
            <button className="lg:hidden btn btn-ghost btn-circle" onClick={() => setIsSidebarOpen(true)}>
              <FaBars className="text-lg" />
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
