<template>
  <div>
    <p>{{name1}}</p>
    <p>{{name2}}</p>
    <p>{{length}}</p>
  </div>
</template>
<script>
import {mixin} from './mixin.js'
export default {
  mixins: [mixin],
  data () {
    return {
      name2:'纲手'
    }
  },
  computed: {
  }
 
}
</script>
<style scoped>
</style>