/* eslint-disable no-undef */
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: "./",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// API Endpoint for File Upload
app.post("/saveDocumentEntry", upload.single("file"), (req, res) => {
  try {
    const metadata = JSON.parse(req.body.data);

    fs.writeFileSync(
      `${req.file.filename}.json`,
      JSON.stringify(metadata, null, 2)
    );

    res.json({
      message: "File uploaded successfully",
      file: req.file.filename,
    });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

app.get("/saveDocumentEntry", (req, res) => {
  fs.readdir("./", (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve files" });
    }

    // Filter for uploaded files (images and PDFs)
    const fileExtensions = [".jpg", ".png", ".pdf"];
    const uploadedFiles = files.filter((file) =>
      fileExtensions.some((ext) => file.endsWith(ext))
    );

    // Filter for metadata JSON files
    const metadataFiles = files.filter((file) => file.endsWith(".json"));

    const fileDetails = uploadedFiles.map((file) => {
      const metadataFileName = `${file}.json`;

      if (metadataFiles.includes(metadataFileName)) {
        // Read metadata JSON file
        const metadata = JSON.parse(fs.readFileSync(metadataFileName, "utf-8"));
        return {
          filename: file,
          ...metadata, // Include all metadata details
        };
      }

      return { filename: file, metadata: null }; // If metadata is missing
    });

    console.log("Fetched File Details:", fileDetails); // Debugging output

    res.json({ files: fileDetails });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
