import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export const toggleFavorito = async (cuartoId: string, isFav: boolean) => {
  const userId = auth.currentUser?.uid;

  if (!userId) return;

  const refDoc = doc(db, "users", userId, "favoritos", cuartoId);

  if (isFav) {
    await deleteDoc(refDoc);
  } else {
    await setDoc(refDoc, { cuartoId });
  }
};