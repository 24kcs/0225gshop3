<template>
  <div>
    <!-- <input type="text" v-model="msg">
    <p>{{msg}}</p>

    <input type="text" :value="msg" @input="msg=$event.target.value" />
    <p>{{msg}}</p>-->
    <!-- 
    <h2>组件上使用v-model</h2>
    <Model2 v-model="msg2"></Model2>
    <span>{{msg2}}</span>-->

    <!--在组件上自己实现v-model-->
    <Model3 :value="msg3" @input="msg3=$event" />
    <p>{{msg3}}</p>


    <!-- <input type="text" v-model="msg">
    <p>{{msg}}</p>
    <hr>
    <Model1></Model1>
   <hr>
   <Model2 v-model="msg2"></Model2>
    <span>{{msg2}}</span>
    <hr>
     <Model3 :value="msg3" @input="msg3=$event"></Model3>
    <span>{{msg3}}</span>-->
  </div>
</template>
<script>
/**
 * 自己实现双向数据绑定: <input :value="msg" @input="msg=$event.target.value">
 * $event代表分发事件的传递的数据
 *
 * 父级组件中,使用另一个子组件,在组件上使用v-model="msg2",并显示{{msg2}}
 * 在子级组件中,:value='value' @input="$emit('input',$event.target.value)" props:['value']
 *
 *
 */
import Model1 from "./Model1.vue";
import Model2 from "./Model2.vue";
import Model3 from "./Model3.vue";
export default {
  data() {
    return {
      msg: "jack",
      msg2: "tom",
      msg3: "lucy"
    };
  },
  components: {
    Model1,
    Model2,
    Model3
  }
};
</script>
<style scoped>
</style>