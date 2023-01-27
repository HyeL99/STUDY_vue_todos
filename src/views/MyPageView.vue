<template>
<main>
  <h2>나의 계정 정보</h2>
  <ul>
    <li>{{$store.state.accountData.email}}</li>
  </ul>
  <button @click="logout" class="shadowBox">로그아웃</button>
</main>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "MyPageView",
  methods:{
    ...mapActions(['logout']),
  },
  beforeRouteEnter:(to,from,next)=>{
    let isLogin = localStorage.getItem('acId') || false;
    if(isLogin){
      next();
    } else {
      next({name:'home'})
    }
  }
}
</script>

<style scoped lang="scss">
main{
  padding-top: 1rem;
}
</style>