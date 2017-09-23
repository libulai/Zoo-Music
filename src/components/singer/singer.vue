<template>
  <div class="singer">
  
  </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import singer from 'common/js/singer'

const hotName = '热门'
const hotLen = 10

 export default ({
   data(){
     return {
       singers:[]
     }
   },
   created(){
    this._getSingerList()
   },
   methods:{
    _getSingerList(){
      getSingerList().then((res) =>{
        if (res.code === 0) {
            this.singers = res.data.list
            console.log(this._normalizeSinger(res.data.list))
          }
      })
    },
    _normalizeSinger(list){
        let map = {
          hot:{
            title:hotName,
            items:[]
          }
        }

        list.forEach((data,index) =>{
          //插入热门数据
          if(index < hotLen){
            map.hot.items.push(new singer(data.Fsinger_mid,data.Fsinger_name))
          }
          
          //插入所有歌手数据
          const key = data.Findex
          if(!map[key]){
            map[key] = {
              title:key,
              items:[]
            }
          }
          map[key].items.push(new singer(data.Fsinger_mid,data.Fsinger_name))
        })

        //歌手数据排序 (a-z)
        let hot = []
        let all = []
        hot = map.hot
        for(var i in map){
          if(map[i].title !== '热门' && map[i].title !== '9'){
            all.push(map[i])
          }
        }
        
        

    }
   }
 })
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
