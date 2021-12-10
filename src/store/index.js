import { createStore } from "vuex";
import dayjs from "dayjs";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, child, get, push, update } from "firebase/database";
import { ElMessage } from "element-plus";
import router from "../router";

export default createStore({
  state: {
    loadedMeetups: [
      {
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg",
        id: "afajfjadfaadfa323",
        title: "Meetup in New York",
        date: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        location: "New York",
        description: "New York, New York!",
      },
      {
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg",
        id: "aadsfhbkhlk1241",
        title: "Meetup in Paris",
        date: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        location: "Paris",
        description: "It's Paris!",
      },
    ],
    user: null,
    loading: false,
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    updateMeetupData(state, payload) {
      const meetup = state.loadedMeetups.find((meetup) => {
        return meetup.id === payload.id;
      });
      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    loadMeetups({ commit }) {
      commit("setLoading", true);
      const dbRef = ref(getDatabase());
      get(child(dbRef, `meetups`))
        .then((data) => {
          if (data.exists()) {
            const meetups = [];
            const obj = data.val();
            for (let key in obj) {
              meetups.push({
                id: key,
                title: obj[key].title,
                description: obj[key].description,
                imageUrl: obj[key].imageUrl,
                date: obj[key].date,
                creatorId: obj[key].creatorId,
              });
            }
            commit("setLoadedMeetups", meetups);
          } else {
            console.log("No data available");
          }
          commit("setLoading", false);
        })
        .catch((error) => {
          commit("setLoading", false);
          console.error(error);
        });
    },
    createMeetup({ commit }, payload) {
      commit("setLoading", true);
      let date1 = dayjs(payload["value"].date1).format("YYYY-MM-DD");
      let date2 = dayjs(payload["value"].date2).format("HH:mm:ss");
      const meetup = {
        title: payload["value"].title,
        location: payload["value"].location,
        imageUrl: payload["value"].imageUrl,
        description: payload["value"].description,
        date: `${date1} ${date2}`,
      };
      const db = getDatabase();

      push(ref(db, "meetups"), meetup)
        .then((data) => {
          commit("setLoading", false);
          const key = data.key;
          commit("createMeetup", { ...meetup, id: key });
          router.push({ name: "Meetups" });
        })
        .catch((error) => {
          commit("setLoading", false);
          ElMessage.error(error.message);
        });
    },
    updateMeetupData({ commit }, payload) {
      console.log(
        "🚀 ~ file: index.js ~ line 109 ~ updateMeetupData ~ payload",
        payload
      );
      commit("setLoading", true);

      // let date1 = dayjs(payload["value"].date1).format("YYYY-MM-DD");
      // let date2 = dayjs(payload["value"].date2).format("HH:mm:ss");
      // const meetup = {
      //   title: payload["value"].title,
      //   location: payload["value"].location,
      //   imageUrl: payload["value"].imageUrl,
      //   description: payload["value"].description,
      //   date: `${date1} ${date2}`,
      // };
      // const db = getDatabase();

      // push(ref(db, "meetups"), meetup)
      //   .then((data) => {
      //     commit("setLoading", false);
      //     const key = data.key;
      //     commit("createMeetup", { ...meetup, id: key });
      //     router.push({ name: "Meetups" });
      //   })
      //   .catch((error) => {
      //     commit("setLoading", false);
      //     ElMessage.error(error.message);
      //   });

      const db = getDatabase();
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      updateObj.date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");

      // Get a key for a new Post.
      const newPostKey = push(child(ref(db), "posts")).key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      updates["/meetups/" + newPostKey] = updateObj;
      update(ref(db), updates)
        .then((res) => {
          console.log("🚀 ~ file: index.js ~ line 155 ~ update ~ res", res);
          commit("setLoading", false);
          commit("updateMeetup", payload);
        })
        .catch((error) => {
          console.log("🚀 ~ file: index.js ~ line 157 ~ update ~ error", error);
          commit("setLoading", false);
        });
    },
    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      const auth = getAuth();
      createUserWithEmailAndPassword(
        auth,
        payload["value"].email,
        payload["value"].password
      )
        .then((user) => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
          };
          commit("setUser", newUser);
          router.push("/");
        })
        .catch((error) => {
          commit("setLoading", false);
          ElMessage.error(error.message);
        });
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      const auth = getAuth();
      signInWithEmailAndPassword(
        auth,
        payload["value"].email,
        payload["value"].password
      )
        .then((user) => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
          };
          commit("setUser", newUser);
          router.push("/");
        })
        .catch((error) => {
          commit("setLoading", false);
          ElMessage.error(error.message);
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", { id: payload.uid, registeredMeetups: [] });
    },
    logout({ commit }) {
      const auth = getAuth();
      signOut(auth);
      commit("setUser", null);
      router.push("/");
    },
  },
  modules: {},
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    // featuredMeetups (state, getters) {
    //   return getters.loadedMeetups.slice(0, 5)
    // },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
  },
});
