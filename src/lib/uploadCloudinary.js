import cloudinary from "./cloudinaryConfig";

const uploadToCloudinary = async (file, folder) => {
  const buffer = Buffer.from(await file.arrayBuffer()); // Convert file to buffer

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(buffer); // Send the buffer to Cloudinary
  });
};

export default uploadToCloudinary;
