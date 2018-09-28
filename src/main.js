// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import firebase from 'firebase'
import 'bootstrap'

import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
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
firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})
