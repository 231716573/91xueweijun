<template>
  <div class="headlines">
    <div class="head" ref="header">
      <div class="logo">
        <i></i>
      </div>
      <div class="nav-wrapper">
        <div class="nav-right">
          <i>→</i>
        </div>
        <div ref="navWrapper">
          <div class="nav-list" ref="navList">
            <router-link :to="`/?t=${item.cat_id}`"
                         v-for="(item, index) in navList"
                         :key="index"
                         @click.native="getNewActiveList(index, item.cat_id)">
              {{item.cat_name}}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container" ref="container">
      <ul class="container-ul" ref="containerUl">
        <li @click="goArticle(item.id)" v-for="(item, index) in articleList">
          <section class="acticle-section">
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
        </li>
      </ul>
    </div>

    <div v-show="acticleShow">
      <loading title="正在加载内容"></loading>
    </div>

    <alert ref="alert" :text="alertText"></alert>
  </div>
</template>

<script>
import axios from 'axios'
import {ERR_OK} from 'api/config.js'
import {addClass, removeClass, hasClass, formatDate} from 'common/js/dom.js'
import BScroll from 'better-scroll'
import Loading from 'base/loading/loading'
import Alert from 'base/alert/alert'
import {mapMutations} from 'vuex'

export default {
  data () {
    return {
      navList: [],
      currentPage: 1,
      pageSize: 10,
      currentId: 0,
      articleList: [],
      chatScroll: true,
      acticleShow: false,
      alertText: '完成'
    }
  },
  mounted() {
    this._getNavList();
    this._getActicleList(1);

    var self = this;
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var containerHeader = parseFloat(window.getComputedStyle(this.$refs.container, null).marginTop);

    window.addEventListener('scroll',() => {
      // console.log(clientHeight); // 可视区域高度
      // console.log(document.documentElement.scrollTop); // 滚动高度
      // console.log(document.body.offsetHeight); // 文档高度

      // console.log(this.chatScroll)
      if ((clientHeight + document.documentElement.scrollTop > document.body.offsetHeight) && this.chatScroll) {
        this.chatScroll = false;
        this._getActicleList();
      }
    })
  },
  methods: {
    // 获取标题列表
    _getNavList() {
      axios.get('http://api.xueweijun.com/v1/news/cats').then((response) => {
        if (response.data.code === ERR_OK) {
          this.navList = response.data.data

          setTimeout(() => {
            let navListChild = this.$refs.navList.getElementsByTagName("a");
            let width = 7;

            for (let i = 0; i < navListChild.length; i++) {
              width += navListChild[i].clientWidth

              i == 0 && addClass(navListChild[i], 'active')
            }

            this.$refs.navList.style.width = width + 'px'

            this.$nextTick(() => {
    					if(!this.picScroll){
    						this.picScroll = new BScroll(this.$refs.navWrapper, {
    							scrollX: true,
    							eventPassthrough: "vertical"
    						})
    					} else {
    						this.picScroll.refresh();
    					}
    				})
          }, 20)
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    // 添加 active 样式
    getNewActiveList(index, id) {
      // console.log(index)
      let navListChild = this.$refs.navList.getElementsByTagName("a");

      for (let i = 0; i < navListChild.length; i++) {
        removeClass(navListChild[i], 'active')
      }
      addClass(navListChild[index], 'active')
      this._getActicleList(id)
      this.currentId = id
    },
    // 加载文章列表
    _getActicleList(id) {
      if (this.acticleShow) {
        return
      }
      this.acticleShow = true

      if (id) {
        this.currentId = id
        this.currentPage = 1
        this.articleList = []
      } else {
        this.currentPage += 1
      }
      // console.log(`${this.currentId}、、、${this.currentPage}`)
      // console.log(encodeURIComponent(formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')))
      axios.get('http://api.xueweijun.com/v1/news/index', {
        params: {
          page: this.currentPage,
          cat_id: this.currentId,
          page_size: this.pageSize,
          time_line: encodeURIComponent(formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'))
        }
      })
      .then((response) => {
        if (response.data.code === ERR_OK) {
          for (var key in response.data.data.list) {
            this.articleList.push(response.data.data.list[key])
          }
        }
        if (id == 1 || id == 298) {
          setTimeout(() => {
            this.$refs.containerUl.getElementsByTagName('li')[0].className = 'new-active'
          },200)
        } else if (id == 146) {
          setTimeout(() => {
            this.$refs.containerUl.getElementsByTagName('li')[0].className = 'new-active'
            this.$refs.containerUl.getElementsByTagName('li')[1].className = 'new-active'
          },200)
        }

        setTimeout(() => {
          this.chatScroll = true
        }, 2000)
        this.acticleShow = false

        this.alertText = response.data.data.list.length > 0 ? "加载完成" : "没有更多数据"
        this.$refs.alert.show()
      })
      .catch((error) => {
        console.log(error);

        setTimeout(() => {
          this.chatScroll = true
        }, 2000)
        this.acticleShow = false

        this.alertText = "加载出错，请联系客服"
        this.$refs.alert.show()
      });
    },
    goArticle(id) {
      this.setActicleId(id)
      this.$router.push({
        path: `/article/${id}`
      })
    },
    ...mapMutations({
      setActicleId: 'SET_ACTICLE_ID'
    })
  },
  watch: {
    articleList: function (val) {
      // console.log(val)
    }
  },
  components: {
    Loading, Alert
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
  .nav-wrapper
    background: #fff
    position: relative
    height: .96rem
    overflow: hidden
    color: #666
    border-bottom: 1px solid rgba(0,0,0,.2)
    .nav-right
      position: absolute
      z-index: 9
      right: 0
      width: .8rem
      height: .94rem
      background: hsla(0,0%,100%,.7)
      text-align: center
      line-height: .96rem
    .nav-list
      a
        display: inline-block
        padding: 0 .4rem
        text-align: center
        height: .96rem
        line-height: .96rem
        color: #585858
        font-size: .4rem
        &.active
          font-size: .4267rem
          color: #22bc99
.container
  margin-top: 2.08rem
  padding-bottom: 1.3867rem
  .new-active
    .acticle-section
      display: block
      position: relative
      border-bottom: 1px solid hsla(0,0%,87%,.6)
      padding: 0.4rem 0
      margin: 0 0.4rem
      .acticle-img
        height: 5.0667rem
        overflow: hidden
        margin-right: 0
      .acticle-content
        position: relative
        .title
          position: absolute
          top: -30px
          color: #fff
          width: 100%
          height: 30px
          line-height: 30px
          padding:0 10px
          box-sizing: border-box
          z-index: 2
          font-size: $font-size-14
          text-overflow: ellipsis
          overflow: hidden
          white-space: nowrap
        &:after
          content: ' ';
          position: absolute
          display: block
          top: -30px
          background: rgba(0, 0, 0, 0.5)
          height: 30px
          width: 100%
          z-index: 1
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
</style>
