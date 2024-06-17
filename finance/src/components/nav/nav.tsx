import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };
  const ListClass =
    "px-4 py-2 text-blue-500 hover:bg-blue-100 rounded transform transition duration-300 ease-in-out";

  return (
    <nav className="flex items-center justify-between p-1 mb-5 bg-white border-b-4 border-blue-500">
      <img className="w-12" src="/logo.svg" alt="Logo" />
      <div className="md:hidden">
        <button onClick={handleToggle} className="focus:outline-none">
          {menuOpen ? (
            <IoCloseOutline className="w-6 h-6 text-blue-500" />
          ) : (
            <CiMenuFries className="w-6 h-6 text-blue-500" />
          )}
        </button>
      </div>
      <ul
        className={`flex-col md:flex-row flex ${menuOpen ? "flex" : "hidden"} md:flex md:space-x-8 cursor-pointer`}
      >
        <li
          className={`${ListClass} text-center`}
          onClick={() => navigate("/")}
        >
          News
        </li>
        <li
          className={`${ListClass} text-center`}
          onClick={() => navigate("/charts")}
        >
          Historic Charts
        </li>
        <li
          className={`${ListClass} text-center`}
          onClick={() => navigate("/live")}
        >
          Live Charts
        </li>
        <li
          className={`${ListClass} text-center`}
          onClick={() => navigate("/about")}
        >
          About
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
