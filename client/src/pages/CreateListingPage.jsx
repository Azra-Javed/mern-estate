import { useState } from "react";
import ListingFormSection from "../components/listing/ListingFormSection";
import ImageUploadSection from "../components/listing/ImageUploadSection";
import UploadedImages from "../components/listing/UploadedImages";

const CreateListingPage = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

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
        setUploading(false);
      } catch (error) {
        setImageUploadError("Image upload failed (2 mb per image)");
        setUploading(false);
      }
    } else {
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

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <ListingFormSection />
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
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListingPage;
