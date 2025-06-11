import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../redux/user/userSlice";

const ProfilePage = () => {
  const fileRef = useRef(null);
  const { currentUser, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();

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

      // Validate file size and type
      if (file.size > 2 * 1024 * 1024 || !file.type.startsWith("image/")) {
        setFileUploadError(true);
        setUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

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
        throw new Error(
          `Upload failed: ${errorData.error?.message || "Unknown error"}`
        );
      }

      const data = await response.json();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (
      selectedFile.size > 2 * 1024 * 1024 ||
      !selectedFile.type.startsWith("image/")
    ) {
      setFileUploadError(true);
      return;
    }

    setFile(selectedFile);
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          onChange={handleFileSelect}
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
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="userName"
          defaultValue={currentUser?.userName || ""}
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          defaultValue={currentUser?.email || ""}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
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
        <span
          className="text-red-700 cursor-pointer"
          onClick={handleDeleteUser}
        >
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>

      <p className="text-red-700 mt-5">{error ? error : null}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully" : null}
      </p>
    </div>
  );
};

export default ProfilePage;
