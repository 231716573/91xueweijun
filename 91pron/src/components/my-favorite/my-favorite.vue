<template>
  <div class="favorite">
    <v-nav :backIcon="backIcon"></v-nav>
    <div v-if="data.length === 0" class="no-data">
      <img src="/static/image/icon_shouc@2x.png">
      <p>还没有收藏文章喔</p>
    </div>
    <div v-else>
      <ul class="favorite-list">
        <li v-for="(item, index) in data">
          <div @click="goArticle(item.post_id)">
            <span>{{item.title}}</span>
          </div>
          <span class="favorite-click" @click="showConfirm(item.post_id)">
            <i class="active"></i>
          </span>
        </li>
      </ul>
    </div>

    <confirm ref="confirm" cancelBtnText="考虑一下" text="是否取消收藏" @confirm="removeFavorite(post_id)"></confirm>
  </div>
</template>

<script>
import vNav from 'base/nav/nav'
import axios from 'axios'
import {ERR_OK} from 'api/config.js'
import {mapMutations, mapGetters} from 'vuex'
import Confirm from 'base/confirm/confirm'
// 503a60140bb111e8b64800163e06132a
export default {
  data () {
    return {
      backIcon: true,
      data: [],
      page: 1,
      post_id: 0,
      newToken1: '503a60140bb111e8b64800163e06132a'
    }
  },
  created() {
    this._getFavorite()
  },
  methods: {
    goArticle(id) {
      console.log(id)
      this.setActicleId(id)

      this.$router.push({
        path: `/article/${id}`
      })
    },
    _getFavorite(bool) {
      axios.get('http://api.xueweijun.com/v1/favorites/index', {
        params: {
          token: this.newToken1,
          page: this.page,
          page_size: 20
        }
      })
      .then((response) => {
        if (bool) {
          this.data = []
        }
        if (response.data.code === ERR_OK) {
          for (let i = 0; i < response.data.data.length; i++) {
            this.data.push(response.data.data[i])
          }
        }
        // console.log(this.data)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    showConfirm(id) {
      this.$refs.confirm.show()
      this.post_id = id
    },
    removeFavorite() {
      console.log(this.post_id)
      axios.get('http://api.xueweijun.com/v1/favorites/remove', {
        params: {
          token: this.newToken1,
          post_id: this.post_id
        }
      })
      .then((response) => {
        this._getFavorite(true)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    ...mapMutations({
      setActicleId: 'SET_ACTICLE_ID'
    })
  },
  computed: {
    ...mapGetters([
      'newToken'
    ])
  },
  components: {
    vNav, Confirm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.favorite
  position: fixed
  top: 1.12rem
  left 0
  z-index: 9999
  width: 100%
  height: 100%
  background: #fff
  .favorite-list
    li
      background: #fff
      font-size: .4267rem
      position: relative
      height: 1.6rem
      line-height: 1.6rem
      border-bottom: 1px solid #ddd
      overflow: hidden
      width: 100%
      .favorite-click
        position: absolute
        right: 0
        top:0
        z-index: 9
        width: 1rem
        height: 1.6rem
        line-height: 1.6rem
        text-align: center
        i
          display: inline-block
          width: 24px
          height: 24px
          background-image: url('shoucang-normal@2x.png')
          background-size: cover
          vertical-align: middle
          &.active
            background-image: url('shoucang-selected@2x.png')
      div
        display: block
        margin-left: 3%
        color: #000
        transition: all .3s ease
        span
          vertical-align: middle
          display: inline-block
          width: 92%
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          color: #000
  .no-data
    text-align: center
    font-size: .4267rem
    color: #636363
    padding-top: 2rem
    img
      width: 50%
    p
      padding-top: .6rem
</style>
