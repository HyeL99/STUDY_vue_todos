import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeMount() {
  },
  mounted() {
    this.$store.dispatch('getUserEmailList')
  },
  render: h => h(App)
}).$mount('#app')
