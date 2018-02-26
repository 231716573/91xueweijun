<template>
  <transition name="slide">
    <div class="school">
      <v-nav :backIcon="backIcon"></v-nav>
      <div class="school-info">
        <div class="school-header">
          <div class="school-logo">
            <img :src="school.badge">
          </div>
          <div class="school-details">
            <p class="school-name"><strong>{{school.name}}</strong></p>
            <div class="school-tag">
              <span v-if="school.grade == 1" class="tag-item icon0">区一级</span>
              <span v-else-if="school.grade == 2" class="tag-item icon0">市一级</span>
              <span v-else-if="school.grade == 3" class="tag-item icon0">省一级</span>

              <span v-if="school.category == 1" class="tag-item icon1">公办</span>
              <span v-else-if="school.category == 2" class="tag-item icon1">民办</span>

              <span v-if="school.section == 1" class="tag-item icon2">小学</span>
              <span v-else-if="school.section == 7" class="tag-item icon2">中学</span>
            </div>
            <div class="school-year">
              <img src="/static/image/icon_history.png" class="year-img">
              <span class="year-label">创办于{{school.school_year}}年</span>
            </div>
          </div>
        </div>
        <div class="school-swiper-wrapper">
          <div class="swiper-wrapper-out" ref="mySwiperOut">
            <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide v-if="this.school.pic1 != ''">
                <img :src="this.school.pic1">
              </swiper-slide>
              <swiper-slide v-if="this.school.pic2 != ''">
                <img :src="this.school.pic2">
              </swiper-slide>
              <swiper-slide v-if="this.school.pic3 != ''">
                <img :src="this.school.pic3">
              </swiper-slide>
              <swiper-slide v-if="this.school.pic4 != ''">
                <img :src="this.school.pic4">
              </swiper-slide>
              <swiper-slide v-if="this.school.pic5 != ''">
                <img :src="this.school.pic5">
              </swiper-slide>
              <swiper-slide v-if="this.school.pic6 != ''">
                <img :src="this.school.pic6">
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="school-item">
          <div class="school-detail">
            <i class="school-icon address-icon"></i>
            <span class="label">{{school.address}}</span>
          </div>
          <a class="phone-call" :href="`tel:${school.telephone}`">
            <i class="phone"></i>
          </a>
        </div>
        <div class="school-item" @click="goSchoolContent()">
          <div class="school-detail">
            <i class="school-icon school-jj"></i>
            <span class="label">学校简介</span>
          </div>
          <a class="phone-call">
            <i class="right">></i>
          </a>
        </div>
        <div class="hr-line"></div>
        <div class="school-item">
          <div class="school-detail">
            <i class="school-icon school-zs"></i>
            <span class="label">招生简章</span>
          </div>
          <a class="right-box-wrapper">
            <i class="right-box look">立即查看</i>
          </a>
        </div>
        <div class="school-item">
          <div class="school-detail">
            <i class="school-icon school-bm"></i>
            <span class="label">模拟报名</span>
          </div>
          <a class="right-box-wrapper">
            <i class="right-box use">立即使用</i>
          </a>
        </div>
        <div class="school-item">
          <div class="school-detail">
            <i class="school-icon school-jf"></i>
            <span class="label">入学积分<span style="font-size: 13px;"><i style="color: #a5a5a5">(2017)</i> {{xwlb}} {{jf}}分</span></span>
          </div>
          <a class="right-box-wrapper">
            <i class="right-box suan">积分估算</i>
          </a>
        </div>
        <div class="school-item">
          <div class="school-detail">
            <i class="school-icon school-ww"></i>
            <span class="label">招生范围</span>
          </div>
        </div>
        <div class="recruie-range">
          <p>{{school.recruit_range}}</p>
        </div>
        <div class="hr-line"></div>
        <div class="school-item">
          <div class="school-detail">
            <i class="school-icon school-sz"></i>
            <span class="label">师资力量</span>
          </div>
        </div>
        <div class="student-teacher">
          <div class="stu-teach-item">
            <p class="num-label">{{school.teacher_percent}}</p>
            <p>师生比例</p>
          </div>
          <div class="stu-teach-item">
            <p class="num-label">{{school.students}}</p>
            <p>在校人数</p>
          </div>
          <div class="stu-teach-item">
            <p class="num-label">{{school.classes}}</p>
            <p>班级总数</p>
          </div>
        </div>
      </div>
      <school-content ref="schoolCon" :schoolName="school.name" :text="school.description"></school-content>
    </div>
  </transition>
</template>

<script>
import vNav from 'base/nav/nav'
import {mapGetters} from 'vuex'
import {ERR_OK} from 'api/config.js'
import schoolContent from 'components/school-content/school-content'

export default {
  data () {
    return {
      backIcon: true,
      picArr: [],
      school: {},
      xwlb: '',
      jf: '',
      swiperOption: {
        slidesPerView: 6
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this._getSchool()

    }, 20)
  },
  methods: {
    _getSchool() {
      if (!this.schoolId) {
        this.$router.back()
        return
      }

      this.$https.get(`http://api.school.xueweijun.com/v1/school/${this.schoolId}`, {
        params: {
          uid: this.schoolId,
          token: '503a60140bb111e8b64800163e06132a'
        }
      })
      .then((response) => {
        // console.log(response.data)
        if (response.data.code === ERR_OK) {
          this.school = response.data.data
          this.xwlb = response.data.data.school_jf.xwlb
          this.jf = response.data.data.school_jf.jf

          if (response.data.data.pic1 != '') {
            this.picArr.push(response.data.data.pic1)
          }

          if (response.data.data.pic2 != '') {
            this.picArr.push(response.data.data.pic2)
          }

          if (response.data.data.pic3 != '') {
            this.picArr.push(response.data.data.pic3)
          }

          if (response.data.data.pic4 != '') {
            this.picArr.push(response.data.data.pic4)
          }

          if (response.data.data.pic5 != '') {
            this.picArr.push(response.data.data.pic5)
          }

          if (response.data.data.pic6 != '') {
            this.picArr.push(response.data.data.pic6)
          }

          this._initPics()
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
    _initPics() {
      let picWidth = 3
      let margin = 0.2
      var width = (picWidth + margin) * this.picArr.length

      console.log(width)
      this.$refs.mySwiperOut.style.width = width + 'rem'
    },
    goSchoolContent() {
      this.$refs.schoolCon.show()
    }
  },
  watch: {
    '$route': '_getSchool'
  },
  computed: {
    ...mapGetters([
      'schoolId'
    ])
  },
  components: {
    vNav, schoolContent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.hr-line
  background: #f1f1f1
  height: .1333rem
.school
  position: absolute
  top: 0
  left 0
  z-index: 9998
  width: 100%
  min-height: 100%
  background: #fff
  .school-info
    margin-top: 1.12rem
    .student-teacher
      display: flex
      padding: .4rem
      color: #585858
      .stu-teach-item
        flex: 1
        font-size: .3733rem
        text-align: center
        position: relative
        &:after
          content: " "
          position: absolute
          top: 0
          right: 0
          bottom: 0
          border-right: 1px solid #ddd
        &:nth-child(3):after
          border-right: none
        .num-label
          color: #fda862
          font-size: .4rem
          font-weight: 700
          margin-bottom: 5px
    .recruie-range
      padding: .4rem
      font-size: .3733rem
      color: #585858
      line-height: 21px
    .school-item
      display: flex
      box-sizing: border-box
      width: 100%
      padding: .27rem .4rem
      font-size: .4rem
      position: relative
      &:after
        content: ""
        position: absolute
        left: 0
        bottom: 0
        border-bottom: 1px solid #ddd
        transform-origin: 0 0
        transform: scaleY(.5)
        width: 100%
      .right-box-wrapper
        position: absolute
        right: 0
        top: 0
        height: 100%
        height: .8rem
        line-height: .8rem
        padding: .27rem .4rem
        z-index: 9
        text-align: right
        .right-box
          display: inline-block
          color: #fff
          width: 1.8667rem
          height: .6933rem
          line-height: .6935rem
          font-size: .32rem
          text-align: center
          &.suan
            background: #8fbeff
          &.use
            background: #22bc99
          &.look
            background: #ffa85e
      .phone-call
        position: absolute
        right: 0
        top: 0
        height: 100%
        height: .8rem
        line-height: .8rem
        width: .8rem
        padding: 0 .27rem
        margin: .27rem 0
        z-index: 9
        text-align: right
        &:before
          content: "";
          float: left
          display: inline-block
          height: 100%
          padding-right: 10px
          border-left: 1px solid #ddd
          transform-origin: 0 0
          transform: scaleX(.5)
        .phone
          display: inline-block
          width: 18px
          height: 18px
          background: url('btn_phone.png')
          background-size: cover
          vertical-align: middle
        .right
          display: inline-block
          font-size: 18px
          vertical-align: middle
      .school-detail
        flex: 1
        height: .8rem
        line-height: .8rem
        position: relative
        color: #585858
        .school-icon
          display: inline-block
          width: 18px
          height: 18px
          background-size: cover
          vertical-align: text-top
          &.school-sz
            background-image: url('middle_icon_teachers@2x.png')
          &.address-icon
            background-image: url('icon_location.png')
          &.school-jj
            background-image: url('icon_synopsis.png')
          &.school-zs
            background-image: url('icon_recruit.png')
          &.school-bm
            background-image: url('icon_signup.png')
          &.school-jf
            background-image: url('middle_icon_integral.png')
          &.school-ww
            background-image: url('middle_icon_range@2x.png')
    .school-swiper-wrapper
      padding: .32rem
      overflow: hidden
      .swiper-wrapper-out
        .swiper-slide
          display: inline-block !important
          img
            width: 100%
            margin-right: .2rem
    .school-header
      display: flex
      position: relative
      padding: .2667rem .4rem
      &:after
        content: ""
        position: absolute
        left: 0
        bottom: 0
        border-bottom: 1px solid #ddd
        transform-origin: 0 0
        transform: scaleY(.5)
        width: 100%
      .school-details
        flex: 1
        margin-left: .32rem
        vertical-align: top
        color: #585858
        .school-name
          color: #181818
          font-size: .4533rem
          padding-top: .1667rem
          strong
            font-weight: bold
        .school-tag
          padding-top: .2667rem
          .tag-item
            font-size: .32rem
            display: inline-block
            padding: 0 .2667rem
            text-align: center
            height: .5333rem
            line-height: .5335rem
            border-radius: 2px
            margin-right: .2rem
            color: #fff
            &.icon0
              background: #ff6d2d
            &.icon1
              background: #ffa65f
            &.icon2
              background: #96c9ff
        .school-year
          font-size: .3733rem
          position: relative
          color: #a5a5a5
          padding-top: .2667rem
          .year-img
            padding: 0 2px 0 .32rem
            display: inline-block
            width: .4rem
            vertical-align: middle
          .year-label
            vertical-align: middle
      .school-logo
        display: block
        width: 2.08rem
        position: relative
        img
          width: 100%
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
