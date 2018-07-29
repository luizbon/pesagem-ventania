import Rebase from "re-base";
import { database } from "./firebase";

const base = Rebase.createClass(database);

export { base };
