import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const ListingPage = () => {
  SwiperCore.use([Navigation]);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setListing(data);
        setLoading(false);
        setError(false);
      } catch (err) {
        console.error("Failed to fetch listing:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  return (
    <main>
      {/* loading */}
      {loading && (
        <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-semibold text-slate-600 animate-pulse">
            Loading...
          </p>
        </div>
      )}
      {/* error */}

      {error && (
        <div className="flex items-center  justify-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-red-700 mb-6">
              Oops! Something went wrong
            </h2>
            <Link
              to="/profile"
              className="px-4 py-2 text-white bg-slate-700 hover:bg-slate-800 rounded-md transition"
            >
              ← Go Back to Listings
            </Link>
          </div>
        </div>
      )}

      {/* listing */}

      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[500px]  "
                  style={{
                    background: `url(${url}) center no-repeat  `,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </main>
  );
};

export default ListingPage;
