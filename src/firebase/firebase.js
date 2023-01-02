import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import config from "./config";

const app = initializeApp(config);

const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
