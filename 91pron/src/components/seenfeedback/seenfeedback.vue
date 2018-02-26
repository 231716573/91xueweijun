<template>
  <div class="seenfeedback">
    <v-nav :backIcon="backIcon"></v-nav>
    <div class="feedback-wrapper">
      <div class="feedback-radio" ref="feedbackRadio">
        <div class="feedback-radio-btn" v-for="(item, index) in tags">
          <label for="" class="feedback-radio-label">
            <span class="xy-radio" @click="clickRadio($event)">
              <input type="radio" name="tag" class="xy-radio-input"
                     :value="item.tag_id"
                     :checked="item.tag_id == 1">
              <span class="xy-radio-label">{{item.tag_name}}</span>
            </span>
          </label>
        </div>
      </div>
      <div class="feedback-ask-container">
        <div class="ask-textarea-box">
          <textarea placeholder="请输入你的描述(选填)" class="ask-textarea" ref="askTextarea"></textarea>
        </div>
        <div class="upload-box">
          <a href="javascript: void(0)" class="upload-label">
            <img src="/static/image/icon_jia@2x.png" class="box">可存一张图
          </a>
        </div>
        <a href="javascript: void(0)" class="submit-btn" @click="submitBtn">提交</a>
      </div>
    </div>
    <alert ref="alert" :text="alertText"></alert>
  </div>
</template>

<script>
import vNav from 'base/nav/nav'
import axios from 'axios'
import {ERR_OK} from 'api/config.js'
import Alert from 'base/alert/alert'

export default {
  data () {
    return {
      backIcon: true,
      tags: [],
      alertText: '',
      radioValue: 1,
      textarea: ''
    }
  },
  created() {
    this._getTags()
  },
  methods: {
    submitBtn() {
      if (this.$refs.askTextarea.value == "") {
        this.alertText = '请描述内容'
        this.$refs.alert.show()
        return
      } else {
        this.textarea = this.$refs.askTextarea.value
        let feedbackRadio = this.$refs.feedbackRadio.getElementsByTagName('input')
        for (let i in feedbackRadio) {
          if (feedbackRadio[i].checked) {
            this.radioValue = feedbackRadio[i].value
          }
        }
        console.log(`${this.textarea}，${this.radioValue}`)
        axios.post('http://api.xueweijun.com/v1/act/feedback/add_feedback', {
          tag_id: this.radioValue,
          content: this.textarea,
          token: '503a60140bb111e8b64800163e06132a'
        },{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then((response) => {
          if (response.data.code === ERR_OK) {
            this.$router.back()
          } else {
            this.alertText = response.data.msg
            this.$refs.alert.show()
            setTimeout(() => {
              this.$router.back()
            }, 2000)
          }
        })
        .catch((error) => {
          console.log(error)
        })
      }
    },
    clickRadio(event) {
      event.currentTarget.getElementsByTagName('input')[0].checked = 'checked'
    },
    _getTags() {
      axios.get('http://api.xueweijun.com/v1/act/feedback/tags', {
        params: {
          token: '503a60140bb111e8b64800163e06132a'
        }
      })
      .then((response) => {
        if (response.data.code === ERR_OK) {
          this.tags = response.data.data.list
        }
        // console.log(this.tags)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  components: {
    vNav, Alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.seenfeedback
  position: fixed
  top: 1.12rem
  left 0
  z-index: 9999
  width: 100%
  height: 100%
  background: #fff
  .feedback-wrapper
    margin-top: .4rem
    .feedback-ask-container
      padding: 0 .4rem
      .upload-box
        padding-top: .3rem
        .upload-label
          font-size: .3733rem
          color: #a3a3a3
          .box
            width: .64rem
            height: .64rem
            vertical-align: middle
            padding-right: .2rem
      .submit-btn
        margin-top: .2667rem
        height: 1.28rem
        line-height: 1.28rem
        background: #22bc99
        display: block
        width: 100%
        border-radius: .2133rem
        font-size: .48rem
        color: #fff
        text-align: center
      .ask-textarea-box
        margin-top: 0.5rem
        height: 4rem
        border: 1px solid #b2b2b2
        border-radius: .16rem
        padding: .2667rem
        .ask-textarea
          border: 0
          outline: 0
          resize: none
          color: #666
          font-size: .3733rem
          width: 100%
          height: 100%
          line-height: 1.6
          font-family: Microsoft YaHei
    .feedback-radio-btn
      display: inline-block
      .feedback-radio-label
        display: inline-block
        padding-left: .4rem
        font-size: 14px
        .xy-radio-label
          font-size: .32rem
          border: 1px solid #a3a3a3
          padding: .12rem .3rem
          border-radius: .1333rem
          color: #a3a3a3
        .xy-radio-input
          display: none
          &:checked+.xy-radio-label
            color: #22bc99
            border-color: #22bc99
</style>
