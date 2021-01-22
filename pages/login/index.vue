<!--  -->
<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center"> {{isLogin ? 'Sign in' : 'Sign up'}}</h1>
          <p class="text-xs-center">
            <nuxt-link to="/login"
                       v-if="!isLogin">Have an account?</nuxt-link>
            <nuxt-link to="/register"
                       v-else>Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages,field) in errors">
              <li v-for="(msg, index) in messages" :key="index">{{field}} {{msg}}</li>
            </template>
          </ul>

          <form @submit.prevent="userLogin">
            <fieldset class="form-group"
                      v-if="!isLogin">
              <input class="form-control form-control-lg"
                     type="text"
                     v-model="user.username"
                     placeholder="Your Name"
                     required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email"
                     class="form-control form-control-lg"
                     type="email"
                     placeholder="Email"
                     required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password"
                     class="form-control form-control-lg"
                     type="password"
                     placeholder="Password"
                     required minlength="8">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{isLogin ? 'Sign in' : 'Sign up'}}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user"
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: "login",
  middleware: 'notAuthenticated',
  data() {
    return {
      user: {
        email: "",
        password: "",
        username: ''
      },
      errors: {}
    };
  },

  components: {},

  computed: {
    isLogin() {
      return this.$route.name === "login";
    }
  },

  // mounted: {},

  methods: {
    async userLogin() {
      try {
        const { data } = this.isLogin ? await login({
          user: this.user
        }) : await register({
          user: this.user
        })
        // 保存用户的登录状态
        this.$store.commit('setUser', data.user)
        //数据持久化（页面刷新后也会存在）
        Cookie.set('user', data.user)
        // 跳转到首页
        this.$router.push("/")
      } catch (err) {
        this.errors = err.response.data.errors;
      }
    }
  }
};
</script>
<style scoped>
</style>