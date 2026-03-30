import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJvQv5THLN8F0vo8IuRKEcli9rHIi91nY",
  authDomain: "cuartos-foraneos.firebaseapp.com",
  projectId: "cuartos-foraneos",
  storageBucket: "cuartos-foraneos.firebasestorage.app",
  messagingSenderId: "132716763159",
  appId: "1:132716763159:web:d8493bbd497e191393e452"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);