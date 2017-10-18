<template>
  <transition name="fade">
    <music-list :singer="singerInfor" :title="title" :bg-img="bgImg"></music-list>
  </transition>
</template>

<script>
  import musicList from 'base/music-list'
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {createSinger} from 'common/js/song'

  export default {
    components:{
      musicList
    },
    computed:{
      title(){
        return this.singer.name
      },
      bgImg(){
        return this.singer.url
      },
      ...mapGetters([
        'singer'
      ])
    },
    created(){
      this._singerId(this.singer.id)
    },
    methods:{
      _singerId(id){
        if(!this.singer.id){
          this.$router.push({path:'/singer'})
          return
        }

        getSingerDetail(id).then((res) =>{
          if(res.code === 0){
             let arr = res.data.list
             this._normalSinger(arr)
          }
        })
      },
      //初始化歌手信息类
      _normalSinger(arr){
        let ret = []
        arr.forEach((res) =>{
          ret.push(createSinger(res.musicData))
        })
        this.singerInfor = ret
        // console.log(this.singerInfor)
      }
    },
    data(){
      return {
        singerInfor:[]
      }
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
