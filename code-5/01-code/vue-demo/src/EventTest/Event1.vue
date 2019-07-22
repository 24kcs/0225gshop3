<template>
  <div>
    <h2>Event1</h2>
    <p>原生事件</p>
    <p>{{msg}}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg:'测试'
    }
  },
  mounted () {
    this.$bus.$on('eventName',(msg)=>{
      this.msg=msg
    })
  }
}
</script>
<style scoped>
div{
  width: 200px;
  height: 100px;
  border: 1px solid red;
}
</style>