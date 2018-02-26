<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/headlines" exact>
      <i class="tab-img toutiao"></i>
      <span class="tab-link">头条</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/tool" exact>
      <i class="tab-img gongju"></i>
      <span class="tab-link">工具</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/school" exact>
      <i class="tab-img xuexiao"></i>
      <span class="tab-link">查学校</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/active" exact>
      <i class="tab-img huodong"></i>
      <span class="tab-link">活动</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/personal" exact>
      <i class="tab-img wode"></i>
      <span class="tab-link">我的</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

.tab
  position: fixed
  width: 100%
  z-index: 999
  bottom: 0
  background: #fff
  display: flex
  height: 1.3867rem
  font-size: $color-text-03
  border-top: 1px solid #eee
  .tab-item
    flex: 1
    text-align: center
    &.router-link-active
      .tab-link
        color: #22bc99
      .toutiao
        background-image: url('tab1_s.png') !important
      .gongju
        background-image: url('tab2_s.png') !important
      .xuexiao
        background-image: url('tab3_s.png') !important
      .huodong
        background-image: url('tab4_s.png') !important
      .wode
        background-image: url('tab5_s.png') !important
    .tab-link
      color: $color-text-08
      font-size: $font-size-12

    .tab-img
      display: block
      background-size: contain
      width: .62rem
      height: .62rem
      margin: .18rem auto .1rem
      &.toutiao
        background-image: url('tab1.png')
      &.gongju
        background-image: url('tab2.png')
      &.xuexiao
        background-image: url('tab3.png')
      &.huodong
        background-image: url('tab4.png')
      &.wode
        background-image: url('tab5.png')
</style>
