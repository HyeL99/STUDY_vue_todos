<template>
  <div id="app">
    <header>
      <div class="inner">
        <router-link :to="{name:'home'}"><h1>TodoApp</h1></router-link>
        <nav>
          <router-link :to="{name:'login'}" v-if="!isLogin"><i class="fa-solid fa-right-to-bracket" title="로그인"></i></router-link>
          <router-link :to="{name:'mypage'}" v-if="isLogin"><i class="fa-solid fa-user" title="마이페이지"></i></router-link>
        </nav>
      </div>

    </header>
    <router-view class="inner"/>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed:{
    ...mapState(['isLogin'])
  },
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,body,#app{
  width: 100%;
  height: 100%;
}
#app{
  display: flex;
  flex-direction: column;
  main{
    flex-grow: 1;
  }
}
a{
  color: inherit;
  text-decoration: none;
  /*display: inline-block;*/
}
ul{
  list-style: none;
}
header{
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
  position: sticky;
  left:0;
  top: 0;
  background: #fff;
  z-index: 1;
  //background: rgba(0,0,0,0.1);
  .inner{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 2rem;
  }
}
.inner{
  padding:0 2rem;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
}
.scroll{
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    display: none;
  }
}
.shadowBox{
  border: 0;
  display: block;
  width: calc(100% - 6px);
  margin: 0 auto;
  line-height: 25px;
  margin-top: 1rem;
  background: transparent;
  box-shadow: 0 0 3px rgba(0,0,0,0.3);
}
button, input[type='submit']{
  cursor:pointer;
}
</style>
