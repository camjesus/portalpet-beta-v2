import * as FileSystem from "expo-file-system";

const CLOUD_NAME = "dbwxv0h6x";
const UPLOAD_PRESET = "images";

export async function uploadImage(uri: string): Promise<string> {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: "base64",
  });

  const formData = new FormData();
  formData.append("file", `data:image/jpeg;base64,${base64}`);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  const data = await response.json();
  if (!data.secure_url) throw new Error("Error al subir imagen");
  return data.secure_url;
}