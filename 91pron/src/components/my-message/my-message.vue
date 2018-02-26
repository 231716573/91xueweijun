<template>
  <div class="message">
    <v-nav :backIcon="backIcon"></v-nav>
    <div class="message-view">
      <div class="info-title">我们将为您和孩子提供更针对的内容</div>
      <div class="message-contain">
        <div class="xy-cell-wrapper">
          <div class="xy-cell-title">
            <span>孩子名字</span>
          </div>
          <div class="xy-cell-value">{{this.user.list[0].children_name}}</div>
        </div>
        <div class="xy-cell-wrapper">
          <div class="xy-cell-title">
            <span>所在地</span>
          </div>
          <div class="xy-cell-value">{{this.user.list[0].area}}</div>
        </div>
        <div class="xy-cell-wrapper">
          <div class="xy-cell-title">
            <span>孩子学段</span>
          </div>
          <div class="xy-cell-value">{{xueduan}}</div>
        </div>
        <div class="xy-cell-wrapper">
          <div class="xy-cell-title">
            <span>孩子学校</span>
          </div>
          <div class="xy-cell-value">{{this.user.list[0].school_name}}</div>
        </div>
      </div>
      <div class="info-progress">
        <div class="progress-bar">
          <div class="progress-label">
            <div class="progress-label-box" :style='{left: leftPercent}'>
              <span>已完成 {{this.user.list[0].orderby}}/4</span>
            </div>
          </div>
          <div class="progress-box">
            <div class="progress-bg" :style='{width: progressBg}'></div>
          </div>
        </div>
      </div>
      <div class="info-title">完善您孩子的资料，我们将为您提供更贴心的内容和服务</div>
    </div>
  </div>
</template>

<script>
import vNav from 'base/nav/nav'

export default {
  props: {
    user: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      userName: '',
      backIcon: true
    }
  },
  created(){
    // console.log(this.user)
    if (!this.user) {
      this.$router.push('/personal')
      return
    }
  },
  components: {
    vNav
  },
  computed: {
    progressBg() {
      let percent = (this.user.list[0].orderby / 4) * 100 + '%'
      return percent
    },
    leftPercent() {
      let percent = this.user.list[0].orderby * 18 + '%'
      return percent
    },
    xueduan() {
      if (this.user.list[0].xd == 1) {
        return '小学一年级'
      } else if (this.user.list[0].xd == 2) {
        return '小学二年级'
      } else if (this.user.list[0].xd == 3) {
        return '小学三年级'
      } else if (this.user.list[0].xd == 4) {
        return '小学四年级'
      } else if (this.user.list[0].xd == 5) {
        return '小学五年级'
      } else if (this.user.list[0].xd == 6) {
        return '小学六年级'
      } else if (this.user.list[0].xd == 7) {
        return '中学初一'
      } else if (this.user.list[0].xd == 8) {
        return '中学初二'
      } else if (this.user.list[0].xd == 9) {
        return '中学初三'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.message
  position: fixed
  top: 0
  left 0
  z-index: 9999
  width: 100%
  height: 100%
  background: #fff
  .message-view
    margin-top: 1.12rem
    .info-title
      font-size: .32rem
      color: #a3a3a3
      text-align: center
      padding: .5334rem 0
      position: relative
    .message-contain
      background-color: #fff
      box-sizing: border-box
      color: inherit
      min-height: 1.28rem
      display: block
      overflow: hidden
      position: relative
      text-decoration: none
      font-size: .4rem
      .xy-cell-wrapper
        position: relative
        line-height: 1
        background-size: 120% 1px
        background-repeat: no-repeat
        background-position: 0 0
        background-origin: content-box
        -webkit-box-align: center
        -ms-flex-align: center
        -webkit-align-items: center
        align-items: center
        box-sizing: border-box
        display: flex
        min-height: inherit
        border-bottom: 1px solid #ddd
        .xy-cell-title
          flex: 1
          color: #565656
          span
            padding-left: .37rem
            vertical-align: middle
        .xy-cell-value
          margin-right: .7rem
          color: #888
    .info-progress
      position: relative
      .progress-bar
        width: 86%
        margin: 30px auto 0
        .progress-box
          position: relative
          background: #fff
          height: .15rem
          border-radius: 2px
          border: 1px solid #eee
          margin-bottom: .3rem
          .progress-bg
            position: absolute
            left: 0
            top: 0
            width: 0
            height: .15rem
            background: #22bc99
        .progress-label
          width: 100%
          height: .9rem
          .progress-label-box
            position: absolute
            font-size: .3733rem
            background: #22bc99
            color: #fff
            padding: .13rem .2rem
            border-radius: 3px
            top: -.16rem
            &:before
              position: absolute
              border-left: 9px solid transparent
              border-right: 9px solid transparent
              border-top: 9px solid #22bc99
              content: " "
              display: block
              width: 0
              height: 0
              bottom: -8px
              left: 50%
              margin-left: -.2667rem


</style>
