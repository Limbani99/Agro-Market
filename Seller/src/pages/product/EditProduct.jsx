import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import { ArrowLeft, Save, X, Image } from "lucide-react";

export default function EditProduct() {
  const { products, updateProduct } = useData();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    stock: "",
    category: "Vegetables",
    description: ""
  });

  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([null, null, null, null]);
  const [previews, setPreviews] = useState(["", "", "", ""]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) return;

    const product = products.find((p) => p.id?.toString() === id?.toString());
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        price: product.price.toString(),
        stock: product.stock.toString(),
        category: product.category,
        description: product.description || ""
      });

      const initialImages = product.images && product.images.length > 0
        ? [...product.images]
        : [product.image];
      while (initialImages.length < 4) {
        initialImages.push("");
      }
      setImages(initialImages);
      setIsInitialized(true);
    } else if (products.length > 0) {
      navigate("/products");
    }
  }, [id, products, navigate, isInitialized]);

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newFiles = [...imageFiles];
      newFiles[index] = file;
      setImageFiles(newFiles);

      const newPreviews = [...previews];
      newPreviews[index] = URL.createObjectURL(file);
      setPreviews(newPreviews);

      const newImages = [...images];
      newImages[index] = "NEW_FILE";
      setImages(newImages);
    }
  };

  const removeImage = (index) => {
    const newFiles = [...imageFiles];
    newFiles[index] = null;
    setImageFiles(newFiles);

    const newPreviews = [...previews];
    if (newPreviews[index].startsWith("blob:")) {
      URL.revokeObjectURL(newPreviews[index]);
    }
    newPreviews[index] = "";
    setPreviews(newPreviews);

    const newImages = [...images];
    newImages[index] = "";
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) return;
    setIsSaving(true);
    const success = await updateProduct({
      ...formData,
      images,
      imageFiles
    });
    setIsSaving(false);
    if (success) {
      navigate("/products");
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300 font-body">
      {/* Return button */}
      <div>
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Products</span>
        </Link>
        <h2 className="font-serif text-2xl font-bold text-slate-800 mt-2">Edit Product Listing</h2>
        <p className="text-slate-500 text-[13.5px] mt-0.5">Modify listings for {formData.name}.</p>
      </div>

      {/* Entry Form */}
      <div className="card bg-white p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-2">Product Title / Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Crisp Honeycrisp Apples"
              className="w-full px-4 py-2.5 text-[14px] border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 font-medium"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">Price per Unit ($)</label>
              <input
                type="number"
                step="0.01"
                required
                placeholder="e.g. 4.50"
                className="w-full px-4 py-2.5 text-[14px] border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 font-medium"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">Stock Qty</label>
              <input
                type="number"
                required
                placeholder="e.g. 50"
                className="w-full px-4 py-2.5 text-[14px] border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 font-medium"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">Category</label>
              <select
                className="w-full px-4 py-2.5 text-[14px] border border-slate-200/50 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 font-semibold"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Dairy & Eggs">Dairy & Eggs</option>
                <option value="Pantry">Pantry</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-2">Product Description</label>
            <textarea
              rows={4}
              required
              placeholder="Describe this listing..."
              className="w-full px-4 py-2.5 text-[14px] border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 leading-relaxed font-medium"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
              Harvest Gallery Photos (Exactly 4 Images)
            </label>
            <p className="text-xs text-slate-400 mb-3">
              Upload up to 4 photos. You can replace specific images or clear them. The first slot represents the Cover image.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((index) => {
                const hasNewPreview = !!previews[index];
                const hasExistingImage = images[index] && images[index] !== "NEW_FILE" && images[index] !== "";
                const displaySrc = hasNewPreview ? previews[index] : (hasExistingImage ? images[index] : "");

                return (
                  <div
                    key={index}
                    className="relative group border-2 border-dashed border-slate-200/50 hover:border-primary bg-bg-light hover:bg-[#F9F9F4] rounded-2xl aspect-square flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden"
                    onClick={() => {
                      if (!displaySrc) {
                        document.getElementById(`file-input-${index}`).click();
                      }
                    }}
                  >
                    {displaySrc ? (
                      <div className="w-full h-full relative group">
                        <img
                          src={displaySrc}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                        {index === 0 && (
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-primary text-white text-[9px] font-bold rounded uppercase tracking-wider shadow">
                            Cover
                          </span>
                        )}
                        <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {/* Replace Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              document.getElementById(`file-input-${index}`).click();
                            }}
                            className="p-1.5 bg-[#8F9E8B] hover:bg-[#7e8d7a] text-white rounded-full shadow animate-in fade-in"
                            title="Replace Image"
                          >
                            <Image className="w-3.5 h-3.5" />
                          </button>
                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(index);
                            }}
                            className="p-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow animate-in fade-in"
                            title="Remove Image"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-center px-2">
                        <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center transition-colors group-hover:bg-[#8F9E8B]/10 group-hover:text-[#8F9E8B]">
                          <Image className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500">
                          {index === 0 ? "Cover Photo" : `Photo ${index + 1}`}
                        </span>
                        <span className="text-[9px] font-medium text-slate-400">Click to upload</span>
                      </div>
                    )}
                    <input
                      id={`file-input-${index}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(index, e)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4 justify-end mt-4 border-t border-slate-100 pt-6">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => navigate("/products")}
              className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 disabled:opacity-50 text-slate-600 font-bold rounded-full transition-colors border border-slate-200/50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="btn-primary disabled:opacity-85 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


