import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-md text-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-2xl flex items-center gap-1">
            <span className="text-slate-500">Aura</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSubmit}>
            <div className="relative flex items-center bg-white rounded-full border border-slate-300 shadow-sm w-48 sm:w-64 px-4 py-2">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent w-full pr-6 focus:outline-none text-sm text-slate-700 placeholder-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button>
                <FaSearch className="text-slate-500 cursor-pointer absolute right-4 top-2.5" />
              </button>
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

            <Link to="/profile">
              {currentUser ? (
                <img
                  className="rounded-full h-7 w-7 object-cover"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                <li className="text-slate-700 hover:underline transition ">
                  Sign in
                </li>
              )}
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
