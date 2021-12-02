import { createStore } from "vuex";
import dayjs from "dayjs";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ElMessage } from 'element-plus'
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
    setLoading(state, payload) {
      state.loading = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    // loadMeetups ({commit}) {

    // },
    createMeetup({ commit }, payload) {
      let date1 = dayjs(payload.date1).format("YYYY-MM-DD");
      let date2 = dayjs(payload.date2).format("HH:mm:ss");
      const meetup = {
        title: payload["value"].title,
        location: payload["value"].location,
        imageUrl: payload["value"].imageUrl,
        description: payload["value"].description,
        date: `${date1} ${date2}`,
        // creatorId: getters.user.id
        id: Date.now(),
      };
      commit("createMeetup", { ...meetup });
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
          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      const auth = getAuth();
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((user) => {
          console.log('login!!!!!!');
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
          console.log("signUserIn", error);
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", { id: payload.uid, registeredMeetups: [] });
    },
    logout({ commit }) {
      console.log("logout!!!!!!!");
      const auth = getAuth();
      signOut(auth);
      commit("setUser", null);
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
    // loadedMeetup (state) {
    //   return (meetupId) => {
    //     return state.loadedMeetups.find((meetup) => {
    //       return meetup.id === meetupId
    //     })
    //   }
    // },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    // error (state) {
    //   return state.error
    // }
  },
});
