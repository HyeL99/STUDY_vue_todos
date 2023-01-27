<template>
  <main>
    <section class="scroll">
      <p v-if="!isLogin">로그인이 필요합니다.</p>
      <p v-if="isLogin && $store.state.accountData.todos.length === 0">투두 아이템이 없습니다</p>
      <ul>
        <li v-for="(item,index) of $store.state.accountData.todos" :key="index">
          <input type="checkbox" :id="`todoItem_${index}`" :checked="item.isDone ? 'checked' : false" @change="changeItemState(item.name)">
          <label :for="`todoItem_${index}`" :class="item.isDone ? 'checkState' : ''" >
            <i class="fa-sharp fa-solid fa-square boxUncheck" v-if="!item.isDone"></i>
            <i class="fa-sharp fa-solid fa-square-check boxCheck" v-if="item.isDone"></i>
          </label>
          <label :for="`todoItem_${index}`" :class="item.isDone ? 'checkState checkContent' : 'checkContent'" >{{item.name}}</label>
          <button @click="deleteTodoItem(item.name)"><i class="fa-sharp fa-solid fa-trash" title="삭제"></i></button>
        </li>
      </ul>
      <button class="deleteAllBtn" v-if="isLogin && $store.state.accountData.todos.length > 1" @click="clearItemAll">모두 삭제</button>
    </section>
    <input-form @addTodoItem="addItem" v-if="isLogin"></input-form>
  </main>
</template>

<script>

import {mapActions, mapState} from "vuex";
import InputForm from "@/components/InputForm.vue";

export default {
  name: 'HomeView',
  components: {InputForm},
  data(){
    return{
      todoList: this.$store.state.accountData.todos
    }
  },
  methods:{
    ...mapActions(['changeItemState','addTodoItem','deleteTodoItem','clearItemAll']),
    addItem(newItem){
      this.addTodoItem(newItem);
    },
  },
  computed:{
    ...mapState(['isLogin'])
  },
}
</script>

<style lang="scss" scoped>
  main{
    display: flex;
    flex-direction: column;
    width: 100%;
    p{
      text-align: center;
    }
    section{
      flex-grow: 1;
      padding: 1rem 0 calc(50px + 1rem);
      overflow: auto;
      ul{
        li{
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 1rem;
          border-top: 1px solid rgba(0,0,0,0.2);
          &:last-child{
            border-bottom: 1px solid rgba(0,0,0,0.2);
          }
          .checkContent{
            flex-grow: 1;
            text-align: start;
          }
          button{
            border: none;
            background-color: transparent;
            color: red;
            opacity: 0.5;
            transition: 0.3s;
            width: 25px;
            height: 25px;
            position: relative;
            &:hover{
              opacity: 1;
              &::before{
                transform: scale(1);
              }
            }
            &::before{
              content:'';
              position: absolute;
              width: 100%;
              height: 100%;
              border: 1px solid red;
              left:-1px;
              top:-1px;
              border-radius: 50%;
              transform: scale(0);
              transition: 0.3s;
            }
          }
        }
      }
      input[type='checkbox']{
        display: none;
      }
      label{
        &.checkState.checkContent{
          text-decoration: line-through;
          opacity: 0.5;
        }
        i{
          color: #666;
          margin-right: 1rem;
          &.boxUncheck{
            opacity: 0.3;
          }
        }
      }
      .deleteAllBtn{
        border: 0;
        display: block;
        width: calc(100% - 6px);
        margin: 0 auto;
        line-height: 25px;
        margin-top: 1rem;
        background: transparent;
        box-shadow: 0 0 3px rgba(0,0,0,0.3);
      }
    }
  }
</style>
