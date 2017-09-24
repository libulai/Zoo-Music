<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
      props{

      },
      mounted(){
        setTimeout(() =>{
            this.initScroll()
        },20)
      },
      methods(){
          initScroll(){
            if(!this.$refs.wrapper) return
            this.scroll = new BScroll()
          }
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
