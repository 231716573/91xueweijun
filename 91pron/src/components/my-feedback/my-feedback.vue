<template>
  <div class="feedback">
    <v-nav :backIcon="backIcon"></v-nav>
    <div class="feedback-wrapper">
      <div v-if="data.length == 0" class="feedback-no">
        <p>"如果您在使用“91教育”的过程中发现有任何问题的地方，如“闪退、页面显示不完整、链接出错、图片不显示" 等问题</p>
        <p>欢迎您点击下面的“我要反馈”提交问题</p>
        <p>也欢迎您给我们提交使用感受方面建议与反馈</p>
      </div>
      <div class="feedback-cell" v-for="(item, index) in data">
        <div class="feedback-cell-box">
          <h3 class="title">{{item.content}}</h3>
          <p class="status" :class="statusClass(item.status)">处理中</p>
        </div>
        <div class="hr-line"></div>
      </div>
    </div>
    <div class="feedback-btn" @click='feedbackBtn'>
      <span>我要反馈</span>
    </div>
  </div>
</template>

<script>
import vNav from 'base/nav/nav'
import {ERR_OK} from 'api/config.js'

export default {
  data () {
    return {
      backIcon: true,
      data: [],
      page: 1
    }
  },
  created() {
    this._getFeedback()
  },
  methods: {
    feedbackBtn() {
      this.$router.push({
        path: '/personal/myFeedback/seenfeedback'
      })
    },
    _getFeedback() {
      this.$http.get('http://api.xueweijun.com/v1/act/feedback/my_feedback', {
        params: {
          page: this.page,
          token: '503a60140bb111e8b64800163e06132a'
        }
      })
      .then((response) => {
        if (response.data.code === ERR_OK) {
          this.data = response.data.data.list
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
    statusClass(status) {
      if (status == 0) {
        return 'icon0'
      } else if (status == 1) {
        return 'icon1'
      } else if (status == 2) {
        return 'icon2'
      } else if (status == 3) {
        return 'icon3'
      }
    }
  },
  computed: {

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
.feedback
  position: fixed
  top: 1.12rem
  left 0
  z-index: 9999
  width: 100%
  height: 100%
  background: #fff
  .feedback-cell
    .feedback-cell-box
      height: 1.2267rem
      font-size: .3733rem
      line-height: 1.2267rem
      padding-left: .5333rem
      position: relative
      color: #191919
      .status
        font-size: .3467rem
        height: .5rem
        line-height: .5rem
        padding: 0 .2rem
        color: #fff
        position: absolute
        right: .4rem
        top: .36rem
        &.icon0
          background: #ffa65c
        &.icon1
          background: #54d87d
        &.icon2
          background: #3da5f7
        &.icon3
          background: #819285
      .title
        width: 80%
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
  .feedback-no
    padding: 1.5rem .5333rem .8rem
    line-height: 1.6
    p
      padding-top: .4rem
      font-size: .4rem
      color: #a3a3a3
.feedback-btn
  position: fixed
  left: 0
  bottom: 0
  background: #22bc99
  height: 1.2rem
  width: 100%
  span
    width: 100%
    display: block
    text-align: center
    font-size: .48rem
    line-height: 1.2rem
    color: #fff
</style>
