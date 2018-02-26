<template>
  <transition name="slide">
    <div class="school-wrapper" v-show="showIcon">
      <div class="school-content">
        <div class="nav-logo">
          {{schoolName}}
          <div href="javascript:void(0)" class="back-icon" @click="hide">
            <i class="iconfont"><</i>
          </div>
        </div>
      </div>
      <div class="school-contain" v-html="textComputed">
      </div>
    </div>
  </transition>
</template>

<script>
import vNav from 'base/nav/nav'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  props: {
    schoolName: {
      type: String,
      default: '学校简介'
    },
    text: {
      type: String,
      default: ''
    }
  },
  created() {
  },
  data () {
    return {
      backIcon: false,
      hideIcon: true,
      showIcon: false
    }
  },
  methods: {
    show() {
      this.showIcon = true
    },
    hide() {
      this.showIcon = false
    }

  },
  computed: {
    textComputed() {
      let arr = []
      let newText = this.text.split(/\s+/g)
      for (var i in newText) {
        if (newText[i] != "") {
          arr.push(`<p style="text-indent: 2em">${newText[i]}</p>`)
        }
      }
      // console.log(arr.join(''))
      return arr.join('')

    }
  },
  components: {
    vNav,
    swiper,
    swiperSlide
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)

.school-wrapper
  position: absolute
  top: 0
  left 0
  z-index: 9999
  width: 100%
  background: #fff
  .school-contain
    padding: .4rem
    font-size: .4rem
    color: #585858
    line-height: 1.6
  .nav-logo
    background: #22bc99
    height: 1.12rem
    line-height: 1.12rem
    text-align: center
    color: #fff
    font-size: .48rem
    position: relative
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
