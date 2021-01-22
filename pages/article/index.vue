<!--  -->
<template>
  <div class="article-page">

  <div class="banner">
    <div class="container">

      <h1>{{article.title}}</h1>

    <article-meta :article="article"/>

    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div v-html="article.body" class="col-md-12"></div>
    </div>

    <hr />

    <div class="article-actions">
      <article-meta :article="article"/>
    </div>

      <article-comments :article="article"/>

  </div>

</div>
</template>

<script>
import {getArticle} from '@/api/article.js'; 
import articleMeta from '@/component/articleMeta'
import articleComments from '@/component/articleComments'
import Markdown from 'markdown-it'
export default {
  name: 'articleIndex',
  async asyncData({params}){
    const {data} = await getArticle(params.slug)
    const {article} = data
    const md = new Markdown()
    article.body = md.render(article.body)
    return {
      article: data.article
    }
  },

  components: {
    articleMeta,
    articleComments,
  },
  head(){
    return {
      title: `${this.article.title} - realWorld`,
      meta:[
        {hid: 'description',name: 'description',content: `${this.article.description}`,}
      ]
    }
  }
}

</script>
<style scoped>
</style>