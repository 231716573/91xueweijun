<template>
  <div class="comment">
    <v-nav :backIcon="backIcon"></v-nav>
    <div class="comment-wrapper">
      <div class="comment-item" v-for="(item, index) in data">
        <div class="comment-cell">
          <div class="avatar">
            <img v-lazy="avatarDd(item.headimgurl)" alt="">
            <span class="name">{{user.list[0].children_name}}</span>
            <span class="avatar-times">{{item.comment_date}}</span>
          </div>
          <div class="contain">
            <p class="content">{{item.comment}}</p>
            <div @click="goArticle(item.post_id)" class="comment-link">
              <div class="comment-link-img">
                <img v-lazy="item.thumb">
              </div>
              <div class="comment-link-title">
                <span>{{item.post_title}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="hr-line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {ERR_OK} from 'api/config.js'
import vNav from 'base/nav/nav'
import {mapMutations, mapGetters} from 'vuex'

export default {
  data () {
    return {
      backIcon: true,
      newToken1: '503a60140bb111e8b64800163e06132a',
      page: 1,
      page_size: 20,
      data: []
    }
  },
  created() {
    this._getComment()
  },
  methods: {
    goArticle(id) {
      console.log(id)
      this.setActicleId(id)

      this.$router.push({
        path: `/article/${id}`
      })
    },
    _getComment() {
      axios.get('http://api.xueweijun.com/v1/comment/index', {
        params: {
          token: this.newToken1,
          page: this.page,
          page_size: this.page_size
        }
      })
      .then((response) => {
        // console.log(response.data)
        if (response.data.code === ERR_OK) {
          this.data = response.data.data
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
    avatarDd(headimgurl) {
      var avatar = ''
      if (headimgurl == "") {
        avatar = '/static/image/avatar_default.png'
      } else {
        avatar = headimgurl
      }
      return avatar
    },
    ...mapMutations({
      setActicleId: 'SET_ACTICLE_ID'
    })
  },
  computed: {
    ...mapGetters([
      'user'
    ])
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
.comment-wrapper
  position: absolute
  left: 0
  right: 0
  top: 1.12rem
  bottom: 0
  transition: all .3s ease
  background: #fff
  max-width: 960px
  margin: 0 auto
  z-index: 9998
  .comment-cell
    background: #fff
    padding: .4rem .3rem
    position: relative
    font-size: 0
    .contain
      margin: 0
      padding: .1rem .3rem
      position: relative
      .content
        color: #191919
        font-size: .4267rem
        margin: .2rem 0
      .comment-link
        margin-top: .2rem
        background: #f8f8f8
        display: table
        padding: 8px
        .comment-link-img
          width: 1.6rem
          display: table-cell
          vertical-align: top
          img
            width: 100%
        .comment-link-title
          padding-left: .2667rem
          font-size: .4267rem
          color: #a3a3a3
          vertical-align: top
    .avatar
      height: .8533rem
      img
        width: .8533rem
        height: .8533rem
        display: inline-block
        vertical-align: middle
        overflow: hidden
        border-radius: 50%
      .name
        color: #9190b4
        font-size: .3733rem
        vertical-align: middle
        padding-left: .2667rem
      .avatar-times
        font-size: 12px
        vertical-align: middle
        padding-left: .4rem
        color: #a3a3a3
</style>
