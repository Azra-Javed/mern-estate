// import { useState, useRef } from "react";
// import { FaSearch } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Header = () => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [searchValue, setSearchValue] = useState("");
//   const inputRef = useRef(null);

//   const handleSearchClick = () => {
//     setIsExpanded(true);
//     setTimeout(() => {
//       inputRef.current?.focus();
//     }, 100);
//   };

//   const handleBlur = () => {
//     if (searchValue.trim() === "") {
//       setIsExpanded(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (searchValue.trim()) {
//       console.log("Searching for:", searchValue);
//     }
//   };

//   return (
//     <header className="bg-slate-100 shadow-md text-slate-800">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         {/* Left: Logo */}
//         <Link to="/">
//           <h1 className="font-bold text-lg sm:text-2xl flex items-center gap-1">
//             <span className="text-slate-500">Sahand</span>
//             <span className="text-slate-700">Estate</span>
//           </h1>
//         </Link>

//         {/* Right: Nav + Search */}
//         <div className="flex items-center gap-4">
//           {/* Expanding Search */}
//           <form onSubmit={handleSubmit}>
//             <div
//               className={`relative flex items-center bg-white rounded-full border border-slate-300 shadow-sm transition-all duration-300 ease-in-out ${
//                 isExpanded ? "w-48 sm:w-64 px-4 py-2" : "w-10 h-10 px-2"
//               }`}
//             >
//               <input
//                 ref={inputRef}
//                 type="text"
//                 placeholder="Search..."
//                 value={searchValue}
//                 onChange={(e) => setSearchValue(e.target.value)}
//                 onBlur={handleBlur}
//                 className={`transition-all duration-300 bg-transparent focus:outline-none text-sm text-slate-700 placeholder-slate-400 ${
//                   isExpanded ? "w-full opacity-100 pr-6" : "w-0 opacity-0"
//                 }`}
//               />
//               <FaSearch
//                 className={`text-slate-500 cursor-pointer transition-all duration-300 ${
//                   isExpanded ? "absolute right-3" : "mx-auto"
//                 }`}
//                 onClick={handleSearchClick}
//               />
//             </div>
//           </form>

//           {/* Nav Links */}
//           <ul className="flex items-center gap-4 text-sm sm:text-base font-medium">
//             <li className="hidden text-slate-700 sm:inline hover:underline transition">
//               <Link to="/">Home</Link>
//             </li>
//             <li className="hidden text-slate-700  sm:inline hover:underline transition">
//               <Link to="/about">About</Link>
//             </li>
//             <li className=" text-slate-700 hover:underline transition">
//               <Link to="/sign-in">Sign In</Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-100 shadow-md text-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left: Logo */}
        <Link to="/">
          <h1 className="font-bold text-lg sm:text-2xl flex items-center gap-1">
            <span className="text-slate-500">Sahand</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

        {/* Right: Nav + Search */}
        <div className="flex items-center gap-4">
          {/* Always Expanded Search */}
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
            <li className="text-slate-700 hover:underline transition">
              <Link to="/sign-in">Sign In</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
