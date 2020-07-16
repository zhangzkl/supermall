<template>
    <div class = 'detail'>
        <detail-nav-bar class = 'detail-nav-bar'/>
        <scroll class = "content" ref = 'scroll'>
            <detail-swiper :top-images = 'topImages'/>
            <detail-base-info :goods = 'goods'/>
            <detail-shop-info :shop = 'shop'/>
            <detail-goods-info :detail-info = 'detailInfo' @load-image = 'loadImage'/>
            <detail-param-info :goods-param = 'goodsParam'/>
            <detail-comment-info :commentInfo = 'commentInfo'/>
            <goods-list :goods = 'recommends'/>
        </scroll>
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'

    import Scroll from 'components/common/scroll/Scroll'
    import GoodsList from 'components/content/goods/GoodsList'

    import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'
    export default {
        name:'Detail',
        components:{
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            Scroll,
            GoodsList
        },
        data(){
            return {
                iid:null,
                topImages:[],
                goods:{},
                shop:{},
                detailInfo:{},
                goodsParam:{},
                commentInfo:{},
                recommends:[]
            }
        },
        methods:{
            loadImage(){
                this.$refs.scroll.refresh();
            }
        },
        created(){
            this.iid = this.$route.params.iid;

            getDetail(this.iid).then(res=>{
                console.log(res);
                const data = res.result;
                this.topImages = data.itemInfo.topImages;

                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);

                this.shop = new Shop(data.shopInfo);

                this.detailInfo = data.detailInfo;

                this.goodsParam = new GoodsParam(data.itemParams.info,data.itemParams.rule);

                if(data.rate.cRate != 0){
                    this.commentInfo = data.rate.list[0];
                }
            });

            getRecommend().then(res=>{
                this.recommends = res.data.list;
            });
        }
    }
</script>

<style scoped>
    .detail{
        height: 100vh;
        position: relative;
        z-index: 9;
        background-color:#fff; 
    }
    .detail-nav-bar{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content{
        height:calc(100% - 44px);
    }
</style>