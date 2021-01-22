 <!--  -->
<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item"
                  v-if="user">
                <nuxt-link class="nav-link"
                           :to="{name: 'home', query:{tab: 'your_feed'}}"
                           :class="{active: tab === 'your_feed'}"
                           exact>Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link"
                           :to="{name: 'home', query:{tab: 'global_feed'}}"
                           :class="{active: tab === 'global_feed'}"
                           exact>Global Feed</nuxt-link>
              </li>
              <li class="nav-item"
                  v-if="tag">
                <nuxt-link class="nav-link"
                           :to="{name: 'home', query:{tab: 'tag', tag: 'tag'}}"
                           :class="{active: tab === 'tag'}"
                           exact>#{{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview"
               v-for="article in articles"
               :key="article.slug">
            <div class="article-meta">
              <nuxt-link :to="{name: 'profile', params: {username: article.author.username}}">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link :to="{name: 'profile', params: {username: article.author.username}}"
                           class="author">{{article.author.username}}</nuxt-link>
                <span class="date">{{article.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right"
                      :class="{active: article.favorited}"
                      @click="favorite(article)"
                      :disabled="article.status"
                      >
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{name: 'articleIndex', params: {slug: article.slug}}"
                       class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          <ul class="pagination">
            <li class="page-item"
                v-for="(pageItem, index) in totalPage"
                :key="index"
                :class="{active: pageItem === page}">
              <nuxt-link :to="{name: 'home', query:{page: pageItem, tag: $route.query.tag, tab: tab}}"
                         class="page-link">{{pageItem}}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link v-for="(item, index) in tags"
                         :key="index"
                         :to="{name:'home',query: {tab: 'tag',tag: item}}"
                         class="tag-pill tag-default">{{item}}</nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getArticles, getFeedArticles, addFavorite, removeFavorite } from "@/api/article.js";
import { getTags } from "@/api/tag.js";
import { mapState } from "vuex";
export default {
  name: "home",
  async asyncData({ query, store }) {
    const page = Number.parseInt(query.page || 1),
      limit = 10;
    const tab = query.tab || "global_feed";
    const loadArticles =
      store.state.user && tab === "your_feed" ? getFeedArticles : getArticles;
    const [articleResult, tagResult] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag: query.tag
      }),
      getTags()
    ]);
    const { articles, articlesCount } = articleResult.data;
    const { tags } = tagResult.data;
    const { tag } = query;
    articles.forEach(article => {
      article.status = false
    })
    return {
      articles,
      articlesCount,
      tags,
      limit,
      page,
      tag,
      tab: query.tab || "global_feed"
    };
  },
  watchQuery: ["page", "tag", "tab"],
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
    ...mapState(["user"])
  },
  methods: {
    async favorite(article){
      article.status = true
      if(article.favorited){
        //取消点赞
       await removeFavorite(article.slug)
       article.favorited = false
       article.favoritesCount--
      }else{
        // 点赞
       await addFavorite(article.slug)
       article.favorited = true
       article.favoritesCount++
      }
      article.status=false
    }
  },
};
</script>
<style scoped>
</style>