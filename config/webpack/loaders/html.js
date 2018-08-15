module.exports = {
  test: /\.html(\.erb)?$/,
    use: [{
      loader: 'vue-template-compiler-loader'
  }]
}
