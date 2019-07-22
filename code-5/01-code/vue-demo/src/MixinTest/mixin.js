export const mixin= {
  data () {
    return {
      name1:'天生就是一个武学奇才',
    }
  },
  computed: {
    length(){
      return this.name1.length
    }
  }
 
}