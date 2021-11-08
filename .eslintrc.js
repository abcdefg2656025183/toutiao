module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    // 使用的代码规范是 standard
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  // 校验规则
  rules: {
    // 如果你现在代码已经属于线上环境了，那么代码中如果出现console那么就会触发警告
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // debugger;
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
