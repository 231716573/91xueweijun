<template>
  <div class="school">
    <div class="school-selected">
      <ul class="school-list" ref="schoolItem">
        <li class="school-item" :key="index" v-for="(item, index) in schoolItem" @click="_schoolItemClick(index)">
          <span>{{item.name}}</span>
          <span class="angle"></span>
        </li>
      </ul>
      <div class="school-select-box" v-show="toggleItemClick == 1">
        <ul ref="selectBox">
          <li :key="index"
              v-for="(item, index) in schoolSelectBox"
              @click="tagClick(index)"
              :class="{'active': item.active == 1}"><span>{{item.name}}</span></li>
        </ul>
      </div>
    </div>
    <div class="school-content">
      <router-link to="" tag="div"
                   class="school-link"
                   :key="index"
                   @click.native="goSchoolInfo(item.school_uid)"
                   v-for="(item, index) in details">
        <div class="logo">
          <img v-lazy="item.badge" >
        </div>
        <div class="details">
          <h3 class="name">{{item.school_name}}</h3>
          <div v-if="item.school_jf == 1">
            <span class="tips tip2">入学积分</span>
          </div>
          <div class="tag-box">
            <span v-if="item.grade == 1" class="tag-item icon0">区一级</span>
            <span v-else-if="item.grade == 2" class="tag-item icon0">市一级</span>
            <span v-else-if="item.grade == 3" class="tag-item icon0">省一级</span>

            <span v-if="item.category == 1" class="tag-item icon1">公办</span>
            <span v-else-if="item.category == 2" class="tag-item icon1">民办</span>

            <span v-if="item.section == 1" class="tag-item icon2">小学</span>
            <span v-else-if="item.section == 7" class="tag-item icon2">中学</span>
          </div>
        </div>
        <div class="hr-line"></div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {ERR_OK} from 'api/config.js'
import {addClass, removeClass, hasClass} from 'common/js/dom.js'
import Vue from 'vue'
import {mapMutations} from 'vuex'

export default {
  data () {
    return {
      details: [],
      toggleItemClick: '',
      currentItemClick: '',
      itemType: '',
      schoolItem: [
        {id: 0, name: '办学类型'},
        {id: 1, name: '学段'},
        {id: 2, name: '办学等级'}
      ],
      schoolSelectBox: [],
      grade: [
        {id: 0, name: '全部', sort: 0, active: 1},
        {id: 1, name: '公办', sort: 1, active: 0},
        {id: 2, name: '民办', sort: 2, active: 0}
      ],
      section: [
        {id: 0, name: '全部', sort: 0, active: 1},
        {id: 1, name: '小学', sort: 1, active: 0},
        {id: 2, name: '初中', sort: 7, active: 0}
      ],
      category: [
        {id: 0, name: '全部',   sort: 0, active: 1},
        {id: 1, name: '区一级', sort: 1, active: 0},
        {id: 2, name: '市一级', sort: 2, active: 0},
        {id: 3, name: '省一级', sort: 3, active: 0}
      ],
      categoryItem: '',
      sectionItem: '',
      gradeItem: ''
    }
  },
  created() {
    this._getDetails()

  },
  methods: {
    _getDetails(bool) {
      axios.post('http://api.school.xueweijun.com/v1/school/schoolList', {
        page: 1,
        pageSize: 10,
        city: '4403',
        category: this.categoryItem,
        section: this.sectionItem,
        grade: this.gradeItem
      },{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      })
      .then((response) => {
        if (bool) {
          this.details = []
        }
        if (response.data.code === ERR_OK) {
          for (let key in response.data.data.school_list) {
            this.details.push(response.data.data.school_list[key])
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },
    _schoolItemClick(index) {
      let schoolItem = this.$refs.schoolItem.children
      // 首先，全部去掉 class
      for (let i = 0; i < schoolItem.length; i++) {
        removeClass(schoolItem[i], 'active')
      }
      // 第二步，给当前的添加 class
      addClass(schoolItem[index], 'active')

      // 第三步，如果当前的 item 第二次点击，并且，内容当前是展开状态，就删除 class
      if (this.currentItemClick === index && this.toggleItemClick === 1) {
        removeClass(schoolItem[index], 'active')
      }
      // 第四步，储存当前的 item，用于判断第三步
      this.currentItemClick = index
      // 第五步，判断当前的 item 是否展开，有就藏起来，没有就展开
      hasClass(schoolItem[index], 'active') ? this.toggleItemClick = 1 : this.toggleItemClick = 0

      if (index == 0) {
        this.schoolSelectBox = this.grade
        this.itemType = 'grade'
      } else if (index == 1) {
        this.schoolSelectBox = this.section
        this.itemType = 'section'
      } else if (index == 2) {
        this.schoolSelectBox = this.category
        this.itemType = 'category'
      }
    },
    tagClick(index) {
      if (this.itemType == 'grade') {
        for (let i = 0; i < this.grade.length; i++) {
          this.grade[i].active = '0'
        }
        Vue.set(this.grade[index],'active','1');
        this.gradeItem = this.grade[index].sort

      } else if (this.itemType == 'section') {
        for (let i = 0; i < this.section.length; i++) {
          this.section[i].active = '0'
        }
        Vue.set(this.section[index],'active','1');
        this.sectionItem = this.section[index].sort

      } else if (this.itemType == 'category') {
        for (let i = 0; i < this.category.length; i++) {
          this.category[i].active = '0'
        }

        Vue.set(this.category[index],'active','1');
        this.categoryItem = this.category[index].sort
      }

      let schoolItem = this.$refs.schoolItem.children
      // 全部去掉 class
      for (let i = 0; i < schoolItem.length; i++) {
        removeClass(schoolItem[i], 'active')
      }
      this.toggleItemClick = 0

      this._getDetails(true)
    },
    goSchoolInfo(id) {
      // console.log(id)
      this.$router.push({
        path: '/school/info'
      })
      this.setSchoolId(id)
    },
    ...mapMutations({
      setSchoolId: 'SET_SCHOOLID'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

.hr-line
  background: #f1f1f1
  height: .1333rem
.school-selected
  position: fixed
  left: 0
  top: 0
  z-index:999
  width: 100%
  background: #fff
  .school-select-box
    li
      display: block
      line-height: 1.3867rem
      padding: 0 .4rem 0 .96rem
      position: relative
      color: #585858
      border-bottom: 1px solid #ddd
      &.active
        color: #22bc99
        &:before
          content: "√"
          display: inline-block
          position: absolute
          left: .4rem
          top: 0
          color: #22bc99
  .school-list
    width: 100%
    display: flex
    height: .8533rem
    line-height: .8533rem
    border-bottom: 1px solid #ddd
    .school-item
      flex: 1
      text-align: center
      &.active
        color: #22bc99
        .angle
          transform: rotate(180deg) !important
          &:before
            top: 42%
      span
        &.angle
          line-height: .75rem
          display: inline-block
          box-sizing: border-box
          width: .4rem
          height: .8533rem
          margin: 0
          text-decoration: none
          text-align: center
          cursor: pointer
          transition: transform .2s ease;
          position: relative
          &:before
            content: ""
            position: relative
            right: 0
            top: 33%
            margin-top: -.12rem
            color: #999
            border-style: solid
            border-width: .12rem .12rem 0
            border-color: #999 transparent transparent
.school-content
  margin-top: 0.8533rem
  padding-bottom: 1.3867rem
  .school-link
    padding: .32rem
    display: flex
    .logo
      flex: 0 0 2.1867rem
      display: inline-block
      width: 2.1867rem
      height: 2.1867rem
      overflow: hidden
      position: relative
      img
        width: 100%
    .details
      flex: 1
      margin-left: 3%
      vertical-align: top
      color: #585858
      .name
        color: #181818
        font-size: .4533rem
        margin-top: 5px
        font-weight: bold
      .tips
        display: inline-block
        padding: 3px .2rem
        margin: .2667rem .32rem 0 0
        font-size: .32rem
        border-radius: 2px
        &.tip2
          color: #f9a562
          border: 1px solid #f9a562
      .tag-box
        margin-top: .2667rem
        .tag-item
          font-size: .32rem
          display: inline-block
          padding: 0 .2667rem
          text-align: center
          height: .5333rem
          line-height: .5333rem
          border-radius: 2px
          margin-right: .2rem
          color: #fff
          &.icon0
            background: #ff6d2d
          &.icon1
            background: #ffa65f
          &.icon2
            background: #96c9ff
</style>
