<template>
  <form @submit="addTodoItem">
    <div class="inner">
      <input type="text" v-model="todoInput">
      <input type="submit" value="추가">
    </div>
  </form>
</template>

<script>
export default {
  name: "InputForm",
  data(){
    return{
      todoInput:'',
    }
  },
  methods:{
    addTodoItem(e){
      e.preventDefault()
      let inputValue = this.todoInput.trim().replace(/ +/g, " ");
      if(inputValue.length === 0 || inputValue === ' ') alert('할 일을 입력해주세요.')
      else this.$emit('addTodoItem',inputValue)
      this.clearForm();
    },
    clearForm(){
      this.todoInput = '';
    }
  }
}
</script>

<style scoped lang="scss">
form{
  position: fixed;
  left:0;
  bottom: 0;
  height: 50px;
  width: 100%;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
  background: #fff;
  .inner{
    display: flex;
    align-items: center;
    height: 100%;
    input{
      outline: none;
      line-height: 40px;
      border:none;
      box-shadow: 1px 1px 3px rgba(0,0,0,0.5);
      &:first-child{
        flex-grow: 1;
        padding: 0 20px;
        border-radius: 10px 0 0 10px;
      }
      &:last-child{
        padding: 0 20px;
        border-radius: 0 10px 10px 0;
      }
    }
  }
}
</style>