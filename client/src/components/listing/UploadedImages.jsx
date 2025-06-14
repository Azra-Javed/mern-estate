const UploadedImages = ({ imageUrls, handleRemoveImage }) => {
  return (
    <>
      {imageUrls.length > 0 &&
        imageUrls.map((url, idx) => (
          <div
            key={idx}
            className="flex justify-between p-3 shadow items-center"
          >
            <img
              src={url}
              alt={`listing image ${idx + 1}`}
              className="w-20 h-20 object-contain rounded-lg"
            />
            <button
              className="p-3 text-red-700 uppercase hover:opacity-75 cursor-pointer"
              type="button"
              onClick={() => handleRemoveImage(idx)}
            >
              Delete
            </button>
          </div>
        ))}
    </>
  );
};

export default UploadedImages;
