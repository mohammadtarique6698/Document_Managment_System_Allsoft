import React, { useState } from "react";

const HomePage = () => {
  const [searchCategory, setSearchCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">File Search</h1>
      <div className="space-y-4">
        <select
          onChange={(e) => setSearchCategory(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Select Category</option>
          <option value="Personal">Personal</option>
          <option value="Professional">Professional</option>
        </select>
        <input
          type="text"
          placeholder="Tags"
          value={tags.join(", ")}
          onChange={(e) => setTags(e.target.value.split(","))}
          className="border p-2 w-full"
        />
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 w-full"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>
    </div>
  );
};

export default HomePage;
