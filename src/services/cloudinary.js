import axios from "axios";

const uploadToCloudinary = async (file) => {

  const data = new FormData();

  data.append("file", file);

  data.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );


  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }/image/upload`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

    


  const result = await res.data;

  return result.secure_url;
};


export default uploadToCloudinary;