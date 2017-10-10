<template>
    <div class="loading">
        <img src="../common/image/loading.gif">
    </div>
</template>

<script>
    export default{

    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus" coped>
  @import "~common/stylus/variable"

  .loading
    width: 100%
    text-align: center
    img
      width:30px
      height:30px
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
</style>
