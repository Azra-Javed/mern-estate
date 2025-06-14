const ImageUploadSection = ({
  files,
  setFiles,
  handleImageSubmit,
  uploading,
  imageUploadError,
}) => {
  return (
    <>
      <p className="font-semibold">
        Images:
        <span className="font-normal text-gray-600 ml-2">
          The first image will be the cover (max 6)
        </span>
      </p>
      <div className="flex gap-4">
        <input
          type="file"
          accept="image/*"
          id="images"
          multiple
          className="p-3 border border-gray-300 rounded w-full file:border file:border-gray-400 file:p-2 file:rounded-lg"
          onChange={(e) => setFiles(e.target.files)}
        />
        <button
          type="button"
          className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-85"
          onClick={handleImageSubmit}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
      <p className="text-red-700 text-sm">
        {imageUploadError && imageUploadError}
      </p>
    </>
  );
};

export default ImageUploadSection;
