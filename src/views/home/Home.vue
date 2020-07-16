<template>
    <div id = "home">
        <nav-bar class = "home-nav"><div slot="center">购物街</div></nav-bar>
        <tab-control @tabClick = 'tabClick'
                    :titles = "['流行','新款','精选']"
                    ref = 'tabControl1'
                    class = 'tab-control'
                    v-show = 'isTabFixed'/>
        <scroll class = 'content' 
                ref = "scroll" 
                :probe-type = '3' 
                @scroll = "backTopScroll"
                :pull-up-load = 'true'
                @pullingUp = 'loadMore'>
            <home-swiper :banners = 'banners' @loadImage = 'loadImage'/>
            <home-recommend-view :recommends = 'recommends'/>
            <feature-view/>
            <tab-control @tabClick = 'tabClick'
                        :titles = "['流行','新款','精选']"
                        ref = 'tabControl2'/>
            <goods-list :goods = "showGoods"/>
        </scroll>
        <back-top @click.native="backClick" v-show = "isShow"/>

    </div>
</template>

<script>
    import HomeSwiper from './childComps/HomeSwiper'
    import HomeRecommendView from './childComps/HomeRecommendView'
    import FeatureView from './childComps/FeatureView'

    import NavBar from 'components/common/navbar/NavBar'
    import TabControl from 'components/content/tabcontrol/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import Scroll from 'components/common/scroll/Scroll'
    import BackTop from 'components/content/backTop/BackTop'

    import {getHomeMultidata,getHomeGoods} from 'network/home'
    import {debounce} from 'common/utils'

    export default {
        name:'Home',
        components:{
            HomeSwiper,
            HomeRecommendView,
            FeatureView,
            NavBar,
            TabControl,
            GoodsList,
            Scroll,
            BackTop
        },
        data(){
            return {
                banners:[],
                recommends:[],
                goods:{
                    pop:{page:0 , list:[]},
                    new:{page:0 , list:[]},
                    sell:{page:0 , list:[]}
                },
                currentType:'pop',
                isShow:false,
                tabOffsetTop:0,
                isTabFixed:false,
                saveY:0
            }
        },
        computed:{
            showGoods(){
                return this.goods[this.currentType].list;
            }
        },
        destroyed(){
            console.log("home destroyed");
        },
        activated(){
            this.$refs.scroll.scrollTo(0,this.saveY,1);
            this.$refs.scroll.refresh();
        },
        deactivated(){
            this.saveY = this.$refs.scroll.getScrollY();
            console.log(this.saveY);
        },
        created(){
            // 请求多个数据
            this.getHomeMultidata();
            // 请求商品数据
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');
            
        },
        mounted(){
            const refresh = debounce(this.$refs.scroll.refresh,100);
            this.$bus.$on('itemLoadImage',()=>{
                refresh();
            });
        },
        methods:{
            /**
             * 事件监听的方法
             */
            tabClick(index){
                switch(index){
                    case 0:
                        this.currentType = 'pop';
                        break;
                    case 1:
                        this.currentType = 'new';
                        break;
                    case 2:
                        this.currentType = 'sell';
                        break;
                }
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },
            backClick(){
                this.$refs.scroll.scrollTo(0,0);
            },
            backTopScroll(position){
                this.isShow = (-position.y) > 1000;

                this.isTabFixed = (-position.y) > this.tabOffsetTop;
            },
            loadMore(){
                this.getHomeGoods(this.currentType);
            },
            loadImage(){
                // $el获取组件中的元素
               this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
            },
            /**
             * 网络请求的方法
             */
            getHomeMultidata(){
                getHomeMultidata().then(res=>{
                    // console.log(res);
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                });
            },
            getHomeGoods(type){
                let page = this.goods[type].page + 1;
                getHomeGoods(type,page).then(res=>{
                    this.goods[type].list.push(...res.data.list);
                    this.goods[type].page += 1;

                    this.$refs.scroll.finishPullUp();
                });
            }
        }
    }
</script>

<style scoped>
    #home{
        /* padding-top:44px; */
        height:100vh;
        position: relative;
    }
    .home-nav{
        background-color:var(--color-tint);
        color:#fff;
        /* position: fixed;
        left:0;
        top:0;
        right:0;
        z-index: 9; */
    }
    .content{
        position: absolute;
        top:44px;
        bottom:49px;
        left:0;
        right:0;
        overflow: hidden;
    }
    .tab-control{
        position: relative;
        z-index: 9;
    }
    /* .content{
        height:calc(100% - 49px);
        overflow: hidden;
    } */
</style>

