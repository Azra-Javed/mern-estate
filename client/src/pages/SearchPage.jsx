import React from "react";

const SearchPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/3 p-6 border-r border-gray-200">
        <form className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Search Term
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="e.g. apartment in Islamabad"
              className="border border-gray-300 rounded-lg  p-3 w-full focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Type</label>
            <div className="flex flex-wrap gap-4 text-sm">
              {["All", "Rent", "Sale", "Offer"].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Amenities
            </label>
            <div className="flex flex-wrap gap-4 text-sm">
              {["Parking", "Furnished"].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Sort By</label>
            <select className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-slate-400">
              <option>Price: High to Low</option>
              <option>Price: Low to High</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-slate-700 text-white font-semibold p-3 rounded-lg uppercase hover:bg-slate-800 transition"
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold border-b pb-2 mb-4">
          Listing Results
        </h1>
        <div className="text-gray-500 italic">
          No listings found. Try adjusting your filters.
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
