const ListingFormSection = ({ formData, handleChange }) => {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <input
        type="text"
        id="name"
        placeholder="Title"
        className="border p-3 rounded-lg"
        maxLength="62"
        minLength="10"
        required
        value={formData.name}
        onChange={handleChange}
      />
      <textarea
        id="description"
        placeholder="Description"
        className="border p-3 rounded-lg"
        required
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="text"
        id="address"
        placeholder="Address"
        className="border p-3 rounded-lg"
        required
        value={formData.address}
        onChange={handleChange}
      />

      <div className="flex gap-6 flex-wrap">
        <div>
          <input
            type="checkbox"
            id="sale"
            className="w-5"
            onChange={handleChange}
            checked={formData.type === "sale"}
          />
          <span className="ml-1 capitalize">Sale</span>
        </div>
        <div>
          <input
            type="checkbox"
            id="rent"
            className="w-5"
            onChange={handleChange}
            checked={formData.type === "rent"}
          />
          <span className="ml-1 capitalize">Rent</span>
        </div>
        <div>
          <input
            type="checkbox"
            id="parking"
            className="w-5"
            onChange={handleChange}
            check={formData.parking}
          />
          <span className="ml-1 capitalize">Parking spot</span>
        </div>
        <div>
          <input
            type="checkbox"
            id="furnished"
            className="w-5"
            onChange={handleChange}
            check={formData.furnished}
          />
          <span className="ml-1 capitalize">Furnished</span>
        </div>
        <div>
          <input
            type="checkbox"
            id="offer"
            className="w-5"
            onChange={handleChange}
            check={formData.offer}
          />
          <span className="ml-1 capitalize">Offer</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <input
            className="p-3 border border-gray-300 rounded-lg"
            type="number"
            id="bedrooms"
            min={1}
            max={10}
            required
            value={formData.bedrooms}
            onChange={handleChange}
          />
          <span>Beds</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="p-3 border border-gray-300 rounded-lg"
            type="number"
            id="bathrooms"
            min={1}
            max={10}
            required
            onChange={handleChange}
            value={formData.bathrooms}
          />
          <span>Baths</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="p-3 border border-gray-300 rounded-lg"
            type="number"
            id="regularPrice"
            min={50}
            max={1000000}
            required
            onChange={handleChange}
            value={formData.regularPrice}
          />
          <div className="flex flex-col items-center">
            <p>Regular Price</p>
            <span className="text-sm">($ / month)</span>
          </div>
        </div>
        {formData.offer && (
          <div className="flex items-center gap-2">
            <input
              className="p-3 border border-gray-300 rounded-lg"
              type="number"
              id="discountPrice"
              min={0}
              max={1000000}
              required
              value={formData.discountPrice}
              onChange={handleChange}
            />
            <div className="flex flex-col items-center">
              <p>Discount Price</p>
              <span className="text-sm">($ / month)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingFormSection;
