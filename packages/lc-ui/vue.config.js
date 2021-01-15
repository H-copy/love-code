module.exports = {
  outputDir: 'lib',
  productionSourceMap: false,
  css:{
    sourceMap: false
  },
  chainWebpack: conf => {
    
    if(process.env.NODE_ENV === 'production') {
      conf.externals({
        vue: "vue",
        'ant-design-vue': 'ant-design-vue'
      })
    }
    
  }
}
