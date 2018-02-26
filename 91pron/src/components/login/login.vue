<template>
  <transition>
    <div class="login" v-show="showFlag">
      <a href="javascript:;" class="close" @click="hide()"><i class="iconfont">x</i></a>
      <div class="login-header">
        <h3>{{title}}</h3>
      </div>
      <div class="register">
        <div class="login-container">
          <div class="register-input-item mt70">
            <div class="text-icon-box">
              <i class="xy-text-field-icon icon-phone"></i>
            </div>
            <div class="xy-text-field-content">
              <input type="tel" placeholder="请输入手机号码" maxlength="11" required="required" class="xy-text-field-input" ref="iconPhone">
              <a class="clear"></a>
            </div>
          </div>
          <div class="register-input-item mt25">
            <div class="text-icon-box">
              <i class="xy-text-field-icon icon-message"></i>
            </div>
            <div class="xy-text-field-content">
              <input type="tel" placeholder="请输入短信验证码" maxlength="11" required="required" class="xy-text-field-input" ref="iconCode">
              <a class="clear"></a>
            </div>
            <div class="xy-text-field-right">
              <div class="right-label">
                <a v-if="countDown" href="javascript:void(0)" @click="getCode">获取验证码</a>
                <div v-else>{{Countdown}} s</div>
              </div>
            </div>
          </div>
          <div class="register-tips">
            <span>未注册手机验证后自动登录</span>
          </div>
          <a @click="login" class="login-btn1">登录</a>
          <div class="login-desc">
            <a href="javascript:void(0)" class="left">随便看看</a>
            <a href="javascript:void(0)" class="right">账号密码登录</a>
          </div>
        </div>
      </div>
      <alert ref="alert" :text="alertText"></alert>
    </div>
  </transition>
</template>

<script>
import Alert from 'base/alert/alert'
import axios from 'axios'
import {ERR_OK} from 'api/config.js'
import {mapMutations} from 'vuex'

export default {
  props: {
    loginBool: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showFlag: false,
      title: '手机号码登录',
      alertText: '请输入正确手机号码',
      countDown: true,
      Countdown: 60,
      timer: null,
      loginType: 0
    }
  },
  methods: {
    show() {
      this.showFlag = true
    },
    hide() {
      this.showFlag = false
    },
    // 获取验证码
    getCode() {
      let iconPhone = this.$refs.iconPhone.value
      var myreg=/^[1][3,4,5,7,8][0-9]{9}$/

      // 手机正确
      if (myreg.test(iconPhone)) {

        axios.get('http://api.xueweijun.com/v1/getVerify', {
          params: {
            mobile: iconPhone,
            type: 2
          }
        })
        .then((response) => {
          // console.log(response)
          if (response.data.code === ERR_OK) {
            this.alertText = '验证码发送成功'

            this.countDown = false
            this.timer = setInterval(() => {
              if (this.Countdown >= 0) {
                this.Countdown --;
              } else {
                this.countDown = true
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
          } else if (response.data.code === 1023){
            this.alertText = response.data.msg
          }
          this.$refs.alert.show()
        })
        .catch((error) => {
          console.log(error)
        })
      // 手机不正确
      } else {
        this.alertText = '请输入正确手机号码'
        this.$refs.alert.show()
        return false
      }
    },
    login() {
      // 验证码登录
      if (this.loginType == 0) {
        let iconPhone = this.$refs.iconPhone.value
        let iconCode  = this.$refs.iconCode.value
        axios.get('http://api.xueweijun.com/v1/login', {
          params: {
            mobile: iconPhone,
            vcode: iconCode
          }
        })
        .then((response) => {
          if (response.data.code === ERR_OK) {
            var newToken = response.data.data.token
            this.setNewToken(newToken)
            
            this.alertText = '登录成功'
            this.$emit('login-in', newToken)
            setTimeout(() => {
              this.hide()
            }, 1500)

          } else {
            this.alertText = response.data.msg
            this.$refs.alert.show()
          }
        })
        .catch((error) => {
          console.log(error)
        })
      // 账号密码登录
      } else if (this.loginType == 1) {

      }
    },
    ...mapMutations({
      setNewToken: "SET_NEWTOKEN"
    })
  },
  components: {
    Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.mt70
  margin-top: 1.8667rem
.mt25
  margin-top: .6667rem
.login
  position: fixed
  left: 0
  top: 0
  width: 100%
  height: 100%
  background: #fff
  z-index: 9999
  transition: all .3s ease
  overflow: hidden
  .close
    position: absolute
    right: .4rem
    top: .3rem
    color: #fff
    padding: 6px
    i
      font-size: .5333rem
  .login-header
    height: 1.4667rem
    background: #22bc99
    line-height: 1.4667rem
    font-size: .48rem
    color: #fff
    text-align: center
    border-top-left-radius: 10px
    border-top-right-radius: 10px
  .register
    padding: 0 1rem 1.4rem
    .login-desc
      margin-top: .34rem
      text-align: center
      font-size: 0
      padding: 0 .2rem
      a
        font-size: .32rem
        color: #a5e5d7
        &.left
          float: left
        &.right
          float: right
    .login-btn1
      font-size: .48rem
      display: block
      background: #22bc99
      border-radius: .2rem
      height: 1.28rem
      line-height: 1.28rem
      text-align: center
      color: #fff
    .register-tips
      text-align: center
      font-size: .32rem
      color: #a3a3a3
      height: 1.0667rem
      line-height: 1.0667rem
    .register-input-item
      font-size: .4rem
      height: 1.28rem
      line-height: 1.28rem
      display: flex
      position: relative
      border: 1px solid #d1d1d1
      border-radius: .2rem
      color: #a3a3a3
      box-sizing: border-box
      .xy-text-field-right
        height: 100%
        .right-label
          display: block
          color: #63d4c3
          margin-right: .2rem
          a
            color: #f4a660
      .xy-text-field-content
        flex: 1
        height: 100%
        padding-left: .2rem
        position: relative
        .xy-text-field-input
          appearance: none
          outline: none
          border: none
          background: none
          border-radius: 0
          box-shadow: none
          display: block
          padding: 0
          margin: 0
          width: 100%
          height: 100%
          font-size: inherit
          font-variant: inherit
          font-weight: inherit
          font-stretch: inherit
          font-family: inherit
          font-style: inherit
          color: #333
          position: relative
      .text-icon-box
        margin-left: .3rem
        .xy-text-field-icon
          display: inline-block
          width: .64rem
          height: .64rem
          background-size: cover
          background-repeat: no-repeat
          vertical-align: middle
          &.icon-phone
            background-image: url('tab_number@2x.png')
          &.icon-message
            background-image: url('tab_testing@2x.png')

</style>
