<!-- 组件说明 -->
<template>
  <div class="article-meta">
    <nuxt-link :to="{name: 'profile', params: {username: article.author.username}}">
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link :to="{name: 'profile', params: {username: article.author.username}}"
                 class="author">{{article.author.username}}</nuxt-link>
      <span class="date">{{article.author.createdAt | date('MMM DD, YYYY')}}</span>
    </div>
    <template v-if="!(article.author.username === user.username)">
      <button class="btn btn-sm btn-outline-secondary"
              @click="follow(article)"
              :class="{active: article.author.following}"
              :disabled="status">
        <i class="ion-plus-round"></i>
        &nbsp;
        {{article.author.following? 'Unfollow' : 'Follow'}} {{article.author.username}}
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary"
              :class="{active: article.favorited}"
              @click="favorite(article)">
        <i class="ion-heart"></i>
        &nbsp;
        {{article.favorited ? 'Unfavorite' : 'Favorite'}} Article <span class="counter">({{article.favoritesCount}})</span>
      </button>
    </template>
    <template v-else>
      <nuxt-link class="btn btn-outline-secondary btn-sm"
                 :to="{name: 'editor', params: {slug: article.slug}}">
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>
      <button class="btn btn-outline-danger btn-sm"
              @click="removeArticle(article)">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
  </div>
</template>

<script>
import { followUser, unfollowUser } from "@/api/user.js";
import { addFavorite, removeFavorite, deleteArticle } from "@/api/article.js";
import { mapState } from "vuex";
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      status: false,
    };
  },
  methods: {
    async follow(article) {
      this.status = true;
      if (article.author.following) {
        article.author.following = false;
        await unfollowUser(article.author.username);
      } else {
        article.author.following = true;
        await followUser(article.author.username);
      }
      this.status = false;
    },
    async favorite(article) {
      this.status = true;
      if (article.favorited) {
        article.favorited = false;
        article.favoritesCount--;
        await removeFavorite(article.slug);
      } else {
        article.favorited = true;
        article.favoritesCount++;
        await addFavorite(article.slug);
      }
      this.status = false;
    },
    async removeArticle(article) {
      this.status = true;
       await deleteArticle(article.slug);
      this.status = false;
      this.$router.push('/')
    },
  },
};
</script>

<style>
</style>