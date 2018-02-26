<template>
  <div class="article">
    <div class="head" ref="header">
      <div class="logo">
        <i></i>
      </div>
      <div class="back-icon" @click="back">
        <i class="iconfont"><</i>
      </div>
      <div class="back-home" @click="backHome">
        <img src="/static/image/icon_home@2x.png">
      </div>
    </div>
    <div class="container">
      <div class="article-head">
        <h1 class="title">{{articleDetail.title}}</h1>
        <p class="meta">
          <span class="author">{{articleDetail.author}}</span>
          <span>{{articleDetail.post_date_show}}</span>
        </p>
      </div>
      <div class="article-body" v-html="articleDetail.content"></div>
      <div class="tags-content">
        <span v-for="item in articleDetail.tags" class="tag-item">{{item}}</span>
      </div>
      <p class="article-desc">文章来源：{{articleDetail.post_source}}</p>
    </div>
    <div class="article-support">
      <a class="article-like">
        <i class="support-img"></i>
        <span class="num">{{articleDetail.post_support}}人赞</span>
        <span class="add">+1</span>
      </a>
    </div>
    <div class="hr-line"></div>
    <div class="article-recommend">
      <p style="text-indent: 0.4rem;">其他人还在看</p>
      <section class="acticle-section" v-for="(item, index) in articleDetail.related">
        <div class="acticle-img">
          <img v-lazy="item.images[0]">
        </div>
        <div class="acticle-content">
          <p class="title">{{item.title}}</p>
          <p class="desc">
            <span class="reading">{{item.pv}}</span>
            <span class="author">{{item.post_source}}</span>
            <span>{{item.post_date_show}}</span>
          </p>
        </div>
      </section>
    </div>
    <div class="hr-line"></div>
    <div id="comment-list" class="comment-list">
      <div class="no-comment">
        <a href="javascript:;">沙发评论哈~</a>
      </div>
    </div>
    <loading v-show="!acticleDone" ref="loading"></loading>
  </div>
</template>

<script>
import axios from 'axios'
import {ERR_OK} from 'api/config.js'
import Loading from 'base/loading/loading'
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      articleDetail: {},
      acticleDone: false
    }
  },
  created() {
    this._getArticle()
  },
  methods: {
    back() {
      this.$router.back()
    },
    backHome() {
      this.$router.push('/')
    },
    _getArticle() {
      if (!this.acticleId) {
        this.$router.push('/')
        return
      }

      axios.get('http://api.xueweijun.com/v1/news/detail', {
        params: {
          news_id: this.acticleId
        }
      })
      .then((response) => {
        if (response.data.code === ERR_OK) {
          this.articleDetail = response.data.data
        }

        this.acticleDone = true
        // window.scrollTo(0, 0)
      })
      .catch((error) => {
        console.log(error)
      });
    }
  },
  watch: {
    '$route': '_getArticle'
  },
  computed: {
    ...mapGetters([
      'acticleId'
    ])
  },
  components: {
    Loading
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

.head
  position: fixed
  top: 0
  z-index: 9
  width: 100%
  .logo
    background: #22bc99
    height: 1.12rem
    i
      display: block
      height: 1.12rem
      width: 2.4267rem
      background-image: url('/static/image/icon_logo@2x.png')
      background-position: 50%
      background-size: contain
      background-repeat: no-repeat
      margin: 0 auto
  .back-icon
    position: absolute
    display: inline-block
    width: 1.12rem
    height: 1.12rem
    line-height: 1.12rem
    left: 0
    top: 0
    color: #fff
    text-align: center
    .iconfont
      color: #fff
      font-size: .6rem
      vertical-align: top
  .back-home
    position: fixed
    right: 15px
    top: .3rem
    z-index: 889
    font-size: 0
    img
      width: .56rem
.container
  margin-top: 1.12rem
  padding: 0 .4rem
  .article-head
    padding-top: .4rem
    h1
      font-size: .5867rem
      color: #181818
      line-height: 1.45
      font-weight: 600
    .meta
      padding: .2667rem 0
      span
        padding-left: .2667rem
        font-size: .3733rem
        color: #888
      .author
        font-size: .3733rem
        font-weight: 700
        color: #1a1a1a
        padding-left: 0
  .article-body
    line-height: 1.6
    font-size: 16px
    width: 100%
    word-wrap: break-word
    overflow-x: hidden
  .tag-item
    display: inline-block
    margin-right: .18rem
    margin-bottom: .18rem
    font-size: .3733rem
    color: #595a5c
    background: #f4f5f7
    padding: .08rem .2667rem
    border-radius: .1333rem
    border: 1px solid hsla(0,0%,87%,.4)
  .article-desc
    font-size: .3733rem
    padding-top: .2rem
    color: #a5a5a5
.hr-line
  background: #f1f1f1
  height: .1333rem
.article-support
  padding: .6rem 0 .5333rem
  font-size: 0
  text-align: center
  .article-like
    display: inline-block
    width: 3.5733rem
    height: 1.28rem
    line-height: 1.28rem
    border-radius: 1rem
    color: #fff
    font-size: .3733rem
    position: relative
    background: #f4a660
    .support-img
      display: inline-block
      width: .56rem
      height: .56rem
      background-image: url('/static/image/icon_praising_normal2@2x.png')
      background-repeat: no-repeat
      background-size: cover
      vertical-align: middle
    .num
      vertical-align: middle
    .add
      position: absolute
      left: 50%
      top: -10px
      margin-left: -.2667rem
      color: #f4a660
      opacity: 0
.article-recommend
    padding-top: .5867rem
    p
      font-size: 0.4rem;
      color: rgb(163, 163, 163);
  .acticle-section
    display: flex
    position: relative
    padding: .4rem
    &:before
      content: " "
      position: absolute
      left: .4rem
      right: .4rem
      bottom: 0
      border-bottom: 1px solid hsla(0,0%,87%,.6)
      transform-origin: 0 0
      transform: scaleY(.5)
    .acticle-img
      flex:0 0 100px
      margin-right: 12px
      img
        width: 100%
        height: auto
    .acticle-content
      flex: 1
      .title
        font-size: $font-size-16
        line-height: 0.65rem
        color: $color-text
      .desc
        font-size: .2933rem
        color: #a5a5a5
        padding-top: .26rem
        .author
          padding-right: .2667rem
        .reading
          float: right
          display: inline-block
          height: 20px
          padding-left: 15px
          background: url('/static/image/tab_quantity@2x.png') left top no-repeat
          background-size: 12px 12px
.comment-list
  padding: 0 .4rem 1.3867rem
  min-height: 5.3333rem
  .no-comment
    text-align: center
    font-size: .4267rem
    color: #888
    padding-top: .8rem
    a
      color: #888
</style>
