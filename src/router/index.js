import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyPageView from "@/views/MyPageView.vue";
import store from "@/store";

Vue.use(VueRouter)

const rejectAuthUser = (to, from, next) => {
  if(store.state.isLogin){
    //이미 로그인 된 유저는 홈 화면으로 밀어버림
    alert('이미 로그인 되었습니다.');
    next({name:'home'})
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    beforeEnter: rejectAuthUser
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MyPageView
  },
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
