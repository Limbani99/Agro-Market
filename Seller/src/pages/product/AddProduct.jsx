import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useData } from "../../context/DataProvider";
import { ArrowLeft, Plus, X, Image } from "lucide-react";

export default function AddProduct() {
  const { addNewProduct } = useData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "Vegetables",
    description: ""
  });

  const [imageFiles, setImageFiles] = useState([null, null, null, null]);
  const [previews, setPreviews] = useState(["", "", "", ""]);

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newFiles = [...imageFiles];
      newFiles[index] = file;
      setImageFiles(newFiles);

      const newPreviews = [...previews];
      newPreviews[index] = URL.createObjectURL(file);
      setPreviews(newPreviews);
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) return;
    const success = await addNewProduct({
      ...formData,
      imageFiles
    });
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
        <h2 className="font-serif text-2xl font-bold text-slate-800 mt-2">List New Farm Harvest</h2>
        <p className="text-slate-500 text-[13.5px] mt-0.5">Describe your fresh farm crop yield to active platform buyers.</p>
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
              className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 font-medium"
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
                className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 font-medium"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">Initial Stock Qty</label>
              <input
                type="number"
                required
                placeholder="e.g. 50"
                className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 font-medium"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2">Product Category</label>
              <select
                className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 font-semibold"
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
            <label className="block text-[13px] font-bold text-slate-700 mb-2">Organic Product Description</label>
            <textarea
              rows={4}
              required
              placeholder="Detail your growing, organic harvesting, or production methods. Buyers appreciate seeing details about your organic verification or farm heritage."
              className="w-full px-4 py-2.5 text-[14px] border border-[#E3DFD3] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 leading-relaxed font-medium"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
              Harvest Gallery Photos (Exactly 4 Images)
            </label>
            <p className="text-xs text-slate-400 mb-3">
              Upload exactly 4 clear pictures of your harvest. The first photo acts as the primary Cover Photo.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="relative group border-2 border-dashed border-[#E3DFD3] hover:border-primary bg-[#FDFDFB] hover:bg-[#F9F9F4] rounded-2xl aspect-square flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden"
                  onClick={() => {
                    if (!previews[index]) {
                      document.getElementById(`file-input-${index}`).click();
                    }
                  }}
                >
                  {previews[index] ? (
                    <div className="w-full h-full relative group">
                      <img
                        src={previews[index]}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-primary text-white text-[9px] font-bold rounded uppercase tracking-wider shadow">
                          Cover
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow duration-200"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
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
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-end mt-4 border-t border-[#F0EDE6] pt-6">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold rounded-full transition-colors border border-[#E3DFD3]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              <Plus className="w-4 h-4 stroke-[3px]" />
              <span>Create Listing</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
