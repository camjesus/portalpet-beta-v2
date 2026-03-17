const CLOUD_NAME = "dbwxv0h6x"; // lo encontrás en el dashboard de Cloudinary
const UPLOAD_PRESET = "images"; // lo creás en Settings → Upload → Add upload preset (unsigned)

export async function uploadImage(uri: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", { uri, type: "image/jpeg", name: "pet.jpg" } as any);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );
 const data = await response.json();
if (!data.secure_url) throw new Error("Error al subir imagen");
return data.secure_url;
}