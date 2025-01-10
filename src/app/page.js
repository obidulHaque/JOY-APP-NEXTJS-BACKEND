"use client";
import { useState } from "react";
import axios from "axios";

export default function UploadPage() {
  const [videoFile, setVideoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  // Handle file input change
  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  // Handle form submission
  const handleUpload = async (event) => {
    event.preventDefault();
    if (!videoFile) {
      setUploadMessage("Please select a video file to upload.");
      return;
    }

    setIsUploading(true);
    setUploadMessage("");

    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append("video", videoFile);

      // Make a POST request to the API route
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setUploadMessage(`Upload successful! Video URL: ${response.data.url}`);
      } else {
        setUploadMessage("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      setUploadMessage("An error occurred during the upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Upload Video to Cloudinary</h1>
      <form onSubmit={handleUpload}>
        <div>
          <label htmlFor="video">Choose a video:</label>
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          disabled={isUploading}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: isUploading ? "#ccc" : "#0070f3",
            color: "white",
            border: "none",
            cursor: isUploading ? "not-allowed" : "pointer",
          }}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {uploadMessage && (
        <p
          style={{
            marginTop: "1rem",
            color: uploadMessage.includes("successful") ? "green" : "red",
          }}
        >
          {uploadMessage}
        </p>
      )}
    </div>
  );
}
