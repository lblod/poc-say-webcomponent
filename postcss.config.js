module.exports = {
  plugins: [
    require('postcss-rem-to-pixel')({ 
      rootValue: 10,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minRemValue: 0
    }),
  ],
}