import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB538zhMgMnREnMNUXZ3IDWsiPmUzobma0",
  authDomain: "nallely-fisio.firebaseapp.com",
  projectId: "nallely-fisio",
  storageBucket: "nallely-fisio.firebasestorage.app",
  messagingSenderId: "175009623386",
  appId: "1:175009623386:web:07b884e5e0ccefaf401763",
  measurementId: "G-VEQFP7M5XC"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
