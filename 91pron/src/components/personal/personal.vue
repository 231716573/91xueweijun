<template>
  <div class="personal">
    <div class="avatar">
      <div v-if="!loginType" class="login-no">
        <p>Hi~等你好久了</p>
        <div class="button">
          <a href="javascript: void(0)" @click="showLogin()">登录</a>
          <a href="javascript: void(0)">注册</a>
        </div>
      </div>
      <div v-else class="login-in">
        <div class="circle1">
          <div class="circle2">
            <div class="avatar-dd" :style='{backgroundImage: avatarDd }'></div>
          </div>
        </div>
        <p class="nick-name">{{user.list[0].children_name}}</p>
      </div>
    </div>
    <div class="box-list">
      <router-link :to="item.component" v-for="(item, index) in list" :key="index" class="link-item">
        <img :src="item.picUrl">
        <p class="title">{{item.title}}</p>
        <i class="icon"></i>
      </router-link>
    </div>
    <login ref="login" @login-in="loginIn"></login>
    <router-view :user="username"></router-view>
  </div>
</template>

<script>
import Login from 'components/login/login'
import axios from 'axios'
import {ERR_OK} from 'api/config.js'
import {mapMutations, mapGetters} from 'vuex'

export default {
  data () {
    return {
      username: {},
      loginType: false,
      list: [
        {
          id: 0,
          picUrl: '/static/image/icon_information@2x.png',
          title: '我的信息',
          component: '/personal/myMessage'
        },
        {
          id: 0,
          picUrl: '/static/image/icon_collect@2x.png',
          title: '我的收藏',
          component: '/personal/myFavorite'
        },
        {
          id: 0,
          picUrl: '/static/image/icon_comment@2x.png',
          title: '我的评论',
          component: '/personal/myComment'
        },
        {
          id: 0,
          picUrl: '/static/image/icon_feedback@2x.png',
          title: '我的反馈',
          component: '/personal/myFeedback'
        },
        {
          id: 0,
          picUrl: '/static/image/icon_service@2x.png',
          title: '我的服务',
          component: '/personal/myServer'
        },
        {
          id: 0,
          picUrl: '/static/image/icon_setup@2x.png',
          title: '设置',
          component: '/personal/mySetting'
        }
      ]
    }
  },
  created() {
    this.loginIn()
  },
  methods: {
    showLogin() {
      this.$refs.login.show()
    },
    loginIn(newToken) {
      console.log(newToken)
      axios.get('http://api.xueweijun.com/v1/getchildren', {
        params: {
          token: '503a60140bb111e8b64800163e06132a'
        }
      })
      .then((response) => {
        // console.log(response.data)
        if (response.data.code === ERR_OK) {
          this.loginType = true
          this.setUser(response.data.data)
          this.username = response.data.data
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
    ...mapMutations({
      setUser: 'SET_USER'
    })
  },
  computed: {
    avatarDd() {
      var avatar = ''
      if (this.user.headimgurl == "") {
        avatar = 'url("/static/image/avatar_default.png")'
      } else {
        avatar = 'url("'+this.user.headimgurl+'")'
      }
      return avatar
    },
    ...mapGetters([
      'user',
      'newToken'
    ])
  },
  components: {
    Login
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.personal
  .avatar
    width: 100%
    height: 6rem
    background: url("bg_mine@2x.png") no-repeat
    background-size: cover
    .login-in
      position: absolute
      left: 50%
      top: .7rem
      width: 100%
      transform: translate(-50%)
      .nick-name
        text-align: center
        padding-top: .2rem
        color: #fff
        font-size: .4533rem
      .circle1
        width: 2.56rem
        height: 2.56rem
        background: rgba(14,140,107,.15)
        border-radius: 100%
        margin: 0 auto
        position: relative
        .circle2
          border-radius: 100%
          position: absolute
          left: 50%
          top: 50%
          transform: translate(-50%,-50%)
          .avatar-dd
            width: 2rem
            height: 2rem
            overflow: hidden
            background-color: #fff
            background-repeat: no-repeat
            background-size: cover
            border-radius: 100%
            position: absolute
            left: 50%
            top: 50%
            transform: translate(-50%,-50%)
    .login-no
      padding-top: 1.7067rem
      text-align: center
      font-size: .4rem
      color: #fff
      .button
        margin-top: .9rem
        a
          font-size: .4rem
          background: hsla(0,0%,100%,.35)
          display: inline-block
          color: #fff
          padding: .2rem .8rem
          border-radius: .16rem
          &:last-child
            margin-left: .72rem
  .box-list
    padding-bottom: 1.3867rem
    .link-item
      display: block
      width: 100%
      height: 1.28rem
      position: relative
      font-size: 0
      line-height: 1.28rem
      border-bottom: 1px solid #eee
      i
        display: inline-block
        position: absolute
        right: 20px
        top: 50%
        margin-top: -9px
        width: 10px
        height: 19px
        background: url('down-icon.png') no-repeat
        background-size: cover
      img
        display: inline-block
        margin: 0 10px 0 20px
        width: .5867rem
        vertical-align: middle
      .title
        display: inline-block
        color: #585858
        font-size: .4rem
        vertical-align: middle
</style>
