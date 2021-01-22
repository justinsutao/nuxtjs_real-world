<!-- 组件说明 -->
<template>
    <div class="article-meta">
        <nuxt-link :to="{name: 'profile', params: {username: article.author.username}}"><img src="http://i.imgur.com/Qr71crq.jpg" /></nuxt-link>
        <div class="info">
          <nuxt-link :to="{name: 'profile', params: {username: article.author.username}}" class="author">{{article.author.username}}</nuxt-link>
          <span class="date">{{article.author.createdAt | date('MMM DD, YYYY')}}</span>
        </div>
        <button class="btn btn-sm btn-outline-secondary"
        :class="{active: article.following}"
        >
          <i class="ion-plus-round"></i>
          &nbsp;
          Follow {{article.author.username}} <span class="counter">(10)</span>
        </button>
        &nbsp;&nbsp;
        <button class="btn btn-sm btn-outline-primary"
        :class="{active: article.favorited}"
        >
          <i class="ion-heart"></i>
          &nbsp;
          Favorite Post <span class="counter">(29)</span>
        </button>
      </div>
</template>

<script>
  //import x from ''
  export default {
    
    props:{
      article:{
        type: Object,
        required: true,
      }
    },
    methods: {

    },
    //生命周期 - 创建之前
    beforeCreate() {

    },
    //生命周期 - 创建之后
    created() {

    },
    //生命周期 - 挂载之前
    beforeMount() {

    }, 
    //生命周期 - 挂载之后
    mounted() {

    },
    //生命周期 - 更新之前
    beforeUpdate() {

    }, 
    //生命周期 - 更新之后
    updated() {

    },
    //生命周期 - 销毁之前
    beforeDestroy() {

    },
    //生命周期 - 销毁完成
    destroyed() {

    },
    //如果页面有keep-alive缓存功能，这个函数会触发
    activated() {

    },
  }
</script>

<style>
</style>