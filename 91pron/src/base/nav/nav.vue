<template>
  <div class="nav-wapper">
    <div class="nav-logo">
      <router-link to="/">
        <i class="logo"></i>
      </router-link>
      <div v-if="backIcon" href="javascript:void(0)" class="back-icon" @click="back">
        <i class="iconfont"><</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backIcon: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.nav-wapper
  position: fixed
  left: 0
  top: 0
  width: 100%
  z-index: 9999
  height: 1.12rem
  background: #22bc99
  .nav-logo
    background: #22bc99
    height: 1.12rem
    line-height: 1.12rem
    text-align: center
    color: #fff
    font-size: .48rem
    .back-icon
      position: absolute
      width: 1.12rem
      height: 1.12rem
      line-height: 1.12rem
      left: 0
      top: 0
      color: #fff
      .iconfont
        color: #fff
        font-size: .8rem
        vertical-align: top
    a
      display: block
      height: 1.12rem
      width: 2.4267rem
      margin: 0 auto
      .logo
        display: block
        height: 100%
        width: 100%
        background-image: url('/static/image/icon_logo@2x.png')
        background-position: 50%
        background-size: contain
        background-repeat: no-repeat
        margin: 0 auto
</style>
