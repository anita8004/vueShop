// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuefire from 'vuefire'
import firebase from 'firebase'
// import VueSession from 'vue-session'
import 'bootstrap'
import './assets/fontello/css/fontello.css'

import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(Vuefire)
// Vue.use(VueSession)
axios.defaults.withCredentials = true

let app
let config = {
  apiKey: 'AIzaSyCzM-k1kr_9CRj0nzQBL8tm89i5jHB85wA',
  authDomain: 'project-9f811.firebaseapp.com',
  databaseURL: 'https://project-9f811.firebaseio.com',
  projectId: 'project-9f811',
  storageBucket: 'project-9f811.appspot.com',
  messagingSenderId: '240760379820'
}
let firebaseApp = firebase.initializeApp(config)
Vue.prototype.$db = firebaseApp.database()

firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
  // console.log(user)
  firebaseApp.database().ref('member/currentUser').orderByChild('uid').equalTo(user.uid).on('value', snapshot => {
    let data = snapshot.val()
    for (var key in data) {
      var value = data[key]
      Vue.prototype.$current = value
    }
  })
})
