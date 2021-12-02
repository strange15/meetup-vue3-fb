import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "tailwindcss/tailwind.css";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getFirestore } from "firebase/firestore/lite";
//import { getDatabase } from "firebase/database";

function initFirebase() {
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  const firebaseConfig = {
    apiKey: "AIzaSyBILcyzgqRlTSGwwSD3fq2EJ3hmHdImKC4",
    authDomain: "yt-devmeetup-af81f.firebaseapp.com",
    databaseURL: "https://yt-devmeetup-af81f-default-rtdb.firebaseio.com",
    projectId: "yt-devmeetup-af81f",
    storageBucket: "yt-devmeetup-af81f.appspot.com",
    messagingSenderId: "854561744542",
    appId: "1:854561744542:web:62364b3ca70f59c2ca3d8f",
    measurementId: "G-1S92G7SYMQ",
  };
  initializeApp(firebaseConfig);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.dispatch("autoSignIn", user);
    }
  });
  // store.dispatch("loadMeetups");
  // Get a reference to the database service
  //const database = getDatabase(app);
  //console.log("🚀 ~ file: main.js ~ line 34 ~ initFirebase ~ database", database)
  // const db = getFirestore(app);

  // // Get a list of cities from your database
  // async function getCities(db) {
  //   const citiesCol = collection(db, 'cities');
  //   const citySnapshot = await getDocs(citiesCol);
  //   const cityList = citySnapshot.docs.map(doc => doc.data());
  //   return cityList;
  // }
  // console.log("🚀 ~ file: index.js ~ line 72 ~ getCities ~ getCities", getCities())
}
initFirebase();

library.add(fas);

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
