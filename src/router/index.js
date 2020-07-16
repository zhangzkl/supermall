import Vue from 'vue'
import Router from 'vue-router'

const Home = ()=>import ('../views/home/Home');
const Category = ()=>import ('../views/category/Category');
const Shopcart = ()=>import ('../views/shopcart/Shopcart');
const Profile = ()=>import ('../views/profile/Profile');
const Detail = ()=>import ('../views/detail/Detail');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'',
      redirect:"/home"
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/category',
      component:Category
    },
    {
      path:'/shopcart',
      component:Shopcart
    },
    {
      path:'/profile',
      component:Profile
    },
    {
      path:'/detail/:iid',
      component:Detail
    }
  ],
  mode:"history"
})

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}