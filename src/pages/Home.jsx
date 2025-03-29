import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import JSZip from "jszip";

const Home = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [file, setFile] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [date, setDate] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [searchCategory, setSearchCategory] = useState("");
  const [searchTags, setSearchTags] = useState([]);
  const [searchFromDate, setSearchFromDate] = useState("");
  const [searchToDate, setSearchToDate] = useState("");
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  useEffect(() => {
    if (category === "Personal") {
      setSubCategory(["John", "Tom", "Emily", "Others"]);
    } else if (category === "Professional") {
      setSubCategory(["Accounts", "HR", "IT", "Finance"]);
    } else {
      setSubCategory([]);
    }
    setSelectedSubCategory("");
    fetchUploadedFiles();
  }, [category]);

  const fetchUploadedFiles = async () => {
    try {
      const response = await fetch("http://localhost:5000/saveDocumentEntry");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      if (!data.files || !Array.isArray(data.files)) {
        throw new Error("Invalid data format received");
      }

      setUploadedFiles(data.files);
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
      enqueueSnackbar("Failed to fetch uploaded files. Please try again.", {
        variant: "error",
      });
      setUploadedFiles([]); // Set to empty array to prevent crashes
    }
  };

  const handleAddTag = () => {
    if (inputTag && !tags.includes(inputTag)) {
      setTags([...tags, inputTag]);
      setInputTag("");
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (
      uploadedFile &&
      (uploadedFile.type.includes("image") || uploadedFile.type.includes("pdf"))
    ) {
      setFile(uploadedFile);
    } else {
      enqueueSnackbar("Only Images and PDFs are allowed!", {
        variant: "error",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      enqueueSnackbar("Please select a file to upload!", {
        variant: "warning",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "data",
        JSON.stringify({
          major_head: category,
          minor_head: selectedSubCategory,
          document_date: date,
          document_remarks: remarks,
          tags: tags.map((tag) => ({ tag_name: tag })),
          user_id: { selectedSubCategory: selectedSubCategory },
        })
      );

      const response = await fetch("http://localhost:5000/saveDocumentEntry", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      if (!text) {
        throw new Error("Empty response from server");
      }

      const data = JSON.parse(text);
      console.log("Parsed Response:", data);

      enqueueSnackbar("File uploaded successfully!", { variant: "success" });
      setCategory("");
      setSelectedSubCategory("");
      setTags([]);
      setFile(null);
      setRemarks("");
      setDate("");
      fetchUploadedFiles();
    } catch (error) {
      console.error("Error Uploading File:", error);
      enqueueSnackbar("Failed to upload file!", { variant: "error" });
    }
  };

  const filteredFiles = uploadedFiles.filter((file) => {
    return (
      (!searchCategory || file.major_head === searchCategory) &&
      (searchTags.length === 0 ||
        searchTags.every((tag) =>
          file.tags.map((t) => t.tag_name).includes(tag)
        )) &&
      (!searchFromDate ||
        new Date(file.document_date) >= new Date(searchFromDate)) &&
      (!searchToDate || new Date(file.document_date) <= new Date(searchToDate))
    );
  });

  const handleSearch = async () => {
    setTimeout(() => {
      setIsSearchPerformed(true);
    }, 1000);
  };

  const handleDownload = (fileUrl, filename) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = async () => {
    if (filteredFiles.length === 0) {
      enqueueSnackbar("No files available to download.", {
        variant: "warning",
      });
      return;
    }
    const zip = new JSZip();
    const folder = zip.folder("Downloaded_Files");

    for (const file of filteredFiles) {
      const response = await fetch(file.fileUrl);
      const blob = await response.blob();
      folder.file(file.filename, blob);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipBlob);
    link.download = "All_Files.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    enqueueSnackbar("All files downloaded as ZIP", { variant: "success" });
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Upload File</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Category</option>
          <option value="Personal">Personal</option>
          <option value="Professional">Professional</option>
        </select>

        <select
          value={selectedSubCategory}
          onChange={(e) => setSelectedSubCategory(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="">
            Select {category === "Personal" ? "Name" : "Department"}
          </option>
          {subCategory.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div>
          <input
            type="text"
            placeholder="Add Tag"
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Add Tag
          </button>
          <div className="mt-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 p-1 mr-2 rounded">
                {tag}{" "}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-red-500 ml-1"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <textarea
          placeholder="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 w-full"
          accept="image/*,.pdf"
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Upload
        </button>
      </form>
      <h3 className="text-lg font-semibold mt-6">Uploaded Files</h3>
      <ul className="mt-2">
        {filteredFiles.map((file, index) => (
          <li key={index} className="border p-2 mt-1">
            <strong>File:</strong> {file.filename} <br />
            <strong>Category:</strong> {file.major_head} <br />
            <strong>Department:</strong> {file.minor_head} <br />
            <strong>Date:</strong> {file.document_date} <br />
            <strong>Tags:</strong> {file.tags.map((t) => t.tag_name).join(", ")}{" "}
            <br />
            {file.fileType &&
            (file.fileType.endsWith("pdf") ||
              file.fileType.endsWith("jpg") ||
              file.fileType.endsWith("jpeg") ||
              file.fileType.endsWith("png")) ? (
              file.fileType.includes("pdf") ? (
                <object
                  data={file.fileUrl}
                  type="application/pdf"
                  width="100%"
                  height="200px"
                >
                  <p>
                    PDF preview is not available.{" "}
                    <a href={file.fileUrl}>Download</a>
                  </p>
                </object>
              ) : (
                <img
                  src={file.fileUrl}
                  alt="Preview"
                  className="w-full h-auto mt-2"
                />
              )
            ) : (
              <span className="text-gray-500">Preview not available</span>
            )}
            <button
              onClick={() => handleDownload(file.fileUrl, file.filename)}
              className="ml-2 bg-gray-500 text-white px-2 py-1 rounded"
            >
              Download
            </button>
          </li>
        ))}
      </ul>
      {isSearchPerformed && <p className="mt-2">No files found.</p>}
      <button
        onClick={handleDownloadAll}
        className="bg-red-500 text-white px-4 py-2 rounded w-full mt-4"
      >
        Download All as ZIP
      </button>
      {/* File Search Form */}
      <h3 className="text-lg font-semibold mt-6">Search Files</h3>
      <div className="space-y-2">
        <select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Select Category</option>
          <option value="Personal">Personal</option>
          <option value="Professional">Professional</option>
        </select>
        <input
          type="text"
          placeholder="Search Tags (comma separated)"
          onChange={(e) =>
            setSearchTags(e.target.value.split(",").map((tag) => tag.trim()))
          }
          className="border p-2 w-full"
        />
        <input
          type="date"
          value={searchFromDate}
          onChange={(e) => setSearchFromDate(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="date"
          value={searchToDate}
          onChange={(e) => setSearchToDate(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Search
        </button>
      </div>
      {/* Display Filtered Files */}
      <h3 className="text-lg font-semibold mt-6">Filtered Files</h3>
      {isSearchPerformed && filteredFiles.length > 0 ? (
        <ul className="mt-2">
          {filteredFiles.map((file, index) => (
            <li key={index} className="border p-2 mt-1">
              <strong>File:</strong> {file.filename} <br />
              <strong>Category:</strong> {file.major_head} <br />
              <strong>Department:</strong> {file.minor_head} <br />
              <strong>Date:</strong> {file.document_date} <br />
              <strong>Tags:</strong>{" "}
              {file.tags.map((t) => t.tag_name).join(", ")}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2">No files found.</p>
      )}
    </div>
  );
};

export default Home;
