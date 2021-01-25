<!--  -->
<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input type="text"
                       class="form-control form-control-lg"
                       placeholder="Article Title"
                       v-model="detail.title"
                       required>
              </fieldset>
              <fieldset class="form-group">
                <input type="text"
                       class="form-control"
                       placeholder="What's this article about?"
                       v-model="detail.description"
                       required>
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control"
                          rows="8"
                          placeholder="Write your article (in markdown)"
                          v-model="detail.body"
                          required></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text"
                       class="form-control"
                       placeholder="Enter tags"
                       v-model="detail.tag">
                <div class="tag-list"></div>
              </fieldset>
              <button v-if="$route.params.slug"
                      class="btn btn-lg pull-xs-right btn-primary"
                      type="button"
                      @click="updateArticle"
                      :disabled="status">
                Update Article
              </button>
              <button v-else
                      class="btn btn-lg pull-xs-right btn-primary"
                      type="button"
                      @click="createNewArticle"
                      :disabled="status">
                Update Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { createArticle, getArticle, editArticle } from "@/api/article.js";
export default {
  name: "editor",
  //路由组件渲染之前会先执行中间件处理
  middleware: "authenticated",
  data() {
    return {
      detail: {
        title: "",
        description: "",
        body: "",
      },
      status: false,
    };
  },
  async mounted() {
    const slug = this.$route.params.slug;
    const { data } = await getArticle(slug);
    const { article } = data;
    this.detail.title = article.title;
    this.detail.description = article.description;
    this.detail.body = article.body;
  },
  methods: {
    async createNewArticle() {
      const { title, body, description } = this.detail;
      if (!title) {
        return alert("输入标题");
      }
      if (!body) {
        return alert("输入文章内容");
      }
      if (!description) {
        return alert("输入文章摘要");
      }
      this.status = true;
      const { data } = await createArticle({ article: this.detail });
      this.status = false;
      this.$router.push(`/article/${data.article.slug}`);
    },
    async updateArticle() {
      this.status = true;
      let articleData = {article: this.detail}
      const { data } = await editArticle(this.$route.params.slug, articleData);
      this.status = false;
      this.$router.push(`/article/${data.article.slug}`);
    },
  },
};
</script>
<style scoped>
</style>