import { collection, getDocs, setDoc, doc, query, orderBy, onSnapshot, where, getDoc, updateDoc, arrayUnion, deleteDoc } from "@firebase/firestore";
import { firebase } from "../firebase";
import { formatRegistro } from "./utils";

class Groups {
    constructor(user) {
        this.user = user;
        this.filter = where("uid", "==", user.uid);
    }

    get #collectionRef() {
        return collection(firebase.firestore, "groups");
    }

    get() {
        return getDocs(query(this.#collectionRef, this.filter));
    }

    async exists(name) {
        const groups = await getDocs(query(this.#collectionRef, this.filter, where("name", "==", name)));
        return !groups.empty;
    }

    add(name) {
        return setDoc(doc(this.#collectionRef), {
            name,
            uid: this.user.uid
        });
    }

    stream(observer) {
        const queryRef = query(this.#collectionRef, this.filter, orderBy("name"));
        return onSnapshot(queryRef, observer);
    }
}

class Animal {
    constructor(user, group) {
        this.user = user;
        this.group = group;
    }

    get #collectionRef() {
        return collection(firebase.firestore, "animais", this.user.uid, this.group.key);
    }

    stream(observer) {
        const queryRef = query(this.#collectionRef, this.filter, orderBy("registro"));
        return onSnapshot(queryRef, observer);
    }

    get(id) {
        return getDoc(doc(firebase.firestore, "animais", this.user.uid, this.group.key, id));
    }

    addOrUpdate(animal) {
        animal.id = formatRegistro(animal.registro);
        const animalRef = doc(firebase.firestore, "animais", this.user.uid, this.group.key, animal.id);
        return getDoc(animalRef)
            .then(doc => {
                if (doc.exists()) {
                    return updateDoc(animalRef, {
                        pesagem: arrayUnion(animal.pesagem[0])
                    }).then(() => {
                        console.log("Document has been updated successfully");
                    }).catch(err => {
                        console.log(err);
                    });
                }

                return setDoc(animalRef, animal).then(() => {
                    console.log("Document has been added successfully");
                }).catch(err => {
                    console.log(err);
                });
            })
            .catch(error => {
                console.log(error);
                return setDoc(animalRef, animal).then(() => {
                    console.log("Document has been added successfully");
                }).catch(err => {
                    console.log(err);
                });
            });
    }

    delete(id) {
        const animalRef = doc(firebase.firestore, "animais", this.user.uid, this.group.key, id);
        deleteDoc(animalRef)
    }
}

export { Groups, Animal }