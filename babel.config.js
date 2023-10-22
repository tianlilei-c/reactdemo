module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      }
    ],
    '@babel/preset-react', //注意这个的配置 非常的关键
    
  ],
};
