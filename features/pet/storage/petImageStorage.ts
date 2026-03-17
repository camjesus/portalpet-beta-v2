import { storage } from "@/FirebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import * as Crypto from "expo-crypto";
import { uploadImage } from "@/services/utils/cloudinary";

//Upload con FirebaseStorage
//async function uploadImage(image: string) {
//  const response = await fetch(image);
//  const blob = await response.blob();
//
//  const id = Crypto.randomUUID();
//  const refImage = ref(storage, `petImages/${id}`);
//
//  const uploadTask = await uploadBytesResumable(refImage, blob);
//
//  return await getDownloadURL(uploadTask.ref);
//}

export const resolvePetImage = async (image: string) => {
  console.log("image", image)
  if (image.substring(0, 5) !== "https") {
    return await uploadImage(image);
  }

  return null;
};