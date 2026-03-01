import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAiU0Ec0uPtISgNIK_fNkbW6nYq7p91y6Y",
  authDomain: "fixkaro-f7f96.firebaseapp.com",
  projectId: "fixkaro-f7f96",
  storageBucket: "fixkaro-f7f96.firebasestorage.app",
  messagingSenderId: "1008189801616",
  appId: "1:1008189801616:web:46b27c03df1f6218d44415",
  measurementId: "G-HWDMCJDY7J"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
