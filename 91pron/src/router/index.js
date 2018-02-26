import Vue from 'vue'
import Router from 'vue-router'
import Headlines from 'components/headlines/headlines'
import Article from 'components/article/article'
import Tool from 'components/tool/tool'
import School from 'components/school/school'
import Active from 'components/active/active'
import Personal from 'components/personal/personal'
import myMessage from 'components/my-message/my-message'
import myFavorite from 'components/my-favorite/my-favorite'
import myComment from 'components/my-comment/my-comment'
import myFeedback from 'components/my-feedback/my-feedback'
import seenfeedback from 'components/seenfeedback/seenfeedback'
import myServer from 'components/my-server/my-server'
import mySetting from 'components/my-setting/my-setting'
import Guide from 'components/guide/guide'
import Interest from 'components/interest/interest'
import schoolInfo from 'components/school-info/school-info'
import schoolContent from 'components/school-content/school-content'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/headlines'
    },
    {
      path: '/headlines',
      component: Headlines
    },
    {
      path: '/article/:id',
      component: Article
    },
    {
      path: '/tool',
      component: Tool
    },
    {
      path: '/school',
      component: School
    },
    {
      path: '/active',
      component: Active,
      meta: {
        title: '活动'
      }
    },
    {
      path: '/guide',
      component: Guide,
      meta: {
        title: '服务协议'
      }
    },
    {
      path: '/guide/interest',
      component: Interest,
      meta: {
        title: '挑选关注内容'
      }
    },
    {
      path: '/personal',
      component: Personal,
      meta: {
        title: '个人信息'
      },
      children: [
        {
          path: 'myMessage',
          component: myMessage,
          meta: {
            title: '我的信息'
          }
        },
        {
          path: 'myFavorite',
          component: myFavorite,
          meta: {
            title: '我的收藏'
          }
        },
        {
          path: 'myComment',
          component: myComment,
          meta: {
            title: '我的评论'
          }
        },
        {
          path: 'myFeedback',
          component: myFeedback
        },
        {
          path: 'myFeedback/seenfeedback',
          component: seenfeedback
        },
        {
          path: 'myServer',
          component: myServer
        },
        {
          path: 'mySetting',
          component: mySetting
        }
      ]
    },
    {
      path: '/school/info',
      component: schoolInfo
    },
    {
      path: '/school/content',
      component: schoolContent
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {//如果设置标题，拦截后设置标题
    document.title = to.meta.title
  } else {
    document.title = '91教育'
  }
  next()
})

export default router
