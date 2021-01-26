<!--  -->
<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form>
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture" v-model="userData.image">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="userData.username">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="userData.bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="userData.email" autocomplete="off">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="New Password" v-model="userData.password" autocomplete="off">
              </fieldset>
              <button type="button" class="btn btn-lg btn-primary pull-xs-right" @click="update">
                Update Settings
              </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import {updateUser} from '@/api/user.js'
import {mapState} from 'vuex'
export default {
  name: 'settings',
  middleware: 'authenticated',
  data () {
    return {
      userData:{
        image: '',
        email: '',
        bio: '',
        username: '',
        password: ''
      }
    }
  },

  components: {},

  computed: {
    ...mapState(['user'])
  },
  mounted(){
    this.userData.image = this.user.image
    this.userData.email = this.user.email
    this.userData.bio = this.user.bio
    this.userData.username = this.user.username
  },
  methods: {
    async update(){
      if(!this.userData.password){
        alert('请输入新密码')
      }
      await updateUser(this.userData)
      this.$router.push('/')
    }
  }
}

</script>
<style scoped>
</style>