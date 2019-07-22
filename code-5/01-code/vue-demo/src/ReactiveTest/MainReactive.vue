<template>
  <div>
    <button @click="changeName1">改变值</button>
    <p>name1属性的值:================{{name1}}</p>

    <button @click="changeName2">改变name2值</button>
    <p>name2属性的值:======={{name2}}</p>
    <button @click="changeName3">改变name3的值</button>
    <p>color属性的值:======={{car.color}}</p>
  </div>
</template>
<script>
/**
 * 1.data中return中的数据是响应式的---实现了代理,才有的响应式
 * 2.如果修改data中数据的时候,也会把name2的属性值修改,是因为修改name导致的重新渲染了
 * 3.car.color,不会因为name改变才修改,本身就是响应式的,所以可以改变
 * 只有一次渲染(name,color 是一起渲染的)
 * 4. 必须是data中响应式的对象添加属性,才有效果
 */
import Vue from "vue";
export default {
  data() {
    this.name2 = "佐助";
    return {
      name1: "自来也",
      car:{
        name3:'保时捷'
      }
    };
  },
  methods: {
    changeName1() {
      this.name1 = "大蛇丸"; // 响应式的
      //this.name2='佩奇'
    },
    changeName2() {
      //this.name2 = "佩奇";
    },
    changeName3() {
      //this.car.name3='宝马'
      //this.car.color="red"
      Vue.set(this.car,'color','red')
    }
  }
};
</script>
<style scoped>
</style>