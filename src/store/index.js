import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import router from "@/router";

const BASE_URL = 'https://my-json-server.typicode.com/HyeL99/Vue-todos-pwa';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userDataList: [],
    isLogin:false,
    accountData:{
      email: '',
      id:'',
      todos:[],
    }
  },
  getters: {
  },
  mutations: {
    setUserList(state,payload){
      state.userDataList = payload;
      console.log(state.userDataList)
    },
    setUserData(state,payload){
      state.accountData = payload;
    }
  },
  actions: {
    signIn(context,userData){//userData:{email}
      console.log(context,userData,context.state.userDataList)
      let userAccount = userData.email?
          context.state.userDataList.filter(user => user.email === userData.email)
          : context.state.userDataList.filter(user => user.id === userData.id)
      console.log('login',userAccount)
      if(userAccount.length > 0) {
        console.log(userAccount[0])
        localStorage.setItem('acId', userAccount[0].id)
        context.state.isLogin = true;
        context.commit('setUserData', userAccount[0]);
        console.log(window.location.pathname)
        if(window.location.pathname === '/login'){
          router.push({name:'home'})
        }
      }
      else console.log('로그인 실패')
    },
    signUp(context,userData){
      console.log(context,userData)
      if(context.state.userDataList.filter(user => user.email === userData.email).length > 0) console.log('이미 있는 이메일')
      else context.dispatch('addAccount',userData)
    },
    getUserEmailList({commit,dispatch}){
      let userEmailList = null;
      axios.get(`${BASE_URL}/userData`)
          .then(res => {
            userEmailList = res.data
          })
          .then(()=> {
            commit('setUserList', userEmailList)
          })
          .then(()=>{
            if(localStorage.getItem('acId')){console.log('실행')
              dispatch('checkLogin')
            }
          })
    },
    addAccount(context,userData){
      console.log(userData)
      let userEmail = userData.email;
      axios.post(`${BASE_URL}/userData`,{
        id:uuidv4(),
        email:userEmail,
        todos:[],
      })
          .then(() => {
            context.dispatch('getUserEmailList')
          })
          .catch((err)=> {
            console.log(err)
          })
    },
    checkLogin(context){
      let userId = localStorage.getItem('acId') || null
      if(userId !== null){
        console.log(userId)
        context.dispatch('signIn',{id:userId})
      }
    },
    logout(context){
      context.state.isLogin = false;
      context.state.accountData = {}
      localStorage.removeItem('acId');
      router.push({name:'home'});
    },
    changeItemState(context,itemName){
      let todos = context.state.accountData.todos;
      todos.forEach(item => {
        if(item.name === itemName) item.isDone = !item.isDone;
      })
      console.log(todos, itemName)
      axios.put(`${BASE_URL}/userData/${context.state.accountData.id}`,{
        email:context.state.accountData.email,
        id: context.state.accountData.id,
        todos: todos
      }).catch(err => console.log(err))
    },
    addTodoItem(context,newItem){
      let todos = context.state.accountData.todos;
      if(todos.filter(item => item.name === newItem).length > 0){
        alert('아이템이 중복됩니다.')
      } else {
        todos.push({name: newItem, isDone: false});
        axios.put(`${BASE_URL}/userData/${context.state.accountData.id}`,{
          email:context.state.accountData.email,
          id: context.state.accountData.id,
          todos: todos
        }).catch(err => console.log(err))
      }

    },
    deleteTodoItem(context,deleteItem){
      let res = confirm(`'${deleteItem}' 아이템을 삭제하시겠습니까?`)
      if(!res){
        alert('삭제 취소되었습니다.')
      } else {
        let todos = context.state.accountData.todos;
        let resArray = todos.filter(item => item.name !== deleteItem);
        console.log(todos)
        axios.put(`${BASE_URL}/userData/${context.state.accountData.id}`,{
          email:context.state.accountData.email,
          id: context.state.accountData.id,
          todos: resArray
        }).then(res => context.state.accountData = res.data).catch(err => console.log(err))
      }
    },
    clearItemAll(context){
      let res = confirm(`아이템을 전부 삭제하시겠습니까?`)
      if(!res){
        alert('삭제 취소되었습니다.')
      } else {
        axios.put(`${BASE_URL}/userData/${context.state.accountData.id}`,{
          email:context.state.accountData.email,
          id: context.state.accountData.id,
          todos: []
        }).then(res => context.state.accountData = res.data).catch(err => console.log(err))
      }
    }
  },
  modules: {
  }
})
