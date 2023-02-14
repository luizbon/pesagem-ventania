import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import config from "./config";

const app = initializeApp(config);

const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);

enableIndexedDbPersistence(firestore);

export { auth, database, firestore };
