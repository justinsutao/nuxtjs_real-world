<!--  -->
<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image"
                 class="user-img" />
            <h4>{{profile.username}}</h4>
            <p>
              {{profile.bio}}
            </p>
            <button v-if="$route.params.username===user.username" class="btn btn-sm btn-outline-secondary action-btn" @click="$router.push('/settings')">
              <i class="ion-plus-round"></i>
              &nbsp;
              Edit Profiles Settings
            </button>
             <button v-else class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow {{profile.username}}
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link"
                   href="javascript:void(0)"
                   :class="{active: mine}"
                   @click="mine = true"
                   >My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link"
                   href="javascript:void(0)"
                    :class="{active: !mine}"
                   @click="mine = false"
                   >Favorited Articles</a>
              </li>
            </ul>
          </div>

          <template v-if="mine">
            <div class="article-preview"
                 v-for="item in myArticles"
                 :key="item.slug">
              <div class="article-meta">
                <nuxt-link :to="{name: 'profile', params: {username: item.author.username}}"><img :src="item.author.image" /></nuxt-link>
                <div class="info">
                  <a href=""
                     class="author">{{item.author.username}}</a>
                  <span class="date">{{item.createdAt | date('MMM DD, YYYY')}}</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                  <i class="ion-heart"></i> {{item.favoritesCount}}
                </button>
              </div>
              <nuxt-link :to="{name:'articleIndex', params: {slug: item.slug}}"
                         class="preview-link">
                <h1>{{item.title}}</h1>
                <p>{{item.description}}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>
          </template>
          <template v-else>
            <div class="article-preview"
                 v-for="item in favoriteArticles"
                 :key="item.slug">
              <div class="article-meta">
                <nuxt-link :to="{name: 'profile', params: {username: item.author.username}}"><img :src="item.author.image" /></nuxt-link>
                <div class="info">
                  <a href=""
                     class="author">{{item.author.username}}</a>
                  <span class="date">{{item.createdAt | date('MMM DD, YYYY')}}</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                  <i class="ion-heart"></i> {{item.favoritesCount}}
                </button>
              </div>
              <nuxt-link :to="{name:'articleIndex', params: {slug: item.slug}}"
                         class="preview-link">
                <h1>{{item.title}}</h1>
                <p>{{item.description}}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>
          </template>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getProfile } from "@/api/user.js";
import { getArticles, addFavorite, removeFavorite } from "@/api/article.js";
import { mapState } from "vuex";
export default {
  name: "profile",
  middleware: "authenticated",
  data() {
    return {
      profile: {},
      myArticles: [],
      favoriteArticles: [],
      mine: true,
    };
  },

  components: {},

  computed: {
    ...mapState(["user"])
  },
  async mounted() {
    const username = this.$route.params.username;
    const { data } = await getProfile(username);
    this.profile = data.profile;
    const userArticles = await getArticles({ author: username });
    this.myArticles = userArticles.data.articles;
    const fArticles = await getArticles({ favorited: username });
    this.favoriteArticles = fArticles.data.articles;
    console.log(fArticles.data.articles);
  },
  methods: {},
};
</script>
<style scoped>
</style>