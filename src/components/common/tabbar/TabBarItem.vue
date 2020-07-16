<template>
    <div class = "tab-bar-item" @click="itemClick">
        <div v-if = "!isActive"><slot name = "item-icon"></slot></div>
        <div v-else><slot name = "item-icon-active"></slot></div>
        <div :style = "active"><slot name = "item-text"></slot></div>
    </div>
</template>

<script>
export default {
    name:'TabBarItem',
    props:{
        path:String,
        color:{
            type:String,
            default:"red"
        }
    },
    data(){
        return {
            // isActive:false

        }
    },
    computed:{
        active(){
            return this.isActive?{color:this.color}:{};
        },
        isActive(){
            return this.$route.path.indexOf(this.path) !== -1;
        }
    },
    methods:{
        itemClick(){
            this.$router.push(this.path);
        }
    }
}
</script>

<style scoped>
    .tab-bar-item{
        flex:1;
        text-align: center;
        height:49px;
    }
    .tab-bar-item img{
        width:24px;
        height: 24px;
        margin-top:3px;
    }
</style>