<template>
  <div>
    <!--插槽组件-->

    <!-- <Slot1>
      我来啦
      <a href="http://www.baidu.com">我是百度,红颜祸水</a>
    </Slot1>-->

    <hr />
    <!--插槽组件-->
      <!-- <Slot2>
       <p slot="bottom"><a href="http://www.baidu.com">百度2</a></p>
        <p>我是中间的标签啊,哈哈=====</p>
       
          <p slot="top"><a href="http://www.baidu.com">百度1</a></p>
      </Slot2> -->
    <!--插槽组件-->


  <Slot3>
    <template slot-scope="slotProps">
      <!--只在isComplete为true的的数据的后面有✔-->
      <p v-if="slotProps.todo.isComplete">{{slotProps.todo.title}}✔</p>
    </template>

     <template slot-scope="slotProps">
      <!--只在isComplete为true的的数据的后面有✔-->
      <p v-if="slotProps.todo.isComplete" style="color:green">{{slotProps.todo.title}}</p>
    </template>
  </Slot3>
















    <!-- <Slot3>
      <template slot-scope="slotProps">
        <p v-if="slotProps.todo.isComplete">{{slotProps.todo.title}}✔</p>
      </template>
    </Slot3>
    <hr />
    <Slot3>
      <template slot-scope="slotProps">
        <p v-if="slotProps.todo.isComplete" style="color:red">{{slotProps.todo.title}}</p>
      </template>
    </Slot3> -->
  </div>
</template>
<script>
/**
 * 1.使用普通插槽,没有名字的插槽,直接传值即可：父级组件向子级组件中传入数据
 * 2.具名插槽传值,只能使用名字,其他的内容是不会被传递的(标签名字,标签位置这些都没有关系,只要有slot="插槽名字"即可传值)
 * 3.作用域插槽,子组件向父级组件传递数据,父级组件根据数据渲染标签结构传递给子组件
 *
 */
// 引入Slot1组件---显示普通插槽传值方式
import Slot1 from "./Slot1.vue";
// 引入Slot2组件---显示具名插槽传值方式
import Slot2 from "./Slot2.vue";
// 作用域插槽
import Slot3 from "./Slot3.vue";
export default {
  
  components: {
    Slot1,
    Slot2,
    Slot3
  }
};
</script>
<style scoped>
</style>