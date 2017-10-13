<template>
  <transition name="fade">
    <music-list></music-list>
  </transition>
</template>

<script>
  import musicList from 'base/music-list'

  export default {
    components:{
      musicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .fade-enter-active,.fade-leave-active{
    transition:all 0.3s
  }

  .fade-enter,.fade-leave-to{
    transform:translate3d(100%,0,0)
  }
</style>
