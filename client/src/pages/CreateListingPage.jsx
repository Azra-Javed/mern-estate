import { useState } from "react";
import ListingFormSection from "../components/listing/ListingFormSection";
import ImageUploadSection from "../components/listing/ImageUploadSection";
import UploadedImages from "../components/listing/UploadedImages";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateListingPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "user_avatars");

      fetch("https://api.cloudinary.com/v1_1/dwrcdioy5/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.secure_url) {
            resolve(data.secure_url);
          } else {
            reject("Upload failed");
          }
        })
        .catch((err) => reject(err));
    });
  };

  const handleImageSubmit = async () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      try {
        const urls = await Promise.all(promises);
        setFormData((prev) => ({
          ...prev,
          imageUrls: [...prev.imageUrls, ...urls],
        }));
        toast.success("Images uploaded successfully!");
        setUploading(false);
      } catch (error) {
        toast.error("Image upload failed (2 MB per image)");
        setImageUploadError("Image upload failed (2 mb per image)");
        setUploading(false);
      }
    } else {
      toast.error("You can upload a maximum of 6 images per listing");
      setImageUploadError("You can upload 6 images per listing");
      setUploading(false);
    }
  };

  const handleRemoveImage = (idx) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== idx),
    }));
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length < 1) {
      toast.error("You must upload at least one image");
      return;
    }
    if (+formData.regularPrice < +formData.discountPrice) {
      toast.error("Discount price must be lower than regular price");
      return;
    }
    try {
      setLoading(true);
      setError(false);

      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      toast.success("Listing created successfully!");
      navigate(`/listing/${data._id}`);
    } catch (error) {
      toast.error("Something went wrong while creating the listing.");
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <ListingFormSection formData={formData} handleChange={handleChange} />
        <div className="flex flex-col flex-1 gap-4">
          <ImageUploadSection
            files={files}
            setFiles={setFiles}
            handleImageSubmit={handleImageSubmit}
            uploading={uploading}
            imageUploadError={imageUploadError}
          />
          <UploadedImages
            imageUrls={formData.imageUrls}
            handleRemoveImage={handleRemoveImage}
          />
          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListingPage;
