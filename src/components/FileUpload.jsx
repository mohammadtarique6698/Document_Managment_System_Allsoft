import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadFile } from "../redux/slices/fileSlice";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("Personal");
  const [subcategory, setSubcategory] = useState("");
  const [tags, setTags] = useState("");
  const [remarks, setRemarks] = useState("");
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const fileData = {
        file,
        category,
        subcategory,
        tags: tags.split(","),
        remarks,
      };
      dispatch(uploadFile(fileData));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-96">
      <h2 className="text-xl font-semibold text-center mb-4">Upload File</h2>
      <input
        type="file"
        className="border p-2 w-full rounded mb-2"
        onChange={handleFileChange}
      />
      <select
        className="border p-2 w-full rounded mb-2"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Personal">Personal</option>
        <option value="Professional">Professional</option>
      </select>
      <input
        type="text"
        placeholder="Enter Subcategory"
        className="border p-2 w-full rounded mb-2"
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Tags (comma separated)"
        className="border p-2 w-full rounded mb-2"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Remarks"
        className="border p-2 w-full rounded mb-2"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />
      <button
        onClick={handleUpload}
        className="bg-green-500 text-white p-2 w-full rounded"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
