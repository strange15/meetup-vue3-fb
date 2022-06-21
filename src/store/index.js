import { createStore } from "vuex";
import dayjs from "dayjs";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  child,
  get,
  push,
  update,
  remove,
  onValue,
} from "firebase/database";
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
    registerUserForMeetup(state, payload) {
      const id = payload.id;
      if (state.user.registeredMeetups.findIndex((meetup) => meetup.id === id) >= 0) {
        return;
      }
      state.user.registeredMeetups.push(id);
      state.user.fbKeys[id] = payload.fbKey;
    },
    unregisterUserForMeetup(state, payload) {
      const registeredMeetups = state.user.registeredMeetups;
      registeredMeetups.splice(registeredMeetups.findIndex((meetup) => meetup.id === payload), 1);
      Reflect.deleteProperty(state.user.fbKeys, payload);
    },
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    updateMeetupData(state, payload) {
      const meetups = state.loadedMeetups.map((meetup) => {
        if (meetup.id === payload.id) {
          meetup.title = payload.obj.title;
          meetup.description = payload.obj.description;
          meetup.date = payload.obj.date;
        }
        return meetup;
      });
      state.loadedMeetups = meetups;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    registerUserForMeetup({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      const db = getDatabase();

      push(ref(db, "/users/" + user.id + "/registerations/"), payload)
        .then((data) => {
          commit("setLoading", false);
          commit("registerUserForMeetup", { id: payload, fbKey: data.key });
          ElMessage.success('You have successfully registered for this meetup!');
        })
        .catch((error) => {
          commit("setLoading", false);
          ElMessage.error(error.message);
        });
    },
    unregisterUserForMeetup({ commit, getters }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      if (!user.fbKeys) {
        return;
      }
      const fbKey = user.fbKeys[payload];
      const db = getDatabase();
      remove(ref(db, "/users/" + user.id + "/registerations/" + fbKey))
        .then(() => {
          commit("setLoading", false);
          commit("unregisterUserForMeetup", payload);
          ElMessage.warning("You have successfully unregistered for this meetup");
        })
        .catch((error) => {
          commit("setLoading", false);
          ElMessage.error(error.message);
        });
    },
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
                location: obj[key].location,
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
    createMeetup({ commit, getters }, payload) {
      commit("setLoading", true);
      let date1 = dayjs(payload["value"].date1).format("YYYY-MM-DD");
      let date2 = dayjs(payload["value"].date2).format("HH:mm:ss");
      const meetup = {
        title: payload["value"].title,
        location: payload["value"].location,
        imageUrl: payload["value"].imageUrl,
        description: payload["value"].description,
        date: `${date1} ${date2}`,
        creatorId: getters.user.id,
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
      commit("setLoading", true);

      const db = getDatabase();
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.date1) {
        let date1 = dayjs(payload.date1).format("YYYY-MM-DD");
        let date2 = dayjs(payload.date2).format("HH:mm:ss");
        updateObj.date = `${date1} ${date2}`;
      } else {
        updateObj.date = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
      }
      updateObj.imageUrl = payload.imageUrl;
      updateObj.location = payload.location;
      updateObj.creatorId = payload.creatorId;
      const updates = {};
      updates["/meetups/" + payload.id] = updateObj;
      update(ref(db), updates)
        .then(() => {
          commit("setLoading", false);
          commit("updateMeetupData", { obj: updateObj, id: payload.id });
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
        .then((res) => {
          commit("setLoading", false);
          const newUser = {
            id: res.user.uid,
            registeredMeetups: [],
            fbKeys: {},
          };
          commit("setUser", newUser);
          localStorage.setItem("uid", res.user.uid);
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
        .then((res) => {
          commit("setLoading", false);
          const newUser = {
            id: res.user.uid,
            registeredMeetups: [],
            fbKeys: {},
          };
          commit("setUser", newUser);
          localStorage.setItem("uid", res.user.uid);
          router.push("/");
        })
        .catch((error) => {
          commit("setLoading", false);
          ElMessage.error(error.message);
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", {
        id: payload.uid,
        registeredMeetups: [],
        fbKeys: {},
      });
      localStorage.setItem("uid", payload.uid);
    },
    fetchUserData({ commit, getters }) {
      commit("setLoading", true);
      const db = getDatabase();
      return onValue(
        ref(db, "/users/" + getters.user.id + "/registerations/"),
        (snapshot) => {
          const dataPairs = snapshot.val();
          let registeredMeetups = [];
          let swappedPairs = {};
          for (let key in dataPairs) {
            registeredMeetups.push(dataPairs[key]);
            swappedPairs[dataPairs[key]] = key;
          }
          const updatedUser = {
            id: getters.user.id,
            registeredMeetups: registeredMeetups,
            fbKeys: swappedPairs,
          }
          commit("setLoading", false);
          commit("setUser", updatedUser);
      }, {
        onlyOnce: true
      });
    },
    logout({ commit }) {
      const auth = getAuth();
      signOut(auth);
      commit("setUser", null);
      localStorage.removeItem("uid");
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
