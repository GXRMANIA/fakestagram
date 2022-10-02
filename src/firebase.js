import { initializeApp } from "firebase/app";
import { updateProfile, signOut, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes, listAll } from "firebase/storage";
import { addDoc, updateDoc, getFirestore, doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDc_bd4NkH3bpdgOn1fp92g_kTEBcUtWY",
  authDomain: "instagram-55003.firebaseapp.com",
  projectId: "instagram-55003",
  storageBucket: "instagram-55003.appspot.com",
  messagingSenderId: "685741364592",
  appId: "1:685741364592:web:9ba2a1a71b71896b1febb5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export function signup(email, password, username) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: username, photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
          console.log("updated")
        }).catch((error) => {
          console.log(error)
      
        });
    })
    .catch((error) => {
        console.log("Error at Sign up" + error)
    });
}

export async function logInAnon() {
  signInAnonymously(auth).then(() => {
    updateProfile(auth.currentUser, {
      displayName: "Anonymous", photoURL: "https://example.com/jane-q-user/profile.jpg"
    })
  })
}

export function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log("Sucessfull Log in " + userCredential )
  })
  .catch((error) => {
    console.log("Error at Log in" + error)
  });
}

export function signout() {
    signOut(auth).then(() => {
      console.log("Signed out")
      })
}

export async function upload(file, user) {
  const storageRef = ref(storage, user.uid+"/"+file.name);
  return uploadBytes(storageRef, file).then(async (snapshot) => {
    console.log("Upload sucessfull!")
    const imageRef = ref(storage, user.uid+"/"+file.name);
    return getDownloadURL(imageRef).then(async (url) => {
      try {
        await setDoc(doc(db, user.uid, file.name), {
          likes: [],
          user: user.displayName,
          url: url,
          name: file.name,
          id: user.uid,
          comments: [],
        });
        await setDoc(doc(db, "users", user.uid), {
          id: user.uid,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    })
  })
}

export async function getData(id) {
  let dataList = await getDocs(collection(db, id));
  let allData = []
  dataList.forEach((data) => {
    allData.push(data.data())
  })
  return allData
}

export async function getAllIds() {
  const allIds = [];
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    allIds.push(doc.data().id)
  });
  return allIds;
}

export async function getDataOfPost(id, file) {
  const docRef = doc(db, id, file);
  const docSnap = await getDoc(docRef);
  return docSnap;
}


export async function updateLike(id, file) {
  const docRef = doc(db, file.id, file.name);
  const docSnap = await getDoc(docRef);
  let likesArr = docSnap.data().likes;

  if(likesArr.includes(id) & likesArr.length >= 0) {
    let index = likesArr.indexOf(id)
    likesArr.splice(index, 1)
    await updateDoc(doc(db, file.id, file.name), {
      likes: likesArr,
    })
    return
  }

  await updateDoc(doc(db, file.id, file.name), {
    likes: likesArr.concat(id)
  })

  return
}

export async function uploadComment(comment, post, commentUser) {
  console.log(post.id, post.name)
  const docRef = doc(db, post.id, post.name);
  const docSnap = await getDoc(docRef);
  console.log({[commentUser.displayName]:comment})
  await updateDoc(doc(db, post.id, post.name), {
    comments: docSnap.data().comments.concat({[commentUser.displayName]:comment}),
  })
}