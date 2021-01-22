export default {
  router: {
    linkActiveClass: 'active',
    // 自定义路由表规则
    extendRoutes(routes, resolve) {
      // 清除nuxt默认的路由规则
      routes.splice(0)
      routes.push(...[
        {
          path: '/',
          // name: 'layout',
          component: resolve(__dirname, 'pages/layout'),
          children: [
            {
              path: '',
              name: 'home',
              component: resolve(__dirname, 'pages/home')
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login')
            },
            {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login')
            },
            {
              path: '/profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            },
            {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings')
            },
            {
              path: '/editor',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor')
            },
            {
              path: '/article/:slug',
              name: 'articleIndex',
              component: resolve(__dirname, 'pages/article/')
            },
          ]
        },
      ])
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js',
  ]
}