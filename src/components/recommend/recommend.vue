<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
        <slider>
          <div v-for="item in recommends">
            <a :href="item.linkUrl">
              <img class="needsclick" :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li class="item" v-for="item in dislist" @click="selectItem(item)">
            <div class="icon">
              <img width="60" height="60" :src="item.imgurl">
            </div>
            <div class="text">
              <h2 class="name" v-html='item.creator.name'></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {getRecommend,getDislist} from 'api/recommend'
  import slider from 'base/slider'

  export default {
    created() {
      this._getRecommend()
      this._getDislist()
    },
    data(){
      return {
        recommends :[],
        dislist :[]
      }
    },
    methods:{
      _getRecommend(){
        getRecommend().then((res) => {
          if(res.code === 0){
            this.recommends = res.data.slider
          }
        })
      },
      _getDislist(){
        getDislist().then((res) =>{
          if(res.code === 0){
            this.dislist = res.data.list
          }
        })
      },
      selectItem(item){

      }
    },
    components:{
      slider
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>