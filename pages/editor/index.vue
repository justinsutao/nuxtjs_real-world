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
                       placeholder="Article Title" v-model="detail.title" required>
              </fieldset>
              <fieldset class="form-group">
                <input type="text"
                       class="form-control"
                       placeholder="What's this article about?" v-model="detail.description" required>
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control"
                          rows="8"
                          placeholder="Write your article (in markdown)" v-model="detail.body" required></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text"
                       class="form-control"
                       placeholder="Enter tags" v-model="detail.tag">
                <div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary"
                      type="button" @click="createNewArticle" :disabled="status">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {createArticle} from "@/api/article.js"
export default {
  name: "editor",
  //路由组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  data(){
    return {
      detail: {},
      status: false
    }
  },
  methods: {
    async createNewArticle(){
      const {title, body, description} = this.detail
      if(!title){
        return alert('输入标题')
      }
      if(!body){
        return alert('输入文章内容')
      }
      if(!description){
        return alert('输入文章摘要')
      }
      // console.log(this.article);
      this.status = true
      const {data} = await createArticle({article: this.detail})
      console.log(data);
      this.status = false
      this.$router.push(`/article/${data.article.slug}`)
    }
  }
}
</script>
<style scoped>
</style>