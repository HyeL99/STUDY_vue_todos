<template>
  <main>
    <h2>로그인</h2>
    <form @submit="handleAccount">
      <input type="email" placeholder="이메일" v-model="accountEmail" name="accountEmail">
      <input type="submit" value="로그인" v-if="isLoginMode" class="shadowBox">
      <input type="submit" value="회원가입" v-if="!isLoginMode" class="shadowBox">
    </form>
    <button v-if="isLoginMode" @click="handleLoginMode">회원가입으로 전환</button>
    <button v-if="!isLoginMode" @click="handleLoginMode">로그인으로 전환</button>
  </main>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "LoginView",
  data(){
    return{
      accountEmail:'',
      isLoginMode:true,
    }
  },
  methods:{
    ...mapActions(['signIn','signUp']),
    clearForm(){
      this.accountEmail = '';
      this.accountMaintain = true;
    },
    handleAccount(e){
      e.preventDefault();
      console.log(this.accountEmail);
      if(this.accountEmail.length === 0){
        return alert('이메일을 입력해주세요');
      }
      if(this.isLoginMode) this.signIn({email:this.accountEmail})
      else this.signUp({email: this.accountEmail})
      this.clearForm();
    },
    handleLoginMode(){
      this.isLoginMode = !this.isLoginMode
    }
  }
}
</script>

<style scoped lang="scss">
main{
  padding-top: 1rem;
  h2{
    margin-bottom: 5rem;
  }
  input:first-of-type{
    line-height: 30px;
    width: 100%;
    padding: 0 20px;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.3);
    margin-bottom: 2rem;
  }
  button{
    margin-top: 1rem;
    padding: 0.2rem 0.3rem;
    border: 0;
    background: 0;
    border-bottom: 1px solid rgba(0,0,0,0.3);
  }
}
</style>