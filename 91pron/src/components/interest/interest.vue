<template>
  <transition name="slide">
    <div class="interest">
      <v-nav :backIcon="backIcon"></v-nav>
      <div class="interest-wrapper">
        <div class="interest-box">
          <h2 class="interest-title">挑选一些你最关注的</h2>
          <p class="title">我们将努力推荐你关注的内容</p>
          <div class="interest-checkbox">
            <div class="xy-checkbox-wrapper" v-for="(item, index) in checkedBox" @click="selectBox(item)">
              <label class="xy-checkbox-title">
                <div class="xy-checkbox">
                  <input type="checkbox" class="xy-checkbox-input" :checked="item.selected">
                  <span class="xy-checkbox-label">{{item.tag_name}}</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="btn">
        <button ref="btnItem" @click="toggleDisabled" class="btn-item" :class="{'is-disabled' : isDisabled}">保存</button>
      </div>
    </div>
  </transition>
</template>

<script>
import vNav from 'base/nav/nav'
import {ERR_OK} from 'api/config.js'

export default {
  data () {
    return {
      backIcon: true,
      checkedBox: [],
      checkedLength: 0
    }
  },
  created() {
    this._getTags()
  },
  methods: {
    _getTags() {
      this.$https.get('http://api.xueweijun.com/v1/news/tags', {
        params: {
          token:'503a60140bb111e8b64800163e06132a'
        }
      })
      .then((response) => {
        if (response.data.code === ERR_OK) {
          this.checkedBox = response.data.data

          for (let i in response.data.data) {
            if (response.data.data[i].selected) {
              this.checkedLength += 1
            }
          }

          this.checkedLength > 0 ? this.$refs.btnItem.removeAttribute('disabled') : this.$refs.btnItem.setAttribute('disabled', 'disabled')
        }

      })
      .catch((error) => {
        console.log(error)
      })
    },
    selectBox(item) {
      item.selected ? this.checkedLength -= 1 : this.checkedLength += 1
      item.selected = !item.selected

      this.checkedLength > 0 ? this.$refs.btnItem.removeAttribute('disabled') : this.$refs.btnItem.setAttribute('disabled', 'disabled')
    },
    toggleDisabled() {
      console.log("toggleDisabled")
    }
  },
  computed: {
    isDisabled() {
      return this.checkedLength > 0 ? false : true
    }
  },
  components: {
    vNav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.interest
  position: fixed
  top: 1.12rem
  left 0
  z-index: 9999
  width: 100%
  height: 100%
  background: #fff
  .interest-box
    -webkit-overflow-scrolling: touch
    padding-bottom: 1.5rem
    .interest-checkbox
      padding: 0 .2rem
      .xy-checkbox-wrapper
        float: left
        width: 31%
        text-align: center
        height: 1.0667rem
        font-size: .3733rem
        border-radius: .5333rem
        margin-bottom: .4rem
        margin-right: 3%
        &:nth-child(3n)
          margin-right: 0
        .xy-checkbox
          padding: 0 .2rem
          .xy-checkbox-input
            display: none
            &:checked+.xy-checkbox-label
              color: #22bc99
              border-color: #22bc99
          .xy-checkbox-label
            color: #181818
            border-radius: .5333rem
            display: block
            padding: 0
            height: 1.0667rem
            line-height: 1.0667rem
            box-sizing: border-box
            border: 1px solid #ddd
    .interest-title
      padding-top: .5rem
      font-size: .4533rem
      text-align: center
    .title
      font-size: .32rem
      text-align: center
      padding: .5rem 0
      color: #999
  .btn
    .btn-item
      appearance: none
      border: 0
      box-sizing: border-box
      color: inherit
      display: block
      font-size: .48rem
      height: 1.0933rem
      outline: 0
      overflow: hidden
      position: relative
      text-align: center
      width: 100%
      color: #fff
      background: #22bc99
      &.is-disabled
        background: #fff
        color: #22bc99
        border: 1px solid #22bc99
.slide-enter-active, .slide-leave-active
  transition: all 0.3s

.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
