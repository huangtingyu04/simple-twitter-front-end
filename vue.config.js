module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/global.sass";`
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/forum-front-end-vue/'
    : '/'
};