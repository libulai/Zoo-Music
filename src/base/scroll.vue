<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
      props:{
        probeType: {
          type: Number,
          default: 1
        },
        click: {
          type: Boolean,
          default: true
        },
        listenScroll: {
          type: Boolean,
          default: false
        },
        data: {
          type: Array,
          default: null
        }
      },
      mounted(){
        // this.$nextTick(() => {
        //   this.initScroll()
        // })
        //方法等同
        setTimeout(() =>{
            this.initScroll()
        },20)
      },
      methods:{
          initScroll() {
            if(!this.$refs.wrapper) return
            this.scroll = new BScroll(this.$refs.wrapper,{
              probeType: this.probeType,
              click: this.click
            })
            
            if(this.listenScroll){
              let me = this
              this.scroll.on('scroll',(pos) =>{
                me.$emit('scroll',pos)
              })              
            }
          },
          refresh(){
            if(this.scroll) this.scroll.refresh()
          },
          scrollTo(){
            this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
          },
          scrollToElement(){
            this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
          },
          
      },
       watch: {
        data() {
          setTimeout(() => {
            this.refresh()
          },20)
        }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
