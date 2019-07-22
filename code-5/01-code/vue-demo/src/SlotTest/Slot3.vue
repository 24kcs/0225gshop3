<template>
  <div>
    <ul>
      <li v-for="(todo,index) in todos" :key="index">
        <slot :todo="todo">{{todo.title}}</slot>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      todos:[
        {title:'奔驰',isComplete:false},
        {title:'宝马',isComplete:true},
        {title:'奥迪',isComplete:false}
      ]
    }
  }
}
</script>
<style scoped>
</style>