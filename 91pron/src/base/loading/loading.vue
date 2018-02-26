<template>
  <div class="loading">
    <img width="30" height="30" src="/static/image/loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在加载...'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

.loading
  width: 100px
  position: fixed
  top: 40%
  left 50%
  text-align: center
  margin-left: -60px
  padding: 10px
  // background: rgba(0, 0, 0, 0.5)
  .desc
    line-height: 30px
    font-size: $font-size-16
    color: $color-text
</style>
