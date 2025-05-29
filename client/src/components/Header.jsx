import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-100 shadow-md text-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-2xl flex items-center gap-1">
            <span className="text-slate-500">Sahand</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          <form>
            <div className="relative flex items-center bg-white rounded-full border border-slate-300 shadow-sm w-48 sm:w-64 px-4 py-2">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent w-full pr-6 focus:outline-none text-sm text-slate-700 placeholder-slate-400"
              />
              <FaSearch className="text-slate-500 cursor-pointer absolute right-3" />
            </div>
          </form>

          {/* Nav Links */}
          <ul className="flex items-center gap-4 text-sm sm:text-base font-medium">
            <li className="hidden text-slate-700 sm:inline hover:underline transition">
              <Link to="/">Home</Link>
            </li>
            <li className="hidden text-slate-700 sm:inline hover:underline transition">
              <Link to="/about">About</Link>
            </li>
            <li className="text-slate-700 hover:underline   transition ">
              <Link to="/sign-in">Sign In</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
