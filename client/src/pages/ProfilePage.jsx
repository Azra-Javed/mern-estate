import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);

  const CLOUDINARY_UPLOAD_PRESET = "user_avatars";
  const CLOUDINARY_CLOUD_NAME = "dwrcdioy5";
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    try {
      setUploading(true);
      setFileUploadError(false);
      setFilePerc(0);

      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        setFileUploadError(true);
        setUploading(false);
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        setFileUploadError(true);
        setUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      if (currentUser?.id) {
        formData.append("public_id", `user_${currentUser.id}_avatar`);
      }

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Cloudinary error:", errorData);
        throw new Error(
          `Upload failed: ${errorData.error?.message || "Unknown error"}`
        );
      }

      const data = await response.json();

      // Update form data with the uploaded image URL
      setFormData((prev) => ({ ...prev, avatar: data.secure_url }));
      setFilePerc(100);
      setUploading(false);
    } catch (error) {
      console.error("Upload error:", error);
      setFileUploadError(true);
      setUploading(false);
      setFilePerc(0);
    }
  };

  const handleFileUploadBase64 = (file) => {
    if (file.size > 1024 * 1024) {
      setFileUploadError(true);
      return;
    }

    const reader = new FileReader();
    reader.onloadstart = () => {
      setUploading(true);
      setFileUploadError(false);
    };

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setFilePerc(Math.round(progress));
      }
    };

    reader.onload = () => {
      setFormData((prev) => ({ ...prev, avatar: reader.result }));
      setFilePerc(100);
      setUploading(false);
    };

    reader.onerror = () => {
      setFileUploadError(true);
      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form data:", formData);
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />

        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 cursor-pointer object-cover self-center mt-2"
          src={formData.avatar || currentUser?.avatar || "/default-avatar.png"}
          alt="User profile picture"
        />

        <p className="text-sm text-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-gray-700">Uploading {filePerc}%</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image Successfully uploaded</span>
          ) : null}
        </p>

        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          defaultValue={currentUser?.username || ""}
        />

        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          defaultValue={currentUser?.email || ""}
        />

        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />

        <button
          type="submit"
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Update"}
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default ProfilePage;
