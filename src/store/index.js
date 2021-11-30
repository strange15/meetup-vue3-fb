import { createStore } from "vuex";
import dayjs from "dayjs";

export default createStore({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
        id: 'afajfjadfaadfa323',
        title: 'Meetup in New York',
        date: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        location: 'New York',
        description: 'New York, New York!'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
        id: 'aadsfhbkhlk1241',
        title: 'Meetup in Paris',
        date: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        location: 'Paris',
        description: 'It\'s Paris!'
      }
    ],
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
  },
  actions: {
    // loadMeetups ({commit}) {
    // },
    // createMeetup ({commit, getters}, payload) {
    // },
    // signUserUp ({commit}, payload) {
    // },
    // signUserIn ({commit}, payload) {
    // },
    // autoSignIn ({commit}, payload) {
    // },
    // logout ({commit}) {
    // },
  },
  modules: {},
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
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
    // user (state) {
    //   return state.user
    // },
    // loading (state) {
    //   return state.loading
    // },
    // error (state) {
    //   return state.error
    // }
  }
});
