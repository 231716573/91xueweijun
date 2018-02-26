<template>
  <div class="active">
    <div class="active-wrapper">
      <ul>
        <router-link tag="li" v-for="(item, index) in activeList" to="item.url" :key="index">
          <div class="active-item">
            <img v-lazy="item.picUrl">
          </div>
          <div class="hr-line"></div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeList: [
        {
          url: '123123123',
          picUrl: '/static/image/activity4.png'
        },
        {
          url: '456456',
          picUrl: '/static/image/activity4.png'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.hr-line
  background: #f1f1f1
  height: .1333rem
.active-wrapper
  padding-bottom: 1.3867rem
  .active-item
    display: block
    height: 3.2rem
    margin: .4rem
    position: relative
    img
      width: 100%
      height: 100%
</style>
