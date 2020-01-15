import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
import controller from '@/components/controller'
import adminManagement from '@/components/controllerPanel/adminManagement'
import TagManagement from '@/components/controllerPanel/TagManagement'
import tag from '@/components/controllerPanel/tag'
import iconManagement from '@/components/controllerPanel/iconManagement'
import linkManagement from '@/components/controllerPanel/linkManagement'
import advertisement from '@/components/controllerPanel/advertisement'
import basinManagement from '@/components/controllerPanel/basinManagement'
import albumManagement from '@/components/controllerPanel/albumManagement'
import albumPicture from '@/components/controllerPanel/albumPicture'
import menu from '@/components/controllerPanel/menu'
import categories from '@/components/categories'
import blogContent from '@/components/blogContent'
import albums from '@/components/albums'
import pictures from '@/components/pictures'
import blog from '@/components/blog'
import category from '@/components/category'
import blogCommentManagement from '@/components/controllerPanel/blogCommentManagement'
import blogManagement from '@/components/controllerPanel/blogManagement'
import categoryManagement from '@/components/controllerPanel/categoryManagement'
import chartManagement from '@/components/controllerPanel/chartManagement'
import blogEdit from '@/components/blogEdit'



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      redirect:'/blog',
      children: [
        {path: 'blog', component: blog},
        {path: 'categories', component: categories},
        {path: 'albums', component: albums},
       
      ]
    },
    
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/blogContent/:id',
      name: 'blogContent',
      component: blogContent
    },
    {
      path: '/pictures/:id',
      name: 'pictures',
      component: pictures
    },
    {
      path: '/controller',
      name: 'controller',
      component: controller,
      redirect:'/controller/chart',
      children: [
        {path: 'adminManagement', component: adminManagement},
        {path: 'TagManagement', component: TagManagement},
        {path: 'tag', component: tag},
        {path: 'iconManagement', component: iconManagement},
        {path: 'linkManagement', component: linkManagement},
        {path: 'advertisement', component: advertisement},
        {path: 'basinManagement', component: basinManagement},
        {path: 'albumManagement', component: albumManagement},
        {path: 'albumPicture', component: albumPicture},
        {path: 'menu', component: menu},
        {path: 'blogComment', component: blogCommentManagement},
        {path: 'blog', component: blogManagement},
        {path: 'category', component: categoryManagement},
        {path: 'chart', component: chartManagement},

      ]
    },
    {
      path: '/category/:id',
      name: 'category',
      component: category
    },
    {
      path: '/blog_edit',
      name: 'blogEdit',
      component: blogEdit
    },
    
  ]
})
