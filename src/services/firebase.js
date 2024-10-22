// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth"; // Adicione a importação necessária
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe o AsyncStorage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_93sznrebwkJUpP1SWLewt5VD8wIJaX4",
  authDomain: "testeon-5e3da.firebaseapp.com",
  projectId: "testeon-5e3da",
  storageBucket: "testeon-5e3da.appspot.com",
  messagingSenderId: "672520593796",
  appId: "1:672520593796:web:344065eef0789426ab3dd1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage) // Configure a persistência usando AsyncStorage
});
