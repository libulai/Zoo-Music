<template>
  <div class="song-list">
    <ul>
      <li class="item" v-for="(item,index) in singer">
        <div class="rank" >
          <span></span>
        </div>
        <div class="content">
          <h2 class="name">{{item.name}}</h2>
          <p class="desc">{{desc(item)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        props:{
            singer:{
                type:Array,
                default:[]
            }
        },
        methods:{
            desc(item){
                return `${item.singer} - ${item.album}`
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
        //   &.icon0
        //     bg-image('first')
        //   &.icon1
        //     bg-image('second')
        //   &.icon2
        //     bg-image('third')
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
</style>