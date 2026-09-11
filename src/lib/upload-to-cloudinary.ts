export async function uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET as string);
  
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
  
    if (!res.ok) {
      throw new Error("File upload failed");
    }
  
    const data = await res.json();
    return data.secure_url;
  }