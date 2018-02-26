<template>
  <div class="tool">
    <div class="tool-banner">
      <img src="./bg_img@2x.png" class="bg-img">
    </div>
    <ul class="tool-list">
      <router-link to="" tag="li" v-for="(item, index) in tool" :key="index">
        <div class="tool-wrapper">
          <div class="icon" :class="`icon${index+1}`"></div>
          <div class="content">
            <p class="title">{{item.title}}<i v-for="key in item.star">✪</i> </p>
            <p class="desc">{{item.desc}}</p>
          </div>
          <button type="button" name="button" class="tool-btn">{{item.bth}}</button>
        </div>
        <div class="hr-line"></div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tool: [
        {
          title: '估算积分',
          desc: '估算升学所需积分',
          url: '456',
          bth: '立即参加',
          star: 3
        },
        {
          title: '幼小衔接每日题库',
          desc: '幼小衔接习惯培养',
          url: '789',
          bth: '立即参加',
          star: 3
        },
        {
          title: '深圳升学模拟报名系统',
          desc: '模拟升学报名填写流程',
          url: '123',
          bth: '立即计算',
          star: 1
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

.hr-line
  width: 100%
  background: #f1f1f1
  height: .1333rem
.tool
  .tool-banner
    width: 100%
    height: 8rem
    background: url('bg_tool.png') no-repeat
    background-size: cover
    position: relative
    .bg-img
      display: block
      margin: 0 auto
      width: 5.7333rem
      padding-top: .6rem
  .tool-list
    li
      width: 100%
      color: #181818
      .tool-wrapper
        position: relative
        width: 100%
        display: flex
        padding: .32rem 0 .4267rem
        .content
          line-height: 1.5
          .title
            padding-top: .1rem
            font-size: $font-size-18
            color: #181818
            i
              margin-left: 5px
          .desc
            color: #585858
            font-size: $font-size-16
        .tool-btn
          position: absolute
          right: .48rem
          bottom: .48rem
          background: #ffa65f
          border: 0
          outline: none
          width: 1.7867rem
          height: .7467rem
          border-radius: .1333rem
          color: #fff
          font-size: .32rem
        .icon
          width: 1.8667rem
          height: 1.8667rem
          border-radius: .16rem
          color: #fff
          text-align: center
          margin-left: .48rem
          margin-right: .48rem
          background-size: 100% 100%
          &.icon1
            background-image: url('icon_compute@2x.png')
          &.icon2
            background-image: url('icon_subject@2x.png')
          &.icon3
            background-image: url('icon_imitate@2x.png')
</style>
