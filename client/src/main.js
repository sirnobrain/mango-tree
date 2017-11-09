// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import VueFire from 'vuefire'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial)
Vue.use(VueFire)

Vue.config.productionTip = false

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBOjWjZdGZ-JfO6de7LpGjrIp2jXDNIhAg',
  authDomain: 'mango-tree-3ddf7.firebaseapp.com',
  databaseURL: 'https://mango-tree-3ddf7.firebaseio.com',
  projectId: 'mango-tree-3ddf7',
  storageBucket: 'mango-tree-3ddf7.appspot.com',
  messagingSenderId: '847139402222'
}

firebase.initializeApp(config)

const db = firebase.database()
Vue.prototype.$db = db

let app

firebase.auth().onAuthStateChanged(function (user) {
  if (user) Vue.prototype.$user = user
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      user,
      data: {
        username: user.displayName,
        uid: user.uid,
        mangoTree: Vue.prototype.$db.ref('/users/' + user.uid)
      },
      router,
      template: '<App/>',
      components: { App }
    })
  }
})
