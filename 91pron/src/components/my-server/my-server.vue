<template>
  <div class="server">
    <v-nav :backIcon="backIcon"></v-nav>
    <div class="server-wrapper">
      <div class="services-left">
        <img src="/static/image/service_icon@2x.png">
      </div>
      <div class="services-right">
        <a href="javascript: void(0)" class="service-title" @click="goArticle()">2018深圳幼升小升学提醒服务</a>
        <p class="service-date">有效期至2018.07.31</p>
        <div class="service-btn">
          <a href="javascript: void(0)" class="active-btn" @click="goArticle()">服务内容详情</a>
        </div>
      </div>
    </div>
    <div class="hr-line"></div>
  </div>
</template>

<script>
import vNav from 'base/nav/nav'

export default {
  data () {
    return {
      backIcon: true
    }
  },
  methods: {
    goArticle() {
      this.$router.push({
        path: '/publicity/pay?type=me'
      })
    }
  },
  components: {
    vNav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.hr-line
  background: #f1f1f1
  height: .1333rem
.server
  position: fixed
  top: 1.12rem
  left 0
  z-index: 9999
  width: 100%
  height: 100%
  background: #fff
  .server-wrapper
    display: flex
    height: 3.4rem
    position: relative
    .services-right
      flex: 1
      .service-btn
        position: absolute
        right: .3467rem
        bottom: .3467rem
        .active-btn
          display: inline-block
          color: #fff
          font-size: .32rem
          background: #ffa65f
          padding: .15rem .25rem
          border-radius: 4px
          margin-left: .3rem
      .service-date
        font-size: .32rem
        color: #a5a5a5
        padding-top: .3rem
      .service-title
        font-size: .48rem
        padding-top: .6rem
        color: #585858
        font-weight: 700
        display: inline-block
    .services-left
      width: 1.92rem
      margin: .6rem .2rem 0
      img
        width: 100%
        display: block
</style>
