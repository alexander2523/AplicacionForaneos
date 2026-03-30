import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";

export const uploadImage = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const filename = `cuartos/${Date.now()}-${Math.random()}`;
  const storageRef = ref(storage, filename);

  await uploadBytes(storageRef, blob);

  return await getDownloadURL(storageRef);
};