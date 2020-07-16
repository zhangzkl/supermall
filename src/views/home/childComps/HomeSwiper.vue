<template>
    <swiper>
        <!-- Vue 2.2.0+的版本里，当在组件中使用v-for时，key是必须的 -->
        <swiper-item v-for = 'item in banners'>
            <a :href="item.link">
                <img :src="item.image" alt="" @load = 'loadImage'>
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
    import {Swiper,SwiperItem} from 'components/common/swiper/index'
    export default {
        name:'HomeSwiper',
        props:{
            banners:{
                type:Array,
                default(){
                    return [];
                }
            }
        },
        data(){
            return {
                isLoad:false
            }
        },
        methods:{
            loadImage(){
                if(!this.isLoad){
                    this.$emit("loadImage");
                    this.isLoad = true;
                }
            }
        },
        components:{
            Swiper,
            SwiperItem
        }
    }
</script>