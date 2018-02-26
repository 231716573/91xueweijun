<template>
  <div class="setting">
    <v-nav :backIcon="backIcon"></v-nav>
    <div class="setting-wrapper">
      <a href="javascript:void(0)" class="xy-cell" @click="goInterest()">
        <div class="xy-cell-wrapper">
          <div class="xy-cell-title">
            <span class="xy-cell-text">偏好设置</span>
          </div>
        </div>
        <i class="xy-cell-arrow-right">></i>
      </a>
      <a href="javascript:void(0)" class="xy-cell" @click="goGuide()">
        <div class="xy-cell-wrapper">
          <div class="xy-cell-title">
            <span class="xy-cell-text">服务协议</span>
          </div>
        </div>
        <i class="xy-cell-arrow-right">></i>
      </a>
    </div>
    <div class="me-login-out">
      <a href="javascript:void(0)" @click="loginOut">退出登录</a>
    </div>
    <confirm ref="confirm" text="确定退出？" cancelBtnText="取消" confirmBtnText="确定"></confirm>
  </div>
</template>

<script>
import vNav from 'base/nav/nav'
import Confirm from 'base/confirm/confirm'

export default {
  data () {
    return {
      backIcon: true
    }
  },
  methods: {
    loginOut() {
      this.$refs.confirm.show()
    },
    goGuide() {
      this.$router.push({
        path: '/guide'
      })
    },
    goInterest() {
      this.$router.push({
        path: '/guide/interest'
      })
    }
  },
  components: {
    vNav, Confirm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.hr-line
  background: #f1f1f1
  height: .1333rem
.setting
  position: fixed
  top: 1.12rem
  left 0
  z-index: 9999
  width: 100%
  height: 100%
  background: #f0eff5
  .me-login-out
    margin-top: .4rem
    height: 1.28rem
    line-height: 1.28rem
    background: #fff
    text-align: center
    font-size: .3733rem
    a
      display: block
      color: #f85f48
  .xy-cell
    background-color: #fff
    box-sizing: border-box
    color: inherit
    min-height: 1.28rem
    display: block
    overflow: hidden
    position: relative
    text-decoration: none
    font-size: .4rem
    .xy-cell-arrow-right
      position: absolute
      top: .48rem
      right: .2rem
      font-size: .4267rem
      color: #a3a3a3
    .xy-cell-wrapper
      position: relative;
      line-height: 1;
      background-size: 120% 1px;
      background-repeat: no-repeat;
      background-position: 0 0;
      background-origin: content-box;
      align-items: center;
      box-sizing: border-box;
      display: flex;
      min-height: inherit;
      &:after
        content: " "
        display: block
        width: 100%
        position: absolute
        left: 0
        bottom: 0
        border-bottom: 1px solid #ccc
        transform-origin: 0 0
        transform: scaleY(.5)
      .xy-cell-title
        flex: 1
        color: #565656
        .xy-cell-text
          padding-left: .37rem
          vertical-align: middle
</style>
