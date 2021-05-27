module.exports = {

  plugins: [
    { src: '~/plugins/nuxt-swiper-plugin.js', ssr: false },
    { src: '~/plugins/nuxt-element-ui', ssr: true },
  ],
  css: [
    'swiper/dist/css/swiper.css',
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
  ** Headers of the page
  */
  head: {
    title: '在线教育 - Java视频|HTML5视频|前端视频|Python视频|大数据视频-',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: 'IT在线视频教程,Java视频,HTML5视频,前端视频,Python视频,大数据视频' },
      { hid: 'description', name: 'description', content: 'IT在线视频学习平台' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

