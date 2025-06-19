import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SearchPage = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
    offer: false,
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "createdAt",
        order: offerFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  console.log(listings);
  const navigate = useNavigate();
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "sale" ||
      e.target.id === "rent"
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  console.log(sidebarData);
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:w-1/3 p-6 border-r border-gray-200">
        <h2 className="text-xl font-bold mb-6">Search Filters</h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Search Term
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="e.g. apartment in Islamabad"
              className="border border-gray-300 rounded-lg  p-3 w-full focus:outline-none focus:ring-2 focus:ring-slate-400"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Type</label>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="all"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={sidebarData.type === "all"}
                />
                <span>All</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={sidebarData.type === "rent"}
                />
                <span>Rent</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={sidebarData.type === "sale"}
                />
                <span>Sale</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={sidebarData.offer}
                />
                <span>Offer</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Amenities
            </label>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={sidebarData.parking}
                />
                <span>Parking</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-4 h-4"
                  onChange={handleChange}
                  checked={sidebarData.furnished}
                />
                <span>Furnished</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Sort By</label>
            <select
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-slate-400"
              id="sort_order"
              onChange={handleChange}
              value={`${sidebarData.sort}_${sidebarData.order}`}
            >
              <option value="regularPrice_desc">Price: High to Low</option>
              <option value="regularPrice_asc">Price: Low to High</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
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
