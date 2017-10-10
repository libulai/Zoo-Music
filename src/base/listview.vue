<template>
    <scroll class="listview" :data="data" ref="listview" :probeType="probeType" @scroll="scrollPos" :listenScroll="listenScroll"> 
        <ul>
            <li v-for="item in data" class="list-group" ref="group">
                <h2 class="list-group-title">{{item.title}}</h2>
                <ul>
                    <li v-for="group in item.items" class="list-group-item">
                        <img class="avatar" v-lazy="group.url" alt="">
                        <span class="name">{{group.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut">
            <ul>
                <li class="item" v-for="(item,index) in data" :data-index="index" 
                @touchstart="onShortcutTouchStart"
                @touchmove.stop.prevent="onShortcutTouchMove"
                :class="{'current':currentIndex === index}">
                {{item.title.substr(0,1)}}
                </li>
            </ul>
        </div>
    </scroll>
</template>

<script>
  import scroll from 'base/scroll'
  import loading from 'base/loading'
  import {getData} from 'common/js/dom'

  const TITLE_HEIGHT = 30
  const ANCHOR_HEIGHT = 18 

  export default {
    props:{
        data:{
            type:Array,
            default:[]
        }
    },
    created(){
        this.touch = {}
        this.probeType = 3
        this.listenScroll = true
        this.listHeight = []
    },
    components:{
        scroll,
        loading
    },
    methods:{
        //侧栏点击
        onShortcutTouchStart(el){
            let anchorIndex = getData(el.target,'index')
            let firstTouch = el.touches[0]
            this.touch.y1 = firstTouch.pageY
            this.touch.anchorIndex = anchorIndex
            this._toScroll(anchorIndex)
        },
        //侧栏拖动
        onShortcutTouchMove(el){
            let firstTouch = el.touches[0]
            this.touch.y2 = firstTouch.pageY
            let height = (this.touch.y2 - this.touch.y1)/ANCHOR_HEIGHT | 0
            let anchorIndex = parseInt(this.touch.anchorIndex) + height
            this._toScroll(anchorIndex)
        },
        scrollPos(pos){
            this.scrollY = pos.y
        },
        _toScroll(index){
            this.$refs.listview.scrollToElement(this.$refs.group[index],[])
        },
        _calculateHeight(){
            this.listHeight = []
            let list = this.$refs.group
            let height = 0
            this.listHeight.push(height)
            for(let i=0;i<list.length;i++){
                let listArea = list[i]
                height += listArea.clientHeight
                this.listHeight.push(height)
                // console.log(this.listHeight)
            }
        }
    },
    computed:{
    
    },
    data(){
        return{
            scrollY: -1,
            currentIndex: 0
        }
    },
    watch:{
        data() {
            setTimeout(() => {
                this._calculateHeight()
            }, 20)
        },
        scrollY(){
            // console.log(this.scrollY)
            let scrollY = -this.scrollY
            let listHeight = this.listHeight
            for(var i=0;i<listHeight.length;i++){
                if(scrollY<listHeight[i+1] && scrollY>listHeight[i]){
                    this.currentIndex = i
                }
            }
        }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
