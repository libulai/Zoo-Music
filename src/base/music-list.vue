<template>
    <div class="music-list">
      <div class="back">
        <i class="icon-back" @click="back"></i>
      </div>
      <h1 class="title" v-html="title"></h1>
      <div class="bg-image" ref="bgImage" :style="bg">
        <div class="play-wrapper">
          <div ref="playBtn" class="play">
            <i class="icon-play"></i>
            <span class="text">随机播放全部</span>
          </div>
        </div>
          <div class="filter" ref="filter"></div>
        </div>
        <div class="bg-layer" ref="layer"></div>
        <scroll :data="singer" :probeType="probeType" :listenScroll="listenScroll" @scroll="scroll" ref="list" class="list">
          <div class="song-list-wrapper">
            <song-list :singer="singer"></song-list>
          </div>
          <div v-show="!singer.length" class="loading-container">
            <loading></loading>
          </div>
        </scroll>
    </div>
</template>

<script>
    import Scroll from 'base/scroll'
    import SongList from 'base/song-list'
    import Loading from 'base/loading'
    import {prefixStyle} from 'common/js/dom'

    const reHeight = 40
    const transform = prefixStyle('transform')

    export default {
      props:{
        singer:{
          type:Array,
          default:[]
        },
        title:{
          type:String,
          default:''
        },
        bgImg:{
          type:String,
          default:''
        }
      },
      components:{
          Scroll,
          SongList,
          Loading
      },
      data(){
        return {
          scrollY:0
        }
      },
      mounted(){
        //scroll 初始化高度
        this.bgH = this.$refs.bgImage.clientHeight - reHeight
        this.$refs.list.$el.style.top = this.$refs.bgImage.clientHeight + 'px'
      },
      created(){
        this.probeType = 3
        this.listenScroll = true
      },
      computed:{
        bg(){
          return `background-image:url(${this.bgImg})`
        }
      },
      watch:{
        //滑动效果
        scrollY(newY){
          let translateY = Math.max(-this.bgH,newY)  //取最大的值
          this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
          console.log(transform)
          //滚动到顶部
          if(translateY == -this.bgH){
            this.$refs.bgImage.style.zIndex = 1
            this.$refs.bgImage.style.paddingTop = `10%`
            this.$refs.playBtn.style.display = 'none'
          }else{
            this.$refs.bgImage.style.zIndex = 0
            this.$refs.bgImage.style.paddingTop = `70%`
            this.$refs.playBtn.style.display = 'block'
          }

          //往下拉图片放大效果
          let initScale = 1
          let preScale = initScale + Math.abs(newY/this.bgH)
        
          if(newY > 0){
            this.$refs.bgImage.style[transform] = `scale(${preScale})`
            this.$refs.bgImage.style.zIndex = `20`
          }else{
            this.$refs.bgImage.style[transform] = `scale(${initScale})`
          }
        }
      },
      methods:{
        back(){
          this.$router.back(-1)
        },
        scroll(data){
          this.scrollY = data.y
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>