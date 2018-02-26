<template>
  <transition name="alert-fade">
    <div class="alert" v-show="showFlag">
      <div class="alert-wrapper">
        <div class="alert-content">
          <p class="text">{{text}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
      setTimeout(() => {
        this.showFlag = false
      }, 2000)
    },
    hide() {
      this.showFlag = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

.alert
  position: fixed
  left: 0
  right: 0
  top: 40%
  bottom: 0
  z-index: 998
  &.alert-fade-enter-active
    animation: confirm-fadein 0.3s
    .alert-content
      animation: confirm-zoom 0.3s
  .alert-wrapper
    position: absolute
    top: 0
    left: 50%
    transform: translate(-50%, -50%)
    z-index: 999
    .alert-content
      width: 270px
      border-radius: 13px
      background-color: $color-background-e
      .text
        padding: 19px 15px
        line-height: 22px
        text-align: center
        font-size: $font-size-16
        color: #fff
  @keyframes alert-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes alert-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
